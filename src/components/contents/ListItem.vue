<template>
  <div>
    <ul class="fly-list">
      <li
        v-for="(item, index) in listArr"
        :key="'item' + index"
      >
        <router-link :to="{name: 'postDetail', params: {tid: item._id}}">
          <a
            href="javascript:;"
            class="fly-avatar"
          >
            <img :src="item.uid.pic">
          </a>
          <h2>
            <a class="layui-badge">{{ item.column }}</a>
            <a href>{{ item.title }}</a>
          </h2>
          <div class="fly-list-info">
            <a
              href="javascript:;"
              link
            >
              <!-- 用户名 -->
              <cite>{{ item.uid.username }}</cite>
              <i
                class="iconfont icon-vrenzhengguanli"
                title="已认证"
              ></i>
              <!-- vip -->
              <i
                class="layui-badge fly-badge-vip"
                v-if="item.uid.isVip !== 0"
              >{{ 'VIP' + item.uid.isVip }}</i>
            </a>
            <!-- 创建时间 -->
            <span>{{ item.created | formattingTime }}</span>
            <span
              class="fly-list-kiss layui-hide-xs"
              title="悬赏飞吻"
            >
              <!-- 用户积分 -->
              <i class="iconfont icon-shoucang1"></i> {{ item.integral }}
            </span>
            <!-- 是否结帖 -->
            <span
              class="layui-badge fly-badge-accept layui-hide-xs"
              v-show="item.status !== 0"
            >已结</span>
            <span
              class="fly-list-nums"
              title="回复量"
            >
              <i class="iconfont icon-taolunqu"></i>{{ item.answer }}
            </span>
          </div>
          <!-- 标签 -->
          <div
            class="fly-list-badge"
            v-show="item.tags.length > 0 && item.tags[0].name !==''"
          >
            <!-- <span class="layui-badge layui-bg-black">置顶</span> -->
            <span
              v-for="(tag, index) in item.tags"
              :key="'item' + index"
              :class="['layui-badge', tag.class]"
            >{{ tag.name }}</span>
          </div>
        </router-link>
      </li>
    </ul>
    <!-- 更多 -->
    <div
      class="more"
      v-show="isShow"
    >
      <div
        class="laypage-main"
        v-if="!isOver"
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
    isOver: {
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
        // column帖子分类
        switch (item.column) {
          case 'ask':
            item.column = '提问'
            break
          case 'share':
            item.column = '分享'
            break
          case 'logs':
            item.column = '动态'
            break
          case 'notice':
            item.column = '公告'
            break
          case 'advise':
            item.column = '建议'
            break
          case 'discuss':
            item.column = '讨论'
            break
          // default:
          //   break;
        }
      })
      return this.lists
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
