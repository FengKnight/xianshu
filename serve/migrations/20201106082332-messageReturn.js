'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('messageReturn', {

      return_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true
      },
      message_id:{
        type: Sequelize.INTEGER,
        allowNull:false,
      },
      user_name:{
        type: Sequelize.STRING(20),
        allowNull:false,
      },
      re_content:{
        type: Sequelize.STRING(200),
        allowNull:false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    },{
      tableName: 'messageReturn',
      charset: 'utf8mb4',
      collate: 'utf8mb4_bin',
    }).then(()=>{
      return queryInterface.addIndex('messageReturn',{
        name: 'return_id',
        fields: ['return_id']
      })
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('messageReturn');
  }
};

