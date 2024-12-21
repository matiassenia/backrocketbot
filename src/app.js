require('dotenv').config(); // Carga variables de entorno de .env
const express = require('express');
const app = express();

app.use(express.json());

//Importa rutas de autenticación 
const authRoutes = require('./routes/auth.routes');
app.use('/api', authRoutes);

module.exports = app;
