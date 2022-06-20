<template>
  <div class="layui-tab-item layui-show">
    <!-- 我的帖子 -->
    <table class="layui-table">
      <thead>
        <tr class="text_center">
          <th>帖子标题</th>
          <th>状态</th>
          <th>是否结帖</th>
          <th>发表时间</th>
          <th>数据</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr class="text_center">
          <td>测试标题</td>
          <td>打开</td>
          <td>未结帖</td>
          <td>2022-11-28</td>
          <td>10阅读/2回答</td>
          <td>
            <div class="layui-btn layui-btn-xs">编辑</div>
            <div class="layui-btn layui-btn-xs layui-btn-danger">删除</div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'MyPost' // 我的帖子
}
</script>

<style lang="scss" scoped>
.text_center {
  text-align: center;
}

thead tr th {
  text-align: center;
}
</style>
