<template>
  <transition>
    <div
      v-show="isShow"
      class="layui-layer-page layui-layer-prompt edit-content"
      ref="linkBox_ref"
    >
      <div class="layui-layer-title">插入链接</div>
      <div class="layui-layer-content link_content">
        <div class="layui-form-item item">
          <label
            class="layui-form-label"
            for="linkTitle"
          >标题：</label>
          <!-- 输入框 -->
          <input
            type="text"
            placeholder="请输入链接标题"
            class="layui-layer-input"
            id="linkTitle"
            v-model.trim="linkTitle"
          >
        </div>
        <div class="layui-form-item item">
          <label
            class="layui-form-label"
            for="linkUrl"
          >链接</label>
          <!-- 输入框 -->
          <input
            type="text"
            placeholder="请输入合法链接"
            class="layui-layer-input"
            id="linkUrl"
            v-model.trim="linkUrl"
          >
        </div>
      </div>
      <!-- 按钮 -->
      <div class="layui-layer-btn">
        <a
          class="layui-layer-btn0"
          @click.prevent="submit()"
        >确定</a>
        <a
          class="layui-layer-btn"
          @click.prevent="close()"
        >取消</a>
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
export default {
  name: 'AddLink', // 添加链接
  props: ['isShow'],
  data () {
    return {
      linkTitle: '',
      linkUrl: ''
    }
  },
  methods: {
    close () {
      // 触发关闭事件
      this.$emit('closeEvent')
      this.linkTitle = ''
      this.linkUrl = ''
    },
    submit () {
      if (this.linkTitle === '') {
        // 输入框 获取焦点
        document.getElementById('linkTitle').focus()
        this.$pop({ msg: '请输入链接标题', type: 'shake' })
        return
      }
      if (this.linkUrl === '') {
        // 输入框 获取焦点
        document.getElementById('linkUrl').focus()
        this.$pop({ msg: '请输入合法的链接', type: 'shake' })
        return
      }
      this.$emit('addLinkEvent', {
        title: this.linkTitle,
        link: this.linkUrl
      })
      // 恢复初始的状态
      setTimeout(() => {
        this.close()
      }, 0)
    }
  }
}
</script>

<style lang="scss" scoped>
.edit-content {
  position: relative;
  width: 465px;

  .link_content {
    .item {
      display: flex;
      justify-content: center;
      align-items: center;
    }

    label {
      width: 100px;
      text-align: center;
    }

    #linkTitle,
    #linkUrl {
      width: 100%;
    }
  }
}
</style>
