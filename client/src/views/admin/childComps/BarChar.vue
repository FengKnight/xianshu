<template>
  <div class="bar-char">
    <div ref="barEcharts" class="simpleDemo">
    </div>
  </div>
</template>

<script>
import echarts from 'echarts'
import {getSortSums} from "@/network/admin";

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
            text: '当前已有小说类别书籍展示',
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
                color: '#257665',
                fontSize: 10,
              }
            },
            axisLine:{
              lineStyle:{
                color:'#61716d',
              }
            },

          },
          yAxis: {
            axisLabel: {
              formatter: '{value}本',
              textStyle: {
                color: '#257665',
                fontSize: 10,
              }
            },
            axisLine:{
              lineStyle:{
                color:'#61716d',
              }
            },
            splitLine: {
              show: true,
              lineStyle:{
                color: ['#61716d'],
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
                    color: '#339a82',
                    fontSize: 12
                  }
                },
                //每个柱子的颜色即为colorList数组里的每一项，如果柱子数目多于colorList的长度，则柱子颜色循环使用该数组
                color: function (params) {
                  var colorList = [
                    ['#10F8FF', '#011223'],
                    ['#00FF28', '#011223'],
                    ['#FCFCFD', '#011223'],
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
        this.chart = echarts.init(this.$refs.barEcharts);
        // 使用刚指定的配置项和数据显示图表。
        this.chart.setOption(option);
      }
    },
   created() {
     getSortSums().then(res=>{
       console.log(res);
       for(let i = 0;i<res.data.length;i++){
         this.sortName.push(res.data[i].small_sort_name)
         this.sortSums.push(res.data[i].sum)
       }
       console.log(this.sortSums);
       console.log(this.sortName);
       this.getPage()
     })


   }
 }
</script>

<style lang="scss" scoped>
.bar-char{
  .simpleDemo {
    width: 80vw;
    height:40vh;
  }
  a {
    color: #00CC66	;
  }
  .router-link-active {
    text-decoration: none;
  }
}

</style>

