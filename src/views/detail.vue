<template>
  <div class="main">
    <div class="top">
      <div class="back" @click="$router.back()">
        <van-icon name="arrow-left" />
        <span>返回</span>
      </div>
      <div class="zb">
        <span class="tit">书本详情</span>
      </div>
      <router-link to="/bookshelf">
        <span class="book">书架</span>
      </router-link>
    </div>

    <div class="container">
      <img class="im" :src="detail.thumb" v-if="detail.thumb" />
      <img class="im" v-else src="../assets/img/min.png" />
      <div class="info">
        <span>{{detail.title}}</span>
        <p>作者：{{detail.author}}</p>
        <p>
          分类：
          <span ref="cate"></span>
        </p>
        <p>已有 {{detail.total_views}}人次 读过此书</p>
      </div>
    </div>
    <div class="btncheck">
      <div @click="reader(xsid)">
        <span class="start">立即免费阅读</span>
      </div>
      <span class="btnadd" v-if="collect===0" @click="addbook">加入书架</span>
      <span class="btnadd active" v-else @click="unaddbook">已加入书架</span>
    </div>

    <div class="msg">
      <p class="tip">最新</p>
      <span>最新章节 {{detail.last_chapter}}</span>
    </div>

    <!-- 简介 -->

    <div class="intro" v-if="isshow">
      <van-loading size="40px">加载中...</van-loading>
    </div>

    <div class="intro" v-else>
      <p style="font-size:4.27vw；">作品简介</p>
      <span class="txt">{{detail.info}}</span>
      <span>标签：</span>
      <span class="bq" ref="bqname"></span>
    </div>

    <!-- 目录 -->
    <div class="directory">
      <p>
        作品目录
        <span class="mulu">(共{{chapters.total}}章)</span>
      </p>
      <ul>
        <li v-for="(item,index) in  chapters.data " :key="index">
          <router-link :to="{name:'Xsreader',params:{id:item.id,name:xsid}}">{{item.title}}</router-link>
          <van-icon name="arrow" />
        </li>
      </ul>
      <router-link :to="{name:'mulu',params:{id:xsid}}">
        <span class="ent ft-col">进入作品目录 查看更多</span>
      </router-link>
    </div>
    <!-- 推荐 -->

    <div class="recommend">
      <p class="title">读过{{detail.title}}的人还喜欢</p>

      <div
        class="rec_item"
        v-for="(item,index) in like.data"
        :key="index"
        @click="handledetail(item.id)"
      >
        <img :src="item.thumb" v-if="item.thumb" />
        <img src="../assets/img/min.png" v-else />

        <div class="info">
          <p style="font-size:3.5vw;">{{item.title}}</p>
          <p class="ft-col">作者：{{item.author}}</p>
          <p class="ft-col">分类：{{item.category}}</p>
        </div>
      </div>
    </div>

    <foot />
  </div>
</template>

<script>
import top from "../components/top";
import foot from "../components/mfooter";

export default {
  components: {
    top,
    foot
  },

  data() {
    return {
      has_fallow: true,
      isshow: true,
      detail: {},
      xsid: "",
      chapters: {},
      like: {},
      categoryName: [
        "玄幻奇幻",
        "修真武侠",
        "都市言情",
        "历史军事",
        "同人名著",
        "游戏竞技"
      ],
      collect: 0
    };
  },
  mounted() {
    this.getbookdetail();
    this.$toast.loading({
      message: "拼命加载中...",
      duration: 0,
      forbidClick: true,
     
    });
  },

  methods: {
    // 加入书架
    addbook() {
      this.$axios({
        url: "/user/collect",
        method: "POST",
        data: {
          article_id: this.xsid
        }
      }).then(res => {
        if (res.data.message == "收藏成功") {
          this.collect = 1;
          return;
        }
      });
    },
    // 移除书架
    unaddbook() {
      this.has_fallow = true;
      const id = this.$route.query.id;
      this.$axios.delete("/user/collect/" + id, {}).then(res => {
        this.collect = 0;
      });
    },

    // 获取书本信息
    getbookdetail() {
      const id = this.$route.params.id;
    
      this.$axios({
        url: "/articles/" + id
      }).then(res => {
        this.detail = res.data.data;
        this.$store.commit("setuserinfo",res.data.data.last_chapter_id)
        this.$toast.clear()
        if (!localStorage.getItem("userinfo")) {
          this.collect = 0;
        } else {
          this.collect = res.data.data.is_collect;
          
        }
        this.xsid = id;
        this.isshow = false;
        this.handlecate();
        this.$axios({ url: `/articles/${id}/chapters?page=1&limit=4` }).then(
          res => {
            const data = res.data.data;
            this.chapters = data;
           
          }
        );
      });
    },

    handlecate() {
      const id = this.detail.category_id;
      this.$axios({
        url: "/articles/category/" + id,
        params: {
          page: "1",
          limit: "4"
        }
      }).then(res => {
        this.like = res.data.data;
        this.$refs.bqname.innerHTML = res.data.data.data[0].category;
        this.$refs.cate.innerHTML = res.data.data.data[0].category;
      });
    },

    handledetail(id) {
     this.$router.push({
               name:'detail',
               params: {id:id}
            })
    },
    reader(id) {
       this.$router.push({
               name:'Xsreader',
               params: {name:id,id: this.detail.last_view_id}
            })
    }
  },

  watch: {
    $route() {
      this.getbookdetail();
    }
  }
};
</script>

