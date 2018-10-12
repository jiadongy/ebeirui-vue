<template>
  <div id="app" style="height: 100%">
    <meta name="viewport" content="width=device-width,initial-scale=1,user-scalable=0">
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'app'
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
