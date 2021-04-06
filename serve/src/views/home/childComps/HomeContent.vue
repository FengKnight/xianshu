<template>
  <div class="nav-content">
    <el-container>
      <div class="aside">
        <el-aside width="15vw">
          <ul class="big_ul">
            <li v-for="(item,index) in bigSort" @mouseenter="bigSortClick(item.big_sort_id,index)" @mouseleave="bigSortClick(item.big_sort_id,index)" @click="bigSortClick(item.big_sort_id,index)"><a class="big_sort">{{item.big_sort_name}}</a><span><i :id='index' class="el-icon-arrow-left" ></i></span></li>
          </ul>
        </el-aside>
      </div>
      <div class="aside-content" v-if="isShow" @mouseenter="asideEnter" @mouseleave="asideLeave">
        <ul class="small_ul">
          <li v-for="(item) in sort" @click="smallClick(item.small_sort_id)"><a class="small_sort">{{item.small_sort_name}}</a><span></span></li>
        </ul>
      </div>

      <el-container>

          <el-header>
            <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal">
              <el-menu-item index="1">首页</el-menu-item>
              <el-menu-item index="2" @click="pathClick('./category')">书库</el-menu-item>
              <el-menu-item index="3" @click="pathClick('./exchange')">换书区</el-menu-item>
              <el-menu-item index="4" @click="pathClick('./messages')">交流讨论</el-menu-item>
            </el-menu>
          </el-header>

        <el-main>
          <template>
            <el-carousel  height="50vh" direction="vertical">
              <el-carousel-item  key="1">
              </el-carousel-item>
              <el-carousel-item  key="2">
              </el-carousel-item>
              <el-carousel-item  key="3">
              </el-carousel-item>
              <el-carousel-item  key="4">
              </el-carousel-item>


            </el-carousel>
          </template>
        </el-main>
      </el-container>
    </el-container>
  </div>


</template>

<script>
import {getBigSort,getSmallSort} from "network/admin";
import {bigSort} from "@/store/getters";



export default {
  name: "HomeContent",
  data(){
    return{
      activeIndex: '1',
      bigSort:[],
      smallSort:[],
      sort:[],
      isShow:false,
      propOption:{
        expandTrigger:'hover'
      }
    }
  },
  created() {
    getBigSort().then(res=>{
      this.bigSort = res
      this.$store.commit('bisSortStatus',this.bigSort)
    })
    getSmallSort().then(res=>{
      this.smallSort = res
      this.$store.commit('smallSortStatus',this.smallSort)
    })
    //轮播图修改文字
    setTimeout(()=>{
      document.getElementsByClassName('el-carousel__button')[0].innerHTML = '春';
      document.getElementsByClassName('el-carousel__button')[1].innerHTML = '夏';
      document.getElementsByClassName('el-carousel__button')[2].innerHTML = '秋';
      document.getElementsByClassName('el-carousel__button')[3].innerHTML = '冬'
    },100)


  },

  computed:{
    getCascader(){
      this.options = this.bigSort.map(item =>{
        return {
          value:  item.big_sort_name,
          label: item.big_sort_name,
          children:
              this.smallSort.filter(item2 =>{
                return item2.big_sort_id == item.big_sort_id
              }).map(item3 =>{
                return {
                  value:  item3.small_sort_name,
                  label:item3.small_sort_name
                }
              })
        }
      })
      return this.options
    }
  },

  methods:{
    bigSortClick(id,index){
      this.sort = this.smallSort.filter(item => id== item.big_sort_id)
      this.isShow = !this.isShow;
      let cs = document.getElementById(index).className;
      if(this.isShow == true){
        document.getElementById(index).className = 'el-icon-arrow-right'
      }else {
        document.getElementById(index).className = 'el-icon-arrow-left'
      }
    },
    asideEnter(){
      this.isShow = true

    },
    asideLeave(){
      this.isShow = false;
    },
    smallClick(id){
      this.$store.commit('bookIdStatus',id)
      this.$router.replace('/category')
    },
    pathClick(path){
      this.$router.replace(path)
    }
  }
}
</script>

<style lang="scss" scoped>

.nav-content{
  position: absolute;
  top: 20vh;
  width: 100vw;
  left: 0;
  padding: 0 10vw;
  .el-aside {
    position: relative;
    top: 8vh;
  }

  .big_ul li{
    line-height: 8.2vh;
    font-size: 20px;
    font-family: KaiTi;
    text-align: center;
    list-style-type: none;
    border:1px solid bisque;
  }


  .big_ul li span{
    margin-left: 20px;
    float: right;
  }

  .big_sort{
    list-style-type: none;
  }
  .big_ul li:hover{
    background-color: snow;
  }

  .aside-content{
    position: fixed;
    top: 28vh;
    left: 25vw;
    width: 67vw;
    height: 51vh;
    background-color: snow;
    opacity: 0.8;
    z-index: 100;

  }

  .small_ul{
    opacity: 1;
    list-style-type: none;

  }

  .small_sort{
    float: left;
    width: 15vw;
    font-size: 20px;
    text-align: center;
    font-family: KaiTi;
    padding: 1vh 0 3vh 3vw;

  }


  .el-header{
    position: relative;
  }

  .el-main {
    width: 67vw;
    height: 60vh;
    z-index: 1;
  }

  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
  }


  .el-carousel__item:nth-child(1) {
    background-image: url("../../../assets/img/lunbo1.jpg");
    background-size: 100% 100%;

  }

  .el-carousel__item:nth-child(2) {
    background-image: url("../../../assets/img/lunbo2.jpg");
    background-size: 100% 100%;
  }
  .el-carousel__item:nth-child(3) {
    background-image: url("../../../assets/img/lunbo3.jpg");
    background-size: 100% 100%;
  }
  .el-carousel__item:nth-child(4) {
    background-image: url("../../../assets/img/lunbo4.jpg");
    background-size: 100% 100%;
  }

  .banner-font{
    font-size: 24px;
  }
}





</style>


<style>
.el-main .el-carousel--horizontal{
  height: 37vh;
  width: 58vw;
}

.el-carousel__container{
  height: 60vh;
}
.el-carousel--vertical .el-carousel__indicators{
  margin-top: 7vw;
}

.el-carousel ul li  .el-carousel__button{

  width: 10vw;
  height: 4vh;
}

</style>

