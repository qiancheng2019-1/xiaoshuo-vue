<template>
  <div class="asscontent">
    <div class="asscontent_assort_box">
      <div class="asscontent_assort">
        <div class="asscontent_assort_name_box" v-for="(item,index) in list" :key="index">
          <div class="asscontent_assort_name" :class="{active:num===index}">
            <span @click="handlecate(item.id,index)">{{item.name}}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 具体分类的书本名称 -->

    <div class="asscontent_content_box" v-for="(item,index) in  cate_list" :key="index">
      <div class="asscontent_content" @click="handlereader(item.id)">
        <div class="asscontent_content_assort">
          <span>[ {{item.category}} ]</span>
        </div>
        <div class="asscontent_content_title">
          <p>{{item.title}}</p>
        </div>
        <div class="asscontent_content_author">
          <span>/ {{item.author}}</span>
        </div>
      </div>
    </div>

    <!-- 翻页，跳转页面 -->
    <div class="asscontent_fy_box">
      <div class="asscontent_fy">
        <div class="asscontent_fy_top">
          <div class="asscontent_fy_top_btn" @click="handlestar">
            <span>首页</span>
          </div>
          <div class="asscontent_fy_top_btn" @click="handleup">
            <span>上页</span>
          </div>
          <div class="asscontent_fy_top_btn" @click="handledown">
            <span>下页</span>
          </div>
          <div class="asscontent_fy_top_btn" @click="handleend">
            <span>尾页</span>
          </div>
        </div>

        <div class="asscontent_fy_bottom">
          <div class="asscontent_fy_bottom_tz">
            <div class="tz_txt">
              <span>输入页数</span>
            </div>
            <div class="tz_kuang">
              <input type="num" oninput="value=value.replace(/[^\d]/g,'')" ref="text" />
            </div>
            <div class="tz_btn" @click="handlepush">
              <span>跳转</span>
            </div>
          </div>
          <div class="asscontent_fy_bottom_txt">
            <p>(第{{page}}/页)当前{{limit}}条/页</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    list: {
      type: Array,
      default: ""
    }
  },
  data() {
    return {
      cate_list: [],
      total: "",
      page: 1,
      limit: "0",
      cat_id: "",
      num: 0
    };
  },
  mounted() {
    this.num = this.$route.params.name;
    this.page=1
    
    this.getcatelist();
  },
  methods: {
    handlecate(id, index) {
      this.num = index;
      this.page = 1;
      this.$router.push({
        name: "Assort",
        params: {
          name: id,
          page: this.page
        }
      });
    },

    getcatelist() {
      
      const id = this.$route.params.name;
      
      this.limit = 10;
      this.$axios({
        url: "/articles/category/" + id,
        params: {
          page: this.page,
          limit: 10
        }
      }).then(res => {

        const { data } = res.data.data;
        this.cate_list = data;
        this.total = res.data.data.total;
      });
    },



    handlestar() {
      this.page = 1;
      const id = this.$route.params.name;
      this.$router.push({
        name: "Assort",
        params: {
          name: id,
          page: this.page
        }
      });
    },
    handleup() {
      if (this.page > 1) {
        const id = this.$route.params.name;
        this.page = this.$route.params.page - 1;
        this.$router.push({
          name: "Assort",
          params: {
            name: id,
            page: this.page
          }
        });
      }
    },
    handledown() {
      if (this.page < this.total / 10) {
        const id = this.$route.params.name;
        this.page = this.$route.params.page + 1;
        this.$router.push({
          name: "Assort",
          params: {
            name: id,
            page: this.page
          }
        });
      }
    },
    handleend() {
      const id = this.$route.params.name;
      this.page = Math.floor(this.total / 10);
      this.$router.push({
        name: "Assort",
        params: {
          name: id,
          page: this.page
        }
      });
    },
    handlepush() {
      const value = this.$refs.text.value;
      if (this.cate_list == "") {
        return;
      }
      this.page = value;
    },

    handlereader(book_id) {
      this.$router.push({
        name: "detail",
        params: {
          id: book_id
        }
      });
    }
  },
  destroyed() {
    this.num = 0;
    this.page=1
  },
  watch: {
    $route() {
      this.getcatelist();
      this.num=this.$route.params.name-1;
    }
    
  },



};
</script>

<style lang="scss">
.asscontent {
}
.asscontent_assort_box {
  display: flex;
  justify-content: center;
  margin-bottom: 8vh;
  .asscontent_assort {
    display: flex;
    flex-wrap: wrap;
    width: 96vw;
    height: 26vw;
    .asscontent_assort_name_box {
      display: flex;
      justify-content: center;
      align-items: flex-end;
      width: 32vw;
      height: 12vw;
      .asscontent_assort_name {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 28vw;
        height: 9vw;
        border-radius: 5px;
        background-color: #fff;
      }
    }
  }
}

.asscontent_content_box {
  height: 10.4vw;
  display: flex;
  justify-content: center;
  background-color: #fff;
  border-bottom: 1px solid #cccccc;
  .asscontent_content {
    width: 93vw;
    display: flex;
    align-items: center;
    .asscontent_content_assort {
      font-size: 3.73vw;
      color: #333;
    }
    .asscontent_content_title {
      width: 40vw;
      margin: 0 5px;
      font-size: 4vw;
      color: #ed3737;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    .asscontent_content_author {
      font-size: 3.2vw;
      color: #999;
    }
  }
}

.asscontent_fy_box {
  height: 30vw;
  background-color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  .asscontent_fy {
    width: 57vw;
    height: 23.333vw;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    .asscontent_fy_top {
      width: 57vw;
      height: 7.5vw;
      display: flex;
      justify-content: space-between;
      .asscontent_fy_top_btn {
        width: 13.2vw;
        height: 7.5vw;
        line-height: 7.5vw;
        text-align: center;
        border-radius: 5px;
        box-sizing: border-box;
        border: 1px solid #ccc;
        letter-spacing: 2px;
        background-color: #f2f3f3;
      }
    }
    .asscontent_fy_bottom {
      width: 41.6vw;
      height: 12.7vw;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .asscontent_fy_bottom_tz {
        height: 7.5vw;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .tz_txt {
          font-size: 3.733vw;
          color: #999;
        }
        .tz_kuang {
          width: 10.8vw;
          height: 7.333vw;
          background-color: #fff;
          border-radius: 5px;
          border: 1px solid #333333;

          input[type="num"] {
            width: 10.8vw;
            height: 6vw;
            text-align: center;
          }
        }
        .tz_btn {
          width: 12.933vw;
          height: 5.467vw;
          line-height: 5.467vw;
          text-align: center;
          font-size: 3.733vw;
          color: #666;
          border-radius: 2.631vw;
          border: 1px solid #333;
        }
      }
      .asscontent_fy_bottom_txt {
        width: 42vw;
        height: 3.8vw;
        font-size: 3.733vw;
        color: #999;
      }
    }
  }
}
.active {
  color: #ed3737;
  border: 1px solid #ed3737;
}
</style>







 