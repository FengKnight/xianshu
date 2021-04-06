<template>
  <div class="all-echars">
    <div class="content">
      <sell-books-char></sell-books-char>
    </div>
  </div>
</template>

<script>
import BarChar from "@/views/admin/childComps/BarChar";
import TopMessageChar from "@/views/admin/childComps/TopMessageChar";
import SellBooksChar from "@/views/admin/childComps/SellBooksChar";
import {getTopSell} from "@/network/admin";

export default {
name: "Echars",
  components:{
    BarChar,
    TopMessageChar,
    SellBooksChar
  },
  created() {

  }
}
</script>

<style lang="scss" scoped>
.all-echars{
  width: 100vw;
  .bar-char{
    width: 40vw;
    height: 40vh;
  }
  .line-char{
    margin-left: 10vw;
    width: 40vw;
    height: 40vh;
  }
  .content{
    display: flex;

  }
}
</style>