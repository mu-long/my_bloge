<template>
  <!-- 签名 -->
  <div class="sign fly-panel fly-signin">
    <!-- 标题 -->
    <div class="fly-panel-title">
      签到
      <i class="fly-mid"></i>
      <a
        href="javascript:;"
        class="fly-link"
        id="LAY_signinHelp"
        @click="showInfo()"
      >说明</a>
      <i class="fly-mid"></i>
      <a
        href="javascript:;"
        class="fly-link"
        id="LAY_signinTop"
        @click="showTop()"
      >活跃榜<span class="layui-badge-dot"></span></a>
      <!-- <span class="fly-signin-days">已连续签到<cite>16</cite>天</span> -->
    </div>
    <!-- 内容 -->
    <div class="fly-panel-main fly-signin-main">
      <!-- 未签到状态 -->
      <template v-if="!isSign">
        <button
          class="layui-btn layui-btn-danger"
          id="LAY_signin"
          @click="sign()"
        >今日签到</button>
        <span v-show="count > 0">可获得<cite>{{ fav }}</cite>积分</span></template>
      <!-- 已签到状态 -->
      <template v-else>
        <button class="layui-btn layui-btn-disabled">今日已签到</button>
        <span>获得了<cite>{{ fav }}</cite>积分！</span>
      </template>
    </div>
    <p
      class="fly-signin-days"
      v-show="count > 0"
    >
      <span>已连续签到<cite>{{ count }}</cite>天！</span>
      <span>总积分:<cite>{{ favs }}</cite>。</span>
    </p>
    <!-- 签到说明 模态框 -->
    <div
      class="modal"
      v-show="isShow"
    >
      <div class="mask"></div>
      <div
        class="layui-layer layui-layer-page modal_content"
        :class="{'active': isShow}"
      >
        <div class="layui-layer-title">签到说明
          <i
            class="layui-icon layui-icon-close close_btn"
            @click="closeModal()"
          ></i>
        </div>
        <div class="layui-layer-content">
          <div class="layui-text">
            <blockquote class="layui-elem-quote">《签到获取积分规则》</blockquote>
            <table class="layui-table">
              <thead>
                <tr>
                  <th>连续签到天数</th>
                  <th>每天可获积分</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>&le;7</td>
                  <td>5</td>
                </tr>
                <tr>
                  <td>&gt;7</td>
                  <td>8</td>
                </tr>
                <tr>
                  <td>&ge;14</td>
                  <td>15</td>
                </tr>
                <tr>
                  <td>&ge;30</td>
                  <td>20</td>
                </tr>
              </tbody>
            </table>
            <div>
              <p class="hint">提示：如果签到中断，则重新计算！</p>
              <p class="warn">警告：禁止利用脚本程序签到，否则积分清理！</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 签到活跃榜 模态框 -->
    <div
      class="modal modal_top"
      v-show="isShowTop"
    >
      <div class="mask"></div>
      <div
        class="layui-layer layui-layer-page modal_content"
        :class="{'active': isShowTop}"
      >
        <div class="layui-layer-title">签到活跃榜 TOP
          <i
            class="layui-icon layui-icon-close close_btn"
            @click="closeModal()"
          ></i>
        </div>
        <div class="layui-layer-content">
          <div
            class="layui-tab layui-tab-brief"
            lay-filter="docDemoTabBrief"
          >
            <ul class="layui-tab-title">
              <li
                :class="{'layui-this': current === 0}"
                @click="choose(0)"
              >最新签到</li>
              <li
                :class="{'layui-this': current === 1}"
                @click="choose(1)"
              >今日最快</li>
              <li
                :class="{'layui-this': current === 2}"
                @click="choose(2)"
              >签到总榜</li>
            </ul>
            <div class="layui-tab-content pd0 user_box">
              <ul class="layui-tab-item layui-show">
                <li
                  class="user_item"
                  v-for="(item, index) in lists"
                  :key="index"
                >
                  <img
                    :src="item.img"
                    alt="头像"
                  >
                  <div class="user_info">
                    <span class="name">{{ item.name }}</span>
                    <div
                      class="time"
                      v-if="current !== 2"
                    >
                      签到于 {{ item.created }}
                    </div>
                    <div
                      class="count"
                      v-else
                    >
                      已连续签到<i>{{ item.count }}</i>天
                    </div>
                  </div>
                </li>
              </ul>
              <ul class="layui-tab-item layui-show">
                <li
                  class="user_item"
                  v-for="(item, index) in lists"
                  :key="index"
                >
                  <img
                    :src="item.img"
                    alt="头像"
                  >
                  <div class="user_info">
                    <span class="name">{{ item.name }}</span>
                    <div
                      class="time"
                      v-if="current !== 2"
                    >
                      签到于 {{ item.created }}
                    </div>
                    <div
                      class="count"
                      v-else
                    >
                      已连续签到<i>{{ item.count }}</i>天
                    </div>
                  </div>
                </li>
              </ul>
              <ul class="layui-tab-item layui-show">
                <li
                  class="user_item"
                  v-for="(item, index) in lists"
                  :key="index"
                >
                  <img
                    :src="item.img"
                    alt="头像"
                  >
                  <div class="user_info">
                    <span class="name">{{ item.name }}</span>
                    <div
                      class="time"
                      v-if="current !== 2"
                    >
                      签到于 {{ item.created }}
                    </div>
                    <div
                      class="count"
                      v-else
                    >
                      已连续签到<i>{{ item.count }}</i>天
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import { userSign } from '../../api/user'

