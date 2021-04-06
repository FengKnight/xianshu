<template>
    <div class="order-content">
      <home-bar/>
      <div class="btn-align">
        <div  v-if="!isShow">
          <el-button class="btn-active"  @click="contentShow">未完成</el-button>
          <el-button class="btn-no-active" @click="contentShow1">已完成</el-button>
        </div>
        <div  v-else>
          <el-button class="btn-no-active"  @click="contentShow">未完成</el-button>
          <el-button class="btn-active"  @click="contentShow1">已完成</el-button>
        </div>
        <div v-if="!isShow">
          <template>
            <el-table
                :data="order"
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
                <template slot-scope="scope">
                  <div v-if="scope.row.state=='1'">{{scope.row.content.content_cost}}分</div>
                  <div v-else>{{scope.row.content.content_cost}}元</div>

                </template>
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
                  prop="state"
                  label="交易类型"
                  width="80">
                <template slot-scope="scope">
                  <div v-if="scope.row.state=='1'">兑换</div>
                  <div v-else >购买</div>
                </template>
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

              <el-table-column
                  align="center"
                  prop=""
                  label="操作"
                  width="230">
                <template slot-scope="scope">
                  <el-popconfirm
                      title="确定收货吗？"
                      @confirm = "confirmClick(scope.row)"
                  >
                  <el-button slot="reference" size="mini" >确认收货</el-button>
                  </el-popconfirm>

                  <el-popconfirm
                      title="确定取消订单吗？"
                      @confirm = "cancelClick(scope.row)"
                  >
                    <el-button slot="reference" size="mini" >取消订单</el-button>
                  </el-popconfirm>
                </template>

              </el-table-column>
            </el-table>
          </template>
        </div>
        <div v-if="isShow">
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
                <template slot-scope="scope">

                  <div v-if="scope.row.state=='1'">{{scope.row.content.content_cost}}分</div>
                  <div v-else>{{scope.row.content.content_cost}}元</div>
                </template>
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
                  prop="state"
                  label="交易类型"
                  width="80">
                <template slot-scope="scope">
                  <div v-if="scope.row.state=='1'">兑换</div>
                  <div v-else >购买</div>
                </template>
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

            </el-table>
          </template>
        </div>
      </div>
    </div>
</template>

<script>
import HomeBar from "components/content/HomeBar";
import {getOrder,updateContent,deleteOrder} from "network/order";

export default {
  name: "OrderContent",
  components:{
    HomeBar
  },
  created() {
    if(sessionStorage.getItem('username') == 'null'){
      alert('登陆后可查看订单')
      this.$router.push('/login')
    }else {
        getOrder().then(res =>{
        this.order = res.data.filter(item  => item.send == 0)
        console.log(this.order);
        this.finishOrder = res.data.filter(item  => item.send == 1)
      })
    }


  },
  data(){
    return {
      order:[],
      finishOrder:[],
      isShow:false
    }
  },
  methods:{
    sendStatus(s){
      let send = s==0?'待取件':'已收货'
      return send
    },
    dateStatus(s){
      let date = s.substring(0,10)
      return date
    },
    contentShow(){
      this.isShow = false
    },
    contentShow1() {

      this.isShow = true
    },
    confirmClick(row){
      let obj = {}
      obj.order_id = row.order_id
      updateContent(obj).then(res=>{
        getOrder().then(res =>{
          this.order = res.data.filter(item  => item.send == 0)
          this.finishOrder = res.data.filter(item  => item.send == 1)
        })
      })
    },
    cancelClick(row){
      let obj = {}
      obj.books_id = row.content.books_id
      obj.sum = row.content.books_sum
      obj.order_id = row.order_id
      obj.content_id = row.content.content_id
      deleteOrder(obj).then(res =>{
        console.log(res);
        getOrder().then(res =>{
          this.order = res.data.filter(item  => item.send == 0)
          this.finishOrder = res.data.filter(item  => item.send == 1)
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.order-content{
  text-align: center;
  .btn-align{
    width: 80vw;
    margin-left: 10vw;
    background-color: #faf8ec;
  }
  .btn-no-active{
    background-color: #e5e5e5;
    border: none;
  }
  .btn-active{
    background-color: #fce2bb;
    border: none;
  }
}
</style>
<style lang="scss">
.order-content{
  .el-table__header-wrapper{
    background-color: #faf8ec;
  }
  .el-table th, .el-table tr{
    background-color: #faf8ec;
  }
  .el-table__body-wrapper{
    background-color: #faf8ec;
  }
}
</style>