<template>
  <div>
      <div>
        <p style="font-size:14px;line-height:1.2;">{{this.$route.params.id}}</p>
        <p style="font-size:14px;line-height:1.2;">{{article.title}}</p>
        <p style="font-size:14px;line-height:1.2;">作者：{{article.author}}</p>
        <p style="font-size:14px;line-height:1.2;">摘要：{{article.abstract}}</p>
        <p style="color:#999;font-size:12px;">{{article.addTime}}</p>
        <p style="color:#999;font-size:12px;">浏览数：{{article.clickNum}}</p>
        <br>
        <div v-html="article.content"></div>
      </div>
  </div>
</template>

<script>
  import {Card,Panel } from 'vux'
    export default {
        name: "article-detail",
      components: {Card,Panel },
      data() {
        return {
          article:
            {
              imgUrl: 'http://inews.gtimg.com/newsapp_ls/0/5812057912_150120/0',
              title: '9 月 CPI 同比涨 2.5% 创 7 个月新高 鲜菜价格大涨 14.6%',
              author: '黑鲨财经',
              abstract: '刚刚极力向大众科普了 “自动翻译” 和“人机耦合”两大概念的科大讯飞（SZ：002230）, 再次牵扯进了 “非法侵占国家级自然保护区” 的丑闻中。只不过，这次的爆料者，不再是一个不愿具名的小小同声传译员，而是央视。据央视报道，科大讯飞非法侵占安徽扬子鳄国家级自然保护区，以建设培训基地为名开发房地产。',
              content: '<div class="content-article">\n' +
                '            <!--导语-->\n' +
                '            <p class="one-p"><img src="//inews.gtimg.com/newsapp_bt/0/5812042880/1000" class="content-picture">\n' +
                '            </p>\n' +
                '            <p class="one-p">来源：黑鲨财经（ID：heishacaijing），原标题为 “千亿市值一跌不回头，‘AI 第一股’科大讯飞还飞得起来吗？”</p>\n' +
                '            <p class="one-p">刚刚极力向大众科普了 “自动翻译” 和“人机耦合”两大概念的科大讯飞（SZ：002230）, 再次牵扯进了 “非法侵占国家级自然保护区” 的丑闻中。</p>\n' +
                '            <p class="one-p">只不过，这次的爆料者，不再是一个不愿具名的小小同声传译员，而是央视。</p>\n' +
                '            <p class="one-p"><img src="//inews.gtimg.com/newsapp_bt/0/5812042881/1000" class="content-picture">\n' +
                '            </p>\n' +
                '            <p class="one-p">据央视报道，科大讯飞非法侵占安徽扬子鳄国家级自然保护区，以建设培训基地为名开发房地产。</p>\n' +
                '            <p class="one-p">昨日（15 日）午间，科大讯飞回应称，央视曝光的项目为该子公司设立在革命老区的 IT 产业研发中心，并非地产项目。该研发中心将立刻停止该中心运营，全面配合地方党委政府整改工作。随即，科大讯飞股价一路下探，昨日以 22.56 元 / 股报收；今日（10 月 16 日）午后，则更是被摁在了跌停板上。</p>\n' +
                '            <p class="one-p">顶着 “人工智能第一股” 的光环，科大讯飞成立十八年以来，备受投资机构和股民的厚爱。2017 年 11 月 22 日，在 A 股一片萧条时，科大讯飞仍攀升至三年内的最高点，达到了每股 74.76 元的高位，市值近 1000 亿元。</p>\n' +
                '            <p class="one-p">统计科大讯飞近三年的财报发现，由于新业务摊子铺得太大，该公司增收不增利已是常态。而该公司主营业务——个性化学习增值服务、政法领域辅助办案系统、智慧医疗等板块，多依赖于政府关系，真正 TO C 的业务则少之又少，仅占比约 5% 左右。</p>\n' +
                '            <p class="one-p">人工智能正当风口，这只骄傲飞翔了十八年的 “AI 第一股”，还能飞得起来吗？</p>\n' +
                '            <p class="one-p"><strong>又遭央视曝光  研发中心变成别墅群？</strong></p>\n' +
                '            <p class="one-p">10 月 15 日一早，一则 “央视曝科大讯飞以‘AI’为名拿地盖别墅” 的消息在各大投资群流传。</p>\n' +
                '            <p class="one-p">随着央视挖掘的深入，科大讯飞宣城违规别墅群的非法性质逐渐露出水面：科大讯飞此处地产名为培训基地，实为打着高科技的招牌换取地方政府园区类土地，进而形成土地储备买卖地皮套现。</p>\n' +
                '            <p class="one-p">随后，有好事者整理出一份详实的名单，称科大讯飞所谓的高科技项目子公司或者分公司，拿下项目后就关掉或者撤掉，并未开展后续工作。</p>\n' +
                '            <p class="one-p"><img src="//inews.gtimg.com/newsapp_bt/0/5812042882/1000" class="content-picture">\n' +
                '            </p>\n' +
                '            <p class="one-p">而地方政府白白付出了土地和资源，却并未获得产业开发的机遇，更无从谈起任何科技研发成果。</p>\n' +
                '            <p class="one-p">在央视曝光的安徽省，就是科大讯飞大面积开展此类合作的重点区域，科大讯飞成立了近 20 家空壳公司运作拿订单、拿地，成为其营收的主要来源。这一出 “空手套白狼”，与当年的乐视如出一辙。</p>\n' +
                '            <p class="one-p">“人工智能第一股”，真的变成 “地产股” 了吗？</p>\n' +
                '            <p class="one-p"><strong>同声传译被指造假  科大讯飞高调辟谣</strong></p>\n' +
                '            <p class="one-p">如果说普通老百姓一直傻傻分不清什么是同声传译，什么是人机耦合，那么 9 月 21 日知乎上的一则 “科大讯飞同传造假” 的帖子，可谓是普及了两者的区别。</p>\n' +
                '            <p class="one-p">9 月 21 日，一位知乎名为 BELL WANG 的同声传译翻译员发帖，称自己亲身经历了科大讯飞的同传造假。</p>\n' +
                '            <p class="one-p">该网友在帖子中表示， 科大讯飞在 “2018 创新与新兴产业发展国际会议” 上所使用的 “智能翻译” 系统造假。其显示的中文翻译，并不是根据其传感器采集的声音文件所呼应的，而是后台两位同传译员临场实时翻译后，再由机器读出来的。</p>\n' +
                '            <p class="one-p">对此，科大讯飞火速回应称，公司不存在造假的情况。科大讯飞表示，该企业主要为主办方提供两种翻译方案：一、直接由机器离线翻译，现场全自动翻译并同步展示在屏幕上，没有任何人工同传参与；二、直接转写同传语音，并且为同传语音打上字幕，直播提供中英文对照的字幕。</p>\n' +
                '            <p class="one-p">科大讯飞认为，第二项业务是人机耦合，可以降低同传工作者工作强度、赋能翻译人员，并在声明中特别强调：人机耦合才是未来。</p>\n' +
                '            <p class="one-p"><img src="//inews.gtimg.com/newsapp_bt/0/5812042883/1000" class="content-picture">\n' +
                '            </p>\n' +
                '            <p class="one-p">随后，该网友在专栏再次发帖《今天讯飞给我打了个电话》。文章称其与科大讯飞消费者事业群副总裁、听见科技总经理王玮电话沟通了一个多小时，听完讯飞对整体情况的详细说明，了解相关证据之后，他为言辞激烈与不妥致歉，并表示科大讯飞没有主动造假行为。</p>\n' +
                '            <p class="one-p">即便 9 月 25 日，“科大讯飞并无造假行为，与爆料者消除误解” 的报道漫天飞，但并未止住股票下跌的节奏。</p>\n' +
                '            <p class="one-p">9 月 25 日，科大讯飞开盘后大跌 6.2%，截至收盘，报收 28.93 元 / 股，下跌 3.89%。也就是说，自 2017 年末的历史高位来测算，科大讯飞市值八个多月蒸发 476.94 亿元。</p>\n' +
                '            <p class="one-p"><strong>增收不增利 ：那么大的摊子，哪个最赚钱？</strong></p>\n' +
                '            <p class="one-p">科大讯飞的 2018 年半年报显示，2018 年上半年，该公司实现营业收入 32.10 亿元，同比增长 52.68%；实现净利润 1.31 亿元，同比增长 21.74%。</p>\n' +
                '            <p class="one-p"><img src="//inews.gtimg.com/newsapp_bt/0/5812042885/1000" class="content-picture">\n' +
                '            </p>\n' +
                '            <p class="one-p">不过，和 2016、2017 年的情况相仿的是，科大讯飞依旧从政府获得巨额补助。</p>\n' +
                '            <p class="one-p">黑鲨财经统计 2013—2017 年科大讯飞财经发现，政府补贴占到企业净利润的三成 - 四成。</p>\n' +
                '            <p class="one-p"><img src="//inews.gtimg.com/newsapp_bt/0/5812042886/1000" class="content-picture">\n' +
                '            </p>\n' +
                '            <p class="one-p">2018 半年报披露，科大讯飞上半年的非经常性损益金额高达 1.1 亿元，较上年同期增长 288.52%，原因是一大波政府补助正在逐渐落地：</p>\n' +
                '            <p class="one-p">2017 年国务院印发《新一代人工智能发展规划》以来，科技部宣布依托科大讯飞建设智能语音国家新一代人工智能开放创新平台；工信部颁布《促进新一代人工智能产业发展三年行动计划》；安徽省和工信部签订了围绕科大讯飞打造中国声谷的省部共建战略合作协议。</p>\n' +
                '            <p class="one-p">而从业务布局来看，早在 2016 年，科大讯飞就将教育、公共安全领域、智能治疗、智能汽车等 TO B 端业务作为主推产品。</p>\n' +
                '            <p class="one-p">然而尴尬的是，经过近两年的发展，截至 2017 年底，这些 TO B 端的业务营收占比均未超过 1/3。</p>\n' +
                '            <p class="one-p"><img src="//inews.gtimg.com/newsapp_bt/0/5812042887/1000" class="content-picture">\n' +
                '            </p>\n' +
                '            <p class="one-p"><strong>“人工智能第一股” 还值不值得买</strong></p>\n' +
                '            <p class="one-p">国庆长假回来的交易日，细心的投资人发现，科大讯飞的董监高已经悄然取消了减持计划。按照原计划，六位高管将累计减持 57460354 股，持股比例约占 2.75%。</p>\n' +
                '            <p class="one-p">而取消减持计划的原因，则是 “二级市场原因”。</p>\n' +
                '            <p class="one-p"><img src="//inews.gtimg.com/newsapp_bt/0/5812042888/1000" class="content-picture">\n' +
                '            </p>\n' +
                '            <p class="one-p">AI 智能正值风口，可以看到的是，科大讯飞正在大力布局，努力拓宽赛道，以求抢占先机。</p>\n' +
                '            <p class="one-p">2018 年上半年财报显示，上半年公司员工规模较去年同期增长近 3500 人, 公司新增研发费用 2.29 亿元 (研发费用总额达 5.87 亿元, 较上年同期增长 63.84%); 新增销售费用 3.19 亿元 (销售费用总额达 7.33 亿元, 较上年同期增长 77.10%)。</p>\n' +
                '            <p class="one-p">只是，从去年年末的千亿市值一路下探至 440 亿出头，科大讯飞在收复失地的资本市场，还有很多故事要讲。</p>\n' +
                '            <p class="one-p">文章经授权转载自黑鲨财经（ID：heishacaijing），如需转载请联系原公众号。</p>\n' +
                '            <p class="one-p">来源: http://www.gongchang.fund/news-detail-19067.html</p>\n' +
                '            <div id="Status"><div data-reactroot="" class="article-status"><div></div><div class="through theend"><span>the end</span></div><div class="statement">免责声明：本文来自腾讯新闻客户端自媒体，不代表腾讯网的观点和立场。</div><div class="like"><div class="like-a " data-bossirs="like&amp;"><i class="iconfont icon-zan"></i><div class="text-a">赞</div></div><div class="share" data-bosszone="share"><a class="wxWrap"><i class="iconfont icon-icon-"></i><div class="qrcode hidden"><div id="qrcode2" title="https://new.qq.com/omn/20181016/20181016A168FD.html"><canvas width="113" height="113" style="display: none;"></canvas><img alt="Scan me!" style="display: block;" src="data:image/png;base64,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"></div><!-- react-text: 15 -->用微信扫描二维码<!-- /react-text --></div></a><a><i class="iconfont icon-qq1"></i></a><a><i class="iconfont icon-qqkongjian"></i></a><a><i class="iconfont icon-weibo1"></i></a></div><div class="r"><a href="" data-bossirs="sc&amp;" style="display: none;"><i class="iconfont icon-shoucang"></i><!-- react-text: 25 --> 收藏<!-- /react-text --></a></div></div></div></div>\n' +
                '          </div>',
              addTime: '2018-10-16 10:10:59',
              clickNum: 999
            }
        }
      }
    }
</script>

<style scoped>

</style>
