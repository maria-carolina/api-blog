const express = require('express');
const routes = express.Router();
const authMiddleware = require('../middlewares/auth');

//Routes
const userRoutes = require('./userRoutes');
const postRoutes = require('./postRoutes');

routes.use(userRoutes);

routes.use(authMiddleware);

routes.use(postRoutes);


module.exports = routes;