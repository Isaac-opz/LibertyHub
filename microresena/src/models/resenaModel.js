const mysql = require('mysql2/promise');

const connection = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'libertyhub'
});

exports.obtenerReseñasDePropiedad = async (propiedadId) => {
    const [rows] = await connection.query('SELECT * FROM resenas WHERE propiedad = ?', [propiedadId]);
    return rows;
};

exports.crearReseña = async (nuevaReseña) => {
    const { comentarios, ranking } = nuevaReseña;
    await connection.query('INSERT INTO resenas (comentarios, ranking) VALUES (?, ?, ?)', [comentarios, ranking]);
};

// Nota: La función para calcular el promedio de puntuaciones puede mantenerse para uso futuro.
