const Property = require('../models/property');

const getProperties = async (req, res) => {
    try {
        const filters = req.query; // Aquí puedes obtener los filtros desde la URL
        const properties = await Property.getProperties(filters);
        res.json(properties);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener las propiedades' });
    }
};

module.exports = {
    getProperties
};
