<template>
  <!-- 置顶 -->
  <div
    class="fly-panel"
    v-if="lists.length > 0"
  >
    <div class="fly-panel-title fly-filter">
      <span>置顶</span>
      <a
        href="#signin"
        class="layui-hide-sm layui-show-xs-block fly-right"
        id="LAY_goSignin"
        style="color: #FF5722;"
      >去签到</a>
    </div>
    <!-- 列表 -->
    <ListItem
      :lists="lists"
      :isShow="false"
      @next_page="nextPage()"
    />
  </div>
</template>

<script>
import ListItem from './ListItem.vue'
// import { getList } from '../../api/content'

export default {
  name: 'Top', // 置顶
  components: {
    ListItem
  },
  data () {
    return {
      page: 1, // 当前页码
      limit: 20, // 限制20
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
        isTop: 1, // 是否置顶
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
  mounted () {
    // this._getList()
  },
  methods: {
    // 获取数据列表
    /* _getList () {
      // 数据是否请求完毕
      if (this.isEnd) return

      const options = {
        catalog: this.catalog,
        isTop: 1, // 是否置顶
        page: this.page,
        limit: this.limit
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
        }).catch(err => {
          if (err) {
            console.log('err==>', err)
            this.$mini(err.message)
          }
        })
    },
    nextPage () {
      console.log('加载下一页')
      this.page++
      this._getList()
    } */
  }
}
</script>

<style lang="scss" scoped>
@import '../../css/panel.scss';
</style>
