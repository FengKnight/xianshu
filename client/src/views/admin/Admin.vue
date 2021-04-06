<template>
  <div :class="{'chang-admin': isActive}" class="admin" >
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
        <el-menu-item @click="menuClick('banner')">轮播图管理</el-menu-item>
        <el-menu-item @click="menuClick('advert')">广告管理</el-menu-item>
        <el-menu-item @click="menuClick('activity')">活动管理</el-menu-item>

        <el-menu-item @click="changeColor">颜色变换</el-menu-item>
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
      if(sessionStorage.getItem('username') != 'feng'){
        alert('非管理员勿入')
        this.$router.push('/login')
      }else {
        getBigSort().then(res=>{
          this.bigSort = res
        })
        getSmallSort().then(res=>{
          this.smallSort = res
        })
      }

    },
  data() {
      return {
        bigSort:[],
        smallSort:[],
        i:0,
        isActive:false
      }
    },
  methods:{
    menuClick(path){
      this.$store.commit('adminShowSortStatus',path)
    },
    back(){
      this.$router.replace('/login')
    },
    changeColor(){
      this.isActive = !this.isActive
      this.$store.state.isActive =this.isActive
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
    background-color: #449e8a;
    color: #fafafa;
    line-height: 60px;
    margin-left: -17vw;
  }

  .el-aside {
    color: white;
    margin-top: 6.5vh;
  }

  .el-menu{
    color: white;
    background-color:#4ec4a9;
  }
  .el-menu-item{
    text-align: center;
    color: #ffffff;
    font-size: 16px;
  }
  .el-menu-item:hover{
    background-color: #346d66;
  }
  .el-menu-item:focus{
    background-color: #346d66;
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
<style lang="scss">


.chang-admin{
   background-color: black!important;
  .el-menu{
    border: 1px solid #348b8b;
    background-color: black!important;
  }
  .el-button.is-disabled{
    background-color: black!important;
    border: 1px solid rgba(69, 255, 194, 0.4);
    color: #5a5a5a;
  }
  .el-aside {
    background-color: black!important;
    color: #49928c;
    margin-top: 7vh;
  }
  .el-container{
    border: none!important;
    height: auto!important;
  }
  .el-header {
    background-color: black!important;
    color: #49928c!important;
    line-height: 60px;
    margin-left: -17vw;
    border-bottom: 1px solid #1e716a;
  }


  .el-menu-item:hover{
    background-color: #418275!important;
  }
  .el-menu-item:focus{
    background-color: #418275!important;
  }
  .el-menu-item{
    color: #4eecc7;
  }
  .el-pagination{

    .btn-prev{
      margin-right: 10px;
      background-color: #000619;
      border: 1px solid rgba(69, 255, 194, 0.4);
      font-family: PingFang SC;
      font-weight: 400;
      color: #45FFC2!important;
    }
    .btn-next{
      background-color: #000619;
      border: 1px solid rgba(69, 255, 194, 0.4);
      margin-left: 10px;
      font-family: PingFang SC;
      font-weight: 400;
      color: #45FFC2!important;
    }
    .number{
      background-color: #000619;
      border: 1px solid rgba(69, 255, 194, 0.4);
    }
    .el-pager li.active{
      color: #45FFC2!important;
    }
  }

  //表格样式 表格高度宽度自设置 el-table 宽度需要+3px才能与头部对上
  .el-table th, .el-table tr{
    background-color: transparent;

  }
  //取出表头背景颜色
  .el-table thead tr:first-child{
    background-image: url("../../assets/img/table-header.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;

  }
  .el-table tr:nth-child(odd){
    background-color: #000619;
    font-size:13px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: #FFFFFF;

  }//设置单行背景颜色
  .el-table tr:nth-child(even){
    background-color: #07202A;
    font-size: 13px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: #FFFFFF;
  }//设置偶数行背景颜色
  .el-table__body tr:hover>td {
    background-color: transparent!important
  }//去除表中hover
  .el-table td, .el-table th.is-leaf{
    border: none;
  }//取出表中下划线
  .el-table, .el-table__expanded-cell{
    background-color: transparent!important;
  }//去除右边框
  /deep/.el-table th > .cell {
    text-align: center;
  }//表格居中
  /deep/.el-table .cell {
    text-align: center;
  }//表格居中
  .el-table::before{
    height: 0;
  }//表格底部边框
  .el-pagination{
    display: flex;
    justify-content: center;
    align-items: center;
    .el-pagination{
      //左右两个按钮
      button{
        height: 35px;
        line-height: 35px;
        border-radius: 0;
      }

      .el-pager li{
        height: 35px;
        line-height: 35px;
        box-sizing: border-box;
        background-color: #000619!important;
        border: 1px solid rgba(69, 255, 194, 0.4);
        margin: 0;
        border-radius: 0;
        padding: 0;
        font-family: PingFang SC;
        font-weight: 400;
        color: #45FFC2!important;
      }

      //输入框
      .el-pagination__editor{
        height: 35px;
      }
      .el-pagination__editor.el-input .el-input__inner{
        width:35px;
        height: 35px;
        border-radius: 0;
      }
    }
    .el-input__inner{
      background-color: #000619;
      border: 1px solid rgba(69, 255, 194, 0.4);
      text-align: center;
      height: 35px;
      border-radius: 0;
      font-family: PingFang SC;
      font-weight: 400;
      color: #45FFC2!important;
    }
    input::-webkit-inner-spin-button{
      display: none;
    }


  }
  .el-button{
    background-color: black;
    border: 1px solid rgba(69, 255, 194, 0.4);
  }
  .el-button:hover{
    background-color: black!important;
    border: 1px solid #45FFC2 !important;
    color: #45FFC2!important;
  }
  .el-input__inner{
    background-color: black!important;
    border: 1px solid #45FFC2 !important;
    color: #45FFC2!important;
  }
  .el-scrollbar__view el-cascader-menu__list{
    background-color: black!important;
    border: 1px solid #45FFC2 !important;
    color: #45FFC2!important;
  }
  .el-cascader-node__label{
    color: #45FFC2!important;
  }
  .el-scrollbar{
    border: none;
    color: #45FFC2!important;
  }
  .el-cascader-menu__wrap{
    background-color: black!important;
    border: none;
    color: #45FFC2!important;
  }
  .el-cascader-panel{
    background-color: black;
    border: 1px solid #45FFC2 !important;
  }
  .el-cascader{
    .el-input__inner{
      color: #45FFC2!important;
      background-color: black!important;
    }
  }
}
</style>