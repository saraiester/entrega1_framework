import React from 'react';

export default function VistaMinimalista({ recetas, onVer, onEditar, onEliminar }) {
  return (
    <div className="recetas-grid-minimalista">
      {recetas.map(r => (
        <div key={r.id} className="receta-card-minimalista">
          <div className="receta-header-minimalista">
            <h3 className="receta-titulo-minimalista">{r.titulo}</h3>
            <div className="receta-actions-minimalista">
              <button className="icon-btn-minimalista" title="Ver" onClick={() => onVer(r)}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M12 5C7 5 2.73 8.11 1 12c1.73 3.89 6 7 11 7s9.27-3.11 11-7c-1.73-3.89-6-7-11-7z" stroke="#6c757d" strokeWidth="1.2"/>
                  <circle cx="12" cy="12" r="3" fill="#6c757d" />
                </svg>
              </button>
              <button className="icon-btn-minimalista" title="Editar" onClick={() => onEditar(r)}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25z" stroke="#6c757d" strokeWidth="1.4" fill="none"/>
                  <path d="M20.71 7.04a1 1 0 0 0 0-1.41l-2.34-2.34a1 1 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" stroke="#6c757d" strokeWidth="1.4" fill="none"/>
                </svg>
              </button>
              <button className="icon-btn-minimalista" title="Eliminar" onClick={() => onEliminar(r.id)}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <rect x="6" y="7" width="12" height="11" rx="2" stroke="#6c757d" strokeWidth="1.4" fill="none" />
                  <path d="M10 11v5" stroke="#6c757d" strokeWidth="1.4" strokeLinecap="round" />
                  <path d="M14 11v5" stroke="#6c757d" strokeWidth="1.4" strokeLinecap="round" />
                  <path d="M9 7V6a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v1" stroke="#6c757d" strokeWidth="1.4" strokeLinecap="round" />
                </svg>
              </button>
            </div>
          </div>
          <p className="receta-desc-minimalista">{r.descripcion}</p>
          <div className="receta-meta-minimalista">
            <span className="meta-item-minimalista">
              <div className="bullet-minimalista"></div>
              {Array.isArray(r.ingredientes) ? r.ingredientes.length : (r.ingredientes || 0)} ingredientes
            </span>
            <span className="meta-item-minimalista">
              <div className="bullet-minimalista"></div>
              {Array.isArray(r.pasos) ? r.pasos.length : (r.pasos || 0)} pasos
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
