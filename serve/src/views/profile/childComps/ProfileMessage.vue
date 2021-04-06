<template>
  <div class="profile-message">
    <div>
      <div class="messages" v-for="item in messages" :key="item.createdAt"  @click="goMessageDetail(item)">
        <div class="messages-contant">
          <div class="contant-name">{{item.user_name}}<label>发表了评论</label></div>
          <div class="contant">{{item.mes_content}}</div>
          <div v-if="is_return" class="contant-return">回复({{item.re_count}})</div>
          <div class="contant-time">{{item.createdAt.substring(0,10)}}-{{item.createdAt.substring(11,16)}}</div>
        </div>
      </div>
      <div class="book_page">
        <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="this.page"
            :page-sizes= "pageArray"
            layout="total, sizes, prev, pager, next, jumper"
            :total="this.count">
        </el-pagination>
      </div>
    </div>

  </div>
</template>

<script>
import {getProfileMessages, getReMessages} from "@/network/message";

export default {
name: "ProfileMessage",
  data(){
    return {
      messages:[],
      page: 1,    //当前页
      prepage: 2, //每页显示的记录条数
      pageArray:[2,4],
      pages: 1,   //总页数
      count: 0,   //总记录数
      username:'',
      is_show:true,
      reMessage:'',
      reMessages:'',
      is_return:false
    }
  },
  methods:{
    //获取分页
    getPage(p) {
      if (p == this.page) return;
      this.page = p || this.page;
      let params = {
        page:this.page,
        prepage:this.prepage,
      }
      if(this.is_show){
        getProfileMessages(params).then( rs => {
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
            setTimeout(()=>{
              this.is_return = true

            },300)
          }
        } );
      ;
      }

    },
    handleSizeChange(val) {
      this.prepage = val
      this.getPage()
    },
    handleCurrentChange(val) {
      this.is_return = false
      console.log(this.pages);
      this.getPage(val)
    },

    goMessageDetail(i){
      this.$store.commit('message_idStatus',i)
      console.log(this.$store.state.message_id);
      this.$router.push('messages')
    },

  },
  created() {
    this.getPage()
    console.log(this.pages);
  }


}
</script>

<style lang="scss" scoped>
.profile-message{
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
      background-image: url("../../../assets/img/pinglun-bcg.png");
      background-size: 100% 100%;
      background-repeat: no-repeat;
      .contant-name{
        margin-left: 5vw;
        margin-top: 2.8vh;
        color: #89304c;
        label{
          color: black;
        }
        .delete-message{
          text-align: right;
          font-size: 12px;
          color: #cb0404;
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
        width: 62vw;
        text-align:right ;
        margin-top: -0.5vh;
        color: black;
      }
      .contant-time{
        color: black;

        width: 30vw;
        display: flex;
        justify-content: right;
        width: 63vw;
        text-align:right ;
        font-size: 13px;
      }
    }
  }
  .book_page{
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
      background-image: url("../../../assets/img/pinglun-bcg.png");
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
  .return-message{
    display: flex;
    margin-left: 58vw;
    margin-top: -1.6vh;
  }
}
</style>