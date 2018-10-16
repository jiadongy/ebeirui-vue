<template>
  <div>
    <home-header></home-header>

    <grid :show-lr-borders="false">
      <grid-item label="职业竞争力" link="/cc">
        <img slot="icon" src="">
      </grid-item>
      <grid-item label="性格测试">
        <img slot="icon" src="">
      </grid-item>
      <grid-item label="test">
        <img slot="icon" src="">
      </grid-item>
      <grid-item label="test2">
        <img slot="icon" src="">
      </grid-item>
    </grid>

    <divider></divider>
    <group-title>为你推荐</group-title>
    <card v-for="(lesson,i) in recommendList" :key="i" style="display: flex">
      <img slot="header" :src="lesson.imgUrl" style="display:block;">
      <a slot="content" class="card-padding" :href="lesson.link">
        <p style="color:#999;font-size:12px;">{{lesson.addTime}}</p>
        <p style="font-size:14px;line-height:1.2;">{{lesson.title}}</p>
      </a>
    </card>
    <!--<infinite-scroll :scroller="scroller" :loading="loading" @load="alert(111)"/>-->
  </div>
</template>

<script>
  import {Card,Grid, GridItem} from 'vux'
  import HomeHeader from "./slideShow";
  import Divider from "vux/src/components/divider/index";
  import GroupTitle from "vux/src/components/group-title/index";
  export default {
    name: "WxHome",
    components: {GroupTitle, Divider, HomeHeader,Card,Grid, GridItem},
    data(){
      return{
        loading:true,
        recommendList: [
          {
            type: 1,
            imgUrl: 'http://inews.gtimg.com/newsapp_ls/0/5812057912_150120/0',
            title: '9 月 CPI 同比涨 2.5% 创 7 个月新高 鲜菜价格大涨 14.6%',
            author: '黑鲨财经',
            abstract: '刚刚极力向大众科普了 “自动翻译” 和“人机耦合”两大概念的科大讯飞（SZ：002230）, 再次牵扯进了 “非法侵占国家级自然保护区” 的丑闻中。只不过，这次的爆料者，不再是一个不愿具名的小小同声传译员，而是央视。据央视报道，科大讯飞非法侵占安徽扬子鳄国家级自然保护区，以建设培训基地为名开发房地产。',
            addTime: '2018-10-16 10:10:59',
            clickNum: 999,
            link: '#/article/1'
          }
        ]
      }
    }

  }
</script>

<style scoped lang="less">

  .card-demo-flex {
    display: flex;
  }

  .card-demo-content01 {
    padding: 10px 0;
  }

  .card-padding {
    padding: 15px;
  }

  .card-demo-flex > div {
    flex: 1;
    text-align: center;
    font-size: 12px;
  }

  .card-demo-flex span {
    color: #f74c31;
  }
</style>

