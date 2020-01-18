<!-- 书本详情页 -->
<template>
  <div class="xsreader" :class="{
    night:night==true
  }">
    <div class="xsreader_subject">
      <div class="xsreader_tips" v-if="isOk" @click="getshow">
        <p>点击呼出菜单</p>
      </div>
      <div class="xsreader_title">
        <h1>{{main.title}}</h1>
      </div>
      <!-- 文章内容 -->
      <div class="xsreader_content" ref="content" @click="handlemask" v-html="main.content"></div>

      <!-- 广告位置 -->
      <div class="ad_fixed" v-if="ad">
        <div class="ad" @click="handleadv(ad.view_1.key)" v-html="ad.view_1 ? ad.view_1.code : ''"></div>
        <van-icon name="cross" class="close" @click="handlecloce" />
      </div>
      <div class="ad_box"></div>

      <div class="xsreader_flip">
        <div class="xsreader_flip_shang flip_fanye">
          <div class="flip_shang_img flip_img">
            <img src="../../assets/img/s.png" alt />
          </div>
          <div class="flip_shang_txt flip_txt" @click="hadelup">
            <span>上一章</span>
          </div>
        </div>
        <div class="xsreader_flip_mulu flip_fanye">
          <div class="flip_mulu_img">
            <img src="../../assets/img/reader_mulu.png" alt />
          </div>

          <div class="flip_mulu_txt">
            <span @click="hanldemulu">目录</span>
          </div>
        </div>
        <div class="xsreader_flip_xia flip_fanye">
          <div class="flip_xia_txt flip_txt" @click="hadeldown">
            <span>下一章</span>
          </div>
          <div class="flip_xia_img flip_img">
            <img src="../../assets/img/x.png" alt />
          </div>
        </div>
      </div>
    </div>

    <!-- ----------------------- -->
    <div class="font" v-if="isfontshow">
      <img src="../../assets/img/txtmin.png" data-id="sown" @click="handlefontchange" />
      <img src="../../assets/img/txtmax.png" data-id="add" @click="handlefontchange" />
    </div>

    <div class="xsreader_menu">
      <div class="xsreader_menu_top" v-if="isshow">
        <div class="top">
          <div class="back">
            <van-icon name="arrow-left" />
            <span @click="$router.back()">返回</span>
          </div>
          <div class="right">
            <span class="r_detail" @click="handledetail">书本详情</span>
            <span class="book" @click="handleadd">加入书架</span>
          </div>
        </div>
      </div>

      <router-link :to="{name:'mulu',params:{id:name_id,page:1}}">
        <div class="xsreader_menu_middle" v-if="isshow">
          <div class="menu_middle_img">
            <img src="../../assets/img/left_ml.png" alt />
          </div>
          <div class="menu_middle_txt">
            <span>目录</span>
          </div>
        </div>
      </router-link>

      <div class="xsreader_menu_bottom" v-if="isshow">
        <div class="xsreader_menu_up menu_bottom" @click="hadelup">
          <div class="menu_img_box">
            <img src="../../assets/img/reader_s.png" alt />
          </div>
          <div class="menu_up_txt menu_txt">
            <span>上一章</span>
          </div>
        </div>
        <div class="xsreader_menu_type menu_bottom" @click="handlefont">
          <div class="menu_pic_box">
            <img src="../../assets/img/zt.png" alt />
          </div>
          <div class="menu_type_txt menu_txt">
            <span>字体</span>
          </div>
        </div>

        <div class="xsreader_menu_mode menu_bottom" v-if="!night">
          <div class="menu_pic_box">
            <img src="../../assets/img/yj.png" alt />
          </div>
          <div class="menu_mode_txt menu_txt" @click="handlecheck">
            <span>夜间</span>
          </div>
        </div>
        <div class="xsreader_menu_mode menu_bottom" v-else>
          <div class="menu_pic_box">
            <img src="../../assets/img/bt.png" alt />
          </div>
          <div class="menu_mode_txt menu_txt" @click="handlecheck">
            <span>白天</span>
          </div>
        </div>
        <div class="xsreader_menu_down menu_bottom" @click="hadeldown">
          <div class="menu_img_box">
            <img src="../../assets/img/reader_x.png" alt />
          </div>
          <div class="menu_mode_txt menu_txt">
            <span>下一章</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { log } from "util";
