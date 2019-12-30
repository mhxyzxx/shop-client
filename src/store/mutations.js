/*
直接更新state的多个方法的对象
 */
import {
  RECEIVE_ADDRESS,
  RECEIVE_CATEGORYS,
  RECEIVE_SHOPS
} from './mutation-types'

export default {
  // 我们可以使用 ES2015 风格的计算属性命名功能来使用一个常量作为函数名,见官方文档
  // 参考：http://www.mamicode.com/info-detail-2855033.html
  // https://www.cnblogs.com/oneboi/p/7595102.html

  [RECEIVE_ADDRESS] (state, address) {
    state.address = address
  },
  [RECEIVE_CATEGORYS] (state, {categorys}) {
    state.categorys = categorys
  },
  [RECEIVE_SHOPS] (state, {shops}) {
    state.shops = shops
  }
}
