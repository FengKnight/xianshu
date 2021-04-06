'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('small_sort', {

      small_sort_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true
      },
      small_sort_name:{
        type: Sequelize.STRING(20),
        allowNull:false,
      },
      big_sort_id: {
        type: Sequelize.INTEGER,
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
      tableName: 'small_sort',
      charset: 'utf8mb4',
      collate: 'utf8mb4_bin',
    }).then(()=>{
      return queryInterface.addIndex('small_sort',{
        name: 'big_sort_id',
        fields: ['big_sort_id']
      })
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('small_sort');
  }
};
