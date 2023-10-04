const express = require('express');
const morgan = require('morgan');
const UserController = require('./controllers/userController');

const app = express();
const PORT = 6770;

// Middleware
app.use(morgan('dev'));
app.use(express.json());

// Rutas
app.post('/login', UserController.login);
app.get('/profile/:id', UserController.getProfile);

// Iniciar el servidor
app.listen(PORT, () => {
  console.log('Microservicio Usuarios ejecutándose en el puerto ' + PORT);
});