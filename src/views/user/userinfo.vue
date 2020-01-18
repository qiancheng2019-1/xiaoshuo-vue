<template>
  <div>
    <Top title="个人中心" />
    <div class="thumb">
      <!-- <img src="../../assets/img/login.png" @click="handeledit" /> -->
      <img :src="userinfo.avatar" @click="handeledit" />
      <p>{{userinfo.nickname}}</p>
    </div>
    <div class="content">
      <ul>
        <router-link to="editname">
          <li>
            我的昵称
            <span>{{userinfo.nickname}}</span>
            <van-icon name="arrow" />
          </li>
        </router-link>
        <li>
          我的帐号
          <span>{{userinfo.username}}</span>
          <van-icon name="arrow" />
        </li>
        <router-link to="bookshelf">
          <li>
            最近阅读
            <span>大国名厨</span>
            <van-icon name="arrow" />
          </li>
        </router-link>
        <router-link to="bookshelf">
          <li>
            我的书架
            <span>共收藏{{detail.total}}本</span>
            <van-icon name="arrow" />
          </li>
        </router-link>
      </ul>
    </div>

    <van-action-sheet v-model="show">
      <ul class="sheet">
        <li v-for="(item,index) in actions" :key="index" @click="handlethumb">{{item.name}}</li>
      </ul>
    </van-action-sheet>
    <div class="btn" @click="handleclose">
      <span>退出登录</span>
    </div>
  </div>
</template>

<script>
import Top from "../../components/top";
import mfooter from "../../components/mfooter";
import { log } from "util";

export default {
  components: {
    Top,
    mfooter
  },
  data() {
    return {
      show: false,
      actions: [{ name: "拍照" }, { name: "从手机相册选择" }],
      userinfo: {},
      detail: {}
    };
  },

  methods: {
    handlNickname() {},

    onSelect(item) {
      this.show = false;
      Toast(item.name);
    },
    handeledit() {
      this.show = true;
    },
    getcollect() {
      this.$axios({
        url: "/user/collect",
        params: {
          page: "1",
          limit: "20"
        }
      }).then(res => {
        
        this.detail = res.data.data;
      });
    },
    handlethumb() {
      this.$router.replace("editname");
    },
    handleclose() {
      localStorage.removeItem("userinfo");
      localStorage.removeItem("token");
      this.userinfo = "";
       this.$router.push("/m");
      this.$toast.success("已退出");
     

    }
  },

  mounted() {
    if (localStorage.token) {
      this.$axios({
        url: "user"
      }).then(res => {
        this.userinfo = res.data.data;
      });
    }else{
       this.$toast.success("请登录");
       this.$router.push("login")
    }

    if(!this.userinfo){
       this.$router.go(0)
    }
     this.getcollect();
    
  }
};
</script>

<style scoped lang="scss">
.thumb {
  border-radius: 50%;
  width: 192/750 * 100vw;
  height: 192/750 * 100vw;
  margin: 5.33vw 37.2vw 13.33vw;
  text-align: center;
  img {
    width: 100%;
    border-radius: 50%;
    width: 192/750 * 100vw;
    height: 192/750 * 100vw;
    margin-bottom: 3.27vw;
    p {
      width: 20.93vw;
      height: 4vw;
      font-family: PingFang-SC-Medium;
      font-size: 4.27vw;
      color: #333333;
    }
  }
}
.content {
  height: 67.33vw;
  ul {
    background-color: white;

    li {
      height: 13vw;
      display: flex;
      align-items: center;
      justify-content: space-between;
      line-height: 13vw;
      font-size: 3.73vw;
      color: #333333;
      border-bottom: 1px solid #ddd;
      padding: 0 5.6vw;
      span {
        flex: 1;
        text-indent: 20px;
      }
    }
  }
}
.nickname {
  background-color: #f0f0f2;
}
.sheet {
  li {
    height: 90/750 * 100vw;
    text-align: center;
    line-height: 90/750 * 100vw;
    &:nth-child(2) {
      border-bottom: 4px solid #f7f7f7;
    }
  }
}
.close {
  display: block;
  width: 100px;
  height: 30px;
  background-color: #b33836;
  color: #ddd;
}
.btn {
  text-align: center;
  margin: 95/750 * 100vw;
  line-height: 10.67vw;
  background-color: #b33836;
  border-radius: 0.67vw;
  span {
    font-size: 3.73vw;
    letter-spacing: 0vw;
    color: #ffffff;
  }
}
</style>