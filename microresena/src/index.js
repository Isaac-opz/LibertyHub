const express = require('express');
const morgan = require('morgan');
const reseñaController = require('./controllers/reseñaController');

const app = express();

// Middleware
app.use(morgan('dev'));
app.use(express.json());

// Rutas
app.get('/reviews', reseñaController.route);
app.post('/reviews', reseñaController.route);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});