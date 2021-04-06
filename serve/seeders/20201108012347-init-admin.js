'use strict';
const md5 = require('md5')
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('admin_info', [
      {
      admin_id:100000,
      admin_name: 'feng',
      a_password:md5('123456'),
      a_email:'2228373190@qq.com',
      },
      {
        admin_id:100001,
        admin_name: 'liang',
        a_password:md5('123456'),
        a_email:'123456789@qq.com',
      },
    ], {
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('admin_info', null, {});
  }
};
