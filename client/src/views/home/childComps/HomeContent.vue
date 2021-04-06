<template>
  <div class="home-content">
    <el-container class="content-main">
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
        <el-header >
          <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal">
            <el-menu-item index="1">首页</el-menu-item>
            <el-menu-item index="2" @click="pathClick('./category')">书库</el-menu-item>
            <el-menu-item index="3" @click="pathClick('./exchange')">换书区</el-menu-item>
            <el-menu-item index="4" @click="pathClick('./messages')">交流讨论</el-menu-item>
          </el-menu>
        </el-header>


        <el-main>
          <template>
            <el-carousel  height="43vh" direction="vertical">
              <el-carousel-item   v-for="(item,index) in banner"  :key="index">
                <img class="banner-img" @click="bannerClick(item)" :src="imgUrl(item.img)">
              </el-carousel-item>
            </el-carousel>
          </template>
        </el-main>
      </el-container>
    </el-container>
    <div class="home-content-bottom">
      <div>
        <p class="recommend-title">好书推荐</p>
        <div class="line"></div>
      </div>

      <div class="recommend-books">
        <div class="re-content">
          <div class="books_item" v-for="item in recommendBooks" @click="detailClick('/detail',item)">
            <div><img :src="imgUrl(item.picture)"></div>
            <div class="books_name">{{item.books_name}}</div>
            <div class="books-author">作者：{{item.books_author}}</div>
            <div ><span class="books-price">￥{{item.secprice}}</span></div>
          </div>
        </div>
        <div class="re-activity">
          <advert/>
        </div>

      </div>

        <div class="recommend-bottom">
          <p class="recommend-title">全新书籍推荐</p>
          <div class="line"></div>
        </div>
      <div class="recommend-books">
        <div class="books_item" v-for="item in newBooks"  @click="detailClick('/detail',item)">
          <div><img :src="imgUrl(item.picture)"></div>
          <div class="books_name">{{item.books_name}}</div>
          <div class="books-author">作者：{{item.books_author}}</div>
          <div ><span class="books-price">￥{{item.secprice}}</span></div>
        </div>
      </div>
    </div>

  </div>


</template>

<script>
import {getBigSort,getSmallSort,getBannerPage,getRecommendBooks,getNewBooks} from "network/admin";
import {bigSort} from "@/store/getters";
import Advert from "@/views/home/childComps/Advert";



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
      },
      banner:[],
      recommendBooks:[],
      newBooks:[],


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
    getBannerPage().then(res =>{
      this.banner = res.data.filter(item => item.is_show==1)
    })
    getRecommendBooks().then(res =>{
      this.recommendBooks = res.data
    })
    getNewBooks().then(res =>{
      this.newBooks = res.data
    })

    //轮播图修改文字
    setTimeout(()=>{
      for (let i =0;i<this.banner.length;i++){
        console.log(this.banner[i].content);
        document.getElementsByClassName('el-carousel__button')[i].innerHTML = this.banner[i].content ;
      }
    },300)


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

    bannerClick(i){
      this.$store.state.port = i
      this.$router.replace('/activity')
    },
    //保存书籍信息 再进行跳转
    detailClick(path,books){
      this.$store.commit('booksStatus',books)
      this.$router.push(path)
    },

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
    },
    imgUrl(u){
      u = "http://localhost:9000/img/" + u
      return u
    },
  },
  components:{
    Advert

  }
}
</script>

<style lang="scss" scoped>

.home-content{
  position: absolute;
  top: 25vh;
  left: 0;
  padding: 0 5vw 0 10vw;
  .content-main{
    height: 50vh;
  }
  .el-header{
    padding: 0;

  }
  .el-menu-demo{
    padding-left: 5vw;
    width: 60vw;
    background-color: #ce4c45;
  }

  .el-aside {
    position: relative;
    top: 6.4vh;

  }
  .aside{
    background-color: #ce4c45;
    height: 43vh;
    margin-left: 2.5vw;

  }
  .big_ul li{
    line-height: 7vh;
    font-size: 20px;
    color: #f3f2f2;
    text-align: center;
    list-style-type: none;
    border:1px solid #bdafaf;
    background-color: #ce4c45;
  }


  .big_ul li span{
    margin-left: 20px;
    float: right;
  }

  .big_sort{
    list-style-type: none;
  }
  .big_ul li:hover{
    background-color: #d44a23;
    color: #ffffff;
  }

  .aside-content{
    position: absolute;
    top: 5vh;
    left: 27.5vw;
    width: 60vw;
    height: 45vh;
    background-color: snow;
    z-index: 100;

  }

  .small_ul{
    opacity: 1;
    list-style-type: none;

  }

  .small_sort{
    margin-top: 3vh;
    float: left;
    width: 15vw;
    font-size: 20px;
    text-align: center;
    padding: 1vh 0 3vh 3vw;
  }





  .el-main {
    width: 60vw;
    height: 43vh;
    z-index: 1;
    background-color: white;
    padding: 0;
  }


  .good-book{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 80vw;
    flex-wrap: wrap;
  }


  .banner-font{
    font-size: 24px;
  }
  .banner-img{
    width: 60vw;
    height: 43vh;
  }
  .recommend-bottom{
    margin-top: 5vh;
  }
  .recommend-title{
    font-size: 24px;
    font-weight: bold;
    margin-left: 4vw;
    color: #ee9573;
  }
  .line{
    width: 70vw;
    margin-left: 5vw;
    border-bottom:2px solid #f5bc75;
    height: 3px;
    opacity: 0.9;

  }
  .home-content-bottom{
    width: 75vw;
    margin-left: 2.5vw;
    background-color: white;
    padding-top: 3vh;
  }
  .recommend-books{
    width: 75vw;
    display: flex;
    flex-wrap: nowrap;
    padding-left: 5vw;

    .re-content{
      width: 60vw;
      display: flex;
      flex-wrap: wrap;
    }
    .re-activity{
      width: 15vw;
      height: 60vh;
      margin-top: 5vh;
      margin-left: -5.5vw;
    }
    .books_item{
      width: 13vw;
      height: 20vh;
      margin: 2vh 0 12vh -2vw ;
      text-align: center;
    }

    .books_item img{
      width: 8vw;
      height: 20vh;
    }

    .books_name{
      font-size: 23px;
      font-family: KaiTi;
    }
    .books-author{
      color: #aaa8a8;
    }

    .price{
      text-decoration: line-through;
    }
    .books-price{
      color: #ea2222;
      font-size: 18px;
    }

  }
  .recommend-books:last-child{
    flex-wrap: wrap;
    .books_item{
      width: 15vw;
      height: 20vh;
      margin: 3vh 0 10vh -1vw ;
      text-align: center;
    }

    .books_item img{
      width: 10vw;
      height: 20vh;
    }
  }
}





</style>


<style lang="scss">

.home-content{

    .el-menu-item{
      color: #dcdcdc !important;
      font-size: 18px;
    }
    .el-menu-item:hover{
      background-color: #9e0b0b!important;
      color: #ffffff !important;
      font-size: 18px;
    }
    .el-menu-item.is-active{
      color: white!important;
      font-size: 18px;
      border-bottom:4px solid #92470f !important;
    }
    .el-carousel--vertical .el-carousel__indicators{
      margin-top: 9vh;
    }

    .el-carousel ul li  .el-carousel__button{

      width: 10vw;
      height: 4vh;

    }
    .el-menu.el-menu--horizontal{
      border: none;
    }



}



</style>

