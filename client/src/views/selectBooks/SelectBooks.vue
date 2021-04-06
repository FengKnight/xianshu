<template>
  <div>
    <home-bar/>
    <div class="search-div">
      <div class="logo-div">    <img @click="pathClick('/')" src="../../assets/img/xianshuLOGO.png" class="logo"></div>
      <div  class="search-input">
        <div class="search-text">书籍检索</div>
        <el-autocomplete
            v-model="state"
            :fetch-suggestions="querySearchAsync"
            placeholder="请输入内容"
            @select="handleSelect"
        ></el-autocomplete>
        <el-button @click="selectClick" >搜索</el-button>
        <div class="search-retext">边城   有生之年   九州缥缈录   活着   家   鹿鼎记    风云第一刀   三国演义   西游记  </div>

      </div>
    </div>

    <div class="selectBook">



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
  </div>

</template>

<script>
import HomeBar from "components/content/HomeBar";
import {getSelect,getSelectPage} from "network/select";
import HomeSearch from "@/components/content/HomeSearch";
export default {
  name: "SelectBooks",
  components: { HomeBar,HomeSearch},
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

<style lang="scss" scoped>
.selectBook {
  width: 75vw;
  margin-left: 12.5vw;
  background-color: white;
  text-align: center;
  height: 80vh;
  margin-top: -6vh;
  padding-top: 10vh;

  .el-menu-demo{
    width: 75vw;
    padding-left: 5vw;
    margin-left: -1vw;
    padding-top: 1vh;
    margin-top: -3vh;
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

  .bread{
    margin-left: 5vw;
    margin-top: 5vh;
    margin-bottom: 1vh;
  }

  .book_content{
    position: relative;
    top: 0;
    left: 0;

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



}
.search-div{
  height: 21vh;
  width: 75vw;
  margin-left: 12.5vw;
  display: flex;
  justify-content: center;
  .search{
    width: 30vw;
    margin-bottom: 40px;
  }
  .nav-search i{
    font-family: KaiTi;
  }
  .logo{
    width: 10vw;
    height: 20vh;
    margin-left: -10vw;
    border-radius: 50%;

  }
  .logo-div{
    margin-left: 0vw;
  }
  .search-input{
    margin-left: 15vw;
    margin-top: 5vh;
  }
  .search-text{
    color: #9e0b0b;
    font-weight: bold;
    padding-left: 1vw;
    font-size: 18px;
    margin-bottom: 1vh;
  }
  .search-retext{
    margin-top: 1vh;
    color: #717171;
    padding-left: 0.8vw;
  }
}
</style>
<style lang="scss">
.search-div{
  background-color: #ffffff;
  .el-input{
    width: 30vw;
    height: 6vh;
    border: 2px solid #8e5b2c;
    border-right:none ;
  }
  .el-input__inner{
    border: none;
    height: 5.2vh;
  }
  .el-button{
    display: block;
    margin-top: -6vh;
    margin-left: 30vw;
    background-color: #cb1c1c;
    color: white;
    width: 5vw;
    height: 6vh;
    border: none;
    border-radius: unset;
  }
  .el-button:hover{
    color: white;
    background-color: #ff0303;
  }

}
</style>