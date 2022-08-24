<template>
  <transition>
    <div
      v-show="isShow"
      class="layui-layer-page layui-layer-prompt edit-content"
    >
      <div class="layui-layer-title">输入代码或文本</div>
      <div class="layui-layer-content link_content">
        <textarea
          name="codeInput"
          placeholder="请贴入输入或任意文本"
          :style="{'width': this.width + 'px','height': this.height + 'px'}"
          class="layui-layer-input"
          id="codeInput"
          v-model="codeTxt"
        ></textarea>
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
  name: 'Code', // 插入代码块
  props: ['isShow', 'width', 'height'],
  data () {
    return {
      codeTxt: ''
    }
  },
  methods: {
    close () {
      // 触发关闭事件
      this.$emit('closeEvent')
      this.codeTxt = ''
    },
    submit () {
      if (this.codeTxt === '') {
        // 输入框 获取焦点
        document.getElementById('codeInput').focus()
        this.$pop('请输入代码或任意文本', 'shake')
        return
      }
      this.$emit('addCodeEvent', this.codeTxt)
      // 恢复初始的状态
      setTimeout(() => {
        this.close()
      }, 0)
    }
  }
}
</script>

<style>
</style>
