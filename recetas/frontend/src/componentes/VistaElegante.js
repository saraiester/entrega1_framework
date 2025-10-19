import React from 'react';

export default function VistaElegante({ recetas, onVer, onEditar, onEliminar }) {
  return (
    <div className="recetas-grid-elegante">
      {recetas.map(r => (
        <div key={r.id} className="receta-card-elegante">
          {/* Área de imagen simulada con gradiente elegante */}
          <div className="receta-imagen-elegante">
            <div className="receta-placeholder-elegante">
              <div className="receta-icono-elegante">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" fill="#8b5cf6" opacity="0.1"/>
                  <path d="M8 14c0-2.2 1.8-4 4-4s4 1.8 4 4" stroke="#8b5cf6" strokeWidth="2" fill="none"/>
                  <path d="M12 8c0-1.1.9-2 2-2s2 .9 2 2" stroke="#8b5cf6" strokeWidth="2" fill="none"/>
                  <path d="M10 6h4v2h-4z" fill="#8b5cf6"/>
                </svg>
              </div>
            </div>
            <div className="receta-actions-imagen-elegante">
              <button className="icon-btn-elegante edit" title="Editar" onClick={() => onEditar(r)}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25z" stroke="#8b5cf6" strokeWidth="1.4" fill="none"/>
                  <path d="M20.71 7.04a1 1 0 0 0 0-1.41l-2.34-2.34a1 1 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" stroke="#8b5cf6" strokeWidth="1.4" fill="none"/>
                </svg>
              </button>
              <button className="icon-btn-elegante trash" title="Eliminar" onClick={() => onEliminar(r.id)}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <rect x="6" y="7" width="12" height="11" rx="2" stroke="#8b5cf6" strokeWidth="1.4" fill="none" />
                  <path d="M10 11v5" stroke="#8b5cf6" strokeWidth="1.4" strokeLinecap="round" />
                  <path d="M14 11v5" stroke="#8b5cf6" strokeWidth="1.4" strokeLinecap="round" />
                  <path d="M9 7V6a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v1" stroke="#8b5cf6" strokeWidth="1.4" strokeLinecap="round" />
                </svg>
              </button>
            </div>
          </div>
          
          <div className="receta-content-elegante">
            <h3 className="receta-titulo-elegante">{r.titulo}</h3>
            <p className="receta-desc-elegante">{r.descripcion}</p>
            <div className="receta-meta-elegante">
              <span className="meta-item-elegante">
                <svg className="icon-clock" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="9" stroke="#8b5cf6" strokeWidth="1.4"/>
                  <path d="M12 7v5l4 2" stroke="#8b5cf6" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                {Array.isArray(r.pasos) ? r.pasos.length : (r.pasos || 0)} pasos
              </span>
              <span>•</span>
              <span className="meta-item-elegante">
                <svg className="icon-ingrediente" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2a7 7 0 0 1 7 7c0 3.87-3.13 7-7 7s-7-3.13-7-7a7 7 0 0 1 7-7z" stroke="#8b5cf6" strokeWidth="1.4" fill="none"/>
                  <circle cx="12" cy="9" r="2" fill="#8b5cf6"/>
                </svg>
                {Array.isArray(r.ingredientes) ? r.ingredientes.length : (r.ingredientes || 0)} ingredientes
              </span>
            </div>
            <div className="receta-footer-elegante">
              <button className="btn-ver-elegante" onClick={() => onVer(r)}>
                Ver Receta
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
