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
              <form
                class="layui-form layui-form-pane"
                action
              >
                <!-- 用户名 -->
                <div class="layui-form-item">
                  <ValidationProvider
                    rules="required|minmax:3,6"
                    v-slot="{ errors }"
                  >
                    <label class="layui-form-label">用户名：</label>
                    <div class="layui-input-inline">
                      <input
                        type="text"
                        name="用户名"
                        required
                        lay-verify="required"
                        placeholder="请输入用户名"
                        autocomplete="off"
                        class="layui-input"
                        v-model.trim='userName'
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
                <!-- 验证码 -->
                <div class="layui-form-item">
                  <ValidationProvider
                    rules="required|length:5"
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
                      @click="_getCaptcha()"
                    ></div>
                    <div class="layui-form-mid layui-word-aux">{{ errors[0] }}</div>
                  </ValidationProvider>
                </div>
                <div class="layui-form-item">
                  <div class="layui-input-block">
                    <button
                      class="layui-btn"
                      lay-submit
                      lay-filter="formDemo"
                      @click.prevent="submitForm()"
                    >确认提交</button>
                    <button
                      type="reset"
                      class="layui-btn layui-btn-primary"
                    >重置表单</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import myAxios from '@/api/myAxios'
import { getCaptcha, forget } from '@/api/login'

export default {
  name: 'forget', // 忘记密码
  data () {
    return {
      userName: '',
      email: '',
      svg: '',
      svgText: '',
      code: ''
    }
  },
  components: {},
  mounted () {
    this._getCaptcha()
  },
  methods: {
    _getCaptcha () {
      getCaptcha().then((res) => {
        console.log('res===>', res)
        this.svg = res.data
        this.svgText = res.text
      })
    },
    // .
    submitForm () {
      forget({
        userName: this.userName,
        email: this.email,
        code: this.code
      }).then(res => {
        console.log(res)
        if (res.code === 200) {
          alert('邮件发送成功')
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../css/layuiReset.scss';
</style>
