<template>
  <div class="selectBook">
    <home-bar/>
    <div class="nav-search">
      <i class="el-icon-edit icon">idle_book</i>

      <el-autocomplete
          v-model="state"
          :fetch-suggestions="querySearchAsync"
          placeholder="请输入内容"
          @select="handleSelect"
      ></el-autocomplete>
      <el-button @click="selectClick" plain>搜索</el-button>
    </div>


    <el-header>
      <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal">
        <el-menu-item index="1">首页</el-menu-item>
        <el-menu-item index="2" @click="pathClick('./category')">书库</el-menu-item>
        <el-menu-item index="3" @click="pathClick('./exchange')">换书区</el-menu-item>
        <el-menu-item index="4" @click="pathClick('./messages')">交流讨论</el-menu-item>
      </el-menu>
    </el-header>

    <el-breadcrumb class="bread" separator-class="el-icon-arrow-right">
      <el-breadcrumb-item >书库</el-breadcrumb-item>
      <el-breadcrumb-item>书库</el-breadcrumb-item>
      <el-breadcrumb-item>搜索结果共{{count}}个</el-breadcrumb-item>
    </el-breadcrumb>

    <div>
      <div class="book_content">
        <div class="books_item" v-for="item in books" @click="detailClick('/detail',item)">
          <div><img :src="imgUrl(item.picture)"></div>
          <div class="books_name">{{item.books_name}}</div>
          <div>作者：{{item.books_author}}</div>
          <div>出版社：{{item.press}}</div>
          <div>新旧程度：{{item.condition}}</div>
          <div>卖家：{{item.user_name}}</div>
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
    </div>

  </div>
</template>

<script>
import HomeBar from "components/content/HomeBar";
import {getSelect,getSelectPage} from "network/select";

export default {
  name: "SelectBooks",
  components: { HomeBar},
  data(){
    return {
      activeIndex: '2',
      restaurants: [],
      state: '',
      timeout:  null,
      results:[],
      book:[],
      isCheck:false,
      books:[],
      page: 1,    //当前页
      prepage: 4, //每页显示的记录条数
      pages: 1,   //总页数
      count: 0,   //总记录数
      pageArray:[4,8,12],

    }
  },
  created() {
    if(this.$store.getters.selectText){
      this.state = this.$store.getters.selectText
      this.getPage()
    }
  },
  methods:{
    pathClick(path){
      this.$router.replace(path)
    },
    //保存书籍信息 再进行跳转
    detailClick(path,books){
      console.log(books);
      this.$store.commit('booksStatus',books)
      this.$router.push(path)
    },
    //图片显示
    imgUrl(u){
      u = "http://localhost:9000/img/" + u
      return u
    },
    //分页方法
    handleSizeChange(val) {
      this.prepage = val
      this.getPage()
    },
    handleCurrentChange(val) {
      this.getPage(val)
    },
    //获取分页
    getPage(p) {
      if (p == this.page) return;
      this.page = p || this.page;

      let params = {
        page:this.page,
        prepage:this.prepage,
        name:this.state
      }
      getSelectPage(params).then( rs => {
        if (!rs.code) {
          console.log(rs);
          this.count = rs.count;
          this.pages = Math.ceil(this.count / this.prepage);
          this.contents = rs.data;
          this.books = this.contents
        }
      } );
    },querySearchAsync(queryString, cb) {
      let val = queryString
      let params = {
        name:val
      }
      getSelect(params).then(res =>{
        this.results = res.data
        for(let i = 0;i < res.data.length;i++){
          this.results[i].value = res.data[i].books_name
        }
      })
      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {

        cb(this.results);
      }, 1000 * Math.random());
    },

    //搜索方法
    handleSelect(item) {
      this.results =this.results.filter(resitem =>resitem.books_name ==item.books_name)
      console.log(this.results);
      this.isCheck = true;
    },
    selectClick(){
      if(this.state == ''){
        alert('请输入想要查询的书籍')
      }else {
        if(this.results.length == 0){
          //this.$router.push('/detail')
          console.log(this.results.length);
          alert('查无此书，请换其他')
        }
        else {
          this.$store.commit('selectBooksStatus',this.results);
          this.getPage()
        }
      }

    }
  },
  mounted() {
    this.restaurants = this.results;
  },
  watch: {
    getBooks(val,oldVal) {
      console.log(1);
      //this.books = val;
    }
  }


}
</script>

<style scoped>
.selectBook {
  width: 100vw;
  text-align: center;
}
.el-header{
  margin-left: 15vw;
}

.bread{
  margin-left: 20vw;
  margin-top: 2vh;
  margin-bottom: 1vh;
}

.book_content{
  position: relative;
  top: 0;
  left: 0;
  width: 100vw;
}

.books_item{
  float: left;
  width: 25vw;
  margin-left: 5vw;
  margin-right: -8vw;
  text-align: center;


}
.books_item img{
  width: 10vw;
}
.price{
  text-decoration: line-through;
}

.book_page{
  clear: left;
  position: relative;
  top:10vh;
}


</style>