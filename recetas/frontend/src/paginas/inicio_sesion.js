import React, { useState } from 'react';
import { saveAuth } from '../utils/auth';
import './inicio_sesion.css';


export default function InicioSesion({ onLoginSuccess = () => {} }) {
  const [cargando, setCargando] = useState(false);
  const [mensaje, setMensaje] = useState('');
  const [form, setForm] = useState({ username: '', password: '' });

  const manejarInput = e => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  };

  const manejarLogin = async e => {
    e.preventDefault();
    setCargando(true);
    setMensaje('');
    try {
      const res = await fetch('http://localhost:4000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: form.username, password: form.password })
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.mensaje || 'Error en autenticación');
      }
      const body = await res.json();
      setMensaje('¡Inicio de sesión exitoso!');
      if (body.token && body.user) saveAuth({ token: body.token, user: body.user });
      onLoginSuccess(body.user);
    } catch (error) {
      setMensaje(error.message);
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="login-bg">
      <form className="login-card" onSubmit={manejarLogin} autoComplete="off">
        <div className="login-icon">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" fill="#fff"/><path d="M7 17c0-2.761 2.239-5 5-5s5 2.239 5 5" stroke="#a259e6" strokeWidth="2"/><circle cx="12" cy="9" r="3" fill="#a259e6"/></svg>
        </div>
        <div className="login-title">Mis Recetas</div>
        <div className="login-sub">Inicia sesión en tu cuenta</div>
        {mensaje && <div style={{ background: '#fde7e7', color: '#d32f2f', borderRadius: 8, padding: 10, marginBottom: 8, width: '100%', textAlign: 'center', fontWeight: 600 }}>{mensaje}</div>}
        <div className="login-form">
          <label className="login-label" htmlFor="username">Correo Electrónico</label>
          <input className="login-input" type="text" name="username" id="username" placeholder="tu@email.com" autoComplete="username" value={form.username} onChange={manejarInput} required disabled={cargando} />
          <label className="login-label" htmlFor="password">Contraseña</label>
          <input className="login-input" type="password" name="password" id="password" placeholder="••••••••" autoComplete="current-password" value={form.password} onChange={manejarInput} required disabled={cargando} />
          <button className="login-btn" type="submit" disabled={cargando}>{cargando ? 'Iniciando sesión...' : 'Iniciar Sesión'}</button>
        </div>
        <div className="login-footer">
          ¿No tienes cuenta?
          <a href="#">Regístrate</a>
        </div>
      </form>
    </div>
  );
}
