<template>
  <div class="nav-bar">
    <div class="nav-main">
      <div class="nav-left">
            <span><a href="/home">闲书首页</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;闲之不如易之</span>
      </div>

      <div class="nav-right">
            <span v-if="isLogin">{{this.$store.state.name}} <a @click="layout">[退出]</a></span>
            <span v-else><a href="/login">登录</a>/<a href="/register">注册</a></span>
            <span><a href="/orderContent">我的订单<i class="el-icon-tickets"></i></a> </span>
            <span> <a href="/cart"><i class="el-icon-shopping-cart-2"></i> 购物车</a></span>
            <span><a href="/profile"><i class="el-icon-s-custom"></i>个人中心</a></span>
      </div>
    </div>
  </div>
</template>

<script>
import {postLayout} from "network/login";
import {isLogin} from "store/getters";
export default {
  name: "HomeBar",
  computed:{
    isLogin(){
      if(sessionStorage.getItem('username')!=="null"&&sessionStorage.getItem('username')!==null){
        this.$store.commit("userStatus",sessionStorage.getItem('username'))
      }else {
        this.$store.commit("userStatus",null)
      }
      return this.$store.getters.isLogin
    }
  },
  methods: {
    layout(){
      postLayout().then((res)=>{
        console.log(res);
        if(res.status == 0){
          sessionStorage.setItem('username',null)
          this.$store.dispatch("setUser",null)
          this.$router.replace('/home')
          console.log("退出成功");
        }
      })
    }

  }

}
</script>

<style lang="scss" scoped>
.nav-bar{
  background-color: #92433c;
  height: 4vh;
  color: #e7e7e7;
  .nav-main{
    padding-top: 1vh;
  }

  .nav-left{
    width: 25vw;
    float: left;
    margin-left: 9.5vw;
  }
  .nav-right{
    text-align: right;
    margin-right: 10vw;
  }

  span{
    margin-left: 1vw;
  }
  a{
    color: #eeeded;
  }
  a:hover{
    color: #eae9be;
    background-color: #844d38;
    height: 4vh;
  }
}

</style>