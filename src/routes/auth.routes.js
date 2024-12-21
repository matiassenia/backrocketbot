const express = require('express');
const router = express.Router();
const { register, login, profile } = require('../controllers/auth.controller');
const { authenticateToken } = require('../middlewares/auth.middleware');

router.get('/', (req, res) => res.send('API funcionando 🚀'));
router.post('/register', register);
router.post('/login', login);
router.get('/profile', authenticateToken, profile);

module.exports = router;
