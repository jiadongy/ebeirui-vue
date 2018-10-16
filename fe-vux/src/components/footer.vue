<template>
  <div v-transfer-dom>
    <tabbar style="position: fixed">
      <tabbar-item selected link="/">
        <img slot="icon" src="">
        <span slot="label">首页</span>
      </tabbar-item>
      <tabbar-item show-dot link="/article">
        <img slot="icon" src="">
        <span slot="label">文章</span>
      </tabbar-item>
      <tabbar-item link="/lesson">
        <img slot="icon" src="">
        <span slot="label">课程</span>
      </tabbar-item>
      <tabbar-item badge="2" link="/me">
        <img slot="icon" src="">
        <span slot="label">我</span>
      </tabbar-item>
    </tabbar>
  </div>
</template>

<script>
  import { Tabbar, TabbarItem } from 'vux'

  export default {
    name: "HomeFooter",
    components: {
      Tabbar,
      TabbarItem
    }
  }
</script>

<style scoped>

</style>
