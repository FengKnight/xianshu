<template>
  <div class="register-container">
    <div class="register-bg"></div>
    <div class="register">
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="账号:" prop="name" class="register-item">
          <el-input type="text" v-model="ruleForm.name" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item class="register-pass" label="密码:" prop="pass">
          <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
          <label>密码等级：{{rank}}</label>

        </el-form-item>

        <el-form-item label="确认密码:" prop="checkPass">
          <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="邮箱:" prop="email" :rules="[
      { required: true, message: '请输入邮箱地址', trigger: 'blur' },
      { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
      ]">
          <el-input type="email" v-model="ruleForm.email" autocomplete="off"></el-input>
        </el-form-item>


        <el-form-item class="register-button">
          <el-button type="primary" @click="submitForm('ruleForm')">注册</el-button>
          <el-button @click="pathClick('/login')">登录</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
          <el-button @click="pathClick('/home')">返回首页</el-button>

        </el-form-item>

      </el-form>
    </div>
  </div>

</template>

<script>

import {postRegister} from "network/register";
export default {
name: "Register",

    data() {
      var validateName = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入用户名'));
        } else {
          callback();
        }
      };
      var checkPass = (rule, value, callback) => {
        const passReg1 = /^[0-9]{6,16}$|^[A-Z]{6,16}$|^[a-z]{6,16}$|^[\W_!@#$%^&*`~()-+=]{6,16}$/;
        const passReg2 = /^(?!\d+$)(?![a-zA-Z]+$)[\da-zA-Z]{6,16}$|^(?!\d+$)(?![\x00-\xff]+$)[\d\x00-\xff]{6,16}$|^(?!a-zA-Z+$)(?![\x00-\xff]+$)[a-zA-Z\x00-\xff]{6,16}$/;
        const passReg3 = /^(?=.*[a-zA-Z])(?=.*[\W_!@#$%^&*`~()-+=])(?=.*\d)[^]{6,16}$|^(?=.*[a-zA-Z])(?=.*[\W_!@#$%^&*`~()-+=])[^]{6,16}$|^(?=.*\d)(?=.*[\W_!@#$%^&*`~()-+=])[^]{6,16}$|^(?=.*[a-zA-Z])(?=.*\d)[^]{10,16}$/;
        if (!value) {
          return callback(new Error('邮政编码不能为空'))
        }
        setTimeout(() => {

          if (passReg1.test(value)) {
            this.rank = '低'
            callback()
          }
          else if(passReg2.test(value)){
            this.rank = '中'
            callback()
          }
          else if(passReg3.test(value)){
            this.rank = '高'
            callback()
          }else {
            callback(new Error('长度必须在6-16之间'))
          }
        }, 100)
      }
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm.pass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };

      return {
        ruleForm: {
          name:'',
          pass: '',
          checkPass:'',
          email:''
        },
        rank:'',
        rules: {
          name:[{
            validator: validateName, trigger: 'blur'
          }],
          pass: [
            { validator: checkPass, trigger: 'blur' }
          ],
          checkPass: [
            { validator: validatePass2, trigger: 'blur' }
          ],
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
            let obj= {};
            obj.user_name = this.ruleForm.name;
            obj.userPwd = this.ruleForm.pass;
            obj.u_email = this.ruleForm.email;
            postRegister(obj).then(res=>{
              if(res.status == 0){
                alert("注册成功")
                sessionStorage.setItem('username',res.result.user_name)
                this.$store.dispatch("setUser",res.result.user_name)
                this.pathClick('/home');

              }
              else if(res.status == 2){
                alert("用户名已存在")
              }
              else {
                alert("用户名或密码错误")
              }
            })
          } else {
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

<style scoped>
.register-bg{
  background-image: url("../../assets/img/login.jpg");
  width: 100vw;
  height: 100vh;
  background-size: 100% 100%;
  z-index: 1;
}
.register-pass{
  width: 41.5vw;
}
.register{
  text-align: center;
  width: 40vw;
  height: 40vh;
  position: absolute;
  top: 50%;
  left: 25%;
  transform: translate(-50%,-70%);
}

.register .el-input{
  width: 25vw;
  margin-left: -5vw;
}


.register .el-form{
  height: 50vh;
  margin-top: 6vh;
  border: 1px solid transparent;
}

.register .el-form-item{
  margin-left: 2.8vw;
}
.register-item{
  margin-top: 1vh;
}
.register-button{
  margin-left: -4.5vw!important;
}




</style>
<style lang="scss">
.register-container{
  .register-button{
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