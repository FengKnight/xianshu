<template>
  <div class="add">
  <el-form ref="bookform" :rules="rules" :model="bookForm" label-width="80px" class="add-form" >
    <el-form-item prop="books_name" autocomplete="off" label="书籍名称" >
      <el-input  v-model="bookForm.books_name"></el-input>
    </el-form-item>
    <el-form-item label="书籍类别">
      <div class="block">
        <span class="demonstration">单选可搜索</span>
        <el-cascader
            v-model="bookForm.smallSort"
            placeholder="试试搜索：玄幻"
            :options="getCascader"
            filterable></el-cascader>
      </div>
    </el-form-item>
    <el-form-item prop="intro" label="简介">
      <el-input v-model="bookForm.intro"></el-input>
    </el-form-item>
    <el-form-item prop="books_author" label="作者">
      <el-input v-model="bookForm.books_author"></el-input>
    </el-form-item>
    <el-form-item prop="press" label="出版社">
      <el-input v-model="bookForm.press"></el-input>
    </el-form-item>

    <el-form-item prop="picture" label="图片">
      <el-upload
          class="upload-demo"
          ref="upload"
          :on-success="picSuccess"
          action="http://127.0.0.1:9000/books/add"
          :auto-upload="false">
        <el-button  v-model="bookForm.price" slot="trigger" size="small" type="primary">选取文件</el-button>
      </el-upload>
    </el-form-item>
    <el-form-item prop="price" label="价格">
      <el-input v-model="bookForm.price"></el-input>
    </el-form-item>
    <el-form-item prop="condition" label="新旧程度">
      <el-input v-model="bookForm.condition"></el-input>
    </el-form-item>
    <el-form-item prop="user_name" label="卖家名称">
      <el-input v-model="bookForm.user_name"></el-input>
    </el-form-item>
    <el-form-item prop="books_sums" label="数量">
      <el-input v-model="bookForm.books_sums"></el-input>
    </el-form-item>


    <el-form-item>
      <el-button v-if="!bookForm.books_id" type="primary" @click="onSubmit">立即创建</el-button>
      <el-button v-else="bookForm.books_id" type="primary" @click="updateSubmit">更新</el-button>
      <el-button @click="resetForm('bookform')">重置</el-button>
      <el-button @click="goback()">取消</el-button>
    </el-form-item>
  </el-form>
  </div>
</template>

<script>
import {addBook,updateBook} from "network/admin";

export default {
name: "add",
  props:{
    bookForm: {
      type:Object,
      default(){
        return {}
      }
    },
    bigSort:{
      type:Array,
      default(){
        return []
      }
    },
    smallSort:{
      type:Array,
      default(){
        return []
      }
    }
  },
  data(){

    var validateName = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('账号名不能为空'));
      } else {
        callback();
      }
    }

    var validateUname = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('卖家不能为空'));
      } else {
        callback();
      }
    }

    var validateIntro = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('简介不能为空'));
      } else {
        callback();
      }
    }

    var validateAuthor = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('作者不能为空'));
      } else {
        callback();
      }
    }

    var validatePress = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('出版社不能为空'));
      } else {
        callback();
      }
    }


    var validatePrice = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('价格不能为空'));
      } else {
        if( value < 0 ){
          callback(new  Error(('价格不能为负数')))
        }
        callback();
      }
    }

    var validateSums = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('数量不能为空'));
      } else {
        if( value <= 0 ){
          callback(new  Error(('数量需要大于0')))
        }
        callback();
      }
    }

    var validateCondition = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('新旧程度不能为空'));
      }

      else {
        if( value < 7 ){
          callback(new  Error(('新旧程度最低为7')))
        }
        else if( value >10){
          callback(new  Error(('数量需要大于0')))
        }
        callback();
      }
    }

    return {
      rules: { // 表单验证规则
        books_name: [
          { validator: validateName, trigger: 'blur' }
        ],
        intro:[
          { validator: validateIntro, trigger: 'blur' }
        ],
        books_author:[
          { validator: validateAuthor, trigger: 'blur' }
        ],
        press:[
          { validator: validatePress, trigger: 'blur' }
        ],
        price: [
          { validator: validatePrice, trigger: 'blur' }
        ],
        books_sums:[
          { validator: validateSums, trigger: 'blur' }
        ],
        user_name: [
          { validator: validateUname, trigger: 'blur' }
        ],
        condition: [
          { validator: validateCondition, trigger: 'blur' }
        ],
       picture: [
          { required: true, message: '请上传图片' }
        ],
      }
    }
  },
  methods:{
    onSubmit() {
      if(this.bookForm.books_name &&
          this.bookForm.smallSort &&
          this.bookForm.intro &&
          this.bookForm.price &&
          this.bookForm.condition &&
          this.bookForm.user_name &&
          this.bookForm.books_author &&
          this.bookForm.press &&
          this.bookForm.books_sums)
      {
        if(this.$refs.upload._data.uploadFiles.length == 0){
          alert('请添加图片')
        }else {
          this.$refs.upload.submit()
        }
      }
      else {
        alert('输入不能为空')
      }
    },
    updateSubmit(){
      console.log(this.bookForm);
      if(this.bookForm.books_name &&
          this.bookForm.smallSort &&
          this.bookForm.intro &&
          this.bookForm.price &&
          this.bookForm.condition &&
          this.bookForm.user_name &&
          this.bookForm.books_author &&
          this.bookForm.press &&
          this.bookForm.books_sums)
      {
        updateBook(this.bookForm).then(res =>{
          console.log(res);
          if(res.status == 1){
            alert('卖家不存在')
          }else if( res.status == 2){
            alert('图片未上传')
          }else{
            alert('更新成功')
          }
        })
      }
      else {
        alert('输入不能为空')
      }
    },
    picSuccess(res,file){
      this.bookForm.picture = res.picPath
      if(this.bookForm.picture !== ''){
        addBook(this.bookForm).then(res =>{
          console.log(res);
          if(res.status == 1){
            alert('卖家不存在')
          }else if( res.status == 2){
            alert('图片未上传')
          }else{
            alert('上传成功')
            this.$refs.upload.clearFiles()
          }
        })
      }else{
        alert('未选择上传的图片')
      }
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    goback(){
      this.$store.commit('adminShowSortStatus','book')
    }
  },
  computed:{
    getCascader(){
      this.options = this.bigSort.map(item =>{
        return {
          value:  item.big_sort_name,
          label: item.big_sort_name,
          children:
              this.smallSort.filter(item2 =>{
                return item2.big_sort_id == item.big_sort_id
              }).map(item3 =>{
                return {
                  value:  item3.small_sort_name,
                  label:item3.small_sort_name
                }
              })
        }
      })
      return this.options
    }
  }
}
</script>

<style scoped>
.add{
  text-align: center;
  width: 40vw;
  height: 40vh;
  position: absolute;
  top: 30%;
  left: 50%;
  transform: translate(-50%,-50%);
}
.add-form{
  width: 50vw;
  height: 50vh;
}

.el-input{
  width: 40vw;
}
</style>