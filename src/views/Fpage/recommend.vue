<!-- 精品推荐与美文 -->
<template>
  <div class="recommend">
    <!-- 顶部推荐内容 SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS-->
    <div class="recommend_top">
      <!-- 标题内容 -->
      <div class="top_title">
        <a href="/detail">
          <span>精品推荐</span>
        </a>
      </div>

      <div class="content_box">
        <div
          to="detail"
          v-for="(item,index) in list[num]"
          :key="index"
          @click="handledetail(item.id)"
        >
          <div class="top_content">
            <div class="img_box">
              <img :src="item.thumb" v-if="item.thumb" />
              <img v-else src="../../assets/img/default.png" alt />
            </div>
            <div class="content_information">
              <div class="content_title">
                <span>{{item.title}}</span>
              </div>
              <div class="content_author">
                <span>{{item.author}}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 顶部推荐内容 EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE -->

    <!-- 底部换一换 SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS -->
    <div class="recommend_bottom" @click="handlenew">
      <div class="bottom_content">
        <span>换一换</span>
        <img src="../../assets/img/updata.png" alt />
      </div>
    </div>
    <!-- 底部换一换 EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE -->
  </div>
</template> 

<script>
export default {
  props: ["list"],
  data(){
    return{
      num:0
    }
    
  },
  methods: {
    handledetail(id) {
      this.$router.push({
        name: "detail",
        params: { id: id }
      });
    },
    handlenew() {   
     this.getRandomInt(0,8)
    },

    getRandomInt(min, max) {
      const num =  Math.floor(Math.random() * (max - min + 1)) + min;
      this.num = num
    }
  },

};
</script>

<style lang="scss">
.recommend {
  height: 66.13vw;
  width: 100vw;
  overflow: hidden;
  background-color: #fff;
  margin-bottom: 2.13vw;
}
.recommend_top {
  height: 54vw;
  overflow: hidden;
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  justify-content: center;
  border-bottom: 1px solid #ddd;
  .top_title {
    height: 11.87vw;
    line-height: 11.87vw;
    width: 93.8vw;
    font-size: 4vw;
  }
  .content_box {
    height: 42vw;
    width: 93.8vw;
    // overflow: hidden;
    display: flex;
    justify-content: space-between;
    .top_content {
      height: 42vw;
      width: 20.27vw;
      // overflow: hidden;
      .img_box {
        width: 20.27vw;
        height: 26.8vw;
        overflow: hidden;
        box-shadow: 0px 0px 6px 1px rgba(142, 142, 142, 0.22);

        img {
          width: 100%;
          height: 100%;
        }
      }
      .content_information {
        height: 14vw;
        width: 20.27vw;
        display: flex;
        flex-wrap: wrap;
        align-content: center;
        .content_title {
          width: 100%;
          height: 8vw;
          line-height: 8vw;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;

          span {
            font-size: 3vw;
            font-weight: 800;
          }
        }
        .content_author {
          width: 100%;
          height: 5vw;
          font-size: 3vw;
          color: #999;
        }
      }
    }
  }
}
.recommend_bottom {
  width: 100%;
  height: 12.53vw;
  display: flex;
  justify-content: center;
  align-items: center;
  .bottom_content {
    height: 12.53vw;
    display: flex;
    align-items: center;
    justify-content: space-around;
    width: 18vw;
    font-size: 4vw;
    img {
      width: 3vw;
      height: 3vw;
    }
  }
}
</style>
