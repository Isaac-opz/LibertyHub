const express = require('express');
const morgan = require('morgan');
const propertyController = require('./controllers/propertyController');

const app = express();

app.use(morgan('dev'));
app.use(express.json());

app.get('/properties', propertyController.getProperties);

const PORT = 6771;
app.listen(PORT, () => {
    console.log('Servidor corriendo en http://localhost:${6771}');
});