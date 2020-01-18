<template>
  <div class="mulu">
    <div class="mulu_mask" v-if="isshow">
      <div class="mulu_mask_content_box">
        <div class="mulu_mask_content">
          <div class="mulu_mask_content_top">
            <div class="mulu_mask_top_icon">
              <van-icon name="cross" @click="close" />
            </div>
          </div>

          <div class="mulu_mask_content_zj_box">
            <div class="mulu_mask_content_zj" v-for="(item,index) in total" :key="index">
              <span @click="handlemulu(item)">{{index*20}}-{{item*20}}章</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="mulu_box">
      <top title="目录"></top>

      <div class="mulu_fanxu_box">
        <div class="mulu_fanxu">
          <div class="mulu_fanxu_zj" @click="extend">
            <span>{{mulu}}</span>
          </div>
          <div class="mulu_fanxu_btn">
            <div class="mulu_fanxu_btn_img">
              <img src="../assets/img/fx.png" alt />
            </div>
            <span @touchend="handleorder" v-if="order === 'asc'">反序</span>
            <span @touchend="handleorder" v-else>正序</span>
          </div>
        </div>
      </div>

      <div class="mulu_ad_box" ref="mulu_ad_box"></div>

      <div class="mulu_main">
        <div
          class="mulu_content_box"
          v-for="(item,index) in chapters.data"
          :key="index"
          @click="handelmain(item.id)"
        >
          <div class="mulu_content">
            <div class="mulu_content_left">
              <div class="mulu_content_xh mulu_content_txt">
                <span></span>
              </div>
              <div class="mulu_content_title mulu_content_txt">
                <span>{{item.title}}</span>
              </div>
            </div>
            <i class="el-icon-arrow-right mulu_content_icon"></i>
          </div>
        </div>
      </div>

      <div class="mulu_bottom_box">
        <div class="mulu_bottom">
          <div class="mulu_bottom_fany_s mulu_bottom_fanye" @click="handleup">
            <div class="mulu_fany_img mbfi_s">
              <img src="../assets/img/sy.png" alt />
            </div>
            <div class="mulu_fany_txt mbf_stxt">
              <span>上一页</span>
            </div>
          </div>
          <div class="mulu_bottom_zj" @click="extend">
            <span>{{mulu}}</span>
          </div>
          <div class="mulu_bottom_fanye_x mulu_bottom_fanye" @click="handledown">
            <div class="mulu_fany_txt mbf_xtxt">
              <span>下一页</span>
            </div>
            <div class="mulu_fany_img mbfi_x">
              <img src="../assets/img/xy.png" alt />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Top from "./top.vue";
export default {
  components: {
    Top
  },
  data() {
    return {
      chapters: {},
      isshow: false,
      name_id: "",
      page: 1,
      limit: "20",
      allpage: "",
      order: "asc",
      mulu: "1-20章"
    };
  },
  mounted() {
    this.getarticles();
    this.getadv()
     this.page =this.$route.params.page
  },
  methods: {
    //   获取目录
    getarticles() {
      this.name_id = this.$route.params.id;   
      this.$axios({
        url: `/articles/${this.name_id}/chapters?page=${this.page}&limit=${this.limit}&order=${this.order}`
      }).then(res => {
     
        const data = res.data.data;
        this.chapters = data;
        this.total = Math.ceil(data.total / 20);
      });
    },
    handelmain(id) {
      this.$router.replace({
        name: "Xsreader",
        params: {
          name: this.name_id,
          id
        }
      });
    },
    extend() {
      this.isshow = true;
    },
    close() {
      this.isshow = false;
    },
    handleup() {
      if (this.page > 1) {
        this.page = +this.$route.params.page-1
        this.$router.replace({
          name:"mulu",
          params:{
            id:this.$route.params.id,
            page:this.page
          }
        })
      }
    },
    handledown() {
     this.page = +this.$route.params.page+1
       this.$router.replace({
          name:"mulu",
          params:{
            id:this.$route.params.id,
            page:this.page
          }
        })
    },
    // 目录排序切换
    handleorder() {
      if (this.order == "asc") {
        this.order = "desc";
      } else {
        this.order = "asc";
      }
      this.getarticles();
    },

    handlemulu(id) {
      this.page = id;
      this.getarticles();
      this.mulu = event.target.innerHTML;
      this.isshow=false
      document.querySelector(".mulu_main").scrollTop=0

    },

    getadv() {
        this.$axios({
        url:`ad`,
        params:{
          type:"chapter"
        }
        }).then(res=>{
        const {data} =res.data
        this.$refs.mulu_ad_box.innerHTML=data.chapter_2.code     
      })
    },
  },

  watch: {
    // page() {
    //   this.getarticles();
      
    // },
    $route(){
       this.getarticles();
    }
  }
};
</script>

