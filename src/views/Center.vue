<template>
  <div class="center layui-container">
    <!-- 左侧边导航 -->
    <ul
      class="layui-nav layui-nav-tree sidebar"
      lay-filter="test"
    >
      <li
        class="layui-nav-item layui-nav-itemed"
        v-for="(item,index) in lists"
        :key="index"
      >
        <router-link
          :to="{name: item.pathName}"
          :active-class="item.activeClass"
        >
          <i :class="['iconfont', item.icon]"></i>
          {{ item.name }}
        </router-link>
      </li>
    </ul>
    <!-- 右侧内容区域 -->
    <router-view class="right_box"></router-view>
  </div>
</template>

<script>
export default {
  name: 'Center', // 用户中心
  data () {
    return {
      lists: [
        {
          name: '我的主页',
          icon: 'icon-home',
          pathName: 'myHome'
        },
        {
          name: '用户中心',
          icon: 'icon-morentouxiang',
          pathName: 'center'
        },
        {
          name: '我的消息',
          icon: 'icon-xiaoxi3',
          pathName: 'msg'
        },
        {
          name: '我的帖子',
          icon: 'icon-wendang',
          pathName: 'my_post',
          activeClass: 'layui-this'
        },
        {
          name: '基本设置',
          icon: 'icon-shezhi',
          pathName: 'myinfo',
          activeClass: 'layui-this'
        },
        {
          name: '其它设置',
          icon: 'icon-042fangkuai',
          pathName: 'others'
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../css/layuiReset.scss';

.center {
  display: flex;
  padding: 0;

  .sidebar {
    min-height: var(--minHeight);
    padding: 15px 0;

    .layui-nav-item {
      a {
        display: flex;
        align-items: center;
        padding: 10px 20px;
        font-size: 16px;
        &:hover {
          background: rgba(255, 255, 255, 0.1);
          color: var(--themeColor) !important;
          transition: all 0.3s !important;
        }

        .iconfont {
          margin-right: 5px;
          vertical-align: top;
          font-size: 18px;
        }
      }
    }
  }

  .right_box {
    flex: 1;
    margin: 10px 15px;
  }
}
</style>
