<template>
  <!-- 头部导航 -->
  <header>
    <div class="header_box">
      <div class="logo">慕龍科技</div>
      <nav>
        <!-- <a href="#/home">首页</a> -->
        <router-link to="/">首页</router-link>
        <router-link to="/addPost">发帖</router-link>
        <a href="#about_us">关于我们</a>
        <a href="#succeess_case">成功案例</a>
        <a href="#team_intro">团队介绍</a>
        <a href="#activity">公司动态</a>
        <!-- <router-link :to="{name: '404'}">404</router-link> -->
        <router-link to="/user0/666">404</router-link>
        <!-- 搜索 -->
        <i class="iconfont icon-ai219"></i>
      </nav>
      <!-- 用户信息 -->
      <ul
        class="layui-nav fly-nav-user user"
        lay-bar="disabled"
      >
        <!-- 未登入的状态 -->
        <template v-if="!isShow">
          <li class="layui-nav-item">
            <router-link to="/login">登录</router-link>
          </li>
          <li class="layui-nav-item">
            <router-link :to="{name:'logon'}">注册</router-link>
          </li>
          <!-- <span class="layui-nav-bar"></span> -->
        </template>
        <!-- 登入后的状态 -->
        <template v-else>
          <li
            class="layui-nav-item userInfo_box"
            @mouseenter='mouse_enter()'
            @mouseleave='mouse_out()'
          >
            <!-- 消息提示 -->
            <div
              class="fly-nav-msg"
              v-show="num.message && num.message !== 0"
            >{{ num.message }}</div>
            <transition name="fade">
              <div
                class="layui-layer-tips"
                v-show="hasMsg"
              >
                <div class="layui-layer-content">
                  <span>您有{{ num.message }}条未读消息</span>
                  <i class="layui-layer-TipsG layui-layer-TipsB"></i>
                </div>
              </div>
            </transition>
            <a
              href="javascript:;"
              class="fly-nav-avatar"
            >
              <cite class="userName layui-hide-xs">{{ userInfo.username }}</cite>
              <i
                class="iconfont icon-vrenzhengguanli layui-hide-xs approve"
                title="认证信息"
              ></i>
              <i
                class="layui-badge fly-badge-vip layui-hide-xs"
                v-if="userInfo.isVip !== 0"
              >VIP</i>
              <img
                :src="userInfo.pic"
                alt="头像"
              >
              <span class="layui-nav-more"></span>
            </a>
            <!-- 下拉菜单 -->
            <dl
              class="layui-nav-child layui-anim layui-anim-downbit pull_down_menu"
              :class="{'layui-show': isShowMenu}"
            >
              <dd>
                <router-link :to="{name: 'myinfo'}">
                  <i class="iconfont icon-shezhi"></i>
                  <span>基本设置</span>
                </router-link>
              </dd>
              <dd>
                <router-link :to="{name: 'msg'}">
                  <i
                    class="iconfont icon-xiaoxi3"
                    style="top: 4px;"
                  ></i>
                  <span>我的消息</span>
                </router-link>
              </dd>
              <dd>
                <router-link to="/center">
                  <i class="iconfont icon-home"></i>
                  <span>我的主页</span>
                </router-link>
              </dd>
              <hr style="margin: 5px 0;">
              <dd>
                <a
                  href="javascript:;"
                  @click="logout()"
                >
                  <i class="iconfont icon-tuichu"></i>
                  <span>退出</span>
                </a>
              </dd>
            </dl>
          </li>
        </template>
      </ul>
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
import { mapState } from 'vuex'

export default {
  name: 'Header',
  data () {
    return {
      isShowMenu: false,
      hoverCtrl: {}, // 存放定时器
      hasMsg: false // 是否有消息
    }
  },
  watch: {
    num (newVal, oldVal) {
      // console.log('newVal, oldVal ==> ', newVal, oldVal)
      if (newVal.event && newVal.message !== oldVal.message) {
        // 判断消息数量，决定是否显示消息提示框
        if (newVal.message && newVal.message > 0) {
          this.hasMsg = true
          setTimeout(() => {
            this.hasMsg = false
          }, 2000)
        }
      }
    }
  },
  computed: {
    ...mapState({
      num: state => state.num
    }),
    // 相当于 ==>
    // num () {
    //   return this.$store.state.num
    // },
    isShow () {
      return this.$store.state.isLogin || false
    },
    userInfo () {
      return this.$store.state.userInfo || {
        username: '',
        pic: '',
        isVip: 0
      }
    }
  },
  methods: {
    logout () {
      this.$confirm('确定要退出吗？', () => {
        // 清空本地 localStorage中的数据
        localStorage.clear()
        // 刷新当前页面，清空vuex中的数据
        window.location.replace('/')
        // 跳转到首页，解决重复导航报错
        // this.$router.push('/').catch()
      })
    },
    // 鼠标移入
    mouse_enter () {
      // 清除定时器
      clearTimeout(this.hoverCtrl)
      this.hoverCtrl = setTimeout(() => {
        console.log('enter')
        this.isShowMenu = true
      }, 300)
    },
    // 鼠标移出
    mouse_out () {
      clearTimeout(this.hoverCtrl)
      // 设置定时器，延迟消失
      this.hoverCtrl = setTimeout(() => {
        console.log('out')
        this.isShowMenu = false
      }, 300)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../css/reset.css';

header {
  .header_box {
    position: relative;
    z-index: 99999;
    width: 100vw;
    min-height: 80px;
    // line-height: 80px;
    padding: 0 40px;
    background: var(--bgColor);
    display: grid; /* 显示方式 网格 */
    grid-template-rows: 1fr; /* 网格模板行高 */
    grid-template-columns: 1fr 3fr 1fr; /* 网格模板列宽 */
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
        display: inline-block;
        // margin: 0 24px;
        padding: 20px;
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

    .fly-nav-user {
      justify-self: center;

      .fly-nav-msg {
        position: absolute;
        top: 50%;
        left: -18px;
        height: 20px;
        line-height: 20px;
        margin-top: -10px;
        padding: 0 6px;
        background-color: #ff7200;
        color: #fff;
        border-radius: 2px;

        &:hover {
          color: #fff;
        }
      }

      .layui-layer-tips {
        position: absolute;
        white-space: nowrap;
        right: 38px;
        top: 50px;
        z-index: 9999;
      }

      .layui-nav-bar {
        display: none !important;
      }

      a {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 0 10px;
        font-size: 18px;
        color: var(--textColor-light);
        overflow: hidden;
        &:hover {
          color: var(--themeColor);
        }

        .fly-badge-vip {
          margin: 0 5px;
        }
      }

      .layui-this {
        &:after {
          display: none;
        }
      }

      .fly-nav-avatar {
        .layui-badge {
          position: unset;
        }
        .userName {
          font-size: 15px;
        }
        .approve {
          margin-left: 5px;
          vertical-align: middle;
          font-size: 20px;
          color: #ffb800;
        }
        img {
          width: 36px;
          height: 36px;
          margin-left: 10px;
          border-radius: 100%;
        }
        .layui-nav-more {
          display: none !important;
        }
      }

      .layui-nav-child {
        left: auto;
        right: 0;
        width: 120px;
        min-width: 0;

        a {
          display: block;
          text-align: center;
          font-weight: 600;
          font-size: 18px;
          color: #999;
          &:hover {
            color: var(--themeColor);
          }

          .iconfont {
            margin-right: 5px;
            vertical-align: middle;
            font-weight: normal;
            font-size: 20px;
          }
        }
      }
    }

    .burger {
      display: none;
    }
  }
}
</style>
