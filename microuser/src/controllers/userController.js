const UserModel = require('../models/userModel');

const UserController = {
    register: (req, res) => {
        const { nombre_completo, correo, contrasena, tipo_de_usuario } = req.body;
        if (!nombre_completo || !correo || !contrasena || !tipo_de_usuario) {
            return res.status(400).json({ message: 'Todos los campos son obligatorios' });
        }

        UserModel.createUser(nombre_completo, correo, contrasena, tipo_de_usuario, (error, newUser) => {
            if (error) {
                return res.status(500).json({ message: 'Error al registrar el usuario' });
            }
            res.status(201).json({ message: 'Usuario registrado con éxito', user: newUser });
        });
    },

    verifyUser: (req, res) => {
        const { correo, contrasena } = req.body;

        if (!correo || !contrasena) {
            return res.status(400).json({ message: 'Correo y contraseña son obligatorios' });
        }

        UserModel.getUserByEmail(correo, (error, users) => {
            if (error) {
                return res.status(500).json({ message: 'Error al verificar el usuario' });
            }

            if (users.length === 0) {
                return res.status(404).json({ message: 'Usuario no encontrado' });
            }

            const user = users[0];

            if (contrasena !== user.contrasena) {
                return res.status(401).json({ message: 'Contraseña incorrecta' });
            }

            res.status(200).json({ message: 'Usuario verificado con éxito', userType: user.tipo_de_usuario });
        });
    }
};
    
module.exports = UserController;