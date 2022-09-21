<template>
  <transition name="message-fade">
    <div
      class="pop"
      :class="{'shake': type === 'shake'}"
      :style="computedStyle"
      v-if="isShow"
    >{{ msg }}</div>
  </transition>
</template>

<script>
export default {
  name: 'Mu-Pop', // pop 气泡弹框
  props: {
    // 弹框类型 ('' 默认；'shake' 摇摆)
    type: {
      type: String,
      default: ''
    },
    // 弹框提示信息
    msg: {
      type: String,
      default: '我是气泡弹框~'
    },
    // 显示时间
    time: {
      type: Number,
      default: 3000
    }
    // // 位置
    // top: {
    //   type: String,
    //   default: '15%'
    // }
  },
  data () {
    return {
      isShow: false, // 是否显示弹框
      verticalTop: 0 // 垂直方向的top距离
    }
  },
  watch: {
    isShow (newVal) {
      if (!newVal) {
        // 监听过度结束事件
        this.$el.addEventListener('transitionend', () => {
          // 销毁实例 (触发 beforeDestroy 和 destroyed 的钩子)
          this.$destroy()
        })
        // 触发close事件
        this.$emit('close')
      }
    }
  },
  computed: {
    computedStyle () {
      return {
        top: this.verticalTop + 'px'
      }
    }
  },
  mounted () {
    // 开启定时器
    this.startTimer()
    this.createElement()
  },
  beforeDestroy () {
    // 移除当前实例
    this.$el.parentNode.removeChild(this.$el)
  },
  methods: {
    // 开启定时器
    startTimer () {
      let timer = setTimeout(() => {
        this.isShow = false
      }, this.time)
      // 监听实例销毁
      this.$once('hook:beforeDestroy', () => {
        // 清除定时器
        clearTimeout(timer)
        timer = null
      })
    },
    // 创建元素
    createElement () {
      this.isShow = true
      // 添加实例到body
      document.body.appendChild(this.$el)
    }
  }
}
</script>

<style lang="scss" scoped>
.message-fade-enter,
.message-fade-leave-to {
  opacity: 0;
  transform: translateY(-100px);
}

.message-fade-enter-active,
.message-fade-leave-active {
  transition: opacity 0.5s, transform 0.5s;
}

// 摇摆
@keyframes shake {
  0%,
  100% {
    transform: translateX(-50%) translateY(-50%);
  }
  10%,
  30%,
  50%,
  70%,
  90% {
    transform: translateX(-45%) translateY(-50%);
  }
  20%,
  40%,
  60%,
  80% {
    transform: translateX(-55%) translateY(-50%);
  }
}

.shake {
  // color: hotpink !important;
  animation: shake 0.3s linear;
}

.pop {
  z-index: 999999;
  position: fixed;
  // top: 16px;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  transition: top 0.5s;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 15px;
  font-size: 16px;
  color: #fff;
  background: linear-gradient(60deg, #bb22cf 0%, #f50b8a 50%, #ede646 100%);
  border-radius: 5px;
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2);
}
</style>
