<template>
  <div class="check-books">
    <el-table  ref="tb"
               type="selection"
               :data="books"
               align="center">
      <el-table-column type="selection" width="60" align="center" />
      <el-table-column align="center"prop="books_id"  label="书籍id" width="92">
      </el-table-column>
      <el-table-column align="center" prop="books_name"  label="书籍名称" width="100">
      </el-table-column>
      <el-table-column align="center" prop="books_author" label="作者" width="60">
      </el-table-column>
      <el-table-column align="center" prop="press" label="出版社" width="90">
      </el-table-column>
      <el-table-column align="center" prop="intro" label="简介" width="460">
      </el-table-column>
      <el-table-column align="center" prop="picture" label="图片" width="120">
        <template slot-scope="scope">
          <img class="book-img" :src="imgUrl(scope.row.picture)">
        </template>
      </el-table-column>
      <el-table-column align="center" prop="price" label="价格" width="80">
      </el-table-column>
      <el-table-column align="center" prop="secprice" label="二手价" width="80">
      </el-table-column>
      <el-table-column align="center" prop="condition" label="新旧程度" width="80">
      </el-table-column>
      <el-table-column align="center" prop="user_name" label="卖家名称" width="80">
      </el-table-column>
      <el-table-column align="center" prop="books_sums" label="数量" width="80">
      </el-table-column>
      <el-table-column align="center" prop="is_exchange" label="交易类型" width="80">
        <template slot-scope="scope">
          <div v-if="scope.row.is_exchange == 0">售卖</div>
          <div v-else>置换</div>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="is_lack" label="是否缺页" width="80">
        <template slot-scope="scope">
          <div v-if="scope.row.is_lack == 0">否</div>
          <div v-else>是</div>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="is_sells" label="是否多次交易" width="80">
        <template slot-scope="scope">
          <div v-if="scope.row.is_sells == 0">否</div>
          <div v-else>是</div>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="is_taste" label="是否存在异味" width="80">
        <template slot-scope="scope">
          <div v-if="scope.row.is_taste == 0">否</div>
          <div v-else>是</div>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="is_write" label="是否涂改" width="80">
        <template slot-scope="scope">
          <div v-if="scope.row.is_taste == 0">否</div>
          <div v-else>是</div>
        </template>
      </el-table-column>
      <el-table-column align="center"  label="审核" width="150">
        <template slot-scope="scope" >
          <el-popconfirm
              @confirm="check_pass(scope)"
              title="确定审核通过吗？">
            <el-button class="pass-btn" plain slot="reference"  size="mini" >通过</el-button>
          </el-popconfirm>
          <el-popconfirm
              @confirm="check_no(scope)"
              title="确定审核不通过吗？">
            <el-button class="unpass-btn" plain slot="reference"  size="mini" >不通过</el-button>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <div class="block">
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

</template>

<script>
import {getCheckBookPage,postCheckBookUpdate} from "@/network/admin";

export default {
name: "CheckBooks",
  data(){
    return {
      books:[],
      pageArray:[2,4,6,8],
      page: 1,    //当前页
      prepage: 2, //每页显示的记录条数
      pages: 1,   //总页数
      count: 0,   //总记录数
    }
  },
  created() {
    this.getPage()

  },
  methods:{
    imgUrl(u){
      u = "http://localhost:9000/img/" + u
      return u
    },
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
      getCheckBookPage(params).then( rs => {
        if (!rs.code) {
          this.count = rs.count;
          this.pages = Math.ceil(this.count / this.prepage);
          this.contents = rs.data;
          console.log(rs.data);
          this.books = this.contents
        }
      } );
    },
    check_pass(r){
      let params = {
        books_id : r.row.books_id,
        is_check : 1,
        is_exchange : 1,
        username:r.row.user_name,
        secprice:r.row.secprice
      }
      postCheckBookUpdate(params).then(res =>{
        console.log(res);
        this.getPage()
      })
    },
    check_no(r){
      let params = {
        books_id : r.row.books_id,
        is_check:2
      }
      postCheckBookUpdate(params).then(res =>{
        console.log(res);
        this.getPage()
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.check-books{
  .book-img{
    width: 100px;
    height: 100px;
  }
  .pass-btn{
    background-color: #fceebe;
    color: #000000;
  }
  .unpass-btn{
    background-color: #ce3434;
    color: #ffffff;
  }
}
</style>