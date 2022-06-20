<template>
  <div class="login layui-container">
    <!-- layui-tab-brief 简洁风格tab -->
    <div class="layui-tab layui-tab-brief">
      <ul class="layui-tab-title">
        <li class="layui-this">登录</li>
        <li>
          <router-link :to="{name: 'logon'}">注册</router-link>
        </li>
      </ul>
      <div class="layui-tab-content">
        <div class="layui-tab-item layui-show">
          <div class="layui-row layui-col-space30">
            <div class="layui-col-md6">
              <img
                src="~@/assets/001.jpg"
                alt
              />
            </div>
            <div class="layui-col-md6">
              <!-- 表单 此标签会渲染为form标签 -->
              <ValidationObserver
                class="layui-form layui-form-pane"
                action
                tag="form"
                v-slot="{ validate }"
                ref="observer_ref"
              >
                <!-- 用户名 -->
                <div class="layui-form-item">
                  <ValidationProvider
                    rules="required|email"
                    v-slot="{ errors }"
                  >
                    <label class="layui-form-label">邮箱：</label>
                    <div class="layui-input-inline">
                      <input
                        type="text"
                        name="邮箱"
                        required
                        lay-verify="required"
                        placeholder="请输入邮箱"
                        autocomplete="off"
                        class="layui-input"
                        v-model.trim='email'
                      />
                    </div>
                    <div class="layui-form-mid layui-word-aux">{{ errors[0] }}</div>
                  </ValidationProvider>
                </div>
                <!-- 密码 -->
                <div class="layui-form-item">
                  <ValidationProvider
                    rules="required|minmax:6,16"
                    v-slot="{ errors }"
                  >
                    <label class="layui-form-label">密码：</label>
                    <div class="layui-input-inline">
                      <input
                        type="password"
                        name="密码"
                        required
                        lay-verify="required"
                        placeholder="请输入密码"
                        autocomplete="off"
                        class="layui-input"
                        v-model.trim='password'
                      />
                    </div>
                    <div class="layui-form-mid layui-word-aux">{{ errors[0] }}</div>
                  </ValidationProvider>
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
                      v-if="svg !== '' "
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
                  <div class="layui-input-block">
                    <button
                      class="layui-btn"
                      lay-submit
                      lay-filter="formDemo"
                      type="button"
                      @click="validate().then(submit)"
                    >立即登录</button>
                    <button
                      type="reset"
                      class="layui-btn layui-btn-primary"
                    >重置表单</button>
                    <!-- <a
                      class="forget_pwd"
                      href="javascript:;"
                    >忘记密码？</a> -->
                    <router-link
                      class="forget_pwd"
                      :to="{name: 'forget'}"
                    >忘记密码？</router-link>
                  </div>
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
import { getCaptcha, login } from '@/api/login'
import { getSid } from '../api/getSid'

export default {
  name: 'login', // 登录
  data () {
    return {
      // username: '',
      // email: '',
      email: 'imulong@qq.com', // 测试使用
      password: 'myc.666',
      svg: '',
      svgText: '',
      code: '',
      sid: '' // 验证码唯一标识
    }
  },
  components: {},
  mounted () {
    const sid = getSid()
    this.sid = sid
    console.log('sid==>', sid)

    this._getCaptcha(sid)
  },
  methods: {
    hendleShow () {
      this.alertShow = false
    },
    // 获取验证码
    _getCaptcha (sid) {
      // let sid = this.$store.state.sid
      getCaptcha(sid).then((res) => {
        console.log(res)
        this.svg = res.data
        this.svgText = res.text
      })
    },
    async submit () {
      // console.log('submit 登录', this.$refs.observer_ref)
      // 如果校验失败
      const isValid = await this.$refs.observer_ref.validate()
      if (!isValid) {
        return
      }

      login({
        email: this.email,
        password: this.password,
        code: this.code,
        sid: this.sid
      }).then(res => {
        console.log('login res==>', res)
        if (res.code === 200) {
          // 保存用户信息到vuex
          this.$store.commit('setUserInfo', res.data)
          // 保存令牌
          this.$store.commit('setToken', res.token)
          // 保存登录标识
          this.$store.commit('setIsLogin', true)
          this.email = ''
          this.password = ''
          this.code = ''
          // 重置表单
          requestAnimationFrame(() => {
            if (this.$refs.observer_ref) {
              this.$refs.observer_ref.reset()
            }
          })
          // 跳转到首页
          this.$router.push('/index')
        } else if (res.code === 401) {
          // 提示验证码错误
          this.$refs.code_ref.setErrors([res.msg])
        }
        // 弹框提示
        // this.$confirm(res.msg)
        this.$mini(res.msg)
      })
      // .catch(err => {
      //   console.log(err)
      //   this.$alert(err)
      // })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../css/layuiReset.scss';
</style>
