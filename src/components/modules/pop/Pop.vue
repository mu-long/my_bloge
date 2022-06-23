<template>
  <div
    class="pop modal_content"
    :class="{'shake': type === 'shake'}"
    v-show="isShow"
  >{{msg}}</div>
</template>

<script>
export default {
  name: 'Pop', // pop 气泡弹框
  props: {
    // 弹框类型
    // '' 默认；'shake' 摇摆
    type: {
      type: String,
      default: ''
    },
    // 弹框提示信息
    msg: {
      type: String,
      default: ''
    },
    // 是否显示弹框
    isShow: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    isShow (newVal, oldVal) {
      if (newVal !== oldVal && newVal === true) {
        setTimeout(() => {
          this.isShow = false
          this.msg = ''
          this.type = ''
        }, 3000)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../../css/reset.css';

// 摇摆
@keyframes shake {
  0%,
  100% {
    // transform: translateX(0);
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

.pop {
  top: 15%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-width: 180px;
  padding: 8px 15px;
  background: linear-gradient(60deg, #bb22cf 0%, #f50b8a 50%, #ede646 100%);
  font-size: 16px;
  color: #fff;
}

.shake {
  animation: shake 0.3s linear;
}
</style>
