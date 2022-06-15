<template>
  <!-- 链接 -->
  <div class="links fly-panel fly-link">
    <h3 class="fly-panel-title">友情链接</h3>
    <dl class="fly-panel-main">
      <dd><a
          href="/"
          target="_blank"
        >layui</a>
      <dd>
      <dd><a
          href="http://layim.layui.com/"
          target="_blank"
        >WebIM</a>
      <dd>
      <dd><a
          href="http://layer.layui.com/"
          target="_blank"
        >layer</a>
      <dd>
      <dd><a
          href="/laydate/"
          target="_blank"
        >layDate</a>
      <dd>
      <dd><a
          href="#"
          class="fly-link"
        >申请友链</a>
      </dd>
    </dl>
  </div>
</template>

<script>
export default {
  name: 'Links' // 链接
}
</script>

<style lang="scss" scoped>
@import '../../css/panel.scss';

.fly-link dd {
  display: inline-block;
  margin-right: 10px;
  margin-bottom: 5px;
  vertical-align: top;
}
</style>