<style lang="scss">
.mulu {
  background-color: #fff;
}

.mulu_mask {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba($color: #000000, $alpha: 0.7);
  z-index: 100;
  .mulu_mask_content_box {
    position: absolute;
    left: 14vw;
    top: 26vw;
    width: 72vw;
    height: 70vh;
    background-color: #ffffff;
    border-radius: 5px;
    overflow: hidden;
    .mulu_mask_content {
      .mulu_mask_content_top {
        height: 6vw;
        line-height: 5.867vw;
        text-align: right;
        i {
          margin-right: 2.667vw;
          font-size: 4vw;
        }
      }
      .mulu_mask_content_zj_box {
        overflow-y: scroll;
        -webkit-overflow-scrolling: touch;
        height: 65vh;
        .mulu_mask_content_zj {
          height: 8vw;
          width: 66vw;
          line-height: 8vw;
          margin-left: 3vw;
          border-bottom: 1px solid #ddd;
          color: #333333;
          font-size: 3.733vw;
        }
      }
    }
  }
}
.mulu_ad_box {
  width: 100vw;
  height: 18.667vw;
  margin-bottom: 12px;
}

.mulu_fanxu_box {
  height: 14vw;
  display: flex;
  justify-content: center;
  align-items: center;
  .mulu_fanxu {
    width: 94vw;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .mulu_fanxu_zj {
      height: 9vw;
      line-height: 9vw;
      width: 72vw;
      text-align: center;
      border-radius: 5px;
      background-color: #fef1dd;
      border: 1px solid #f0b04e;
      span {
        width: 12vw;
        height: 4vw;
        font-family: PingFang-SC-Medium;
        font-size: 4vw;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0vw;
        color: #cd8e2c;
      }
    }
    .mulu_fanxu_btn {
      width: 18.667vw;
      height: 9vw;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 1vw;
      border: 1px solid #cccccc;
      background-image: linear-gradient(0deg, #eeeeee 0%, #ffffff 100%);
      .mulu_fanxu_btn_img {
        width: 2vw;
        height: 4vw;
        overflow: hidden;
        img {
          width: 100%;
          height: 100%;
        }
      }
      span {
        font-family: PingFang-SC-Medium;
        font-size: 4vw;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0vw;
        color: #666666;
        margin-left: 5px;
      }
    }
  }
}

.mulu_main {
  height: 60vh;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
  .mulu_content_box {
    height: 8.667vw;
    display: flex;
    justify-content: center;
    align-items: center;
    border-top: 1px solid #ddd;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    .mulu_content {
      width: 91.2vw;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .mulu_content_left {
        display: flex;
        .mulu_content_txt {
          height: 3.6vw;
          font-family: PingFang-SC-Medium;
          font-size: 3.733vw;
          font-weight: normal;
          font-stretch: normal;
          letter-spacing: 1px;
          color: #666666;
        }
      }
      i {
        font-size: 4vw;
        color: #ccc;
      }
    }
  }
}

.mulu_bottom_box {
  height: 17vw;
  display: flex;
  justify-content: center;
  align-items: center;
  border-top: 1px solid #ddd;
  .mulu_bottom {
    width: 92vw;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .mulu_bottom_zj {
      width: 48.933vw;
      height: 9.067vw;
      line-height: 9.067vw;
      background-color: #fef1dd;
      border-radius: 5px;
      border: solid 1px #f0b04e;
      text-align: center;
      font-family: PingFang-SC-Medium;
      font-size: 3.8vw;
      font-weight: normal;
      font-stretch: normal;
      color: #cd8e2c;
    }
    .mulu_bottom_fanye {
      width: 20.267vw;
      height: 9.067vw;
      background-image: linear-gradient(0deg, #eeeeee 0%, #ffffff 100%);
      border-radius: 5px;
      border: 1px solid #ccc;
      display: flex;
      justify-content: center;
      align-items: center;
      .mulu_fany_txt {
        width: 14vw;
        height: 3.333vw;
        font-family: PingFang-SC-Medium;
        font-size: 3.7vw;
        text-align: center;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0vw;
        color: #666666;
      }
      .mulu_fany_img {
        width: 3.867vw;
        height: 3.333vw;
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
}
</style>
