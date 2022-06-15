<template>
  <!-- 签名 -->
  <div class="sign fly-panel fly-signin">
    <div class="fly-panel-title">
      签到
      <i class="fly-mid"></i>
      <a
        href="javascript:;"
        class="fly-link"
        id="LAY_signinHelp"
      >说明</a>
      <i class="fly-mid"></i>
      <a
        href="javascript:;"
        class="fly-link"
        id="LAY_signinTop"
      >活跃榜<span class="layui-badge-dot"></span></a>
      <span class="fly-signin-days">已连续签到<cite>16</cite>天</span>
    </div>
    <div class="fly-panel-main fly-signin-main">
      <button
        class="layui-btn layui-btn-danger"
        id="LAY_signin"
      >今日签到</button>
      <span>可获得<cite>5</cite>飞吻</span>

      <!-- 已签到状态 -->
      <!--
          <button class="layui-btn layui-btn-disabled">今日已签到</button>
          <span>获得了<cite>20</cite>飞吻</span>
          -->
    </div>
  </div>
</template>

<script>
export default {
  name: 'Sign' // 签名
}
</script>

<style lang="scss" scoped>
@import '../../css/panel.scss';

.fly-mid {
  display: inline-block;
  height: 10px;
  width: 1px;
  margin: 0 10px;
  vertical-align: middle;
  background-color: #e2e2e2;
}

.fly-signin {
  cite {
    padding: 0 5px;
    color: #ff5722;
    font-style: normal;
  }

  .layui-badge-dot {
    top: -7px;
    margin-left: 0px;
  }
}

.fly-signin-days {
  position: absolute;
  right: 15px;
  padding-left: 10px;
  color: #999;
}

.fly-signin-main span {
  padding-left: 10px;
}
</style>
