<template>
  <div class="banner">

    <div  v-if="!is_add" >
      <el-table  ref="tb"
                    empty-text="暂无数据"
                    :data="advertForm"
                    align="center">
      <el-table-column align="center" prop="advert_id"  label="轮播图id" width="100">
      </el-table-column>
      <el-table-column align="center" prop="img" label="图片" width="500">
        <template slot-scope="scope">
          <img class="banner-img" :src="imgUrl(scope.row.img)">
        </template>
      </el-table-column>

      <el-table-column align="center" prop="content" label="内容" width="200">
        <template slot-scope="{row}">
          {{row.content || '暂无'}}
        </template>
      </el-table-column>

      <el-table-column align="center"  label="操作" width="180">
        <template slot-scope="scope">
          <el-button @click="add">增加</el-button>
          <el-button @click="deleteBan(scope.row)">删除</el-button>
        </template>

      </el-table-column>
    </el-table>
    </div>
    <div  class="add-banner" v-else>
      <el-form   :model="advertform" label-width="80px" class="add-form" >


        <el-form-item prop="content" label="内容">
          <el-input placeholder="例子：春" v-model="advertform.content"></el-input>
        </el-form-item>
        <el-form-item prop="picture" label="图片:">
          <el-upload
              class="upload-demo"
              ref="upload"
              :on-success="picSuccess"
              action="http://127.0.0.1:9000/books/addAdvert"
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
import {deleteAdvert,addAdvert,getAdvertPage} from "@/network/admin";

export default {
name: "Banner",
  data(){
    return {
      page: 1,    //当前页
      prepage: 10, //每页显示的记录条数
      pages: 1,   //总页数
      count: 0,   //总记录数
      advertForm:[],
      pageArray:[2,4,6,8],
      is_add:false,
      advertform: {
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

    deleteBan(r){
      let params = {
        advert_id:r.advert_id
      }

      deleteAdvert(params).then(res =>{
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
      getAdvertPage(params).then( rs => {
        if (!rs.code) {
          this.count = rs.count;
          this.pages = Math.ceil(this.count / this.prepage);
          this.contents = rs.data;
          this.advertForm = rs.data
          console.log(this.advertForm);
        }
      } )
    },
    add(){
      this.is_add = true
    },
    onSubmit() {
      if(
          this.advertform.content
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
      this.advertform.img = res.picPath
      if(this.advertform.img !== ''){
        addAdvert(this.advertform).then(res =>{
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
    width: 200px;
    height: 350px;
  }
  .add-banner{
    width: 40vw;
  }
  .bottom-back{
    width: 99.1vw;
    height: 95vh;
    position: absolute;
    top: 100vh;
    left: 0;
    background-color: black;
    z-index: -1;
  }
}

</style>