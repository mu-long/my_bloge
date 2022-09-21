<template>
  <div class="layui-tab-item layui-show myPost">
    <!-- 我的帖子 -->
    <table
      lay-even
      class="layui-table"
      v-if="list.length !== 0"
    >
      <thead>
        <tr class="text_center">
          <th>帖子标题</th>
          <th>发表时间</th>
          <th>数据</th>
          <th>回复状态</th>
          <th>是否结帖</th>
          <th style="min-width: 115px;">操作</th>
        </tr>
      </thead>
      <tbody>
        <tr
          class="text_center"
          v-for="(item, index) in list"
          :key="'post' + index"
        >
          <td>
            <router-link
              class="link"
              :to="{name: 'postDetail', params: {tid: item._id}}"
            >{{item.title}}</router-link>
          </td>
          <td>{{item.created | formattingTime}}</td>
          <td>{{item.reads}}阅读/{{item.answer}}回答</td>
          <td>{{item.status === 0 ? '打开' : '关闭'}}</td>
          <td :style="{color: item.isEnd === 0 ? 'var(--success)' : 'var(--warning)'}">{{item.isEnd === 0 ? '未结帖' : '已结帖'}}</td>
          <td>
            <div
              class="layui-btn layui-btn-xs"
              :class="{'layui-btn-disabled':item.isEnd===1}"
              @click="editPost(item)"
            >编辑</div>
            <div
              class="layui-btn layui-btn-xs layui-btn-danger"
              @click="deletePost(item)"
            >删除</div>
          </td>
        </tr>
      </tbody>
    </table>

    <div
      class="empty"
      v-else
    >
      <span>该用户还没有发表帖子...</span>
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
import { getPostListByUid, deletePostByUid } from '@/api/user'
import Paging from '@/components/modules/paging/index.vue'

export default {
  name: 'MyPost', // 我的帖子
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
    // 获取用户文章列表
    this.getPostList()
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

    // 获取用户文章列表
    async getPostList () {
      await getPostListByUid({ page: this.current, limit: this.size }).then(res => {
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

    // 编辑帖子
    editPost (item) {
      if (item.isEnd === 1) {
        this.$pop({ msg: '帖子已经结贴，无法编辑！', type: 'shake' })
      } else {
        this.$router.push({
          name: 'editPost',
          params: { tid: item._id, post: item }
        })
      }
    },

    // 删除帖子
    deletePost (item) {
      this.$confirm('确定删除帖子吗？', async () => {
        if (item.isEnd === 1) {
          this.$pop({ msg: '帖子已经结贴，无法删除！', type: 'shake' })
        } else {
          await deletePostByUid({ tid: item._id }).then(res => {
            if (res.code === 200) {
              this.$pop({ msg: res.msg })
              // 获取用户文章列表
              this.getPostList()
            } else {
              this.$pop({ msg: res.msg, type: 'shake' })
            }
          })
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.layui-btn + .layui-btn {
  margin: 5px;
}

.text_center {
  text-align: center;
}

thead tr th {
  text-align: center;
}

.link {
  color: var(--themeColor);
}

.myPost {
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
