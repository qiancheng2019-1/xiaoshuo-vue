<!-- 排行 -->
<template>
  <div class="Ranking">
    <mheader />
    <rankcontent :list="list"></rankcontent>
    <mfooter />
  </div>
</template>

<script>
import mheader from "../components/mheader.vue";
import mfooter from "../components/mfooter.vue";
import rankcontent from "./Ranking/rankcontent.vue";

export default {
 
  name: "Assort",
  components: {
    mheader,
    mfooter,
    rankcontent
  },
  data() {
    return {
      list: {}
    };
  },
  mounted() {
    this.getrank();
  },
  methods: {
    getrank() {
      this.$axios({
        url: "/articles",
        params: {
          limit: 5,
          type: "rank-month-week"
        }
      }).then(res => {
        const { data } = res.data;
        // console.log(data);
        data.rank.name = "总排行榜";
        data.month.name = "月排行榜";
        data.week.name = "周排行榜";
        this.list=data
        // console.log(this.list);
      });
    }
  }
};
</script>

<style lang="scss">
.Ranking {
  background-color: #f0f0f2;
}
</style>
