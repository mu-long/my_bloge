/**
 * 混入获取验证码功能
 * */
import { getSid } from '@/api/getSid'
import { getCaptcha } from '@/api/login'

export default {
  data() {
    return {
      code: '', // 用户输入的验证码
      svg: '', // 验证码信息
      svgText: '', // 验证码文字
      sid: this.$store.state.sid || '' // 验证码唯一标识
    }
  },
  mounted() {
    // 获取验证码唯一标识
    if (!this.sid) {
      const sid = getSid()
      this.sid = sid
      console.log('sid==>', sid)
      // this.$store.commit('setSid', sid)
    }

    this._getCaptcha(this.sid)
  },
  methods: {
    // 获取验证码
    _getCaptcha(sid) {
      // let sid = this.$store.state.sid
      getCaptcha(sid).then(res => {
        console.log(res)
        if (res.code === 200) {
          this.svg = res.data
          this.svgText = res.text
        }
      })
    }
  }
}
