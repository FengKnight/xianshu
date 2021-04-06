<template>
  <div class="advert">
    <el-carousel class="advert-img" height="55vh" >
      <el-carousel-item v-for="item in adverts" :key="item.advert_id">
        <img :src="imgUrl(item.img)">
      </el-carousel-item>
    </el-carousel>
    <div class="advert-text">广告</div>
  </div>
</template>

<script>
import {getAdvertPage} from "@/network/admin";

export default {
name: "Advert",
  data(){
    return {
      adverts:[]
    }

  },
  created() {
    getAdvertPage().then(res =>{

      this.adverts = res.data
      console.log(this.advert);
    })
  },
  methods:{
    imgUrl(u){
      u = "http://localhost:9000/img/" + u
      return u
    },
  }
}
</script>

<style lang="scss" scoped>
.advert{
  img{
    width: 15vw;
    height: 55vh;
  }
  .advert-text{
    font-size: 18px;
    text-align: center;
  }
}
</style>
<style lang="scss">
  .advert{
    .el-carousel__button{
      display: none;
    }

  }
</style>