const express = require('express');
const morgan = require('morgan');
const cors = require('cors'); // Comunicacion http a json (peticiones)
const UserController = require('./controllers/userController');

const app = express();
const PORT = 6770;

// Middleware
app.use(morgan('dev'));
app.use(cors()); // Línea para habilitar CORS
app.use(express.json());

// Rutas
app.post("/register", UserController.register);

// Iniciar el servidor
app.listen(PORT, () => {
  console.log('Microservicio Usuarios ejecutándose en el puerto ' + PORT);
});

