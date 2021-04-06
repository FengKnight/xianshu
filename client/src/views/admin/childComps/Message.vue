<template>
  <div class="admin-message">
    <el-table  ref="tb"
               empty-text="暂无数据"
               :data="messagesForm"
               align="center"
               v-if="is_show"
    >
      <el-table-column align="center"prop="user_name"  label="用户名" width="62">
      </el-table-column>
      <el-table-column align="center"prop="message_id"  label="评论id" width="62">
      </el-table-column>
      <el-table-column align="center" prop="mes_content"  label="评论内容" width="800">
      </el-table-column>
      <el-table-column align="center" prop="createdAt" label="评论时间" width="160">
      </el-table-column>
      <el-table-column v-if="is_return" align="center" prop="re_count" label="回复数量" width="110">
        <template slot-scope="scope">
          {{scope.row.re_count || '暂无'}}
        </template>
      </el-table-column>
      <el-table-column align="center"  label="操作" width="250">
        <template slot-scope="scope" >
          <el-button :disabled="scope.row.re_count == 0" @click="checkReturn(scope.row.message_id)" slot="reference"  size="mini" >查看回复</el-button>

          <el-popconfirm
              @confirm="deleteProfileMessage(scope.row.message_id)"
              title="确定删除该评论吗？">
            <el-button plain slot="reference"  size="mini" >删除</el-button>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <el-table  ref="tb"
               empty-text="暂无数据"
               :data="reMessagesForm"
               align="center"
               v-else="is_show"
    >
      <el-table-column align="center"prop="user_name"  label="用户名" width="62">
      </el-table-column>
      <el-table-column align="center"prop="return_id"  label="回复id" width="62">
      </el-table-column>
      <el-table-column align="center" prop="re_content"  label="评论内容" width="800">
      </el-table-column>
      <el-table-column align="center" prop="createdAt" label="评论时间" width="160">
      </el-table-column>

      <el-table-column align="center"  label="操作" width="250">
        <template slot-scope="scope" >
          <el-button @click="back" plain slot="reference"  size="mini">返回</el-button>

          <el-popconfirm
              @confirm="deleteReMessage(scope.row.return_id)"
              title="确定删除该回复吗？">
            <el-button plain slot="reference"  size="mini" >删除</el-button>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="this.page"
        :page-sizes= "pageArray"
        layout="total, sizes, prev, pager, next, jumper"
        :total="this.count">
    </el-pagination>
  </div>
</template>

<script>
import {deleteMessage, getMessages, getReMessages,deleteReMessage} from "@/network/message";

export default {
  name: "Message",
  data(){
    return {
      page: 1,    //当前页
      prepage: 10, //每页显示的记录条数
      pages: 1,   //总页数
      count: 0,   //总记录数
      pageArray:[2,4,6,8],
      messages:'',
      is_show:true,
      messagesForm:[],
      is_return:false,
      reMessagesForm:[],
      now_message_id:''
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
            this.messagesForm = rs.data
            console.log(this.messagesForm);
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
            this.reMessagesForm = rs.data
          }
        } );
        this.is_return = false
        setTimeout(()=>{
          this.is_return =true

        },300)


      }

    },
    handleSizeChange(val) {
      this.prepage = val
      this.getPage()
    },
    handleCurrentChange(val) {
      console.log(val);
      this.getPage(val)
    },
    deleteProfileMessage(id){
      let params = {
        message_id : id
      }
      deleteMessage(params).then(rs=>{
        console.log(rs);
        this.getPage()
      })
    },

    deleteReMessage(id){
      let params = {
        return_id : id
      }
      deleteReMessage(params).then(rs=>{
        console.log(rs);
        this.getPage()
      })
    },
    checkReturn(id){
      this.is_show = false
      this.now_message_id = id
      this.getPage()
    },
    back(){
      this.is_show = true
      this.getPage()
    }
  },
  created() {
    this.getPage()
  }
}
</script>

<style lang="scss" scoped>

</style>
<style lang="scss">
.admin-message{

}

</style>