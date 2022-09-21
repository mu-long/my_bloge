<template>
  <div
    class="paging"
    :style="{'justify-content':justifyContent}"
  >
    <div class="paging_box">
      <div
        class="layui-box layui-laypage layui-laypage-default"
        id="layui-laypage-10"
      >
        <!-- 首页 -->
        <a
          href="javascript:;"
          title="首页"
          class="layui-laypage-prev page_prev"
          :class="{'layui-disabled': current === 1}"
          v-show="showEnd"
          @click.prevent="goHome()"
        >
          <i
            class="iconfont icon-jiantou_yemian_xiangzuo"
            v-if="showType === 'icon'"
          ></i>
          <template v-else>首页</template>
        </a>
        <!-- 上一页 -->
        <a
          href="javascript:;"
          title="上一页"
          class="layui-laypage-prev page_prev"
          :class="{'layui-disabled': current === 1}"
          @click.prevent="goPrev()"
        >
          <i
            class="iconfont icon-jiantou_liebiaoxiangzuo"
            v-if="showType === 'icon'"
          ></i>
          <template v-else>上一页</template>
        </a>
        <!-- <span class="layui-laypage-curr">
          <em class="layui-laypage-em"></em>
          <em>1</em>
        </span> -->
        <!-- current - 2 > 1 显示 ... -->
        <!-- 省略 -->
        <span
          class="layui-laypage-spr layui-disabled"
          v-if="pages.length > 5 && (current - 2) > 1"
        >…</span>
        <!-- 中间显示的页码 -->
        <template v-for="(item, index) in pages">
          <a
            :key="'page' + index"
            v-if="(current - 2) <= item && item <= (current + 2)"
            :title="item"
            href="javascript:;"
            :class="[current === (index + 1) ? 'active': '']"
            @click.prevent="changeIndex(index + 1)"
          >{{item}}</a>
        </template>
        <!-- current + 2 < pages.length 显示 ... -->
        <!-- 省略 -->
        <span
          class="layui-laypage-spr layui-disabled"
          v-if="pages.length > 5 && (current + 2) < pages.length"
        >…</span>
        <!-- <a
          href="javascript:;"
          data-page="9"
        >9</a> -->
        <!-- 下一页 -->
        <a
          href="javascript:;"
          title="下一页"
          class="layui-laypage-next page_next"
          :class="{'layui-disabled': current === pages.length}"
          @click.prevent="goNext()"
        >
          <i
            class="iconfont icon-jiantou_liebiaoxiangyou"
            v-if="showType === 'icon'"
          ></i>
          <template v-else>下一页</template>
        </a>
        <!-- 尾页 -->
        <a
          href="javascript:;"
          title="尾页"
          class="layui-laypage-next page_next"
          :class="{'layui-disabled': current === pages.length}"
          v-show="showEnd"
          @click.prevent="goEnd()"
        >
          <i
            class="iconfont icon-jiantou_yemian_xiangyou"
            v-if="showType === 'icon'"
          ></i>
          <template v-else>尾页</template>
        </a>

        <!-- 每页显示条数 -->
        <!-- <span class="layui-laypage-limits">
        <select lay-ignore="">
          <option
            value="10"
            selected=""
          >10 条/页</option>
          <option
            v-for="(item, index) in pagingLimitArr"
            :key="'page' + index"
          >{{item}} 条/页</option>
        </select>
      </span> -->
      </div>
      <div
        class="page_num"
        :style="{'justify-content':justifyContent}"
      >
        <!-- 跳转页码 -->
        <span class="layui-laypage-skip page_skip">到第
          <input
            type="text"
            min="1"
            value="1"
            class="layui-input"
            v-model.number="goToPageNumber"
            @keyup.enter="changePageNumber"
          >页
          <!-- <button
          type="button"
          class="layui-laypage-btn"
        >确定</button> -->
        </span>
        <!-- 总页数 -->
        <span
          class="layui-laypage-count page_count"
          v-show="hasTotal"
        >共{{ pages.length }}页</span>
        <!-- 每页显示条数 -->
        <div
          class="layui-input-inline"
          @click="() => isSelect = !isSelect"
          v-show="hasSelect"
        >
          <div
            class="layui-unselect layui-form-select"
            :class="{'layui-form-selected': isSelect}"
          >
            <div class="layui-select-title">
              <div class="input_box">
                <input
                  type="text"
                  placeholder="请选择"
                  readonly
                  class="layui-input layui-unselect"
                  v-model="pagingLimitArr[pagingLimitArrIndex]"
                >
                <i class="layui-edge"></i>
                <div>条/页</div>
              </div>
            </div>
            <dl class="layui-anim layui-anim-upbit">
              <dd
                v-for="(item, index) in pagingLimitArr"
                :key="'page' + index"
                :class="{'layui-this': index === pagingLimitArrIndex}"
                @click="changeNumberLimit(item, index)"
              >
                {{item}} 条/页
              </dd>
            </dl>
          </div>
        </div>
        <!-- 总条数 -->
        <span
          class="layui-laypage-count page_count"
          v-show="hasTotal"
        >共{{ total }}条数据</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Paging', // 分页
  props: {
    justifyContent: { // 水平居中方式
      type: String,
      default: 'center' // 'start' 'center' 'end' ...
    },
    showType: { // 显示 图标 或 汉字
      type: String,
      default: 'icon' // icon utf8
    },
    showEnd: { // 显示 首页与尾页
      type: Boolean,
      default: true
    },
    hasTotal: { // 有总条数
      type: Boolean,
      default: true
    },
    hasSelect: { // 有选择每页条数
      type: Boolean,
      default: true
    },
    total: { // 总条数
      type: Number,
      default: 0
    },
    size: { // 每页条数
      type: Number,
      default: 10
    },
    current: { // 当前的页码
      type: Number,
      default: 1
    },
    dist: { // 距离
      type: Number,
      default: 5
    }
  },
  data () {
    return {
      isSelect: false,
      pagingLimitArr: [10, 15, 30, 50], // 每页显示条数  分页限制
      pagingLimitArrIndex: 0,
      pages: [],
      limit: 10,
      goToPageNumber: null // 跳转页码
    }
  },
  computed: {
    // 总页数
    totalPages () {
      return Math.ceil(this.total / this.limit)
    }
  },
  watch: {
    // 检测 总条数变化
    total () {
      this.initPages()
    }
  },
  mounted () {
    this.limit = this.size
    // 初始化分页的长度
    this.initPages()
    // 设置select的内容
    // 数组添加数据 去重排序
    const arr = this.pagingLimitArr
    const num = this.limit
    // 去重 (如果不包含，就添加)
    if (!arr.includes(num)) {
      arr.push(num)
    }
    // 排序 (从小到大)
    this.pagingLimitArr = arr.sort((a, b) => a - b)
    this.pagingLimitArrIndex = this.pagingLimitArr.indexOf(this.limit)
    console.log(this.pagingLimitArr)
  },
  methods: {
    // 改变单页评论数量限制
    changeNumberLimit (item, newIndex) {
      this.limit = this.size
      // 新的限制
      const newLimit = this.pagingLimitArr[newIndex]
      // 旧页码数量 = 旧页码 * 旧单页限制
      let oldNum = this.limit * this.current
      // 不能超过最大评论数量
      if (oldNum >= this.total) {
        oldNum = this.total
      }
      // 当前的页码 = 旧页码数量 / 当前限制
      const newCurrent = Math.ceil(oldNum / newLimit)

      const oldIndex = this.pagingLimitArrIndex
      // 如果选择不是当前的限制
      if (oldIndex !== newIndex) {
        console.log('limit发生变化...')
        // 当页面上的limit发生变化之后，调整current数值
        this.$emit('changeCurrent', newCurrent)
        this.$emit('changeLimit', newLimit)
        this.pagingLimitArrIndex = newIndex
        this.limit = newLimit
        console.log('this.totalPages ==> ', this.totalPages)
        // 初始化分页的长度
        this.initPages()
      }
    },

    // 初始化分页的长度
    initPages () {
      this.pages = []
      // 5 -> [1,2,3,4,5]
      for (let i = 1; i < this.totalPages + 1; i++) {
        this.pages.push(i)
      }
      console.log('this.pages ==> ', this.pages)
    },

    // 改变下标
    changeIndex (val) {
      if (val !== this.current) {
        this.$emit('changeCurrent', val)
      }
    },

    // 去首页
    goHome () {
      this.$emit('changeCurrent', 1)
    },

    // 去尾页
    goEnd () {
      this.$emit('changeCurrent', this.pages.length)
    },

    // 去上一页
    goPrev () {
      let val = 0
      if (this.current - 1 < 1) {
        val = 1
      } else {
        val = this.current - 1
      }
      this.$emit('changeCurrent', val)
    },

    // 去下一页
    goNext () {
      let val = 0
      if (this.current + 1 > this.pages.length) {
        val = this.pages.length
      } else {
        val = this.current + 1
      }
      this.$emit('changeCurrent', val)
    },

    // 改变页码 跳转页面
    changePageNumber (e) {
      // let pageNumber = e.target.value
      let pageNumber = parseInt(this.goToPageNumber)
      if (pageNumber < 1) {
        pageNumber = 1
      } else if (pageNumber > this.totalPages) {
        pageNumber = this.totalPages
      }
      this.goToPageNumber = pageNumber
      console.log('跳转页码 ==> ', pageNumber)
      this.$emit('changeCurrent', pageNumber)
    }
  }
}
</script>

<style lang="scss" scoped>
.layui-laypage {
  .layui-laypage-skip {
    margin: 0 5px;
  }
  .layui-input {
    margin: 0 2px;
  }
  .layui-laypage-count {
    margin-left: 0;
  }
}

.layui-input-inline {
  margin: -2.5px 5px 0;

  .input_box {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  input {
    width: 60px;
    height: 30px;
    margin-right: 5px;
  }
}
.layui-form-select .layui-edge {
  left: 40px;
}

.page_num {
  display: flex;
  align-items: center;
  color: #999;

  .page_count {
    color: #333;
    margin: 0 5px;
  }
  .page_count,
  .page_skip {
    font-size: 12px;
  }
  .page_skip {
    input {
      display: inline-block;
      width: 40px;
      height: 30px;
      margin: 0 5px;
      line-height: 30px;
    }
  }
}

.paging {
  display: flex;
  align-items: center;
  padding: 0 5px;

  .page_prev .iconfont,
  .page_next .iconfont {
    font-size: 20px;
  }

  .active {
    background: var(--themeColor);
    color: #fff;
    border: 1px solid var(--themeColor);
  }
}
</style>
