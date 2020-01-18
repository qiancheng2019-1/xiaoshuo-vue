<!-- 首页小分类 -->
<template>
  <div>
    <div class="minassort" v-for="(item,index) in assortlist" :key="index">
      <div class="minassort_category">
        <!-- 类别2-->
        <div class="category_title">
          <span>{{item[1].category}}</span>
        </div>
        <!-- 主题内容 -->
        <div
          class="category_content"
          @click="handledetail(item[1].id)"
          :data-bookid="item[1].id"
          ref="ass"
        >
          <!-- 左边图片 -->
          <div class="content_left">
            <div class="category_img_box">
              <img :src="item[1].thumb" alt v-if="item[1].thumb" />
              <img src="../../assets/img/min.png" alt v-else />
            </div>
          </div>
          <div class="content_right">
            <!-- 书本名称 -->
            <div class="category_content_title">
              <span>{{item[1].title}}</span>
            </div>
            <!-- 书本概括 -->
            <div class="category_content_synopsis">
              <span v-if="item[1].info">{{item[1].info}}</span>
              <span v-else>该文章暂无简介</span>
            </div>
            <!-- 作者 类别 连载or完结 -->
            <div class="category_content_author">
              <!-- 作者 -->
              <div class="author_left">
                <div class="header_img_box">
                  <img src="../../assets/img/user.png" alt />
                </div>
                <div class="author_name">
                  <span>{{item[1].author}}</span>
                </div>
              </div>
              <!-- 类别和连载信息 -->
              <div class="author_right">
                <div class="genre">
                  <span>{{item[1].category}}</span>
                </div>
                <div class="serialization">
                  <span>连载</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 底部其他推荐 -->
        <div class="minrecommend">
          <!-- 跳转去详情页 -->
          <div
            class="minrecommend_content"
            v-for="(item,index) in item"
            :key="index"
            @click="handledetail(item.id)"
          >
            <div class="minrecommend_left">
              <div class="txt_title">[ {{item.category}} ]{{item.title}}</div>
            </div>
            <div class="minrecommend_right">
              <div class="arrow_box">
                <i class="el-icon-arrow-right"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    assortlist: {
      type: Object,
      default: ""
    }
  },
  data() {
    return {
      list: {}
    };
  },

  methods: {
    handledetail(id) {
     this.$router.push({
               name:'detail',
               params: {id:id}
            })
    },
    getbookdetail() {
      const id = this.$axios({
        url: "/articles/" + id
      }).then(res => {});
    }
  },
  mounted() {}
};
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
}
.minassort {
  width: 100%;
  height: 74.8vw;
  margin-top: 2.13vw;
  background-color: #fff;
  display: flex;
  justify-content: center;
  overflow: hidden;
}
.minassort_category {
  width: 92vw;
  height: 100%;
  overflow: hidden;
}
// 类别
.category_title {
  height: 12vw;
  display: flex;
  align-items: center;
  span {
    font-weight: bold;
    font-size: 32/750*100vw;
  }
}
// 主题内容
.category_content {
  height: 22.4vw;
  display: flex;
  justify-content: space-between;
  .content_left {
    height: 22.4vw;
    width: 17.33vw;
    .category_img_box {
      height: 100%;
      width: 100%;
      overflow: hidden;
      box-shadow: 0px 4px 7px 0px rgba(142, 142, 142, 0.22);
      img {
        width: 100%;
        height: 100%;
      
      }
    }
  }
  .content_right {
    background-color: #fff;
    width: 70vw;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .category_content_title {
      font-size: 30/750*100vw;
      span {
        font-weight: bold;
      }
    }
    .category_content_synopsis {
      width: 100%;
      // height: 10vw;
      font-size: 26/750*100vw;
      line-height: 36/750*100vw;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;

      span {
        letter-spacing: 1px;
        color: #999;
        font-size: 2.67vw;
        height: 11vw;
        line-height: 5vw;
      }
    }
    .category_content_author {
      height: 5.07vw;
      overflow: hidden;
      display: flex;
      justify-content: space-between;
      .author_left {
        display: flex;
        align-items: center;
        .header_img_box {
          width: 4.53vw;
          height: 4.53vw;
          overflow: hidden;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .author_name {
          color: #999;
          margin-left: 6px;
          font-size: 3.07vw;
        }
      }
      .author_right {
        width: 25.33vw;
        display: flex;
        justify-content: space-between;
        .genre {
          width: 14.13vw;
          height: 100%;
          line-height: 4.5vw;
          text-align: center;
          overflow: hidden;
          background-color: #d1acd8;
          border-radius: 3px;
          span {
            font-size: 3.07vw;
            color: #fff;
            line-height: 4.5vw;
          }
        }
        .serialization {
          width: 8.4vw;
          height: 100%;
          text-align: center;
          overflow: hidden;
          background-color: #a5d2d4;
          border-radius: 3px;
          span {
            font-size: 3.07vw;
            color: #fff;
          }
        }
      }
    }
  }
}
// 首页推荐
.minrecommend {
  height: 35.73vw;
  margin-top: 4.67vw;
  .minrecommend_content {
    border-top: 1px solid #ddd;
    height: 8.8vw;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .minrecommend_left {
      height: 3.6vw;
      .txt_title {
        font-size: 3.6vw;
      }
    }
    .minrecommend_right {
      height: 3.6vw;
      .arrow_box {
        height: 100%;
        i {
          color: #dadada;
          height: 100%;
        }
      }
    }
  }
}
</style>
