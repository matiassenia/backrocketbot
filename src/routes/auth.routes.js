const express = require('express');
const router = express.Router();

// Imports de controladores y middlewares
const { register, login, profile } = require('../controllers/auth.controller');
const { authenticateToken } = require('../middlewares/auth.middleware');

//Ruta de prueba de API
router.get('/', (req, res) => res.send('API ROCKETBOT de Matías funcionando! 🚀'));
//Rutas 
router.post('/register', register);
router.post('/login', login);
router.get('/profile', authenticateToken, profile);//Ruta protegida

module.exports = router;
