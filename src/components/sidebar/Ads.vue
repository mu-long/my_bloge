<template>
  <!-- 广告 -->
  <div class="ads fly-panel">
    <div class="fly-panel-title">
      广告区域
    </div>
    <div class="fly-panel-main">
      <a
        href="http://layim.layui.com/?from=fly"
        target="_blank"
        class="fly-zanzhu"
        time-limit="2017.09.25-2099.01.01"
        style="background-color: #5FB878;"
      >LayIM 3.0 - layui 旗舰之作</a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Ads'// 广告
}
</script>

<style lang="scss" scoped>
@import '../../css/panel.scss';

.fly-zanzhu {
  display: block;
  position: relative;
  height: 60px;
  line-height: 60px;
  margin-top: 10px;
  padding: 0 20px;
  text-align: center;
  font-size: 16px;
  font-weight: 300;
  background-color: #009688;
  color: #fff;

  &:first-child {
    margin-top: 0;
  }

  &:hover {
    opacity: 0.9;
    color: #fff;
  }
}
</style>
