<template>
  <div class="detail">
    <home-bar/>
    <el-header>
      <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal">
        <el-menu-item index="1" @click="pathClick('./')">首页</el-menu-item>
        <el-menu-item index="2" @click="pathClick('./category')">书库</el-menu-item>
        <el-menu-item index="3" @click="pathClick('./exchange')">换书区</el-menu-item>
        <el-menu-item index="4" @click="pathClick('./messages')">交流讨论</el-menu-item>
      </el-menu>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item >书库</el-breadcrumb-item>
        <el-breadcrumb-item>{{ bigSort[0].big_sort_name}}</el-breadcrumb-item>
        <el-breadcrumb-item>{{ smallSort[0].small_sort_name}}</el-breadcrumb-item>
      </el-breadcrumb>
    </el-header>

    <div class="main" >
      <div class="left">
        <span class="book_name">{{books.books_name}}</span>
        <div class="book_img"><img :src="imgUrl(books.picture)"></div>
      </div>
      <div class="content">
          <div class="con-text">
          <div>作者：{{books.books_author}}</div>
          <div>出版社：{{books.press}}</div>
          <div>原价：{{books.price}}</div>
          <div>现价：{{books.secprice}}</div>
          <div>卖家：{{books.user_name}}</div>
          <div class="book-rate">
            <label>新旧程度：</label>
            <el-rate
              :value="parseFloat(books.condition/2)"
              disabled
              text-color="#ff9900"
          >
          </el-rate></div>
          <div>书籍类别：{{smallSort[0].small_sort_name}}</div>
          <div>书籍数量：{{books.books_sums}}</div>
           <div class="books-intro">书籍简介：{{books.intro}}</div>

          </div>
          <div class="con-text2">书籍现状</div>
          <div class="con-text3">
            <div v-if="books.buy_year == 0">购买年份：暂无</div>
            <div v-else>购买年份：{{ books.buy_year }}</div>
            <div v-if="books.is_write == 0">是否涂改：否</div>
            <div v-else>是否涂改：是</div>
            <div v-if="books.is_lack == 0">是否缺页：否</div>
            <div v-else>是否缺页：是</div>
            <div v-if="books.is_sells == 0">是否多次出售：否</div>
            <div v-else>是否多次出售：是</div>
            <div v-if="books.is_taste == 0">是否存在异味：否</div>
            <div v-else>是否存在异味：是</div>
            <div v-if="books.is_changeColor == 0">颜色变化是否严重：否</div>
            <div v-else>颜色变化是否严重：是</div>
          </div>
          <div>
            <el-button class="btn-jia" @click="sumDecrease" size="mini" :disabled="sum<=1" >-</el-button>
            {{sum}}
            <el-button class="btn-jian"  @click="sumIncrease" size="mini"   :disabled="sum>=books.books_sums" >+</el-button>
            <el-button class="btn-add"  @click="addCart()"   >加入购物车</el-button>
            <el-button class="btn-buy"  @click="nowBuy"  >立即购买</el-button>
            <el-button class="btn-connect" @click="contact(books.user_name)"> 联系商家</el-button>
          </div>

        </div>

      <div class="right">
        <div>相关分类</div>
        <div>
          <ul v-for="item in correlation">
            <li @click="sortClick(item.small_sort_id)">{{item.small_sort_name}}</li>
          </ul>
        </div>
      </div>
    </div>
    <div class="other-top">其他推荐</div>
    <div class="footer">


      <div class="other-books">
          <div class="books_item" v-for="item in otherBooks" @click="detailClick(item)">
            <div><img :src="imgUrl(item.picture)"></div>
            <div class="books_name">{{item.books_name}}</div>
            <div>作者：{{item.books_author}}</div>
            <div>出版社：{{item.press}}</div>
            <div>新旧程度：{{item.condition}}</div>
            <div ><span class="price">￥{{item.price}}</span>￥{{item.secprice}} <span></span></div>
          </div>
        </div>
    </div>
  </div>
</template>

