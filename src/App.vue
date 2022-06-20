<template>
  <div id="app">
    <Header />
    <router-view></router-view>
    <Footer />
  </div>
</template>

<script>
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
@import './iconfont/iconfont.css';
@import './css/reset.css';
/* .pd0 {
  padding: 0px;
} */
$num: 10px;
// 0到6，不包含6
@for $i from 0 to 6 {
  .pd#{$i} {
    padding: $i * $num;
  }
  .pdt#{$i} {
    padding-top: $i * $num;
  }
  .pdb#{$i} {
    padding-bottom: $i * $num;
  }
  .pdl#{$i} {
    padding-left: $i * $num;
  }
  .pdr#{$i} {
    padding-right: $i * $num;
  }

  .mg#{$i} {
    margin: $i * $num;
  }
  .mgt#{$i} {
    margin-top: $i * $num;
  }
  .mgb#{$i} {
    margin-bottom: $i * $num;
  }
  .mgl#{$i} {
    margin-left: $i * $num;
  }
  .mgr#{$i} {
    margin-right: $i * $num;
  }
}

html,
body {
  width: 100vw;
  // height: 100%;
  min-height: 100vh;
}

#app {
  width: 100vw;
  // background: var(--minorColor);
  background: linear-gradient(60deg, #bb22cf 0%, #f50b8a 50%, #ede646 100%);
}
</style>
