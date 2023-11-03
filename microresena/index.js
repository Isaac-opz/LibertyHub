const express = require('express');
const morgan = require('morgan');
const reviewController = require('./controllers/reviewController');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.post('/reviews', reviewController.createReview);
app.get('/reviews/:propertyId', reviewController.getReviewsByPropertyId);

const PORT = 6773;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
