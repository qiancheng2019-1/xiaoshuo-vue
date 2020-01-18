<template>
  <div class="rankcontent">
    <div class="rankcontent_content" v-for="(item,index) in list" :key="index">
      <div class="rankcontent_content_top">
        <div class="rankcontent_top_left">
          <span>{{item.name}}</span>
        </div>

       
      </div>

      <div class="rankcontent_content_bottom" @click="handledetail(item[0].id)">
        <div class="rankcontent_bottom_left">
          <div class="rankcontent_bl_img">
            <img src="../../assets/img/1.png" alt />
          </div>
          <span>{{item[0].title}}</span>
        </div>
        <div class="rankcontent_bottom_right">
          <i class="el-icon-view eye"></i>
          <span>{{item[0].total_views}}</span>
        </div>
      </div>

      <div class="rankcontent_content_bottom" @click="handledetail(item[1].id)">
        <div class="rankcontent_bottom_left">
          <div class="rankcontent_bl_img">
            <img src="../../assets/img/2.png" alt />
          </div>
          <span>{{item[1].title}}</span>
        </div>
        <div class="rankcontent_bottom_right">
          <i class="el-icon-view eye"></i>
          <span>{{item[1].total_views}}</span>
        </div>
      </div>

      <div class="rankcontent_content_bottom" @click="handledetail(item[2].id)">
        <div class="rankcontent_bottom_left">
          <div class="rankcontent_bl_img">
            <img src="../../assets/img/3.png" alt />
          </div>
          <span>{{item[2].title}}</span>
        </div>
        <div class="rankcontent_bottom_right">
          <i class="el-icon-view eye"></i>
          <span>{{item[2].total_views}}</span>
        </div>
      </div>

      <div class="rankcontent_content_bottom" @click="handledetail(item[3].id)">
        <div class="rankcontent_bottom_left">
          <div class="rankcontent_bl_img">
            <img src="../../assets/img/4.png" alt />
          </div>
          <span>{{item[3].title}}</span>
        </div>
        <div class="rankcontent_bottom_right">
          <i class="el-icon-view eye"></i>
          <span>{{item[3].total_views}}</span>
        </div>
      </div>

      <div class="rankcontent_content_bottom" @click="handledetail(item[4].id)">
        <div class="rankcontent_bottom_left">
          <div class="rankcontent_bl_img">
            <img src="../../assets/img/5.png" alt />
          </div>
          <span>{{item[4].title}}</span>
        </div>
        <div class="rankcontent_bottom_right">
          <i class="el-icon-view eye"></i>
          <span>{{item[4].total_views}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["list"],

  methods: {
    handledetail(id) {
      this.$router.push({
        name: "detail",
        params: {
          id
        }
      });
    }
  }
};
</script>

<style lang="scss">
.rankcontent_content_top {
  height: 9vw;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 3.87vw;
  // background-color: #007AFF;
  .rankcontent_top_left {
    height: 3.87vw;
    font-family: PingFang-SC-Medium;
    font-size: 4vw;
    font-weight: normal;
    font-stretch: normal;
    letter-spacing: 0vw;
    color: #333333;
  }
  .rankcontent_top_right {
    width: 20vw;
    height: 3.47vw;
    display: flex;
    justify-content: flex-end;
    text-align: right;
    img {
      width: 3.07vw;
      height: 3.5vw;
      margin-right: 6px;
    }
    span {
      display: inline-block;
      height: 3.47vw;
      font-size: 3vw;
      font-weight: normal;
      font-stretch: normal;
      letter-spacing: 0vw;
      color: #333333;
    }
  }
}
.rankcontent_content_bottom {
  background-color: #fff;
  border-bottom: 1px solid #f0f0f2;
  height: 7.87vw;
  padding: 0 4vw;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .rankcontent_bottom_left {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .rankcontent_bl_img {
      width: 4.5vw;
      height: 4.5vw;
      overflow: hidden;
      img {
        width: 100%;
        height: 100%;
      }
    }
    span {
      height: 3.6vw;
      font-family: PingFang-SC-Medium;
      font-size: 3.6vw;
      font-weight: normal;
      font-stretch: normal;
      letter-spacing: 0vw;
      color: #666666;
    }
  }
  .rankcontent_bottom_right {
    i {
      font-size: 2vw;
    }
    span {
      margin-left: 5px;
      width: 9.2vw;
      height: 2.53vw;
      font-size: 3.2vw;
      font-weight: normal;
      font-stretch: normal;
      letter-spacing: 0vw;
      color: #999999;
    }
  }
}
</style>
