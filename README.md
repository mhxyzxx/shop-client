# day01
## 1. 项目开发准备
    项目描述
    技术选型
    API接口
    你能从此项目中学到什么?

## 2. 开启项目开发
    使用脚手架创建项目
    安装所有依赖/指定依赖
    开发环境运行
    生产环境打包与发布

## 3. 搭建项目整体界面结构

    stylus的理解和使用
        结构化, 变量, 函数/minxin(混合)
    vue-router的理解和使用
        router-view/router-link/keep-alive
        $router: 路由器对象, 包含一些操作路由的功能函数, 来实现编程式导航(跳转路由)
        $route: 当前路由对象, 一些当前路由信息数据的容器, path/meta/query/params
    项目路由拆分
    底部导航组件: FooterGuide
    导航路由组件: Msite/Search/Order/Profile

### 3.1 tabbar激活样式

```html
<a href="javascript:;" class="guide_item" :class="{on: '/msite' === $route.path}" @click.prevent="goTo('/msite')">
    <span class="item_icon">
        <i class="iconfont icon-waimai"></i>
    </span>
    <span>外卖</span>
</a>
<script>
export default {
  name: 'FooterGuide',
  methods: {
    goTo (path) {
      this.$router.replace(path)
    }
  }
}
</script>

```



## 4. 抽取公共头部组件

**插槽和props使用的场景：** 当我们的固定顶部导航整体样式一样，但里面的内容不一样。当我们在切换底部导航，渲染不同的页面。导航都是不一样的。此时，我们会把顶部导航放在各个路由组件的里面。因为四个导航的顶部只是内容不一样。此时，考虑把导航组件单独提取出来。使用slot插槽来传递标签和props属性来传递值来实现。如下：

1. 头部组件: HeaderTop, 通过slot来实现组件通信标签结构
2. 使用slot插槽来传递标签和props属性来传递值

`HeaderTop.vue`

```html
<template>
  <header class="header">
    <slot name="left"></slot>
    <span class="header_title">
      <span class="header_title_text ellipsis">{{ title }}</span>
    </span>
    <slot name="right"></slot>
  </header>
</template>

<script>

export default {
  props: {
    title: String
  }
}
</script>
```

`MSite.vue`

```html
<!--首页头部-->
<HeaderTop title="昌平区北七家宏福科技园(337省道北)">
    <span class="header_search" slot="left">
        <i class="iconfont icon-sousuo"></i>
    </span>
    <span class="header_login" slot="right">
        <span class="header_login_text">登录|注册</span>
    </span>
</HeaderTop>
```

### 4.1 首页-轮播swiper的使用

