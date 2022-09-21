<template>
  <div class="layui-tab-item layui-show pic_upload">
    <!-- 修改头像 -->
    <div class="avatar-add">
      <p>建议尺寸168*168，支持jpg、png、gif，最大不能超过1024KB！</p>
      <form
        method="post"
        enctype="multipart/form-data"
      >
        <label
          type="button"
          class="layui-btn upload_btn"
        >
          <i class="layui-icon">&#xe67c;</i>
          上传头像
          <!-- 文件上传 -->
          <input
            id="pic"
            type="file"
            name="avatar"
            accept="image/jpg,image/png,image/gif"
            @change="uploadPic"
          >
        </label>
      </form>
      <img :src="pic" />
      <span class="loading"></span>
    </div>
  </div>
</template>

<script>
import { uploadImg, updateUserInfo } from '@/api/user'
import { baseURL } from '@/config'

export default {
  name: 'PicUpload', // 修改头像
  data () {
    return {
      pic: this.$store.state.userInfo.pic || '/img/avatar/默认男头.png',
      formData: ''
    }
  },
  methods: {
    async uploadPic (e) {
      const file = e.target.files
      console.log('e.target ==> ', e.target)
      console.log('file ==> ', file)
      const formData = new FormData()
      if (file.length > 0) {
        // 通过FormData将文件转成二进制数据
        // 字段名'avatar'要和服务端的名字对应
        formData.append('avatar', file[0])
        this.formData = formData
      }

      // 上传图片
      await uploadImg(formData).then((res) => {
        if (res.code === 200) {
          console.log('上传图片 ==> ', res)
          this.$pop({ msg: '图片上传成功！' })

          const baseurl =
            process.env.NODE_ENV === 'production'
              ? baseURL.pro
              : baseURL.dev
          // 拼接图片服务器路径
          this.pic = baseurl + res.data.filePath

          // 更新用户基本资料 ==> updateUserInfo
          updateUserInfo({ pic: this.pic }).then(res2 => {
            if (res2.code === 200) {
              // 更新本地资料
              const user = this.$store.state.userInfo
              user.pic = this.pic
              this.$store.commit('setUserInfo', user)
            }
          })
          // 清空input信息，方便下次选择
          document.getElementById('pic').value = ''
        } else {
          this.$pop({ msg: '图片上传失败！' })
        }
      })
    }
  }
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

  input {
    display: none;
  }

  img {
    margin: 0 auto;
    width: 168px;
    height: 168px;
    border-radius: 100%;
  }
}
</style>
