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


    <el-aside  width="14vw" style="background-color: white">
        <el-menu :default-openeds='[(big_id-1).toString()]' :default-active="sort_name">
          <el-submenu  v-for="(item,index) in bigSort"  :index="index.toString()" :key=item.books_id>
            <template slot="title" :id="item.books_id">{{item.big_sort_name}}</template>
            <el-menu-item-group v-for="(item2,index2) in smallSort" v-show="item2.big_sort_id==item.big_sort_id"  :key=item2.small_sort_id>
              <el-menu-item   @click="itemClick(item2.small_sort_id)"  :index="item2.small_sort_name">{{item2.small_sort_name}}</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>


    <el-main >
      <div class="book_content">
        <div class="books_item" v-for="item in books" @click="detailClick('/detail',item)">
          <div><img :src="imgUrl(item.picture)"></div>
          <div class="books_name">{{item.books_name}}</div>
          <div>作者：{{item.books_author}}</div>
          <div>出版社：{{item.press}}</div>
          <div>新旧程度：{{item.condition}}</div>
          <div ><span class="price">￥{{item.price}}</span>￥{{item.secprice}} <span></span></div>
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

<style scoped>
.category{
  height: 100vh;
}

.el-header{
  position: relative;
  width: 70vw;
  left: 14vw;
  z-index: 100;
  margin-top: -5vh;
}

.el-aside{
  width: 15vw;
  overflow-x: hidden;
  direction: rtl;
  text-align: center;
  height: 80vh;
  background-color: white;
}

.el-main{
  position: absolute;
  top: 8vh;
  left: 14vw;
  width: 72vw;
  height: 100vh;
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
  text-decoration: line-through;
}


.book_page{
  clear: left;
  position: relative;
  top:10vh;
  left: 20vw;
  width: 10vw;
}

</style>

<style>

</style>