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
            <li class="layui-this">发表新帖</li>
            <!-- 编辑帖子 -->
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
                      @click="()=> isSelect_integral = !isSelect_integral"
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
                            class="layui-input layui-unselect"
                            v-model="integralList[integralIndex]"
                          >
                          <i class="layui-edge"></i>
                        </div>
                        <dl class="layui-anim layui-anim-upbit">
                          <dd
                            v-for="(item,index) in integralList"
                            :key="'integral'+index"
                            @click="chooseIntegral(item,index)"
                            :class="{'layui-this': index === integralIndex}"
                          >
                            {{item}}
                          </dd>
                        </dl>
                      </div>
                    </div>
                    <div class="layui-form-mid layui-word-aux">发表后无法更改悬赏积分！</div>
                  </div>
                </div>
                <!-- 详细描述 文本编辑器 -->
                <div class="layui-form-item layui-form-text">
                  <Editor
                    @changeContent="addContent"
                    :content='content'
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
import { addPost } from '@/api/user'

export default {
  name: 'AddPost', // 新增帖子
  mixins: [CodeMixin], // 混入
  components: { Editor },
  data () {
    return {
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
        }
      ]
    }
  },

  mounted () {
    // 加载未编辑完的内容
    const addPostData = localStorage.getItem('addPostData')
    if (addPostData && addPostData !== '') {
      this.$confirm('是否加载未编辑完的内容？', () => {
        // 点击确定加载
        const obj = JSON.parse(addPostData)
        this.title = obj.title
        this.content = obj.content
        this.integralIndex = obj.integralIndex
        this.columnIndex = obj.columnIndex
      }, () => {
        // 点击取消删除
        localStorage.removeItem('addPostData')
      })
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
      const isValid = await this.$refs.observer_ref.validate()
      if (!isValid) {
        return
      }

      const column = this.columnList[this.columnIndex].value
      if (column === '') return this.$pop('请选择文章所在专栏！', 'shake')
      if (this.content === '') return this.$pop('文章内容不能为空！', 'shake')

      // 添加新的文章
      addPost({
        code: this.code, // 验证码
        sid: this.sid, // 验证码唯一标识
        title: this.title, // 文章标题
        column: column, // 专栏
        integral: this.integralList[this.integralIndex], // 积分
        content: this.content // 文章内容
      }).then(res => {
        console.log('login res==>', res)
        if (res.code === 200) {
          this.$pop(res.msg)
          // 重置表单
          this.resetForm()
          setTimeout(() => {
            this.$router.push({ name: 'index' })
          }, 2000)
        } else {
          this.$pop('发帖失败！')
        }
      })
    },
    // 重置表单
    resetForm (e) {
      if (e && e.target.className.includes('layui-btn-danger')) {
        console.log('重置表单 ==>', e)
        console.log('重置表单 ==>', e.target.className)
        this.$pop('重置表单成功！')
      }
      // 清空已经发布的内容
      localStorage.removeItem('addPostData')
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
        this.$pop('保存草稿成功！')
      }
      // 保存未发布的内容到本地一份
      const saveData = {
        title: this.title,
        content: this.content,
        integralIndex: this.integralIndex,
        columnIndex: this.columnIndex
      }
      if (this.title !== '' && this.content !== '') {
        localStorage.setItem('addPostData', JSON.stringify(saveData))
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
