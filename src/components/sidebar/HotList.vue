<template>
  <!-- 热门列表 -->
  <dl class=" hotList fly-panel fly-list-one">
    <dt class="fly-panel-title">本周热议</dt>
    <dd>
      <a href="jie/detail.html">基于 layui 的极简社区页面模版</a>
      <span><i class="layui-icon layui-icon-dialogue"></i> 16</span>
    </dd>
    <dd>
      <a href="jie/detail.html">基于 layui 的极简社区页面模版</a>
      <span><i class="layui-icon layui-icon-dialogue"></i> 16</span>
    </dd>
    <dd>
      <a href="jie/detail.html">基于 layui 的极简社区页面模版</a>
      <span><i class="layui-icon layui-icon-dialogue"></i> 16</span>
    </dd>
    <dd>
      <a href="jie/detail.html">基于 layui 的极简社区页面模版</a>
      <span><i class="layui-icon layui-icon-dialogue"></i> 16</span>
    </dd>
    <dd>
      <a href="jie/detail.html">基于 layui 的极简社区页面模版</a>
      <span><i class="layui-icon layui-icon-dialogue"></i> 16</span>
    </dd>
    <dd>
      <a href="jie/detail.html">基于 layui 的极简社区页面模版</a>
      <span><i class="layui-icon layui-icon-dialogue"></i> 16</span>
    </dd>
    <dd>
      <a href="jie/detail.html">基于 layui 的极简社区页面模版</a>
      <span><i class="layui-icon layui-icon-dialogue"></i> 16</span>
    </dd>
    <dd>
      <a href="jie/detail.html">基于 layui 的极简社区页面模版</a>
      <span><i class="layui-icon layui-icon-dialogue"></i> 16</span>
    </dd>
    <dd>
      <a href="jie/detail.html">基于 layui 的极简社区页面模版</a>
      <span><i class="layui-icon layui-icon-dialogue"></i> 16</span>
    </dd>
    <dd>
      <a href="jie/detail.html">基于 layui 的极简社区页面模版</a>
      <span><i class="layui-icon layui-icon-dialogue"></i> 16</span>
    </dd>

    <!-- 无数据时 -->
    <!--
        <div class="fly-none">没有相关数据</div>
        -->
  </dl>
</template>

<script>
export default {
  name: 'HotList' // 热门列表
}
</script>

<style lang="scss" scoped>
@import '../../css/panel.scss';

.fly-list-one dd {
  margin: 0 15px;
  line-height: 26px;
  white-space: nowrap;
  overflow: hidden;
  list-style: decimal-leading-zero inside;
  *list-style-type: decimal inside;
  color: #009e94;

  &:last-child {
    padding-bottom: 5px;
  }

  a {
    max-width: 85%;
    margin-right: 5px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 14px;

    &:hover {
      color: #009688;
      transition: all 0.3s;
    }
  }

  span {
    font-size: 12px;
    color: #ccc;
  }
}
</style>
