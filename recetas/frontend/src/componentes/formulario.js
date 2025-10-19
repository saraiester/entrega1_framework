import React, { useEffect, useState, useRef } from 'react';
import './Formulario.css';

// Implementación alternativa del componente Formulario
// Mantiene la misma API pública y las clases CSS empleadas por la app.
export default function Formulario(props) {
  const {
    titulo = '',
    subtitulo = '',
    descripcion = '',
    campos = [],
    botones = [],
    onSubmit = () => {},
    onChange = () => {},
    onFieldChange = () => {},
    validacionEnTiempoReal = true,
    mostrarErrores = true,
    tema = 'default',
    layout = 'vertical',
    tamano = 'medium',
    className = '',
    style = {},
    cargando = false,
    deshabilitado = false,
    mensajeExito = '',
    mensajeError = '',
    autoFocus = false,
    resetOnSubmit = false,
    ...rest
  } = props;

  const [datos, setDatos] = useState({});
  const [errores, setErrores] = useState({});
  const [touched, setTouched] = useState({});
  const [enviado, setEnviado] = useState(false);
  const firstInputRef = useRef(null);

  // Inicializar valores
  useEffect(() => {
    const init = {};
    campos.forEach(c => {
      init[c.nombre] = c.valorInicial ?? (c.tipo === 'checkbox' ? false : '');
    });
    setDatos(init);
  }, [campos]);

  useEffect(() => {
    if (autoFocus && firstInputRef.current) firstInputRef.current.focus();
  }, [autoFocus, firstInputRef]);

  const validarCampo = (campo, valor) => {
    const conf = campo.validacion || {};
    const erroresCampo = [];

    if (conf.requerido && (valor === undefined || valor === null || String(valor).trim() === '')) {
      erroresCampo.push(conf.mensajeRequerido || `${campo.nombre} es obligatorio`);
    }
    if (conf.minLength && valor && String(valor).length < conf.minLength) {
      erroresCampo.push(conf.mensajeMinLength || `Mínimo ${conf.minLength} caracteres`);
    }
    if (conf.maxLength && valor && String(valor).length > conf.maxLength) {
      erroresCampo.push(conf.mensajeMaxLength || `Máximo ${conf.maxLength} caracteres`);
    }
    if (conf.patron && valor && !conf.patron.test(valor)) {
      erroresCampo.push(conf.mensajePatron || 'Formato inválido');
    }
    if (conf.validacionPersonalizada && typeof conf.validacionPersonalizada === 'function') {
      const r = conf.validacionPersonalizada(valor, datos);
      if (r) erroresCampo.push(r);
    }

    return erroresCampo;
  };

  const validarFormulario = () => {
    const nuevos = {};
    let ok = true;
    campos.forEach(c => {
      const campoErrores = validarCampo(c, datos[c.nombre]);
      if (campoErrores.length) {
        nuevos[c.nombre] = campoErrores;
        ok = false;
      }
    });
    setErrores(nuevos);
    return ok;
  };

  const handleChange = (nombre, valor) => {
    setDatos(prev => {
      const next = { ...prev, [nombre]: valor };
      onChange(next);
      onFieldChange(nombre, valor, next);
      return next;
    });

    setTouched(prev => ({ ...prev, [nombre]: true }));

    if (validacionEnTiempoReal) {
      const campo = campos.find(c => c.nombre === nombre);
      if (campo) {
        const errs = validarCampo(campo, valor);
        setErrores(prev => ({ ...prev, [nombre]: errs }));
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEnviado(true);
    const isValid = validarFormulario();
    if (!isValid) return;
    try {
      await onSubmit(datos, e);
      if (resetOnSubmit) {
        const empty = {};
        campos.forEach(c => (empty[c.nombre] = c.tipo === 'checkbox' ? false : ''));
        setDatos(empty);
        setErrores({});
        setTouched({});
      }
    } catch (err) {
      // dejar que el caller maneje errores globales
      console.error(err);
    }
  };

  // Render helpers
  const renderField = (campo, index) => {
    const nombre = campo.nombre;
    const tipo = campo.tipo || 'text';
    const placeholder = campo.placeholder || campo.etiqueta || '';
    const valor = datos[nombre];
    const hasError = errores[nombre] && errores[nombre].length > 0;
    const showError = hasError && (touched[nombre] || enviado);

    const common = {
      id: nombre,
      name: nombre,
      placeholder,
      disabled: deshabilitado || campo.disabled,
      className: `formulario-input ${showError ? 'error' : ''} ${campo.className || ''}`,
    };

    if (tipo === 'select') {
      return (
        <div key={nombre} className={`formulario-campo ${tipo}`}>
          <select {...common} value={valor || ''} onChange={e => handleChange(nombre, e.target.value)}>
            <option value="">{placeholder || `Selecciona`}</option>
            {(campo.opciones || []).map((op, i) => (
              <option key={i} value={op.valor ?? op}>{op.texto ?? op}</option>
            ))}
          </select>
          {showError && <div className="formulario-error">{errores[nombre].map((m, i) => <div key={i}>{m}</div>)}</div>}
        </div>
      );
    }

    if (tipo === 'textarea') {
      return (
        <div key={nombre} className={`formulario-campo ${tipo}`}>
          <textarea {...common} rows={campo.rows || 4} value={valor || ''} onChange={e => handleChange(nombre, e.target.value)} />
          {showError && <div className="formulario-error">{errores[nombre].map((m, i) => <div key={i}>{m}</div>)}</div>}
        </div>
      );
    }

    if (tipo === 'checkbox') {
      return (
        <div key={nombre} className={`formulario-campo ${tipo}`}>
          <div className="formulario-checkbox">
            <input type="checkbox" id={nombre} checked={!!valor} onChange={e => handleChange(nombre, e.target.checked)} />
            <label htmlFor={nombre}>{campo.etiqueta || placeholder}</label>
          </div>
          {showError && <div className="formulario-error">{errores[nombre].map((m, i) => <div key={i}>{m}</div>)}</div>}
        </div>
      );
    }

    // default input (text, email, password, number...)
    return (
      <div key={nombre} className={`formulario-campo ${tipo}`}>
        <input
          ref={index === 0 ? firstInputRef : null}
          type={tipo}
          value={valor ?? ''}
          onChange={e => handleChange(nombre, e.target.value)}
          {...common}
        />
        {showError && <div className="formulario-error">{errores[nombre].map((m, i) => <div key={i}>{m}</div>)}</div>}
      </div>
    );
  };

  const renderButton = (boton, i) => {
    const tipo = boton.tipo || 'button';
    const texto = boton.texto || 'Botón';
    const clase = `formulario-boton ${boton.className || ''} ${cargando ? 'cargando' : ''}`.trim();

    const handleClick = (e) => {
      if (tipo !== 'submit' && typeof boton.onClick === 'function') boton.onClick(e);
    };

    return (
      <button key={i} type={tipo} className={clase} disabled={deshabilitado || boton.disabled || cargando} onClick={handleClick}>
        {cargando && tipo === 'submit' ? <><span className="spinner"></span>{texto}</> : texto}
      </button>
    );
  };

  const clasesContenedor = ['formulario-contenedor', `tema-${tema}`, `layout-${layout}`, `tamano-${tamano}`, cargando ? 'cargando' : '', deshabilitado ? 'deshabilitado' : '', className].filter(Boolean).join(' ');

  return (
    <div className={clasesContenedor} style={style} {...rest}>
      {(titulo || subtitulo || descripcion) && (
        <div className="formulario-header">
          {titulo && <h2 className="formulario-titulo">{titulo}</h2>}
          {subtitulo && <h3 className="formulario-subtitulo">{subtitulo}</h3>}
          {descripcion && <p className="formulario-descripcion">{descripcion}</p>}
        </div>
      )}

      {mensajeExito && <div className="formulario-mensaje exito">{mensajeExito}</div>}
      {mensajeError && <div className="formulario-mensaje error">{mensajeError}</div>}

      <form className="formulario" onSubmit={handleSubmit}>
        <div className="formulario-campos">
          {campos.map((c, i) => renderField(c, i))}
        </div>

        {botones && botones.length > 0 && (
          <div className="formulario-botones">
            {botones.map((b, i) => renderButton(b, i))}
          </div>
        )}
      </form>
    </div>
  );
}
