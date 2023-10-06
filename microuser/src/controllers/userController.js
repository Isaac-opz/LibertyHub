const UserModel = require('../models/userModel');

const UserController = {
    // Otros métodos del controlador

    register: (req, res) => {
      const { nombre_completo, correo, contrasena, tipo_de_usuario } = req.body;
        // Validar datos (puedes hacer más validaciones aquí)
        if (!nombre_completo || !correo || !contrasena || !tipo_de_usuario) {
            return res.status(400).json({ message: 'Todos los campos son obligatorios' });
        }

        // Insertar el nuevo usuario en la base de datos
        UserModel.createUser(nombre_completo, correo, contrasena, tipo_de_usuario, (error, newUser) => {
            if (error) {
                return res.status(500).json({ message: 'Error al registrar el usuario' });
            }
            res.status(201).json({ message: 'Usuario registrado con éxito', user: newUser });
        });
    }
};
// autenticación necesaria
module.exports = UserController;