export default {
  name: 'Sign', // 签名
  data () {
    return {
      isShow: false, // 是否显示 签到说明 模态框
      isShowTop: false, // 是否显示 签到活跃榜 模态框
      isLogin: this.$store.state.isLogin || false, // 是否登录
      isSign: false, // 是否签到
      favs: this.$store.state.userInfo.favs || 0,
      current: 0,
      lists: [
        {
          name: 'admin',
          count: 66,
          created: '2022-06-06 00:00:00',
          img: '/img/avatar/女孩01.png'
        }, {
          name: 'admin',
          count: 23,
          created: '2022-06-05 00:00:00',
          img: '/img/avatar/女孩02.png'
        }, {
          name: 'admin',
          count: 36,
          created: '2022-06-08 00:00:00',
          img: '/img/avatar/男孩01.png'
        }, {
          name: 'admin',
          count: 68,
          created: '2022-05-06 00:00:00',
          img: '/img/avatar/女孩04.png'
        }, {
          name: 'admin',
          count: 99,
          created: '2022-03-01 00:00:00',
          img: '/img/avatar/女孩05.png'
        }, {
          name: 'admin',
          count: 66,
          created: '2022-08-01 00:00:00',
          img: '/img/avatar/动漫01.png'
        }, {
          name: 'admin',
          count: 23,
          created: '2022-07-05 00:00:00',
          img: '/img/avatar/动漫02.png'
        }, {
          name: 'admin',
          count: 67,
          created: '2022-01-01 00:00:00',
          img: '/img/avatar/动漫03.png'
        }
      ]
    }
  },
  watch: {
    userInfo (newVal, oldVal) {
      if (newVal.isSign === true) {
        // this.nextSign()
        this.isSign = true
      } else {
        this.isSign = false
      }
    }
  },
  computed: {
    userInfo () {
      return this.$store.state.userInfo
    },
    // 连续签到天数
    count () {
      const { userInfo } = this.$store.state
      if (userInfo !== {} && userInfo.count !== 'undefined') {
        return userInfo.count
      } else {
        return 0
      }
    },
    // 本次签到积分
    fav () {
      const count = parseInt(this.count)
      let fav = 0
      // 连续签到的积分获取逻辑
      if (count <= 7) {
        fav = 5
      } else if (count > 7 && count < 14) {
        fav = 8
      } else if (count >= 14 && count < 30) {
        fav = 15
      } else if (count >= 30) {
        fav = 20
      }
      return fav
    }
  },
  mounted () {
    // 判断用户上一次签到时间和状态
    const isSign = this.$store.state.userInfo.isSign
    const lastSign = this.$store.state.userInfo.lastSign
    const newDate = moment().format('YYYY-MM-DD')
    const lastDate = moment(lastSign).format('YYYY-MM-DD')
    // 时间差
    const diff = moment(newDate).diff(moment(lastDate), 'days')
    // 如果用户上一次签到时间与当前签到时间，相差1天，允许签到
    if (diff > 0 && isSign) {
      this.isSign = false
    } else {
      this.isSign = isSign
    }
  },
  methods: {
    showInfo () {
      this.isShow = true
    },
    showTop () {
      this.isShowTop = true
    },
    closeModal () {
      this.isShow = false
      this.isShowTop = false
    },
    choose (val) {
      this.current = val
    },
    sign () {
      console.log('点击了签到')
      if (!this.isLogin) {
        return this.$pop({ msg: '请先登录！', type: 'shake' })
      }
      userSign().then(res => {
        const { userInfo } = this.$store.state
        if (res.code === 200) {
          this.$pop({ msg: '签到成功！' })
          this.isSign = true
          userInfo.isSign = true
          userInfo.lastSign = res.lastSign
          userInfo.favs = res.favs
          userInfo.count = res.count
          // 保存到 vuex
          this.$store.commit('setUserInfo', userInfo)
        } else {
          this.$pop({ msg: '今天已经签到过了！' })
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/css/panel.scss';

// 缩放动画
@keyframes scaleAnime {
  0% {
    opacity: 0;
    // transform: scale(0.8);
  }
  100% {
    opacity: 1;
    // transform: scale(1);
  }
}

.fly-link {
  display: inline-block;
}

.fly-mid {
  display: inline-block;
  height: 10px;
  width: 1px;
  margin: 0 10px;
  vertical-align: middle;
  background-color: #e2e2e2;
}

.fly-signin {
  cite {
    padding: 0 5px;
    color: var(--danger);
    font-style: normal;
  }

  .layui-badge-dot {
    top: -7px;
    margin-left: 0px;
  }
}

.fly-signin-days {
  margin-top: 20px;
  padding-left: 15px;
  color: #999;
}

.fly-signin-main {
  text-align: center;
  span {
    padding-left: 10px;
  }
}

.modal_content {
  width: 300px;
  padding: 0 15px;
  &.active {
    animation: scaleAnime 0.3s linear;
    // 动画填充模式
    // animation-fill-mode: forwards;
  }

  .layui-layer-title {
    padding: 0;
    .close_btn {
      float: right;
      cursor: pointer;
      &:hover {
        color: var(--themeColor);
      }
    }
  }
  .warn {
    color: var(--danger);
  }
}

.modal_top {
  .user_box {
    height: 300px;
    overflow: auto;
  }
  .user_item {
    display: flex;
    align-items: center;
    padding: 10px;
    border-bottom: 1px solid #dcdcdc;
    &:last-child {
      border-bottom: none;
    }

    img {
      width: 30px;
      height: 30px;
      border-radius: 50%;
    }

    .user_info {
      margin-left: 8px;
      .name {
        color: var(--danger);
        font-size: 16px;
      }
      .time,
      .count {
        margin-top: 3px;
        color: #666;

        i {
          margin: 0 3px;
          font-size: 16px;
          color: var(--danger);
        }
      }
    }
  }
}
</style>
