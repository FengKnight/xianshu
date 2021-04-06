'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('port', [
      {
        port_id:1,
        title: '暂无',
        content:'春',
        img:'lunbo1.jpg',
        is_show:1,
      },
      {
        port_id:2,
        title: '暂无',
        content:'夏',
        img:'lunbo2.jpg',
        is_show:1,
      },
      {
        port_id:3,
        title: '暂无',
        content:'秋',
        img:'lunbo3.jpg',
        is_show:1,
      },
      {
        port_id:4,
        title: '暂无',
        content:'冬天',
        img:'lunbo4.jpg',
        is_show:1,
      },

    ], {
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('port', null, {});
  }
};
