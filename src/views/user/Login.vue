<template>
  <div>
    <div class="top">
      <div class="back" @click="$router.replace('/m')">
        <van-icon name="arrow-left" />
        <span>返回</span>
      </div>
      <div class="zb">
        <span class="zj">登录</span>
      </div>
      <router-link to="register">
        <span class="book">注册</span>
      </router-link>
    </div>
    <div class="thumb">
      <img src="../../assets/img/login.png" />
    </div>
    <div class="logininfo">
      <form>
        <input placeholder="请输入手机号码" type="tel" class="tel" @change="telchange" v-model="mobile" />
        <div class="imgcap">
          <input type="text" class="imgyz" v-model="captcha" />
          <img :src="cap_detail.img" @click="handelupdate" />
        </div>

        <div class="yzm">
          <input placeholder="请输入验证码" type="text" v-model="tel_yzm" />
          <span @click="gettelcap" v-if="getm">获得验证码</span>
          <span class="time" v-else>
            <van-count-down :time="time" format="ss" @finish="timeend" />
          </span>
        </div>
        <div class="btn" @click="login">
          <span>登录</span>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { Field, Button, Notify } from "vant";
import Top from "../../components/top";

export default {
  components: {
    [Field.name]: Field,
    [Notify.name]: Notify,
    Top
  },
  data() {
    return {
      value: "",
      sms: "",
      getm: true,
      time: 60 * 1000,
      cap_detail: {},
      mobile: "",
      captcha: "",
      tel_yzm: "",
      userinfo: {}
    };
  },
  methods: {
    getyzm() {},
    // 图片验证码
    getcaptcha() {
      this.$axios({ url: "/captcha" }).then(res => {
        this.cap_detail = res.data.data;
      });
    },
    // 短信验证码
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
        this.$toast.success(res.data.message);
      });
    },

    timeend() {
      this.getm = true;
    },
    // 登录
    login() {
      const data = {
        username: this.mobile,
        sms_code: this.tel_yzm
      };

      this.$axios({
        url: "token",
        method: "POST",
        headers: {
          Authorization: this.cap_detail.key
        },
        data
      }).then(res => {
        const {data} =res.data
        if (res.data.message == "登录成功") {
          this.$toast.success(res.data.message)
          this.$store.commit('setuserinfo', JSON.stringify(data.api_token)); 
          localStorage.setItem("userinfo",JSON.stringify( res.data.data)) 
          setTimeout(() => {
            this.$router.replace("/m");
          }, 1000);
        }
      });
    },

    handelupdate() {
      setTimeout(() => {
        this.getcaptcha();
      }, 1000);
    },
    telchange() {
      if (!/^1[3456789]\d{9}$/.test(this.mobile)) {
        Notify({ type: "warning", message: "请输入正确的电话号码" });
        return false;
      }
    }
  },

  mounted() {
    this.getcaptcha();
  }
};
</script>

<style lang="scss" scoped>
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
  .yzm {
    display: flex;
    align-items: center;
    color: #333;
    input::-webkit-input-placeholder {
      color: #f0f0f2;
    }
    .van-count-down {
      margin: 0 10vw;
    }
    input[type="text"] {
      height: 10vw;
      width: 50vw;
      text-indent: 2.8vw;
    }
  }
  .imgcap {
    display: flex;
    .imgyz {
      height: 10.67vw;
      width: 40.67vw;
      margin-bottom: 3vw;
      border: 1px solid #ccc;
      text-indent: 2.8vw;
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
</style>