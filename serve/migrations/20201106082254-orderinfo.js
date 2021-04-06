'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('order_info', {

      order_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true
      },
      user_name:{
        type: Sequelize.STRING(20),
        allowNull:false,
      },
      consignee:{
        type: Sequelize.STRING(20),
        allowNull:false,
      },
      address:{
        type: Sequelize.STRING(50),
        allowNull:false,
      },
      tel: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      email: {
        type: Sequelize.STRING(20),
        allowNull: true,
      },
      order_time: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      cost: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      state: {
        type: Sequelize.STRING(20),
        allowNull: false,
      },
      send: {
        type: Sequelize.STRING(20),
        allowNull: false,
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
      tableName: 'order_info',
      charset: 'utf8mb4',
      collate: 'utf8mb4_bin',
    }).then(()=>{
      return queryInterface.addIndex('order_info',{
        name: 'order_id',
        fields: ['order_id']
      })
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('order_info');
  }
};
