<template>
  <div class="top">
    <div class="back"@click="$router.back()">
      <van-icon name="arrow-left"  />
      <span>返回</span>
    </div>
    <div class="zb">
      <span class="tit">{{title}}</span>
      <span class="zj">{{zj}}</span>
    </div>
    <span class="book">{{book}}</span>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: "xxx小说网"
    },
    zj: {
      type: String
    },
    book: {
      typr: String,
      default: "书架"
    }
  }
};
</script>

<style scoped lang="scss">
.top {
  height: 12vw;
  padding: 0 4vw;
  color: white;
  background-color: #333333;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 3.733vw;
  letter-spacing: 1px;
  .back{
      display: flex;
      align-items: center;
  }
}
.zb {
  .tit {
    font-size: 4.5vw;
    letter-spacing: 2px;
  }
}
</style>