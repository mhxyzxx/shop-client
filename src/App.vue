<template>
  <div id="app">
    <router-view></router-view>
    <!-- 公共底部 -->
    <FooterGuide v-show="$route.meta.showFooter"></FooterGuide>
  </div>
</template>

<script>
import FooterGuide from '@/components/FooterGuide/FooterGuide.vue'
import { mapActions } from 'vuex'
export default {
  name: 'App',
  components: {
    FooterGuide
  },
  mounted () {
    // 第一种方法：
    // this.$store.dispatch('getAddress')
    // 第二种方法：使用mapActions映射函数
    this.getAddress()
  },
  methods: {
    ...mapActions(['getAddress'])
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
