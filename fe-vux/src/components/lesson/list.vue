<template>
  <div>
    <search-local v-model="searchWord" v-on:value-selected="function (){}" v-on:cancel="function (){}"
                  v-bind:picker="function (){}"></search-local>
    <div>
      <tab :line-width=2 active-color='#fc378c' v-model="selectedType">
        <tab-item class="vux-center" v-for="(item, index) in types" :key="index">{{item.name}}
        </tab-item>
      </tab>

      <div v-for="(item, index) in types" :key="index">
        <div v-if="selectedType===item.type">
          <card v-for="(lesson,i) in (item.type===0?list:list.filter(o=>o.type===item.type))" :key="i"
                style="display: flex">
            <img slot="header" :src="lesson.imgUrl" style="width:80px;height:80px;display:block;">
            <a slot="content" class="card-padding" :href="lesson.link">
              <p style="color:#999;font-size:12px;">{{lesson.addTime}}</p>
              <p style="font-size:14px;line-height:1.2;">{{lesson.title}}</p>
            </a>
          </card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {Card, Panel, Tab, TabItem, Swiper, SwiperItem} from 'vux'
  import SearchLocal from '../search/searchLocal'

  export default {
    name: "lesson-list",
    components: {Card, SearchLocal, Panel, Tab, TabItem, Swiper, SwiperItem},
    data() {
      return {
        selectedType: 0,
        types: [{name: '全部', type: 0}, {name: '宏观', type: 1}, {name: '微观', type: 2}, {
          name: '基金', type: 3}, {name: '证券', type: 4}, {name: 'CPA', type: 5}],
        searchWord: '',
        list: [
          {
            type: 1,
            link: '#/lesson/1',
            imgUrl: 'https://img.qlchat.com/qlLive/topicHead/N96VITMU-R4H6-ALQX-1536820884106-9932U6BULMPZ.jpg?x-oss-process=image/resize,m_fill,limit_0,h_469,w_750/format,webp',
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
        ]
      }
    }

  }
</script>

<style scoped lang="less">
  .tab-swiper {
    background-color: #fff;
    height: 100px;
  }
</style>
