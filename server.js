// server.js
const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

app.use(express.json());
app.set('trust proxy', true);

// Servir archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

app.post('/ubicacion', (req, res) => {
  const ip = req.ip;
  const { latitude, longitude } = req.body;

  console.log("📥 Petición recibida:");
  console.log(`🌐 IP del visitante: ${ip}`);
  if (latitude && longitude) {
    console.log(`📍 Coordenadas GPS: ${latitude}, ${longitude}`);
  } else {
    console.log("❌ Usuario no permitió acceso a la ubicación.");
  }

  res.sendStatus(200);
});

// Redirección por defecto a página de entrada
app.get('*', (_, res) => {
  res.sendFile(path.join(__dirname, 'public', 'ubicacion-requerida.html'));
});


app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
