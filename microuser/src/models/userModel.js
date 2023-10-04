const mysql = require('mysql2');

// Configuración ficticia de la base de datos
const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'libertyhub'
};

const connection = mysql.createConnection(dbConfig);

const UserModel = {
  authenticate: (email, password, callback) => {
    const query = 'SELECT * FROM users WHERE email = ? AND password = ?';
    connection.query(query, [email, password], (error, results) => {
      if (error) {
        callback(error, null);
      } else if (results.length > 0) {
        callback(null, results[0]);
      } else {
        callback(null, null);
      }
    });
  },

  getUserById: (userId, callback) => {
    const query = 'SELECT * FROM users WHERE id = ?';
    connection.query(query, [userId], (error, results) => {
      if (error) {
        callback(error, null);
      } else if (results.length > 0) {
        callback(null, results[0]);
      } else {
        callback(null, null);
      }
    });
  }
};

module.exports = UserModel;