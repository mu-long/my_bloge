<template>
  <div>
    <ul class="fly-list">
      <li
        v-for="(item, index) in listArr"
        :key="'item' + index"
      >
        <a
          href="user/home.html"
          class="fly-avatar"
        >
          <img
            src="https://tva1.sinaimg.cn/crop.0.0.118.118.180/5db11ff4gw1e77d3nqrv8j203b03cweg.jpg"
            alt="贤心"
          >
        </a>
        <h2>
          <a class="layui-badge">{{ item.catalog }}</a>
          <a href>{{ item.title }}</a>
        </h2>
        <div class="fly-list-info">
          <a
            href="user/home.html"
            link
          >
            <!-- 用户名 -->
            <cite>{{ item.uid.name }}</cite>
            <i
              class="iconfont icon-vrenzhengguanli"
              title="认证信息：XXX"
            ></i>
            <!-- vip -->
            <i
              class="layui-badge fly-badge-vip"
              v-if="item.uid.isVip === 1"
            >{{ 'VIP' + item.uid.isVip }}</i>
          </a>
          <!-- 创建时间 -->
          <span>{{ item.created | moment }}</span>
          <span
            class="fly-list-kiss layui-hide-xs"
            title="悬赏飞吻"
          >
            <!-- 用户积分 -->
            <i class="iconfont icon-shoucang1"></i> {{ item.fav }}
          </span>
          <!-- 是否结帖 -->
          <span
            class="layui-badge fly-badge-accept layui-hide-xs"
            v-show="item.status !== 0"
          >已结</span>
          <span class="fly-list-nums">
            <i
              class="layui-icon layui-icon-dialogue"
              title="回答"
            ></i>{{ item.answer }}
          </span>
        </div>
        <div
          class="fly-list-badge"
          v-show="item.tags.length > 0"
        >
          <!-- <span class="layui-badge layui-bg-black">置顶</span> -->
          <span
            v-for="(tag, index) in item.tags"
            :key="'item' + index"
            :class="['layui-badge', tag.class]"
          >{{ tag.name }}</span>
        </div>
      </li>
    </ul>
    <!-- 更多 -->
    <div
      class="more"
      v-show="isShow"
    >
      <div
        class="laypage-main"
        v-if="!isEnd"
      >
        <a
          href
          class="laypage-next"
          @click.prevent="more()"
        >加载更多</a>
      </div>
      <div
        class="no_more"
        v-else
      >
        我是有底线的...
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import 'moment/locale/zh-cn'
export default {
  name: 'ListItem',
  props: {
    lists: {
      default: () => [],
      type: Array
    },
    isShow: {
      default: true,
      type: Boolean
    },
    isEnd: {
      default: false,
      type: Boolean
    }
  },
  computed: { // 计算属性
    listArr () {
      if (!this.lists) {
        return
      }
      this.lists.map(item => {
        // catalog帖子分类
        switch (item.catalog) {
          case 'ask':
            item.catalog = '提问'
            break
          case 'share':
            item.catalog = '分享'
            break
          case 'logs':
            item.catalog = '动态'
            break
          case 'noyice':
            item.catalog = '公告'
            break
          case 'advise':
            item.catalog = '建议'
            break
          case 'discuss':
            item.catalog = '交流'
            break
          // default:
          //   break;
        }
      })
      return this.lists
    }
  },
  filters: {
    moment (date) {
      // 超过7天，显示日期
      if (moment(date).isBefore(moment().subtract(7, 'days'))) {
        return moment(date).format('YYYY-MM-DD')
      } else {
        // 显示 几秒前 几分前 几天前
        return moment(date).from(moment())
      }
    }
  },
  methods: {
    more () {
      this.$emit('next_page')
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/css/panel.scss';
</style>
