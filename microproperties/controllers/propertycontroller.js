const Property = require('../models/property');
const axios = require('axios');


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

const updatePropertyRating = async (req, res, next) => {
    const propertyId = req?.params.id || req;

    try {
        const response = await axios.get(`http://localhost:6773/reviews/${propertyId}`);
        const reviews = response.data;
        
        const totalRating = reviews.reduce((acc, review) => acc + review.rating, 0);
        const newRating = reviews.length > 0 ? totalRating / reviews.length : 0;

        const result = await Property.updateProperty(propertyId, { calificacion: newRating.toFixed(2) });
        if (result.affectedRows === 0) {
            throw new Error('No se actualizó ninguna fila');
        }

        if(res) {
            res.json({ message: 'Calificación actualizada correctamente' });
        }
    } catch (error) {
        console.log('Error al actualizar la calificación de la propiedad:', error.message);
        if(res) {
            res.status(500).json({ message: 'Error al actualizar la calificación de la propiedad' });
        }
    }
};


module.exports = {
    getProperties,
    createProperty,
    getPropertyById,
    updatePropertyRating
};