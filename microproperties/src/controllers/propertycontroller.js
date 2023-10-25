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

const createProperty = async (req, res) => {
    try {
        const propertyData = req.body;
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

const getPropertyById = async (req, res) => {
    try {
        const id = req.params.id; // Obtiene el ID desde la URL
        const property = await Property.getPropertyById(id);
        if (property) {
            res.json(property);
        } else {
            res.status(404).json({ message: 'Propiedad no encontrada' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener la propiedad' });
    }
};

module.exports = {
    getProperties,
    createProperty,
    getPropertyById
};