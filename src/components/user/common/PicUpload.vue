<template>
  <div class="layui-tab-item layui-show pic_upload">
    <!-- 修改头像 -->
    <div class="avatar-add">
      <p>建议尺寸168*168，支持jpg、png、gif，最大不能超过50KB</p>
      <button
        type="button"
        class="layui-btn upload_btn"
      >
        <i class="layui-icon">&#xe67c;</i>
        上传头像
      </button>
      <img src="https://tva1.sinaimg.cn/crop.0.0.118.118.180/5db11ff4gw1e77d3nqrv8j203b03cweg.jpg" />
      <span class="loading"></span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PicUpload' // 修改头像
}
</script>

<style lang="scss" scoped>
.avatar-add {
  position: relative;
  margin: 10px 0 0 20px;
  padding: 10px;
  width: 373px;
  height: 373px;
  background-color: #f2f2f5;
  text-align: center;

  p {
    padding-top: 10px;
    font-size: 12px;
    color: #999;
  }

  .upload_btn {
    margin: 30px 0;
  }

  img {
    margin: 0 auto;
    width: 168px;
    height: 168px;
    border-radius: 100%;
  }
}
</style>
