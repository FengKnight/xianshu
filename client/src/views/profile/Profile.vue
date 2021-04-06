<template>
  <div class="profile">
    <home-bar/>
    <el-header>
      <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal">
        <el-menu-item index="1" @click="pathClick('./')">首页</el-menu-item>
        <el-menu-item index="2" @click="pathClick('./category')">书库</el-menu-item>
        <el-menu-item index="3" @click="pathClick('./exchange')">换书区</el-menu-item>
        <el-menu-item index="4" @click="pathClick('./messages')">交流讨论</el-menu-item>
        <el-menu-item index="5">个人中心</el-menu-item>
      </el-menu>
    </el-header>

    <el-aside width="20vw">
    <div @click="change('profile')">个人资料</div>
    <div @click="pathClick('orderContent')">订单</div>
    <div @click="change('message')">消息</div>
    <div v-if="user.is_default == 0" @click="change('beMerchant')" >未成为商家</div>
    <div v-if="user.is_default == 1">
      <div @click="change('upload')">书籍上传</div>
      <div @click="change('mine')">我的商品</div>
      <div @click="connectUser('/test')">客服</div>
    </div>

    </el-aside>

    <el-main class="profile-main" v-if="profilePath == 'profile'">
      <div>用户名:{{user.user_name}}</div>
      <div>邮箱:{{user.u_email}}</div>
      <div>积分:{{user.credits}}</div>

      <div v-if="!user.street_name">其他信息：未完善
        <div>
          <el-button @click="updateProfile" plain size="mini">完善个人信息</el-button>
          <el-button @click="updatePassword" plain size="mini">修改密码</el-button>
        </div>
      </div>

      <div v-else>
        <div>邮编：{{user.post_code}}</div>
        <div>地址：{{user.street_name}}</div>
        <div>电话：{{user.tel}}</div>
        <div>
          <el-button @click="updateProfile" plain size="mini">完善个人信息</el-button>
          <el-button @click="updatePassword" plain size="mini">修改密码</el-button>
        </div>
      </div>


    </el-main>
    <el-main class="updata-profile" v-if="profilePath == 'updateProfile'">
      <el-form :model="userForm" status-icon :rules="rules" ref="userForm" label-width="100px" >
        <el-form-item label="电话" prop="tel">
          <el-input type="text" v-model="userForm.tel" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="邮编" prop="post_code">
          <el-input type="text" v-model="userForm.post_code" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="地址" prop="street_name">
          <el-input type="text"  placeholder="例如：黄槐楼Y2624" v-model="userForm.street_name" ></el-input>
        </el-form-item>

        <el-form-item label="邮箱" prop="email" :rules="[
      { required: true, message: '请输入邮箱地址', trigger: 'blur' },
      { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
      ]">
          <el-input type="email" v-model="userForm.email" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitUserForm('userForm')">提交</el-button>
          <el-button @click="change('profile')">返回</el-button>
        </el-form-item>
      </el-form>
    </el-main>
    <el-main class="updata-pass" v-if="profilePath == 'updatePassword'">
      <el-form :model="passForm" status-icon :rules="rules" ref="passForm" label-width="100px" >

        <el-form-item label="原密码" prop="oldPassword">
          <el-input type="password" v-model="passForm.oldPassword" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="passForm.password" autocomplete="off"></el-input>
          <span v-if="rank !== ''">密码等级：{{rank}}</span>
        </el-form-item>

        <el-form-item label="确认密码" prop="check_password">
          <el-input type="password"   v-model="passForm.check_password" ></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitPassForm('passForm')">提交</el-button>
          <el-button @click="change('profile')">返回</el-button>
        </el-form-item>
      </el-form>
    </el-main>



    <el-main v-if="profilePath == 'message'">
      <ProfileMessage></ProfileMessage>
    </el-main>
    <el-main v-if="profilePath == 'beMerchant'">
      <div>
        <img class="merchant" src="../../assets/img/shangjia.jpg">
        <el-button class="merchant-btn" type="text" @click="centerDialogVisible = true">我要成为商家</el-button>
        <el-dialog
            title="闲书平台协议"
            :visible.sync="centerDialogVisible"
            width="50%"
            center>
          <div >我同意成为商家，并按照规范合理售卖商品，不乱填写信息，一切解释权归于闲书平台。</div>
          <div class="agree-div"><el-checkbox v-model="checked">我同意该协议</el-checkbox></div>

          <span slot="footer" class="dialog-footer">
    <el-button @click="centerDialogVisible = false">取 消</el-button>
    <el-button type="primary" :disabled="!checked" @click="beMer">确 定</el-button>
  </span>
        </el-dialog>
      </div>
    </el-main>
    <el-main class="upload" v-if="profilePath == 'upload'">
      <div class="add">
        <el-form ref="bookform" :rules="rules" :model="bookForm" label-width="80px" class="add-form" >
          <el-form-item prop="books_name"  label="书籍名称:" >
            <el-input placeholder="例子：红楼梦"  v-model="bookForm.books_name"></el-input>
          </el-form-item>
          <el-form-item label="书籍类别:">
            <div class="block">
              <el-cascader
                  v-model="bookForm.smallSort"
                  placeholder="试试搜索：玄幻"
                  :options="getCascader"
                  filterable></el-cascader>
            </div>
          </el-form-item>

          <el-form-item  prop="books_author" label="作者:">
            <el-input  placeholder="例子：曹雪芹" v-model="bookForm.books_author"></el-input>
          </el-form-item>
          <el-form-item  prop="press" label="出版社:">
            <el-input  placeholder="例子：xxx出版社" v-model="bookForm.press"></el-input>
          </el-form-item>

          <el-form-item prop="picture" label="图片:">
            <el-upload
                class="upload-demo"
                ref="upload"
                :on-success="picSuccess"
                action="http://127.0.0.1:9000/books/add"
                :auto-upload="false">
              <el-button  v-model="bookForm.price" slot="trigger" size="small" type="primary">选取文件</el-button>
            </el-upload>
          </el-form-item>
          <el-form-item prop="price" label="原价:">
            <el-input  placeholder="例子：46" v-model="bookForm.price"></el-input>
          </el-form-item>
          <el-form-item prop="price" label="售价:">
            <el-input  placeholder="例子：46" v-model="bookForm.secprice"></el-input>
          </el-form-item>
          <el-form-item  prop="condition" label="新旧程度:">
            <el-input placeholder="例子：7—10" v-model="bookForm.condition"></el-input>
          </el-form-item>
          <el-form-item prop="user_name" label="卖家名称:">
            <el-input v-model="bookForm.user_name"></el-input>
          </el-form-item>
          <el-form-item prop="books_sums" label="数量:">
            <el-input placeholder="例子：1" v-model="bookForm.books_sums"></el-input>
          </el-form-item>
          <el-form-item prop="buy_year" label="购买年份:">
            <el-input placeholder="例子：2017" v-model="bookForm.buy_year"></el-input>
          </el-form-item>

          <el-form-item prop="books_exchange" label="交易类型:">
            <el-radio v-model="bookForm.is_exchange" label="0">出售</el-radio>
            <el-radio v-model="bookForm.is_exchange" label="1">兑换</el-radio>
          </el-form-item>

          <el-form-item prop="is_write" label="是否涂改:">
            <el-radio v-model="bookForm.is_write" label="1">是</el-radio>
            <el-radio v-model="bookForm.is_write" label="0">否</el-radio>
          </el-form-item>
          <el-form-item prop="is_lack" label="是否缺页:">
            <el-radio v-model="bookForm.is_lack" label="1">是</el-radio>
            <el-radio v-model="bookForm.is_lack" label="0">否</el-radio>
          </el-form-item>
          <el-form-item prop="is_sells" label="是否多次出售:">
            <el-radio v-model="bookForm.is_sells" label="1">是</el-radio>
            <el-radio v-model="bookForm.is_sells" label="0">否</el-radio>
          </el-form-item>
          <el-form-item prop="is_taste" label="是否存在异味:">
            <el-radio v-model="bookForm.is_taste" label="1">是</el-radio>
            <el-radio v-model="bookForm.is_taste" label="0">否</el-radio>
          </el-form-item>
          <el-form-item prop="is_changColor" label="是否颜色变化严重:">
            <el-radio v-model="bookForm.is_changColor" label="1">是</el-radio>
            <el-radio v-model="bookForm.is_changColor" label="0">否</el-radio>
          </el-form-item>
          <el-form-item >
          </el-form-item>
          <el-form-item class="books-intro" prop="intro" label="简介:">
            <el-input  placeholder="例子：清代著名小说" v-model="bookForm.intro"></el-input>
          </el-form-item>
          <el-form-item class="add-button">
            <el-button  type="primary" @click="onSubmit">立即创建</el-button>
            <el-button @click="resetForm('bookform')">重置</el-button>
          </el-form-item>
        </el-form>
      </div>

    </el-main>
    <el-main v-if="profilePath == 'mine'">
      <div v-if="books.length == 0">还未上传任何商品</div>
      <div v-else>
        <div class="book_content">
          <div class="books_item" v-for="item in books" >
            <div v-if="item.is_exchange == 0 &&item.is_check == 1"  @click="detailClick('/detail',item)"><img :src="imgUrl(item.picture)"></div>
            <div v-else-if="item.is_exchange == 1 &&item.is_check == 1"  @click="detailClick('/exchangeDetail',item)"><img :src="imgUrl(item.picture)"></div>
            <div v-else ><img :src="imgUrl(item.picture)"></div>
            <div class="books_name">{{item.books_name}}</div>
            <div v-if="item.is_exchange == 0">交易类型：出售</div>
            <div v-else>交易类型：置换</div>
            <div v-if="item.is_check == 0">审核进度：待审核</div>
            <div v-else-if="item.is_check == 1" >审核进度：通过</div>
            <div v-else>审核进度：不通过</div>
            <el-popconfirm
                @confirm="soldOut(item)"
                title="确定下架该商品吗？">
              <el-button class="unpass-btn" plain slot="reference"  size="mini" >下架该商品</el-button>
            </el-popconfirm>
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
    </el-main>

  </div>
