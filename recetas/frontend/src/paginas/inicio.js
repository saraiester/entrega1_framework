import React, { useEffect, useState } from 'react';
import './inicio.css';
import FormularioReceta from '../componentes/FormularioReceta';
import VistaCarrusel from '../componentes/VistaCarrusel';
import VistaGrilla from '../componentes/VistaGrilla';
import VistaLista from '../componentes/VistaLista';
import VistaMosaico from '../componentes/VistaMosaico';
import '../componentes/EstilosNuevasVistas.css';

const recetasMock = [
  {
    id: 1,
    titulo: 'Paella Valenciana',
    descripcion: 'Auténtica paella valenciana con pollo, conejo y garrofón',
    pasos: 5,
    ingredientes: 5
  },
  {
    id: 2,
    titulo: 'Tiramisú Clásico',
    descripcion: 'Postre italiano cremoso con café y mascarpone',
    pasos: 7,
    ingredientes: 6
  }
];

export default function Inicio({ user, onLogout = () => {} }) {
  const [recetas, setRecetas] = useState([]);
  const [filtro, setFiltro] = useState('Carrusel');
  const [modal, setModal] = useState(null); // { tipo, receta }

  useEffect(() => {
    fetch('http://localhost:4000/api/recetas')
      .then(r => r.json())
      .then(data => {
        if (data.ok && Array.isArray(data.recetas) && data.recetas.length > 0) setRecetas(data.recetas);
        else setRecetas(recetasMock);
      })
      .catch(() => setRecetas(recetasMock));
  }, []);

  // Eliminar receta
  const handleEliminar = async (id) => {
    if (!window.confirm('¿Seguro que quieres eliminar esta receta?')) return;
    await fetch(`http://localhost:4000/api/recetas/${id}`, { method: 'DELETE' });
    setRecetas(recetas => recetas.filter(r => r.id !== id));
  };

  // Ver receta
  const handleVer = (receta) => {
    setModal({ tipo: 'ver', receta });
  };

  // Editar receta
  const handleEditar = (receta) => {
    setModal({ tipo: 'editar', receta });
  };

  // Nueva receta
  const handleNuevaReceta = () => {
    setModal({ tipo: 'nueva', receta: null });
  };

  // Guardar receta (nueva o editar)
  const handleGuardarReceta = async (formData) => {
    try {
      console.log('Guardando receta:', formData);
      console.log('Tipo de modal:', modal.tipo);
      
      if (modal.tipo === 'nueva') {
        // Crear nueva receta
        console.log('Creando nueva receta...');
        const res = await fetch('http://localhost:4000/api/recetas', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });
        console.log('Respuesta del servidor:', res.status);
        const data = await res.json();
        console.log('Datos recibidos:', data);
        if (data.ok) {
          setRecetas(recetas => [...recetas, data.receta]);
          console.log('Receta agregada exitosamente');
        } else {
          console.error('Error del servidor:', data);
        }
      } else if (modal.tipo === 'editar') {
        // Editar receta existente
        console.log('Editando receta...');
        const res = await fetch(`http://localhost:4000/api/recetas/${modal.receta.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });
        console.log('Respuesta del servidor:', res.status);
        const data = await res.json();
        console.log('Datos recibidos:', data);
        if (data.ok) {
          setRecetas(recetas => recetas.map(r => r.id === modal.receta.id ? data.receta : r));
          console.log('Receta actualizada exitosamente');
        } else {
          console.error('Error del servidor:', data);
        }
      }
      setModal(null);
    } catch (error) {
      console.error('Error al guardar receta:', error);
    }
  };

  // Cancelar formulario
  const handleCancelarFormulario = () => {
    setModal(null);
  };

  return (
    <div style={{ background: '#f3f0fa', minHeight: '100vh', padding: 0 }}>
      <div className="inicio-bar">
        <div className="logo">
          <span className="logo-icon">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" fill="#fff"/><path d="M7 17c0-2.761 2.239-5 5-5s5 2.239 5 5" stroke="#a259e6" strokeWidth="2"/><circle cx="12" cy="9" r="3" fill="#a259e6"/></svg>
          </span>
          <h1>Mis Recetas</h1>
        </div>
        <div className="actions">
          <select value={filtro} onChange={e => setFiltro(e.target.value)}>
            <option>Carrusel</option>
            <option>Grilla</option>
            <option>Lista</option>
            <option>Mosaico</option>
          </select>
          <button className="btn-nueva" onClick={handleNuevaReceta}>+ Nueva Receta</button>
          <button className="btn-logout" onClick={onLogout} title="Cerrar sesión">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M16 17l5-5-5-5M21 12H9" stroke="#a259e6" strokeWidth="2"/><rect x="3" y="4" width="6" height="16" rx="2" stroke="#a259e6" strokeWidth="2"/></svg>
          </button>
        </div>
      </div>
      
      {/* Renderizar vista según el filtro seleccionado */}
      {filtro === 'Carrusel' && (
        <VistaCarrusel 
          recetas={recetas} 
          onVer={handleVer} 
          onEditar={handleEditar} 
          onEliminar={handleEliminar} 
        />
      )}
      {filtro === 'Grilla' && (
        <VistaGrilla 
          recetas={recetas} 
          onVer={handleVer} 
          onEditar={handleEditar} 
          onEliminar={handleEliminar} 
        />
      )}
      {filtro === 'Lista' && (
        <VistaLista 
          recetas={recetas} 
          onVer={handleVer} 
          onEditar={handleEditar} 
          onEliminar={handleEliminar} 
        />
      )}
      {filtro === 'Mosaico' && (
        <VistaMosaico 
          recetas={recetas} 
          onVer={handleVer} 
          onEditar={handleEditar} 
          onEliminar={handleEliminar} 
        />
      )}

      {/* Modal para ver receta */}
      {modal?.tipo === 'ver' && (
        <div className="modal-bg" onClick={() => setModal(null)}>
          <div className="modal modal-ver-receta" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setModal(null)} title="Cerrar">&times;</button>
            
            <div className="receta-header">
              <h2 className="receta-titulo-ver">{modal.receta.titulo}</h2>
              <p className="receta-desc-ver">{modal.receta.descripcion}</p>
              <div className="receta-meta-ver">
                <span className="meta-item-ver">
                  <svg className="icon-clock-ver" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="9" stroke="#a259e6" strokeWidth="1.4"/>
                    <path d="M12 7v5l4 2" stroke="#a259e6" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  {Array.isArray(modal.receta.pasos) ? modal.receta.pasos.length : (modal.receta.pasos || 0)} pasos
                </span>
                <span>•</span>
                <span className="meta-item-ver">
                  <svg className="icon-ingrediente-ver" viewBox="0 0 24 24" fill="none">
                    <path d="M12 2a7 7 0 0 1 7 7c0 3.87-3.13 7-7 7s-7-3.13-7-7a7 7 0 0 1 7-7z" stroke="#a259e6" strokeWidth="1.4" fill="none"/>
                    <circle cx="12" cy="9" r="2" fill="#a259e6"/>
                  </svg>
                  {Array.isArray(modal.receta.ingredientes) ? modal.receta.ingredientes.length : (modal.receta.ingredientes || 0)} ingredientes
                </span>
              </div>
            </div>

            {Array.isArray(modal.receta.ingredientes) && modal.receta.ingredientes.length > 0 && (
              <div className="receta-section">
                <h3 className="section-titulo">Ingredientes</h3>
                <div className="ingredientes-grid-ver">
                  {modal.receta.ingredientes.map((ing, i) => (
                    <div className="ingrediente-item-ver" key={i}>
                      <span className="ingrediente-nombre-ver">
                        <svg className="bullet-ver" height="8" width="8">
                          <circle cx="4" cy="4" r="3" fill="#a259e6"/>
                        </svg>
                        {ing && typeof ing === 'object' ? ing.nombre || '' : ''}
                      </span>
                      <span className="ingrediente-cantidad-ver">{ing && typeof ing === 'object' ? ing.cantidad || '' : ''}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {Array.isArray(modal.receta.pasos) && modal.receta.pasos.length > 0 && (
              <div className="receta-section">
                <h3 className="section-titulo">Pasos a Seguir</h3>
                <div className="pasos-grid-ver">
                  {modal.receta.pasos.map((paso, i) => (
                    <div className="paso-item-ver" key={i}>
                      <span className="paso-numero-ver">{i + 1}</span>
                      <span className="paso-texto-ver">{paso}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {modal.receta.comentarios && (
              <div className="receta-section">
                <h3 className="section-titulo">Comentarios Extras</h3>
                <div className="comentarios-ver">{modal.receta.comentarios}</div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Modal para nueva receta y editar receta */}
      {(modal?.tipo === 'nueva' || modal?.tipo === 'editar') && (
        <FormularioReceta
          receta={modal.tipo === 'editar' ? modal.receta : null}
          onGuardar={handleGuardarReceta}
          onCancelar={handleCancelarFormulario}
          titulo={modal.tipo === 'editar' ? 'Editar Receta' : 'Nueva Receta'}
        />
      )}
    </div>
  );
}
