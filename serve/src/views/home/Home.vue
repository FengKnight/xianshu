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

export default {
  name: "Home",
  components:{
    HomeBar,
    HomeSearch,
    HomeContent
  }
}
</script>

<style scoped>

</style>