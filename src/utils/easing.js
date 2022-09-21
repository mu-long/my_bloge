/*
 * 缓动功能 - 灵感来自 http://gizma.com/easing/
 * 原帖地址 https://gist.github.com/gre/1650294
 * 仅考虑范围 [0, 1] => [0, 1] 的 t 值
 */
const EasingFunctions = {
  // 没有缓动，没有加速
  linear: t => t,
  // 从零速度加速
  easeInQuad: t => t * t,
  // 减速到零速度
  easeOutQuad: t => t * (2 - t),
  // 加速到一半，然后减速
  easeInOutQuad: t => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t),
  // 从零速度加速
  easeInCubic: t => t * t * t,
  // 减速到零速度
  easeOutCubic: t => --t * t * t + 1,
  // 加速到一半，然后减速
  easeInOutCubic: t =>
    t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1,
  // 从零速度加速
  easeInQuart: t => t * t * t * t,
  // 减速到零速度
  easeOutQuart: t => 1 - --t * t * t * t,
  // 加速到一半，然后减速
  easeInOutQuart: t => (t < 0.5 ? 8 * t * t * t * t : 1 - 8 * --t * t * t * t),
  // 从零速度加速
  easeInQuint: t => t * t * t * t * t,
  // 减速到零速度
  easeOutQuint: t => 1 + --t * t * t * t * t,
  // 加速到一半，然后减速
  easeInOutQuint: t =>
    t < 0.5 ? 16 * t * t * t * t * t : 1 + 16 * --t * t * t * t * t
}

module.exports = EasingFunctions
