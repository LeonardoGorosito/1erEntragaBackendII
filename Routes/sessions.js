
import express from 'express';
import passport from 'passport';

const router = express.Router();

// Ruta para verificar la sesión actual del usuario
router.get('/current', passport.authenticate('jwt', { session: false }), (req, res) => {
  try {
    // Si el usuario está autenticado, `req.user` contendrá sus datos
    res.json({ message: 'Usuario autenticado', user: req.user });
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener usuario actual', error: err.message });
  }
});

export default router;
