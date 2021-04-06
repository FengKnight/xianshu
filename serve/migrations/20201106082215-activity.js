'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('activity', {

      activity_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true
      },

      title:{
        type: Sequelize.STRING(20),
        allowNull:false,
      },
      port_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      books_id: {
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
      tableName: 'activity',
      charset: 'utf8mb4',
      collate: 'utf8mb4_bin',
    }).then(()=>{
      return queryInterface.addIndex('activity',{
        name: 'activity_id',
        fields: ['activity_id']
      })
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('activity');
  }
};
