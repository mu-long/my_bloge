/**
 * 混入获取验证码功能
 * */
import { getSid } from '@/api/getSid'
import { getCaptcha } from '@/api/login'

export default {
  data () {
    return {
      code: '', // 用户输入的验证码
      svg: '', // 验证码信息
      svgText: '', // 验证码文字
      sid: '' // 验证码唯一标识
    }
  },
  mounted () {
    // 获取验证码唯一标识
    this.sid = getSid()
    this._getCaptcha()
  },
  methods: {
    // 获取验证码
    async _getCaptcha (sid = this.sid) {
      // 初始化内容
      this.code = ''
      console.log('sid==>', sid)

      // let sid = this.$store.state.sid
      await getCaptcha(sid).then(res => {
        console.log(res)
        if (res.code === 200) {
          this.svg = res.data
          this.svgText = res.text
        }
      })
    }
  }
}
