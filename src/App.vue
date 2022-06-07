<template>
  <div id="app">
    <Header />
    <router-link :to='{name: "login"}'>login</router-link>
    <router-link to='/logon'>logon</router-link>
    <router-link to='/test'>test</router-link>
    <router-view></router-view>
    <Footer />
  </div>
</template>

<script>
// import './assets/layui/layui'
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
export default {
  name: 'app',
  components: {
    Header,
    Footer
  }
}
</script>

<style lang="scss">
@import './css/reset.css';
// 引入 layui.css
@import './assets/layui/css/layui.css';
@import './assets/layui/css/modules/layer/default/layer.css';

html,
body {
  width: 100%;
  // height: 100%;
  min-height: 100vh;
}

#app {
  width: 100%;
  // height: 100%;
  // background: var(--minorColor);
  background: linear-gradient(60deg, #bb22cf 0%, #f50b8a 50%, #ede646 100%);
}
</style>
