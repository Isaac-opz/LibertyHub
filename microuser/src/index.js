const express = require('express');
const morgan = require('morgan');
const cors = require('cors'); // Agrega esta línea
const UserController = require('./controllers/userController');

const app = express();
const PORT = 6770;

// Middleware
app.use(morgan('dev'));
app.use(cors()); // Agrega esta línea para habilitar CORS
app.use(express.json());

// Rutas
app.post("/register", UserController.register);

// Iniciar el servidor
app.listen(PORT, () => {
  console.log('Microservicio Usuarios ejecutándose en el puerto ' + PORT);
});

