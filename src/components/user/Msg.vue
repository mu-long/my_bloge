<template>
  <div class="user_msg">
    <div
      class="fly-panel fly-panel-user"
      pad20
    >
      <div
        class="layui-tab layui-tab-brief"
        lay-filter="user"
        id="LAY_msg"
        style="margin-top: 15px;"
      >
        <button
          class="layui-btn layui-btn-danger"
          id="LAY_delallmsg"
          @click="clearAllMsg()"
        >清空全部消息</button>
        <div
          id="LAY_minemsg"
          style="margin-top: 10px;"
        >
          <div
            class="fly-none"
            v-if="msgLists.length===0"
          >您暂时没有最新消息</div>
          <ul
            class="mine_msg"
            v-else
          >
            <li
              v-for="(item,index) in msgLists"
              :key="'comments' + index"
            >
              <blockquote class="layui-elem-quote">
                <a
                  href="javascript:;"
                  target="_blank"
                ><cite>{{ item.cuid.username }} </cite></a>回复：<a
                  target="_blank"
                  href="/jie/8153.html/page/0/#item-1489505778669"
                ><cite>{{ item.tid.title }}</cite></a>
                <p>内容：<span v-convertHtml="item.content"></span>
                </p>
              </blockquote>
              <p class="msg">
                <span>{{ item.created | formattingTime }}</span>
                <a
                  href="javascript:;"
                  class="layui-btn layui-btn-xs layui-btn-danger delete_btn"
                  @click="clearMsg(item)"
                >删除</a>
              </p>
            </li>
          </ul>

          <!-- 分页 -->
          <Paging
            v-show="msgLists.length !== 0"
            :justifyContent="'center'"
            :showEnd='true'
            :total='total'
            :current='current'
            :size='size'
            @changeCurrent='changeCurrent'
            @changeLimit='changeLimit'
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Paging from '@/components/modules/paging/index.vue'
import { getMsg, setMsg } from '@/api/user'

export default {
  name: 'user_msg', // 我的消息
  components: {
    Paging // 分页
  },
  data () {
    return {
      total: 0, // 总条数
      size: 10, // 每页条数
      current: 1, // 当前的页码
      msgLists: []
    }
  },
  computed: mapState({
    num: state => (state.num.message ? state.num.message : 0)
  }),
  mounted () {
    this.getMsgAll()
  },
  methods: {
    getMsgAll () {
      getMsg({
        page: this.current,
        limit: this.size
      }).then(res => {
        if (res.code === 200) {
          console.log('获取未读消息 ==> ', res.data)
          this.msgLists = res.data
          this.total = res.total
        }
      })
    },

    // 改变 当前的页码
    changeCurrent (val) {
      this.current = val
      // 定时器作用：延时发送请求，使 当前页码与限制条数 数据更新完成，再发送请求，减少请求次数
      setTimeout(() => {
        // 获取消息
        this.getMsgAll()
      }, 200)
    },

    // 改变 每页条数
    changeLimit (val) {
      // 设置为第一页
      this.current = 1
      this.size = val
      console.log('改变 每页条数 ==> ', this.size)
      setTimeout(() => {
        // 获取消息
        this.getMsgAll()
      }, 200)
    },

    clearMsg (item) {
      setMsg({ id: item._id }).then(res => {
        if (res.code === 200) {
          // 设置特定消息已读
          this.getMsgAll()
          this.$store.commit('setMessage', { message: this.num - 1 })
        }
      })
    },
    clearAllMsg () {
      setMsg().then(res => {
        if (res.code === 200) {
          // 清空所有消息
          this.msgLists = []
          this.getMsgAll()
          this.$store.commit('setMessage', { message: 0 })
          this.total = 0
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.mine_msg {
  li {
    margin-bottom: 15px;
    padding: 10px 0 5px;
    border-bottom: 1px dotted #e9e9e9;
  }

  .msg {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style>
