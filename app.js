import express from 'express';
import mongoose from 'mongoose';
import passport from './config/passport.js';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';


dotenv.config();

import authRoutes from './routes/auth.js';
import sessionRoutes from './routes/sessions.js';

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(passport.initialize());

// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/sessions', sessionRoutes);

// Conexión a MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB conectado'))
.catch(err => console.log(err));

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
