<template>
  <div class="editor_wrap layui-form-item layui-form-text">
    <div class="layui-input-block">
      <!-- 编辑器 选项卡 -->
      <div
        class="layui-unselect edit_tab"
        ref="icon"
      >
        <span
          title="插入表情"
          @click="choose(0)"
        >
          <i class="iconfont icon-xiaolian"></i>
        </span>
        <span
          title="插入图片：img[src]"
          @click="choose(1)"
        >
          <i class="iconfont icon-tupian"></i>
        </span>
        <span
          title="超链接格式：a(href)[text]"
          @click="choose(2)"
        >
          <i class="iconfont icon-icon-"></i>
        </span>
        <span
          title="插入代码或引用"
          @click="choose(3)"
        >
          <i class="iconfont icon-daima"></i>
        </span>
        <span
          title="插入水平线"
          @click="addHr"
        >
          <i class="iconfont">hr</i>
        </span>
        <span
          title="预览"
          @click="choose(4)"
        >
          <i class="iconfont icon-yulan"></i>
        </span>
      </div>
      <!-- 文本区域 -->
      <textarea
        name="content"
        placeholder="详细描述..."
        class="layui-textarea fly-editor"
        id="textEdit"
        @focus="focusEvent()"
        @blur="blurEvent()"
        v-model="content"
        ref="textEdit"
      ></textarea>
    </div>
    <!-- 模态框 -->
    <div
      class="modal"
      ref="modal"
    >
      <!-- 表情 -->
      <Face
        :isShow='current === 0'
        @closeEvent='closeModal()'
        @addFaceEvent='addFace'
      />
      <!-- 上传图片 -->
      <ImgUpload
        :isShow='current === 1'
        @closeEvent='closeModal()'
        @addImgEvent='addImgUrl'
      />
      <!-- 添加链接 -->
      <AddLink
        :isShow='current === 2'
        @closeEvent='closeModal()'
        @addLinkEvent='addLink'
      />
      <!-- 插入代码块 -->
      <Code
        :isShow='current === 3'
        :width="codeWidth"
        :height="codeHeight"
        @closeEvent='closeModal()'
        @addCodeEvent='addCode'
      />
      <Preview
        :isShow='current === 4'
        :content="content"
        @closeEvent='closeModal()'
      />
    </div>
  </div>
</template>

<script>
import Face from './Face.vue'
import ImgUpload from './ImgUpload.vue'
import AddLink from './AddLink.vue'
import Code from './Code.vue'
import Preview from './Preview.vue'

