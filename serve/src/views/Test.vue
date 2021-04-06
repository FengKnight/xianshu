<template>
  <div class="hello">
  <input id="inputArea" type="text">
  <button @click="sendMsgToServer">发送消息给服务端</button>
  </div>
</template>

<script>
import io from 'socket.io-client';
// const socket = io('http://127.0.0.1:8000');
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
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
      this.$socket.emit('hello',document.getElementById("inputArea").value);
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
      this.$notify({
        title: '新消息',
        message: data,
        type: 'warning',
        duration:10000
      });
      console.log("data", data);//接收的消息
    }
  },
  created() {
    this.$socket.on('connection',(data) =>{
      console.log(data)
    });
  }
}
</script>

<style scoped>

</style>