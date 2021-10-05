const express = require('express');
const userRoutes = express.Router();
const authMiddleware = require('../middlewares/auth');
const UserController = require('../controllers/UserController');

userRoutes.post('/user', UserController.store);
userRoutes.post('/login', UserController.login);

userRoutes.use(authMiddleware);

userRoutes.get('/user', UserController.index);
userRoutes.get('/user/:id', UserController.show);
userRoutes.delete('/user/me', UserController.delete);

module.exports = userRoutes;