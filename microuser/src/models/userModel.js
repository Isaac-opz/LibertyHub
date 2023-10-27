const mysql = require('mysql2');

// Configuración de la base de datos
const dbConfig = {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'libertyhub'
};

const connection = mysql.createConnection(dbConfig);

const UserModel = {
    createUser: (nombre_completo, correo, contrasena, tipo_de_usuario, callback) => {
        const query = 'INSERT INTO users (nombre_completo, correo, contrasena, tipo_de_usuario) VALUES (?, ?, ?, ?)';
        connection.query(query, [nombre_completo, correo, contrasena, tipo_de_usuario], (error, results) => {
            if (error) {
                callback(error, null);
            } else {
                callback(null, results);
            }
        });
    },

    getUserByEmail: (correo, callback) => {
        const query = 'SELECT * FROM users WHERE correo = ?';
        connection.query(query, [correo], (error, results) => {
            if (error) {
                callback(error, null);
            } else {
                callback(null, results);
            }
        });
    }
};

module.exports = UserModel;
