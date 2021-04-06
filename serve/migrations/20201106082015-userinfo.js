'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('user_info', {

      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      user_name:{
        type: Sequelize.STRING(20),
        allowNull:false,
        primaryKey: true
      },
      u_password:{
        type:Sequelize.STRING(50),
        allowNull:false
      },
      u_email:{
        type:Sequelize.STRING(50),
        allowNull:false
      },
      street_name:{
        type:Sequelize.STRING,
        allowNull:true
      },
      post_code:{
        type:Sequelize.STRING,
        allowNull:true
      },
      tel:{
        type:Sequelize.STRING,
        allowNull:true
      },
      is_default:{
        type:Sequelize.INTEGER,
        allowNull:false,
        defaultValue: 0
      },
      credits:{
        type:Sequelize.INTEGER,
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
      tableName: 'user_info',
      charset: 'utf8mb4',
      collate: 'utf8mb4_bin',
    }).then(()=>{
      return queryInterface.addIndex('user_info',{
        name: 'user_name',
        fields: ['user_name']
      })
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('user_info');
  }
};
