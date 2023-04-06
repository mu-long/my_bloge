<template>
  <transition name="fade">
    <div
      v-show="isShow"
      class="layui-layer-tips layui-edit-face edit-content face_box"
    >
      <ul class="layui-clear">
        <li
          v-for="(value,key) in lists"
          :key="key"
          :title="key"
          @click="handleFaceClick(key)"
        >
          <img
            :src="value"
            alt="表情"
          >
        </li>
      </ul>
    </div>
  </transition>
</template>

<script>
import faces from '@/assets/js/face'

export default {
  name: 'Face', // 表情
  props: ['isShow'],
  data () {
    return {
      lists: faces
    }
  },
  methods: {
    // 处理点击表情
    handleFaceClick (item) {
      this.$emit('addFaceEvent', item)
      this.$emit('closeEvent')
    }
  }
}
</script>

<style lang="scss" scoped>
.face_box {
  position: relative;
  width: 372px;
  padding: 10px;

  li {
    cursor: pointer;
    float: left;
    height: 30px;
    width: 30px;
    margin: -1px 0 0 -1px;
    padding: 4px;
    border: 1px solid #e8e8e8;
    text-align: center;
    overflow: hidden;

    &:hover {
      position: relative;
      z-index: 2;
      border: 1px solid #eb7350;
      background: #fff9ec;
      & > img {
        transform: scale(1.2);
        transition: all 0.3s;
      }
    }
  }
}
</style>
