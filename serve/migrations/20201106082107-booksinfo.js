'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('books_info', {

      books_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true
      },
      books_name:{
        type: Sequelize.STRING(50),
        allowNull:false,
      },
      books_author:{
        type: Sequelize.STRING(50),
        allowNull:false,
      },
      press:{
        type: Sequelize.STRING(50),
        allowNull:false,
      },
      intro:{
        type:Sequelize.STRING(200),
        allowNull:false
      },
      picture:{
        type:Sequelize.STRING(50),
        allowNull:false
      },
      small_sort_id:{
        type:Sequelize.INTEGER,
        allowNull:false
      },
      price:{
        type:Sequelize.FLOAT,
        allowNull:false
      },
      secprice:{
        type:Sequelize.FLOAT,
        allowNull:false
      },
      condition:{
        type:Sequelize.STRING(20),
        allowNull:false
      },
      user_name:{
        type:Sequelize.STRING(20),
        allowNull:false
      },
      books_sums:{
        type:Sequelize.INTEGER,
        allowNull:false
      },
      is_exchange:{
        type:Sequelize.INTEGER,
        defaultValue:0,
        allowNull:false
      },
      buy_year:{
        type:Sequelize.INTEGER,
        defaultValue:0,
        allowNull:false
      },
      is_write:{
        type:Sequelize.INTEGER,
        defaultValue:0,
        allowNull:false
      },
      is_lack:{
        type:Sequelize.INTEGER,
        defaultValue:0,
        allowNull:false
      },
      is_sells:{
        type:Sequelize.INTEGER,
        defaultValue:0,
        allowNull:false
      },
      is_taste:{
        type:Sequelize.INTEGER,
        defaultValue:0,
        allowNull:false
      },
      is_changeColor:{
        type:Sequelize.INTEGER,
        defaultValue:0,
        allowNull:false
      },
      is_check:{
        type:Sequelize.INTEGER,
        defaultValue:0,
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
      tableName: 'books_info',
      charset: 'utf8mb4',
      collate: 'utf8mb4_bin',
    }).then(()=>{
      return queryInterface.addIndex('books_info',{
        name: 'books_id',
        unique: true,
        fields: ['books_id']
      })
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('books_info');
  }
};
