<template>
  <div class="nav-bar">
    <div class="nav-main">
      <div class="nav-left">
            <span><a href="/home">闲书首页</a></span>
      </div>

      <div class="nav-right">
            <span v-if="isLogin">{{this.$store.state.name}} <a @click="layout">[退出]</a></span>
            <span v-else><a href="/login">登录</a>  <a href="/register">注册</a></span>
            <span><a href="/orderContent">我的订单</a></span>
            <span><a href="/cart">购物车</a></span>
            <span><a href="/profile">个人中心</a></span>
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

<style scoped>
.nav-bar{
  background-color: wheat;
  height: 5vh;
  margin-bottom: 6vh;
}

.nav-main{
  padding-top: 1vh;
}

.nav-left{
  width: 30vw;
  float: left;
  margin-left: 12vw;
}
.nav-right{
  text-align: right;
  margin-right: 12vw;
}

span{
  margin-left: 1vw;
}

</style>