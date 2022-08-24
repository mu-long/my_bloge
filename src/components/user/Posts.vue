<template>
  <!-- 我的帖子 -->
  <div
    class="layui-tab layui-tab-brief user_posts"
    lay-filter="docDemoTabBrief"
  >
    <ul class="layui-tab-title">
      <li>
        <router-link :to="{name: 'my_post'}">我的帖子</router-link>
      </li>
      <li>
        <router-link :to="{name: 'my_collection'}">我的收藏</router-link>
      </li>
    </ul>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'user_posts' // 我的帖子
}
</script>

<style lang="scss" scoped>
.layui-tab-title {
  margin-bottom: 15px;
}
</style>
