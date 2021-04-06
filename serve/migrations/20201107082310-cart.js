'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('cart', {

      cart_id:{
        type: Sequelize.INTEGER,
        allowNull:false,
        primaryKey:true
      },
      user_name: {
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
      books_secprice:{
        type: Sequelize.FLOAT,
        allowNull:false
      },
      books_sums:{
        type: Sequelize.INTEGER,
        allowNull:false
      },
      sumMax:{
        type: Sequelize.INTEGER,
        allowNull:false
      },
      picture:{
        type:Sequelize.STRING(50),
        allowNull:false
      },
      condition:{
        type:Sequelize.STRING(20),
        allowNull:false
      },
      checked:{
        type: Sequelize.INTEGER(1),
        allowNull:false,
        defaultValue: 0
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
      tableName: 'cart',
      charset: 'utf8mb4',
      collate: 'utf8mb4_bin'
    }).then(()=>{
      return queryInterface.addIndex('cart',[
        {
          name: 'user_name',
          fields: ['user_name']
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
