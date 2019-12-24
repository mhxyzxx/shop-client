<template>
  <div id="app">
    <router-view></router-view>
    <!-- 公共底部 -->
    <FooterGuide></FooterGuide>
  </div>
</template>

<script>
import FooterGuide from '@/components/FooterGuide/FooterGuide.vue'
export default {
  name: 'App',
  components: {
    FooterGuide
  }
}
</script>

<style>

</style>
