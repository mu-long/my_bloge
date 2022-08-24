<template>
  <div class="panel">
    <div class="layui-container">
      <ul>
        <!-- layui-hide-* 定义不同设备下的隐藏类 xs 超小屏幕(手机)、sm 小屏幕(平板)、md 中等屏幕(电脑)、lg 大型屏幕 -->
        <!-- <li class="layui-hide-xs"><a href="/">首页</a></li> -->
        <router-link
          tag="li"
          v-for="(item,index) in lists"
          :key="'panel'+index"
          :to="item.path"
        >
          <a href="javascript:;">
            {{ item.name }}
            <span
              class="layui-badge-dot"
              v-if="item.isNew"
            ></span>
          </a>
        </router-link>
        <!-- 登录后显示 -->
        <template v-if="isLogin">
          <li class="layui-hide-xs"><span class="line"></span></li>
          <li class="layui-hide-xs"><a href="javascript:;">我的贴子</a></li>
          <li class="layui-hide-xs"><a href="javascript:;">我的收藏</a></li>
        </template>
      </ul>
      <div class="right layui-hide-xs">
        <span class="layui-icon layui-icon-search search"></span>
        <router-link
          class="layui-btn"
          to="/addPost"
        >发帖</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Panel', // 面板
  data () {
    return {
      isLogin: this.$store.state.isLogin, // 是否登录
      lists: [
        {
          name: '首页',
          path: '/index',
          isNew: false // 是否选中
        },
        {
          name: '提问',
          path: '/index/ask',
          isNew: false
        }, {
          name: '分享',
          path: '/index/share',
          isNew: false
        }, {
          name: '讨论',
          path: '/index/discuss',
          isNew: true
        }, {
          name: '建议',
          path: '/index/advise',
          isNew: false
        }, {
          name: '公告',
          path: '/index/notice',
          isNew: false
        }, {
          name: '动态',
          path: '/index/logs',
          isNew: false
        }
        // {
        //   name: '我的贴子',
        //   path: '/index/post',
        //   isNew: false
        // },
        // {
        //   name: '我的收藏',
        //   path: '/index/collect',
        //   isNew: false
        // }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/css/panel.scss';

/* 响应式布局 */
/* 宽度大于992px应用于PC端 */
@media screen and (min-width: 992px) {
}

/* 宽度介于768px与992px之间应用于ipad平板端 */
@media screen and (min-width: 768px) and (max-width: 992px) {
}

/* 宽度小于768px应用于手机移动端 */
@media screen and (max-width: 768px) {
  .panel {
    height: auto;

    ul {
      margin: 0 auto;
      li {
        width: 33.33%;
        text-align: center;
      }
    }
  }
}

.home {
  .panel {
    position: relative;
    z-index: 999;
    margin-bottom: 10px;
    border-radius: 2px;
    background: #fff;
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);

    .layui-container {
      min-height: 50px;
      line-height: 50px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    ul {
      // display: flex;
      // justify-content: center;
      // align-items: center;

      li {
        display: inline-block;
        padding: 0 20px;
        font-size: 16px;
        height: 100%;

        .line {
          display: inline-block;
          margin: 0 20px;
          vertical-align: middle;
          width: 1px;
          height: 15px;
          background: #e2e2e2;
        }
      }
    }

    .search {
      margin-right: 10px;
      vertical-align: middle;
      font-size: 18px;
      cursor: pointer;
      &:hover {
        color: var(--themeColor);
      }
    }

    .layui-btn {
      &:hover {
        color: #fff !important;
        opacity: 0.8;
      }
    }
  }
}
</style>
