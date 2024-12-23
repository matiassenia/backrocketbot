//Dependencias 
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

//Controlador para registrar un nuevo usuario
const register = async (req, res) => {
    const { email, password, name } = req.body;
    try {
        //Contraseña encriptada del usuario
        const hashedPassword = await bcrypt.hash(password, 10);

        //Creación de un nuevo usuario en la db
        const user = await prisma.user.create({
            data: { email, password: hashedPassword, name },
        });

        // Excluye la contraseña antes de enviar la respuesta, muestra solo el nombre
        const userWithoutData = {
            name: user.name
        }
        
        //Msj y status correspondiente con el usuario creado
        res.status(201).json({ message: 'Usuario creado con éxito', user: userWithoutData });
    } catch (error) {
    res.status(400).json({ error: 'Error al registrar usuario' });
    } 
};

//Controlador para inicio de sesión
const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        //Busca al usuario por su correo electrónico sino envía el status correspondiente
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });
        
        //Verifica que la contraseña sea correcta
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) return res.status(401).json({ error: 'Contraseña incorrecta' });
        
        //Genera el token JWT con una duración de 1 HORA
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        
        //Responde con el token generado
        res.json({ message: 'Login exitoso', token });
    } catch (error) {
    res.status(500).json({ error: 'Error en el login' });
    }
};

//Controlador para obtener datos del usuario 
const profile = async (req, res) => {
    try {
        //Obtiene al user autenticado desde la db
        const user = await prisma.user.findUnique({ where: { id: req.user.id } });

        //Responde con los datos del user sin la cntraseña
        res.json({ user });
    } catch (error) {
    res.status(500).json({ error: 'Error al obtener el perfil' });
    }
};

module.exports = { register, login, profile };
