<template>
  <form
    action="http://localhost:3000/user/upload_img"
    method="POST"
    enctype="multipart/form-data"
  >
    <input
      type="file"
      name="file"
    >
    <button type="submit">提交</button>
  </form>
</template>

<script>
export default {
  name: 'test'
}
</script>

<style>
</style>
