import express from 'express';
import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

// Registro de Usuario
router.post('/register', async (req, res) => {
  const { first_name, last_name, email, age, password, cart } = req.body;
  
  try {
    // Verificar si el email ya está registrado
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'El email ya está registrado' });
    }

    const user = new User({
      first_name,
      last_name,
      email,
      age,
      password,
      cart
    });

    await user.save();
    res.status(201).json({ message: 'Usuario registrado exitosamente' });
  } catch (err) {
    res.status(500).json({ message: 'Error al registrar el usuario', error: err.message });
  }
});

// Login de Usuario
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  
  try {
    // Encontrar el usuario por email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Credenciales inválidas' });
    }

    // Verificar la contraseña
    const isMatch = user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Credenciales inválidas' });
    }

    // Generar JWT
    const payload = { id: user._id, role: user.role };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Enviar el token en una cookie
    res.cookie('jwt', token, { httpOnly: true, secure: false }); // Asegúrate de configurar 'secure: true' en producción
    res.json({ message: 'Login exitoso' });
  } catch (err) {
    res.status(500).json({ message: 'Error al iniciar sesión', error: err.message });
  }
});

// Logout de Usuario
router.post('/logout', (req, res) => {
  res.clearCookie('jwt');
  res.json({ message: 'Logout exitoso' });
});

export default router;

//
