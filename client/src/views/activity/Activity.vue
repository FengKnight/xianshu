<template>
  <div class="active">
    <HomeBar/>
    <home-search/>
    <div>
      <img class="banner-img"  :src="imgUrl(currentPort.img)">
    </div>
    <div  class="active-main">
      <div>
         <div class="active-title" v-for="(item,index) in titles" :key="index">
           <div class="title-text">{{item.title}}</div>
           <div class="books-content" v-for="book in currentTitle[index]"  :key="book.activity_id" @click="detailClick('/detail',book.books_info)">
            <div class="books-left">
              <img class="books-img" :src="imgUrl(book.books_info.picture)">
            </div>
              <div class="books-right">
                <div class="books-name">{{book.books_info.books_name}}</div>
                <div class="books-author">{{book.books_info.books_author}}</div>
                <div class="books-intro">{{book.books_info.intro}}</div>
              </div>
            </div>

      </div>
      </div>
    </div>
  </div>
</template>

<script>
import HomeBar from "components/content/HomeBar";
import HomeSearch from "@/components/content/HomeSearch";
import {getActivity,getActivityTitle} from "@/network/admin";

export default {
  components:{
    HomeBar,
    HomeSearch
  },
  created() {
    console.log(this.$store.getters.port);
    this.currentPort = this.$store.getters.port
    let params = {
      port_id : this.currentPort.port_id
    }
    getActivity(params).then(res =>{
      this.activityList = res.data
      console.log(this.activityList);
    })
    getActivityTitle(params).then(res =>{
      this.titles = res.data

      console.log(this.titles);
      for (let i=0;i<this.titles.length;i++){
        this.currentTitle[i] = this.activityList.filter(item => item.title == this.titles[i].title)
      }
      console.log(this.currentTitle);
    })
  },
  data(){
    return {
      currentPort:[],
      activityList:[],
      titles:[],
      currentTitle:[]
    }
  },
  methods:{
    imgUrl(u){
      u = "http://localhost:9000/img/" + u
      return u
    },
    //保存书籍信息 再进行跳转
    detailClick(path,books){
      this.$store.commit('booksStatus',books)
      this.$router.push(path)
    },

  }
}
</script>

<style lang="scss" scoped>
.active{
  background-color: #f6f1e6;
  .banner-img{
    width: 99.1vw;
    height: 50vh;
  }

  .books-img{
    width: 128px;
    height: 168px;
    margin-left: 20px;
    margin-right: 20px;
  }
  .active-main{
    width: 100%;
    display: flex;
    justify-content: center;
  }
  .active-title{
    width: 1000px;
    display: flex;
    flex-wrap: wrap;
    .title-text{
      width: 100%;
      text-align: center;
      color: #aa5b34;
      font-size: 24px;
      margin: 20px 0;
    }
  }
  .books-content{
    width: 495px;
    height: 170px;
    margin-bottom: 10px;
    margin-right: 5px;
    background: #fff;
    border: 1px solid #eaeaea;
    display: flex;
    justify-content: center;
    flex-wrap: nowrap;
  }
  .books-name{
    height: 14px;
    line-height: 14px;
    margin-top: 10px;
    margin-bottom: 8px;
    font-size: 14px;
    color: #333;
    text-align: left;
  }
  .books-author{
    max-height: 40px;
    line-height: 20px;
    margin-bottom: 20px;
    font-size: 12px;
    color: #999;
    text-align: left;
  }
  .books-intro{
    height: 54px;
    font-size: 12px;
    color: #ba7e48;
    line-height: 18px;
    text-align: left;
    overflow: hidden;
  }

}
</style>