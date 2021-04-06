<template>
  <div class="nav-search">
    <div class="logo-div">    <img @click="pathClick('/')" src="../../assets/img/xianshuLOGO.png" class="logo"></div>
    <div  class="search-input">
      <div class="search-text">书籍检索</div>
      <el-autocomplete
          v-model="state"
          :fetch-suggestions="querySearchAsync"
          placeholder="请输入内容"
          @select="handleSelect"
      ></el-autocomplete>
      <el-button @click="selectClick" >搜索</el-button>
      <div class="search-retext">边城   有生之年   九州缥缈录   活着   家   鹿鼎记    风云第一刀   三国演义   西游记  </div>
    </div>

  </div>
</template>

<script>
import {getSelect} from "network/select";

export default {
  name: "HomeSearch",
  data() {
    return {
      restaurants: [],
      state: '',
      timeout:  null,
      results:[],
      book:[],
      isCheck:false
    };
  },
  methods: {

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

    handleSelect(item) {
      console.log(item);
      this.results =this.results.filter(resitem =>resitem.books_name ==item.books_name)
      console.log(this.results);
      this.isCheck = true;
    },
    selectClick(){
      if(this.state == ''){
        alert('请输入想要查询的书籍')
      }else {

        if(this.results.length == 0){
          //this.$router.push('/detail')
          console.log(this.results.length);
          alert('查无此书，请换其他')
        }
        else {
          if(this.$route.path=='/select'){
            this.$store.commit('selectTextStatus',this.state);
          }

          else{
            this.$store.commit('selectTextStatus',this.state);
            this.$router.push('/select')
          }
        }
      }

    },
    pathClick(path){
      this.$router.push(path)
    },
  },
  mounted() {
    this.restaurants = this.results;
  }
}
</script>

<style lang="scss" scoped>
.nav-search{
  height: 21vh;
  display: flex;
  justify-content: center;
  .search{
    width: 30vw;
    margin-bottom: 40px;
  }
  .nav-search i{
    font-family: KaiTi;
  }
  .logo{
    width: 10vw;
    height: 20vh;
    margin-left: -10vw;
    border-radius: 50%;

  }
  .logo-div{
    margin-left: 0vw;
  }
  .search-input{
    margin-left: 15vw;
    margin-top: 5vh;
  }
  .search-text{
    color: #9e0b0b;
    font-weight: bold;
    padding-left: 1vw;
    font-size: 18px;
    margin-bottom: 1vh;
  }
  .search-retext{
    margin-top: 1vh;
    color: #717171;
    padding-left: 0.8vw;
  }

}


</style>
<style lang="scss">
.nav-search{
  background-color: #ffffff;
  .el-input{
    width: 30vw;
    height: 6vh;
    border: 2px solid #8e5b2c;
    border-right:none ;
  }
  .el-input__inner{
    border: none;
    height: 5.2vh;
  }
  .el-button{
    display: block;
    margin-top: -6vh;
    margin-left: 30vw;
    background-color: #cb1c1c;
    color: white;
    width: 5vw;
    height: 6vh;
    border: none;
    border-radius: unset;
  }
  .el-button:hover{
    color: white;
    background-color: #ff0303;
  }

}
</style>