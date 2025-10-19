import React from 'react';

export default function VistaMosaico({ recetas, onVer, onEditar, onEliminar }) {
  // Función para determinar el tamaño de la tarjeta basado en el índice
  const getCardSize = (index) => {
    const sizes = ['small', 'medium', 'large', 'small', 'medium', 'large'];
    return sizes[index % sizes.length];
  };

  return (
    <div className="mosaico-container">
      {recetas.map((r, index) => (
        <div key={r.id} className={`mosaico-card mosaico-${getCardSize(index)}`}>
          <div className="mosaico-content">
            <h3 className="mosaico-title">{r.titulo}</h3>
            <p className="mosaico-desc">{r.descripcion}</p>
            
            <div className="mosaico-meta">
              <span className="mosaico-meta-item">
                <svg className="icon-clock" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="9" stroke="#a259e6" strokeWidth="1.4"/>
                  <path d="M12 7v5l4 2" stroke="#a259e6" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                {Array.isArray(r.pasos) ? r.pasos.length : (r.pasos || 0)}
              </span>
              <span className="mosaico-meta-item">
                <svg className="icon-chef" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" fill="#a259e6" opacity="0.1"/>
                  <path d="M8 14c0-2.2 1.8-4 4-4s4 1.8 4 4" stroke="#a259e6" strokeWidth="2" fill="none"/>
                  <path d="M12 8c0-1.1.9-2 2-2s2 .9 2 2" stroke="#a259e6" strokeWidth="2" fill="none"/>
                  <path d="M10 6h4v2h-4z" fill="#a259e6"/>
                </svg>
                {Array.isArray(r.ingredientes) ? r.ingredientes.length : (r.ingredientes || 0)}
              </span>
            </div>

            <div className="mosaico-actions">
              <button className="btn-ver-mosaico" onClick={() => onVer(r)}>
                Ver
              </button>
              <button className="btn-edit-mosaico" onClick={() => onEditar(r)}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25z" stroke="#a259e6" strokeWidth="1.4" fill="none"/>
                  <path d="M20.71 7.04a1 1 0 0 0 0-1.41l-2.34-2.34a1 1 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" stroke="#a259e6" strokeWidth="1.4" fill="none"/>
                </svg>
              </button>
              <button className="btn-delete-mosaico" onClick={() => onEliminar(r.id)}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <rect x="6" y="7" width="12" height="11" rx="2" stroke="#a259e6" strokeWidth="1.4" fill="none" />
                  <path d="M10 11v5" stroke="#a259e6" strokeWidth="1.4" strokeLinecap="round" />
                  <path d="M14 11v5" stroke="#a259e6" strokeWidth="1.4" strokeLinecap="round" />
                  <path d="M9 7V6a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v1" stroke="#a259e6" strokeWidth="1.4" strokeLinecap="round" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
