import React, { useState } from 'react';

export default function VistaCarrusel({ recetas, onVer, onEditar, onEliminar }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextRecipe = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % recetas.length);
  };

  const prevRecipe = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + recetas.length) % recetas.length);
  };

  if (recetas.length === 0) {
    return (
      <div className="carrusel-container">
        <div className="carrusel-empty">
          <div className="empty-icon">
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" fill="#a259e6" opacity="0.1"/>
              <path d="M8 14c0-2.2 1.8-4 4-4s4 1.8 4 4" stroke="#a259e6" strokeWidth="2" fill="none"/>
              <path d="M12 8c0-1.1.9-2 2-2s2 .9 2 2" stroke="#a259e6" strokeWidth="2" fill="none"/>
              <path d="M10 6h4v2h-4z" fill="#a259e6"/>
            </svg>
          </div>
          <p>No hay recetas para mostrar</p>
        </div>
      </div>
    );
  }

  const currentRecipe = recetas[currentIndex];

  return (
    <div className="carrusel-container">
      <div className="carrusel-nav">
        <button className="carrusel-btn prev" onClick={prevRecipe}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M15 18l-6-6 6-6" stroke="#a259e6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>

      <div className="carrusel-card">
        <div className="carrusel-content">
          <h2 className="carrusel-title">{currentRecipe.titulo}</h2>
          <p className="carrusel-desc">{currentRecipe.descripcion}</p>
          
          <div className="carrusel-meta">
            <span className="carrusel-meta-item">
              <svg className="icon-clock" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="9" stroke="#a259e6" strokeWidth="1.4"/>
                <path d="M12 7v5l4 2" stroke="#a259e6" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              {Array.isArray(currentRecipe.pasos) ? currentRecipe.pasos.length : (currentRecipe.pasos || 0)} pasos
            </span>
            <span className="carrusel-meta-item">
              <svg className="icon-chef" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" fill="#a259e6" opacity="0.1"/>
                <path d="M8 14c0-2.2 1.8-4 4-4s4 1.8 4 4" stroke="#a259e6" strokeWidth="2" fill="none"/>
                <path d="M12 8c0-1.1.9-2 2-2s2 .9 2 2" stroke="#a259e6" strokeWidth="2" fill="none"/>
                <path d="M10 6h4v2h-4z" fill="#a259e6"/>
              </svg>
              {Array.isArray(currentRecipe.ingredientes) ? currentRecipe.ingredientes.length : (currentRecipe.ingredientes || 0)} ingredientes
            </span>
          </div>
          
          <div className="carrusel-actions">
            <button className="btn-ver-carrusel" onClick={() => onVer(currentRecipe)}>
              Ver
            </button>
            <button className="btn-edit-carrusel" onClick={() => onEditar(currentRecipe)}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25z" stroke="#a259e6" strokeWidth="1.4" fill="none"/>
                <path d="M20.71 7.04a1 1 0 0 0 0-1.41l-2.34-2.34a1 1 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" stroke="#a259e6" strokeWidth="1.4" fill="none"/>
              </svg>
            </button>
            <button className="btn-delete-carrusel" onClick={() => onEliminar(currentRecipe.id)}>
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

      <div className="carrusel-nav">
        <button className="carrusel-btn next" onClick={nextRecipe}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M9 18l6-6-6-6" stroke="#a259e6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
    </div>
  );
}
