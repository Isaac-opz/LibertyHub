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
const createProperty = async (req, res) => {
    try {
        const {
            nombre,
            id_anfitrion,
            nombre_anfitrion,
            distrito,
            barrio,
            latitud,
            longitud,
            tipo_habitacion,
            precio,
            minimo_noches,
            numero_opiniones,
            ultima_opinion,
            opiniones_por_mes,
            propiedades_del_anfitrion,
            dias_habiles,
            calificacion
        } = req.body;

        // Validación básica de los campos
        if (!nombre || !id_anfitrion || !nombre_anfitrion || !distrito || !barrio || !latitud || !longitud || !tipo_habitacion || precio == null || minimo_noches == null || numero_opiniones == null || !ultima_opinion || opiniones_por_mes == null || propiedades_del_anfitrion == null || dias_habiles == null || calificacion == null) {
            return res.status(400).json({ message: 'Todos los campos son requeridos' });
        }

        const propertyData = {
            nombre,
            id_anfitrion,
            nombre_anfitrion,
            distrito,
            barrio,
            latitud,
            longitud,
            tipo_habitacion,
            precio,
            minimo_noches,
            numero_opiniones,
            ultima_opinion,
            opiniones_por_mes,
            propiedades_del_anfitrion,
            dias_habiles,
            calificacion
        };

        const result = await Property.createProperty(propertyData);

        if (result.affectedRows > 0) {
            res.status(201).json({ message: 'Propiedad creada con éxito', id: result.insertId });
        } else {
            res.status(400).json({ message: 'Error al crear la propiedad' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al crear la propiedad' });
    }
};

// Exportar propiedades
module.exports = {
    getProperties,
    createProperty
};