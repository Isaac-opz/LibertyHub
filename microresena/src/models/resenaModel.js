const mysql = require('mysql2/promise');

const connection = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'libertyhub'
});

exports.obtenerResenasDePropiedad = async (propiedadId) => {
    const [rows] = await connection.query('SELECT * FROM resenas WHERE propiedad = ?', [propiedadId]);
    return rows;
};

exports.crearResena = async (nuevaResena) => {
    const { comentarios, ranking } = nuevaResena;
    await connection.query('INSERT INTO resenas (comentarios, ranking) VALUES (?, ?)', [comentarios, ranking]);
};
