<template>
  <div class="layui-container fly-marginTop">
    <div
      class="fly-panel"
      pad20
      style="padding-top: 5px;"
    >
      <!--<div class="fly-none">没有权限</div>-->
      <div class="layui-form layui-form-pane">
        <div
          class="layui-tab layui-tab-brief"
          lay-filter="user"
        >
          <ul class="layui-tab-title">
            <li class="layui-this">编辑新帖</li>
          </ul>
          <div
            class="layui-form layui-tab-content"
            id="LAY_ucm"
            style="padding: 20px 0;"
          >
            <div class="layui-tab-item layui-show">
              <ValidationObserver
                action
                tag="form"
                v-slot="{ validate }"
                ref="observer_ref"
              >
                <!-- 标题 -->
                <div class="layui-col-md6 layui-form-item">
                  <ValidationProvider
                    rules="required"
                    v-slot="{ errors }"
                  >
                    <label
                      for="L_title"
                      class="layui-form-label"
                    >标题</label>
                    <div class="layui-input-block">
                      <input
                        type="text"
                        id="L_title"
                        name="文章标题"
                        required
                        lay-verify="required"
                        autocomplete="off"
                        class="layui-input"
                        v-model.trim="title"
                      >
                      <div class="layui-form-mid layui-word-aux">{{ errors[0] }}</div>
                    </div>
                  </ValidationProvider>
                </div>
                <!-- 所在专栏 -->
                <div class="layui-col-md4 layui-form-item">
                  <ValidationProvider
                    rules="required"
                    v-slot="{ errors }"
                  >
                    <label class="layui-form-label">所在专栏</label>
                    <div
                      class="layui-input-block"
                      @click="()=> isSelect_column = !isSelect_column"
                    >
                      <div
                        class="layui-unselect layui-form-select"
                        :class="{'layui-form-selected': isSelect_column}"
                      >
                        <div class="layui-select-title">
                          <input
                            type="text"
                            placeholder="请选择"
                            readonly
                            class="layui-input layui-unselect"
                            v-model="columnList[columnIndex].text"
                          >
                          <i class="layui-edge"></i>
                        </div>
                        <dl class="layui-anim layui-anim-upbit">
                          <dd
                            v-for="(item,index) in columnList"
                            :key="'column'+index"
                            @click="chooseColumn(item,index)"
                            :class="{'layui-this': index === columnIndex}"
                          >
                            {{item.text}}
                          </dd>
                        </dl>
                      </div>
                    </div>
                    <div class="layui-form-mid layui-word-aux">{{ errors[0] }}</div>
                  </ValidationProvider>
                </div>
                <!-- 悬赏积分 -->
                <div class="layui-form-item">
                  <div class="layui-inline">
                    <label class="layui-form-label">悬赏积分</label>
                    <div
                      class="layui-input-inline"
                      style="width: 260px;"
                    >
                      <div
                        class="layui-unselect layui-form-select"
                        :class="{'layui-form-selected': isSelect_integral}"
                      >
                        <div class="layui-select-title">
                          <input
                            type="text"
                            placeholder="请选择"
                            readonly
                            class="layui-input layui-unselect layui-disabled"
                            v-model="integralList[integralIndex]"
                          >
                        </div>
                      </div>
                    </div>
                    <div class="layui-form-mid layui-word-aux">发表后无法更改悬赏积分！</div>
                  </div>
                </div>
                <!-- 详细描述 文本编辑器 -->
                <div class="layui-form-item layui-form-text">
                  <Editor
                    @changeContent="addContent"
                    :initContent='content'
                  ></Editor>
                </div>
                <!-- 验证码 -->
                <div class="layui-form-item">
                  <ValidationProvider
                    rules="required|length:5"
                    v-slot="{ errors }"
                    ref="code_ref"
                  >
                    <label class="layui-form-label">验证码：</label>
                    <div class="layui-input-inline">
                      <input
                        type="text"
                        name="验证码"
                        required
                        lay-verify="required"
                        placeholder="请输入验证码"
                        autocomplete="off"
                        class="layui-input"
                        v-model.trim='code'
                      />
                    </div>
                    <div
                      class="layui-form-mid layui-word-aux svg"
                      v-html="svg"
                      @click="_getCaptcha(sid)"
                      v-if="svg"
                    ></div>
                    <div
                      class="
                      layui-form-mid
                      layui-word-aux"
                      v-else
                    >服务器错误，验证码获取失败！</div>
                    <div class="layui-form-mid layui-word-aux">{{ errors[0] }}</div>
                  </ValidationProvider>
                </div>
                <div class="layui-form-item">
                  <button
                    type="button"
                    class="layui-btn"
                    @click="validate().then(submit)"
                  >立即发布</button>
                  <button
                    type="button"
                    class="layui-btn layui-btn-normal"
                    @click="saveDraft"
                  >存为草稿</button>
                  <button
                    type="button"
                    class="layui-btn layui-btn-danger"
                    @click="resetForm"
                  >重置表单</button>
                </div>
              </ValidationObserver>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Editor from '@/components/modules/editor/index.vue'
