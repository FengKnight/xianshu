'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('content', {

      content_id:{
        type: Sequelize.INTEGER,
        allowNull:false,
        primaryKey:true
      },
      order_id: {
        type: Sequelize.STRING(20),
        allowNull:false
      },
      books_id: {
        type: Sequelize.INTEGER,
        allowNull:false
      },
      books_name: {
        type: Sequelize.STRING(20),
        allowNull:false
      },
      books_price:{
        type: Sequelize.FLOAT,
        allowNull:false
      },
      books_sum:{
        type: Sequelize.INTEGER,
        allowNull:false
      },
      content_cost:{
        type: Sequelize.FLOAT,
        allowNull:false
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
      tableName: 'orders',
      charset: 'utf8mb4',
      collate: 'utf8mb4_bin'
    }).then(()=>{
      return queryInterface.addIndex('content',[
        {
          name: 'order_id',
          fields: ['order_id']
        },
        {
          name: 'books_id',
          fields: ['books_id']
        }
      ])
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('content');
  }
};
