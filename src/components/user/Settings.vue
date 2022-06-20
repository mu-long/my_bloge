<template>
  <div
    class="layui-tab layui-tab-brief settings"
    lay-filter="docDemoTabBrief"
  >
    <ul class="layui-tab-title">
      <li>
        <router-link :to="{name: 'myinfo'}">我的资料</router-link>
      </li>
      <li>
        <router-link :to="{name: 'picupload'}">修改头像</router-link>
      </li>
      <li>
        <router-link :to="{name: 'resetpwd'}">修改密码</router-link>
      </li>
      <li>
        <router-link :to="{name: 'accounts'}">账号绑定</router-link>
      </li>
    </ul>
    <div class="layui-tab-content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>

export default {
  name: 'settings', // 基础设置
  components: {
  }
}
</script>

<style lang="scss" scoped>
</style>
