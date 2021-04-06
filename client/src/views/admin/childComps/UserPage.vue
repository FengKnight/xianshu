<template>
  <div class="user-content">
        <el-table  ref="tb"
                   empty-text="暂无数据"
                   :data="userForm"
                   align="center">
          <el-table-column align="center"prop="user_name"  label="用户名" width="62">
          </el-table-column>
          <el-table-column align="center" prop="user_id"  label="用户id" width="100">
          </el-table-column>
          <el-table-column align="center" prop="u_email" label="邮箱" width="160">
          </el-table-column>
          <el-table-column align="center" prop="street_name" label="地址" width="110">
            <template slot-scope="{row}">
              {{row.street_name || '暂无'}}
            </template>
          </el-table-column>
          <el-table-column align="center" prop="post_code" label="邮编" width="140">
            <template slot-scope="{row}">
              {{row.street_name || '暂无'}}
            </template>
          </el-table-column>
          <el-table-column align="center" prop="tel" label="电话" width="80">
            <template slot-scope="{row}">
              {{row.street_name || '暂无'}}
            </template>
          </el-table-column>
          <el-table-column align="center" prop="is_default" label="是否为商家" width="120">
            <template slot-scope="{row}">
              {{row.is_default == 0 ?'否':'是'}}
            </template>
          </el-table-column>
          <el-table-column align="center" prop="credits" label="积分" width="80">
          </el-table-column>
          <el-table-column align="center"  label="操作" width="150">
            <template slot-scope="scope" >
              <el-popconfirm
                  @confirm="deleteUser(scope)"
                  title="确定删除该用户吗？">
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
import {getUserPage,postDeleteUser} from "network/admin";

export default {
  name: "userPage",
  data(){
    return {
      page: 1,    //当前页
      prepage: 2, //每页显示的记录条数
      pages: 1,   //总页数
      count: 0,   //总记录数
      userForm:[],
      pageArray:[2,4,6,8],
    }
  },
  created() {
    this.getPage()
  },
  methods:{
    //分页方法
    handleSizeChange(val) {
      this.prepage = val
      this.getPage()
    },
    handleCurrentChange(val) {
      this.getPage(val)
    },
    //获得分页数据
    getPage(p) {
      if (p == this.page) return;
      this.page = p || this.page;
      let params = {
        page:this.page,
        prepage:this.prepage,
      }
      getUserPage(params).then( rs => {
        if (!rs.code) {
          this.count = rs.count;
          this.pages = Math.ceil(this.count / this.prepage);
          this.contents = rs.data;
          this.userForm = rs.data
        }
      } )
    },
    deleteUser(s){
      console.log(s);
      let obj = {}
      obj.user_name = s.row.user_name
      postDeleteUser(obj).then(res=>{

        this.getPage()
        //this.books.splice(this.rowIndex,1)
      })

    }
  }

}
</script>

<style lang="scss" scoped>
.user-content{
  height: 88.4vh;
  .el-pagination{
    margin-top: 3vh;

  }

}
</style>