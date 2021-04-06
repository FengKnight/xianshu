'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('big_sort', [
      {
        big_sort_id:1,
        big_sort_name: '小说',
      },
      {
        big_sort_id:2,
        big_sort_name: '文学',
      },
      {
        big_sort_id:3,
        big_sort_name: '语言文字',
      },
      {
        big_sort_id:4,
        big_sort_name: '教材',
      },
      {
        big_sort_id:5,
        big_sort_name: '考试',
      },

      {
        big_sort_id:6,
        big_sort_name: '互联网',
      },
    ], {
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('big_sort', null, {});
  }
};