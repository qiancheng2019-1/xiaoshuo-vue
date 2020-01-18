<template>
  <div class="wbookcontent" v-if="!userinfo">
    <div class="wbookcontent_dl" >
      <div class="wbookcontent_dl_left">
        <span>未登录</span>
      </div>
      <router-link to="/login">
        <div class="wbookcontent_dl_right">
          <span>登录</span>
        </div>
      </router-link>
    </div>
    <div class="wbookcontent_title">
      <p>书架</p>
    </div>
    <div class="wbookcontent_content">
      <p>还木有任何书记(T^T)</p>
    </div>
  </div>
</template>

<script>
import bookread from "./bookread";
export default {
  components: {
    bookread
  },
  data() {
    return {
	  userinfo: {},
	  detail:{}
    };
  },
  mounted() {
    const user = JSON.parse(localStorage.getItem("userinfo"));
    this.userinfo = user;
    if(user){
      this.getcollect()
    }
    ;
  },
  methods: {
    getcollect() {
      this.$axios({
        url: "/user/collect",
        headers: {
          Authorization:
            "Bearer " +
            JSON.parse(localStorage.getItem("userinfo") || `{}`).api_token
        },
        params: {
          page: "1",
          limit: "10"
        }
      }).then(res => {
		  // console.log(res.data.data);
		  
        this.detail=res.data.data
      });
    }
  }
};
</script>

<style lang="scss">
.wbookcontent {
  .wbookcontent_dl {
    height: 12vw;
    background-color: #ffffff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 4vw;
    overflow: hidden;
    margin-top: 1px;
    .wbookcontent_dl_left {
      width: 20vw;
      height: 4vw;
      letter-spacing: 0vw;
      span {
        font-size: 4vw;
        color: #333333;
      }
    }
    .wbookcontent_dl_right {
      width: 12vw;
      height: 6.5vw;
      background-color: #d21d1d;
      border-radius: 5px;
      text-align: center;
      line-height: 6.5vw;
      span {
        width: 7vw;
        height: 3vw;
        font-family: PingFang-SC-Medium;
        font-size: 4vw;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0vw;
        color: #ffffff;
      }
    }
  }
  .wbookcontent_title {
    height: 7vw;
    display: flex;
    justify-content: center;
    align-items: center;
    border-bottom: 2px solid #d21d1d;
    p {
      width: 20vw;
      height: 3.6vw;
      font-size: 3.73vw;
      font-weight: normal;
      font-stretch: normal;
      letter-spacing: 0vw;
      color: #d21d1d;
    }
  }
  .wbookcontent_content {
    width: 100vw;
    height: 37.33vw;
    background-color: #ffffff;
    display: flex;
    justify-content: center;
    align-items: center;
    border-bottom: 1px solid #f0f0f2;
    p {
      width: 30.67vw;
      height: 3.07vw;
      font-family: PingFang-SC-Regular;
      font-size: 3.2vw;
      font-weight: normal;
      font-stretch: normal;
      letter-spacing: 0vw;
      color: #999999;
    }
  }
}
</style>
