'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('message_info', {

      message_id:{
        type: Sequelize.INTEGER,
        allowNull:false,
        primaryKey:true
      },
      user_name: {
        type: Sequelize.STRING(20),
        allowNull:false
      },
      mes_content:{
        type: Sequelize.STRING(200),
        allowNull:false
      },
      like_sum:{
        type: Sequelize.INTEGER,
        allowNull:false,
        defaultValue:0
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
      tableName: 'message_info',
      charset: 'utf8mb4',
      collate: 'utf8mb4_bin'
    }).then(()=>{
      return queryInterface.addIndex('message_info',[
        {
          name: 'message_id',
          fields: ['message_id']
        }
      ])
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('message_info');
  }
};
