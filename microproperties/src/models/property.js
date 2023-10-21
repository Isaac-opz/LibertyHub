const mysql = require('mysql2/promise');

const connection = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'libertyhub'
});

const getProperties = async (filters) => {
    let query = 'SELECT * FROM libertyhub.propiedades';
    // Aquí puedes agregar lógica para filtrar los resultados según los filtros proporcionados
    const [results] = await connection.execute(query);
    return results;
};

module.exports = {
    getProperties
};