/**
 * 转换为HTML
 */

import faces from '@/assets/js/face'

// 转换为HTML
const convertHtml = (val = '') => {
  if (!val) return ''
  let result = val

  // 替换表情 Face[嘻嘻] Face[ok]
  const faceReg = /Face\[[a-zA-Z0-9\u4e00-\u9fa5]+\]/g
  if (faceReg.test(result)) {
    // match 匹配
    const group = result.match(faceReg)
    console.log('group ==> ', group)
    group.map(item => {
      const key = item.match(/\[\S+\]/g)[0]
      console.log('key ==> ', key)
      result = result.replace(
        item,
        `<img class="post_face" src='${faces[key]}'>`
      )
    })
  }

  // 图片替换 Img[http://localhost:3000/post_img/2022-0817/7f98fdd5-36ed-40e7-bd66-e6d53ea6462f.png]
  const imgReg = /Img\[\S+\]/g
  if (imgReg.test(result)) {
    const group = result.match(imgReg)
    console.log('group ==> ', group)
    group.map(item => {
      console.log('item ==> ', item)
      result = result.replace(
        item,
        `<img class="post_img" src='${item.substring(4, item.length - 1)}'>`
      )
    })
  }

  // 链接替换 A(百度)[baidu.com]
  const linkReg = /A\(\S+\)\[\S+\]/g
  if (linkReg.test(result)) {
    const group = result.match(linkReg)
    console.log('group ==> ', group)
    const titleReg = /\((\S+)\)/
    const urlReg = /\[(\S+)\]/
    group.map(item => {
      const titleGroup = item.match(titleReg)
      const urlGroup = item.match(urlReg)
      console.log('titleGroup ==> ', titleGroup)
      console.log('urlGroup ==> ', urlGroup)
      result = result.replace(
        item,
        `<a class="post_link" href="${urlGroup[1]}">${titleGroup[1]}</a>`
      )
    })
  }

  function htmlEncode(html) {
    // 1.首先动态创建一个容器标签元素，如DIV
    let temp = document.createElement('div')
    // 2.然后将要转换的字符串设置为这个元素的innerText(ie支持)或者textContent(火狐，google支持)
    temp.textContent !== undefined
      ? (temp.textContent = html)
      : (temp.innerText = html)
    // 3.最后返回这个元素的innerHTML，即得到经过HTML编码转换的字符串了
    const output = temp.innerHTML
    temp = null
    console.log('output ==> ', output)
    return output
  }

  // 代码块替换 [Code]<p>666</p>[/Code]
  const codeReg = /\[Code\][\d\D]*?\[\/Code\]/g
  if (codeReg.test(result)) {
    const group = result.match(codeReg)
    console.log('group ==> ', group)
    group.map(item => {
      console.log('item ==> ', item)
      result = result.replace(item, htmlEncode(item))
    })
    result = result.replace(/\[Code\]/g, '<pre>')
    result = result.replace(/\[\/Code\]/g, '</pre>')
  }

  // hr替换
  result = result.replace(/\[Hr\/\]/g, '<hr />')

  // 回车换行的替换
  result = result.replace(/\r\n/g, '<br />')
  result = result.replace(/\n/g, '<br />')

  console.log('转换为HTML result ==> ', result)
  return result
}

export default convertHtml
