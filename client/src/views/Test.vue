<template>
  <div>
    <HomeBar/>
    <div class="service">

      <div class="service-content">
        <div class="content-header">欢迎来到{{sells_name}}的房间</div>
        <div class="content-main">
          <div class="content-main-left">

            <div v-if="is_show" class="main-text">在线信息</div>
            <div v-else class="main-text">离线信息</div>
            <div v-if="is_show">
              <ul>
              <li v-for="item in messageList">{{item}}</li>
              </ul>
            </div>
            <div v-else>
              <ul>
                <li v-for="item in hismessage">{{item}}</li>
              </ul>
            </div>


          </div>
          <div class="content-main-right"></div>

        </div>
        <div class="content-bottom">
          <el-input type="textarea" maxlength="50" :show-word-limit=true  v-model="message" ></el-input>
          <el-button size="mini" @click="connectMsgToServer">连接客服</el-button>
          <el-button size="mini" @click="sendMsgToServer">发送信息</el-button>
          <el-button v-if="is_show" size="mini" @click="getHistory">获取历史消息</el-button>
          <el-button v-else size="mini" @click="is_show = true">返回</el-button>
        </div>


      </div>


    </div>
  </div>
</template>

<script>
import io from 'socket.io-client';
//const socket = io('http://127.0.0.1:8088');
import HomeBar from "components/content/HomeBar";
export default {
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      message:'',
      messageList:[],
      sells_name:'',
      hismessage: [],
      is_show:true
    }
  },
  components:{
    HomeBar
  },
  methods:{
    /*socket.emit('hello','xxx') 表示，服务端上定义了一个监听'hello'的socket，
      即服务端有代码
      socket.on('hello',(data) => {
        //这是接收到的客户端消息
        console.log(data);
      })
       */
    sendMsgToServer(){
      let obj = {
        sells_name: this.sells_name,
        msg:this.message,
        user_name: sessionStorage.getItem('username')
      }
      this.$socket.emit('talk',obj);
    },

    connectMsgToServer(){
      let obj = {
        user_name: sessionStorage.getItem('username'),
        sells_name: this.sells_name,
        data:this.message
      }
      // this.$socket.emit('hello',document.getElementById("inputArea").value);
      this.$socket.emit('hello',obj);

    },
    getHistory(){
      let obj = {
        sells_name: this.sells_name,
        msg:this.message,
        user_name: sessionStorage.getItem('username')
      }
      this.$socket.emit('history',obj)
      this.is_show =false

    }
  },
  sockets: {
    //查看socket是否渲染成功
    connect() {
      console.log("链接成功");
    },
    disconnect(){
      console.log("断开链接");
    },//检测socket断开链接
    reconnect(){
      console.log("重新链接");
    },
    //客户端接收后台传输的socket事件
    message(data) {
      console.log(data);
      if(data.code == 1){
        this.$notify({
          title: '新消息',
          message: data.msg,
          type: 'warning',
          duration:10000
        });
      }
      else if(data.code == 2){
        this.messageList.push(data.msg)
      }
      else if(data.code == 3){
        let arr = data.msg
        this.hismessage = data.msg
      }
      else {
        this.hismessage = data.msg
      }

      console.log("data", data);//接收的消息
    },

  },
  mounted() {
    this.$socket.emit('connect',1)
  },
  created() {
    this.sells_name = this.$store.getters.sells_name
  }
}
</script>

<style lang="scss" scoped>
.service{
  display: flex;
  justify-content: center;
  align-items: center;
  .service-content{
    margin-top: 8vh;
    width: 1000px;
    height: 700px;
    background-image: url("../assets/img/contact-bcg.jpg");
    background-size: 100% 100%;
    .content-header{
      text-align: center;
      height: 100px;
      background-image: url("../assets/img/contact-header.jpg");
      opacity: 0.9;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #f6f68b;
      font-size: 28px;
      font-weight: bold;
      font-family: KaiTi;
    }
    .content-main{
      height: 400px;
      width: 1000px;
      display: flex;
      .main-text{
        text-align: center;
        margin-bottom: 30px;
      }
    }
    .content-main-left{
      height: 400px;
      width: 800px;
      background-color: white;
      opacity: 0.9;
      overflow-y: scroll;
      z-index: 10;
      ul{
        list-style-type: none;
        li{
          margin-top: 20px;
        }

      }
    }
    .content-main-right{
      height: 400px;
      width: 230px;
      margin-left: -30px;
      z-index: 11;
      background-image: url("../assets/img/一指禅.jpg");
      background-size: 100% 120%;
      opacity: 0.9;
    }
    .content-bottom{
      height: 230px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .el-textarea{
      width: 800px;
      height: 200px;
    }
  }
}
</style>
<style lang="scss">
.service{
  .el-textarea__inner{
    height: 170px;
  }
  .el-textarea .el-input__count{
    bottom: 50px;
  }
}
</style>