export default {
  name: "xsreader",
  data() {
    return {
      isOk: true,
      isshow: true,
      isloading: false,
      night: false,
      isfontshow: false,
      main: {},
      name_id: "",
      cat_id: "",
      isday: true,
      ad: "",
      adshow: true,
      num: 18,
      isrequest: true,
      last: ""
    };
  },
  components: {},

  methods: {
    getshow() {
      this.isOk = false;
      this.isshow = false;
      localStorage.setItem("mask", "");
    },
    getmain() {
      const id = this.$route.params.id;
      const name_id = this.$route.params.name;
      this.name_id = name_id;
      if (!this.isrequest) {
        return;
      }
      this.isrequest = false;
      this.$axios({ url: `articles/${name_id}/${id}` }).then(res => {
        this.isrequest = true;
        this.main = res.data.data;
        this.$toast.clear();
        this.ad = true;
        this.getadv();
      });
    },

    handlemask(e) {
      var touchtime = new Date().getTime(); //记录点击时间
      if (new Date().getTime() - touchtime < 500) {
        this.isshow = !this.isshow;
        this.isfontshow = false;
        localStorage.setItem("mask", "ok");
      }
    },
    hadelup() {
      if ((this.main.prev_id == this.$route.params.id)) {
        return;
      }
      this.startLoading();
      const cat_id = this.main.prev_id;
      setTimeout(() => {
        this.$router.replace({
          name: "Xsreader",
          params: { name: this.name_id, id: cat_id }
        });
      }, 500);
    },

    hadeldown() {
      this.startLoading();
      const cat_id = this.main.next_id;
      this.cat_id = cat_id;

      if ((this.main.next_id == this.$route.params.id)) {
        this.$toast.success("暂无更新");
        return;
      }
      this.$router.replace({
        name: "Xsreader",
        params: { name: this.name_id, id: cat_id }
      });
    },
    hanldemulu() {
      this.$router.replace({
        name: "mulu",
        params: {
          id: this.name_id,
          page:1
        }
      });
    },
    // 夜间模式切换
    handlecheck() {
      this.night = !this.night;
    },
    // 加入书架
    handleadd() {
      if (!localStorage.getItem("userinfo")) {
        this.$toast.success("请先登录");
        this.$router.push("login");
      }
      this.$axios({
        url: "/user/collect",
        method: "POST",
        headers: {
          Authorization:
            "Bearer " +
            JSON.parse(localStorage.getItem("userinfo") || `{}`).api_token
        },
        data: {
          article_id: this.name_id
        }
      }).then(res => {
        if (res.data.message == "收藏成功") {
          this.$toast.success("已收藏");
        }
      });
    },
    handledetail() {
      this.$router.replace({
        name: "detail",
        params: {
          id: this.$route.params.name
        }
      });
    },

    getadv() {
      this.$axios({
        url: `ad`,
        params: {
          type: "view"
        }
      }).then(res => {
        const { data } = res.data;
        this.ad = data;
      });
    },

    handlecloce() {
      this.ad = false;
    },
    handlefont() {
      this.isfontshow = !this.isfontshow;
    },

    handleadv(key) {
      this.$axios({
        url: "ad/" + key,
        method: "put"
      }).then(res => {
        // console.log(res);
      });
    },

    // 调节字体大小
    handlefontchange(e) {
      if (event.target.dataset.id == "add") {
        if (this.num < 24) {
          this.num++;
        }
      } else {
        if (this.num > 10) {
          this.num--;
        }
      }
      this.$refs.content.style.fontSize = this.num + "px";
    },

    startLoading() {
      let loading;
      loading = this.$toast.loading({
        duration: 2000,
        message: "拼命加载中...",
        forbidClick: true
      });
    },

    endLoading() {
      let loading;
      loading = this.$toast.clear();
    }
  },

  mounted() {
    const state = localStorage.getItem("mask");
    this.name = this.$route.params.name;
    this.id = this.$route.params.id;

    this.$toast.loading({
      message: "拼命加载中...",
      duration: 0,
      forbidClick: true
    });
    this.getmain();
    this.getadv();

    if (state) {
      this.isOk = false;
    }
  },

  watch: {
    $route() {
      this.getadv();
      this.getmain();
    },
    id() {
      this.getmain();
    }
  }
};
</script>

<style lang="scss">
body,
html {
  width: 100%;
  height: 100%;
}

.xsreader {
  background-color: #fffae4;
  position: relative;
}
.active {
  display: none;
}

