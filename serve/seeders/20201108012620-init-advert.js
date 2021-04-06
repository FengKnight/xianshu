'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('advert', [
      {
        advert_id:1,
        content:'1',
        img:'ad01.png',
      },
      {
        advert_id:2,
        content:'2',
        img:'ad02.png',
      },
      {
        advert_id:3,
        content:'3',
        img:'ad03.png',
      },
      {
        advert_id:4,
        content:'4',
        img:'ad04.png',
      },


    ], {
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('advert', null, {});
  }
};
