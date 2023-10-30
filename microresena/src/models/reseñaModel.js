const mysql = require('mysql2/promise');

const connection = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'libertyhub'
});

// Función para obtener todas las reseñas de una propiedad específica
exports.obtenerReseñasDePropiedad = async (propiedadId) => {
    const [rows] = await connection.query('SELECT * FROM resenas WHERE propiedad = ?', [propiedadId]);
    return rows;
};

// Función para crear una nueva reseña
exports.crearReseña = async (nuevaReseña) => {
    const { propiedadId, usuario, reseña, puntuación } = nuevaReseña;
    const [result] = await connection.query('INSERT INTO resenas (propiedad, usuario, reseña, puntuación) VALUES (?, ?, ?, ?)', [propiedadId, usuario, reseña, puntuación]);
    return result;
};

// Función para calcular el promedio de puntuaciones de una propiedad
exports.calcularPromedioPuntuaciones = async (propiedadId) => {
    const [result] = await connection.query('SELECT AVG(puntuación) AS promedio FROM resenas WHERE propiedad = ?', [propiedadId]);
    return result[0].promedio;
};