[swiper官网api](https://www.swiper.com.cn/usage/index.html) 

```js
# 先下载安装npm i swiper
<script>
import HeaderTop from '../../components/HeaderTop/HeaderTop.vue'
// 局部引入swiper
import Swiper from 'swiper'
import 'swiper/dist/css/swiper.min.css'

export default {
  components: {
    HeaderTop
  },
  mounted () {
    /* eslint-disable no-new */
    // 创建一个Swiper对象，来实现轮播
    new Swiper('.swiper-container', {
      loop: true, // 循环模式选项

      // 如果需要分页器
      pagination: {
        el: '.swiper-pagination'
      }
    })
  }
}

</script>
```

### 4.2 把首页商品列表提取成单独一个组件

因首页商品列表太多，我可考虑提取成单独的一个组件



## 5. 登陆路由组件

```js
 静态组件
 FooterGuide的显示/隐藏: 通过路由的meta
 # meta这个属性值默认就有，如果不指定就是空对象。空对象去取属性值就是false
 <FooterGuide v-show="$route.meta.showFooter"></FooterGuide>
 
 登录组件左上角返回按钮，可使用$route.back方法返回是上一页，如下：
<a href="javascript:" class="go_back" @click="$router.back()">
    <i class="iconfont icon-jiantou2"></i>
</a>
```



## 6. 后台项目

    启动后台项目: 理解前后台分离
    测试后台接口: 使用postman
    修正接口文档

## 7. 前后台交互
    ajax请求库: axios
    ajax请求函数封装: axios + promise
    接口请求函数封装: 每个后台接口


# day02
## 1. 异步数据的总结
```js
# 定位和重新选择位置：都是因为确定经纬度的。
# mutation-types是写mutation和actions进行交互的常量模块
封装ajax: 
    promise+axios封装ajax请求的函数
    封装每个接口对应的请求函数(能根据接口定义ajax请求函数)
    解决ajax的跨越域问题: 配置代理, 对代理的理解
vuex编码
    创建所有相关的模块: store/index|state|mutations|actions|getters|mutation-types
    设计state: 从后台获取的数据
    实现actions: 
        定义异步action: async/await
        流程:　发ajax获取数据, commit给mutation
    实现mutations: 给状态赋值
    实现index: 创建store对象
    main.js: 配置store
组件异步显示数据
    在mounted()通过$store.dispatch('actionName')来异步获取后台数据到state中
    mapState(['xxx'])读取state中数据到组件中
    在模板中显示xxx的数据
模板中显示数据的来源
    data: 自身的数据(内部改变)
    props: 外部传入的数据(外部改变)
    computed: 根据data/props/别的compute/state/getters
异步显示轮播图
    通过vuex获取foodCategorys数组(发请求, 读取)
    对数据进行整合计算(一维变为特定的二维数组)
    使用Swiper显示轮播, 如何在界面更新之后创建Swiper对象?
        1). 使用回调+$nextTick()
        2). 使用watch+$nextTick()	
```

### 1.1 封装ajax请求的函数

> 封装发请求的函数，参数应该注意：请求的地址，请求的方式，请求的参数

```js
/*
ajax请求函数模块
返回值: promise对象(异步返回的数据是: response.data)
因为我想要返回response.data的结果，所以外层又使用了一个Promise对象
 */
import axios from 'axios'
export default function ajax (url, data={}, type='GET') {

  return new Promise(function (resolve, reject) {
    // 执行异步ajax请求
    let promise
    if (type === 'GET') {
      // 准备url query参数数据
      let dataStr = '' //数据拼接字符串
      Object.keys(data).forEach(key => {
        dataStr += key + '=' + data[key] + '&'
      })
      if (dataStr !== '') {
        dataStr = dataStr.substring(0, dataStr.lastIndexOf('&'))
        url = url + '?' + dataStr
      }
      // 发送get请求
      promise = axios.get(url)
    } else {
      // 发送post请求
      promise = axios.post(url, data)
    }
    promise.then(function (response) {
      // 成功了调用resolve()
      resolve(response.data)
    }).catch(function (error) {
      //失败了调用reject()
      reject(error)
    })
  })
}

/*
const response = await ajax()
const result = response.data

const resule = await ajax()
 */
```

### 1.2 封装接口请求的函数

```js
/*
包含n个接口请求函数的模块
函数的返回值: promise对象
 */
import ajax from './ajax'
// const BASE_URL = 'http://localhost:4000'
const BASE_URL = '/api'

// 1、根据经纬度获取位置详情
export const reqAddress = (geohash) => ajax(`${BASE_URL}/position/${geohash}`)
// 2、获取食品分类列表
export const reqFoodCategorys = () => ajax(BASE_URL+'/index_category')
// 3、根据经纬度获取商铺列表
export const reqShops = (longitude, latitude) => ajax(BASE_URL+'/shops', {longitude, latitude})
// 4、根据经纬度和关键字搜索商铺列表
export const reqSearchShop = (geohash, keyword) => ajax(BASE_URL+'/search_shops', {geohash, keyword})
// 6、用户名密码登陆
export const reqPwdLogin = ({name, pwd, captcha}) => ajax(BASE_URL+'/login_pwd', {name, pwd, captcha}, 'POST')
// 7、发送短信验证码
export const reqSendCode = (phone) => ajax(BASE_URL+'/sendcode', {phone})
// 8、手机号验证码登陆
export const reqSmsLogin = (phone, code) => ajax(BASE_URL+'/login_sms', {phone, code}, 'POST')
// 9、根据会话获取用户信息
export const reqUserInfo = () => ajax(BASE_URL+'/userinfo')
// 10、用户登出
export const reqLogout = () => ajax(BASE_URL+'/logout')

/**
 * 获取商家信息
 */
export const reqShopInfo = () => ajax('/info')

/**
 * 获取商家评价数组
 */
export const reqShopRatings = () => ajax('/ratings')

/**
 * 获取商家商品数组
 */
export const reqShopGoods = () => ajax('/goods')
```

### 1.3 配置代理实现跨域请求

> 跨域出现的原因：浏览器限制了跨域的请求。
>
> 解决办法：
>
> 1. 服务器告诉浏览器，你允许我跨域；
> 2. 客户端蒙蔽浏览器，让浏览器觉的它没有跨域，但实际上跨域了；

`config/index.js` 

```js
proxyTable: {
      '/api': { // 匹配所有以 '/api'开头的请求路径
        target: 'http://localhost:4000', // 代理目标的基础路径
        changeOrigin: true, // 支持跨域
        pathRewrite: {// 重写路径: 去掉路径中开头的'/api'
          '^/api': ''
        }
      }
    },
```

### 1.4 创建vuex的整体结构

> 

## 2. 登浏览器陆/注册: 界面相关效果

    a. 切换登陆方式
    b. 手机号合法检查
    c. 倒计时效果
    d. 切换显示或隐藏密码
    g. 前台验证提示

## 3. 前后台交互相关问题
    1). 如何查看你的应用是否发送某个ajax请求?  
        浏览器的network
    2). 发ajax请求404
        请求的路径的对
        代理是否生效(配置和重启)
        服务器应用是否运行
    3). 后台返回了数据, 但页面没有显示?
        vuex中是否有
        组件中是否读取

