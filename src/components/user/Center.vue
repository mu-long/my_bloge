<template>
  <div class="user_center">
    <div class="msg">你好，admin，你已经是我们的正式会员！</div>
    <div class="layui-row">
      <div class="layui-col-md5 border vip_box">
        <div class="panel">
          <div class="title">我的会员信息：</div>
          <div class="content">
            <p>你的积分有：<b>66</b></p>
            <p>您当前为：<b>VIP用户</b></p>
          </div>
        </div>
      </div>
      <div class="layui-col-md5 layui-col-md-offset1 border sign_box">
        <Sign />
      </div>
    </div>
    <!-- 快捷方式 -->
    <div class="layui-col-md12 lnk">
      <div class="panel border">
        <div class="title">快捷方式：</div>
        <div class="content">
          <ul class="layui-row layui-col-space10">
            <li
              class="layui-col-sm3 layui-col-xs4"
              v-for="(item,index) in lnkArr"
              :key="index"
            >
              <router-link :to="{name: item.link}">
                <i :class="['iconfont', item.icon]"></i>
                {{ item.text }}
              </router-link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Sign from '../sidebar/Sign.vue'

export default {
  name: 'user_center', // 用户中心
  data () {
    return {
      lnkArr: [
        {
          icon: 'icon-shezhi',
          text: '修改信息',
          link: 'myinfo'
        }, {
          icon: 'icon-touxiang1',
          text: '修改头像',
          link: 'picupload'
        }, {
          icon: 'icon-mima',
          text: '修改密码',
          link: 'updatepwd'
        }, {
          icon: 'icon-bangding',
          text: '账号绑定',
          link: 'accounts'
        }, {
          icon: 'icon-ziyuan60',
          text: '发表新帖',
          link: ''
        }, {
          icon: 'icon-fenxiang',
          text: '查看分享',
          link: ''
        }, {
          icon: 'icon-wode',
          text: '我的帖子',
          link: ''
        }, {
          icon: 'icon-shoucang2',
          text: '我的收藏',
          link: ''
        }, {
          icon: 'icon-qitashebei',
          text: '其它资料',
          link: ''
        }, {
          icon: 'icon-weixingongzhonghaoguanli',
          text: '关注公众号',
          link: ''
        }, {
          icon: 'icon-wendangchaxun',
          text: '查看文档',
          link: ''
        }, {
          icon: 'icon-xitongguanlihoutai',
          text: '后台管理',
          link: ''
        }
      ]
    }
  },
  components: {
    Sign
  }
}
</script>

<style lang="scss" scoped>
.user_center {
  .border {
    border: 1px solid #e6e6e6;
  }

  .msg {
    background: #f8f8f8;
    padding: 10px 15px;
    margin: 20px 0;
    font-size: 16px;
    color: #666;
  }

  .panel {
    min-height: 161px;
    padding: 0 10px;
    margin-bottom: 15px;
    color: #333;

    .title {
      font-size: 16px;
      line-height: 50px;
      border-bottom: 1px dotted #e9e9e9;
    }

    .content {
      font-size: 15px;
      line-height: 26px;
      padding: 10px 15px;
      b {
        color: #ff5722;
        font-size: 16px;
      }
    }
  }

  .lnk {
    margin-top: 20px;
    li {
      a {
        display: block;
        border: 1px solid #ccc;
        padding: 8px 10px;
        text-align: center;
        background: var(--themeColor);
        color: #fff;
        transition: all 0.3s;
        &:hover {
          opacity: 0.8;
          font-size: 17px;
          transition: all 0.3s;
        }

        .iconfont {
          font-size: 18px;
          vertical-align: bottom;
        }
      }
    }
  }
}
</style>
