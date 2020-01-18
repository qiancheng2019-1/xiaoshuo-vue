<!-- 底部 -->
<template>
  <div class="mfooter">
    <div class="mfooter_content">
      <!-- 顶部 登录投诉注册 SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS-->
      <div class="top">
        <!-- 左边登录与注册 -->
        <div class="top_left_user">
          <router-link to="/userinfo">个人中心</router-link>
          <!-- <span @click="handleclose">退出</span> -->
        </div>

        <!-- 右边投诉建议 -->
        <div class="top_right">
          <router-link to="/">投诉建议</router-link>
        </div>
      </div>
      <!-- 顶部 登录投诉注册 EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE-->

      <!-- 中部 搜索框 SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS-->
      <div class="middle">
        <input type="text" class="inp" />
        <div class="sousuo">
          <div class="img_box">
            <img src="../assets/img/搜索.png" alt />
          </div>
        </div>
      </div>
      <!-- 中部 搜索框 EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE-->

      <!-- 底部 首页、分类、排行、书架跳转 SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS-->
      <div class="bottom">
        <router-link to="/m">首页</router-link>
        <router-link to="assort">分类</router-link>
        <router-link to="ranking">排行</router-link>
        <router-link to="bookshelf">书架</router-link>
      </div>
      <!-- 底部 首页、分类、排行、书架跳转 EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE-->
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userinfo: {}
    };
  },

  methods:{
   
    
     
  },

  mounted() {
    const user = JSON.parse(localStorage.getItem("userinfo"));
    this.userinfo = user;
  }
};
</script>

<style lang="scss">
.mfooter {
  width: 100vw;
  height: 22.8vw;
  // background-color: #FFFF00;
  display: flex;
  justify-content: center;
  align-items: center;
}
.mfooter_content {
  width: 94.13vw;
  height: 17.87vw;
  .top {
    width: 100%;
    height: 5.87vw;
    // background-color: #42B983;
    display: flex;
    justify-content: space-between;
    .top_left {
      a {
        display: inline-block;
        color: #626263;
        text-decoration: none;
        vertical-align: top;
        text-align: center;
        width: 9vw;
        font-size: 3.4vw;
      }
      a:nth-of-type(1) {
        width: 10vw;
        border-right: 1px solid #626263;
      }
    }
    .top_right {
      text-align: right;
      a {
        color: #626263;
        text-decoration: none;
        vertical-align: center;
        font-size: 3.4vw;
      }
    }

    .top_left_user {
      font-size: 3.7vw;
      a {
        margin: 0 1vw;
      }
    }
  }
  .middle {
    width: 100%;
    height: 5.87vw;
    background-color: #fff;
    box-sizing: border-box;
    border: 1px solid #000;
    overflow: hidden;
    display: flex;
    justify-content: space-between;
    .inp {
      padding-left: 1vw;
      width: 87.26vw;
      height: 5.8vw;
      line-height: 5.8vw;
      vertical-align: top;
      font-size: 3.5vw;
      border: none;
      outline: none;
    }
    .sousuo {
      width: 5.87vw;
      height: 100%;
      border-left: 1px solid #000;
      background-color: #ccc;
      display: flex;
      justify-content: center;
      align-items: center;
      .img_box {
        width: 2.9vw;
        height: 2.9vw;
        display: flex;
        overflow: hidden;
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
  .bottom {
    width: 100%;
    height: 6.13vw;
    overflow: hidden;
    display: flex;
    align-items: flex-end;
    a {
      overflow: hidden;
      margin-right: 1.1vw;
      width: 8vw;
      font-size: 3.4vw;
      color: #626263;
      text-decoration: none;
    }
    a:not(:last-of-type) {
      border-right: 1px solid #626263;
    }
  }
}
</style>
