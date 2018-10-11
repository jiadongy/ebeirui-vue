<template>
  <div>
    <swiper loop auto :list="imgURL" :index="imgindex" @on-index-change="onIndexChange" height="200px"></swiper>
  </div>
</template>

<script>
  import {Swiper, SwiperItem} from 'vux';

  export default {
    name: "HomeHeader",
    components: {
      Swiper,
      SwiperItem
    },
    data() {
      return {
        imgindex: 0,
        imgURL: [{
          url: 'javascript:',
          img: 'https://static.vux.li/demo/1.jpg',
          title: '送你一朵fua'
        }, {
          url: 'javascript:',
          img: 'https://static.vux.li/demo/5.jpg',
          title: '送你一次旅行',
          fallbackImg: 'https://static.vux.li/demo/3.jpg'
        }]
      };
    },
    methods: {
      onIndexChange(index) {
        this.imgindex = index;
      }
    },
  }
</script>

<style scoped lang="less">

</style>