</template>

<script>
import HomeBar from "components/content/HomeBar";
import {getUser,postUser,postPass,getmybooks,beMerchant} from "network/profile";
import {getBigSort,getSmallSort,deleteBook} from "network/admin";
import {addBook} from "network/admin";
import ProfileMessage from "@/views/profile/childComps/ProfileMessage";
export default {
  name: "Profile",
  components: {HomeBar,
    ProfileMessage

  },

  data(){
    var checkPhone = (rule, value, callback) => {
      const phoneReg = /^1[3|4|5|7|8][0-9]{9}$/
      if (!value) {
        return callback(new Error('电话号码不能为空'))
      }
      setTimeout(() => {
        // Number.isInteger是es6验证数字是否为整数的方法,但是我实际用的时候输入的数字总是识别成字符串
        // 所以我就在前面加了一个+实现隐式转换

        if (!Number.isInteger(+value)) {
          callback(new Error('请输入数字值'))
        } else {
          if (phoneReg.test(value)) {
            callback()
          } else {
            callback(new Error('电话号码格式不正确'))
          }
        }
      }, 100)
    }

    var checkCode = (rule, value, callback) => {
      const codeReg = /^[0-9]{6}$/;
      if (!value) {
        return callback(new Error('邮政编码不能为空'))
      }
      setTimeout(() => {
        if (!Number.isInteger(+value)) {
          callback(new Error('请输入数字值'))
        } else {
          if (codeReg.test(value)) {
            callback()
          } else {
            callback(new Error('邮政编码格式不正确'))
          }
        }
      }, 100)
    }

    var checkPass = (rule, value, callback) => {
      const passReg1 = /^[0-9]{6,16}$|^[A-Z]{6,16}$|^[a-z]{6,16}$|^[\W_!@#$%^&*`~()-+=]{6,16}$/;
      const passReg2 = /^(?!\d+$)(?![a-zA-Z]+$)[\da-zA-Z]{6,16}$|^(?!\d+$)(?![\x00-\xff]+$)[\d\x00-\xff]{6,16}$|^(?!a-zA-Z+$)(?![\x00-\xff]+$)[a-zA-Z\x00-\xff]{6,16}$/;
      const passReg3 = /^(?=.*[a-zA-Z])(?=.*[\W_!@#$%^&*`~()-+=])(?=.*\d)[^]{6,16}$|^(?=.*[a-zA-Z])(?=.*[\W_!@#$%^&*`~()-+=])[^]{6,16}$|^(?=.*\d)(?=.*[\W_!@#$%^&*`~()-+=])[^]{6,16}$|^(?=.*[a-zA-Z])(?=.*\d)[^]{10,16}$/;
      if (!value) {
        return callback(new Error('邮政编码不能为空'))
      }
      setTimeout(() => {
          if(value == this.passForm.oldPassword ){
            callback(new Error('与原有密码相同'));
          }
          if (passReg1.test(value)) {
              this.rank = '低'
              callback()
            }
          else if(passReg2.test(value)){
            this.rank = '中'
            callback()
          }
          else if(passReg3.test(value)){
            this.rank = '高'
            callback()
          }else {
            callback(new Error('长度必须在6-16之间'))
          }
      }, 100)
    }

    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.passForm.password) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };

    var validateName = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('账号名不能为空'));
      } else {
        callback();
      }
    }

    var validateUname = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('卖家不能为空'));
      } else {
        callback();
      }
    }

    var validateIntro = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('简介不能为空'));
      } else {
        callback();
      }
    }

    var validateAuthor = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('作者不能为空'));
      } else {
        callback();
      }
    }

    var validatePress = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('出版社不能为空'));
      } else {
        callback();
      }
    }


    var validatePrice = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('价格不能为空'));
      } else {
        if( value < 0 ){
          callback(new  Error(('价格不能为负数')))
        }
        callback();
      }
    }

    var validateSums = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('数量不能为空'));
      } else {
        if( value <= 0 ){
          callback(new  Error(('数量需要大于0')))
        }
        callback();
      }
    }

    var validateCondition = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('新旧程度不能为空'));
      }

      else {
        if( value < 7 ){
          callback(new  Error(('新旧程度最低为7')))
        }
        else if( value >10){
          callback(new  Error(('数量需要大于0')))
        }
        callback();
      }
    }


    return {
      activeIndex:'5',
      profilePath:'profile',
      user:{},
      userForm: {
        tel:'',
        post_code: '',
        street_name:'',
        email:''
      },
      passForm:{
        password:'',
        oldPassword:'',
        check_password:''
      },
      rank:'',
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
        is_exchange:0,
        buy_year:'',
        is_write:'',
        is_lack:'',
        is_sells:'',
        is_taste:'',
        is_changColor:'',

      },
      bigSort:[], //书籍父类信息
      smallSort:[], //书籍子类信息
      books:[],
      page: 1,    //当前页
      prepage: 4, //每页显示的记录条数
      pages: 1,   //总页数
      count: 0,   //总记录数
      pageArray:[4,8,12],
      centerDialogVisible: false,
      checked: false,

      rules:{
        tel:[
          { validator: checkPhone, trigger: 'blur' }
        ],
        post_code:[
          { validator: checkCode, trigger: 'blur' }
        ],
        street_name:[{
          required: true,trigger:'blur',message:'地址不能为空'
        }],
        check_password: [{
          validator: validatePass2, trigger: 'blur'
        }],
        password: [{
          required:true,trigger:'blur',message:'密码不能为空'
        },{
          validator: checkPass, trigger: 'blur'
        }],
        oldPassword:[{
          required:true,trigger:'blur',message:'原密码不能为空'
        }],
        books_name: [
          { validator: validateName, trigger: 'blur' }
        ],
        intro:[
          { validator: validateIntro, trigger: 'blur' }
        ],
        books_author:[
          { validator: validateAuthor, trigger: 'blur' }
        ],
        press:[
          { validator: validatePress, trigger: 'blur' }
        ],
        price: [
          { validator: validatePrice, trigger: 'blur' }
        ],
        books_sums:[
          { validator: validateSums, trigger: 'blur' }
        ],
        user_name: [
          { validator: validateUname, trigger: 'blur' }
        ],
        condition: [
          { validator: validateCondition, trigger: 'blur' }
        ],
        picture: [
          { required: true, message: '请上传图片' }
        ],
      },
    }
  },
  created() {
    if(sessionStorage.getItem('username')  == 'null'){
      alert('未登录')
      this.$router.push('/login')
    }else {
      getUser().then(res =>{
        this.user = res.data
        this.bookForm.user_name = this.user.user_name
      })
      getBigSort().then(res=>{
        this.bigSort = res
      })
      getSmallSort().then(res=>{
        this.smallSort = res
      })
      this.getPage()
    }



  },
  methods:{
    //路径跳转
    pathClick(path){
      this.$router.replace(path)
    },
    //修改当前页面路径
    change(name){
      this.profilePath = name
    },
    connectUser(path){
      this.$store.state.sells_name = sessionStorage.getItem('username')
      this.$router.replace(path)
    },

    //跳转至完善信息
    updateProfile(){
      this.profilePath = 'updateProfile'
      this.userForm.email = this.user.u_email
      if(this.user.is_default == 1){
        this.userForm.tel = this.user.tel
        this.userForm.post_code = this.user.post_code
        this.userForm.street_name = this.user.street_name
      }
    },
    //跳转至修改密码
    updatePassword(){
      this.profilePath = 'updatePassword'
    },
    //表单重置
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    //用户完善信息表单提交
    submitUserForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!');
          let obj= {};
          obj.tel = this.userForm.tel;
          obj.post_code = this.userForm.post_code;
          obj.street_name = this.userForm.street_name;
          obj.email = this.userForm.email
          console.log(obj);
          postUser(obj).then(res=>{
            console.log(res);
            if(res.status == 0){
              getUser().then(res =>{
                this.user = res.data
                this.profilePath = 'profile'
              })
            }
            else {
              console.log(res);
            }
          })
        } else {
          return false;
        }
      });
    },
    //用户修改密码表单提交
    submitPassForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!');
          let obj= {};
          obj.password = this.passForm.password
          obj.oldPassword = this.passForm.oldPassword
          console.log(obj);
          postPass(obj).then(res=>{
            console.log(res);
            if(res.status == 0){
                alert('密码修改成功')
                this.profilePath = 'profile'
            }
            else if(res.status == 1){
              alert(res.message)
            }
            else {

              console.log(res);
            }
          })
        } else {
          return false;
        }
      });
    },
    //上传书籍提交
    onSubmit() {
      if(this.bookForm.books_name &&
          this.bookForm.smallSort &&
          this.bookForm.intro &&
          this.bookForm.price &&
          this.bookForm.condition &&
          this.bookForm.user_name &&
          this.bookForm.books_author &&
          this.bookForm.press &&
          this.bookForm.books_sums &&
          this.bookForm.is_exchange &&
          this.bookForm.is_write &&
          this.bookForm.is_lack &&
          this.bookForm.is_sells &&
          this.bookForm.is_taste &&
          this.bookForm.is_changColor&&
          this.bookForm.buy_year
      )
      {
        if(this.$refs.upload._data.uploadFiles.length == 0){
          alert('请添加图片')
        }else {
          this.$refs.upload.submit()
        }
      }
      else {
        alert('信息填写不完整')
      }
    },
    picSuccess(res,file){
      this.bookForm.picture = res.picPath
      if(this.bookForm.picture !== ''){
        addBook(this.bookForm).then(res =>{
          console.log(res);
          if(res.status == 1){
            alert('卖家不存在')
          }else if( res.status == 2){
            alert('图片未上传')
          }else{
            alert('上传成功')
            this.$refs.upload.clearFiles()
          }
        })
      }else{
        alert('未选择上传的图片')
      }
    },

    //图片显示
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
    //获取分页
    getPage(p) {
      if (p == this.page) return;
      this.page = p || this.page;

      let params = {
        page:this.page,
        prepage:this.prepage,
      }
      getmybooks(params).then( rs => {
        if (!rs.code) {
          console.log(rs);
          this.count = rs.count;
          this.pages = Math.ceil(this.count / this.prepage);
          this.contents = rs.data;
          this.books = this.contents
        }
      } );
    },
    //保存书籍信息 再进行跳转
    detailClick(path,books){
      console.log(books);
      this.$store.commit('booksStatus',books)
      this.$router.push(path)
    },
    soldOut(i){
      let params = {
        books_id : i.books_id
      }
      deleteBook(params).then(res =>{
        console.log(res);
        if(res.status == '0'){
          alert('下架商品成功')
        }else {
          alert('下架商品失败')
        }
        this.getPage()
      })
    },
    beMer(){
      this.centerDialogVisible = false
      beMerchant().then(res =>{
        getUser().then(res =>{
          this.user = res.data
          this.bookForm.user_name = this.user.user_name
        })
        console.log(res);
      })
      this.change('profile')
    }
  },
  computed:{
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
                  value:  item3.small_sort_name,
                  label:item3.small_sort_name
                }
              })
        }
      })
      return this.options
    }
  }
}
</script>

