<template>
  <transition name="fade">
    <div
      v-show="isShow"
      class="layui-layer-tips layui-edit-face edit-content"
      ref="imgBox_ref"
    >
      <div class="layui-layer-title">插入图片</div>
      <div class="layui-layer-content">
        <ul class="layui-form layui-form-pane">
          <li class="layui-form-item img_upload">
            <label class="layui-form-label url_label">URL</label>
            <input
              type="text"
              placeholder="粘贴图片地址或者点击上传"
              class="layui-input"
              id="fileInput"
              v-model.trim="imgUrl"
            >
            <!-- 选择文件上传 -->
            <button
              type="button"
              class="layui-btn layui-btn-primary"
            >
              <label
                for="uploadImg"
                style="cursor: pointer;display: block;"
              >
                <i class="layui-icon layui-icon-upload"></i>上传图片
              </label>
              <input
                type="file"
                name="post_img"
                accept="image/jpg,image/png,image/gif"
                class="layui-upload-file"
                id="uploadImg"
                @change="upload"
              >
            </button>
          </li>
          <!-- 确认按钮 -->
          <li class="layui-form-item confirm_box">
            <button
              type="button"
              class="layui-btn"
              @click="submit()"
            >确认</button>
          </li>
        </ul>
      </div>
      <!-- 关闭按钮 -->
      <span
        class="layui-layer-setwin close_btn"
        @click.stop="close()"
      >
        <a
          href="javascript:;"
          class="layui-layer-ico layui-layer-close layui-layer-close1"
        ></a>
      </span>
    </div>
  </transition>
</template>

<script>
import { uploadImg } from '@/api/user'
import { baseURL } from '@/config'

export default {
  name: 'ImgUpload', // 上传图片
  props: ['isShow'],
  data () {
    return {
      imgUrl: '',
      formData: ''
    }
  },
  methods: {
    close () {
      // 触发关闭事件
      this.$emit('closeEvent')
      this.imgUrl = ''
      this.formData = ''
    },
    async upload (e) {
      console.log('e ==>', e)
      const file = e.target.files
      const formData = new FormData()
      if (file.length > 0) {
        formData.append('post_img', file[0])
        this.formData = formData
      }
      // 上传图片
      await uploadImg(this.formData).then(res => {
        if (res.code === 200) {
          console.log('上传图片 ==> ', res)
          this.$pop({ msg: '图片上传成功！' })

          const baseurl =
            process.env.NODE_ENV === 'production'
              ? baseURL.pro
              : baseURL.dev
          // 拼接图片服务器路径
          this.imgUrl = baseurl + res.data.filePath

          // 清空input信息，方便下次选择
          document.getElementById('uploadImg').value = ''
        } else {
          this.$pop({ msg: '图片上传失败！' })
        }
      })
    },
    submit () {
      if (this.imgUrl === '') {
        // 输入框 获取焦点
        document.getElementById('fileInput').focus()
        this.$pop({ msg: '请上传图片或者复制图片链接', type: 'shake' })
        return
      }
      this.$emit('addImgEvent', this.imgUrl)
      // 恢复初始的状态
      setTimeout(() => {
        this.imgUrl = ''
        this.formData = ''
        // 触发关闭事件
        this.$emit('closeEvent')
      }, 0)
    }
  }
}
</script>

<style lang="scss" scoped>
.layui-layer-content {
  background: #fff;
}

.edit-content {
  position: relative;
  width: 465px;
}

.img_upload {
  display: flex;
  justify-content: center;
  align-items: center;

  .url_label {
    width: 100px;
    text-align: center;
    color: #000;
  }

  #fileInput {
    margin-right: 10px;
  }
}

.confirm_box {
  padding-top: 10px;
  text-align: center;

  button {
    width: 160px;
  }
}

.close_btn {
  position: absolute;
  right: 15px;
  top: 17px;
}
</style>
