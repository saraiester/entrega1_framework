import React from 'react';

export default function VistaModerna({ recetas, onVer, onEditar, onEliminar }) {
  return (
    <div className="recetas-grid-moderna">
      {recetas.map(r => (
        <div key={r.id} className="receta-card-moderna">
          <div className="receta-header-moderna">
            <h3 className="receta-titulo-moderna">{r.titulo}</h3>
            <div className="receta-actions-moderna">
              <button className="icon-btn-moderna edit" title="Editar" onClick={() => onEditar(r)}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25z" stroke="#a259e6" strokeWidth="1.4" fill="none"/>
                  <path d="M20.71 7.04a1 1 0 0 0 0-1.41l-2.34-2.34a1 1 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" stroke="#a259e6" strokeWidth="1.4" fill="none"/>
                </svg>
              </button>
              <button className="icon-btn-moderna trash" title="Eliminar" onClick={() => onEliminar(r.id)}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <rect x="6" y="7" width="12" height="11" rx="2" stroke="#ff4757" strokeWidth="1.4" fill="none" />
                  <path d="M10 11v5" stroke="#ff4757" strokeWidth="1.4" strokeLinecap="round" />
                  <path d="M14 11v5" stroke="#ff4757" strokeWidth="1.4" strokeLinecap="round" />
                  <path d="M9 7V6a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v1" stroke="#ff4757" strokeWidth="1.4" strokeLinecap="round" />
                </svg>
              </button>
            </div>
          </div>
          <p className="receta-desc-moderna">{r.descripcion}</p>
          <div className="receta-meta-moderna">
            <span className="meta-item-moderna">
              <svg className="icon-clock" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="9" stroke="#a259e6" strokeWidth="1.4"/>
                <path d="M12 7v5l4 2" stroke="#a259e6" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              {Array.isArray(r.pasos) ? r.pasos.length : (r.pasos || 0)} pasos
            </span>
            <span>•</span>
            <span className="meta-item-moderna">
              <svg className="icon-ingrediente" viewBox="0 0 24 24" fill="none">
                <path d="M12 2a7 7 0 0 1 7 7c0 3.87-3.13 7-7 7s-7-3.13-7-7a7 7 0 0 1 7-7z" stroke="#a259e6" strokeWidth="1.4" fill="none"/>
                <circle cx="12" cy="9" r="2" fill="#a259e6"/>
              </svg>
              {Array.isArray(r.ingredientes) ? r.ingredientes.length : (r.ingredientes || 0)} ingredientes
            </span>
          </div>
          <button className="btn-ver-moderna" onClick={() => onVer(r)}>
            Ver Receta Completa
          </button>
        </div>
      ))}
    </div>
  );
}
