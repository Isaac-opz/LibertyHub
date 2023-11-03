const mysql = require('mysql2/promise');
const connection = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'libertyhub'
});

const createReview = async (reviewData) => {
    const query = `
        INSERT INTO libertyhub.reviews
        (propertyId, comment, rating)
        VALUES (?, ?, ?);
    `;
    const values = [
        reviewData.idPropiedad, 
        reviewData.texto, 
        reviewData.calificacion 
    ];
    const [result] = await connection.execute(query, values);
    return result;
};

const getReviewsByPropertyId = async (propertyId) => {
    const query = 'SELECT * FROM libertyhub.reviews WHERE propertyId = ?';
    const [results] = await connection.execute(query, [propertyId]);
    return results;
};

module.exports = {
    createReview,
    getReviewsByPropertyId
};