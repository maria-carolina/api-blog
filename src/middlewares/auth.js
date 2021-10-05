const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth.json') 

module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if(!authHeader){
        return res.status(401).send({ message: 'Token não encontrado'})
    }

    const parts = authHeader.split(' ');

    jwt.verify(authHeader, authConfig.secret, (err, decoded) => {
        if (err) {
            return res.status(401).send({ message: 'Token expirado ou inválido'})
        } 

        req.userId = decoded.id; //variavel global 
        return next();
    });
}