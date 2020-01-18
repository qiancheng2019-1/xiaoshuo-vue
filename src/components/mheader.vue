<!-- 头部 -->
<template>
  <div class="mheader">
    <!-- icon、小说名、搜索 SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS-->
    <div class="head_top">
      <div class="top_left">
        <div class="left_img_box">
          <img :src="webinfo.web_icon" alt />
        </div>
        <span>{{webinfo.web_name}}</span>
      </div>
      <div class="top_right">
        <router-link to="/xssearch">
          <img src="../assets/img/搜索.png" alt />
        </router-link>
      </div>
    </div>
    <!-- icon、小说名、搜索 EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE-->

    <!-- 首页、分类、排行、书架 SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS-->
    <div class="head_bottom">
      <!-- 首页 -->
      <router-link to="/m">
        <div class="bottom_content">
          <div class="bottom_img_box">
            <img src="../assets/img/首页@2x.png" alt v-if="icon.main" />
            <img src="../assets/img/首页.png" alt v-else />
          </div>
          <div class="content_title">
            <span>首页</span>
          </div>
        </div>
      </router-link>
      <!-- 分类 -->
      <router-link :to="{name:'Assort',params:{name:1,page:1}}">
        <div class="bottom_content">
          <div class="bottom_img_box">
            <img src="../assets/img/分类.png" alt v-if="icon.fl" />
            <img src="../assets/img/分类@2x.png" alt v-else  :class="{active:icon.fl=false}"/>
          </div>
          <div class="content_title">
            <span>分类</span>
          </div>
        </div>
      </router-link>
      <!-- 排行 -->
      <router-link to="/ranking">
        <div class="bottom_content">
          <div class="bottom_img_box">
            <img src="../assets/img/排行.png" alt v-if="icon.ph" />
            <img src="../assets/img/排行@2x.png" alt v-else />
          </div>
          <div class="content_title">
            <span>排行</span>
          </div>
        </div>
      </router-link>
      <!-- 书架 -->
      <router-link to="/bookshelf">
        <div class="bottom_content">
          <div class="bottom_img_box">
            <img src="../assets/img/书架.png" alt v-if="icon.sj"/>
             <img src="../assets/img/书架@2x.png" alt v-else/>
          </div>
          <div class="content_title">
            <span>书架</span>
          </div>
        </div>
      </router-link>
    </div>
    <!-- 首页、分类、排行、书架 EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE-->
  </div>
</template>

<script>
export default {
  data() {
    return {
      webinfo: {},
      ischange: true,
      icon: { main: true, fl: true, ph: true, sj: true }
    };
  },
  mounted() {
    this.getinfo();
    if (this.$route.name == "Fpage") {
      this.icon.main = false;
    }
    if (this.$route.name == "Assort") {
      this.icon.fl = false;
    }
    if (this.$route.name == "Ranking") {
      this.icon.ph = false;
    }
    if (this.$route.name == "Bookshelf") {
      this.icon.sj = false;
    }
  },
  methods: {
    getinfo() {
      this.$axios({ url: "/config" }).then(res => {
        this.webinfo = res.data.data;
      });
    }
  }
};
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
}
// 头部
.mheader {
  height: 34.23vw;
  width: 100vw;
  box-shadow: box-shadow;
  background-color: #fff;
  overflow: hidden;
}

// 搜索、小说名
.head_top {
  height: 9.5vw;
  width: 100;
  overflow: hidden;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 4vw;
  border-bottom: 1px solid #dddddd;
  .top_left {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 6.67vw;
    overflow: hidden;
    .left_img_box {
      width: 8.67vw;
      height: 6.67vw;
      overflow: hidden;
      img {
        width: 100%;
        height: 100%;
      }
    }
    span {
      font-size: 4.2vw;
    }
  }
  .top_right {
    width: 4.5vw;
    height: 4.5vw;
    overflow: hidden;
    img {
      width: 4.5vw;
      height: 4.5vw;
    }
  }
}

// 首页、分类、排行、书架
.head_bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 24.73vw;
  overflow: hidden;
  a {
    width: 25vw;
    height: 100%;
    color: #666;
    text-decoration: none;
    display: flex;
    justify-content: center;
    align-items: center;
    .bottom_content {
      height: 18.5vw;
      width: 13.33vw;
      overflow: hidden;
      .bottom_img_box {
        display: flex;
        width: 13.33vw;
        justify-content: center;
        align-items: center;
        overflow: hidden;
        margin-bottom: 1.2vw;
        img {
          width: 13.33vw;
          height: 13.33vw;
        }
      }
      .content_title {
        margin-top: 2px;
        height: 4vw;
        height: 13.33vw;
        display: flex;
        justify-content: center;
        span {
          font-size: 4vw;
        }
      }
    }
  }
}

.active{
  font-weight: 600;
}



</style>
