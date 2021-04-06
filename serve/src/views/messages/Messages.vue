<template>
  <div class="message">
    <home-bar/>

    <el-header>
      <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal">
        <el-menu-item index="1" @click="pathClick('./')">首页</el-menu-item>
        <el-menu-item index="2" @click="pathClick('./category')">书库</el-menu-item>
        <el-menu-item index="3" @click="pathClick('./exchange')">换书区</el-menu-item>
        <el-menu-item index="4" @click="pathClick('./messages')">交流讨论</el-menu-item>
      </el-menu>
    </el-header>

    <div v-if="is_show">
      <div class="messages" v-for="item in messages" :key="item.createdAt">
        <div class="messages-contant">
          <div class="contant-name">{{item.user_name}}<label>发表了评论</label></div>
          <div class="contant">{{item.mes_content}}</div>
          <div class="contant-return" v-if="is_return"><a @click="returnMessage(item.message_id)">回复({{item.re_count}})</a>
            <i  @click="deleteProfileMessage(item.message_id)" v-if="username == item.user_name" class="el-icon-close delete-prodile-icon"></i>
          </div>
          <div class="contant-time">{{item.createdAt.substring(0,10)}}-{{item.createdAt.substring(11,16)}}</div>
        </div>
      </div>
      <div class="page">
        <el-pagination
            @current-change="handleCurrentChange"
            :current-page="this.page"
            layout="total, prev, pager, next, jumper"
            :total="this.count">
        </el-pagination>
      </div>

      <div class="bottom">
        <div class="send">
          <div class="send-name">尊敬的{{ username }}，在此可发表你的想法。</div>

          <el-input type="textarea" maxlength="100" :show-word-limit="true" v-model="content" placeholder="请发表你的评论"></el-input>
          <el-button class="summit" @click="summit">发表</el-button>
        </div>
      </div>
    </div>
    <div v-else>
      <div class="messages" v-for="item in reMessage" :key="item.createdAt">
        <div class="messages-contant">
          <div class="contant-name">楼主：{{item.user_name}}<label>发表了评论</label> <a class="return-message" @click="is_show =true"><i class="el-icon-back"></i></a></div>
          <div class="contant">{{item.mes_content}}</div>
          <div class="contant-time">{{item.createdAt.substring(0,10)}}-{{item.createdAt.substring(11,16)}}</div>
        </div>
      </div>
      <div class="re-message-content">
        <div class="re-message-main">
          <div class="messages" v-for="(item,index) in reMessages" :key="item.createdAt">
            <div class="messages-contant">
              <div class="contant-name">{{index+1}}楼：{{item.user_name}}<label>回复</label>

                  <i  @click="deleteMessage(item.return_id)" v-if="username == item.user_name" class="el-icon-close delete-icon"></i>

                </div>
              <div class="contant">{{item.re_content}}</div>
              <div class="contant-time">{{item.createdAt.substring(0,10)}}-{{item.createdAt.substring(11,16)}}</div>
            </div>
          </div>
        </div>
      </div>

      <div class="bottom">
        <div class="send">
          <div class="send-name">尊敬的{{ username }}，在此回复楼主。</div>

          <el-input type="textarea" maxlength="100" :show-word-limit="true" v-model="reContent" placeholder="请发表你的评论"></el-input>
          <el-button class="summit" @click="reSummit">回复</el-button>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import HomeBar from "components/content/HomeBar";
import {getMessages, postAdd, postReAdd, getReMessages, deleteReMessage, deleteMessage} from "@/network/message";

