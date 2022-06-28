<template>
  <div class="layui-container">
    <div class="reset_box">
      <p>确定修改邮箱为：<b>{{email}}</b> 吗？</p>
      <div class="layui-row">
        <button
          type="button"
          class="layui-btn"
          :class="{'layui-btn-disabled': isSend}"
          @click="submit()"
        >确定修改</button>
        <router-link
          to="/"
          class="layui-btn layui-btn-primary"
        >返回首页</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { updateEmail } from '../api/user'

export default {
  name: 'Reset_email', // 重置邮箱
  data () {
    return {
      email: '',
      isSend: false,
      urlObj: {}
    }
  },
  mounted () {
    // http://localhost:8080/#/reset_email?key=666&email=123%40qq.com&username=admin
    // 把问号前面替换为空
    const queryStr = window.location.href.replace(/.*\?/, '')
    console.log('queryStr ==> ', queryStr)
    // queryStr ==>  key=666&email=123%40qq.com&username=admin
    // 把问号后面的字符串分隔后，转化为对象
    this.urlObj = Object.fromEntries(queryStr.split('&').map(v => v.split('=')))
    console.log('urlObj ==> ', this.urlObj)
    // urlObj ==>  {key: '666', email: '123%40qq.com', username: 'admin'}
    // 解码 统一资源标识符（URI）'123%40qq.com' => '123@qq.com'
    this.email = decodeURIComponent(this.urlObj.email)
    this.urlObj.email = this.email
    console.log('urlObj ==> ', this.urlObj)
  },
  methods: {
    async submit () {
      await updateEmail(this.urlObj).then(res => {
        if (res.code === 200) {
          this.isSend = true
          this.$store.commit('setUserInfo', { email: this.email })
          this.$alert(res.msg)
          setTimeout(() => {
            this.$router.push('/')
          }, 1000)
        }
      }).catch(err => {
        console.log(err)
        if (err.toString().includes('500')) {
          this.$alert('重置链接到期！请重新操作...')
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.layui-container {
  margin-top: 60px;
  width: 500px;
  min-height: 350px;
  background: #fff;
  box-shadow: var(--boxShadow);
  display: flex;
  justify-content: center;
  align-items: center;

  .reset_box {
    text-align: center;

    p {
      margin: 40px 0;
      font-size: 20px;
      b {
        color: var(--orange);
      }
    }

    .layui-row {
      padding-top: 30px;
      display: flex;
      justify-content: space-around;
    }
  }
}
</style>
