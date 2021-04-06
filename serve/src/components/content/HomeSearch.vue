<template>
  <div class="nav-search">
    <i class="el-icon-edit icon">闲书网</i>

    <el-autocomplete
        v-model="state"
        :fetch-suggestions="querySearchAsync"
        placeholder="请输入内容"
        @select="handleSelect"
    ></el-autocomplete>
    <el-button @click="selectClick" plain>搜索</el-button>
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
          this.$store.commit('selectTextStatus',this.state);
          this.$router.push('/select')
        }
      }

    }
  },
  mounted() {
    this.restaurants = this.results;
  }
}
</script>

<style scoped>
.nav-search{
  text-align: center;
}
.search{
  width: 30vw;
  margin-bottom: 40px;
}
.nav-search i{
  font-family: KaiTi;
}

</style>