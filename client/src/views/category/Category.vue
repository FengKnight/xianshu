<template>
  <div class="category">
    <home-bar></home-bar>

    <el-header>
      <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal">
        <el-menu-item index="1" @click="pathClick('./')">首页</el-menu-item>
        <el-menu-item index="2" @click="pathClick('./category')">书库</el-menu-item>
        <el-menu-item index="3" @click="pathClick('./exchange')">换书区</el-menu-item>
        <el-menu-item index="4" @click="pathClick('./messages')">交流讨论</el-menu-item>
      </el-menu>
    </el-header>


    <el-aside  >
      <div class="left-div">
        <el-menu :default-openeds='[(big_id-1).toString()]' :default-active="sort_name">
          <el-submenu  v-for="(item,index) in bigSort"  :index="index.toString()" :key=item.books_id>
            <template slot="title" :id="item.books_id">{{item.big_sort_name}}</template>
            <el-menu-item-group v-for="(item2,index2) in smallSort" v-show="item2.big_sort_id==item.big_sort_id"  :key=item2.small_sort_id>
              <el-menu-item   @click="itemClick(item2.small_sort_id)"  :index="item2.small_sort_name">{{item2.small_sort_name}}</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </div>

      </el-aside>


    <el-main >
      <div class="book_content">
        <div class="books_item" v-for="item in books" @click="detailClick('/detail',item)">
          <div><img :src="imgUrl(item.picture)"></div>
          <div class="books_name">{{item.books_name}}</div>
          <div>作者：{{item.books_author}}</div>
          <div>出版社：{{item.press}}</div>
          <div>新旧程度
            <el-rate
                :value="parseFloat(item.condition/2)"
                disabled
                text-color="#ff9900"
               >
            </el-rate>
          </div>
          <div ><span class="price">￥{{priceStyle(item.price)}}</span><span class="secprice"> ￥{{priceStyle(item.secprice)}} </span></div>
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

    </el-main>

  </div>
</template>

<script>
import HomeBar from "components/content/HomeBar";
import {getBigSort,getSmallSort,getBookPage} from "network/admin";


export default {
  name: "Category",
  data(){
    return {
      activeIndex: '2',
      bigSort:[],
      smallSort:[],
      books:[],
      data:[],
      bigName:'',
      big_id:'',
      sort_index:'',
      sort_name:'',
      page: 1,    //当前页
      prepage: 4, //每页显示的记录条数
      pages: 1,   //总页数
      count: 0,   //总记录数
      pageArray:[4,8],
      bookId:1001
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

    setTimeout(()=>{
      if(this.$store.getters.bookId){
        this.itemClick(this.$store.getters.bookId)
        this.bookId = this.$store.getters.bookId
      }else {
        this.itemClick(this.bookId)
      }
    },100)



  },
  components:{
    HomeBar
  },
  computed:{

  },
  methods:{
    priceStyle(p){
      console.log(typeof p);
      console.log(p);
      let a = p.toFixed(2)
      return a
    },
    //路径跳转方法
    pathClick(path){
      this.$router.replace(path)
    },
    //保存书籍信息 再进行跳转
    detailClick(path,books){
      this.$store.commit('booksStatus',books)
      this.$router.push(path)
    },
    //左侧分类点击
    itemClick(id){
      this.bookId = id
      this.getPage()
      this.books = this.data.filter(item => item.small_sort_id == this.bookId);
      this.big_id = this.smallSort.filter(item => item.small_sort_id == this.bookId)[0].big_sort_id
      this.bigName = this.bigSort.filter(item => item.big_sort_id == this.big_id)[0].big_sort_name
      this.sort_name = this.smallSort.filter(item => item.small_sort_id == this.bookId)[0].small_sort_name;
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
        bookId:this.bookId
      }
      getBookPage(params).then( rs => {
        if (!rs.code) {
          this.count = rs.count;
          this.pages = Math.ceil(this.count / this.prepage);
          this.contents = rs.data;
          this.books = this.contents.filter(item => item.small_sort_id == this.bookId)
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
  }
}
</script>

<style lang="scss" scoped>
.category{
  height: 100vh;
  .el-header{
    position: relative;
    z-index: 100;
    padding-left: 0;
  }


  .el-aside{
    width: 15vw!important;
    overflow-x: hidden;
    direction: rtl;
    text-align: center;
    height: 91vh;
    background-color: #faf8ec;
    position: absolute;
    top: 14vh;
    z-index: 111;
    padding-right: 3vw;
  }
  .left-div{
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .el-menu{
    position: absolute;
    top: 0;
    background-color: #faf8ec;
    border: none;

  }

  .el-menu-item-group{
    background-color: #faf8ec;

  }
  .el-menu-item.is-active{
    color: #d0bf3e;
  }
  .el-main{
    position: absolute;
    top: 9vh;
    left: 15vw;
    width: 84vw;
    height: 96vh;
    background-color: white;
  }

  .books_item{
    float: left;
    width: 18vw;
    height: 20vh;
    margin: 5vh 0 10vh -3vh ;
    text-align: center;
  }

  .books_item img{
    width: 10vw;
    height: 20vh;
  }

  .books_name{
    font-size: 23px;
    font-family: KaiTi;
  }

  .price{
    font-size: 18px;
    text-decoration: line-through;
  }
  .secprice{
    font-size: 24px;
    color: red;
  }


  .book_page{
    clear: left;
    position: relative;
    top:10vh;
    left: 20vw;
    width: 10vw;
  }
  .el-menu-demo{
    width: 99vw;
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
}


</style>

<style lang="scss">
.category{
  .el-submenu__title{
    font-size: 18px;
    font-weight: bold;
  }
  .el-submenu__icon-arrow{
    font-size: 18px;
    font-weight: bold;
    right: 0;
  }
  .el-submenu{
    width: 15vw;
    margin-top: 2vh;
    padding: 0;
  }
  .el-submenu .is-active{

  }
}

</style>