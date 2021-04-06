'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('communication', {

      communication_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true
      },
      user_name:{
        type: Sequelize.STRING(20),
        allowNull:false,
      },
      user_name_buy:{
        type: Sequelize.STRING(20),
        allowNull:false,
      },
      content:{
        type: Sequelize.STRING(200),
        allowNull:false,
      },
      create_time:{
        type: Sequelize.DATE,
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
      tableName: 'communication',
      charset: 'utf8mb4',
      collate: 'utf8mb4_bin',
    }).then(()=>{
      return queryInterface.addIndex('communication',{
        name: 'communication_id',
        fields: ['communication_id']
      })
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('communication');
  }
};

