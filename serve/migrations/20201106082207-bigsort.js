'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('big_sort', {

      big_sort_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true
      },
      big_sort_name:{
        type: Sequelize.STRING(20),
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
      tableName: 'big_sort',
      charset: 'utf8mb4',
      collate: 'utf8mb4_bin',
    }).then(()=>{
      return queryInterface.addIndex('big_sort',{
        name: 'big_sort_id',
        unique: true,
        fields: ['big_sort_id']
      })
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('big_sort');
  }
};
