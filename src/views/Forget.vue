<template>
  <div class="forget layui-container">
    <!-- layui-tab-brief 简洁风格tab -->
    <div class="layui-tab layui-tab-brief">
      <ul class="layui-tab-title">
        <li>
          <router-link :to="{name: 'login'}">登录</router-link>
        </li>
        <li class="layui-this">重置密码</li>
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
                tag="form"
                v-slot="{ validate }"
                ref="observer_ref"
                class="layui-form layui-form-pane"
              >
                <!-- 邮箱 -->
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
                <!-- 邮箱 -->
                <div class="layui-form-item">
                  <ValidationProvider
                    rules="required|email"
                    v-slot="{ errors }"
                    ref="email_ref"
                  >
                    <label class="layui-form-label">确认邮箱：</label>
                    <div class="layui-input-inline">
                      <input
                        type="text"
                        name="确认邮箱"
                        required
                        lay-verify="required"
                        placeholder="请确认邮箱"
                        autocomplete="off"
                        class="layui-input"
                        v-model.trim='confirmEmail'
                      />
                    </div>
                    <div class="layui-form-mid layui-word-aux">{{ errors[0] }}</div>
                  </ValidationProvider>
                </div>
                <!-- 新密码 -->
                <div class="layui-form-item">
                  <ValidationProvider
                    rules="required|minmax:6,16"
                    v-slot="{ errors }"
                    ref="pwd_ref"
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
                <!-- 确认密码 -->
                <div class="layui-form-item">
                  <ValidationProvider
                    rules="required|minmax:6,16"
                    v-slot="{ errors }"
                  >
                    <label class="layui-form-label">确认密码：</label>
                    <div class="layui-input-inline">
                      <input
                        type="password"
                        name="确认密码"
                        required
                        lay-verify="required"
                        placeholder="请确认密码"
                        autocomplete="off"
                        class="layui-input"
                        v-model.trim='confirmPassword'
                      />
                    </div>
                    <div class="layui-form-mid layui-word-aux">{{ errors[0] }}</div>
                  </ValidationProvider>
                </div>
                <!-- 验证码 -->
                <div class="layui-form-item">
                  <ValidationProvider
                    rules="required|length:5"
                    ref="code_ref"
                    v-slot="{ errors }"
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
                      v-else
                      class="layui-form-mid layui-word-aux"
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
                    >确认提交</button>
                    <button
                      type="reset"
                      class="layui-btn layui-btn-primary"
                    >重置表单</button>
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
import { getCaptcha, forget } from '@/api/login'

import { getSid } from '@/api/getSid'

export default {
  name: 'forget', // 忘记密码
  data () {
    return {
      email: '2069893427@qq.com',
      confirmEmail: '2069893427@qq.com', // 确认邮箱
      password: '',
      confirmPassword: '', // 确认密码
      svg: '',
      svgText: '',
      code: '',
      sid: this.$store.state.sid || '' // 验证码唯一标识
    }
  },
  components: {},
  mounted () {
    if (!this.sid) {
      const sid = getSid()
      this.sid = sid
      console.log('sid==>', sid)
      this.$store.commit('setSid', sid)
    }

    this._getCaptcha(this.sid)
  },
  methods: {
    // 获取验证码
    _getCaptcha (sid) {
      getCaptcha(sid).then((res) => {
        console.log(res)
        this.svg = res.data
        this.svgText = res.text
      })
    },
    async submit () {
      const isValid = await this.$refs.observer_ref.validate()
      // 如果校验失败
      if (!isValid) {
        return
      }
      if (this.email !== this.confirmEmail) {
        this.$refs.email_ref.setErrors(['邮箱输入不一致！'])
        return this.$mini('邮箱输入不一致！')
      }
      if (this.password !== this.confirmPassword) {
        this.$refs.pwd_ref.setErrors(['密码输入不一致！'])
        return this.$mini('密码输入不一致！')
      }
      console.log('submit')

      const res = await forget({
        email: this.email,
        password: this.password,
        code: this.code,
        sid: this.sid
      })
      if (res.code === 200) {
        // 发送邮件
        console.log('发送邮件')
        // 重置表单
        requestAnimationFrame(() => {
          this.$refs.observer_ref.reset()
        })
        this.$alert(res.msg)
        // 跳转到登录页面
        setTimeout(() => {
          this.$router.push('/login')
        }, 3000)
        return
      } else if (res.code === 401) {
        // 提示验证码错误
        this.$refs.code_ref.setErrors([res.msg])
      } else if (res.code === 404) {
        // 提示邮箱错误
        this.$refs.email_ref.setErrors([res.msg])
      }
      // 弹框提示
      this.$pop({ msg: res.msg })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../css/layuiReset.scss';
</style>
