<!-- 分类 -->
<template>
  <div class="Assort">
    <mheader />
    <asscontent :list="assort"></asscontent>
    <mfooter />
  </div>
</template>

<script>
import mheader from "../components/mheader.vue";
import mfooter from "../components/mfooter.vue";
import asscontent from "./Assort/asscontent.vue";

export default {
  name: "Assort",
  components: {
    mheader,
    mfooter,
    asscontent
  },
  data(){
	  return{
		  assort:[]
	  }
  },
  mounted() {
	  this.getassort()
  },
  methods: {
    getassort() {
      this.$axios({ url: "/articles/category" }).then(res => {
      // this.assort=res.data.data
      const {data} =res.data
      data.push({name:"全部",id:"push"})
      this.assort=data
      });
    }
  }
};
</script>

<style lang="scss">
.Assort {
  background-color: #f0f0f2;
}
</style>
