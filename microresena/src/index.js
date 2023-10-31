const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const resenaController = require('./controllers/resenaController');

const app = express();

// Middleware
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

// Rutas
app.use('/propiedades/:propiedadId/resenas', resenaController.obtenerResenas);
app.use('/propiedades/:propiedadId/resenas', resenaController.crearResena);

const PORT = 6773;  
app.listen(PORT, () => {
    console.log(`Reseña Microservicio corriendo en http://localhost:${PORT}`);
});
