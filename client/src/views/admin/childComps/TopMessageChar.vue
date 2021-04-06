<template>
  <div class="top-three-char">
    <div ref="messageEcharts" class="simpleDemo">
    </div>
  </div>
</template>

<script>
import echarts from 'echarts'
import {getTopThreeMessage} from "@/network/admin";

export default {
    data() {
      return {
        chart: null,
        sortName:[],
        sortSums:[],
      }
    },
    mounted() {

    },
    methods: {
      getPage() {
        let option = {
          title: {
            text: '用户讨论活跃前三',
            subtext: '数据来源后端',
            left: 'center',
            textStyle:{
              color:'#4eecc7',
            }
          },
          tooltip: {},
          legend: {
            data:['销量']
          },
          xAxis: {
            data: this.sortName,
            show:true,
            axisLabel: {
              formatter: '{value} ',
              textStyle: {
                color: '#2e8470',
                fontSize: 10,
              }
            },


          },
          yAxis: {
            minInterval:1,
            axisLabel: {
              formatter: '{value}条',

              textStyle: {
                color: '#2e8470',
                fontSize: 10,
              }
            },

            splitLine: {
              show: true,
              lineStyle:{
                width: 1,
                type: 'solid'
              }
            }
          },
          series: {
            type: 'bar',
            data: this.sortSums,
            barWidth:'20%',

            itemStyle: {
              //通常情况下：
              normal: {
                label: {
                  show: true,  //开启显示
                  position: 'top',  //在上方显示
                  textStyle: {  //数值样式
                    color: '#34a188',
                    fontSize: 12
                  }
                },
                //每个柱子的颜色即为colorList数组里的每一项，如果柱子数目多于colorList的长度，则柱子颜色循环使用该数组
                color: function (params) {
                  var colorList = [
                    ['#ffec88', '#c1b369'],
                    ['#d9fff4', '#b1b1b1'],
                    ['#bf551c', '#939393'],
                    ['#FF6E65', '#011223'],
                  ];
                  var index = params.dataIndex;
                  if (params.dataIndex >= colorList.length) {
                    index = params.dataIndex - colorList.length;
                  }
                  return new echarts.graphic.LinearGradient(0, 0, 0, 1,
                      [{
                        offset: 0,
                        color: colorList[index][0]
                      },
                        {
                          offset: 1,
                          color: colorList[index][1]
                        }
                      ]);
                }
              },
            },
          }


        }
        this.chart = echarts.init(this.$refs.messageEcharts);
        // 使用刚指定的配置项和数据显示图表。
        this.chart.setOption(option);
      }
    },
   created() {
     getTopThreeMessage().then(res=>{
       console.log(res);
       for(let i = 0;i<res.data.length;i++){
         this.sortName.push(res.data[i].user_name)
         this.sortSums.push(res.data[i].sum)
       }
       this.getPage()
     })


   }
 }
</script>

<style lang="scss" scoped>
.top-three-char{
  .simpleDemo {
    width: 35vw;
    height:35vh;
  }
  a {
    color: #00CC66	;
  }
  .router-link-active {
    text-decoration: none;
  }
}

</style>

