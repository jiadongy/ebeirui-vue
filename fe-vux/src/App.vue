<template>
  <div id="app" style="height: 100%">
    <meta name="viewport" content="width=device-width,initial-scale=1,user-scalable=0">
    <router-view></router-view>
    <div style="height: 50px"></div>
    <home-footer></home-footer>
  </div>
</template>

<script>
  import HomeFooter from "./components/footer";

  export default {
    name: 'app',
    components: {HomeFooter},
  }
</script>

<style lang="less">
  @import '~vux/src/styles/reset.less';
  @import '~vux/src/styles/1px.less';
  @import '~vux/src/styles/close.less';

  body {
    background-color: #fbf9fe;
  }
</style>
