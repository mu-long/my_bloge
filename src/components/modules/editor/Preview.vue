<template>
  <transition>
    <div
      v-show="isShow"
      id="preview"
      class="layui-layer-page layui-layer-prompt edit-content"
    >
      <div class="layui-layer-title">预览</div>
      <div class="layui-layer-content content">
        <!-- 替换后的内容 -->
        <div
          class="detail_body"
          v-html="replaceContent"
        ></div>
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
import convertHtml from '@/utils/convertHtml'

export default {
  name: 'Preview', // 预览
  props: ['isShow', 'content'],
  data () {
    return {
    }
  },
  computed: {
    replaceContent () {
      // 根据content的内容，转义成为html代码
      if (typeof this.content === 'undefined' || this.content.trim() === '') return
      return convertHtml(this.content)
    }
  },
  methods: {
    close () {
      // 触发关闭事件
      this.$emit('closeEvent')
    }
  }
}
</script>

<style lang="scss" scoped>
#preview {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 999999;
  overflow-y: auto;
}
</style>
