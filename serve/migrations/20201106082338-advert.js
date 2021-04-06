'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('advert', {

      advert_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true
      },
      content:{
        type: Sequelize.STRING(200),
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
      tableName: 'advert',
      charset: 'utf8mb4',
      collate: 'utf8mb4_bin',
    }).then(()=>{
      return queryInterface.addIndex('advert',{
        name: 'advert_id',
        fields: ['advert_id']
      })
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('advert');
  }
};
