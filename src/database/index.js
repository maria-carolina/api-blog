const Sequelize = require('sequelize');
const dbConfig = require('../config/database');
const connection = new Sequelize(dbConfig);

//models
const Post = require('../models/Post');
const User = require('../models/User');

//passando conexão
Post.init(connection);
User.init(connection);

//passando models para as associações
Post.associate(connection.models);
User.associate(connection.models);


module.exports = connection;
