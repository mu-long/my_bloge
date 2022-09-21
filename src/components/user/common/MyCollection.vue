<template>
  <div class="layui-tab-item layui-show myCollect">
    <!-- 我的收藏 -->
    <table
      class="layui-table"
      v-if="list.length !== 0"
    >
      <thead>
        <tr class="text_center">
          <th>帖子标题</th>
          <th>收藏时间</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr
          class="text_center"
          v-for="(item, index) in list"
          :key="'myCollect' + index"
        >
          <td>{{item.title}}</td>
          <td>{{item.created | formattingTime}}</td>
          <td>
            <div
              class="layui-btn layui-btn-xs layui-btn-danger"
              @click="deleteCollect (item)"
            >删除</div>
          </td>
        </tr>
      </tbody>
    </table>

    <div
      class="empty"
      v-else
    >
      <span>该用户还没有收藏的帖子...</span>
    </div>

    <!-- 分页 -->
    <Paging
      v-show="list.length !== 0"
      :justifyContent="'center'"
      :showEnd='true'
      :total='total'
      :current='current'
      :size='size'
      @changeCurrent='changeCurrent'
      @changeLimit='changeLimit'
    />
  </div>
</template>

<script>
import { getPostCollect, deletePostCollect } from '@/api/user'
import Paging from '@/components/modules/paging/index.vue'

export default {
  name: 'MyCollection', // 我的收藏
  components: {
    Paging // 分页
  },
  data () {
    return {
      current: 1, // 当前的页码
      size: 5, // 每页条数
      total: 0,
      list: []
    }
  },
  mounted () {
    // 获取用户收藏的帖子
    this.getCollectList()
  },
  methods: {
    // 改变 当前的页码
    changeCurrent (val) {
      this.current = val
      // 定时器作用：延时发送请求，使 当前页码与限制条数 数据更新完成，再发送请求，减少请求次数
      setTimeout(() => {
        // 获取用户文章列表
        this.getPostList()
      }, 200)
    },

    // 改变 每页条数
    changeLimit (val) {
      // 设置为第一页
      this.current = 1
      this.size = val
      console.log('改变 每页条数 ==> ', this.size)
      setTimeout(() => {
        // 获取用户文章列表
        this.getPostList()
      }, 200)
    },

    // 获取收藏的帖子
    async getCollectList () {
      await getPostCollect({ page: this.current, limit: this.size }).then(res => {
        if (res.code === 200) {
          this.$pop({ msg: res.msg })
          // 更新本地状态
          this.list = res.data
          this.total = res.total
        } else {
          this.$pop({ msg: res.msg, type: 'shake' })
        }
      })
    },

    // 删除收藏的帖子
    deleteCollect (item) {
      this.$confirm('确定删除收藏的帖子吗？', async () => {
        await deletePostCollect({ tid: item.tid }).then(res => {
          if (res.code === 200) {
            this.$pop({ msg: res.msg })
            // 获取用户收藏的帖子
            this.getCollectList()
          } else {
            this.$pop({ msg: res.msg, type: 'shake' })
          }
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.text_center {
  text-align: center;
}

thead tr th {
  text-align: center;
}

.myCollect {
  height: calc(100% - 65px);
}
.empty {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  color: #666;
}
</style>
