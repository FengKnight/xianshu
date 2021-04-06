<template>
  <div class="hello">
    商家
    <div>
      历史信息
    </div>

    <ul>
      <li v-for="item in messageList[0]">{{item}}</li>
    </ul>
   <lable> 当前信息</lable>
    <ul>
      <li v-for="item in messageList">{{item}}</li>
    </ul>
  <input id="inputArea" v-model="message" type="text">
  <button @click="connectMsgToServer">连接</button>
  <button @click="sendMsgToServer">发送信息</button>

  </div>
</template>

<script>
import io from 'socket.io-client';
//const socket = io('http://127.0.0.1:8088');
export default {
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      message:'',
      messageList:[],
      hismessage:[]
    }
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
        sells_name: 'laozi',
        msg:this.message,
        user_name: sessionStorage.getItem('username')
      }
      this.$socket.emit('talk',obj);
    },

    connectMsgToServer(){
      let obj = {
        user_name: sessionStorage.getItem('username'),
        sells_name: 'laozi',
        data:this.message
      }
      // this.$socket.emit('hello',document.getElementById("inputArea").value);
      this.$socket.emit('hello',obj);

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

      this.messageList.push(data)


      this.$notify({
        title: '新消息',
        message: this.messageList,
        type: 'warning',
        duration:10000
      });
      console.log("data", data);//接收的消息
    },

  },
  mounted() {
    this.$socket.emit('connect',1)
  },
  created() {

  }
}
</script>

<style scoped>

</style>