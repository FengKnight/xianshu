<template>
  <div class="line-Echarts">
    <div id="lineEcharts" class="echarts">
    </div>
  </div>
</template>

<script>
export default {
  methods:{
    //图表
    myEcharts(){
      //初始化实例
      var myChart = this.$echarts.init(document.getElementById('lineEcharts'));

      //指定图表的配置项和数据
      var option = {
        tooltip: {},
        //x轴
        xAxis: {
          boundaryGap: false,
          axisLine:{
            show: true,
            lineStyle: {
              color: '#505050'
            }
          },
          axisTick:false,
          data: ["16.23","16.23","16.23","16.23","16.23","16.23","16.23"],
          axisLabel: {
            textStyle: {
              color: '#bd4f4f',
              fontSize: 8,
            }
          }

        },
        //y轴
        yAxis: {
          show:true,
          min:0,
          axisLine:{
            show: true,
            lineStyle: {
              color: '#505050'
            }
          },

          axisLabel: {
            formatter: '{value}V',
            textStyle: {
              color: '#ea4444',
              fontSize: 8,
              fontWeight:600,
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
        //图中线
        series: [
          {
            type: 'line',
            smooth: true,
            symbol: 'circle',
            symbolSize: 5,
            itemStyle : {
              normal : {
                color: '#5ce330',
                lineStyle:{
                  color: '#5ce330',
                  width: 1
                }
              }
            },
            data: [0,2,4,6,10,7,8]
          },
          {
            type: 'line',
            smooth: true,
            symbol: 'circle',
            symbolSize: 5,
            itemStyle : {
              normal : {
                color: '#F5DF4D',
                lineStyle:{
                  color: '#F5DF4D',
                  width: 1
                }
              }
            },
            data: [2,2,4,5,6,7,8]
          },
          {
            type: 'line',
            smooth: true,
            symbol: 'circle',
            symbolSize: 5,
            itemStyle : {
              normal : {
                color: '#Ff0000',
                lineStyle:{
                  color: '#ff0000',
                  width: 1
                }
              }
            },
            data: [4,5,6,6,6,7,8]
          }
        ],
        grid: {
          top:40,
          bottom:40,
          left:80,
          right:40,
        },
        axisLine:{
          lineStyle:{
            color:'red'
          }
        }
      }

      //使用配置项和数据显示图表
      myChart.setOption(option);


      window.addEventListener('resize', function () {
        myChart.resize();
      })
    }
  },
  mounted(){

    var that = this;
    this.myEcharts();
  }
}
</script>

<style lang="scss" scoped>
.echarts{
  width: 40vw;
  height: 40vh;
}
</style>