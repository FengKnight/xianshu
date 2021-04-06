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
        <label v-for="item in bigSort" @click="choose_bigSort(item.big_sort_id,item.big_sort_name)"
               class="screen-label">{{item.big_sort_name}}</label>

      </div>
      <div>子类:
        <div class="small-sort">
          <label v-for="item in currentSort" @click="choose_sort(item.small_sort_id,item.small_sort_name)"
                 class="screen-label" :key="item.small_sort_id">{{item.small_sort_name}}</label>
        </div>

      </div>
      <div class="now-screen">
        当前筛选：积分为{{numSort[integral]}} 类别为:{{books_sort}}->{{books_name}}
      </div>
    </div>

    <div class="content">
      <div v-if="this.books.length != 0" class="book_content">
        <div class="books_item" v-for="item in books" @click="detailClick('/exchangeDetail',item)" :key="item.books_id">
          <div><img :src="imgUrl(item.picture)"></div>
          <div class="books_name">{{item.books_name}}</div>
          <div class="books-text">作者：{{item.books_author}}</div>
          <div class="books-text">出版社：{{item.press}}</div>
          <div class="books-text">新旧程度：{{item.condition}}</div>
          <div ><span class="price">积分:{{item.secprice}}</span></div>
        </div>
      </div>
      <div class="no-text" v-else><div>暂无书籍</div></div>
    </div>

    <div v-if="this.books.length != 0" class="book_page">
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
      books_name:'中国古典小说',
      books_sort:'小说',
      currentSort:[]
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
    this.currentSort = this.smallSort.filter(item => item.big_sort_id == this.bigSort[0].big_sort_id)
    this.getPage()
  },
  methods:{
    //路径跳转方法
    pathClick(path){
      this.$router.replace(path)
    },
    choose_bigSort(id,name){
      this.currentSort = this.smallSort.filter(item => item.big_sort_id == id)
      this.books_sort = name
      this.books_name = this.currentSort[0].small_sort_name
      this.bookId = this.currentSort[0].small_sort_id
      this.getPage()
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
    z-index: 100;
  }
  .el-menu-demo{
    width: 98vw;
    padding-left: 25vw;
    padding-top: 1vh;
    height: 10vh;
  }
  .el-menu-item{
    color: #6c6c6c !important;
    font-size: 18px;
  }
  .el-menu-item:hover{
    background-color: #d56d6d !important;
    color: #ffffff !important;
    font-size: 18px;
  }
  .el-menu-item.is-active{
    color: #de4040 ;
    font-size: 18px;
    font-weight: bold;
    border-bottom:4px solid #92470f !important;
  }
  .screen{
    width: 70vw;
    height: 20vh;
    margin-top: 4vh;
    margin-left: 15vw;
    padding-left: 2vw;
    font-size: 18px;
    background-color: #d0fff5;
    color: #000000;
    box-shadow:0.5vw 0.5vw 0.5vw #b9edef;
    div{
      margin-top: 2vh;
    }
    .screen-label{
      margin-left: 2vw;
      font-size: 16px;
    }

    .screen-label:hover{
      color: #e31e1e;
    }
    .small-sort{
      width: 60vw;
      margin-left: 2vw;
      margin-top: -2vh;
    }


  }
  .now-screen{
    margin-top: 1vh;
    margin-left: 3vw;
    font-size: 14px;
    color: #9e0b0b;
  }

  .content {

    width: 70vw;
    height: 60vh;
    display: flex;
    justify-content: center;
    margin-left: 15vw;
    .book_content{
      background-color: white;
      width: 70vw;
      margin-top: 3vh;
      display: flex;
      text-align: center;
      flex-wrap: wrap;
      .books_item{
        width: 15vw;
        margin-left: 1vw;
        margin-top: 5vh;
        img{
          width: 10vw;
          height: 20vh;
        }

        .books_name{
          font-size: 23px;
          font-family: KaiTi;
        }
        .price{
          color: red;
          font-size: 18px;
        }
        .books-text{
          color: #747474;
        }


      }
    }
    .no-text{
      font-size: 30px;
      color: #9e0b0b;
      display: flex;
      justify-content: center;
      align-content: center;
      margin-top: 23vh;

    }
  }
  .book_page{
    display: flex;
    margin-top: -8vh;
    justify-content: center;
  }
}
</style>