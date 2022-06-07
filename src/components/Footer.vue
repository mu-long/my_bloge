<template>
  <!-- 底部区域 -->
  <footer>
    <div class="menus_box">
      <!-- 联系信息 -->
      <div class="contact_us">
        <h3 class="title">联系我们</h3>
        <p class="address">
          <i class="iconfont icon-dizhi"></i>地址：中国XX省XX市XX路XX商务中心8号楼
        </p>
        <p class="phone">
          <i class="iconfont icon-dianhua"></i>电话：+86 18566688899
        </p>
        <p class="fax">
          <i class="iconfont icon-icon"></i>传真：+86 18566688899
        </p>
        <p class="email">
          <i class="iconfont icon-youxiang"></i>电子邮箱：admin@xxx.com
        </p>
      </div>
      <!-- 导航菜单 -->
      <div class="service_menu">
        <h3 class="title">服务概览</h3>
        <ul class="menus">
          <li class="item"><a href="javascript:;">网站建设</a></li>
          <li class="item"><a href="javascript:;">域名购买</a></li>
          <li class="item"><a href="javascript:;">网页设计</a></li>
          <li class="item"><a href="javascript:;">移动应用</a></li>
        </ul>
      </div>
      <div class="service_menu">
        <h3 class="title">成功案例</h3>
        <ul class="menus">
          <li class="item"><a href="javascript:;">桌面网站</a></li>
          <li class="item"><a href="javascript:;">移动网站</a></li>
          <li class="item"><a href="javascript:;">科研项目</a></li>
          <li class="item"><a href="javascript:;">软件应用</a></li>
        </ul>
      </div>
      <div class="service_menu">
        <h3 class="title">公司动态</h3>
        <ul class="menus">
          <li class="item"><a href="javascript:;">信息公开</a></li>
          <li class="item"><a href="javascript:;">最近新闻</a></li>
          <li class="item"><a href="javascript:;">最新博客</a></li>
        </ul>
      </div>
      <div class="service_menu">
        <h3 class="title">帮助与支持</h3>
        <ul class="menus">
          <li class="item"><a href="javascript:;">帮助中心</a></li>
          <li class="item"><a href="javascript:;">联系客服</a></li>
          <li class="item"><a href="javascript:;">文档资源</a></li>
        </ul>
      </div>
      <!-- 备案信息 -->
      <p class="icp_info">京ICP备 12345678906-8 号</p>
      <!-- 版权信息 -->
      <p class="rights">&copy; 2021 慕龍科技 - 响应式网络公司官网 版权所有</p>
      <!-- 返回顶部按钮 -->
      <div class="scrollToTop">
        <a href="#home"><i class="iconfont icon-huidingbu"></i></a>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'Footer'
}
</script>

<style lang="scss" scoped>
footer {
  margin-top: 120px;
  padding: 72px 0 24px;
  background: var(--textColor-darker);
  color: #fff;
  display: grid;
  justify-items: center;

  .menus_box {
    width: 100%;
    // min-width: 1226px;
    padding: 0 80px;
    display: grid;
    grid-template-columns: 2fr repeat(4, 1fr);
    row-gap: 20px;

    h3.title {
      font-size: 16px;
      font-weight: 500;
      margin-bottom: 20px;
    }

    // 联系我们
    .contact_us {
      justify-self: start; // 靠左对齐

      p {
        padding-bottom: 15px;
        i.iconfont {
          margin-right: 5px;
        }
      }
    }

    .service_menu {
      justify-self: end; // 靠右对齐

      ul.menus {
        li.item {
          padding-bottom: 8px;
          a {
            font-weight: 300;
            color: var(--textColor-light);
            &:hover {
              color: var(--themeColor);
            }
          }
        }
      }
    }

    p.icp_info,
    p.rights {
      // 占满整行，-1代表最后一个编号
      grid-column: 1 / -1;
      justify-self: center;
    }

    .scrollToTop {
      transition: all 0.3s;
      opacity: 0;
      a {
        position: fixed;
        right: 30px;
        bottom: 60px;
        z-index: 990;
        width: 32px;
        height: 32px;
        border-radius: 4px;
        background: var(--themeColor);
        color: #fff;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
  }
}
</style>
