const pool = require('./database');

const getProperties = async (filters) => {
    let query = 'SELECT * FROM ab_nyc_2019';
    // Aquí puedes agregar lógica para filtrar los resultados según los filtros proporcionados
    const [results] = await pool.execute(query);
    return results;
};

module.exports = {
    getProperties
};