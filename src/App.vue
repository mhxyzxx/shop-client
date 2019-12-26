<template>
  <div id="app">
    <router-view></router-view>
    <!-- 公共底部 -->
    <FooterGuide v-show="$route.meta.showFooter"></FooterGuide>
  </div>
</template>

<script>
import FooterGuide from '@/components/FooterGuide/FooterGuide.vue'
import { reqFoodCategorys } from './api'
export default {
  name: 'App',
  components: {
    FooterGuide
  },
  async mounted () {
    const res = await reqFoodCategorys()
    console.log(res)
  },
  methods: {

  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
#app {
  width: 100%;
  height: 100%;
  background: #f5f5f5;
}
</style>