<style lang="scss" scoped>
.profile{
  width: 100vw;
  z-index: 1;
  .el-header{
    position: relative;
    z-index: 100;
  }
  .el-menu-demo{
    width: 98vw;
    padding-left: 25vw;
    padding-top: 1vh;
    height: 10vh;
  }
  .el-menu-item{
    color: #6c6c6c !important;
    font-size: 18px;
  }
  .el-menu-item:hover{
    background-color: #d56d6d !important;
    color: #ffffff !important;
    font-size: 18px;
  }
  .el-menu-item.is-active{
    color: #de4040 ;
    font-size: 18px;
    font-weight: bold;
    border-bottom:4px solid #92470f !important;
  }
  .el-aside{
    line-height: 10vh;
    position: absolute;
    top:14vh;
    text-align: center;
  }
  .el-aside div{
    border-bottom:1px solid wheat;
    border-right:1px solid wheat;
  }
  .el-main{
    position: absolute;
    left: 20vw;
    top: 14vh;
    height: 61vh;
    width: 70vw;
    background-color: white;
  }




  .profile-main div{
    width: 40vw;
    height: 5vh;
    text-align: center;
    margin-top: 1.5vh;
  }

  .updata-profile .el-input{
    width: 40vw;
  }

  .updata-pass .el-input{
    width: 40vw;
  }

  .upload-book{
    height: 660vh;
  }

  .el-form{
    display: flex;
    justify-content: left;
    flex-wrap: wrap;
  }
  .el-form-item{
    display: flex;
  }
  .add-button{

    width: 30vw;
    margin-left: 16vw;
  }


  .books_item{
    float: left;
    width: 15vw;
    text-align: center;
  }
  .books_item img{
    width: 10vw;
    height: 20vh;
  }

  .book_page{
    clear: left;
    position: relative;
    margin-left: 10vw;
    top:6vh;
  }
  .price{
    text-decoration: line-through;
  }

  .agree-div{
    margin-top: 10vh;
    margin-bottom: -3vh;
    text-align: center;
  }
}


</style>
<style lang="scss">
.profile{
  .upload{
    .el-form{
      .el-form-item__label{
        padding: 0;
        width: 130px!important;
      }
      .el-form-item__content{
        width: 200px;
      }
      .el-input__inner{
        width: 200px;
      }
      .books-intro{
        margin-left: 80px;
        margin-right: 60px;
        label{

        }
        .el-input__inner{
          width: 520px!important;
        }
      }
    }
  }

.merchant{
  width: 400px;
  height: 400px;
}
.merchant-btn{
  font-size: 2vw;
  color: #e7953e;
  display: flex;
  font-family: KaiTi;
  margin-left: 25vw;
  margin-top: -30vh;
}
}
</style>