<template>
  <div class = "activity">
    <div v-if = "is_show == 1">
      <div class="top-text">当前已有活动
        <el-button class="add-btn" @click="createActive">新增活动</el-button>
      </div>
      <div class="port-item"  v-for="(item,index) in activityList" >
        <div class="port-text"> {{item.port.content}}</div>
        <div>
          <img class="port-img" :src="imgUrl(item.port.img)" @click="activityClick(item.port_id)">

        </div>
       </div>

    </div>
    <div v-else-if="is_show == 2">
      <div v-if="is_add">
        <div class="add-div">
          <el-button class="add-btn" @click="activityAdd">增加</el-button>
          <el-button  @click="is_show = true">返回</el-button>
        </div>

        <el-table  ref="tb"
                   empty-text="暂无数据"
                   :data="act_content"
                   align="center">
          <el-table-column align="center" prop="activity_id"  label="id" width="100">
          </el-table-column>
          <el-table-column align="center" prop="port_id"  label="活动id" width="100">
          </el-table-column>
          <el-table-column align="center"  label="图片" width="500">
            <template slot-scope="scope">
              <img class="active-img" :src="imgUrl(scope.row.books_info.picture)">
            </template>
          </el-table-column>

          <el-table-column align="center" prop="title" label="标题" width="200">
          </el-table-column>

          <el-table-column align="center"  label="操作" width="180">
            <template slot-scope="scope">

              <el-button @click="activityDelete(scope.row)">删除</el-button>
            </template>

          </el-table-column>

        </el-table>
      </div>
      <div class="add-active-div" v-else>
       <el-form  :model="activityform" label-width="80px">
         <el-form-item class="form-title" prop="title" label="标题">
           <el-input placeholder="例子：以草木之名" v-model="activityform.title"></el-input>
         </el-form-item>
         <el-form-item label="书籍名称">
           <el-autocomplete
               v-model="state"
               :fetch-suggestions="querySearchAsync"
               placeholder="请输入内容"
               @select="handleSelect"
           ></el-autocomplete>
         </el-form-item>




         <el-form-item class="add-button">
           <el-button   @click="onSubmit">立即添加</el-button>
           <el-button   @click="is_add = 1">返回</el-button>
         </el-form-item>
       </el-form>
     </div>

    </div>
    <div v-else-if="is_show == 3">
    <div class="add-active-div">
      <el-form  :model="activityForm" label-width="80px" >
        <el-form-item class="form-title" prop="title" label="活动">
          <el-select v-model="activityForm.port_id" placeholder="请选择">
            <el-option
                v-for="item in portList"
                :key="item.port_id"
                :label="item.content"
                :value="item.port_id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="form-title" prop="title" label="标题">
          <el-input placeholder="例子：以草木之名" v-model="activityForm.title"></el-input>
        </el-form-item>

        <el-form-item label="书籍名称">
          <el-autocomplete
              v-model="state"
              :fetch-suggestions="querySearchAsync"
              placeholder="请输入内容"
              @select="handleSelect"
          ></el-autocomplete>
        </el-form-item>

        <el-form-item class="add-button">
          <el-button   @click="addPort">立即添加</el-button>
          <el-button   @click="is_show = 1">返回</el-button>
        </el-form-item>
      </el-form>
    </div>


    </div>
  </div>
</template>

<script>
import {getActivityList,getActivity,addActivity,deleteActivity,getPortId} from "@/network/admin";
import {getSelect} from "@/network/select";
export default {
  data(){
    return {
      activityList:[],
      is_show : 1,
      act_content:[],
      currentId:'',
      is_add:true,
      activityform:{
          title:'',
          books_id:'',
          port_id:'',
      },
      activityForm:{
        title:'',
        books_id:'',
        port_id:'',
      },
      state: '',
      portList:[]
    }
  },
  methods:{
    createActive(){
      this.is_show = 3
    },
    addPort(){
      addActivity(this.activityForm).then(res =>{
        console.log(res);
        getActivityList().then(res =>{
          this.activityList = res.data
        })
        alert('添加成功')
      })
    },



    activityClick(t){
      console.log(t);
      let params = {
        port_id : t
      }
      getActivity(params).then(res =>{
        this.act_content = res.data
        console.log(this.act_content);
      })
      this.currentId = t
      this.is_show  = 2

    },
    imgUrl(u){
      u = "http://localhost:9000/img/" + u
      return u
    },
    activityAdd(){
      this.is_add =!this.is_add
      this.activityform.port_id = this.currentId
      console.log('add');
    },
    activityDelete(r){
      console.log(r.activity_id);
      let params = {
        activity_id:r.activity_id
      }
      deleteActivity(params).then(res =>{
        console.log(res);
        let p = {
          port_id : this.currentId
        }
        getActivity(p).then(res =>{
          this.act_content = res.data
        })
      })


    },
    onSubmit(){
      if(this.activityform.books_id == ''||this.activityform.title == ''){
        alert('信息填写不完整')
      }else {
        addActivity(this.activityform).then(res =>{
          console.log(res);

          let p = {
            port_id : this.currentId
          }
          getActivity(p).then(res =>{
            this.act_content = res.data
          })
          alert(res.msg)
        })
      }
    },
    querySearchAsync(queryString, cb) {
      let val = queryString
      let params = {
        name:val
      }
      getSelect(params).then(res =>{
        this.results = res.data
        for(let i = 0;i < res.data.length;i++){
          this.results[i].value = res.data[i].books_name
        }
      })
      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {

        cb(this.results);
      }, 1000 * Math.random());
    },

    //搜索方法
    handleSelect(item) {
      this.results =this.results.filter(resitem =>resitem.books_name ==item.books_name)
      this.activityform.books_id =this.results[0].books_id
      this.activityForm.books_id =this.results[0].books_id
      this.isCheck = true;
    },
  },
  created() {
    getActivityList().then(res =>{
      this.activityList = res.data
      console.log(this.activityList);
    })
    getPortId().then(res =>{
      this.portList = res.data
      console.log(this.portList);
    })
  }

}
</script>

<style lang="scss" scoped>
.activity{
  .active-img{
    width: 100px;
    height: 100px;
  }
  .add-div{
    position: absolute;
    right: 3vw;
    top: 10vh;
    z-index: 11;
  }
  .add-btn{
  }
  .form-title{
    width: 30vw;
  }
  .add-active-div{
    text-align: left;
  }
  .port-img{
    width: 60vw;
    height: 20vh;
  }
  .port-item{
    position: relative;
    left: 0;
    top: 0;
    margin-top: 0.2vh;
  }
  .port-text{
    position: absolute;
    left: 38%;
    top: 3vh;
    width: 20vw;
    height:5vh;
    font-size: 20px;
    color: #cd2149;
  }
  .top-text{
    color: #49928c;
    font-size: 24px;
  }
  .add-btn{
    margin-left: 50vw;
    color: #49928c;
    background-color: transparent;
  }
  .add-btn:hover{
    background-color: white;

  }
}

</style>