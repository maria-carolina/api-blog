const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcryptjs');

class User extends Model {
    static init(sequelize) {
        super.init({
            displayName: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    minLength(value) {
                        if (value.length < 8)
                            throw new Error("displayName length must be at least 8 characters long")
                    },
                    notNull: { msg: "displayName is required" },
                    notEmpty: { msg: "displayName is required" }
                }
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    isEmail: {
                        msg: "email must be a valid email"
                    },
                    isUnique(value) {
                        return User.findOne({ where: { email: value } })
                            .then((email) => {
                                if (email)
                                    throw new Error("Usuário já existe")
                            })
                    },
                    notNull: { msg: "email is required" },
                    notEmpty: { msg: "email is required" }
                }
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    minLength(value) {
                        if (value.length < 6)
                            throw new Error("password length must be at least 6 characters long")
                    },
                    notNull: { msg: "password is required" },
                    notEmpty: { msg: "password is required" }
                }
            },
            image: {
                type: DataTypes.STRING,
                allowNull: true,
            }
        }, {
            hooks: {
                beforeCreate: (async (user) => {
                    const hash = await bcrypt.hash(user.password, 10)
                    user.password = hash;
                })
            },
            sequelize,
            tableName: 'Users'
        })
    }
    static associate(models) {
        this.hasMany(models.Post, { foreignKey: 'userId', as: 'posts' });
    }

}

module.exports = User;