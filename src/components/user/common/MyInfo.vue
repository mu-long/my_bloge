<template>
  <div class="layui-tab-item layui-show my_info">
    <form
      class="layui-form layui-form-pane"
      action=""
    >
      <div class="layui-form-item">
        <label class="layui-form-label">邮箱：</label>
        <div class="layui-input-block">
          <input
            type="text"
            name="title"
            required
            lay-verify="required"
            placeholder="请输入标题"
            autocomplete="off"
            class="layui-input"
          >
        </div>
      </div>
      <div class="layui-form-item">
        <label class="layui-form-label">昵称：</label>
        <div class="layui-input-block">
          <input
            type="text"
            name="title"
            required
            lay-verify="required"
            placeholder="请输入昵称"
            autocomplete="off"
            class="layui-input"
          >
        </div>
      </div>
      <div class="layui-form-item">
        <label class="layui-form-label">城市：</label>
        <div class="layui-input-block">
          <input
            type="text"
            name="title"
            required
            lay-verify="required"
            placeholder="请输入城市"
            autocomplete="off"
            class="layui-input"
          >
        </div>
      </div>
      <div class="layui-form-item layui-form-text">
        <label class="layui-form-label">个性签名：</label>
        <div class="layui-input-block">
          <textarea
            name="desc"
            placeholder="请输入个性签名"
            class="layui-textarea"
          ></textarea>
        </div>
      </div>
      <div class="layui-form-item">
        <div class="layui-input-block">
          <button
            class="layui-btn"
            lay-submit
            lay-filter="formDemo"
          >确认修改</button>
          <button
            type="reset"
            class="layui-btn layui-btn-primary"
          >重置</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: 'MyInfo' // 我的资料
}
</script>

<style>
</style>
