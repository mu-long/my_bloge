<template>

  <div class="layui-tab-item layui-show accounts">
    <!-- 账号绑定 -->
    <ul class="app_bind">
      <li class="fly-msg app-havebind">
        <i class="iconfont icon-QQ"></i>
        <span>已成功绑定，您可以使用QQ帐号直接登录Imooc社区，当然，您也可以</span>
        <a
          href="javascript:;"
          class="acc-unbind"
          type="qq_id"
        >解除绑定</a>

        <!-- <a href="" onclick="layer.msg('正在绑定微博QQ', {icon:16, shade: 0.1, time:0})" class="acc-bind" type="qq_id">立即绑定</a>
                <span>，即可使用QQ帐号登录Imooc社区</span> -->
      </li>
      <li class="fly-msg">
        <i class="iconfont icon-weibo"></i>
        <!-- <span>已成功绑定，您可以使用微博直接登录Imooc社区，当然，您也可以</span>
                <a href="javascript:;" class="acc-unbind" type="weibo_id">解除绑定</a> -->

        <a
          href=""
          class="acc-weibo"
          type="weibo_id"
          onclick="layer.msg('正在绑定微博', {icon:16, shade: 0.1, time:0})"
        >
          立即绑定
        </a>
        <span>，即可使用微博帐号登录Imooc社区</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Accounts' // 账号绑定
}
</script>

<style lang="scss" scoped>
.app_bind {
  li {
    color: #333;
    margin-bottom: 10px;
    line-height: 30px;
    background-color: #f8f8f8;
    padding: 10px 15px;

    .iconfont {
      margin-right: 3px;
      font-size: 20px;
      vertical-align: bottom;
      .icon-QQ {
        color: #7ca9c9;
      }
    }

    a {
      color: #4f99cf;
    }
  }
}
</style>
