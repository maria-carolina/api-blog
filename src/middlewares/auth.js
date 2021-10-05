const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth.json') 

module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if(!authHeader){
        return res.status(401).send({ error: 'Usuário não logado no sistema'})
    }

    const parts = authHeader.split(' ');

    jwt.verify(authHeader, authConfig.secret, (err, decoded) => {
        if (err) {
            console.log(12)
            return res.status(401).send({ error: 'Token inválido'})
        } 

        req.userId = decoded.id; //variavel global 
        return next();
    });
}