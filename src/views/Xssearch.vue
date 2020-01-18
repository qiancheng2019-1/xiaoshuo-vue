<template>
  <div class="Xssearch">
    <top title="搜索"></top>
    <div class="Xssearch_content_box">
      <div class="Xssearch_content_top_box">
        <div class="Xssearch_content_inp_box">
          <input type="text" placeholder="请输入关键字" v-model="searchvalue" @input="handlevalue" />
          <div class="Xssearch_search_kuang" @click="handlesearch">
            <div class="Xssearch_search_icon">
              <van-icon name="search" size="8vw" />
            </div>
          </div>
        </div>
      </div>

      <div class="recommend" v-if="searchvalue">
        <p class="title">搜索"{{searchvalue}}"的结果</p>

        <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
          <div
            class="rec_item"
            v-for="(item,index) in result"
            :key="index"
            @click="handlereader(item.id)"
          >
            <img :src="item.thumb" v-if="item.thumb" />
            <img src="../assets/img/min.png" v-else />

            <div class="info">
              <p style="font-size:3.5vw;">{{item.title}}</p>
              <p class="ft-col">作者：{{item.author}}</p>
              <p class="ft-col">分类：{{item.category}}</p>
            </div>
          </div>
        </van-list>
      </div>

      <rankcontent></rankcontent>
    </div>
    <mfooter></mfooter>
  </div>
</template>

<script>
import Top from "../components/top.vue";
import mfooter from "../components/mfooter.vue";
import rankcontent from "./Ranking/rankcontent.vue";
import { coral } from "color-name";
export default {
  components: {
    Top,
    mfooter,
    rankcontent
  },
  data() {
    return {
      searchvalue: "",
      result: [],
      more: {},
      totalCount: "",
      page: 1,
      loading: false,
      finished: false
    };
  },
  methods: {
    handlesearch() {
      if (this.searchvalue !== "") {
        this.$axios({
          url: `/articles/category/rank?page=${this.page}&limit=20&keyword=${this.searchvalue}`
        }).then(res => {
          this.result.push(...res.data.data.data);
          this.totalCount = res.data.data.total;
          this.loading = false;
        });
      }
    },
    handlereader(id) {
      this.$router.push({
        name: "detail",
        params: {
          id
        }
      });
    },
    handleclear() {
      localStorage.setItem("his", "[]");
    },

    onLoad() {
      // 异步更新数据
      setTimeout(() => {
       this.page++
       this.handlesearch()
       

        if (this.result.length >this.totalCount) {
              this.finished = true;
        }
      }, 1000);
    },

    handlevalue() {
      this.result = [];
      this.page=0
    }
  },

  mounted() {}
};
</script>

<style lang="scss">
.Xssearch_content_box {
  .Xssearch_content_top_box {
    height: 23vw;
    display: flex;
    justify-content: center;
    align-items: center;
    .Xssearch_content_inp_box {
      width: 92vw;
      height: 7.733vw;
      display: flex;
      justify-content: center;
      align-content: center;
      input {
        width: 84.5vw;
        height: 7.733vw;
        padding-left: 3vw;
        font-size: 3.733vw;
        box-sizing: border-box;
        border: 1px solid #ddd;
        outline: none;
      }
      .Xssearch_search_kuang {
        width: 7.467vw;
        height: 7.733vw;
        background-color: #e73f3f;
        text-align: center;
        line-height: 7.733vw;
        i {
          color: #fff;
          font-size: 4.5vw;
        }
      }
    }
  }
  .Xssearch_content_jilu {
    border-top: 1px solid #ddd;
    .Xssearch_content_jilu_title_box {
      width: 100%;
      height: 10vw;
      .Xssearch_content_jilu_title {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 8.5vw;
        margin: 0 4vw;
        .Xssearch_jilu_title_left {
          font-size: 4vw;
          color: #333;
        }
        .Xssearch_jilu_title_right {
          font-size: 3.2vw;
          color: #333;
        }
      }
    }
    .Xssearch_content_jilu_message_box {
      display: flex;
      justify-content: center;
      align-items: center;
      border-bottom: 1px solid #ddd;
      .Xssearch_content_jilu_message {
        width: 92vw;
        span {
          font-size: 3.733vw;
          color: #999;
        }
      }
    }
  }
  .recommend {
    height: 113vw;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
    .title {
      line-height: 8.13vw;
      padding: 0 4vw;
      font-size: 4.27vw;
      border-bottom: 1px solid #ccc;
      background: #f0f0f2;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .rec_item {
      border-bottom: 1px solid #f0f0f2;
      padding: 2vw 0;
      display: flex;
      img {
        width: 15.47vw;
        height: 21.07vw;
        margin: 0 4vw;
      }
      p {
        font-size: 3.7vw;
        line-height: 6vw;
      }
      .num {
        font-size: 3.47vw;
        background-color: #f0f0f2;
      }
      .sj {
        float: left;
        border-width: 5px;
        margin-top: 3px;
        margin-left: -10px;
        border-style: solid;
        border-color: transparent #f0f0f2 transparent transparent;
      }
    }
  }
}
</style>
