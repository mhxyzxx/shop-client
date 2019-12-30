/**
 * ajax请求函数模块
 * 返回值：promise对象
 */
import axios from 'axios'
export default function ajax (url, data = {}, type = 'GET') {
  return new Promise(function (resolve, reject) {
    // 1. 执行异步ajax请求
    let promise
    if (type === 'GET') {
      // 准备url query参数数据
      let dataStr = '' // 数据拼接字符串
      // forEach() 方法用于调用数组的每个元素，并将元素传递给回调函数。
      // 注意: forEach() 对于空数组是不会执行回调函数的。
      Object.keys(data).forEach(key => {
        dataStr += key + '=' + data[key] + '&'
      })
      if (dataStr !== '') {
        dataStr = dataStr.substring(0, dataStr.lastIndexOf('&'))
        url = url + '?' + dataStr
      }

      // 发送Get请求
      promise = axios.get(url)
    } else {
      promise = axios.post(url, data)
    }
    promise
      .then(function (response) {
        // 2. 成功了调resolve()
        resolve(response.data)
      })
      .catch(function (error) {
        // 3. 失败了调reject()
        reject(error)
      })
  })
}
