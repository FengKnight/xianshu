'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('small_sort', [
      {
        big_sort_id:1,
        small_sort_id:1001,
        small_sort_name: '中国古典小说',
      },
      {
        big_sort_id:1,
        small_sort_id:1002,
        small_sort_name: '中国现代小说',
      },
      {
        big_sort_id:1,
        small_sort_id:1003,
        small_sort_name: '中国当代小说',
      },
      {
        big_sort_id:1,
        small_sort_id:1004,
        small_sort_name: '四大名著',
      },
      {
        big_sort_id:1,
        small_sort_id:1005,
        small_sort_name: '世界名著',
      },
      {
        big_sort_id:1,
        small_sort_id:1006,
        small_sort_name: '传说神话',
      },
      {
        big_sort_id:1,
        small_sort_id:1007,
        small_sort_name: '外国小说',
      },
      {
        big_sort_id:1,
        small_sort_id:1008,
        small_sort_name: '侦探/悬疑/推理',
      },
      {
        big_sort_id:1,
        small_sort_id:1009,
        small_sort_name: '科幻',
      },
      {
        big_sort_id:1,
        small_sort_id:1010,
        small_sort_name: '穿越/重生',
      },
      {
        big_sort_id:1,
        small_sort_id:1011,
        small_sort_name: '武侠',
      },
      {
        big_sort_id:1,
        small_sort_id:1012,
        small_sort_name: '惊悚/恐怖',
      },
      {
        big_sort_id:1,
        small_sort_id:1013,
        small_sort_name: '魔幻/奇幻/玄幻',
      },
      {
        big_sort_id:1,
        small_sort_id:1014,
        small_sort_name: '青春/影视',
      },
      {
        big_sort_id:1,
        small_sort_id:1015,
        small_sort_name: '历史',
      },
      {
        big_sort_id:1,
        small_sort_id:1016,
        small_sort_name: '官场',
      },
      {
        big_sort_id:1,
        small_sort_id:1017,
        small_sort_name: '职场',
      },
      {
        big_sort_id:1,
        small_sort_id:1018,
        small_sort_name: '军事',
      },


      {
        big_sort_id:2,
        small_sort_id:2001,
        small_sort_name: '中国古代文学',
      },
      {
        big_sort_id:2,
        small_sort_id:2002,
        small_sort_name: '中国近代文学',
      },
      {
        big_sort_id:2,
        small_sort_id:2003,
        small_sort_name: '中国现代文学',
      },
      {
        big_sort_id:2,
        small_sort_id:2004,
        small_sort_name: '中国当代文学',
      },
      {
        big_sort_id:2,
        small_sort_id:2005,
        small_sort_name: '世界文学',
      },
      {
        big_sort_id:2,
        small_sort_id:2006,
        small_sort_name: '诗歌词曲',
      },
      {
        big_sort_id:2,
        small_sort_id:2007,
        small_sort_name: '散文/随笔/书信',
      },
      {
        big_sort_id:2,
        small_sort_id:2008,
        small_sort_name: '戏剧与曲艺',
      },
      {
        big_sort_id:2,
        small_sort_id:2009,
        small_sort_name: '纪实文学',
      },
      {
        big_sort_id:2,
        small_sort_id:2010,
        small_sort_name: '民间文学',
      },
      {
        big_sort_id:2,
        small_sort_id:2011,
        small_sort_name: '青春文学',
      },

      {
        big_sort_id:3,
        small_sort_id:3001,
        small_sort_name: '语言学',
      },
      {
        big_sort_id:3,
        small_sort_id:3002,
        small_sort_name: '汉语',
      },
      {
        big_sort_id:3,
        small_sort_id:3003,
        small_sort_name: '少数民族语言',
      },
      {
        big_sort_id:3,
        small_sort_id:3004,
        small_sort_name: '英语',
      },
      {
        big_sort_id:3,
        small_sort_id:3005,
        small_sort_name: '法语',
      },
      {
        big_sort_id:3,
        small_sort_id:3006,
        small_sort_name: '德语',
      },
      {
        big_sort_id:3,
        small_sort_id:3007,
        small_sort_name: '西班牙语',
      },
      {
        big_sort_id:3,
        small_sort_id:3008,
        small_sort_name: '俄语',
      },
      {
        big_sort_id:3,
        small_sort_id:3009,
        small_sort_name: '日语',
      },
      {
        big_sort_id:3,
        small_sort_id:3010,
        small_sort_name: '韩语',
      },

      {
        big_sort_id:4,
        small_sort_id:4001,
        small_sort_name: '大学教材',
      },
      {
        big_sort_id:4,
        small_sort_id:4002,
        small_sort_name: '研究生教材',
      },
      {
        big_sort_id:4,
        small_sort_id:4003,
        small_sort_name: '公共课',
      },
      {
        big_sort_id:4,
        small_sort_id:4004,
        small_sort_name: '经济管理类',
      },
      {
        big_sort_id:4,
        small_sort_id:4005,
        small_sort_name: '工学类',
      },
      {
        big_sort_id:4,
        small_sort_id:4006,
        small_sort_name: '文法类',
      },
      {
        big_sort_id:4,
        small_sort_id:4007,
        small_sort_name: '医学类',
      },
      {
        big_sort_id:4,
        small_sort_id:4008,
        small_sort_name: '理学类',
      },
      {
        big_sort_id:4,
        small_sort_id:4009,
        small_sort_name: '计算机教材',
      },

      {
        big_sort_id:5,
        small_sort_id:5001,
        small_sort_name: '公务员',
      },
      {
        big_sort_id:5,
        small_sort_id:5002,
        small_sort_name: '考研',
      },
      {
        big_sort_id:5,
        small_sort_id:5003,
        small_sort_name: '外语考试',
      },
      {
        big_sort_id:5,
        small_sort_id:5004,
        small_sort_name: '司法考试',
      },
      {
        big_sort_id:5,
        small_sort_id:5005,
        small_sort_name: '会计类',
      },
      {
        big_sort_id:5,
        small_sort_id:5006,
        small_sort_name: '银行类',
      },
      {
        big_sort_id:5,
        small_sort_id:5007,
        small_sort_name: '教师类',
      },
      {
        big_sort_id:5,
        small_sort_id:5008,
        small_sort_name: '医学/药学考试',
      },
      {
        big_sort_id:5,
        small_sort_id:5009,
        small_sort_name: '建筑类',
      },
      {
        big_sort_id:5,
        small_sort_id:5010,
        small_sort_name: '财税外贸保险类考试',
      },
      {
        big_sort_id:5,
        small_sort_id:5011,
        small_sort_name: '计算机考试',
      },
      {
        big_sort_id:5,
        small_sort_id:5012,
        small_sort_name: '其他考试',
      },


      {
        big_sort_id:6,
        small_sort_id:6001,
        small_sort_name: '计算机理论',
      },
      {
        big_sort_id:6,
        small_sort_id:6002,
        small_sort_name: '编程与开发',
      },
      {
        big_sort_id:6,
        small_sort_id:6003,
        small_sort_name: '操作系统',
      },
      {
        big_sort_id:6,
        small_sort_id:6004,
        small_sort_name: '大数据与云计算',
      },
      {
        big_sort_id:6,
        small_sort_id:6005,
        small_sort_name: '图形图像/多媒体',
      },
      {
        big_sort_id:6,
        small_sort_id:6006,
        small_sort_name: '网站设计与网页开发',
      },
      {
        big_sort_id:6,
        small_sort_id:6007,
        small_sort_name: '网络与通讯',
      },
      {
        big_sort_id:6,
        small_sort_id:6008,
        small_sort_name: '硬件、嵌入式开发',
      },
      {
        big_sort_id:6,
        small_sort_id:6009,
        small_sort_name: '办公软件',
      },
      {
        big_sort_id:6,
        small_sort_id:6010,
        small_sort_name: '信息安全',
      },
      {
        big_sort_id:6,
        small_sort_id:6011,
        small_sort_name: '辅助设计与工程计算',
      },
      {
        big_sort_id:6,
        small_sort_id:6012,
        small_sort_name: '软件工程/开发项目管理',
      },

    ], {
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('small_sort', null, {});
  }
};