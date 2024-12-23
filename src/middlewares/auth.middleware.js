const jwt = require('jsonwebtoken');

//Middleware para verificar si el token es válido
const authenticateToken = (req, res, next) => {
    //Obtener el token 
    const token = req.header('Authorization');
    if (!token) return res.status(401).json({ error: 'Acceso denegado, token no proporcionado' });

    try {
        //Verificación del token y extracción de los datos del user 
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        next();
    } catch (error) {
    res.status(403).json({ error: 'El Token es inválido o expiró' });
    }
};

module.exports = { authenticateToken };
