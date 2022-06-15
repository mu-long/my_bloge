<template>
  <div class="layui-container">
    <div class="layui-row layui-col-space15">
      <div class="layui-col-md8">
        <!-- list列表 -->
        <List />
      </div>
      <div class="layui-col-md4">
        <!-- 右 侧边栏 -->
        <HotList />
        <Ads />
        <Links />
      </div>
    </div>
  </div>
</template>

<script>
import List from '@/components/contents/List.vue'
import Ads from '@/components/sidebar/Ads.vue'
import HotList from '@/components/sidebar/HotList.vue'
import Links from '@/components/sidebar/Links.vue'

export default {
  name: 'Template1', // 模板1
  components: {
    List,
    HotList, // 热门列表
    Ads, // 广告
    Links // 链接
  }
}
</script>

<style>
</style>
