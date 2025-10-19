const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(bodyParser.json());

const DB_PATH = path.join(__dirname, 'data.json');

function readDB() {
  const raw = fs.readFileSync(DB_PATH, 'utf8');
  return JSON.parse(raw);
}

function writeDB(data) {
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2), 'utf8');
}

app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  const db = readDB();
  const user = db.usuarios.find(u => u.username === username && u.password === password);
  if (user) {
    // Simple token simulado (no seguro)
    const token = `token-${user.id}-${Date.now()}`;
    return res.json({ ok: true, token, user: { id: user.id, username: user.username } });
  }
  return res.status(401).json({ ok: false, mensaje: 'Credenciales inválidas' });
});


app.get('/api/recetas', (req, res) => {
  const db = readDB();
  res.json({ ok: true, recetas: db.recetas });
});

// Eliminar receta
app.delete('/api/recetas/:id', (req, res) => {
  const db = readDB();
  const id = parseInt(req.params.id);
  const idx = db.recetas.findIndex(r => r.id === id);
  if (idx === -1) return res.status(404).json({ ok: false, mensaje: 'Receta no encontrada' });
  db.recetas.splice(idx, 1);
  writeDB(db);
  res.json({ ok: true });
});

// Editar receta
app.put('/api/recetas/:id', (req, res) => {
  const db = readDB();
  const id = parseInt(req.params.id);
  const idx = db.recetas.findIndex(r => r.id === id);
  if (idx === -1) return res.status(404).json({ ok: false, mensaje: 'Receta no encontrada' });
  const receta = db.recetas[idx];
  const { titulo, descripcion, pasos, ingredientes } = req.body;
  receta.titulo = titulo ?? receta.titulo;
  receta.descripcion = descripcion ?? receta.descripcion;
  receta.pasos = pasos ?? receta.pasos;
  receta.ingredientes = ingredientes ?? receta.ingredientes;
  writeDB(db);
  res.json({ ok: true, receta });
});

// Crear nueva receta
app.post('/api/recetas', (req, res) => {
  const db = readDB();
  const { titulo, descripcion, ingredientes, pasos, comentarios } = req.body;
  
  // Validar datos requeridos
  if (!titulo || !descripcion) {
    return res.status(400).json({ ok: false, mensaje: 'Título y descripción son requeridos' });
  }
  
  // Crear nueva receta con ID único
  const nuevaReceta = {
    id: Date.now(),
    titulo,
    descripcion,
    ingredientes: Array.isArray(ingredientes) ? ingredientes : [],
    pasos: Array.isArray(pasos) ? pasos : [],
    comentarios: comentarios || ''
  };
  
  db.recetas.push(nuevaReceta);
  writeDB(db);
  
  res.json({ ok: true, receta: nuevaReceta });
});

app.post('/api/registro', (req, res) => {
  const { username, password } = req.body;
  const db = readDB();
  if (db.usuarios.find(u => u.username === username)) {
    return res.status(400).json({ ok: false, mensaje: 'Usuario ya existe' });
  }
  const nuevo = { id: Date.now(), username, password };
  db.usuarios.push(nuevo);
  writeDB(db);
  return res.json({ ok: true, user: { id: nuevo.id, username: nuevo.username } });
});

app.listen(PORT, () => {
  console.log(`Backend escuchando en http://localhost:${PORT}`);
});
