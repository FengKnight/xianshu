<template>
  <div class="login-container">
    <div class="login-bg"></div>
    <el-row :gutter="10">
      <el-col :xs="10" :sm="10" :md="10" :lg="10" :xl="10">
        <div class="login">
          <div class="login-main">
            <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
              <el-form-item label="账号:" prop="name" class="login-item">
                <el-input type="text" v-model="ruleForm.name" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="密码:" prop="pass">
                <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item class="identify-item" label="验证码:" prop="identify">

                <div class="identify">
                  <el-input type="text" v-model="identifyText" autocomplete="off"></el-input>
                  <Identify :identifycode="identifyCode" />
                  <el-button @click="refreshCode">刷新</el-button>
                </div>

              </el-form-item>

              <el-form-item class="login-button">
                <el-button @click="submitForm('ruleForm')">登录</el-button>
                <el-button @click="pathClick('/register')">注册</el-button>
                <el-button @click="resetForm('ruleForm')">重置</el-button>
                <el-button @click="pathClick('/home')">返回首页</el-button>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </el-col>

    </el-row>

  </div>



</template>

<script>
import {postLogin} from "network/login";
import Identify from "@/components/common/Identify";

export default {
name: "Login",
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        callback();
      }
    };

    var validateName = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入账号名'));
      } else {
        callback();
      }
    };
    var validateIden = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入验证码'));
      } else {
        callback();
      }
    };

    return {
      identifyText:'',
      identifyCode:'',
      identifyCodes:'1234567890',
      ruleForm: {
        name:'',
        pass: '',
      },
      rules: {
        pass: [
          { validator: validatePass, trigger: 'blur' }
        ],
        name:[
          { validator: validateName, trigger: 'blur' }
        ],

      }
    };
  },
  beforeRouteEnter:(to, from, next)=>{
    next(vm => {
      vm.$store.dispatch("setUser",null)
    })
  },
  methods: {
    submitForm(formName) {
      if(this.identifyText!=this.identifyCode){
        if(this.identifyText == '')
        alert('验证码不能为空')
        else
        alert('验证码错误')
      }
      else {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let obj= {};
            obj.user_name = this.ruleForm.name;
            obj.userPwd = this.ruleForm.pass;
            postLogin(obj).then(res=>{
              if(res.status == 0){
                this.pathClick('/home');
                this.$cookies.set("username",res.result.user_name)
                sessionStorage.setItem('username',res.result.user_name)
                this.$store.dispatch("setUser",res.result.user_name)
              }
              else if(res.status == 3){
                this.pathClick('/admin');
                this.$cookies.set("username",res.result.admin_name)
                sessionStorage.setItem('username',res.result.admin_name)
                this.$store.dispatch("setUser",res.result.admin_name)
              }
              else {
                alert("用户名或密码错误")
              }
            })


          } else {
            console.log('error submit!!');
            return false;
          }
        });
      }

    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    pathClick(path){
      this.$router.replace(path)
    },
    randomNum(min, max) {
      return Math.floor(Math.random() * (max - min) + min);
    },
    refreshCode() {
      this.identifyCode = "";
      this.makeCode(this.identifyCodes, 4);
    },
    makeCode(o, l) {
      for (let i = 0; i < l; i++) {
        this.identifyCode += this.identifyCodes[
            this.randomNum(0, this.identifyCodes.length)
            ];
      }
    },
  },
  mounted() {
    this.identifyCode = "";
    this.makeCode(this.identifyCodes, 4);
  },
  components:{
    Identify
  }

}
</script>

<style scoped lang="scss">

.login-bg{
  background-image: url("../../assets/img/login.jpg");
  width: 100vw;
  height: 100vh;
  background-size: 100% 100%;
  z-index: 1;
}


.login{
  text-align: center;
  width: 40vw;
  height: 40vh;
  display: flex;
  margin-top: -70vh;
  margin-left: 8vw;

}

.login-main{
  width: 60vw;
  height: 30vh;
}
.login .el-input{
  width: 25vw;
  margin-left: -5vw;
}


.login .el-form{
  border: 1px solid transparent;
  z-index: 2;
}

.login-item {
  margin-top: 5vh;
}

.login-button{
  margin-left: -6.5vw;
}


</style>
<style lang="scss">
.login-container{
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}
.login{
  .login-button{
    .el-button:nth-child(1){
      background-color: #fffa00;
      border: none;
      color: #5a5a5a;
    }
    .el-button:nth-child(2){
      background-color: #5afa6a;
      border: none;
      color: #747474;
    }
    .el-button:nth-child(3){
      background-color: #cbfd84;
      border: none;
      color: #848484;
    }
    .el-button:nth-child(4){
      background-color:#fdfa0f;
      border: none;
      color: #a1a1a1;
    }
  }
  .el-form-item__label{
    color: #eaeaea;
    font-size: 20px;
    font-weight: 600;
  }
  .el-input__inner{
    background-color: #ecdd91;
  }
  .el-form-item__error{
    font-weight: 800;

  }
  .identify-item{
  }
  .identify{
    width: 30vw;
    display: flex;
   justify-content: center;
    height: 3vh;
    button{
      display: flex;
      margin-top: 0.6vh;
      margin-left: 1vw;

      justify-content: center;
      align-items: center;
      background-color: #dedc85;
      color: #18824e;
    }
  }
  .identify-item{
    padding-left: 1vw;
    .el-input{
      width: 10vw;
      margin-right: 1vw;
    }
  }

    .el-input{
    z-index: 1;
  }
}
</style>