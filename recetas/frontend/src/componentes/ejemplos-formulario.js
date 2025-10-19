import React, { useState } from 'react';
import Formulario from './formulario';

// ===== EJEMPLO 1: FORMULARIO DE LOGIN =====
export const EjemploLogin = () => {
  const [cargando, setCargando] = useState(false);
  const [mensaje, setMensaje] = useState('');

  const camposLogin = [
    {
      nombre: 'email',
      tipo: 'email',
      etiqueta: 'Correo electrónico',
      placeholder: 'tu@email.com',
      validacion: {
        requerido: true,
        patron: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        mensajeRequerido: 'El email es obligatorio',
        mensajePatron: 'Ingresa un email válido'
      }
    },
    {
      nombre: 'password',
      tipo: 'password',
      etiqueta: 'Contraseña',
      placeholder: 'Tu contraseña',
      validacion: {
        requerido: true,
        minLength: 6,
        mensajeRequerido: 'La contraseña es obligatoria',
        mensajeMinLength: 'La contraseña debe tener al menos 6 caracteres'
      }
    }
  ];

  const botonesLogin = [
    {
      tipo: 'submit',
      texto: cargando ? 'Iniciando sesión...' : 'Iniciar Sesión',
      className: 'btn-primary'
    }
  ];

  const manejarLogin = async (datos) => {
    setCargando(true);
    setMensaje('');
    
    try {
      // Simular llamada a API
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simular validación
      if (datos.email === 'admin@test.com' && datos.password === 'admin123') {
        setMensaje('¡Inicio de sesión exitoso!');
      } else {
        throw new Error('Credenciales incorrectas');
      }
    } catch (error) {
      setMensaje(error.message);
    } finally {
      setCargando(false);
    }
  };

  return (
    <Formulario
      titulo="Iniciar Sesión"
      subtitulo="Accede a tu cuenta"
      descripcion="Ingresa tus credenciales para acceder al sistema"
      campos={camposLogin}
      botones={botonesLogin}
      onSubmit={manejarLogin}
      tema="modern"
      tamano="medium"
      cargando={cargando}
      mensajeError={mensaje}
      validacionEnTiempoReal={true}
      autoFocus={true}
    />
  );
};

