import React, { useState, useEffect } from 'react';
import './Formulario.css';

export default function FormularioReceta({ 
  receta = null, 
  onGuardar, 
  onCancelar, 
  titulo = "Nueva Receta" 
}) {
  const [formData, setFormData] = useState({
    titulo: '',
    descripcion: '',
    ingredientes: [],
    pasos: [],
    comentarios: ''
  });

  // Inicializar datos del formulario
  useEffect(() => {
    if (receta) {
      setFormData({
        titulo: receta.titulo || '',
        descripcion: receta.descripcion || '',
        ingredientes: Array.isArray(receta.ingredientes) ? receta.ingredientes.filter(ing => ing && typeof ing === 'object') : [],
        pasos: Array.isArray(receta.pasos) ? receta.pasos : [],
        comentarios: receta.comentarios || ''
      });
    } else {
      // Para nueva receta, inicializar con arrays vacíos
      setFormData({
        titulo: '',
        descripcion: '',
        ingredientes: [],
        pasos: [],
        comentarios: ''
      });
    }
  }, [receta]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleIngredienteChange = (index, field, value) => {
    const newIngredientes = [...(formData.ingredientes || [])];
    // Asegurar que el ingrediente sea un objeto válido
    if (!newIngredientes[index] || typeof newIngredientes[index] !== 'object') {
      newIngredientes[index] = { nombre: '', cantidad: '' };
    }
    newIngredientes[index] = {
      ...newIngredientes[index],
      [field]: value
    };
    setFormData(prev => ({
      ...prev,
      ingredientes: newIngredientes
    }));
  };

  const addIngrediente = () => {
    setFormData(prev => ({
      ...prev,
      ingredientes: [...(prev.ingredientes || []), { nombre: '', cantidad: '' }]
    }));
  };

  const removeIngrediente = (index) => {
    setFormData(prev => ({
      ...prev,
      ingredientes: (prev.ingredientes || []).filter((_, i) => i !== index)
    }));
  };

  const handlePasoChange = (index, value) => {
    const newPasos = [...(formData.pasos || [])];
    newPasos[index] = value;
    setFormData(prev => ({
      ...prev,
      pasos: newPasos
    }));
  };

  const addPaso = () => {
    setFormData(prev => ({
      ...prev,
      pasos: [...(prev.pasos || []), '']
    }));
  };

  const removePaso = (index) => {
    setFormData(prev => ({
      ...prev,
      pasos: (prev.pasos || []).filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Formulario enviado con datos:', formData);
    onGuardar(formData);
  };

  return (
    <div className="modal-bg" onClick={onCancelar}>
      <div className="modal formulario-modal" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onCancelar} title="Cerrar">&times;</button>
        
        <h2 className="formulario-titulo">{titulo}</h2>
        
        <form className="formulario-receta" onSubmit={handleSubmit}>
          {/* Título de la Receta */}
          <div className="formulario-campo">
            <label className="formulario-label">Título de la Receta</label>
            <input 
              className="formulario-input" 
              type="text" 
              value={formData.titulo}
              onChange={(e) => handleInputChange('titulo', e.target.value)}
              placeholder="Título" 
              required 
            />
          </div>

          {/* Descripción */}
          <div className="formulario-campo">
            <label className="formulario-label">Descripción</label>
            <textarea 
              className="formulario-textarea" 
              value={formData.descripcion}
              onChange={(e) => handleInputChange('descripcion', e.target.value)}
              placeholder="Descripción" 
              required 
            />
          </div>


          {/* Ingredientes */}
          <div className="formulario-campo">
            <div className="formulario-campo-header">
              <label className="formulario-label">Ingredientes</label>
              <button 
                type="button" 
                className="btn-agregar-campo" 
                onClick={addIngrediente}
              >
                + Agregar
              </button>
            </div>
            
            <div className="ingredientes-container">
              {(formData.ingredientes || []).map((ingrediente, index) => (
                <div key={index} className="ingrediente-fila">
                  <input 
                    className="formulario-input ingrediente-nombre" 
                    type="text" 
                    value={ingrediente && typeof ingrediente === 'object' ? ingrediente.nombre || '' : ''}
                    onChange={(e) => handleIngredienteChange(index, 'nombre', e.target.value)}
                    placeholder="Nombre del ingrediente" 
                    required 
                  />
                  <input 
                    className="formulario-input ingrediente-cantidad" 
                    type="text" 
                    value={ingrediente && typeof ingrediente === 'object' ? ingrediente.cantidad || '' : ''}
                    onChange={(e) => handleIngredienteChange(index, 'cantidad', e.target.value)}
                    placeholder="Cantidad" 
                    required 
                  />
                  <button 
                    type="button" 
                    className="btn-eliminar" 
                    onClick={() => removeIngrediente(index)}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Pasos a Seguir */}
          <div className="formulario-campo">
            <div className="formulario-campo-header">
              <label className="formulario-label">Pasos a Seguir</label>
              <button 
                type="button" 
                className="btn-agregar-campo" 
                onClick={addPaso}
              >
                + Agregar Paso
              </button>
            </div>
            
            <div className="pasos-container">
              {(formData.pasos || []).map((paso, index) => (
                <div key={index} className="paso-fila">
                  <span className="paso-numero">{index + 1}</span>
                  <textarea 
                    className="formulario-textarea paso-texto" 
                    value={paso}
                    onChange={(e) => handlePasoChange(index, e.target.value)}
                    placeholder={`Paso ${index + 1}`} 
                    required 
                  />
                  <button 
                    type="button" 
                    className="btn-eliminar" 
                    onClick={() => removePaso(index)}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Comentarios */}
          <div className="formulario-campo">
            <label className="formulario-label">Comentarios (opcional)</label>
            <textarea 
              className="formulario-textarea" 
              value={formData.comentarios}
              onChange={(e) => handleInputChange('comentarios', e.target.value)}
              placeholder="Comentarios adicionales..." 
            />
          </div>

          {/* Botones */}
          <div className="formulario-botones">
            <button type="submit" className="btn-actualizar">
              {receta ? 'Actualizar Receta' : 'Crear Receta'}
            </button>
            <button type="button" className="btn-cancelar" onClick={onCancelar}>
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
