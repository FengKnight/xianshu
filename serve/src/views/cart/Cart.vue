<template>
  <div>
    <home-bar/>
    <div class="cart-content">
      <el-table  ref="tb"
                 type="selection"
                 @select="handleSelect"
                 @select-all="handleSeleceAll"
                 @select-change="handleSelectChange"
                 :data="books"
                 align="center"
      >
        <el-table-column type="selection" width="60"    align="center" >
        </el-table-column>
        <el-table-column  width="120" prop="books_name" label="书名"   align="center" >
        </el-table-column>
        <el-table-column  label="精品图片" width="120">
          <template  slot-scope="scope">
            <el-popover placement="top-start" title="" trigger="hover">
              <img :src="imgUrl(scope.row.picture)" alt="" style="width: 150px;height: 150px">
              <img slot="reference" :src="imgUrl(scope.row.picture)" style="width: 100px;height: 100px">
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="books_secprice" label="价格" width="100">
          <template slot-scope="scope" >
            <span>{{scope.row.books_secprice}}元</span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="condition" label="新旧程度" width="150">
          <template slot-scope="scope" >
            <span>{{scope.row.condition}}成新</span>
          </template>
        </el-table-column>
        <el-table-column align="center"  label="数量" width="150">
          <template slot-scope="scope" >
            <el-button plain  size="mini" @click="sumDecrease(scope.row)" :disabled="scope.row.books_sums<=1">-</el-button>
              <span>{{scope.row.books_sums}}</span>
            <el-button plain  size="mini" @click="sumIncrease(scope.row)" :disabled="scope.row.books_sums>=scope.row.sumMax">+</el-button>
          </template>
        </el-table-column>
        <el-table-column align="center"  label="操作" width="150">
          <template slot-scope="scope" >
            <el-button plain  size="mini" @click="deleteClick(scope)">移除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="footer">
     <span class="left">选中了{{sums}}本
        <el-button plain  size="mini" @click="deleteSome">移除选中</el-button>
     </span>
     <span class="right">共计{{totalPrice}}元
        <el-button plain  size="mini" @click="pathClick('order')" :disabled="sums == 0">去结算</el-button>
     </span>


    </div>
  </div>
</template>

<script>
import HomeBar from "components/content/HomeBar";
import {getCart,updateCart,deleteCart} from "network/cart";

export default {
  name: "Cart",
  components:{
  HomeBar
  },
  created() {

    if(sessionStorage.getItem('username') == 'null'){
      alert('登陆后可查看购物车')
      this.$router.push('/login')
    }else {
      getCart().then(res => {
        this.books = res.data
      })
    }
  },
  data(){
    return {
      books:[],
      sums:0,
      totalPrice:0,
      sumMax:2,
      selectBooks:[]
    }
  },
  methods:{
    pathClick(path){
      this.$store.commit('selectBookStatus',this.selectBooks)
      this.$router.replace(path)
    },

    deleteClick(s){
      let params = {
        cart_id:s.row.cart_id
      }
      if(confirm('是否确定移除')){
        deleteCart(params).then(res =>{
          if(res.status == '0'){
            alert('删除成功')
            this.books.splice(s.$index,1)
          }
        })
      }

    },
    imgUrl(u){
      u = "http://localhost:9000/img/" + u
      return u
    },
    handleSelect(val,r){
      this.selectBooks = val
      console.log(this.selectBooks);
      this.sums = val.length
      this.totalPrice = val.reduce((total,num) => total + num.books_secprice*num.books_sums,0).toFixed(2)
    },
    handleSeleceAll(val){
      this.selectBooks = val
      this.sums = val.length
      this.totalPrice = val.reduce((total,num) => total + num.books_secprice*num.books_sums,0).toFixed(2)
    },
    handleSelectChange(val){
      console.log(val);
    },
    sumIncrease(row){
      let params = {
        sum : row.books_sums+1,
        books_id: row.books_id
      }
      updateCart(params).then(res =>{
        row.books_sums +=1
      })
    },
    sumDecrease(row){
      let params = {
        sum : row.books_sums-1,
        books_id: row.books_id
      }
      updateCart(params).then(res =>{
        row.books_sums -=1
      })
    },
    deleteSome(){
      console.log(this.selectBooks);
      if(confirm('是否确定移除')){
        this.selectBooks.forEach((item,index)=>{
          let params = {
            cart_id: item.cart_id
          }
          deleteCart(params).then(res =>{
            console.log(res);
            if(this.selectBooks.length-1 == index){
              getCart().then(res => {
                this.books = res.data
                console.log(this.books);
                this.sums = 0
                this.totalPrice = 0
              })
            }
          })
        })
      }
    }
  }
}
</script>

<style scoped>
.cart-content{
  width: 100vw;
  text-align: center;
  margin-left: -2vw;
}

.footer{
  width: 100vw;
  height: 25vh;
  text-align: center;
}
.footer .left{
  margin-left: 25vw;
}
.footer .right{
  margin-right: 25vw;

}
</style>