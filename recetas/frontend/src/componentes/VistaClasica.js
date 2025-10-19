import React from 'react';

export default function VistaClasica({ recetas, onVer, onEditar, onEliminar }) {
  return (
    <div className="recetas-grid">
      {recetas.map(r => (
        <div key={r.id} className="receta-card">
          <div className="receta-titulo">{r.titulo}</div>
          <div className="receta-desc">{r.descripcion}</div>
          <div className="receta-info">
            <span className="info-item">
              <svg className="icon-clock" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="9" stroke="#6c3483" strokeWidth="1.4"/>
                <path d="M12 7v5l4 2" stroke="#6c3483" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              {Array.isArray(r.pasos) ? r.pasos.length : (r.pasos || 5)} pasos
            </span>
            <span>•</span>
            <span className="info-item">
              {Array.isArray(r.ingredientes) ? r.ingredientes.length : (r.ingredientes || 5)} ingredientes
            </span>
          </div>
          <div className="receta-actions">
            <button className="btn-ver" onClick={() => onVer(r)}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" style={{ marginRight: 10 }}>
                <path d="M12 5C7 5 2.73 8.11 1 12c1.73 3.89 6 7 11 7s9.27-3.11 11-7c-1.73-3.89-6-7-11-7z" stroke="#fff" strokeWidth="1.2"/>
                <circle cx="12" cy="12" r="3" fill="#fff" />
              </svg>
              Ver
            </button>
            <button className="icon-btn edit" title="Editar" onClick={() => onEditar(r)}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25z" stroke="#3b0f4f" strokeWidth="1.4" fill="none"/>
                <path d="M20.71 7.04a1 1 0 0 0 0-1.41l-2.34-2.34a1 1 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" stroke="#3b0f4f" strokeWidth="1.4" fill="none"/>
              </svg>
            </button>
            <button className="icon-btn trash" title="Eliminar" onClick={() => onEliminar(r.id)}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <rect x="6" y="7" width="12" height="11" rx="2" stroke="#3b0f4f" strokeWidth="1.4" fill="none" />
                <path d="M10 11v5" stroke="#3b0f4f" strokeWidth="1.4" strokeLinecap="round" />
                <path d="M14 11v5" stroke="#3b0f4f" strokeWidth="1.4" strokeLinecap="round" />
                <path d="M9 7V6a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v1" stroke="#3b0f4f" strokeWidth="1.4" strokeLinecap="round" />
              </svg>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
