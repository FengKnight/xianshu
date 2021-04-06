<template>
  <div class="exchange">
    <home-bar/>

    <el-header>
      <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal">
        <el-menu-item index="1" @click="pathClick('./')">首页</el-menu-item>
        <el-menu-item index="2" @click="pathClick('./category')">书库</el-menu-item>
        <el-menu-item index="3" @click="pathClick('./exchange')">换书区</el-menu-item>
        <el-menu-item index="4" @click="pathClick('./messages')">交流讨论</el-menu-item>
      </el-menu>
    </el-header>

    <div class="screen">
      <div>积分:
      <label    v-for="(item,index) in numSort" @click="choose_num(index)" class="screen-label">{{ item }}</label>
      </div>
      <div >类别:
        <label v-for="item in smallSort" @click="choose_sort(item.small_sort_id,item.small_sort_name)"  class="screen-label">{{item.small_sort_name}}</label>

      </div>
      <div class="now-screen">
        当前筛选：积分为{{numSort[integral]}} 类别为:{{books_name}}
      </div>
    </div>

    <div class="content">
      <div class="book_content">
        <div class="books_item" v-for="item in books" @click="detailClick('/exchangeDetail',item)">
          <div><img :src="imgUrl(item.picture)"></div>
          <div class="books_name">{{item.books_name}}</div>
          <div>作者：{{item.books_author}}</div>
          <div>出版社：{{item.press}}</div>
          <div>新旧程度：{{item.condition}}</div>
          <div ><span class="price">积分:{{item.secprice}}</span></div>
        </div>
      </div>

    </div>

    <div class="book_page">
      <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="this.page"
          :page-sizes= "pageArray"
          layout="total, sizes, prev, pager, next, jumper"
          :total="this.count">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import HomeBar from "components/content/HomeBar";
import {getBigSort,getSmallSort,getBookPage} from "network/admin";

export default {
name: "Exchange",
  data(){
    return {
      activeIndex:'3',
      numSort:['1-20','20-40','40+'],
      bigSort:[],
      smallSort:[],
      books:[],
      page: 1,    //当前页
      prepage: 4, //每页显示的记录条数
      pages: 1,   //总页数
      count: 0,   //总记录数
      pageArray:[4,8],
      bookId:1001,
      integral:0 ,// 积分筛选项
      books_name:'中国古典小说'
    }
  },
  created() {
    if(this.$store.getters.bigSort.length == 0){
      getBigSort().then(res=>{
        this.bigSort = res
        this.$store.commit('bisSortStatus',this.bigSort)
      })
      getSmallSort().then(res=>{
        this.smallSort = res
        this.$store.commit('smallSortStatus',this.smallSort)
      })
    }
    else{
      this.bigSort = this.$store.getters.bigSort
      this.smallSort = this.$store.getters.smallSort
    }
    console.log(this.smallSort);
    console.log(this.bigSort);
    this.bookId = this.$store.state.bookId
    this.getPage()
  },
  methods:{
    //路径跳转方法
    pathClick(path){
      this.$router.replace(path)
    },
    choose_sort(id,name){
      this.bookId = id
      this.books_name = name
      this.getPage()
    },

    choose_num(index){
      this.integral = index
      this.getPage()
    },
    //保存书籍信息 再进行跳转
    detailClick(path,books){
      this.$store.commit('booksStatus',books)
      this.$router.push(path)
    },
    //图片显示
    imgUrl(u){
      u = "http://localhost:9000/img/" + u
      return u
    },
    //获取分页
    getPage(p) {
      if (p == this.page) return;
      this.page = p || this.page;
      let params = {
        page:this.page,
        prepage:this.prepage,
        bookId:this.bookId,
        is_exchange: 1
      }
      getBookPage(params).then( rs => {
        if (!rs.code) {
          this.count = rs.count;
          this.pages = Math.ceil(this.count / this.prepage);
          this.contents = rs.data;
          this.books = this.contents.filter(item => item.small_sort_id == this.bookId)
          if(this.integral == 0){
            this.books = this.books.filter(item => item.secprice<=20)
          }
          else if(this.integral == 1){
            this.books = this.books.filter(item => item.secprice<=40)
          }
          else {
            this.books = this.books.filter(item => item.secprice>40)
          }

        }
      } );
    },
    //分页方法
    handleSizeChange(val) {
      this.prepage = val
      this.getPage()
    },
    handleCurrentChange(val) {
      this.getPage(val)
    },

  },
  components:{
    HomeBar
  },

}
</script>

<style lang="scss" scoped>
.exchange{
  .el-header{
    position: relative;
    width: 70vw;
    left: 14vw;
    z-index: 100;
    margin-top: -5vh;
  }
  .screen{
    width: 70vw;
    height: 20vh;
    margin-top: 3vh;
    margin-left: 15vw;
    padding: 1vw;
    background-color: #d0fff5;
    color: #7f6214;
    box-shadow:1vw 1vw 0.5vw #b9edef;
    .screen-label{
      margin-left: 2vw;
      font-size: 13px;
    }

    .screen-label:hover{
      color: #076e95;
    }


  }
  .now-screen{
    margin-top: 1vh;
    margin-left: 3vw;
    font-size: 12px;
    color: #9e0b0b;
  }

  .content {
    width: 80vw;
    display: flex;
    justify-content: center;
    margin-left: 10vw;
    .book_content{
      width: 70vw;
      margin-top: 5vh;
      display: flex;
      text-align: center;
      flex-wrap: wrap;
      .books_item{
        width: 15vw;
        margin-left: 2vw;
        img{
          width: 10vw;
          height: 20vh;
        }

        .books_name{
          font-size: 23px;
          font-family: KaiTi;
        }


      }
    }

  }
  .book_page{
    display: flex;
    margin-top: 2vh;
    justify-content: center;
  }
}
</style>