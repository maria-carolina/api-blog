const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth.json');

//models
const User = require('../models/User');
const Post = require('../models/Post');


function generateToken(params = {}) {
    //expirar em 1 ano 
    return jwt.sign(params, authConfig.secret, {
        expiresIn: '365d'
    });
}

module.exports = {
    async store(req, res) {
        try {
            const { displayName, email, password, image } = req.body

            const user = await User.create({
                displayName,
                email,
                password,
                image
            });

            return res.status(201).send({
                token: generateToken({ id: user.id })
            });

        } catch (err) {
            const errObj = {};
            let status = 404;

            //colocando for para retornar 1 erro por vez, para controle do codigo do status
            for (var i = 0; i < 1; i++) {
                err.errors.map(er => {
                    errObj['message'] = er.message;
                    //alterar status code quando for erro em campo unique
                    if(er.validatorKey == 'isUnique'){
                        status = 409;
                    }
                });
             }
             
            return res.status(status).send(errObj)
        }

    },

    async login(req, res) {
        try {
            const { email, password } = req.body;

            if (email == undefined)
                return res.status(400).send({ message: 'email is required' })

            if (email == '')
                return res.status(400).send({ message: 'email is not allowed to be empty' })

            if (password == undefined)
                return res.status(400).send({ message: 'password is required' })

            if (password == '')
                return res.status(400).send({ message: 'password is not allowed to be empty' })

            const user = await User.findOne({
                where: { email }
            });


            //se nao encontrar usuário ou senha estiver incorreta
            if (!user || !await bcrypt.compare(password, user.password)) {
                return res.status(400).send({ error: 'Campos inválidos' })
            }

            return res.status(200).send({
                token: generateToken({ id: user.id })
            });
        } catch (err) {
            const errObj = {};
            err.errors.map(er => {
                errObj['message'] = er.message;
            })

            return res.status(400).send(errObj)
        }
    },

    async index(req, res) {
        try {
            const users = await User.findAll();

            return res.status(200).send(users);
        } catch (err) {
            const errObj = {};
            err.errors.map(er => {
                errObj['message'] = er.message;
            })

            return res.status(400).send(errObj)
        }
    },

    async show(req, res) {
        try {
            const { id } = req.params;

            const user = await User.findOne({
                where: { id }
            });

            if (!user)
                return res.status(404).send({ error: 'Usuário não existe' })

            return res.status(200).send(user);

        } catch (err) {
            const errObj = {};
            err.errors.map(er => {
                errObj['message'] = er.message;
            })

            return res.status(400).send(errObj)
        }
    },

    async delete(req, res) {
        await User.destroy({
            where: { id: req.userId }
        });

        return res.status(204).send();
    }
};