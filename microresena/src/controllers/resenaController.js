const resenaModel = require('../models/resenaModel');

exports.obtenerResenas = async (req, res) => {
    const propiedadId = req.params.propiedadId;
    try {
        const reseñas = await resenaModel.obtenerReseñasDePropiedad(propiedadId);
        res.json(reseñas);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener las reseñas de la propiedad' });
    }
}

exports.crearResena = async (req, res) => {
    const propiedadId = req.params.propiedadId;
    const { usuario, reseña, puntuación } = req.body;

    try {
        const nuevaReseña = {
            propiedadId,
            usuario,
            reseña,
            puntuación
        };
        await resenaModel.crearReseña(nuevaReseña);
        res.json({ message: 'Reseña creada exitosamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al crear la reseña' });
    }
}