import CodeMixin from '@/mixin/code'
import { editPost } from '@/api/user'

export default {
  name: 'EditPost', // 新增帖子
  mixins: [CodeMixin], // 混入
  components: { Editor },
  // props: ['tid', 'post'],
  data () {
    return {
      tid: '', // 文章id
      title: '', // 文章标题
      content: '', // 文章内容
      integralIndex: 0, // 积分索引
      columnIndex: 0, // 专栏索引
      isSelect_integral: false, // 选中积分
      isSelect_column: false, // 选中专栏
      integralList: [10, 15, 30, 50, 80, 100], // 积分
      // 专栏
      columnList: [
        {
          text: '请选择',
          value: ''
        }, {
          text: '提问',
          value: 'ask'
        }, {
          text: '分享',
          value: 'share'
        }, {
          text: '讨论',
          value: 'discuss'
        }, {
          text: '建议',
          value: 'advise'
        }, {
          text: '动态',
          value: 'logs'
        }, {
          text: '公告',
          value: 'notice'
        }
      ]
    }
  },

  mounted () {
    // 接受路由传递参数
    const { post, tid } = this.$route.params
    console.log('this.$route.params ==>', this.$route.params)
    if (tid) this.tid = tid

    if (post) {
      this.title = post.title
      this.content = post.content
      this.integralIndex = this.integralList.indexOf(post.integral)
      this.columnIndex = this.columnList.indexOf(this.columnList.filter(item => item.value === post.column)[0])

      // 存为草稿
      this.saveDraft()
    } else {
      // 页面上无page内容，可能是用户进行了刷新，则取本地缓存的内容
      // 加载未编辑完的内容
      const editPostData = localStorage.getItem('editPostData')
      if (editPostData && editPostData !== '') {
        this.$confirm('是否加载未编辑完的内容？', () => {
          // 点击确定加载
          const obj = JSON.parse(editPostData)
          this.title = obj.title
          this.content = obj.content
          this.integralIndex = obj.integralIndex
          this.columnIndex = obj.columnIndex
        }, () => {
          // 点击取消删除
          localStorage.removeItem('editPostData')
        })
      }
    }
  },

  methods: {
    chooseColumn (item, index) {
      this.columnIndex = index
    },
    chooseIntegral (item, index) {
      this.integralIndex = index
    },
    addContent (val) {
      this.content = val
      // 存为草稿
      this.saveDraft()
    },

    async submit () {
      // 如果校验失败
      const isValid = this.$refs.observer_ref.validate()
      if (!isValid) {
        return
      }

      if (this.code === '') {
        return this.$pop({
          msg: '请填写验证码！',
          type: 'shake'
        })
      }

      const column = this.columnList[this.columnIndex].value
      if (column === '') {
        return this.$pop({
          msg: '请选择文章所在专栏！',
          type: 'shake'
        })
      }
      if (this.content === '') {
        return this.$pop({
          msg: '文章内容不能为空！',
          type: 'shake'
        })
      }

      // 保存文章编辑
      await editPost({
        code: this.code, // 验证码
        sid: this.sid, // 验证码唯一标识
        tid: this.tid, // 文章id
        title: this.title, // 文章标题
        column: column, // 专栏
        content: this.content // 文章内容
      }).then(res => {
        console.log('login res==>', res)
        if (res.code === 200) {
          this.$pop({ msg: res.msg + '2秒钟后跳转到详情页面！' })
          // 重置表单
          this.resetForm()
          setTimeout(() => {
            this.$router.push({ name: 'postDetail', params: { tid: this.tid } })
          }, 2000)
        } else {
          // 发帖失败！
          this.$pop({
            msg: res.msg,
            type: 'shake'
          })
        }
      })
    },

    // 重置表单
    resetForm (e) {
      if (e && e.target.className.includes('layui-btn-danger')) {
        console.log('重置表单 ==>', e)
        console.log('重置表单 ==>', e.target.className)
        this.$pop({ msg: '重置表单成功！' })
      }
      // 清空已经发布的内容
      localStorage.removeItem('editPostData')
      this.title = ''
      this.content = ''
      this.integralIndex = 0
      this.columnIndex = 0
      this.code = ''
      // 重置表单
      requestAnimationFrame(() => {
        if (this.$refs.observer_ref) {
          this.$refs.observer_ref.reset()
        }
      })
    },

    // 存为草稿
    saveDraft (e) {
      if (e && e.target.className.includes('layui-btn-normal')) {
        console.log('存为草稿 ==>', e)
        console.log('存为草稿 ==>', e.target.className)
        this.$pop({ msg: '保存草稿成功！' })
      }
      // 保存未发布的内容到本地一份
      const saveData = {
        isEnd: 0,
        title: this.title,
        content: this.content,
        integralIndex: this.integralIndex,
        columnIndex: this.columnIndex
      }
      if (this.title !== '' && this.content !== '') {
        localStorage.setItem('editPostData', JSON.stringify(saveData))
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../css/layuiReset.scss';

.layui-container .layui-tab-title {
  justify-content: start;
}

.layui-tab-title .layui-this {
  cursor: unset;
}
</style>
