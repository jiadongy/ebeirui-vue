<template>
  <div>
    <div>
      <p style="font-size:14px;line-height:1.2;">{{this.$route.params.id}}</p>
      <p style="font-size:14px;line-height:1.2;">{{lesson.title}}</p>
      <p style="font-size:14px;line-height:1.2;">作者：{{lesson.author}}</p>
      <p style="font-size:14px;line-height:1.2;">摘要：{{lesson.abstract}}</p>
      <p style="color:#999;font-size:12px;">{{lesson.addTime}}</p>
      <p style="color:#999;font-size:12px;">浏览数：{{lesson.clickNum}}</p>
      <br>
      <div>
        <tab :line-width=2 active-color='#fc378c' v-model="index">
          <tab-item class="vux-center" v-for="(item, index) in types" :key="index">{{item.name}}</tab-item>
        </tab>

        <div v-if="index===0" v-html="lesson.content">
        </div>
        <div v-else-if="index===1">
          <p v-for="item in lesson.chapters">{{item.name}}</p>
        </div>
        <div v-else-if="index===2">
          <p v-for="item in lesson.comments">{{item.content}}</p>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
  import {Card, Panel, Tab, TabItem, SwiperItem, Swiper} from 'vux'

  export default {
    name: "article-detail",
    components: {Card, Panel, Tab, TabItem, SwiperItem, Swiper},
    data() {
      return {
        index: 0,
        types: [{name: '课程描述', type: "0"}, {name: '课程列表', type: "1"}, {name: '学院评价', type: "2"}],
        selectType: '0',
        lesson:
          {
            imgUrl: 'http://inews.gtimg.com/newsapp_ls/0/5812057912_150120/0',
            title: '【小白必看】用最少的钱买最划算的房子，9 节课让你买房入门！',
            author: 'admin',
            content: '<div class="desc-content"><div class="xiumi-editor-h5-wrap"><div class="xiumi-editor-h5" style="visibility: visible;"><p><picture><source type="image/webp" srcset="https://img.qlchat.com/qlLive/channelLogo/66GY253T-T1LC-PE5M-1539328191965-NYV53GGCNUGW.jpg?x-oss-process=image/format,webp"><img src="https://img.qlchat.com/qlLive/channelLogo/66GY253T-T1LC-PE5M-1539328191965-NYV53GGCNUGW.jpg"></picture></p><p>大胡子说房创始人 &amp; CEO\n' +
              '房地产华南 KOL 关键意见领袖</p></div></div></div>',
            addTime: '2018-10-16 10:10:59',
            clickNum: 999,
            chapters: [{
              name: "第一课：【买房理念】买不起房是因为收入低？错，是方法不对"
            }, {
              name: "第二课：用这 5 个标准来买房，坐等升值"
            }, {
              name: "第三课：这样的地段，房价想不涨都难"
            }],
            comments: [{
              content: "gun"
            }]
          }
      }
    }
  }
</script>

<style scoped>

</style>
