<template>

  <div class="layui-tab-item layui-show reset_pwd">
    <!-- 修改密码 -->
    <ValidationObserver
      tag="form"
      v-slot="{ validate }"
      ref="observer_ref"
      class="layui-form layui-form-pane"
      action
    >
      <!-- 旧密码 -->
      <div class="layui-form-item">
        <ValidationProvider
          rules="required|minmax:6,16"
          v-slot="{ errors }"
          ref="old_pwd_ref"
        >
          <label
            for="L_nowpass"
            class="layui-form-label"
          >旧密码：</label>
          <div class="layui-input-inline">
            <input
              type="password"
              name="旧密码"
              required
              lay-verify="required"
              placeholder="请输入旧密码"
              autocomplete="off"
              class="layui-input"
              v-model.trim='old_pwd'
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
          <label class="layui-form-label">新密码：</label>
          <div class="layui-input-inline">
            <input
              type="password"
              name="新密码"
              required
              lay-verify="required"
              placeholder="请输入新密码"
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
              name="密码"
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
      <div class="layui-form-item">
        <button
          type="button"
          class="layui-btn"
          key="set-mine"
          lay-filter="*"
          lay-submit
          @click="validate().then(submit)"
        >
          确认修改
        </button>
      </div>
    </ValidationObserver>
  </div>
</template>

<script>
import { updatepwd } from '@/api/user'

export default {
  name: 'UpdatePwd', // 修改密码
  data () {
    return {
      old_pwd: '',
      password: '',
      confirmPassword: '' // 确认密码
    }
  },
  methods: {
    async submit () {
      if (this.password !== this.confirmPassword) {
        this.$refs.pwd_ref.setErrors(['密码输入不一致！'])
        return this.$mini('密码输入不一致！')
      }
      const isValid = await this.$refs.observer_ref.validate()
      // 如果校验失败
      if (!isValid) return
      console.log('email', this.$store.state.userInfo.email)
      const res = await updatepwd({ email: this.$store.state.userInfo.email, old_pwd: this.old_pwd, password: this.password })
      if (res.code === 200) {
        // 弹框提示
        this.$mini(res.msg)
        // 重置表单
        requestAnimationFrame(() => {
          this.$refs.observer_ref.reset()
        })
      } else if (res.code === 402) {
        this.$refs.old_pwd_ref.setErrors([`${res.msg}`])
        this.$mini(res.msg)
      } else {
        this.$mini(res.msg)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/css/layuiReset.scss';
</style>
