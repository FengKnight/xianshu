<template>
  <div class="banner">
    <div v-if="!is_add" ><el-table  ref="tb"
                    empty-text="暂无数据"
                    :data="bannerForm"
                    align="center">
      <el-table-column align="center" prop="port_id"  label="轮播图id" width="100">
      </el-table-column>
      <el-table-column align="center" prop="title" label="标题" width="160">
      </el-table-column>
      <el-table-column align="center" prop="img" label="图片" width="500">
        <template slot-scope="scope">
          <img class="banner-img" :src="imgUrl(scope.row.img)">
        </template>
      </el-table-column>
      <el-table-column align="center" prop="is_show" label="状态" width="160">
        <template slot-scope="scope">
          <div v-if="scope.row.is_show == 1">展示中</div>
          <div v-else>未展示</div>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="content" label="内容" width="200">
        <template slot-scope="{row}">
          {{row.content || '暂无'}}
        </template>
      </el-table-column>

      <el-table-column align="center"  label="操作" width="300">
        <template slot-scope="scope">
          <el-button @click="add">增加</el-button>
          <el-button @click="toggle(scope.row)">展示/不展示</el-button>
          <el-button @click="deleteBan(scope.row)">删除</el-button>
        </template>

      </el-table-column>
    </el-table></div>
    <div class="add-banner" v-else>
      <el-form   :model="bannerform" label-width="80px" class="add-form" >

        <el-form-item prop="title" label="标题">
          <el-input placeholder="例子：暂无" v-model="bannerform.title"></el-input>
        </el-form-item>
        <el-form-item prop="content" label="内容">
          <el-input placeholder="例子：春" v-model="bannerform.content"></el-input>
        </el-form-item>
        <el-form-item prop="picture" label="图片:">
          <el-upload
              class="upload-demo"
              ref="upload"
              :on-success="picSuccess"
              action="http://127.0.0.1:9000/books/addBanner"
              :auto-upload="false">
            <el-button   slot="trigger" size="small" type="primary">选取文件</el-button>
          </el-upload>
        </el-form-item>



        <el-form-item class="add-button">
          <el-button  type="primary" @click="onSubmit">立即创建</el-button>
          <el-button  type="primary" @click="returnSee">返回</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div v-if="isActive" class="bottom-back"></div>
  </div>
</template>

<script>
import {deleteBanner,getBannerPage,updateBanner,addBanner} from "@/network/admin";

export default {
name: "Banner",
  data(){
    return {
      page: 1,    //当前页
      prepage: 10, //每页显示的记录条数
      pages: 1,   //总页数
      count: 0,   //总记录数
      bannerForm:[],
      pageArray:[2,4,6,8],
      is_add:false,
      bannerform: {
        title:'',
        content:'',
        img:''
      },
      isActive:false
    }
  },
  created() {
    this.getPage()
    this.isActive = this.$store.getters.isActive
  },
  methods:{
    toggle(r){
      if(r.is_show == 1){
        let params = {
          port_id:r.port_id,
          is_show: 0
        }
        updateBanner(params).then(res =>{
          console.log(res);
          this.getPage()
        })
      }
      else {
        let params = {
          port_id:r.port_id,
          is_show: 1
        }
        updateBanner(params).then(res =>{
          console.log(res);
          this.getPage()
        })
      }


    },
    deleteBan(r){
      let params = {
        port_id:r.port_id
      }

      deleteBanner(params).then(res =>{
        console.log(res);
        this.getPage()
      })

    },
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
    //获得分页数据
    getPage(p) {
      if (p == this.page) return;
      this.page = p || this.page;
      let params = {
        page:this.page,
        prepage:this.prepage,
      }
      getBannerPage(params).then( rs => {
        if (!rs.code) {
          this.count = rs.count;
          this.pages = Math.ceil(this.count / this.prepage);
          this.contents = rs.data;
          this.bannerForm = rs.data
          console.log(this.bannerForm);
        }
      } )
    },
    add(){
      this.is_add = true
    },
    onSubmit() {
      if(this.bannerform.title &&
          this.bannerform.content
      )
      {
        if(this.$refs.upload._data.uploadFiles.length == 0){
          alert('请添加图片')
        }else {
          this.$refs.upload.submit()
        }
      }
      else {
        alert('信息填写不完整')
      }
    },
    picSuccess(res,file){
      this.bannerform.img = res.picPath
      if(this.bannerform.img !== ''){
        addBanner(this.bannerform).then(res =>{
          console.log(res);
          if(res.status == 0){
            alert('上传成功')
            this.$refs.upload.clearFiles()
          }else{
            alert('上传失败')
          }
        })
      }else{
        alert('未选择上传的图片')
      }
    },
    returnSee(){
      this.is_add = false
      this.getPage()
    }
  }
}
</script>

<style lang="scss" scoped>
.banner{
  .banner-img{
    width: 500px;
    height: 200px;
  }
  .add-banner{
    width: 40vw;
  }
  .bottom-back{
    width: 99.1vw;
    height: 25vh;
    position: absolute;
    top: 100vh;
    left: 0;
    background-color: black;
    z-index: -1;
  }
}
</style>