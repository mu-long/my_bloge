<template>
  <!-- vue 具名 动画 -->
  <transition name="slide">
    <div v-show="isShow">
      <!-- 迷你的弹框 -->
      <div
        class="alert_mini modal_content"
        v-if="type === 'mini' "
      >
        <!-- 提示信息 -->
        <div class="msg">{{ msg }}</div>
      </div>
      <!-- 丰富的弹框 -->
      <div
        v-else
        class="alert_rich modal_content"
      >
        <!-- 提示信息 -->
        <div class="msg">{{ msg }}</div>
        <!-- 按钮 -->
        <div class="btn">
          <!-- 信息弹框 -->
          <div
            class="alert"
            v-if="type === 'alert' "
          >
            <div
              class="btnCommont sure"
              @click="sureEvent()"
            >确定</div>
          </div>
          <!-- 确认弹框 -->
          <div
            v-else
            class="confirm"
          >
            <div
              class="btnCommont sure"
              @click="sureEvent()"
            >确定</div>
            <div
              class="btnCommont cancel"
              @click="cancelEvent()"
            >取消</div>
          </div>
        </div>
      </div>
      <!-- 遮罩 -->
      <div
        v-show="type !== 'mini' "
        class="mask"
        @click="closeMask()"
      ></div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'Alert',
  emits: ['changeShow'],
  props: {
    // 是否显示弹框
    isShow: {
      type: Boolean,
      default: false
    },
    // 弹框类型
    // alert 默认提示信息，带按钮；mini 迷你的，只提示信息；confirm 确认弹框
    type: {
      type: String,
      default: 'alert'
    },
    // 弹框提示信息
    msg: {
      type: String,
      default: '我是标题' // 我是标题
    },
    // 倒计时
    time: {
      type: Number,
      default: 0 // 单位s 秒
    },
    sure: {
      type: Function,
      default: () => console.log('点击了确定 sure')
    },
    cancel: {
      type: Function,
      default: () => console.log('点击了取消 cancel')
    }
  },
  updated () {
    console.log('updated')
    if (this.type === 'mini' && this.time !== 0) {
      console.log('倒计时', this.time)
      setTimeout(() => {
        this.isShow = false
        console.log('倒计时结束，提示关闭了')
      }, this.time * 1000)
    }
  },
  methods: {
    close () {
      console.log('点击了关闭')
      this.isShow = false
      // this.$emit('changeShow')
    },
    // 关闭遮罩
    closeMask () {
      if (this.type === 'alert') {
        this.close()
      }
    },
    sureEvent () {
      this.sure()
      this.close()
    },
    cancelEvent () {
      this.cancel()
      this.close()
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../../css/reset.css';
$btn-main: #1e90ff;
$btn-dark: darken($btn-main, 10%);

.alert_mini,
.alert_rich {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  // vue 滑动 动画
  &.slide-enter-active,
  &.slide-leave-active {
    top: 0;
    transition: all 0.5s;
  }
  &.slide-enter,
  &.slide-leave-to {
    top: -100%;
  }
}

.alert_mini {
  top: 15%;
  padding: 8px 15px;
  min-width: 180px;
  background: linear-gradient(60deg, #bb22cf 0%, #f50b8a 50%, #ede646 100%);
  font-size: 16px;
  color: #fff;
}

.alert_rich {
  top: 50%;
  width: 400px;
  height: 220px;
  padding: 40px 20px;

  .msg {
    flex: 1;
    font-size: 18px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .btn {
    width: 100%;

    .alert {
      display: flex;
      justify-content: center;
    }

    .confirm {
      display: flex;
      justify-content: space-evenly;
    }

    .btnCommont {
      width: 105px;
      height: 32px;
      text-align: center;
      border-radius: 5px;
      color: #fff;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;

      &.sure {
        background: $btn-main;

        &:hover {
          background: $btn-dark;
        }
      }
      &.cancel {
        border: 1px solid #ddd;
        color: #000;
      }
    }
  }
}
</style>
