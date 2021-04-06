<template>
  <div class="order">
    <div>
      <template>
        <el-table
            :data="finishOrder"
            style="width: 100%"
            align="center"
            :default-sort = "{prop: 'date', order: 'descending'}"
        >
          <el-table-column
              align="center"
              prop="order_id"
              label="订单号"
              width="90">

          </el-table-column>
          <el-table-column
              align="center"
              prop="date"
              label="日期"
              sortable
              width="180">
            <template slot-scope="scope">
              <span>{{dateStatus(scope.row.createdAt)}}</span>
            </template>
          </el-table-column>
          <el-table-column
              align="center"
              prop="address"
              width="110"
              label="收货地址">
          </el-table-column>
          <el-table-column
              align="center"
              prop="consignee"
              label="收货人"
              width="80">
          </el-table-column>
          <el-table-column
              align="center"
              prop="content.content_cost"
              label="总花费"
              width="80">
          </el-table-column>
          <el-table-column
              align="center"
              prop="content.books_name"
              label="书名"
              width="80">
          </el-table-column>
          <el-table-column
              align="center"
              prop="content.books_price"
              label="单价"
              width="80">
          </el-table-column>
          <el-table-column
              align="center"
              prop=""
              label="物流情况"
              width="80">
            <template slot-scope="scope">
              <span>{{sendStatus(scope.row.send)}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center"  label="操作" width="150">
            <template slot-scope="scope" >
              <el-popconfirm
                  @confirm="deleteOrder(scope)"
                  title="确定删除该订单吗？">
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
      </template>
    </div>
  </div>
</template>

<script>
import {getAllOrder,deleteOrders} from "@/network/order";

export default {
  name: "Order",
  data(){
    return {
      page: 1,    //当前页
      prepage: 2, //每页显示的记录条数
      pages: 1,   //总页数
      count: 0,   //总记录数
      pageArray:[2,4,6,8],
      finishOrder:[]
    }
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
      getAllOrder(params).then( rs => {
        console.log(rs);
        this.count = rs.data.count
        this.finishOrder = rs.data.rows
      } )
    },

    dateStatus(s){
      let date = s.substring(0,10)
      return date
    },
    sendStatus(s){
      let send = s==0?'待取件':'已收货'
      return send
    },
    deleteOrder(s){
      console.log(s);
      let params = {
        order_id:s.row.order_id
      }
      deleteOrders(params).then(res=>{
        console.log(res);
        this.getPage()
      })

    }
  },
  created() {
    this.getPage()
  }
}
</script>

<style lang="scss" scoped>
.order{
  .el-pagination{
    margin-top: 3vh;
  }
}
</style>