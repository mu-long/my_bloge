<template>
  <!-- 小贴士 -->
  <div class="tips fly-panel">
    <h3 class="fly-panel-title">温馨通道</h3>
    <ul class="fly-panel-main fly-list-static">
      <li
        v-for="(item,index) in lists"
        :key="'i' + index"
      >
        <a
          :href="item.link"
          :title="item.title"
          target="_blank"
        >{{ item.title }}</a>
      </li>
      <li><a href>vue</a></li>
      <li><a href>layui</a></li>
    </ul>
  </div>
</template>

<script>
import { getTips } from '../../api/content'
export default {
  name: 'Tips', // 温馨通道
  data () {
    return {
      lists: []
    }
  },
  mounted () {
    getTips().then(res => {
      console.log('温馨通道数据：', res)
      if (res.code === 200) {
        this.lists = res.data
      }
    })
  }
}
</script>

<style lang="scss" scoped>
@import '../../css/panel.scss';
</style>
