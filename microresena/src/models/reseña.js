const mysql = require('mysql2/promise');


const connection = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'libertyhub'
});

exports.getAllReviews = async () => {
    const [rows] = await connection.query('SELECT * FROM resenas');
    return rows;
};

exports.addReview = async (property, email, ranking, comments) => {
    const [result] = await connection.query('INSERT INTO resenas (propiedad, correo, ranking, comentarios) VALUES (?, ?, ?, ?)', [property, email, ranking, comments]);
    return result;
};