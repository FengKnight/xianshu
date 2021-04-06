<template>
  <div class="order">
    <home-bar/>
    <div>
      <el-steps :active="Active" finish-status="success" simple style="margin-top: 20px">
        <el-step title="填写收货信息" ></el-step>
        <el-step title="支付" ></el-step>
        <el-step title="确认下单" ></el-step>
      </el-steps>
    </div>

    <div class="address-edit" v-if="Active == 1">
      <el-form :model="orderForm" status-icon :rules="rules" ref="orderForm" label-width="100px" >
        <el-form-item label="收件人电话" prop="tel">
          <el-input type="text" v-model="orderForm.tel" :disabled="isUpdate" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="收件人姓名" prop="name">
          <el-input type="text"  placeholder="例如：张三" :disabled="isUpdate" v-model="orderForm.name" ></el-input>
        </el-form-item>

        <el-form-item label="收件人地址" prop="street_name">
          <el-input type="text"  placeholder="例如：黄槐楼Y2624" :disabled="isUpdate" v-model="orderForm.street_name" ></el-input>
        </el-form-item>

        <el-form-item class="address-button">
          <el-button type="primary" @click="updateForm">修改</el-button>
          <el-button type="primary" @click="orderChange(2)">下一步</el-button>
          <el-button @click="pathClick('cart')">返回</el-button>
        </el-form-item>
      </el-form>
    </div>

    <div  v-else-if="Active == 2">
      <el-table  ref="tb"
                 type="selection"
                 :data="selectBooks"
                 align="center">
        <el-table-column  width="120" prop="books_name" label="书名"   align="center" >
        </el-table-column>
        <el-table-column  label="精品图片" width="120">
          <template  slot-scope="scope">
            <el-popover placement="top-start" title="" trigger="hover">
              <img :src="imgUrl(scope.row.picture)" alt="" style="width: 150px;height: 150px">
              <img slot="reference" :src="imgUrl(scope.row.picture)" style="width: 100px;height: 100px">
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="books_secprice" label="价格" width="100">
          <template slot-scope="scope" >
            <span>{{scope.row.books_secprice}}元</span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="condition" label="新旧程度" width="150">
          <template slot-scope="scope" >
            <span>{{scope.row.condition}}成新</span>
          </template>
        </el-table-column>
        <el-table-column align="center"  label="数量" width="150">
          <template slot-scope="scope" >
            <span>{{scope.row.books_sums}}</span>
          </template>
        </el-table-column>
      </el-table>
      <div class="confirm-button">
        <el-button type="primary" @click="orderChange(3),addOrders()">确认支付</el-button>
        <el-button @click="orderChange(1)">返回</el-button>
      </div>
    </div>

    <div  v-else-if="Active == 3">

      <div class="confirm-button">
        <div class="confirm-div">支付完成！</div>
        <el-button type="primary" @click="pathClick('orderContent')">完成</el-button>
        <el-button @click="orderChange(2)">返回</el-button>
      </div>

    </div>
  </div>
</template>

<script>
import HomeBar from "components/content/HomeBar";
import {getUser} from "network/profile";
import {addOrder} from "network/order";

export default {
name: "Order",
  components: {HomeBar},
  created() {
    getUser().then(res =>{
      console.log(res);
      this.orderForm.tel = res.data.tel
      this.orderForm.name = res.data.user_name
      this.orderForm.street_name = res.data.street_name
      this.user = res.data
    })
    console.log(this.$store.getters.selectBook);
    this.selectBooks = this.$store.getters.selectBook
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
    return {
      Active: 1,
      orderForm: {
        tel:'',
        name:'',
        street_name:'',
      },
      selectBooks:[],
      isUpdate:true,
      user: {},
      rules:{
        tel:[
          { validator: checkPhone, trigger: 'blur' }
        ],
        street_name:[{
          required: true,trigger:'blur',message:'收货地址不能为空'
        }],
        name:[{
          required: true,trigger:'blur',message:'收件人姓名不能为空'
        }],
      }
    }
  },
  methods:{
    //路径跳转
    pathClick(path){
      this.$router.push(path)
    },
    orderChange(num){
      this.Active = num
    },
    updateForm(){
      this.isUpdate = !this.isUpdate
    },
    imgUrl(u){
      u = "http://localhost:9000/img/" + u
      return u
    },
    addOrders(){
      console.log(1);
      for(let i =0;i<this.selectBooks.length;i++){
        let obj = {}
        obj.tel = this.orderForm.tel
        obj.address = this.orderForm.street_name
        obj.name = this.orderForm.name
        obj.email = this.user.u_email
        obj.cost = this.selectBooks[i].books_secprice * this.selectBooks[i].books_sums
        obj.books_id = this.selectBooks[i].books_id
        obj.books_name = this.selectBooks[i].books_name
        obj.books_price = this.selectBooks[i].books_secprice
        obj.books_sum = this.selectBooks[i].books_sums
        obj.cart_id = this.selectBooks[i].cart_id
        obj.state = this.selectBooks[i].state

        addOrder(obj).then(res =>{
          console.log(res);
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.order{
  .el-input{
    width: 30vw;
  }

  .address-edit{
    position: absolute;
    top: 0;
    left: 0;
    transform: translate(70%,70%);
  }

  .address-button {
    margin-left: 6vw;
  }

  .confirm-button{
    text-align: center;
  }

  .confirm-div{
    font-size: 24px;
    text-align: center;
  }
}

</style>