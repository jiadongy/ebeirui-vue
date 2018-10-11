<template>
  <div v-transfer-dom>
    <tabbar style="position: fixed">
      <tabbar-item>
        <img slot="icon" src="">
        <span slot="label">Wechat</span>
      </tabbar-item>
      <tabbar-item show-dot>
        <img slot="icon" src="">
        <span slot="label">Message</span>
      </tabbar-item>
      <tabbar-item selected link="/component/demo">
        <img slot="icon" src="">
        <span slot="label">Explore</span>
      </tabbar-item>
      <tabbar-item badge="2">
        <img slot="icon" src="">
        <span slot="label">News</span>
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