<script>
import HomeBar from "components/content/HomeBar";
import {getBigSort,getSmallSort} from "network/admin";
import {addCart,getLikeBooks} from "network/cart";
export default {
  data(){
    return {
      booksId:'',
      activeIndex:'2',
      bigSort:[],
      smallSort:[],
      books:[],
      data:[],
      sum:1,
      correlation:[],
      otherBooks:[],
      is_show:true
    }
  },
  created() {
    if(this.$store.getters.smallSort.length == 0 &&this.$store.getters.bigSort.length ==0){
      getBigSort().then(res=>{
        this.bigSort = res
        this.$store.commit('bisSortStatus',this.bigSort)
      })
      getSmallSort().then(res=>{
        this.smallSort = res
        this.$store.commit('smallSortStatus',this.smallSort)
      })
      this.books = this.$store.getters.books
      setTimeout(()=>{
        this.smallSort = this.$store.getters.smallSort.filter(item => item.small_sort_id == this.books.small_sort_id)
        this.bigSort = this.$store.getters.bigSort.filter(item => item.big_sort_id == this.smallSort[0].big_sort_id)
        this.correlation = this.$store.getters.smallSort.filter(item => item.big_sort_id == this.bigSort[0].big_sort_id)
      },100)

    }else {
      this.books = this.$store.getters.books
      this.smallSort = this.$store.getters.smallSort.filter(item => item.small_sort_id == this.books.small_sort_id)
      this.bigSort = this.$store.getters.bigSort.filter(item => item.big_sort_id == this.smallSort[0].big_sort_id)
      this.correlation = this.$store.getters.smallSort.filter(item => item.big_sort_id == this.bigSort[0].big_sort_id)
    }
    let parans = {
      small_sort_id : this.books.small_sort_id,
      books_id : this.books.books_id
    }
    getLikeBooks(parans).then(res=>{
      this.otherBooks = res.data
    })
  },
  components:{
    HomeBar
  },
  methods:{
    imgUrl(u){
      u = "http://localhost:9000/img/" + u
      return u
    },
    sumIncrease(){
      this.sum += 1
    },
    sumDecrease(){
      this.sum -= 1
    },
    pathClick(path){
      this.$router.replace(path)
    },
    sortClick(id){
      this.$store.commit('bookIdStatus',id)
      this.$router.replace('category')
    },
    addCart(){
      if(sessionStorage.getItem('username') !== 'null'){
        let params = {
          books_id:this.books.books_id,
          sum:this.sum
        }
        addCart(params).then(res=>{
          console.log(res);
          if(res.status == '0'){
            alert('加入购物车成功')
          }else if(res.status == '4'){
            alert(res.result)
          }else  if(res.status == '3'){
            alert('购物车商品数量+'+this.sum)
          }
        })
      }else {
        alert('请先登录')
      }

    },
    nowBuy(){
      console.log(this.books);
      let obj = []
      obj[0] = this.books
      obj[0].books_sums = this.sum
      obj[0].cart_id = 0
      obj[0].books_secprice = this.books.secprice
      obj[0].state = 0
      console.log(obj);
      this.$store.commit('selectBookStatus',obj)
      this.$store.commit('orderStateStatus',2)
      this.$router.replace('order')
    },
    detailClick(books){
      this.$store.commit('booksStatus',books)

      this.books = books
      let parans = {
        small_sort_id : this.books.small_sort_id,
      }
      getLikeBooks(parans).then(res=>{
        console.log(res);
        this.otherBooks = res.data
      })
    },
    contact(name){
      this.$store.state.sells_name =name
      this.$router.push('/test')
      console.log(this.$store.getters.sells_name);
    }
  }
}
</script>

<style lang="scss" scoped>
.detail{
  background-color: white;
  margin-bottom: 5vh;
  .el-header{
    margin-bottom: 10vh;
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
  .el-breadcrumb{
    margin-top: 1vh;
    margin-left: 28vw;
    font-size: 18px;
  }

  .main{
    height: 60vh;
  }
  .main .left{
    width: 15vw;
    height: 40vh;
    margin-left: 12.5vw;
  }
  .content{
    margin-left: 25vw;
    margin-right: 25vw;
    padding-top: 3vh;
    width: 50vw;
    height: 40vh;

  }
  .main .right{
    margin-top: -40vh;
    width: 24vw;
    height: 40vh;
    padding-left: 1vw;
    li{
      width:  10vw;
      font-size: 18px;
      color: #9e0b0b;
      line-height: 3vh;
    }
  }

  .book_name{
    font-size: 1.8vw;
    font-family: KaiTi;
    font-weight: 900;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .book_img{

  }
  .book_img img{

    width: 13vw;
    height: 28vh;
  }

  .content .con-text{
    display: flex;
    justify-content: left;
    align-items: center;
    flex-wrap: wrap;
    line-height:4vh;
    div{
      width: 18vw;
    }
  }
  .books-intro{
    width: 36vw!important;
  }
  .con-text2{

    font-size: 20px;
    margin-top: 3vh;
    margin-bottom: 1vh;
    color: #555421;
  }
  .con-text3{
    display: flex;

    div{
      margin-top: 0.6vh;
      margin-left: 0.5vw;
      color: #727015;
    }
  }

  .con-text span{
    margin-right: 10vw;
  }

  .right ul li{
    width: 12vw;
    float: left;
    list-style-type: none;
    font-size: 14px;
    font-family: KaiTi;
    margin:1vh 0;
  }
  .other-top{
    font-size: 24px;
    display: flex;
    margin-top: -6vh;
    padding-left: 18vw;
    color: #843030;
  }
  .footer{
    display: flex;
    justify-content: center;
    border-top:1px solid tan;
    font-size: 18px;
    height: 35vh;
    .other-books{
      display: flex;
      margin-top: -5vh;
      .books_item{

        width: 20vw;
        height: 20vh;
        margin: 6vh 0 10vh 0vw ;
        text-align: center;
      }

      .books_item img{
        height: 20vh;
      }

      .books_name{
        font-size: 23px;
        font-family: KaiTi;
      }

      .price{
        text-decoration: line-through;
      }


    }
  }
  .el-button{
    margin-top: 3vh;
  }
  .btn-jia{
    background-color: #bd5d5d;
    border: none;
    color: white;
    border-radius: unset;
    margin-left: 5vw;
  }
  .btn-jian{
    background-color: #bd5d5d;
    border: none;
    color: white;
    border-radius: unset;
  }
  .btn-add{
    width: 8vw;
    height: 4vh;
    background-color: #c90011;
    border: none;
    color: white;
    border-radius: unset;
    margin-left: 3vw;
  }
  .btn-buy{
    width: 8vw;
    height: 4vh;
    background-color: #c90011;
    border: none;
    color: white;
    border-radius: unset;
    margin-left: 3vw;
  }
  .btn-connect{
    width: 8vw;
    height: 4vh;
    background-color: #fdfd85;
    border: none;
    color: #6c0707;
    border-radius: unset;
    margin-left: 3vw;
  }
  .el-button.is-disabled:hover{
    background-color: #5f0a0a;
    border: none;
  }
  .el-button.is-disabled{

    background-color: #bd5d5d!important;
  }
  .book-rate{
    label{
      width: 6vw;
    }
    display: flex;
    justify-content: left;
    align-items: center;
  }

}


</style>