const Review = require('../models/reviewModel');
const axios = require('axios');

const createReview = async (req, res) => {
    try {
        const reviewData = req.body;
        console.log('Datos de la reseña recibidos:', reviewData); // Esta línea es útil para depurar
        
        // Verificar que los datos recibidos no son undefined
        if (typeof reviewData.idPropiedad === 'undefined' || typeof reviewData.texto === 'undefined' || typeof reviewData.calificacion === 'undefined') {
            return res.status(400).json({ message: 'Datos incompletos de la reseña' });
        }

        const result = await Review.createReview(reviewData);
        if (result.affectedRows > 0) {
            await updatePropertyRating(reviewData.idPropiedad); // Asegúrate de que esta línea utiliza el nombre correcto de la propiedad
            res.status(201).json({ message: 'Reseña creada con éxito' });
        } else {
            res.status(400).json({ message: 'Error al crear la reseña' });
        }
    } catch (error) {
        console.log('Error al crear la reseña:', error.message);
        res.status(500).json({ message: 'Error al crear la reseña' });
    }
};

const updatePropertyRating = async (propertyId) => {
    try {
        const reviews = await Review.getReviewsByPropertyId(propertyId);
        const totalRating = reviews.reduce((acc, review) => acc + parseInt(review.rating, 10), 0);
        const newRating = reviews.length > 0 ? totalRating / reviews.length : 0;

        await axios.patch(`http://localhost:6771/properties/${propertyId}`, {
            calificacion: newRating.toFixed(2)
        });

    } catch (error) {
        console.error('Error al actualizar la calificación de la propiedad:', error.message);
        // Aquí deberías manejar el error, quizás reintentando la solicitud o notificando a algún sistema de monitoreo.
    }
};


const getReviewsByPropertyId = async (req, res) => {
    try {
        const propertyId = req.params.propertyId;
        const reviews = await Review.getReviewsByPropertyId(propertyId);
        res.status(200).json(reviews);
    } catch (error) {
        console.error('Error al obtener las reseñas:', error.message);
        res.status(500).json({ message: 'Error al obtener las reseñas' });
    }
};


module.exports = {
    createReview,
    getReviewsByPropertyId
};