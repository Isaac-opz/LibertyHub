const reseñaModel = require('../models/reseña');

exports.getReviews = async (req, res) => {
    try {
        const reviews = await reseñaModel.getAllReviews();
        res.status(200).json(reviews);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.postReview = async (req, res) => {
    const { property, email, ranking, comments } = req.body;

    if (!property || !email || !ranking || !comments) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        await reseñaModel.addReview(property, email, ranking, comments);
        res.status(201).json({ message: 'Review added' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
