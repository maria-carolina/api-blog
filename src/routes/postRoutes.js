const express = require('express');
const postRoutes = express.Router();
const PostController = require('../controllers/PostController');

postRoutes.post('/post', PostController.store);
postRoutes.get('/post', PostController.index);
postRoutes.put('/post/:id', PostController.update);
postRoutes.get('/post/search', PostController.search);
postRoutes.get('/post/:id', PostController.show);
postRoutes.delete('/post/:id', PostController.delete);

module.exports = postRoutes;