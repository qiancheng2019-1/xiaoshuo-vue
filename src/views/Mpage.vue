<template>
  <div class="main">
    <div class="top">
      <div class="header">
        <span class="title">龙傲天小说网</span>
        <div class="cal">
          <ul>
            <li v-for="(item,index) in cate" :key="index">{{item}}</li>
          </ul>
        </div>
        <input type="text" placeholder="请输入" />
        <van-icon name="search" size="15" class="icon" color="#ccc" />
        <div class="login">
          <span>登录</span>
          <span>注册</span>
        </div>
        <span class="book">我的书架</span>
      </div>
    </div>
    <div class="container">
      <div class="hot">
        <div class="left">
          <span class="hottitle">热门作品</span>
          <div class="hotinfo">
            <div class="hotimg">
              <img :src="ranklist.rank[6].thumb" />
            </div>
            <div class="bookinfo">
              <p>{{ranklist.rank[6].title}}</p>
              <p style="font-size:16px; color:#bf2c24;">{{ranklist.rank[6].author}}</p>
              <p>阅读量：{{ranklist.rank[5].id}}</p>
              <p class="fontover" style="font-size:15px; color:#666">{{ranklist.rank[6].info}}</p>

              <span>书籍详情</span>
            </div>
          </div>
        </div>
        <div class="right">
          <div class="cate_item" v-for="(item,index) in detail" :key="index">
            <span class="title">{{item[0].category}}</span>
            <p v-for="(item,index) in item" :key="index">
              <span style="color:#999">[{{item.category}}]</span>
              {{item.title}}
            </p>
          </div>
        </div>
        <div class="rank">
          <span class="title">总排行</span>
          <div class="info">
            <div class="left">
              <span>NO.1</span>
              <p>{{ranklist.rank[0].title}}</p>
              <p style="color:#bf2c24; margin:10px 0">本周最强</p>
              <p>{{ranklist.rank[0].author}}</p>
            </div>
            <img :src="ranklist.rank[0].thumb" v-if="ranklist.rank[0].thumb" />
            <img src="../assets/img/default.png" v-else />
          </div>
          <p v-for="(item,index) in ranklist.rank" :key="index" class="push">
            <span>[{{item.category}}]</span>
            {{item.title}}
          </p>
        </div>
      </div>

      <div class="hot new">
        <div class="left">
          <span class="hottitle new_title">新书推荐</span>
          <div class="hotinfo">
            <div class="hotimg">
              <img :src="ranklist.week[4].thumb" />
            </div>
            <div class="bookinfo">
              <p>{{ranklist.week[4].title}}</p>
              <p style="font-size:16px; color:#bf2c24;">{{ranklist.week[4].author}}</p>
              <p>阅读量:{{ranklist.week[4].id}}</p>
              <p class="fontover" style="font-size:15px; color:#666">{{ranklist.month[6].info}}</p>
              <span>书籍详情</span>
            </div>
          </div>
        </div>

        <div class="right new_right">
          <div class="item" v-for="(item,index) in sixlist" :key="index">
            <div class="item_img">
              <img :src="item.thumb" />
            </div>
            <div class="new_info">
              <p style="margin-top:10px; font-size:18px;">{{item.title}}</p>
              <p class="tip">{{item.info}}</p>
              <div class="user">
                <div class="thunmb">
                  <img src="../assets/img/user.png" />
                  <span>{{item.author}}</span>
                </div>
                <span class="cate" style="color:#999">{{item.category}}</span>
                <span class="cate" style="color:#bf2c24;border-color:#bf2c24">持续更新</span>
              </div>
            </div>
          </div>
        </div>
        <div class="rank">
          <span class="title">月排行</span>
          <div class="info">
            <div class="left">
              <span>NO.1</span>
              <p>{{ranklist.month[0].title}}</p>
              <p style="color:#bf2c24; margin:10px 0">本周最强</p>
              <p>{{ranklist.month[0].author}}</p>
            </div>
            <img :src="ranklist.rank[0].thumb" />
          </div>
          <p v-for="(item,index) in ranklist.month" :key="index" class="push">
            <span>[{{item.category}}]</span>
            {{item.title}}
          </p>
        </div>
      </div>

      <div class="hot list">
        <div class="left list_left">
          <span class="hottitle list_title">热门作品</span>
          <div class="hotinfo" v-for="(item,index) in three" :key="index" style="height:180px;">
            <div class="list_main">
              <img :src="item.thumb" />
              <div class="list_info">
                <p>{{item.title}}</p>
                <p style="color:#bf2c24;margin:10px 0">阅读量{{item.id}}</p>
                <p style="color:#999; font-size:14px;">{{item.author}}</p>
              </div>
            </div>
            <div class="content">{{item.info}}</div>
            <hr />
          </div>
        </div>
        <div class="right">
          <div class="list_item" v-for="(item,index) in pushlist.rank" :key="index">
            <p>
              <span style="color:#999;width:100px;">[{{item.category}}]</span>
              <span style="color:black;width:120px;">{{item.title}}</span>
              <span style="font-size:14px;width:200px;">
                {{item.last_chapter}}
                <i>vip</i>
              </span>
              <span style="font-size:14px;width:80px;">{{item.author}}</span>
            </p>
          </div>
        </div>
        <div class="rank" style="height:630px;overflow:hidden">
          <span class="title">周排行</span>
          <div class="info">
            <div class="left">
              <span>NO.1</span>
              <p>{{ranklist.rank[0].title}}</p>
              <p style="color:#bf2c24; margin:10px 0">本周最强</p>
              <p>{{ranklist.month[0].author}}</p>
            </div>
            <img :src="ranklist.rank[0].thumb" />
          </div>
          <p v-for="(item,index) in pushlist.rank" :key="index" class="push">
            <span>[{{item.category}}]</span>
            {{item.title}}
          </p>
        </div>
      </div>
    </div>
    <div class="ad" v-if="isshow">
      <img :src="qr.qr_code" />
      <span>移动端扫码观看</span>
    </div>
    <div class="mask" @click="handlemask"></div>
  </div>
