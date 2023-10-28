const mysql = require('mysql2/promise');
const connection = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'libertyhub'
});

// Función para listar propiedades
const getProperties = async (filters) => {
    let query = 'SELECT * FROM libertyhub.propiedades';
    // Se puede agregar lógica para filtrar los resultados según los filtros proporcionados
    const [results] = await connection.execute(query);
    return results;
};

// Función para crear propiedades
const createProperty = async (propertyData) => {
    const query = `
        INSERT INTO libertyhub.propiedades
        (nombre, id_anfitrion, nombre_anfitrion, distrito, barrio, latitud, longitud, tipo_habitacion, precio, minimo_noches, numero_opiniones, ultima_opinion, opiniones_por_mes, propiedades_del_anfitrion, dias_habiles, calificacion)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
    `;

    const values = [
        propertyData.nombre,
        propertyData.id_anfitrion,
        propertyData.nombre_anfitrion,
        propertyData.distrito,
        propertyData.barrio,
        propertyData.latitud,
        propertyData.longitud,
        propertyData.tipo_habitacion,
        propertyData.precio,
        propertyData.minimo_noches,
        propertyData.numero_opiniones,
        propertyData.ultima_opinion,
        propertyData.opiniones_por_mes,
        propertyData.propiedades_del_anfitrion,
        propertyData.dias_habiles,
        propertyData.calificacion
    ];

    const [result] = await connection.execute(query, values);
    return result;
};

const getPropertyById = async (id) => {
    const query = 'SELECT * FROM libertyhub.propiedades WHERE id = ?';
    const [results] = await connection.execute(query, [id]);
    return results[0]; // Retorna la primera propiedad que coincida con el ID o undefined si no hay coincidencias
};

module.exports = {
    getProperties,
    createProperty,
    getPropertyById
};