'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('admin_info', {

      admin_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true
      },
      admin_name:{
        type: Sequelize.STRING(20),
        allowNull:false,
      },
      a_password:{
        type:Sequelize.STRING(50),
        allowNull:false
      },
      a_email:{
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
      tableName: 'admin_info',
      charset: 'utf8mb4',
      collate: 'utf8mb4_bin',
    }).then(()=>{
      return queryInterface.addIndex('admin_info',{
        name: 'admin_id',
        fields: ['admin_id']
      })
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('admin_info');
  }
};
