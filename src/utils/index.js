import { easeInOutCubic } from '@/utils/easing'

// 获取元素位置
const getElementY = elem => {
  // window.pageYOffset 文档在垂直方向已滚动的像素值
  // getBoundingClientRect 获取元素相对于视口的位置
  return (
    window.pageYOffset +
    document.querySelector(elem).getBoundingClientRect().top
  )
}

/**
 * 滚动到指定的元素
 * @param {String} elem DOM元素
 * @param {Number} duration 滚动动画执行的持续时间
 * @param {Number} offset 滚动偏移量
 */
const scrollToElem = (elem, duration = 1000, offset = 0) => {
  // 初始位置
  const startY = window.pageYOffset
  // 元素位置
  const elementY = getElementY(elem)
  // 需要去滚动的距离
  const diff = elementY - startY + offset
  // 如果 diff 0
  if (!diff) return

  // 开始时间
  let start
  // 帧动画
  window.requestAnimationFrame(function step(timestamp) {
    // timestamp 时间戳
    if (!start) start = timestamp

    // 计算时间的差值，根据差值计算偏移量
    const time = timestamp - start
    // percent 百分比
    let percent = Math.min(time / duration, 1)
    // 调用缓动函数
    percent = easeInOutCubic(percent)
    // 滚动到给定元素的指定坐标位置
    window.scrollTo(0, startY + diff * percent)

    if (time < duration) {
      // 停止帧动画
      window.requestAnimationFrame(step)
    }
  })
}

export { scrollToElem }
