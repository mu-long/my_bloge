/**
 * 过滤器
 */
import moment from 'moment'
import 'moment/locale/zh-cn'

// 格式化时间
const formattingTime = date => {
  // 超过7天，显示日期
  if (moment(date).isBefore(moment().subtract(7, 'days'))) {
    return moment(date).format('YYYY-MM-DD')
  } else {
    // 显示 几秒前 几分前 几天前
    return moment(date).from(moment())
  }
}

export default {
  formattingTime
}
