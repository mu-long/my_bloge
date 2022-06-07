<template>
  <!-- 头部导航 -->
  <header>
    <div class="header_box">
      <div class="logo">慕龍科技</div>
      <nav>
        <!-- 汉堡伸缩 -->
        <div class="burger">
          <div class="line line1"></div>
          <div class="line line2"></div>
          <div class="line line3"></div>
        </div>
        <a href="#home">首页</a>
        <a href="#about_us">关于我们</a>
        <a href="#succeess_case">成功案例</a>
        <a href="#team_intro">团队介绍</a>
        <a href="#activity">公司动态</a>
        <!-- 搜索 -->
        <i class="iconfont icon-ai219"></i>
      </nav>
      <!-- 汉堡伸缩 -->
      <div class="burger">
        <div class="line line1"></div>
        <div class="line line2"></div>
        <div class="line line3"></div>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: 'Header'
}
</script>

<style lang="scss" scoped>
@import '../css/reset.css';
header {
  height: 80px;
  .header_box {
    position: relative;
    z-index: 999;
    width: 100vw;
    height: 80px;
    padding: 0 40px;
    background: var(--bgColor);
    display: grid;
    grid-template-rows: 1fr;
    grid-template-columns: 1fr 2fr;
    align-items: center;
    color: var(--textColor-light);

    // 页面下滑时固定导航
    &.nav_fixed {
      position: fixed;
      top: 0;
      left: 0;
      background: #fff;
      box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
      color: var(--textColor-darker);

      nav a,
      nav i {
        color: var(--textColor-darker);
      }
      .burger {
        .line {
          background: var(--textColor-darker);
        }
      }
    }

    .logo {
      font-size: 24px;
      font-weight: 600;
    }

    nav {
      font-size: 18px;
      justify-self: end;

      a {
        margin: 0 24px;
        color: var(--textColor-light);
      }

      i.iconfont {
        margin: 0 24px;
        font-size: 23px;
        vertical-align: middle;
      }

      a:hover,
      i:hover {
        color: var(--themeColor);
      }
    }

    .burger {
      display: none;
    }
  }
}
</style>
