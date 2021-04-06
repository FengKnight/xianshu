<template>
  <div class="home">
    <home-bar></home-bar>
    <home-search></home-search>
    <home-content></home-content>
  </div>

</template>

<script>
import HomeBar from "components/content/HomeBar";
import HomeSearch from "components/content/HomeSearch";
import HomeContent from "./childComps/HomeContent";
import {getAdvertPage} from "@/network/admin";

export default {
  name: "Home",
  components:{
    HomeBar,
    HomeSearch,
    HomeContent
  },
  data(){
    return {

    }
  },
  methods:{

  },
  created() {

  }
}
</script>

<style lang="scss" scoped>
.home{
  .port-left{
    width: 10vw;
    height: 50vh;
    background-color: #9e0b0b;
    position: fixed;
    top: 30vh;
    left: 0;
    opacity: 0.7;
    img{
      width: 10vw;
      height: 50vh;
    }

  }
  .port-right{
    width: 10vw;
    height: 50vh;
    background-color: #9e0b0b;
    position: fixed;
    top: 30vh;
    right: 0;
    opacity: 0.7;
    z-index: 11;
    img{
      width: 10vw;
      height: 50vh;
    }

  }
}
</style>
<style lang="scss">
.home{
  .port-left{

  }
  .port-right{

  }

}
</style>