# day03
## 1. 完成登陆/注册功能
    1). 2种方式
       手机号/短信验证码登陆
       用户名/密码/图片验证码登陆
    2). 登陆的基本流程
       表单前台验证, 如果不通过, 提示
       发送ajax请求, 得到返回的结果
       根据结果的标识(code)来判断登陆请求是否成功
           1: 不成功, 显示提示
           0. 成功, 保存用户信息, 返回到上次路由
    3). vue自定义事件
       绑定监听: @eventName="fn"  function fn (data) {// 处理}
       分发事件: this.$emit('eventName', data)
    4). 注意:
       使用network查看请求(路径/参数/请求方式/响应数据)
       使用vue的chrome插件查看vuex中的state和组件中的数据
       使用debugger语句调试代码
       实参类型与形参类型的匹配问题

## 2. 搭建商家整体界面
    1). 拆分界面路由
    2). 路由的定义/配置|使用

## 3. 模拟(mock)数据/接口
    1). 前后台分离的理解
    2). mockjs的理解和使用
    3). jons数据设计的理解

## 4. ShopHeader组件
    1). 异步显示数据效果的编码流程
        ajax
          ajax请求函数
          接口请求函数
        vuex
          state
          mutation-types
          actions
          mutations
        组件
          dispatch(): 异步获取后台数据到vuex的state
          mapState(): 从vuex的state中读取对应的数据
          模板中显示
    2). 初始显示异常
        情况1: Cannot read property 'xxx' of undefined"
        原因: 初始值是空对象, 内部没有数据, 而模块中直接显示3层表达式
        解决: 使用v-if指令
        
        情况2: Cannot read property 'xxx' of null"
     
    3). vue transition动画

# day04
## 1. ShopGoods组件
    1). 动态展现列表数据
    2). 基本滑动:
        使用better-scroll
        理解其基本原理
        创建BScroll对象的时机
          watch + $nextTick()
          callback + $nextTick
    3). 滑动右侧列表, 左侧同步更新
        better-scroll禁用了原生的dom事件, 使用的是自定义事件
        绑定监听: scroll/scrollEnd
        滚动监听的类型: probeType
        列表滑动的3种类型
            手指触摸
            惯性
            编码
        分析:
            类名: current 标识当前分类
            设计一个计算属性: currentIndex
            根据哪些数据计算?
              scrollY: 右侧滑动的Y轴坐标 (滑动过程时实时变化)
              tops: 所有右侧分类li的top组成的数组  (列表第一次显示后就不再变化)
        编码:
            1). 在滑动过程中, 实时收集scrollY
            2). 列表第一次显示后, 收集tops
            3). 实现currentIndex的计算逻辑
    4). 点击左侧列表项, 右侧滑动到对应位置

## 2. CartControl组件
    1). 问题: 更新状态数据, 对应的界面不变化
        原因: 一般方法给一个已有绑定的对象中添加一个新的属性, 这个属性没有数据绑定
        解决: 
            Vue.set(obj, 'xxx', value)才有数据绑定
            this.$set(obj, 'xxx', value)才有数据绑定

## 3. ShopCart组件
    1). 使用vuex管理购物项数据: cartFoods
    2). 解决几个功能性bug

## 4. Food组件
    1). 父子组件:
        子组件调用父组件的方法: 通过props将方法传递给子组件
        父组件调用子组件的方法: 通过ref找到子组件标签对象

# day05
## 1. ShopRatings组件
    1). 列表的过滤显示
    2). 自定义过滤器

## 2. ShopInfo组件
    1). 使用better-scroll实现两个方向的滑动
    1). 通过JS动态操作样式
    2). 解决当前路由刷新异常的bug

## 3. Search组件
    1). 根据关键字来异步搜索显示匹配的商家列表
    2). 如实实现没有搜索结果的提示显示

## 4. 项目优化
    1). 缓存路由组件对象
    2). 路由组件懒加载
    3). 图片司加载: vue-lazyload
    4). 分析打包文件并优化 