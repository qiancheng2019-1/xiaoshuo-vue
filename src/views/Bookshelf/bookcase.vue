<!-- 我的书架 -->
<template>
  <div class="bookcase">
    <div class="bookcase_bj">
      <div class="bookcase_bj_left">
        <span>共收藏{{totalCount}}本书</span>
      </div>

      <div class="bookcase_bj_right" @click="handleedit">
        <span>编辑</span>
      </div>
    </div>

    <div class="book_list" v-if="loading">
      <van-list v-model="load" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <div class="bookcase_book" v-for="(item,index) in detail" :key="index">
          <div class="bookcase_book_left">
            <div class="bookcase_book_img_box">
              <img :src="item.thumb" v-if="item.thumb" />
              <img src="../../assets/img/min.png" v-else />
            </div>
          </div>
          <router-link :to="{name:'detail',params:{id:item.id}}">
            <div class="bookcase_bj_middle">
              <div class="bookcase_bj_middle_title">
                <p>{{item.title}}</p>
              </div>
              <div class="bookcase_bj_middle_else">
                <div class="bookcase_book_else_top">
                  <span>作者：</span>
                  <p>{{item.author}}</p>
                </div>
                <div class="bookcase_book_else__middle">
                  <span>更新至：</span>
                  <p>{{item.last_chapter}}</p>
                </div>
                <div class="bookcase_book_else_bottom">
                  <span>{{item.updated_at}}前更新</span>
                </div>
              </div>
            </div>
          </router-link>
          <div class="bookcase_bj_right">
            <div class="bookcase_bj_right_dele" @click="handledel(item.id)" v-if="editshow">
              <span>删除</span>
            </div>
          </div>
        </div>
      </van-list>
    </div>
    <van-loading class="load" size="40px" v-else>加载中...</van-loading>
  </div>
</template>

<script>

import { async } from 'q';

export default {
  data() {
    return {
      detail: [],
      editshow: false,
      loading: false,
      load: false,
      finished: false,
      totalCount:"",
      page:1
    };
  },

  methods: {
    getcollect() {
      this.$axios({
        url: "/user/collect",
        params: {
          page: this.page,
          limit: 10
        }
      }).then(res => {
        this.detail.push(...res.data.data.data)
        this.totalCount = res.data.data.total;
        this.loading = true;
        this.load=false
      });
    },
    handledel(id) {
      this.$axios.delete("/user/collect/" + id,).then(res => {
        this.detail=[]
        this.getcollect()
      });
    },
    handleedit() {
      this.editshow = !this.editshow;
    },
    onLoad() {
      setTimeout(() => {
        this.page++
        this.getcollect()
        if(this.detail.length >=   this.totalCount){
          this.finished=true
        }
      }, 500);
      
    

    }
  },

  mounted() {
    this.getcollect();
  },

  watch: {
    pageIndex() {}
  }
};
</script>

<style lang="scss">
.bookcase_title {
  height: 8vw;
  display: flex;
  .bookcase_left {
    width: 50vw;
    box-sizing: border-box;
    height: 8vw;
    line-height: 8vw;
    text-align: center;
    border: 1px solid #ddd;
    font-size: 4vw;
    font-weight: normal;
    font-stretch: normal;
    letter-spacing: 0vw;
    color: #d21d1d;
    border-bottom: 1px solid #d21d1d;
  }
  .bookcase_right {
    width: 50vw;
    box-sizing: border-box;
    height: 8vw;
    line-height: 8vw;
    text-align: center;
    border: 1px solid #ddd;
    font-size: 4vw;
    font-weight: normal;
    font-stretch: normal;
    letter-spacing: 0vw;
    color: #666666;
  }
}

.bookcase_bj {
  height: 8vw;
  background-color: #fff;
  border-bottom: 1px solid #ddd;
  border-top: 1px solid #ccc;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 4vw;
  .bookcase_bj_left {
    font-size: 4vw;
    color: #999;
  }
  .bookcase_bj_right {
    width: 13vw;
    font-size: 4vw;
    text-align: center;
    color: #d21d1d;
  }
}

.book_list {
  height: 100vw;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
  .bookcase_book {
    height: 28vw;
    background-color: #fff;
    border-bottom: 1px solid #ddd;
    padding: 0 4vw;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .bookcase_book_left {
      width: 15vw;
      height: 21vw;
      .bookcase_book_img_box {
        width: 15vw;
        height: 21vw;
        overflow: hidden;
        img {
          width: 100%;
          height: 100%;
        }
      }
    }

    .bookcase_bj_middle {
      margin-left: 3vw;
      height: 21vw;
      width: 60vw;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .bookcase_bj_middle_title {
        height: 4vw;
        font-family: PingFang-SC-Medium;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0vw;
        p {
          font-size: 4vw;
          color: #333333;
        }
      }
      .bookcase_bj_middle_else {
        height: 13.5vw;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .bookcase_book_else_top {
          display: flex;
          height: 3vw;
          span {
            font-family: PingFang-SC-Medium;
            font-size: 3vw;
            font-weight: normal;
            font-stretch: normal;
            letter-spacing: 0vw;
            color: #999999;
          }
          p {
            font-family: PingFang-SC-Medium;
            font-size: 3vw;
            font-weight: normal;
            letter-spacing: 0vw;
            color: #333333;
          }
        }
        .bookcase_book_else__middle {
          display: flex;
          height: 3vw;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          span {
            font-family: PingFang-SC-Medium;
            font-size: 3vw;
            font-weight: normal;
            font-stretch: normal;
            letter-spacing: 0vw;
            color: #999999;
          }
          p {
            font-family: PingFang-SC-Medium;
            font-size: 3vw;
            font-weight: normal;
            letter-spacing: 0vw;
            color: #333333;
          }
        }
        .bookcase_book_else_bottom {
          display: flex;
          height: 3vw;
          span {
            font-family: PingFang-SC-Medium;
            font-size: 3vw;
            font-weight: normal;
            font-stretch: normal;
            letter-spacing: 0vw;
            color: #999999;
          }
          p {
            font-family: PingFang-SC-Medium;
            font-size: 3vw;
            font-weight: normal;
            letter-spacing: 0vw;
            color: #333333;
          }
        }
      }
    }

    .bookcase_bj_right {
      width: 16vw;
      height: 20vw;
      display: flex;
      justify-content: flex-end;
      .bookcase_bj_right_dele {
        width: 13vw;
        height: 6vw;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 5px;
        background-color: #f0f0f2;
        span {
          height: 4vw;
          line-height: 4vw;
          text-align: center;
          font-family: PingFang-SC-Medium;
          font-size: 3vw;
          font-weight: normal;
          font-stretch: normal;
          letter-spacing: 0vw;
          color: #333333;
        }
      }
    }
  }
}
.load {
  margin: 20px 30%;
}
</style>