export default {
  data(){
    return {
      activeIndex:'4',
      content:'',
      page: 1,    //当前页
      prepage: 10, //每页显示的记录条数
      pages: 1,   //总页数
      count: 0,   //总记录数
      messages:'',
      messageKey:'0',
      username:'',
      is_show:true,
      reMessage:'',
      reMessages:'',
      is_return:false,
      reContent:'',
      now_message_id:''
    }
  },
  methods:{
    summit(){
      let params = {
        content:this.content,
        prepage:this.prepage
      }
      postAdd(params).then(rs=>{
        console.log(rs);
        this.getPage()
        this.messageKey += 1

      })
    },
    reSummit(){
      let params = {
        message_id:this.now_message_id,
        content:this.reContent,
      }
      console.log(params);
      postReAdd(params).then(rs=>{
        console.log(rs);
        this.getPage()
        this.messageKey += 1
      })
    },
    //获取分页
    getPage(p) {
      if (p == this.page) return;
      this.page = p || this.page;
      let params = {
        page:this.page,
        prepage:this.prepage,
      }
      if(this.is_show){
        getMessages(params).then( rs => {
          if (!rs.code) {
            this.count = rs.count;
            this.pages = Math.ceil(this.count / this.prepage);

            for(let i=0;i< rs.data.length;i++){
              let params = {
                page:this.page,
                prepage:this.prepage,
                id:rs.data[i].message_id
              }

              getReMessages(params).then( res => {
                rs.data[i].re_count = res.count
              })
            }
            console.log(rs);
            this.messages = rs.data
            console.log(this.messages);
          }
        } );
        this.is_return = false
        setTimeout(()=>{
          this.is_return =true
        },300)
      }else {
        let params = {
          page:this.page,
          prepage:this.prepage,
          id:this.now_message_id
        }
        getReMessages(params).then( rs => {
          if (!rs.code) {
            this.count = rs.count;
            this.pages = Math.ceil(this.count / this.prepage);
            console.log(rs);
            this.reMessages = rs.data
          }
        } );
        this.is_return = false
        setTimeout(()=>{
          this.is_return =true
        },300)
      }

    },

    handleCurrentChange(val) {
      console.log(val);
      this.getPage(val)
    },
    //路径跳转方法
    pathClick(path){
      this.$router.replace(path)
    },

    returnMessage(id){
      console.log(id);
      this.is_show = false
      this.now_message_id = id
      this.reMessage = this.messages.filter(item =>item.message_id == id )
      this.getPage()

    },
    deleteMessage(id){
      console.log(id);
      let params = {
        return_id:id
      }
      deleteReMessage(params).then(res=>{
        console.log(res);
        this.getPage()
      })
    },
    deleteProfileMessage(id){
      let params = {
        message_id : id
      }
      deleteMessage(params).then(rs=>{
        console.log(rs);
        this.getPage()
      })
    }
  },
  created() {

    this.username = sessionStorage.getItem('username')
    this.getPage()
    this.is_show = false
    setTimeout(()=>{
      this.is_show = true
      this.is_return =true
    },300)

    if(this.$store.getters.message_id!=''){
      setTimeout(()=>{
        this.returnMessage(this.$store.getters.message_id.message_id)

      },500)

    }

  },
  components:{
    HomeBar
  },


}
</script>

<style lang="scss" scoped>
.message{


  ::-moz-placeholder{
    color: #535252 !important;
  }
  .el-header{
    position: relative;
    width: 70vw;
    left: 14vw;
    z-index: 100;
    margin-top: -5vh;
  }
  .messages{
    display: flex;
    justify-content: center;
    align-items: center;
    .messages-contant{
      width: 70vw;
      height: 20vh;
      margin-top: 1vh;
      background-image: url("../../assets/img/pinglun-bcg.png");
      background-size: 100% 100%;
      background-repeat: no-repeat;
      .contant-name{
        margin-left: 5vw;
        margin-top: 2.8vh;
        color: #89304c;
        label{
          color: black;
        }
      }
      .contant{
        display: flex;
        align-items: center;
        width: 60vw;
        height: 9.3vh;
        margin-left: 5.5vw;
        color: black;
      }
      .contant-return{
        display: flex;
        justify-content: right;
        width: 64vw;
        text-align:right ;
        margin-top: -0.5vh;
        color: black;
      }
      .contant-time{
        color: black;

        width: 30vw;
        display: flex;
        justify-content: right;
        width: 65vw;
        text-align:right ;
        font-size: 13px;
      }
    }
  }
  .page{
    display: flex;
    justify-content: center;
    margin-top: 2vh;
  }
  .bottom{
    display: flex;
    justify-content: center;
    .send{
      width: 70vw;
      align-items: center;
      background-image: url("../../assets/img/pinglun-bcg.png");
      background-size: 100% 100%;
      background-repeat: no-repeat;
      margin-bottom: 3vh;

      .send-name{
        margin-top: 4vh;
        margin-left: 5vw;
        color: black;

      }
    }
  }
  .delete-icon{
    display: flex;
    justify-content: right;
    margin-top: -1.6vh;
    margin-right: 5vw;

  }

  .delete-prodile-icon{
    display: flex;
    justify-content: right;
    margin-top: -9.6vh;
  }
  .return-message{
    display: flex;
    margin-left: 58vw;
    margin-top: -1.6vh;
  }


}
</style>
<style lang="scss">
.message{
  .el-textarea{
    width: 50vw;
    height: 18vh;
    margin-left: 8vw;
  }
  .el-textarea__inner{
    height: 13vh;
    background-color: transparent;
    color: #361f1f;
    border: none;
  }
  .summit{
    margin-left: 1.5vw;
    position: relative;
    font-size: 15px;
    top: -10vh;
    left: 2vw;
    color: #3f4447;
    background-color: transparent;
    font-weight: 500;
    border: none;
  }
  .el-textarea .el-input__count{
    color: black;
    bottom:8vh;
    background-color: transparent;

  }

}
</style>