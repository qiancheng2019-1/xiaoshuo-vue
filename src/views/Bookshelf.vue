<!-- 书架 -->
<template>
  <div class="Bookshelf">
    <mheader />
    <bookcase v-if="userinfo" />
    <wbookcontent v-if="!userinfo"/>
    <mwfooter />
  </div>
</template>

<script>
import mheader from "../components/mheader.vue";
import mwfooter from "../components/mwfooter.vue";
import bookcontent from "./Bookshelf/bookcontent.vue";
import wbookcontent from "./Bookshelf/wbookcontent.vue";
import bookcase from "./Bookshelf/bookcase.vue";

export default {
  name: "Assort",
  components: {
    mheader,
    mwfooter,
    bookcontent,
    wbookcontent,
    bookcase,
 
  },
  data(){
	  return{
		  userinfo:{}
	  }
  },
  mounted() {
    const user = JSON.parse(localStorage.getItem("token"));
    this.userinfo = user;
  }
};
</script>

<style lang="scss">
.Bookshelf {
  background-color: #f0f0f2;
}
</style>