// ===== EJEMPLO 2: FORMULARIO DE REGISTRO =====
export const EjemploRegistro = () => {
  const [cargando, setCargando] = useState(false);
  const [mensaje, setMensaje] = useState('');

  const camposRegistro = [
    {
      nombre: 'nombre',
      tipo: 'text',
      etiqueta: 'Nombre completo',
      placeholder: 'Tu nombre completo',
      validacion: {
        requerido: true,
        minLength: 2,
        mensajeRequerido: 'El nombre es obligatorio',
        mensajeMinLength: 'El nombre debe tener al menos 2 caracteres'
      }
    },
    {
      nombre: 'email',
      tipo: 'email',
      etiqueta: 'Correo electrónico',
      placeholder: 'tu@email.com',
      validacion: {
        requerido: true,
        patron: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        mensajeRequerido: 'El email es obligatorio',
        mensajePatron: 'Ingresa un email válido'
      }
    },
    {
      nombre: 'telefono',
      tipo: 'tel',
      etiqueta: 'Teléfono',
      placeholder: '+1 (555) 123-4567',
      validacion: {
        patron: /^[\+]?[1-9][\d]{0,15}$/,
        mensajePatron: 'Ingresa un número de teléfono válido'
      }
    },
    {
      nombre: 'password',
      tipo: 'password',
      etiqueta: 'Contraseña',
      placeholder: 'Mínimo 8 caracteres',
      validacion: {
        requerido: true,
        minLength: 8,
        patron: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        mensajeRequerido: 'La contraseña es obligatoria',
        mensajeMinLength: 'La contraseña debe tener al menos 8 caracteres',
        mensajePatron: 'La contraseña debe contener al menos una mayúscula, una minúscula y un número'
      }
    },
    {
      nombre: 'confirmarPassword',
      tipo: 'password',
      etiqueta: 'Confirmar contraseña',
      placeholder: 'Repite tu contraseña',
      validacion: {
        requerido: true,
        validacionPersonalizada: (valor, datos) => {
          if (valor !== datos.password) {
            return 'Las contraseñas no coinciden';
          }
          return null;
        }
      }
    },
    {
      nombre: 'aceptoTerminos',
      tipo: 'checkbox',
      etiqueta: 'Acepto los términos y condiciones',
      validacion: {
        requerido: true,
        validacionPersonalizada: (valor) => {
          if (!valor) {
            return 'Debes aceptar los términos y condiciones';
          }
          return null;
        }
      }
    }
  ];

  const botonesRegistro = [
    {
      tipo: 'button',
      texto: 'Cancelar',
      onClick: () => console.log('Cancelar'),
      className: 'btn-secondary'
    },
    {
      tipo: 'submit',
      texto: cargando ? 'Creando cuenta...' : 'Crear Cuenta',
      className: 'btn-primary'
    }
  ];

  const manejarRegistro = async (datos) => {
    setCargando(true);
    setMensaje('');
    
    try {
      // Simular llamada a API
      await new Promise(resolve => setTimeout(resolve, 2000));
      setMensaje('¡Cuenta creada exitosamente!');
    } catch (error) {
      setMensaje('Error al crear la cuenta. Inténtalo de nuevo.');
    } finally {
      setCargando(false);
    }
  };

  return (
    <Formulario
      titulo="Crear Cuenta"
      subtitulo="Únete a nuestra plataforma"
      descripcion="Completa el formulario para crear tu cuenta"
      campos={camposRegistro}
      botones={botonesRegistro}
      onSubmit={manejarRegistro}
      tema="default"
      tamano="large"
      layout="grid"
      cargando={cargando}
      mensajeExito={mensaje}
      validacionEnTiempoReal={true}
      resetOnSubmit={true}
    />
  );
};

// ===== EJEMPLO 3: FORMULARIO DE OLVIDO DE CONTRASEÑA =====
export const EjemploOlvidoPassword = () => {
  const [cargando, setCargando] = useState(false);
  const [mensaje, setMensaje] = useState('');

  const camposOlvido = [
    {
      nombre: 'email',
      tipo: 'email',
      etiqueta: 'Correo electrónico',
      placeholder: 'tu@email.com',
      validacion: {
        requerido: true,
        patron: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        mensajeRequerido: 'El email es obligatorio',
        mensajePatron: 'Ingresa un email válido'
      }
    }
  ];

  const botonesOlvido = [
    {
      tipo: 'button',
      texto: 'Volver al login',
      onClick: () => console.log('Volver'),
      className: 'btn-secondary'
    },
    {
      tipo: 'submit',
      texto: cargando ? 'Enviando...' : 'Enviar enlace',
      className: 'btn-primary'
    }
  ];

  const manejarOlvido = async (datos) => {
    setCargando(true);
    setMensaje('');
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setMensaje('Se ha enviado un enlace de recuperación a tu correo electrónico.');
    } catch (error) {
      setMensaje('Error al enviar el enlace. Inténtalo de nuevo.');
    } finally {
      setCargando(false);
    }
  };

  return (
    <Formulario
      titulo="Recuperar Contraseña"
      subtitulo="¿Olvidaste tu contraseña?"
      descripcion="Ingresa tu email y te enviaremos un enlace para restablecer tu contraseña"
      campos={camposOlvido}
      botones={botonesOlvido}
      onSubmit={manejarOlvido}
      tema="minimal"
      tamano="small"
      cargando={cargando}
      mensajeExito={mensaje}
      autoFocus={true}
    />
  );
};

