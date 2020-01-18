<template>
  <div>
    <div class="top">
      <div class="back" @click="$router.back()">
        <van-icon name="arrow-left" />
        <span>返回</span>
      </div>
      <div class="zb">
        <span class="zj">注册</span>
      </div>
      <router-link to="login">
        <span class="book">登录</span>
      </router-link>
    </div>
    <div class="thumb">
      <img src="../../assets/img/login.png" />
    </div>

    <div class="logininfo">
      <form class="form">
        <input
          name="tel"
          v-model="mobile"
          placeholder="请输入手机号码"
          type="tel"
          class="tel"
          :class="{success: status === 'success',error: status === 'error'}"
          @change="inputtel"
        />

        <div class="imgcap">
          <input name="imgyzm" type="text" class="imgyz" ref="imgyz" v-model="captcha" />
          <img :src="cap_detail.img" />
        </div>
        <div class="yzm">
          <input placeholder="请输入验证码" type="text" v-model="tel_yzm" />
          <span v-if="getm" @click="gettelcap">获得验证码</span>
          <span v-else>
            <van-count-down :time="time" format="ss" @finish="timeend" />
          </span>
        </div>
        <div class="btn" @click="register">
          <span>注册</span>
        </div>
        <!-- <p class="tip">
          登录注册即代表同意"
          <span>用户协议</span>"和"
          <span>法律声明</span>"
        </p> -->
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      getm: true,
      time: 20 * 1000,
      cap_detail: {},
      mobile: "",
      captcha: "",
      tel_yzm: "",
      status:""
    };
  },

  methods: {
    getcaptcha() {
      this.$axios({ url: "/captcha" }).then(res => {
        this.cap_detail = res.data.data;
      });
    },

    // 获取手机号验证码
    gettelcap() {
      this.getm = false;
      this.$axios({
        url: "captcha/sms",
        method: "POST",
        data: {
          mobile: this.mobile,
          captcha: this.captcha,
          key: this.cap_detail.key
        }
      }).then(res => {
        console.log(res);
      });
    },

    // 手机号验证规则serialize()
    inputtel(e) {
      const value = e.target.value;
      if (!/^1[3456789]\d{9}$/.test(value)) {
        return false;
      }
    },
    // 注册
    register() {
      const data = {
        username: this.mobile,
        sms_code: this.tel_yzm
      };

      this.$axios({
        url: "user",
        method: "POST",
        headers: {
          Authorization: this.cap_detail.key
        },
        data
      }).then(res => {
        localStorage.setItem("token", res.data.data.api_token);
      });
    },

    timeend() {
      this.getm = true;
    }
  },

  mounted() {
    this.getcaptcha();
  }
};
</script>

<style lang="scss" scoped>
body {
  touch-action: none;
  touch-action: pan-y;
}
.top {
  height: 12vw;
  padding: 0 4vw;
  color: white;
  background-color: #333333;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 4vw;
  letter-spacing: 1px;
  .back {
    display: flex;
  }
}
.zb {
  .tit {
    font-size: 4.5vw;
    letter-spacing: 2px;
  }
}
.thumb {
  border-radius: 50%;
  width: 37.87vw;
  height: 37.87vw;
  margin: 22.67vw 31.07vw 10vw;
  img {
    width: 100%;
  }
}

.logininfo {
  width: 74.67vw;
  margin: 0 12.67vw;
  .tel,
  .yzm,
  .btn {
    height: 10.67vw;
    width: 74.67vw;
    margin-bottom: 3vw;
    border: 1px solid #ccc;
    color: #f0f0f2;
    border-radius: 5px;
    margin-bottom: 3.73vw 0;
  }
  .tel {
    text-indent: 2.8vw;
    color: #333;
  }
  .imgcap {
    display: flex;
    .imgyz {
      height: 10.67vw;
      width: 40.67vw;
      margin-bottom: 3vw;
      text-indent: 2.8vw;
      border: 1px solid #ccc;
      border-radius: 5px;
      margin-bottom: 3.73vw 0;
    }
    img {
      height: 10.67vw;
      width: 25.67vw;
      margin-bottom: 3vw;
      margin-left: 8vw;
    }
  }
  .yzm {
    display: flex;
    align-items: center;
    color: #ccc;

    input::-webkit-input-placeholder {
      color: #f0f0f2;
    }
    input[type="text"] {
      height: 10vw;
      width: 50vw;
      text-indent: 2.8vw;
      color: #333;
    }
  }

  .btn {
    text-align: center;
    line-height: 10.67vw;
    background-color: #b33836;
    border-radius: 0.67vw;
    span {
      font-size: 3.73vw;
      letter-spacing: 0vw;
      color: #ffffff;
      opacity: 0.5;
    }
  }
}

.tip {
  width: 70.93vw;
  font-family: PingFang-SC-Regular;
  font-size: 2.67vw;
  color: #666666;
  span {
    font-family: PingFang-SC-Regular;
    font-size: 2.67vw;
    font-weight: normal;
    letter-spacing: 0vw;
    color: #b33836;
  }
}

.active {
  background-color: #ffebeb;
}
</style>