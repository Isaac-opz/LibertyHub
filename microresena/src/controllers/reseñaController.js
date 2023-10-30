const express = require('express');
const router = express.Router();
const axios = require('axios');
const resenaModel = require('../models/reseñaModel'); // Cambiar el nombre del modelo según corresponda

// Endpoint para obtener todas las reseñas de una propiedad específica
router.get('/propiedades/:propiedadId/resenas', obtenerResenas);

// Endpoint para crear una nueva reseña para una propiedad
router.post('/propiedades/:propiedadId/resenas', crearResena);

// Función para obtener todas las reseñas de una propiedad específica
async function obtenerResenas(req, res) {
    const propiedadId = req.params.propiedadId;
    try {
        const reseñas = await resenaModel.obtenerReseñasDePropiedad(propiedadId);
        res.json(reseñas);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener las reseñas de la propiedad' });
    }
}

// Función para crear una nueva reseña para una propiedad
async function crearResena(req, res) {
    const propiedadId = req.params.propiedadId;
    const { usuario, reseña, puntuación } = req.body;

    try {
        // Verificar si el usuario tiene la habilidad de reseñar (propenso a cambios)
        const tipoUsuario = await obtenerTipoUsuario(usuario);

        if (tipoUsuario.permisoReseñar) {
            // Crear la reseña
            const nuevaReseña = {
                propiedadId,
                usuario,
                reseña,
                puntuación
            };
            await resenaModel.crearReseña(nuevaReseña);

            // Calcular el nuevo promedio de puntuaciones de la propiedad y enviarlo al servicio de propiedades
            const promedioPuntuaciones = await resenaModel.calcularPromedioPuntuaciones(propiedadId);
            await enviarPromedioPuntuacionesAPropiedad(propiedadId, promedioPuntuaciones);

            res.json({ mensaje: 'Reseña creada exitosamente' });
        } else {
            res.status(403).json({ error: 'El usuario no tiene permiso para reseñar' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al crear la reseña' });
    }
}

// Función para obtener el tipo de usuario (propenso a cambios)
async function obtenerTipoUsuario(usuarioId) {
    // Realizar una solicitud al microservicio de usuarios para obtener el tipo de usuario
    const response = await axios.get(`http://localhost:3003/usuarios/${usuarioId}`);
    return response.data.tipoUsuario;
}

// Función para enviar el promedio de puntuaciones al microservicio de propiedades
async function enviarPromedioPuntuacionesAPropiedad(propiedadId, promedioPuntuaciones) {
    // Realizar una solicitud al microservicio de propiedades para enviar el promedio de puntuaciones
    await axios.put(`http://localhost:6771/properties/${propiedadId}`, {
        promedioPuntuaciones
    });
}

module.exports = router;