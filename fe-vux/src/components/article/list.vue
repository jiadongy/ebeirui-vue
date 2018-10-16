<template>
  <div>
    <search-local v-model="searchWord" v-on:value-selected="function (){}" v-on:cancel="function (){}"
                  v-bind:picker="function (){}"></search-local>

    <card v-for="(article,i) in list" :key="i" style="display: flex">
      <img slot="header" :src="article.imgUrl" style="width:80px;height:80px;display:block;">
      <a slot="content" class="card-padding" :href="article.link">
        <p style="color:#999;font-size:12px;">{{article.addTime}}</p>
        <p style="font-size:14px;line-height:1.2;">{{article.title}}</p>
      </a>
    </card>
  </div>
</template>

<script>
  import {Card, Panel} from 'vux'
  import SearchLocal from '../search/searchLocal'

  export default {
    name: "article-list",
    components: {Card, SearchLocal, Panel},
    data() {
      return {
        searchWord: '',
        list: [
          {
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

<style scoped>

</style>
