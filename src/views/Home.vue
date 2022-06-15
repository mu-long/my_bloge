<template>
  <div class="home">
    <!-- 面板 -->
    <Panel />
    <router-view></router-view>
  </div>
</template>

<script>
import Panel from '../components/Panel.vue'

export default {
  name: 'Home',
  components: {
    Panel // 面板
  }
}
</script>

<style lang="scss" scoped>
</style>
