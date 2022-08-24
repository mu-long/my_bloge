<template>
  <div class="list">
    <!-- contents 内容 列表 -->
    <div
      class="fly-panel"
      style="margin-bottom: 0;"
    >
      <!-- 头部选项卡 -->
      <div class="fly-panel-title fly-filter">
        <a
          href
          :class="{'layui-this' : status === '' && tag === ''}"
          @click.prevent="search()"
        >综合</a>
        <span class="fly-mid"></span>
        <a
          href
          :class="{'layui-this' : status === 0}"
          @click.prevent="search(0)"
        >未结</a>
        <span class="fly-mid"></span>
        <a
          href
          :class="{'layui-this' : status === 1}"
          @click.prevent="search(1)"
        >已结</a>
        <span class="fly-mid"></span>
        <a
          href
          :class="{'layui-this' : status === '' && tag === '精华'}"
          @click.prevent="search(2)"
        >精华</a>
        <span class="fly-filter-right layui-hide-xs">
          <a
            href
            :class="{'layui-this' : sort === 'created'}"
            @click.prevent="search(3)"
          >按最新</a>
          <span class="fly-mid"></span>
          <a
            href
            :class="{'layui-this' : sort === 'answer'}"
            @click.prevent="search(4)"
          >按热议</a>
        </span>
      </div>
      <!-- 列表 -->
      <ListItem
        :lists="lists"
        :isEnd="isEnd"
        @next_page="nextPage()"
      />
    </div>
  </div>
</template>

<script>
import ListItem from './ListItem.vue'
import { getList } from '../../api/content'

export default {
  name: 'List',
  components: {
    ListItem
  },
  data () {
    return {
      status: '', // 结帖状态（选项：0 未结帖；1 已结帖）
      tag: '', // 标签（选项：精华）
      sort: 'created', // 排序 (选项：created 按最新；answer 按热议)
      page: 1, // 当前页码
      limit: 20, // 限制20
      catalog: '', // 帖子分类
      current: '', // 当前的选项
      isEnd: false, // 数据是否请求完毕
      lists: [{
        uid: {
          name: 'mu66',
          isVip: 1
        },
        title: '大前端666',
        content: '12345...',
        created: '2022-06-14 13:26:00',
        catalog: 'ask',
        fav: 40,
        isEnd: 0,
        reads: 99,
        answer: 66,
        status: 0,
        isTop: 0, // 是否置顶
        tags: [{
          name: '精华',
          class: 'layui-bg-orange'
        }, {
          name: '热门',
          class: 'layui-bg-red'
        }]
      }] // 数据列表
    }
  },
  // 监视数据
  watch: {
    current (newVal, oldVal) {
      console.log('current:', newVal, oldVal)
      this.init()
    },
    '$route' (newVal, oldVal) {
      console.log('$route:', newVal, oldVal)
      // const catalog = this.$route.params.catalog
      const catalog = newVal.params.catalog
      console.log('帖子分类', catalog)
      if (typeof catalog !== 'undefined' && catalog !== '') {
        this.catalog = catalog
      }
      this.init()
    }
  },
  mounted () {
    this._getList()
  },
  methods: {
    // 初始化请求
    init () {
      this.lists = []
      this.page = 0
      this.isEnd = false
      this._getList()
    },
    // 获取数据列表
    _getList () {
      // 数据是否请求完毕
      if (this.isEnd) return

      const options = {
        catalog: this.catalog,
        isTop: 0, // 是否置顶
        page: this.page,
        limit: this.limit,
        sort: this.sort,
        tag: this.tag,
        status: this.status
      }

      getList(options)
        .then(res => {
          console.log('数据请求成功 ==> ', res)
          if (res.code === 200) {
            // 判断是否是最后一页
            if (res.data.length < this.limit) {
              this.isEnd = true
            }
            // 如果不存在
            if (this.lists.length === 0) {
              this.lists = res.data
            } else {
              // 如果存在，合并数组
              this.lists = this.lists.concat(res.data)
            }
          }
        })
    },
    nextPage () {
      console.log('加载下一页')
      this.page++
      this._getList()
    },
    // 切换搜索条件
    search (val) {
      if (typeof val === 'undefined' && this.current === '') return
      console.log('切换搜索条件:', val)
      this.current = val

      switch (val) {
        // 未结帖
        case 0:
          this.status = 0
          this.tag = ''
          break
        // 已结帖
        case 1:
          this.status = 1
          this.tag = ''
          break
        // 查询“精华”标签
        case 2:
          this.status = ''
          this.tag = '精华'
          break
        // created 按最新排序
        case 3:
          this.sort = 'created'
          break
        // answer 按热议排序
        case 4:
          this.sort = 'answer'
          break
        // 默认综合查询
        default:
          this.status = ''
          this.tag = ''
          this.current = ''
          break
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/css/panel.scss';
</style>
