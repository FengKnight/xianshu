<template>
  <div class="admin-main">
    <el-main v-if="this.$store.getters.adminShow == 'home'">
      <Home/>
    </el-main>

    <el-main v-else-if="this.$store.getters.adminShow == 'user'" >
      <user-page  ></user-page>
    </el-main>


    <el-main v-else-if="this.$store.getters.adminShow == 'book'"  >
      <div class="block">
        <span class="demonstration">单选可搜索</span>
        <el-cascader
            placeholder="试试搜索：玄幻"
            v-model="small_sort"
            :options="getCascader()"
            filterable></el-cascader>
        <el-button class="add-book" @click="addClick" size="medium" plain>添加书籍</el-button>
      </div>
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
        <el-table-column align="center" prop="picture" label="图片" width="80">
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
        <el-table-column align="center" prop="is_check" label="审核情况" width="80">
          <template slot-scope="scope">
            <div v-if="scope.row.is_check == 0">待审核</div>
            <div v-else-if="scope.row.is_check == 1">通过</div>
            <div v-else>不通过</div>
          </template>
        </el-table-column>
        <el-table-column align="center"  label="操作" width="150">
          <template slot-scope="scope" >
            <el-button plain size="mini" @click="edit(scope)">修改</el-button>
            <el-button plain  size="mini" @click="deleteClick(scope.$index)">删除</el-button>
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
    </el-main>
    <el-main v-else-if="this.$store.getters.adminShow == 'add'" >
     <Add :bookForm="bookForm" :big-sort="bigSort" :small-sort="smallSort"></Add>
    </el-main>
    <el-main v-else-if="this.$store.getters.adminShow == 'edit'">
      <Add :bookForm="edits" :big-sort="bigSort" :small-sort="smallSort"></Add>
    </el-main>

    <el-main v-else-if="this.$store.getters.adminShow == 'order'">
      <order></order>
    </el-main>

    <el-main v-else-if="this.$store.getters.adminShow == 'message'">
      <message/>
    </el-main>

    <el-main v-else-if="this.$store.getters.adminShow == 'check'">
      <check-books/>
    </el-main>

    <el-main v-else-if="this.$store.getters.adminShow == 'banner'">
      <Banner/>
    </el-main>

    <el-main v-else-if="this.$store.getters.adminShow == 'advert'">
      <Advert/>
    </el-main>

    <el-main v-else-if="this.$store.getters.adminShow == 'activity'">
      <Activity/>
    </el-main>

  </div>
</template>

<script>
import {getBigSort,getSmallSort,deleteBook,getBookPage} from "network/admin";
import Add from "./Add"
import Edit from "./Edit";
import UserPage from "views/admin/childComps/UserPage";
import Order from "@/views/admin/childComps/Order";
import Message from "@/views/admin/childComps/Message";
import CheckBooks from "@/views/admin/childComps/CheckBooks";
import Home from "@/views/admin/childComps/Home";
import Banner from "@/views/admin/childComps/Banner";
import Advert from "@/views/admin/childComps/Advert";
import Activity from "@/views/admin/childComps/Activity";
export default {
  name: "AdminMain",
  created() {
    getBigSort().then(res=>{
      this.bigSort = res
    })
    getSmallSort().then(res=>{
      this.smallSort = res
    })
    this.getPage()

  },

  data() {
    return {
      books:[],
      pageArray:[2,4,6,8],
      bookForm: {
        books_name: '',
        books_id: '',
        books_author: '',
        press:'',
        intro: '',
        price: '',
        condition: '',
        secprice: '',
        picture: '',
        user_name:'',
        books_sums:'',

      },
      bigSort:[], //书籍父类信息
      smallSort:[], //书籍子类信息
      rowBook:{}, //书籍行信息
      checkedDetail: [],
      edits:[],
      rowIndex:0,
      page: 1,    //当前页
      prepage: 2, //每页显示的记录条数
      pages: 1,   //总页数
      count: 0,   //总记录数
      contents: [],
      small_sort:'',
      bookId:1001
    }
  },

  methods:{
    addClick(){
      this.$store.commit('adminShowSortStatus','add')
    },
    //获取当前行信息
    getDetails(row){
      this.rowBook = row
    },
    deleteClick(index){
      this.rowIndex = index
      if(confirm('是否确定删除')){
        if(this.rowBook.books_id){
          deleteBook(this.rowBook).then(res=>{
            this.getPage()
            //this.books.splice(this.rowIndex,1)
          })
        }
      }
    },
    //跳转页面至编辑页
    edit(s){
      this.edits = s.row
      this.$store.commit('adminShowSortStatus','edit')
    },

    //获得分页数据
    getPage(p) {
      if (p == this.page) return;
      this.page = p || this.page;
      let params = {
        page:this.page,
        prepage:this.prepage,
        bookId:this.bookId
      }
      getBookPage(params).then( rs => {
        if (!rs.code) {
          this.count = rs.count;
          this.pages = Math.ceil(this.count / this.prepage);
          this.contents = rs.data;
          console.log(rs);
          this.books = this.contents.filter(item => item.small_sort_id == this.bookId)
        }
      } );
    },

    //分页方法
    handleSizeChange(val) {
      this.prepage = val
      this.getPage()
    },
    handleCurrentChange(val) {
      this.getPage(val)
    },

    //获取书籍分类
    getCascader(){
      this.options = this.bigSort.map(item =>{
        return {
          value:  item.big_sort_name,
          label: item.big_sort_name,
          children:
              this.smallSort.filter(item2 =>{
                return item2.big_sort_id == item.big_sort_id
              }).map(item3 =>{
                return {
                  value:  item3.small_sort_id,
                  label:item3.small_sort_name
                }
              })
        }
      })
      return this.options
    }
  },

  components:{
    Add,
    Edit,
    UserPage,
    Order,
    Message,
    CheckBooks,
    Home,
    Banner,
    Advert,
    Activity
  },
  watch:{
    small_sort(val, oldVal){
      this.bookId = val[1]
      this.books = this.contents.filter(item => item.small_sort_id == val[1])
      this.page = 1
      this.getPage()
      console.log(this.contents);
    }
  },

}
</script>

<style lang="scss" scoped>
.admin-main{
  height: 93vh;
  .el-pagination{
    margin-top: 3vh;

  }

}
.demonstration{
  margin-right: 1vw;
}
.admin-main{
  text-align: center;
}

.add-book{
  margin-left: 3vw;
}
</style>
<style lang="scss">
.admin-main{

}

</style>