const Post = require('../models/Post');
const { Op } = require('sequelize');

module.exports = {

    async store(req, res) {
        try {
            const { title, content } = req.body;

            let min = 100,
                max = 9999,
                genId = Math.random() * (max - min) + min;

            const post = await Post.create({
                id: genId,
                title,
                content,
                userId: req.userId
            });

            return res.status(201).send(post);

        } catch (err) {
            const errObj = {};
            err.errors.map(er => {
                errObj['message'] = er.message;
            })

            return res.status(400).send(err)
        }
    },

    async index(req, res) {
        try {
            const posts = await Post.findAll({
                include: {
                    association: 'user'
                }
            });
            return res.status(200).send(posts);
        } catch (err) {
            return res.send({ error: 'Erro ao alterar postagem' });
        }
    },

    async show(req, res) {
        try {
            const { id } = req.params;
            const post = await Post.findOne({
                where: { id }
            });

            if (!post) {
                return res.status(400).send({ message: 'Not Found' });
            }
            return res.status(200).send(post);
        } catch (err) {
            return res.send({ error: 'Erro' });
        }
    },


    async update(req, res) {
        try {
            const { title, content } = req.body;
            const { id } = req.params;

            let post = await Post.findOne({
                where: { id }
            });

            if (!post)
                return res.status(400).send({ message: 'post não encontrado' });

            if (post.userId !== req.userId)
                return res.status(400).send({ message: 'Nã autorizado' });

            await Post.update({
                title, content
            }, {
                where: { id }
            });

            post = await Post.findOne({
                attributes: ['title', 'content', 'userId']
            }, {
                where: { id }
            });

            return res.status(200).send(post);

        } catch (err) {
            return res.send({ error: 'Erro ao alterar postagem' });
        }
    },

    async search(req, res) {
        try {
            let searchTerm = req.query.q;

            const posts = await Post.findAll({
                where: {
                    [Op.or]: [{
                        title: {
                            [Op.like]: `%${searchTerm}%`
                        }
                    }, {
                        content: {
                            [Op.like]: `%${searchTerm}%`
                        }
                    }]
                }
            });

            return res.status(200).send(posts);

        } catch (err) {
            return res.send({ error: 'Erro' });
        }
    },


    async delete(req, res) {
        try {
            const { id } = req.params;

            let post = await Post.findOne({
                where: { id }
            });

            if (!post)
                return res.status(400).send({ message: 'post não encontrado' });

            if (post.userId !== req.userId)
                return res.status(401).send({ message: 'Não autorizado' });


            await Post.destroy({
                where: { id }
            });

            return res.status(204).send();

        } catch (err) {
            return res.send({ error: 'Erro ao deletar postagem' });
        }
    }

};