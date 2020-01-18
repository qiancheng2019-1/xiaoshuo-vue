<template>
  <div class="main">
    <Top title="昵称修改" />
    <div class="thumb">
      <span class="up">上传头像</span>
      <van-uploader v-model="fileList" :after-read="afterRead" class="uploader"  :max-count="1" />
    </div>
    <van-cell-group>
      <van-field v-model="value" placeholder="请输入用户名" right-icon="close" @click-right-icon="reset" />
    </van-cell-group>

    <div class="btn" @click="handleedit">
      <span>提交</span>
    </div>
  </div>
</template>

<script>
import Top from "../../components/top";
export default {
  components: {
    Top
  },
  data() {
    return {
      value: "",
      fileList: [],
      file_url: ""
    };
  },
  methods: {
    reset() {
      this.value = "";
    },

    handleedit() {
      const params = this.value;
      this.$axios({
        url: "user",
        method: "put",
        headers: {
          Authorization:
            "Bearer " +
            JSON.parse(localStorage.getItem("userinfo") || `{}`).api_token
        },
        data: {
          nickname: this.value,
          avatar: this.file_url
        }
      }).then(res => {
        this.$toast.success("修改成功");
        const user = JSON.parse(localStorage.getItem("userinfo"));
        user.nickname = this.value;
        localStorage.setItem("userinfo", JSON.stringify(user));
      });
    },

    afterRead: function(file) {
      console.log(file);
      //构建表单是数据
      const formData = new FormData();
      formData.append("file", file.file);
      this.$axios({
        url: "/files",
        method: "POST",
        data: formData
      }).then(res => {
        this.file_url = res.data.data.file_url;
      });
    }
  },

  mounted() {
    const user = JSON.parse(localStorage.getItem("userinfo"));
    this.value = user.nickname;
  }
};
</script>

<style scoped lang="scss">
.main {
  .thumb {
    display: flex;
    align-items: center;
    .up {
      margin: 0 4vw;
      font-size: 3.73vw;
    }
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
}
</style>