<style scoped lang="scss">
.ft-col {
  color: #666;
}
.main {
  .top {
    height: 12vw;
    padding: 0 4vw;
    color: white;
    background-color: #333333;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 3.733vw;
    letter-spacing: 1px;
    .back {
      display: flex;
      align-items: center;
    }
  }
  .zb {
    .tit {
      font-size: 4.5vw;
      letter-spacing: 2px;
    }
  }
  .container {
    display: flex;
    .im {
      width: 25.47vw;
      height: 34vw;
      margin: 20px;
    }
    .info {
      margin-top: 6.8vw;
      p {
        color: #666;
        line-height: 6vw;
        margin-top: 5px;
      }
    }
  }
  .msg {
    display: flex;
    align-items: center;
    border-bottom: 10px solid #f0f0f2;
    span {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
  .tip {
    width: 10vw;
    border: 1px solid #ff4643;
    color: #ff4643;
    font-size: 13px;
    text-align: center;
    line-height: 4vw;
    margin: 2vw 4vw;
  }
  .intro {
    padding: 2.5vw 4vw;
    font-size: 4.27vw;
    .txt {
      display: block;
      color: #666;
      line-height: 6vw;
      margin: 4vw 0;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 5;
    }
    .bq {
      padding: 1vw;
      border-radius: 5px;
      font-size: 4.27vw;
      background-color: #f2f2f2;
      margin-right: 1vw;
    }
  }
  .directory {
    margin-top: 4vw;

    p {
      line-height: 8.13vw;
      background: #f0f0f2;
      border-bottom: 1px solid #ccc;
      padding: 0vw 4vw;
      font-size: 4.27vw;
    }
    ul {
      li {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 4vw;
        line-height: 8vw;
        border-bottom: 1px solid #f0f0f2;
      }
    }
    .ent {
      display: block;
      width: 60vw;
      height: 6vw;
      line-height: 6vw;
      padding: 2vw 16vw;
      margin: 4px auto;
      border-radius: 5px;
      text-align: center;
      background-color: #f0f0f2;
      border: 1px solid rgba(204, 204, 204, 1);
    }
  }
  .recommend {
    margin-top: 8px;
    height: 113vw;
    .title {
      line-height: 8vw;
      padding: 0 4vw;
      font-size: 32/750 * 100vw;
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
        box-shadow: 0px 0px 6px 1px rgba(142, 142, 142, 0.22);
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
  .comment {
    font-size: 3.73vw;
    .title {
      line-height: 8.13vw;
      border-bottom: 1px solid #ccc;
      padding: 0 4vw;
      font-size: 4.27vw;
      background: #f0f0f2;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .push {
        font-size: 3.47vw;
        padding: 0 1vw;
        color: #333;
        height: 6vw;
        line-height: 6vw;
        background-color: #ccc;
        border-radius: 3px;
      }
    }
    .com_item {
      padding: 2vw 3vw;
      border-bottom: 1px solid #ccc;
      display: flex;
      color: #333;
      .headimg {
        width: 10.13vw;
        height: 10.13vw;
        padding: 0 1vw;
      }
      .info {
        .content {
          font-size: 3.47vw;
          margin: 1.8vw 0 2vw 1vw;
          text-indent: -7px;
          line-height: 5vw;
        }
        .time {
          font-size: 2.93vw;
          color: #999;
        }
        .text {
          padding: 2vw;
          margin-top: 2vw;
          width: 78vw;
          line-height: 4.5vw;
          background-color: #f7f7f7;
          .user {
            font-family: PingFang-SC-Bold;
            font-size: 3.5vw;
            margin-right: 5px;
            line-height: 4vw;
            letter-spacing: 0vw;
            color: #000000;
          }

          .text_container {
            font-family: PingFang-SC-Medium;
            font-size: 3.5vw;
            font-weight: normal;
            letter-spacing: 0vw;
            color: #000000;
            margin-right: 10px;
          }
        }
      }
    }
    .ent {
      display: block;
      width: 60vw;
      height: 6vw;
      line-height: 6vw;
      padding: 2vw 16vw;
      margin: 4px auto;
      border-radius: 5px;
      text-align: center;
      background-color: #f0f0f2;
    }
  }
}
.btncheck {
  display: flex;
  align-items: center;
  border-radius: 5px;
  .start {
    display: block;
    height: 10vw;
    width: 398/750 * 100vw;
    background: rgba(179, 56, 54, 1);
    border: 1px solid rgba(179, 56, 54, 1);
    border-radius: 5px;
    color: #fff;
    margin: 1vw 4vw;
    text-align: center;
    line-height: 70/750 * 100vw;
  }
  .btnadd {
    display: block;
    width: 35.2vw;
    height: 10vw;
    color: #b33836;
    text-align: center;
    line-height: 10vw;
    border: 1px solid #b33836;
    border-radius: 5px;
  }

  .active {
    color: #e28e8e;
    border: 1px solid #e28e8e;
  }
}

.mulu {
  color: #666;
  font-size: 24/750 * 100vw;
  background-color: #f0f0f2;
}
</style>