module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Posts', { 
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
       },
       title: {
        type: Sequelize.STRING,
        allowNull: false,
       },
       content: {
        type: Sequelize.STRING,
        allowNull: false,
       },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'Users', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
     published: {
       type: Sequelize.DATE,
       allowNull: false,
     },
     updated:{
       type: Sequelize.DATE,
       allowNull: false,
     }
     });
 },

 down: async (queryInterface, Sequelize) => {
   await queryInterface.dropTable('Posts');
 }
};
