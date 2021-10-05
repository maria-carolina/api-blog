const { Model, DataTypes } = require('sequelize');

class Post extends Model {
    static init(sequelize) {
        super.init({
            title: {
                type: DataTypes.INTEGER,
                allowNull: false,
                validate: {
                    notNull: { msg: "title is required" },
                    notEmpty: { msg: "title is required" }
                }
            },
            content: {
                type: DataTypes.INTEGER,
                allowNull: false,
                validate: {
                    notNull: { msg: "content is required" },
                    notEmpty: { msg: "content is required" }
                }
            },
            published: {
                type: DataTypes.DATE,
                allowNull: false
            },
            updated: {
                type: DataTypes.DATE,
                allowNull: false
            }
        }, {
            sequelize,
            timestamps: true,
            tableName: 'Posts',
            createdAt: 'published',
            updatedAt: 'updated',
        })
    }
    static associate(models) {
        this.belongsTo(models.User, { foreignKey: 'userId', as: 'user' })
    }

}

module.exports = Post;