</template>

<script>
import { Icon } from "vant";

export default {
  components: {
    [Icon.name]: Icon
  },
  data() {
    return {
      cate: ["玄幻", "都市", "仙侠", "科幻", "游戏", "游戏", "历史", "排行"],
      category: [],
      ranklist: {},
      pushlist: "",
      three: "",
      sixlist: "",
      detail: "",
      qr: "",
      isshow: false
    };
  },
  methods: {
    getcategory() {
      this.$axios({
        url: "articles/category"
      }).then(res => {
        this.category = res.data.data;
      });
    },
    // 获取每个分类下的书籍
    getdetail() {
      this.$axios({
        url: `articles`,
        params: {
          limit: 5,
          category: "1-2-3-4-5-6"
        }
      }).then(res => {
        this.detail = res.data.data;
      });
    },

    getrank() {
      this.$axios({
        url: "/articles",
        params: {
          limit: 8,
          type: "rank-month-week"
        }
      }).then(res => {
        const { data } = res.data;
        this.ranklist = data;
      });
    },
    getpush() {
      this.$axios({
        url: "/articles",
        params: {
          limit: 20,
          type: "rank"
        }
      }).then(res => {
        const { data } = res.data;
        this.pushlist = data;
        this.three = data.rank.slice(0, 3);
        this.sixlist = data.rank.slice(0, 6);
     
      });
    },
    handlemask() {
      this.isshow = true;
    },
    geterweim() {
      this.$axios({ url: "qr" }).then(res => {
        this.qr = res.data.data;
       
      });
    }
  },
  mounted() {
    this.getcategory();
    this.getdetail();
    this.getrank();
    this.getpush();
    this.geterweim();
  }
};
</script>

