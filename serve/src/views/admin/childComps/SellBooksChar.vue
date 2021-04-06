<template>
  <div class="sell-char">
    <div ref="sellEcharts" class="simpleDemo">
    </div>
  </div>
</template>

<script>
import echarts from 'echarts'
import {getTopSell} from "@/network/admin";

export default {
    data() {
      return {
        chart: null,
        sells:[]
      }
    },
    mounted() {

    },
    methods: {
      getPage() {
        let option = {
          title: {
            text: '前三用户书籍库存',
            subtext: '数据来源后端',
            left: 'center'
          },
          tooltip: {
            trigger: 'item'
          },

          color:['#99e0d5', '#ec114f', '#42adf8'],
          series: [
            {
              name: '库存数量',
              type: 'pie',
              radius: '50%',
              data: this.sells,
              emphasis: {
                itemStyle: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgb(39,194,181)'
                }
              }
            }
          ]
        };
        this.chart = echarts.init(this.$refs.sellEcharts);
        // 使用刚指定的配置项和数据显示图表。
        this.chart.setOption(option);
      }
    },
   created() {

     getTopSell().then(res =>{
       console.log(res);
       this.sells = res.data
       console.log(this.sells);
       this.getPage()
     })

   }
 }
</script>

<style lang="scss" scoped>
.sell-char{
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

