<template>
  <!-- 链接 -->
  <div class="links fly-panel fly-link">
    <h3 class="fly-panel-title">友情链接</h3>
    <dl class="fly-panel-main">
      <dd
        v-for="(item,index) in lists"
        :key="index"
      >
        <a
          :href="item.link"
          target="_blank"
        >{{item.title}}</a>
      <dd>
      <dd><a
          href="#"
          class="fly-link"
        >申请友链</a>
      </dd>
    </dl>
  </div>
</template>

<script>
import { getLinks } from '../../api/content'
export default {
  name: 'Links', // 链接
  data () {
    return {
      lists: []
    }
  },
  mounted () {
    getLinks().then(res => {
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

.fly-link dd {
  display: inline-block;
  margin-right: 10px;
  margin-bottom: 5px;
  vertical-align: top;
}
</style>