export default {
  name: 'text_editor', // 文本编辑器
  components: { Face, ImgUpload, AddLink, Code, Preview },
  props: ['initContent'],
  data () {
    return {
      current: '', // 当前的选项
      codeWidth: 600,
      codeHeight: 200,
      content: '', // 显示内容
      insertTxt: '', // 插入文本
      cursorSite: 0, // 光标位置
      newOursorSite: 0 // 新光标位置
    }
  },

  watch: {
    initContent (newVal, oldVal) {
      this.content = newVal
    }
  },

  // 页面更新时
  updated () {
    console.log('页面更新')
    this.$emit('changeContent', this.content)
  },

  methods: {
    // 关闭模态框
    closeModal () {
      if (this.current === 4) {
        // 取消固定body
        document.querySelector('body').style = 'position: static;'
      }

      this.current = ''
    },

    // choose 选择
    choose (index) {
      if (index === 4) {
        // 固定body，禁止滚动，禁止出现滚动条
        document.querySelector('body').style = 'position: fixed;'
      }

      if (index === this.current) {
        this.closeModal()
      } else {
        this.current = index
      }
    },

    // 计算光标的当前位置
    GetCursorSite () {
      let cursorSite = 0
      const ele = document.getElementById('textEdit')
      if (ele.selectionStart || ele.selectionStart === '0') {
        cursorSite = ele.selectionStart
      } else if (document.selection) {
        // IE
        const selectRange = document.selection.createRange()
        selectRange.moveStart('character', -ele.value.length)
        cursorSite = selectRange.text.length
      }
      this.cursorSite = cursorSite

      console.log('光标的当前位置', this.cursorSite)
    },

    // 获得焦点
    focusEvent () {
      console.log('获得焦点')
      // 计算光标的当前位置
      this.GetCursorSite()
    },

    // 失去焦点
    blurEvent () {
      console.log('失去焦点')
      // 计算光标的当前位置
      this.GetCursorSite()
    },

    // 插入
    insertFun (val) {
      if (typeof this.content === 'undefined') return
      // 分割字符串
      const template = this.content.split('')
      // 根据光标位置，插入表情内容
      template.splice(this.cursorSite, 0, val)
      // 合并数组
      this.content = template.join('')
      console.log('插入', this.content)

      if (this.insertTxt.length) {
        const ele = document.getElementById('textEdit')
        this.newOursorSite = this.cursorSite + val.length
        setTimeout(() => {
          // 设置光标开始的位置
          ele.selectionStart = this.newOursorSite
          // 设置光标结束的位置
          ele.selectionEnd = this.newOursorSite
          // 重新聚焦输入框
          ele.focus()
        }, 0)
      }
    },

    // 添加表情
    addFace (item) {
      console.log('item ==> ', item)
      // 插入内容 Face[嘻嘻]
      const insertContent = ` Face${item} `
      this.insertTxt = insertContent
      // 插入
      this.insertFun(insertContent)
      // 更新光标位置
      // this.cursorSite += insertContent.length
    },

    // 添加图片链接
    addImgUrl (item) {
      console.log('item ==> ', item)
      // 插入内容 Img[https://imulong.com/avatar.png]
      const insertContent = ` Img[${item}] `
      // 插入
      this.insertFun(insertContent)
    },

    // 添加链接
    addLink (item) {
      console.log('item ==> ', item)
      // { title:xxx, link:xxx}
      // 插入内容 A(${item})[https://imulong.com/avatar.png]
      const insertContent = ` A(${item.title})[${item.link}] `
      // 插入
      this.insertFun(insertContent)
    },

    // 添加代码
    addCode (item) {
      console.log('item ==> ', item)
      // 插入内容 [Code]<p>666</p>[/Code]
      const insertContent = `\n[Code]\n${item}\n[/Code] `
      // 插入
      this.insertFun(insertContent)
    },

    // 添加hr
    addHr () {
      this.insertFun('\n[Hr/]\n')
    },

    // 处理点击 Body
    handleBodyClick (e) {
      console.log('e ==> ', e)
      // 阻止事件冒泡
      e.stopPropagation()

      // if (typeof this.ctrl === 'undefined') return
      // 触发隐藏本组件的关闭事件，改变 isShow 状态
      // 判断是否点击了 显示icon按钮和本组件 以外的地方 (contains 包含)
      if (!(this.$refs.icon.contains(e.target) || this.$refs.modal.contains(e.target))) {
        // 关闭模态框
        this.closeModal()
      }
    }
  },

  mounted () {
    if (this.initContent === '') {
      this.initContent = `"以下内容仅供测试使用！ Face[嘻嘻]\n\n      [Hr/]\n
      1.表情\n      Face[ok]  Face[熊猫]\n\n
      [Hr/]\n
      2. 链接\n
      A(百度)[https://www.baidu.com/]\n
      A(QQ)[https://qq.com/]\n\n
      [Hr/]\n
      3. 代码块\n
      [Code]\n      <div>\n        <p>666</p>\n      </div>\n      [/Code]\n
      [Hr/]\n\n
      [Code]\n      \x3Cscript>\n      import convertHtml from '@/utils/convertHtml'\n\n      export default {\n        name: 'Preview', // 预览\n        props: ['isShow', 'content'],\n        data () {\n          return {\n          }\n        },\n        computed: {\n          replaceContent () {\n            // 根据content的内容，转义成为html代码\n            if (typeof this.content === 'undefined' || this.content.trim() === '') return\n            return convertHtml(this.content)\n          }\n        },\n        methods: {\n          close () {\n            // 触发关闭事件\n            this.$emit('closeEvent')\n          }\n        }\n      }\n      \x3C/script>\n      [/Code] \n\n
      4. 图片\n      Img[http://localhost:3000/post_img/2022-0817/7f98fdd5-36ed-40e7-bd66-e6d53ea6462f.png] \n      Img[http://localhost:3000/post_img/2022-0807/8b552d3f-6372-468c-9029-4279469a5a12.png]"
      `
    }
    // $nextTick 将回调延迟到下次 DOM 更新循环之后执行
    this.$nextTick(() => {
      document.querySelector('body').addEventListener('click', this.handleBodyClick)
    })

    // 动态计算 插入代码块的模态框 大小
    this.codeWidth = this.$refs.textEdit.offsetWidth - 60
    this.codeHeight = this.$refs.textEdit.offsetHeight - 60
    window.addEventListener('resize', () => {
      this.codeWidth = this.$refs.textEdit.offsetWidth - 60
      this.codeHeight = this.$refs.textEdit.offsetHeight - 60
    })
  },

  // 实例销毁之前
  beforeDestroy () {
    // 删除事件侦听器
    document.querySelector('body').removeEventListener('click', this.handleBodyClick)
  }
}
</script>

<style lang="scss" scoped>
@import '@/css/layuiReset.scss';

// 出现
@keyframes appear {
  0% {
    opacity: 0;
    transform: scale(0.5);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}
// 消失
@keyframes disappear {
  0% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.5;
    transform: scale(1.05);
  }
  100% {
    opacity: 0;
    transform: scale(0.5);
  }
}

/*
  v-enter-active 【入场动画的时间段】
  v-leave-active 【离场动画的时间段】
*/
.v-enter-active {
  animation: appear 0.3s;
}
.v-leave-active {
  animation: disappear 0.3s;
}

.editor_wrap {
  position: relative;
}

.edit_tab {
  padding: 8px 10px;
  border: 1px solid #e6e6e6;
  border-radius: 2px 2px 0 0;
  background-color: #fbfbfb;

  .iconfont {
    cursor: pointer;
    padding: 5px;
    margin-right: 10px;
    font-size: 20px;
    color: var(--themeColor);
  }
}
.fly-editor {
  height: 260px;
}

.modal {
  & > div {
    position: absolute;
    top: 42px;
    left: 0;
    z-index: 99;
    background-color: #fff;
    border: 1px solid #d9d9d9;
    box-shadow: var(--boxShadow);
  }
}
</style>