// ===== EJEMPLO 4: FORMULARIO DE CONTACTO =====
export const EjemploContacto = () => {
  const [cargando, setCargando] = useState(false);
  const [mensaje, setMensaje] = useState('');

  const camposContacto = [
    {
      nombre: 'nombre',
      tipo: 'text',
      etiqueta: 'Nombre',
      placeholder: 'Tu nombre',
      validacion: {
        requerido: true,
        mensajeRequerido: 'El nombre es obligatorio'
      }
    },
    {
      nombre: 'email',
      tipo: 'email',
      etiqueta: 'Email',
      placeholder: 'tu@email.com',
      validacion: {
        requerido: true,
        patron: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        mensajeRequerido: 'El email es obligatorio',
        mensajePatron: 'Ingresa un email válido'
      }
    },
    {
      nombre: 'asunto',
      tipo: 'select',
      etiqueta: 'Asunto',
      placeholder: 'Selecciona un asunto',
      opciones: [
        { valor: 'consulta', texto: 'Consulta general' },
        { valor: 'soporte', texto: 'Soporte técnico' },
        { valor: 'ventas', texto: 'Información de ventas' },
        { valor: 'otro', texto: 'Otro' }
      ],
      validacion: {
        requerido: true,
        mensajeRequerido: 'Selecciona un asunto'
      }
    },
    {
      nombre: 'mensaje',
      tipo: 'textarea',
      etiqueta: 'Mensaje',
      placeholder: 'Escribe tu mensaje aquí...',
      rows: 5,
      validacion: {
        requerido: true,
        minLength: 10,
        mensajeRequerido: 'El mensaje es obligatorio',
        mensajeMinLength: 'El mensaje debe tener al menos 10 caracteres'
      }
    },
    {
      nombre: 'urgente',
      tipo: 'checkbox',
      etiqueta: 'Marcar como urgente'
    }
  ];

  const botonesContacto = [
    {
      tipo: 'submit',
      texto: cargando ? 'Enviando...' : 'Enviar Mensaje',
      className: 'btn-primary'
    }
  ];

  const manejarContacto = async (datos) => {
    setCargando(true);
    setMensaje('');
    
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setMensaje('¡Mensaje enviado exitosamente! Te responderemos pronto.');
    } catch (error) {
      setMensaje('Error al enviar el mensaje. Inténtalo de nuevo.');
    } finally {
      setCargando(false);
    }
  };

  return (
    <Formulario
      titulo="Contáctanos"
      subtitulo="¿En qué podemos ayudarte?"
      descripcion="Completa el formulario y nos pondremos en contacto contigo"
      campos={camposContacto}
      botones={botonesContacto}
      onSubmit={manejarContacto}
      tema="dark"
      tamano="large"
      layout="vertical"
      cargando={cargando}
      mensajeExito={mensaje}
      validacionEnTiempoReal={true}
    />
  );
};