.xsreader_subject {
  .ad_box {
    width: 100vw;
    height: 35vw;
  }
  .ad_fixed {
    position: fixed;
    bottom: 12vw;
    width: 100vw;
    height: 30vw;
    font-size: 8vw;
    opacity: 0.9;
    text-align: center;
    line-height: 30vw;
    .ad {
      width: 100vw;
      height: 30vw;
    }
    .close {
      font-size: 8vw;
      color: #fff;
      position: absolute;
      right: 0;
      top: 0;
      z-index: 999;
    }
  }
  .xsreader_tips {
    position: absolute;
    width: 100vw;
    height: 100vh;
    z-index: 10000000;
    background-color: rgba($color: #000, $alpha: 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    p {
      letter-spacing: 3px;
      text-align: center;
      height: 10vw;
      width: 60vw;
      font-size: 7vw;
      color: #fff;
      font-weight: 500;
    }
  }
  .xsreader_title {
    width: 100%;
    height: 11vw;
    line-height: 11vw;
    text-align: center;
    font-size: 4vw;
    font-weight: bold;
  }
  .xsreader_content {
    width: 92vw;
    margin-top: 4vw;
    margin-left: 4vw;
    font-size: 18px;
    line-height: 6vw;
    p {
      font-size: 32/750 * 100vw;
      line-height: 1.3em;
      text-indent: 2em;
    }
  }
  .load {
    position: absolute;
    top: 30vw;
    left: 40vw;
  }
  .xsreader_flip {
    height: 12vw;
    width: 92vw;
    margin: 0vw 4vw;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .flip_fanye {
      width: 28vw;
      height: 7.87vw;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 4px;
      .flip_img {
        width: 10px;
        height: 14px;
        overflow: hidden;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .flip_txt {
        width: 14vw;
        height: 3.5vw;
        display: flex;
        align-items: center;
        justify-content: center;
        span {
          font-size: 3.5vw;
        }
      }
    }
  }
  .xsreader_flip_shang {
    background-color: #fff;
  }
  .xsreader_flip_xia {
    background-color: #ff5f5c;
  }
  .xsreader_flip_mulu {
    background-color: #fff;
    .flip_mulu_img {
      width: 16px;
      height: 15px;
      overflow: hidden;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .flip_mulu_txt {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 10vw;
      height: 3.5vw;
      span {
        font-size: 3.5vw;
      }
    }
  }
}

.font {
  height: 10vw;
  width: 26vw;
  bottom: 15vw;
  left: 24vw;
  position: fixed;
  background-color: #ccc;
  margin: 2vw;
  display: flex;
  justify-content: space-around;
  background-color: #333333;
  color: #fff;
  img {
    width: 8vw;
    height: 8vw;
    padding: 1vw;
  }
}
.xsreader_menu {
  .xsreader_menu_top {
    width: 100%;
    height: 12vw;
    background-color: #333;
    position: fixed;
    display: flex;
    color: #fff;
    top: 0;
    left: 0;
    .top {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 2vw;
      .back {
        display: flex;
        flex: 1;
      }
      .book {
        flex: 1;
        margin-left: 10px;
        text-align: right;
      }
    }
    .xsreader_menu_top_fh {
      position: absolute;
      left: 4vw;
      top: 4vw;
      width: 16vw;
      height: 8vw;
      color: #fff;
      .menu_top_fh_img {
        width: 3.2vw;
        height: 3.2vw;
        img {
          width: 100%;
          height: 100%;
        }
      }
      span {
        position: absolute;
        left: 4.2vw;
        top: 0vw;
        font-size: 4vw;
      }
    }
    .xsreader_menu_top_sj {
      position: absolute;
      right: 4vw;
      top: 4vw;
      height: 8vw;
      color: #fff;
      span {
        font-size: 4vw;
      }
    }
  }

  .xsreader_menu_middle {
    position: fixed;
    width: 12vw;
    height: 16vw;
    left: 0;
    top: 40vh;
    background-color: #333;
    border-bottom-right-radius: 8px;
    border-top-right-radius: 8px;
    .menu_middle_img {
      position: absolute;
      left: 2.6vw;
      top: 2.5vw;
      width: 7vw;
      height: 6.5vw;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .menu_middle_txt {
      position: absolute;
      left: 2vw;
      top: 10vw;
      text-align: center;
      width: 8vw;
      height: 5vw;
      overflow: hidden;
      span {
        font-size: 3.5vw;
        color: #fff;
      }
    }
  }

  .xsreader_menu_bottom {
    position: fixed;
    display: flex;
    align-items: center;
    bottom: 0;
    background-color: #333;
    width: 92vw;
    height: 17vw;
    text-align: center;
    padding: 0 4vw;
    .menu_bottom {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      width: 23vw;
      height: 13vw;
      text-align: center;
    }
    .menu_img_box {
      width: 23vw;
      height: 7vw;
      overflow: hidden;
      img {
        width: 7vw;
        height: 7vw;
        color: #fff;
      }
    }
    .menu_txt {
      height: 6vw;
      line-height: 6vw;
      font-size: 4vw;
      color: #fff;
    }
    .menu_pic_box {
      width: 23vw;
      height: 7vw;
      overflow: hidden;
      img {
        width: 7.2vw;
        height: 100%;
        color: #fff;
      }
    }
  }
}

.night {
  background-color: #010101;
  opacity: 0.9;
  color: #666;
}
</style>
