<!-- 首页 -->
<template>
  <div class="Fpage">
    <mheader :info="webinfo" />
    <div class="ad" v-html="adlist.index_1  ? adlist.index_1.code : ''"></div>
    <recommend :list="list" />
    <div class="ad" v-html="adlist.index_2 ? adlist.index_2.code : ''"></div>
    <minassort :assortlist="assortlist" />
    <mfooter />
  </div>
</template>

<script>
// @ is an alias to /src
import mheader from "../components/mheader.vue";
import mfooter from "../components/mfooter.vue";
import ad from "../components/ad.vue";
import recommend from "./Fpage/recommend.vue";
import minassort from "./Fpage/minassort.vue";
import { stringify } from "querystring";
import { log } from "util";

export default {
  name: "Fpage",
  components: {
    mheader,
    mfooter,
    ad,
    recommend,
    minassort
  },
  data() {
    return {
      list: [],
      webinfo: {},
      assortlist: {},
      adlist: ""
    };
  },
  mounted() {
    this.getpush();
    this.getassort();
    this.getadv();
  },

  methods: {
    getpush() {
      this.$axios({
        url: "/articles",
        params: {
          limit: 36,
          type: "push"
        }
      }).then(res => {
        const { data } = res.data;

        var chunk = 4; //每4个分一组
        for (var i = 0, j = data.push.length; i < j; i += chunk) {
          this.list.push(data.push.slice(i, i + chunk));
        }
      });
    },
    getassort() {
      const page = Math.floor(Math.random() * 10);
      this.$axios({
        url: `/articles?limit=4&page=${page}&category=1-2-3-4-5-6`
      }).then(res => {
        this.assortlist = res.data.data;
      });
    },
    getadv() {
      this.$axios({
        url: `ad`,
        params: {
          type: "index"
        }
      }).then(res => {
        const { data } = res.data;
        this.adlist = data;
      });
    }
  },

  beforeRouteEnter: (to, from, next) => {
    if (from.path == "/login") {
      console.log(123);
      setTimeout(() => {
         location.reload()
      }, 1000);
     
      next();
    } else {
      next();
    }
  }
};
</script>

<style lang="scss" scoped>
.Fpage {
  background-color: #f0f0f2;
  .ad {
    height: 20vw;
    width: 100vw;
    h3 {
      font-size: 10vw;
      text-align: center;
      line-height: 16vw;
      color: sandybrown;
    }
  }
}
</style>