// ===== EJEMPLO 5: FORMULARIO DE PERFIL DE USUARIO =====
export const EjemploPerfil = () => {
  const [cargando, setCargando] = useState(false);
  const [mensaje, setMensaje] = useState('');

  const camposPerfil = [
    {
      nombre: 'nombre',
      tipo: 'text',
      etiqueta: 'Nombre',
      valorInicial: 'Juan Pérez',
      validacion: {
        requerido: true,
        mensajeRequerido: 'El nombre es obligatorio'
      }
    },
    {
      nombre: 'email',
      tipo: 'email',
      etiqueta: 'Email',
      valorInicial: 'juan@email.com',
      validacion: {
        requerido: true,
        patron: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        mensajeRequerido: 'El email es obligatorio',
        mensajePatron: 'Ingresa un email válido'
      }
    },
    {
      nombre: 'telefono',
      tipo: 'tel',
      etiqueta: 'Teléfono',
      valorInicial: '+1 (555) 123-4567',
      validacion: {
        patron: /^[\+]?[1-9][\d]{0,15}$/,
        mensajePatron: 'Ingresa un número de teléfono válido'
      }
    },
    {
      nombre: 'pais',
      tipo: 'select',
      etiqueta: 'País',
      valorInicial: 'mx',
      opciones: [
        { valor: 'mx', texto: 'México' },
        { valor: 'us', texto: 'Estados Unidos' },
        { valor: 'ca', texto: 'Canadá' },
        { valor: 'es', texto: 'España' },
        { valor: 'ar', texto: 'Argentina' }
      ]
    },
    {
      nombre: 'biografia',
      tipo: 'textarea',
      etiqueta: 'Biografía',
      valorInicial: 'Desarrollador de software con experiencia en React y Node.js',
      placeholder: 'Cuéntanos sobre ti...',
      rows: 4
    },
    {
      nombre: 'notificaciones',
      tipo: 'radio',
      etiqueta: 'Preferencias de notificación',
      valorInicial: 'email',
      opciones: [
        { valor: 'email', texto: 'Solo por email' },
        { valor: 'push', texto: 'Notificaciones push' },
        { valor: 'ambas', texto: 'Email y push' },
        { valor: 'ninguna', texto: 'No recibir notificaciones' }
      ]
    }
  ];

  const botonesPerfil = [
    {
      tipo: 'button',
      texto: 'Cancelar',
      onClick: () => console.log('Cancelar'),
      className: 'btn-secondary'
    },
    {
      tipo: 'submit',
      texto: cargando ? 'Guardando...' : 'Guardar Cambios',
      className: 'btn-primary'
    }
  ];

  const manejarPerfil = async (datos) => {
    setCargando(true);
    setMensaje('');
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setMensaje('Perfil actualizado exitosamente');
    } catch (error) {
      setMensaje('Error al actualizar el perfil');
    } finally {
      setCargando(false);
    }
  };

  return (
    <Formulario
      titulo="Mi Perfil"
      subtitulo="Actualiza tu información personal"
      campos={camposPerfil}
      botones={botonesPerfil}
      onSubmit={manejarPerfil}
      tema="default"
      tamano="large"
      layout="grid"
      cargando={cargando}
      mensajeExito={mensaje}
      validacionEnTiempoReal={true}
    />
  );
};

// ===== COMPONENTE DEMO CON TODOS LOS EJEMPLOS =====
export const DemoFormularios = () => {
  const [formularioActivo, setFormularioActivo] = useState('login');

  const formularios = {
    login: { componente: EjemploLogin, titulo: 'Login' },
    registro: { componente: EjemploRegistro, titulo: 'Registro' },
    olvido: { componente: EjemploOlvidoPassword, titulo: 'Olvido de Contraseña' },
    contacto: { componente: EjemploContacto, titulo: 'Contacto' },
    perfil: { componente: EjemploPerfil, titulo: 'Perfil' }
  };

  const ComponenteActivo = formularios[formularioActivo].componente;

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '30px' }}>
        Ejemplos del Componente Formulario
      </h1>
      
      <div style={{ 
        display: 'flex', 
        gap: '10px', 
        marginBottom: '30px', 
        flexWrap: 'wrap',
        justifyContent: 'center'
      }}>
        {Object.entries(formularios).map(([key, { titulo }]) => (
          <button
            key={key}
            onClick={() => setFormularioActivo(key)}
            style={{
              padding: '10px 20px',
              border: '2px solid #3498db',
              backgroundColor: formularioActivo === key ? '#3498db' : 'white',
              color: formularioActivo === key ? 'white' : '#3498db',
              borderRadius: '5px',
              cursor: 'pointer',
              fontWeight: '500'
            }}
          >
            {titulo}
          </button>
        ))}
      </div>

      <div style={{ 
        display: 'flex', 
        justifyContent: 'center',
        minHeight: '500px'
      }}>
        <ComponenteActivo />
      </div>
    </div>
  );
};

export default DemoFormularios;
