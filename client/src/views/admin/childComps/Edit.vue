<template>
  <div class="edit">
  <el-form ref="edits" :rules="rules" :model="edits" label-width="80px" class="edit-form" >
    <el-form-item prop="books_name" autocomplete="off" label="书籍名称" >
      <el-input  v-model="edits.books_name" :value="edits.books_name"></el-input>
    </el-form-item>
    <el-form-item label="书籍类别">
      <div class="block">
        <span class="demonstration">单选可搜索</span>
        <el-cascader
            v-model="edits.smallSort"
            placeholder="试试搜索：玄幻"
            :options="getCascader"
            filterable></el-cascader>
      </div>
    </el-form-item>
    <el-form-item prop="intro" label="简介">
      <el-input v-model="edits.intro"></el-input>
    </el-form-item>

    <el-form-item prop="picture" label="图片">
      <el-upload
          class="upload-demo"
          ref="upload"
          :on-success="picSuccess"
          action="http://127.0.0.1:9000/books/add"
          :auto-upload="false">
        <el-button v-model="edits.price" slot="trigger" size="small" type="primary">选取文件</el-button>
        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
      </el-upload>
    </el-form-item>
    <el-form-item prop="price" label="价格">
      <el-input v-model="edits.price"></el-input>
    </el-form-item>
    <el-form-item prop="condition" label="新旧程度">
      <el-input v-model="edits.condition"></el-input>
    </el-form-item>
    <el-form-item prop="user_name" label="卖家名称">
      <el-input v-model="edits.user_name"></el-input>
    </el-form-item>
    <el-form-item prop="books_sums" label="数量">
      <el-input v-model="edits.books_sums"></el-input>
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="onSubmit">立即创建</el-button>
      <el-button @click="resetForm('edits')">重置</el-button>
      <el-button @click="goback('edits')">取消</el-button>
    </el-form-item>
  </el-form>
  </div>
</template>

<script>
export default {
  name: "Edit",
  props:{
    edits:{
      type:Object,
      default(){
        return {}
      },
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
  methods:{
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    goback(formName){
      this.$refs[formName].resetFields();
      this.$store.state.isChange = 'book'
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
      },
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
.edit{
  text-align: center;
  width: 40vw;
  height: 40vh;
  position: absolute;
  top: 30%;
  left: 50%;
  transform: translate(-50%,-50%);
}
.edit-form{
  width: 50vw;
  height: 50vh;
}
</style>