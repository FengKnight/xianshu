<template>
  <div class="admin">
  <el-container style="height: 500px; border: 1px solid #eee">
    <div class="aside">
    <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
      <el-menu>
        <el-menu-item @click="menuClick('home')">首页</el-menu-item>
        <el-menu-item @click="menuClick('user')">用户管理</el-menu-item>
        <el-menu-item @click="menuClick('book')">书籍管理</el-menu-item>
        <el-menu-item @click="menuClick('order')">订单管理</el-menu-item>
        <el-menu-item @click="menuClick('message')">评论管理</el-menu-item>
        <el-menu-item @click="menuClick('check')">书籍审核</el-menu-item>
        <el-menu-item>其他管理</el-menu-item>
      </el-menu>
    </el-aside>
    </div>
    <el-container>
      <el-header style="text-align: right; font-size: 12px">
          <span>欢迎最尊贵的管理员：feng</span>
            <label class="back" @click="back"><退出></label>

      </el-header>

    <AdminMain ></AdminMain>
    </el-container>
  </el-container>
  </div>
</template>

<script>
import {getBigSort,getSmallSort} from "network/admin";

import AdminMain from "./childComps/AdminMain"

export default {
    name: "Admin",
    created() {
      getBigSort().then(res=>{
        this.bigSort = res
      })
      getSmallSort().then(res=>{
        this.smallSort = res
      })
    },
  data() {
      return {
        bigSort:[],
        smallSort:[],
        i:0,
      }
    },
  methods:{
    menuClick(path){
      this.$store.commit('adminShowSortStatus',path)
    },
    back(){
      this.$router.replace('/login')
    }
  },
  components:{
    AdminMain
  }
}
</script>

<style lang="scss" scoped>

.admin{
  .el-container{
    border: none!important;
    height: auto!important;
  }
  .el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }

  .el-aside {
    color: #333;
    padding-top: 7vh;
  }


  body > .el-container {
    margin-bottom: 40px;
  }
  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 240px;
  }

  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
  .back{
    font-size: 12px;
    margin-left: 1vw;
  }
}

</style>