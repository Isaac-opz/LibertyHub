const express = require('express');
const morgan = require('morgan');
const propertyController = require('./controllers/propertycontroller');
const cors = require('cors'); // Importa el módulo cors

const app = express();

app.use(cors()); // Habilita CORS para todas las rutas
app.use(morgan('dev'));
//app.use(express.json());

app.get('/properties', propertyController.getProperties);
app.post('/properties', express.json(), propertyController.createProperty);
app.get('/properties/:id', propertyController.getPropertyById);
app.patch('/properties/:id', express.json(), propertyController.updatePropertyRating);

const PORT = 6771;
app.listen(PORT, () => {
    console.log('microservicio de propiedades ejecutándose en el puerto ' + PORT);
});