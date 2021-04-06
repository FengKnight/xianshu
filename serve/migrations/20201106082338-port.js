'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('port', {

      port_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true
      },
      title:{
        type: Sequelize.STRING(50),
        allowNull:false,
      },
      content:{
        type: Sequelize.STRING(200),
        allowNull:false,
      },
      is_show:{
        type: Sequelize.INTEGER,
        allowNull:false,
      },
      img:{
        type:Sequelize.STRING(50),
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
      tableName: 'port',
      charset: 'utf8mb4',
      collate: 'utf8mb4_bin',
    }).then(()=>{
      return queryInterface.addIndex('port',{
        name: 'port_id',
        fields: ['port_id']
      })
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('port');
  }
};
