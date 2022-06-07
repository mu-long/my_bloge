<template>
  <div class="test layui-container">
    <div class="layui-tab">
      <ul class="layui-tab-title">
        <li>
          <router-link
            :to="{name: 'login'}"
            class="layui-this"
          >登录</router-link>
        </li>
        <li>用户管理</li>
        <li>权限分配</li>
        <li>商品管理</li>
        <li>订单管理</li>
      </ul>
      <div class="layui-tab-content">
        <div class="layui-tab-item layui-show">登录</div>
        <div class="layui-tab-item">内容2</div>
        <div class="layui-tab-item">内容3</div>
        <div class="layui-tab-item">内容4</div>
        <div class="layui-tab-item">内容5</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'test'
}
</script>

<style>
</style>
