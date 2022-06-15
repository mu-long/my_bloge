<template>
  <div class="layui-container">
    <div class="layui-row layui-col-space15">
      <div class="layui-col-md8">
        <!-- 置顶 -->
        <Top />
        <!-- list列表 -->
        <List />
      </div>
      <div class="layui-col-md4">
        <!-- 右 侧边栏 -->
        <Sign />
        <HotList />
        <Tips />
        <Ads />
        <Links />
      </div>
    </div>
  </div>
</template>

<script>
import List from '@/components/contents/List.vue'
import Top from '@/components/contents/Top.vue'
import Ads from '@/components/sidebar/Ads.vue'
import HotList from '@/components/sidebar/HotList.vue'
import Links from '@/components/sidebar/Links.vue'
import Sign from '@/components/sidebar/Sign.vue'
import Tips from '@/components/sidebar/Tips.vue'

export default {
  name: 'channels-index', // channels 通道
  components: {
    List, // 普通老板
    Top, // 置顶
    HotList, // 热门列表
    Ads, // 广告
    Links, // 链接
    Sign, // 签名
    Tips // 小贴士
  }
}
</script>

<style>
</style>
