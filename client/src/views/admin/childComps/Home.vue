<template>
  <div class="admin-home">
    <div class="home-top">
      <div class="top-user">
        <img src="../../../assets/img/user-icon.jpg"/>
        <label>用户数量：{{users_sum}}</label>
      </div>
      <div class="top-book">
        <img src="../../../assets/img/book-icon.jpg"/>
        <label>库存数量：{{books_sum}}</label>
      </div>
      <div class="top-order">
        <img src="../../../assets/img/order-icon.jpg"/>
        <label>订单数量：{{orders_sum}}</label>
      </div>
    </div>
    <div class="home-content">
        <BarChar class="barchar"/>
      <div>现有排行</div>
      <div class="rank">
        <SellBooksChar class="rank-sell"></SellBooksChar>
        <TopMessageChar class="rank-message"></TopMessageChar>
      </div>
    </div>
  </div>
</template>

<script>
import BarChar from "@/views/admin/childComps/BarChar";
import {getAllBooksSums,getAllOrderSums,getAllUserSums} from "@/network/admin";
import TopMessageChar from "@/views/admin/childComps/TopMessageChar";
import SellBooksChar from "@/views/admin/childComps/SellBooksChar";
export default {
  created() {
    getAllUserSums().then(res =>{
      this.users_sum = res.data
    })
    getAllOrderSums().then(res =>{
      this.orders_sum = res.data
    })
    getAllBooksSums().then(res =>{
      this.books_sum = res.data
    })
  },
  data(){
    return {
      books_sum:0,
      orders_sum:0,
      users_sum:0
    }
  },
  components:{
    BarChar,
    TopMessageChar,
    SellBooksChar
  }
}
</script>

<style lang="scss" scoped>
.admin-home{
  .home-top{
    display: flex;
    align-items: center;
    div{
      width: 20vw;
      height: 10vh;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 5px;
      background-color: #4ec4a9;
      margin-left: 5vw;
      img{
        width: 70px;
        height: 70px;
      }
      label{
        color: white;
      }
    }
  }
  .barchar{
    margin-top: 2vh;
  }
  .rank{
    display: flex;
    .rank-sell{
      width: 35vw;
      height: 35vh;
      margin-left: -20vw;
    }
    .rank-message{
      width: 35vw;
      height: 35vh;
      margin-left: 28vw;
    }
  }
}
</style>