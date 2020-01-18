<template>
  <div class="main">
    <Top title="神州异事录" />
    <div class="content">
      <form>
        <span>标题：</span>
        <input class="title" type="text" name="title" /> 
        <p>内容：</p>
        <textarea class="text"></textarea>
        <div class="btn">发 布</div>
      </form>
    </div>
    <foot/>
  </div>

</template>

<script>
import Top from "../../components/top";
import foot from "../../components/mfooter";
export default {
  components: {
    Top,foot
  }
};
</script>

<style scoped lang="scss">
.main {
  .content {
    padding: 4vw;
    font-size: 4vw;
    border-bottom: 1px solid #ccc;
    .title {
      width: 78.9vw;
      height: 7.1vw;
      border-radius: 5px;
      margin-bottom: 3.6vw;
      background-color: #f0f0f2;
    }
    .text {
      width: 92.1vw;
      height: 35.6vw;
      background-color: #f0f0f2;
      border: #ccc;
      margin-top: 1.2vw;
      border-radius: 5px;
       resize:none;
    }
    .btn {
      width: 78.9vw;
      height:8.5vw;
      margin: 2.7vw auto;
      color: #fff;
      font-size: 3.5vw;
      border-radius: 3px;
      background-color: #999;
      text-align: center;
      line-height: 8.5vw;
    }
  }
}
</style>