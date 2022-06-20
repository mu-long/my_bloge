<template>
  <div class="layui-tab-item layui-show">
    <!-- 我的收藏 -->
    <table class="layui-table">
      <thead>
        <tr class="text_center">
          <th>帖子标题</th>
          <th>收藏时间</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr class="text_center">
          <td>测试标题</td>
          <td>2022-11-28 00:00:00</td>
          <td>
            <div class="layui-btn layui-btn-xs layui-btn-danger">删除</div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'MyCollection' // 我的收藏
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
