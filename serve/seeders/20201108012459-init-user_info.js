'use strict';
const md5 = require('md5')
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('user_info', [

      {
        user_id:100001,
        user_name: 'laozi',
        is_default:1,
        credits:100,
        u_password:md5('123456'),
        u_email:'1270902783@qq.com',
        street_name:'黄槐楼Y2625',
        post_code:510720,
        tel:15919698363
      },
      {
        user_id:100002,
        user_name: '陈某',
        is_default:1,
        credits:100,
        u_password:md5('123456'),
        u_email:'2228373190@qq.com',
        street_name:'黄槐楼Y2625',
        post_code:510720,
        tel:15919697073
      },
      {
        user_id:100003,
        user_name: '韦某',
        is_default:1,
        credits:100,
        u_password:md5('123456'),
        u_email:'7451016710@qq.com',
        street_name:'黄槐楼Y2624',
        post_code:510720,
        tel:15919695677
      },{
        user_id:100004,
        user_name: 'chen',
        is_default:1,
        credits:100,
        u_password:md5('123456'),
        u_email:'2228373190@qq.com',
        street_name:'黄槐楼Y2625',
        post_code:510720,
        tel:15919698544
      },
    ], {
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('user_info', null, {});
  }
};
