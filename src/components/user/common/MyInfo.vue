<template>
  <div class="layui-tab-item layui-show my_info">
    <!-- 表单 此标签会渲染为form标签 -->
    <ValidationObserver
      tag="form"
      v-slot="{ validate }"
      ref="observer_ref"
      class="layui-form layui-form-pane"
    >
      <!-- 邮箱 -->
      <div class="layui-form-item">
        <label class="layui-form-label">邮箱：</label>
        <div class="layui-input-block">
          <ValidationProvider
            rules="required|email"
            v-slot="{ errors }"
          >
            <input
              type="text"
              name="邮箱"
              required
              lay-verify="required"
              placeholder="请输入邮箱"
              autocomplete="off"
              class="layui-input"
              v-model.trim="email"
            >
            <span class="layui-form-mid layui-word-aux">{{ errors[0] }}</span>
          </ValidationProvider>
        </div>
      </div>
      <!-- 昵称 -->
      <div class="layui-form-item">
        <label class="layui-form-label">昵称：</label>
        <div class="layui-input-block">
          <ValidationProvider
            rules="required|minmax:3,6"
            v-slot="{ errors }"
            ref="username_ref"
          >
            <input
              type="text"
              name="昵称"
              required
              lay-verify="required"
              placeholder="请输入昵称"
              autocomplete="off"
              class="layui-input"
              v-model.trim="username"
            >
            <span class="layui-form-mid layui-word-aux">{{ errors[0] }}</span>
          </ValidationProvider>
        </div>
      </div>
      <!-- 城市 -->
      <div class="layui-form-item">
        <label class="layui-form-label">城市：</label>
        <div class="layui-input-block">
          <input
            type="text"
            name="title"
            placeholder="请输入城市"
            autocomplete="off"
            class="layui-input"
            v-model.trim="location"
          >
        </div>
      </div>
      <!-- 性别 -->
      <div class="layui-form-item gender_box">
        <label class="layui-form-label">性别：</label>
        <div class="gender">
          <label for="gender0">
            <input
              id="gender0"
              type="radio"
              name="sex"
              value="0"
              title="男"
              v-model.trim="gender"
            >
            <i
              class="layui-icon layui-icon-circle"
              :class="{'layui-icon-radio': gender == 0}"
            ></i>
            <span>男</span>
          </label>
          <label for="gender1">
            <input
              id="gender1"
              type="radio"
              name="sex"
              value="1"
              title="女"
              v-model.trim="gender"
            >
            <i
              class="layui-icon layui-icon-circle"
              :class="{'layui-icon-radio': gender == 1}"
            ></i>
            <span>女</span>
          </label>
        </div>
      </div>
      <!-- 个性签名 -->
      <div class="layui-form-item layui-form-text">
        <label class="layui-form-label">个性签名：</label>
        <div class="layui-input-block">
          <textarea
            name="desc"
            placeholder="请输入个性签名"
            class="layui-textarea"
            v-model.trim="regmark"
          ></textarea>
        </div>
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
              class="layui-input svg_input"
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
            class="layui-form-mid layui-word-aux"
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
          >确认修改</button>
        </div>
      </div>
    </ValidationObserver>
  </div>
</template>

<script>
import { getSid } from '@/api/getSid'
import { updateUserInfo } from '@/api/user'
import { getCaptcha } from '@/api/login'

export default {
  name: 'MyInfo', // 我的资料
  data () {
    return {
      email: '', // 邮箱
      username: '', // 昵称
      location: '', // 位置
      gender: '', // 性别
      regmark: '', // 签名
      svg: '', // 验证码信息
      svgText: '', // 验证码文字
      code: '', // 用户输入的验证码
      sid: this.$store.state.sid || '' // 验证码唯一标识
    }
  },
  mounted () {
    const sid = getSid()
    this.sid = sid
    this._getCaptcha(sid)

    const { email, username, location, gender, regmark } = this.$store.state.userInfo
    this.email = email || ''
    this.username = username || ''
    this.location = location || ''
    this.gender = gender || ''
    this.regmark = regmark || ''
  },
  methods: {
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
      // 如果校验失败
      const isValid = await this.$refs.observer_ref.validate()
      if (!isValid) {
        return
      }
      const updateInfo = {
        email: this.email, // 邮箱
        username: this.username, // 昵称
        location: this.location, // 位置
        gender: this.gender, // 性别
        regmark: this.regmark, // 签名
        code: this.code,
        sid: this.sid
      }
      // console.log(666)
      await updateUserInfo(updateInfo).then(res => {
        if (res.code === 200) {
          // 信息更新成功！
          // this.$pop(res.msg)
          // 更新本地资料
          const user = this.$store.state.userInfo
          this.$store.commit('setUserInfo', Object.assign(user, updateInfo))
        } else if (res.code === 402) {
          // 提示验证码错误
          this.$refs.code_ref.setErrors([res.msg])
        } else if (res.code === 403) {
          // 提示验证码错误
          this.$refs.username_ref.setErrors([res.msg])
        }
        this.$pop(res.msg)
      }).catch(err => {
        console.log(err)
        // if (err.toString().includes('500')) {
        //   this.$alert('重置链接到期！请重新操作...')
        // }
        this.$pop('信息更新失败！')
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/css/layuiReset.scss';

.layui-icon-radio {
  color: var(--themeColor);
}

.layui-input-block span {
  display: flex;
}

.layui-form {
  margin-top: 0;
}

.layui-form .layui-word-aux {
  margin-left: 10px;
}

.layui-form-pane .layui-input {
  width: 60%;
}
.layui-form-pane .layui-form-text .layui-form-label,
.layui-form-pane .layui-form-text .layui-textarea {
  width: 70%;
}
.layui-form-pane .svg_input {
  width: 100%;
}

.gender_box {
  display: flex;
  align-items: center;
}

.gender {
  display: flex;
  align-items: center;
  padding: 0 10px;

  label {
    display: flex;
    align-items: center;
    margin-right: 10px;

    span {
      margin-left: 3px;
    }
  }
}
</style>
