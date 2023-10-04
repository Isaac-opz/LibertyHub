const UserModel = require('../models/userModel');


const UserController = {
  login: (req, res) => {
    const { email, password } = req.body;
    UserModel.authenticate(email, password, (error, user) => {
      if (error) {
        res.status(500).json({ message: 'Error al autenticar el usuario' });
      } else if (user) {
        res.json({ message: 'Usuario autenticado con éxito', user });
      } else {
        res.status(401).json({ message: 'Correo electrónico o contraseña incorrectos' });
      }
    });
  },

  getProfile: (req, res) => {
    const userId = req.params.id;
    UserModel.getUserById(userId, (error, user) => {
      if (error) {
        res.status(500).json({ message: 'Error al obtener el perfil del usuario' });
      } else if (user) {
        res.json(user);
      } else {
        res.status(404).json({ message: 'Usuario no encontrado' });
      }
    });
  }
};

module.exports = UserController;