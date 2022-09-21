<template>
  <div class="layui-container">
    <div class="reset_box">
      <p>《正在修改邮箱账号：<b>{{email}}</b>》</p>
      <p>确定修改密码为：<b>{{password}}</b> 吗？</p>
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
import { resetPwd } from '../api/user'

export default {
  name: 'Reset_pwd', // 重置密码
  data () {
    return {
      email: '',
      password: '',
      isSend: false,
      urlObj: {}
    }
  },
  mounted () {
    // http://localhost:8080/#/reset_pwd?key=05c2&password=myc.666&email=123%40qq.com
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
    this.password = this.urlObj.password
    console.log('urlObj ==> ', this.urlObj)
  },
  methods: {
    async submit () {
      await resetPwd(this.urlObj).then(res => {
        if (res.code === 200) {
          this.isSend = true
          this.$alert(res.msg)
          setTimeout(() => {
            this.$router.push('/login')
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
        color: var(--danger);
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