<style scoped lang="scss">
i {
  font-style: normal;
  background-color: #fc6c28;
  color: white;
}
.main {
  .top {
    width: 100%;
    height: 40px;
    background-color: #3e3d43;
    position: fixed;
    margin-top: -20px;
    .icon {
      background-color: #3e3d43;
    }
    .header {
      width: 1200px;
      height: 40px;
      display: flex;
      align-items: center;
      margin: 0 auto;
      .title {
        font-size: 20px;
        color: #fff;
      }
      ul {
        display: flex;
        color: #ccc;
        li {
          margin-left: 25px;
        }
      }
      input[type="text"] {
        margin-left: 200px;
        background-color: #3e3d43;
        border-bottom: 1px solid #ccc;
      }
      .login {
        margin-left: 10px;
        color: #ccc;
        width: 70px;
        display: flex;
        justify-content: space-between;
        margin-right: 10px;
      }
      .book {
        margin-left: 20px;
        color: #ccc;
      }
    }
  }
  .container {
    width: 1200px;
    margin: 0 auto;

    .hot {
      // border: 1px solid #ccc;
      height: 400px;
      padding-top: 20px;
      margin-top: 20px;
      display: flex;
      .left {
        width: 20%;
        // border: 1px solid #ccc;
        .hottitle {
          font-size: 20px;
          width: 100%;
          height: 28px;
          display: block;
          border-bottom: 1px solid black;
          font-weight: 600;
        }
        .hotinfo {
          background-color: #f7f5f0;
          height: 360px;
          padding: 10px;
          .hotimg {
            width: 100%;
            img {
              width: 100px;
              height: 130px;
              display: block;
              margin: 0 auto;
            }
          }
          .bookinfo {
            font-size: 18px;
            width: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            p {
              margin: 10px;
            }
            span {
              width: 100px;
              height: 30px;
              line-height: 30px;
              text-align: center;
              font-size: 16px;
              border-radius: 13px;
              background-color: #bf2c24;
              color: white;
            }
          }
        }
      }

      .right {
        flex: 1;
        display: flex;
        height: 380px;
        flex-wrap: wrap;
        margin-left: 20px;
        .cate_item {
          height: 50%;
          width: 220px;
          margin-right: 10px;
          margin-bottom: 40px;

          // border: 1px solid #ccc;
          .title {
            font-size: 20px;
            width: 100%;
            height: 28px;
            line-height: 28px;
            font-weight: 600;
            display: block;
            border-bottom: 1px solid #ccc;
          }
          p {
            margin: 12px 0;
            font-size: 16px;
            height: 18px;
            overflow: hidden;
          }
        }
      }

      .rank {
        width: 220px;
        height: 100%;
        .title {
          font-size: 20px;
          width: 100%;
          height: 28px;
          display: block;
          border-bottom: 1px solid #ccc;
          font-weight: 600;
        }
        .info {
          display: flex;
          justify-content: space-between;
          border-bottom: 1px solid #ccc;
          .left {
            width: 100px;
            span {
              display: block;
              width: 40px;
              height: 20px;
              background-color: #bf2c24;
              color: #fff;
              margin: 10px 0;
            }
          }
          img {
            width: 90px;
            margin: 10px;
            height: 110px;
          }
        }
        .push {
          width: 190px;
          height: 30px;
          font-size: 14px;
          line-height: 30px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          border-bottom: 1px solid #ccc;
        }
      }
    }

    .new {
      margin-top: 60px;
      font-size: 14px;
      .new_title {
        width: 930px !important;
      }
      .new_right {
        margin-top: 25px;
        .item {
          width: 320px;
          margin-right: 40px;
          height: 125px;
          border-bottom: 1px solid #ccc;
          display: flex;
          img {
            width: 95px;
            height: 110px;
            margin: 10px 5px;
          }
          .new_info {
            .tip {
              font-size: 14px;
              color: #666;
              height: 28px;
              margin: 15px 0;
              overflow: hidden;
              text-overflow: ellipsis;
              display: -webkit-box;
              -webkit-line-clamp: 2;
              -webkit-box-orient: vertical;
            }
            .user {
              display: flex;
              align-items: center;
              margin-left: -10px;
              .thunmb {
                display: flex;
                align-items: center;
                margin-right: 10px;
                width: 100px;
                span {
                  width: 100px;
                  height: 15px;
                  overflow: hidden;
                }
              }
              img {
                width: 18px;
                height: 18px;
                margin-right: 2px;
              }
              .cate {
                border: 1px solid #ccc;
                height: 20px;
                width: 60px;
                line-height: 20px;
                margin-left: 5px;
              }
            }
          }
        }
      }
    }

    .list {
      margin: 60px 0;
      .list_left {
        .list_title {
          width: 930px;
        }

        .list_main {
          display: flex;
          padding: 0 10px;
          align-items: flex-end;
          img {
            width: 80px;
            height: 110px;
            margin-top: 10px;
          }
          .list_info {
            display: flex;

            flex: 1;
            flex-direction: column;
            align-items: flex-end;
          }
        }
        .content {
          margin: 20px 0;
          font-size: 14px;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
        }
      }

      .right {
        margin-top: 30px;
        padding-right: 20px;
        .list_item {
          height: 30px;
          width: 95%;
          line-height: 28px;
          border-bottom: 1px solid #ccc;
          overflow: hidden;
          p {
            display: flex;
            color: #666;
            justify-content: space-around;
            span {
              text-align: left;
            }
          }
        }
      }
    }
  }
  .ad {
    width: 260px;
    height: 300px;
    background-color: white;
    border: 1px solid #ccc;
    position: fixed;
    top: 10vw;
    left: 45vw;
    img {
      height: 150px;
      width: 150px;
      display: block;
      margin: 30px auto;
    }
    span {
      width: 100%;
      display: block;
      text-align: center;
      margin: 0 auto;
    }
  }
  .mask {
    width: 1200px;
    height: 1000px;
    background-color: #ccc;
    z-index: 999;
    position: fixed;
    opacity: 0;
    left: 15vw;
    top: 0;
  }
}
.fontover {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
