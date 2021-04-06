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

    return {
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
        ]
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
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    pathClick(path){
      this.$router.replace(path)
    }
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
}
</style>