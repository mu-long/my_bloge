<template>
  <div class="layui-container">
    <div class="no_found">
      <i class="iconfont icon-yepian"></i>
      <p>页面找不到了...</p>
      <router-link
        to="/"
        class="layui-btn"
      >返回首页</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NoFound'
}
</script>

<style lang="scss" scoped>
.layui-container {
  margin-top: 60px;
  min-height: var(--minHeight);
  background: #fff;
  box-shadow: var(--boxShadow);
  display: flex;
  justify-content: center;
  align-items: center;

  .no_found {
    text-align: center;

    .iconfont {
      font-size: 200px;
      background: linear-gradient(60deg, #bb22cf 0%, #f50b8a 50%, #ede646 100%);
      background-clip: text;
      color: transparent;
    }
    p {
      margin: 40px 0;
      font-size: 18px;
      color: var(--textcolor-gray);
    }
  }
}
</style>
