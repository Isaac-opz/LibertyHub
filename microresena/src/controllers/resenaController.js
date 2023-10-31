const axios = require('axios');
const resenaModel = require('../models/resenaModel');

exports.obtenerResenas = async (req, res) => {
    const propiedadId = req.params.propiedadId;
    try {
        // Obteniendo las propiedades mediante una petición axios al propertiesController
        const response = await axios.get(`http://localhost:{YOUR_PROPERTIES_PORT}/propiedades/${propiedadId}`);
        
        const propiedades = response.data;
        const resenas = await resenaModel.obtenerResenasDePropiedad(propiedadId);
        
        res.json({ propiedades, resenas });
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener las resenas de la propiedad' });
    }
};

exports.crearResena = async (req, res) => {
    const { comentarios, ranking } = req.body;
    try {
        const nuevaResena = {
            comentarios,
            ranking
        };
        await resenaModel.crearResena(nuevaResena);
        res.json({ message: 'Resena creada exitosamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al crear la resena' });
    }
};
