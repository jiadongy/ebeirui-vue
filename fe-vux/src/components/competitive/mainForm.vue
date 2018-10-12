<template>
  <div style="width: 95%;margin: 0 auto;">
    <!--<marquee>-->
    <!--<marquee-item v-for="i in 5" :key="i" class="align-left">hello world {{i}}</marquee-item>-->
    <!--</marquee>-->
    <br>
    <step v-model="step" background-color='#fbf9fe' gutter="20px">
      <step-item title="个人"></step-item>
      <step-item title="教育"></step-item>
      <step-item title="实习"></step-item>
      <step-item title="证书"></step-item>
      <step-item title="性格"></step-item>
    </step>
    <!--<x-hr v-if="step>=0||step<=2"></x-hr>-->
    <div v-show="step===0">
      <group>
        <x-input title="姓名" v-model="form.name"></x-input>
        <selector v-model="form.sex" title="性别" :options="options.sex_options"></selector>
        <cell title="年龄">
          <inline-x-number style="display:block;" v-model="form.age" :min="20" :max="35" width="50px"
                           button-style="round"></inline-x-number>
        </cell>
        <selector v-model="form.native_place" title="籍贯" :options="options.native_place_options"></selector>
        <selector v-model="form.politicial_background" title="政治背景"
                  :options="options.politicial_background_options"></selector>
        <x-input title="联系方式" v-model="form.contact"></x-input>
      </group>
    </div>
    <div v-show="step===1">
      <toast v-model="toShowTip[step]" :time="2000" type="text" width="15em">tips 左滑可以删除</toast>
      <div v-for="(item,index) in form.education_background">
        <group-title>第 {{index+1}} 份教育背景</group-title>
        <swipeout>
          <swipeout-item transition-mode="follow" :key="index">
            <div slot="right-menu">
              <!--<swipeout-button @click.native="form.education_background.push({})" type="primary">增加</swipeout-button>-->
              <swipeout-button @click.native="form.education_background.splice(index,1)" type="warn">删除
              </swipeout-button>
            </div>
            <div slot="content" class="demo-content vux-1px-t">
              <group>
                <selector v-model="item.degree" title="学历" :options="options.degree_options"></selector>
                <datetime v-model="item.begin_date" :start-date="'2000-01-01'" format="YYYY-MM-DD" @on-change=""
                          title="开始日期"></datetime>
                <datetime v-model="item.end_date" :start-date="'2000-01-01'" format="YYYY-MM-DD" @on-change=""
                          title="结束日期"></datetime>
                <cell title="学校" v-model="item.university" is-link @click.native="showSearchUniversity[index]=true"/>
                <selector v-model="item.major" title="专业" :options="options.major_options"></selector>
              </group>
            </div>
          </swipeout-item>
        </swipeout>
        <div v-transfer-dom>
          <popup v-model="showSearchUniversity[index]" position="bottom" height="70%">
            <search-u v-model="item.university"
                      v-on:value-selected="item.university=$event.title;showSearchUniversity[index]=false"
                      v-on:cancel="showSearchUniversity[index]=false" v-bind:picker="filterUniversity"
                      :key="index"></search-u>
          </popup>
        </div>
        <br>
      </div>
      <x-button @click.native="form.education_background.push({})" type="primary">新增教育背景</x-button>
    </div>
    <div v-show="step===2">
      <div v-for="(item,index) in form.internship_experience">
        <group-title>第 {{index+1}} 份实习经历</group-title>
        <swipeout>
          <swipeout-item transition-mode="follow">
            <div slot="right-menu">
              <swipeout-button @click.native="form.internship_experience.splice(index,1)" type="warn">删除
              </swipeout-button>
            </div>
            <div slot="content" class="demo-content vux-1px-t">
              <group>
                <datetime v-model="item.begin_date" :start-date="'2000-01-01'" format="YYYY-MM-DD" @on-change=""
                          title="开始日期"></datetime>
                <datetime v-model="item.end_date" :start-date="'2000-01-01'" format="YYYY-MM-DD" @on-change=""
                          title="结束日期"></datetime>
                <cell title="公司" v-model="item.company" is-link @click.native="showSearchCompany[index]=true"/>
                <selector v-model="item.type" title="类型" :readonly="item.type.length!==0"
                          :options="Object.keys(departments)"></selector>
                <selector v-model="item.department" title="部门" :options="getDepartmentByCompanyType(item.type)"
                          v-show="item.type.length!==0"></selector>
              </group>
            </div>
          </swipeout-item>
        </swipeout>
        <div v-transfer-dom>
          <popup v-model="showSearchCompany[index]" position="bottom" height="70%">
            <search-u
              v-on:value-selected="item.company=$event.title;item.type=$event.type;showSearchCompany[index]=false"
              v-on:cancel="showSearchCompany[index]=false" v-bind:picker="filterCompany"></search-u>
          </popup>
        </div>
      </div>
      <x-button @click.native="form.internship_experience.push({})" type="primary">新增实习经历</x-button>
    </div>
    <div v-show="step===3">
      <divider>证书类</divider>
      <checker v-model="form.certificate" type="checkbox" default-item-class="demo1-item"
               selected-item-class="demo1-item-selected">
        <checker-item v-for="(value,key,index) in options.certificate_map" :key="index" :value="value">{{key}}
        </checker-item>
      </checker>
      <divider>语言类</divider>
      <checker v-model="form.language" type="checkbox" default-item-class="demo1-item"
               selected-item-class="demo1-item-selected">
        <checker-item v-for="(value,key,index) in options.language_map" :key="index" :value="value">{{key}}
        </checker-item>
      </checker>
      <divider>奖学金类</divider>
      <checker v-model="form.fellowship" type="checkbox" default-item-class="demo1-item"
               selected-item-class="demo1-item-selected">
        <checker-item v-for="(value,key,index) in options.fellowship_map" :key="index" :value="value">{{key}}
        </checker-item>
      </checker>
      <divider>其他奖项</divider>
      <checker v-model="form.other" type="checkbox" default-item-class="demo1-item"
               selected-item-class="demo1-item-selected">
        <checker-item v-for="(value,key,index) in options.other_map" :key="index" :value="value">{{key}}</checker-item>
      </checker>
    </div>
    <div v-show="step===4">
      <divider>个人性格</divider>
      <checker v-model="form.character" type="checkbox" default-item-class="demo1-item"
               selected-item-class="demo1-item-selected">
        <checker-item v-for="(value,key,index) in options.character_map" :key="index" :value="value">{{key}}
        </checker-item>
      </checker>
      <divider>工作预期</divider>
      <checker v-model="form.preferred_job" type="checkbox" default-item-class="demo1-item"
               selected-item-class="demo1-item-selected">
        <checker-item v-for="(value,key,index) in options.preferred_job_map" :key="index" :value="value">{{key}}
        </checker-item>
      </checker>
      <divider>人生目标</divider>
      <checker v-model="form.target" type="checkbox" default-item-class="demo1-item"
               selected-item-class="demo1-item-selected">
        <checker-item v-for="(value,key,index) in options.target_map" :key="index" :value="value">{{key}}</checker-item>
      </checker>
    </div>
    <x-hr></x-hr>
    <div class="btn_wrap">
      <x-button v-show="step>0" @click.native="step--">上一步</x-button>
      <x-button type="primary" v-show="step<4" @click.native="toShowTip[step]=false;step++">下一步</x-button>
      <x-button type="primary" v-show="step===4" @click.native="submit">提交</x-button>
    </div>
    <div v-transfer-dom>
      <alert v-model="showResult" :title="resultScore>0?'Wow~':'Sorry~'">
        {{resultScore>0?('您的求职竞争力为'+resultScore):'服务器开小差去了' }}
      </alert>
      <toast v-model="showResult" :time="2000" type="text" width="15em">
        {{resultScore>0?('您的求职竞争力为'+resultScore):'服务器开小差去了' }}
      </toast>
    </div>
  </div>
</template>

<script>
  import {
    Step, AlertModule, Alert,
    StepItem,
    XButton,
    XHr,
    XInput,
    Group,
    Selector,
    Cell,
    CellBox,
    Range,
    GroupTitle,
    Datetime,
    Card,
    Search,
    Popup,
    Checker,
    CheckerItem,
    Divider,
    Swipeout,
    SwipeoutItem,
    SwipeoutButton,
    InlineXNumber,
    Toast, Marquee, MarqueeItem
  } from 'vux'

  import SearchU from './search'
  import Panel from "vux/src/components/panel/index";

  export default {
    name: "mainForm",
    components: {
      Panel, AlertModule, Alert,
      Card,
      Popup,
      Step,
      StepItem,
      XButton,
      XHr,
      XInput,
      Group,
      Selector,
      Cell,
      CellBox,
      Range,
      GroupTitle,
      Datetime,
      Search,
      SearchU,
      Checker,
      CheckerItem,
      Divider,
      Swipeout,
      SwipeoutItem,
      SwipeoutButton,
      InlineXNumber,
      Toast, Marquee, MarqueeItem
    },
    created() {
      this.universities = ['北京大学', '清华大学', '复旦大学', '上海交通大学', '武汉大学', '浙江大学', '中国人民大学', '南京大学', '吉林大学', '中山大学', '北京师范大学', '华中科技大学', '四川大学', '中国科学技术大学', '南开大学', '山东大学', '中南大学', '西安交通大学', '厦门大学', '哈尔滨工业大学', '北京航空航天大学', '同济大学', '天津大学', '华东师范大学', '东南大学', '北京理工大学', '重庆大学', '西南财经大学', '中央财经大学', '对外经济贸易大学', '中国政法大学', '北京协和医学院', '中国农业大学', '华南理工大学', '湖南大学', '西北工业大学', '大连理工大学', '东北大学', '兰州大学', '中国海洋大学', '电子科技大学', '西北农林科技大学', '中央民族大学', '中南财经政法大学', '暨南大学', '北京交通大学', '北京邮电大学', '广西大学', '中国药科大学', '长安大学', '上海财经大学', '华东理工大学', '苏州大学', '南京航空航天大学', '郑州大学', '华中师范大学', '南京农业大学', '西南大学', '武汉理工大学', '上海大学', '南京理工大学', '东北师范大学', '江南大学', '西安电子科技大学', '华中农业大学', '西南交通大学', '华北电力大学（北京）', '北京科技大学', '北京化工大学', '东华大学', '南京师范大学', '华南师范大学', '西北大学', '陕西师范大学', '哈尔滨工程大学', '河海大学', '南昌大学', '北京工业大学', '湖南师范大学', '福州大学', '合肥工业大学', '云南大学', '安徽大学', '太原理工大学', '贵州大学', '北京林业大学', '东北林业大学', '新疆大学', '中国传媒大学', '四川农业大学', '天津医科大学', '辽宁大学', '东北农业大学', '河北工业大学', '北京中医药大学', '上海外国语大学', '大连海事大学', '北京外国语大学', '内蒙古大学', '石河子大学', '海南大学', '延边大学', '宁夏大学', '中央音乐学院', '北京体育大学', '青海大学'];
      this.companies = [{'type': '证券公司', 'company': '东方证券'}, {'type': '证券公司', 'company': '光大证券'}, {
        'type': '证券公司',
        'company': '广发证券'
      }, {'type': '证券公司', 'company': '国泰君安'}, {'type': '证券公司', 'company': '国信证券'}, {
        'type': '证券公司',
        'company': '海通证券'
      }, {'type': '证券公司', 'company': '华泰证券'}, {'type': '证券公司', 'company': '申万宏源'}, {
        'type': '证券公司',
        'company': '兴业证券'
      }, {'type': '证券公司', 'company': '银河证券'}, {'type': '证券公司', 'company': '招商证券'}, {
        'type': '证券公司',
        'company': '中金公司'
      }, {'type': '证券公司', 'company': '中信建投'}, {'type': '证券公司', 'company': '中信证券'}, {
        'type': '证券公司',
        'company': '中银国际'
      }, {'type': '证券公司', 'company': '安信证券'}, {'type': '证券公司', 'company': '北京高华'}, {
        'type': '证券公司',
        'company': '渤海证券'
      }, {'type': '证券公司', 'company': '财通证券'}, {'type': '证券公司', 'company': '长江证券'}, {
        'type': '证券公司',
        'company': '东海证券'
      }, {'type': '证券公司', 'company': '东莞证券'}, {'type': '证券公司', 'company': '东吴证券'}, {
        'type': '证券公司',
        'company': '华创证券'
      }, {'type': '证券公司', 'company': '华福证券'}, {'type': '证券公司', 'company': '华林证券'}, {
        'type': '证券公司',
        'company': '华融证券'
      }, {'type': '证券公司', 'company': '民生证券'}, {'type': '证券公司', 'company': '南京证券'}, {
        'type': '证券公司',
        'company': '平安证券'
      }, {'type': '证券公司', 'company': '瑞银证券'}, {'type': '证券公司', 'company': '太平洋'}, {
        'type': '证券公司',
        'company': '天风证券'
      }, {'type': '证券公司', 'company': '浙商证券'}, {'type': '证券公司', 'company': '中泰证券'}, {
        'type': '证券公司',
        'company': '广州证券'
      }, {'type': '证券公司', 'company': '国金证券'}, {'type': '证券公司', 'company': '国开证券'}, {
        'type': '证券公司',
        'company': '国元证券'
      }, {'type': '证券公司', 'company': '华安证券'}, {'type': '证券公司', 'company': '中原证券'}, {
        'type': '证券公司',
        'company': '爱建证券'
      }, {'type': '证券公司', 'company': '财达证券'}, {'type': '证券公司', 'company': '财富证券'}, {
        'type': '证券公司',
        'company': '长城国瑞'
      }, {'type': '证券公司', 'company': '长城证券'}, {'type': '证券公司', 'company': '川财证券'}, {
        'type': '证券公司',
        'company': '大通证券'
      }, {'type': '证券公司', 'company': '大同证券'}, {'type': '证券公司', 'company': '德邦证券'}, {
        'type': '证券公司',
        'company': '第一创业'
      }, {'type': '证券公司', 'company': '东北证券'}, {'type': '证券公司', 'company': '东方财富'}, {
        'type': '证券公司',
        'company': '东兴证券'
      }, {'type': '证券公司', 'company': '方正证券'}, {'type': '证券公司', 'company': '国都证券'}, {
        'type': '证券公司',
        'company': '国海证券'
      }, {'type': '证券公司', 'company': '国联证券'}, {'type': '证券公司', 'company': '国融证券'}, {
        'type': '证券公司',
        'company': '海际证券'
      }, {'type': '证券公司', 'company': '恒泰证券'}, {'type': '证券公司', 'company': '红塔证券'}, {
        'type': '证券公司',
        'company': '宏信证券'
      }, {'type': '证券公司', 'company': '华宝证券'}, {'type': '证券公司', 'company': '华金证券'}, {
        'type': '证券公司',
        'company': '华菁证券'
      }, {'type': '证券公司', 'company': '华龙证券'}, {'type': '证券公司', 'company': '华西证券'}, {
        'type': '证券公司',
        'company': '华鑫证券'
      }, {'type': '证券公司', 'company': '华信证券'}, {'type': '证券公司', 'company': '江海证券'}, {
        'type': '证券公司',
        'company': '金元证券'
      }, {'type': '证券公司', 'company': '九州证券'}, {'type': '证券公司', 'company': '开源证券'}, {
        'type': '证券公司',
        'company': '联储证券'
      }, {'type': '证券公司', 'company': '联讯证券'}, {'type': '证券公司', 'company': '山西证券'}, {
        'type': '证券公司',
        'company': '申港证券'
      }, {'type': '证券公司', 'company': '世纪证券'}, {'type': '证券公司', 'company': '首创证券'}, {
        'type': '证券公司',
        'company': '万和证券'
      }, {'type': '证券公司', 'company': '万联证券'}, {'type': '证券公司', 'company': '网信证券'}, {
        'type': '证券公司',
        'company': '五矿证券'
      }, {'type': '证券公司', 'company': '西部证券'}, {'type': '证券公司', 'company': '西南证券'}, {
        'type': '证券公司',
        'company': '湘财证券'
      }, {'type': '证券公司', 'company': '新时代'}, {'type': '证券公司', 'company': '信达证券'}, {
        'type': '证券公司',
        'company': '银泰证券'
      }, {'type': '证券公司', 'company': '英大证券'}, {'type': '证券公司', 'company': '中航证券'}, {
        'type': '证券公司',
        'company': '中山证券'
      }, {'type': '证券公司', 'company': '中天证券'}, {'type': '证券公司', 'company': '中投证券'}, {
        'type': '证券公司',
        'company': '中邮证券'
      }, {'type': '公募基金', 'company': '南方基金'}, {'type': '公募基金', 'company': '华夏基金'}, {
        'type': '公募基金',
        'company': '博时基金'
      }, {'type': '公募基金', 'company': '嘉实基金'}, {'type': '公募基金', 'company': '富国基金'}, {
        'type': '公募基金',
        'company': '易方达基金'
      }, {'type': '公募基金', 'company': '国投瑞银基金'}, {'type': '公募基金', 'company': '招商基金'}, {
        'type': '公募基金',
        'company': '广发基金'
      }, {'type': '公募基金', 'company': '兴全基金'}, {'type': '公募基金', 'company': '上投摩根基金'}, {
        'type': '公募基金',
        'company': '东方基金'
      }, {'type': '公募基金', 'company': '中银基金'}, {'type': '公募基金', 'company': '汇添富基金'}, {
        'type': '公募基金',
        'company': '工银瑞信基金'
      }, {'type': '公募基金', 'company': '交银施罗基金'}, {'type': '公募基金', 'company': '建信基金'}, {
        'type': '公募基金',
        'company': '国泰基金'
      }, {'type': '公募基金', 'company': '华安基金'}, {'type': '公募基金', 'company': '鹏华基金'}, {
        'type': '公募基金',
        'company': '长盛基金'
      }, {'type': '公募基金', 'company': '大成基金'}, {'type': '公募基金', 'company': '宝盈基金'}, {
        'type': '公募基金',
        'company': '银华基金'
      }, {'type': '公募基金', 'company': '泰达宏利基金'}, {'type': '公募基金', 'company': '长信基金'}, {
        'type': '公募基金',
        'company': '景顺长城基金'
      }, {'type': '公募基金', 'company': '申万菱信基金'}, {'type': '公募基金', 'company': '天弘基金'}, {
        'type': '公募基金',
        'company': '华泰柏瑞基金'
      }, {'type': '公募基金', 'company': '中邮创业基金'}, {'type': '公募基金', 'company': '中欧基金'}, {
        'type': '公募基金',
        'company': '浦银安盛基金'
      }, {'type': '公募基金', 'company': '民生加银基金'}, {'type': '公募基金', 'company': '浙商基金'}, {
        'type': '公募基金',
        'company': '平安大华基金'
      }, {'type': '公募基金', 'company': '财通基金'}, {'type': '公募基金', 'company': '前海开源基金'}, {
        'type': '公募基金',
        'company': '兴业基金'
      }, {'type': '公募基金', 'company': '中信建投基金'}, {'type': '公募基金', 'company': '中金基金'}, {
        'type': '公募基金',
        'company': '九泰基金'
      }, {'type': '公募基金', 'company': '融通基金'}, {'type': '公募基金', 'company': '长城基金'}, {
        'type': '公募基金',
        'company': '银河基金'
      }, {'type': '公募基金', 'company': '万家基金'}, {'type': '公募基金', 'company': '金鹰基金'}, {
        'type': '公募基金',
        'company': '华宝基金'
      }, {'type': '公募基金', 'company': '摩根士丹基金'}, {'type': '公募基金', 'company': '国联安基金'}, {
        'type': '公募基金',
        'company': '海富通基金'
      }, {'type': '公募基金', 'company': '泰信基金'}, {'type': '公募基金', 'company': '天治基金'}, {
        'type': '公募基金',
        'company': '诺安基金'
      }, {'type': '公募基金', 'company': '中海基金'}, {'type': '公募基金', 'company': '光大保德基金'}, {
        'type': '公募基金',
        'company': '华富基金'
      }, {'type': '公募基金', 'company': '东吴基金'}, {'type': '公募基金', 'company': '国海富兰克林基金'}, {
        'type': '公募基金',
        'company': '新华基金'
      }, {'type': '公募基金', 'company': '中信保诚基金'}, {'type': '公募基金', 'company': '华商基金'}, {
        'type': '公募基金',
        'company': '汇丰晋信基金'
      }, {'type': '公募基金', 'company': '益民基金'}, {'type': '公募基金', 'company': '信达澳银基金'}, {
        'type': '公募基金',
        'company': '诺德基金'
      }, {'type': '公募基金', 'company': '金元顺安基金'}, {'type': '公募基金', 'company': '农银汇理基金'}, {
        'type': '公募基金',
        'company': '西部利得基金'
      }, {'type': '公募基金', 'company': '富安达基基金'}, {'type': '公募基金', 'company': '方正富邦基金'}, {
        'type': '公募基金',
        'company': '长安基金'
      }, {'type': '公募基金', 'company': '国金基金'}, {'type': '公募基金', 'company': '安信基金'}, {
        'type': '公募基金',
        'company': '德邦基金'
      }, {'type': '公募基金', 'company': '华宸未来'}, {'type': '公募基金', 'company': '红塔红土基金'}, {
        'type': '公募基金',
        'company': '英大基金'
      }, {'type': '公募基金', 'company': '江信基金'}, {'type': '公募基金', 'company': '太平基金'}, {
        'type': '公募基金',
        'company': '华润元大基金'
      }, {'type': '公募基金', 'company': '东海基金'}, {'type': '公募基金', 'company': '中加基金'}, {
        'type': '公募基金',
        'company': '中融基金'
      }, {'type': '公募基金', 'company': '国开泰富基金'}, {'type': '公募基金', 'company': '上银基金'}, {
        'type': '公募基金',
        'company': '鑫元基金'
      }, {'type': '公募基金', 'company': '永赢基金'}, {'type': '公募基金', 'company': '兴银基金'}, {
        'type': '公募基金',
        'company': '国寿安保基金'
      }, {'type': '公募基金', 'company': '圆信永丰基金'}, {'type': '公募基金', 'company': '北信瑞丰基金'}, {
        'type': '公募基金',
        'company': '红土创新基金'
      }, {'type': '公募基金', 'company': '嘉合基金'}, {'type': '公募基金', 'company': '创金合信基金'}, {
        'type': '公募基金',
        'company': '泓德基金'
      }, {'type': '公募基金', 'company': '金信基金'}, {'type': '公募基金', 'company': '新疆前海基金'}, {
        'type': '公募基金',
        'company': '新沃基金'
      }, {'type': '公募基金', 'company': '中科沃土基金'}, {'type': '公募基金', 'company': '富荣基金'}, {
        'type': '公募基金',
        'company': '汇安基金'
      }, {'type': '公募基金', 'company': '先锋基金'}, {'type': '公募基金', 'company': '中航基金'}, {
        'type': '公募基金',
        'company': '华泰保兴基金'
      }, {'type': '公募基金', 'company': '鹏扬基金'}, {'type': '公募基金', 'company': '恒生前海基金'}, {
        'type': '公募基金',
        'company': '格林基金'
      }, {'type': '公募基金', 'company': '南华基金'}, {'type': '公募基金', 'company': '凯石基金'}, {
        'type': '公募基金',
        'company': '国融基金'
      }, {'type': '公募基金', 'company': '东方阿尔基金'}, {'type': '公募基金', 'company': '恒越基金'}, {
        'type': '公募基金',
        'company': '弘毅远方基金'
      }, {'type': '公募基金', 'company': '青松基金'}, {'type': '公募基金', 'company': '博道基金'}, {
        'type': '信托公司',
        'company': '中信信托'
      }, {'type': '信托公司', 'company': '重庆国际信托'}, {'type': '信托公司', 'company': '兴业国际信托'}, {
        'type': '信托公司',
        'company': '上海国际信托'
      }, {'type': '信托公司', 'company': '华润深国投信托'}, {'type': '信托公司', 'company': '交银国际信托'}, {
        'type': '信托公司',
        'company': '中融国际信托'
      }, {'type': '信托公司', 'company': '昆仑信托'}, {'type': '信托公司', 'company': '平安信托'}, {
        'type': '信托公司',
        'company': '华宝信托'
      }, {'type': '信托公司', 'company': '建信信托'}, {'type': '信托公司', 'company': '大连华信信托'}, {
        'type': '信托公司',
        'company': '中航信托'
      }, {'type': '信托公司', 'company': '华能贵诚信托'}, {'type': '信托公司', 'company': '西藏信托'}, {
        'type': '信托公司',
        'company': '长安国际信托'
      }, {'type': '信托公司', 'company': '中国对外经济贸易信托'}, {'type': '信托公司', 'company': '五矿国际信托'}, {
        'type': '信托公司',
        'company': '百瑞信托'
      }, {'type': '信托公司', 'company': '广东粤财信托'}, {'type': '信托公司', 'company': '四川信托'}, {
        'type': '信托公司',
        'company': '中铁信托'
      }, {'type': '信托公司', 'company': '新时代信托'}, {'type': '信托公司', 'company': '渤海国际信托'}, {
        'type': '信托公司',
        'company': '光大兴陇信托'
      }, {'type': '信托公司', 'company': '国民信托'}, {'type': '信托公司', 'company': '北方国际信托'}, {
        'type': '信托公司',
        'company': '国投泰康信托'
      }, {'type': '信托公司', 'company': '山东省国际信托'}, {'type': '信托公司', 'company': '北京国际信托'}, {
        'type': '信托公司',
        'company': '上海爱建信托投资'
      }, {'type': '信托公司', 'company': '安徽国元信托'}, {'type': '信托公司', 'company': '华鑫国际信托'}, {
        'type': '信托公司',
        'company': '江苏省国际信托'
      }, {'type': '信托公司', 'company': '中海信托'}, {'type': '信托公司', 'company': '陕西省国际信托'}, {
        'type': '信托公司',
        'company': '中诚信托'
      }, {'type': '信托公司', 'company': '紫金信托'}, {'type': '信托公司', 'company': '华融国际信托'}, {
        'type': '信托公司',
        'company': '厦门国际信托'
      }, {'type': '信托公司', 'company': '安信信托'}, {'type': '信托公司', 'company': '英大国际信托'}, {
        'type': '信托公司',
        'company': '陆家嘴信托'
      }, {'type': '信托公司', 'company': '云南国际信托'}, {'type': '信托公司', 'company': '国通信托'}, {
        'type': '信托公司',
        'company': '中江国际信托'
      }, {'type': '信托公司', 'company': '天津信托'}, {'type': '信托公司', 'company': '万向信托'}, {
        'type': '信托公司',
        'company': '中国民生信托'
      }, {'type': '信托公司', 'company': '中粮信托'}, {'type': '信托公司', 'company': '西部信托'}, {
        'type': '信托公司',
        'company': '中原信托'
      }, {'type': '信托公司', 'company': '大业信托'}, {'type': '信托公司', 'company': '新华信托'}, {
        'type': '信托公司',
        'company': '中国金谷国际信托'
      }, {'type': '信托公司', 'company': '中建投信托'}, {'type': '信托公司', 'company': '吉林省信托'}, {
        'type': '信托公司',
        'company': '中泰信托'
      }, {'type': '信托公司', 'company': '苏州信托'}, {'type': '信托公司', 'company': '浙商金汇信托'}, {
        'type': '信托公司',
        'company': '华澳国际信托'
      }, {'type': '信托公司', 'company': '湖南省信托'}, {'type': '信托公司', 'company': '国联信托'}, {
        'type': '信托公司',
        'company': '东莞信托'
      }, {'type': '信托公司', 'company': '杭州工商信托'}, {'type': '信托公司', 'company': '山西信托'}, {
        'type': '信托公司',
        'company': '新疆长城新盛信托'
      }, {'type': '信托公司', 'company': '华宸信托'}, {'type': '商业银行', 'company': '国家开发银行'}, {
        'type': '商业银行',
        'company': '进出口银行'
      }, {'type': '商业银行', 'company': '农业发展银行'}, {'type': '商业银行', 'company': '中国工商银行'}, {
        'type': '商业银行',
        'company': '中国建设银行'
      }, {'type': '商业银行', 'company': '中国银行'}, {'type': '商业银行', 'company': '中国农业银行'}, {
        'type': '商业银行',
        'company': '交通银行'
      }, {'type': '商业银行', 'company': '招商银行'}, {'type': '商业银行', 'company': '中信银行'}, {
        'type': '商业银行',
        'company': '中国民生银行'
      }, {'type': '商业银行', 'company': '兴业银行'}, {'type': '商业银行', 'company': '上海浦东发展银行'}, {
        'type': '商业银行',
        'company': '中国邮政储蓄银行'
      }, {'type': '商业银行', 'company': '中国光大银行'}, {'type': '商业银行', 'company': '平安银行'}, {
        'type': '商业银行',
        'company': '华夏银行'
      }, {'type': '商业银行', 'company': '北京银行'}, {'type': '商业银行', 'company': '广发银行'}, {
        'type': '商业银行',
        'company': '上海银行'
      }, {'type': '商业银行', 'company': '江苏银行'}, {'type': '商业银行', 'company': '恒丰银行'}, {
        'type': '商业银行',
        'company': '浙商银行'
      }, {'type': '商业银行', 'company': '南京银行'}, {'type': '商业银行', 'company': '重庆农村商业银行'}, {
        'type': '商业银行',
        'company': '盛京银行'
      }, {'type': '商业银行', 'company': '徽商银行'}, {'type': '商业银行', 'company': '宁波银行'}, {
        'type': '商业银行',
        'company': '上海农商银行'
      }, {'type': '商业银行', 'company': '北京农商银行'}, {'type': '商业银行', 'company': '渤海银行'}, {
        'type': '商业银行',
        'company': '广州农商银行'
      }, {'type': '商业银行', 'company': '哈尔滨银行'}, {'type': '商业银行', 'company': '中原银行'}, {
        'type': '商业银行',
        'company': '天津银行'
      }, {'type': '商业银行', 'company': '杭州银行'}, {'type': '商业银行', 'company': '成都农商银行'}, {
        'type': '商业银行',
        'company': '厦门国际银行'
      }, {'type': '商业银行', 'company': '包商银行'}, {'type': '商业银行', 'company': '锦州银行'}, {
        'type': '商业银行',
        'company': '昆仑银行'
      }, {'type': '商业银行', 'company': '顺德农商银行'}, {'type': '商业银行', 'company': '重庆银行'}, {
        'type': '商业银行',
        'company': '东莞农村商业银行'
      }, {'type': '商业银行', 'company': '成都银行'}, {'type': '商业银行', 'company': '天津农商银行'}, {
        'type': '商业银行',
        'company': '吉林银行'
      }, {'type': '商业银行', 'company': '江西银行'}, {'type': '商业银行', 'company': '广州银行'}, {
        'type': '商业银行',
        'company': '大连银行'
      }, {'type': '商业银行', 'company': '长沙银行'}, {'type': '商业银行', 'company': '郑州银行'}, {
        'type': '商业银行',
        'company': '苏州银行'
      }, {'type': '商业银行', 'company': '青岛银行'}, {'type': '商业银行', 'company': '汉口银行'}, {
        'type': '商业银行',
        'company': '深圳农村商业银行'
      }, {'type': '商业银行', 'company': '河北银行'}, {'type': '商业银行', 'company': '东莞银行'}, {
        'type': '商业银行',
        'company': '武汉农村商业银行'
      }, {'type': '商业银行', 'company': '西安银行'}, {'type': '商业银行', 'company': '贵阳银行'}, {
        'type': '商业银行',
        'company': '富滇银行'
      }, {'type': '商业银行', 'company': '兰州银行'}, {'type': '商业银行', 'company': '贵州银行'}, {
        'type': '商业银行',
        'company': '青岛农商银行'
      }, {'type': '商业银行', 'company': '江苏江南农村商业银行'}, {'type': '商业银行', 'company': '洛阳银行'}, {
        'type': '商业银行',
        'company': '九江银行'
      }, {'type': '商业银行', 'company': '华融湘江银行'}, {'type': '商业银行', 'company': '甘肃银行'}, {
        'type': '商业银行',
        'company': '龙江银行'
      }, {'type': '商业银行', 'company': '杭州联合农村商业银行'}, {'type': '商业银行', 'company': '南海农商银行'}, {
        'type': '商业银行',
        'company': '广西北部湾银行'
      }, {'type': '商业银行', 'company': '湖北银行'}, {'type': '商业银行', 'company': '萧山农商银行'}, {
        'type': '商业银行',
        'company': '浙江稠州银行'
      }, {'type': '商业银行', 'company': '广东南粤银行'}, {'type': '商业银行', 'company': '吉林九台农村商业银行'}, {
        'type': '商业银行',
        'company': '南充市商业银行'
      }, {'type': '商业银行', 'company': '台州银行'}, {'type': '商业银行', 'company': '齐鲁银行'}, {
        'type': '商业银行',
        'company': '天津滨海农村商业银行'
      }, {'type': '商业银行', 'company': '长安银行'}, {'type': '商业银行', 'company': '重庆三峡银行'}, {
        'type': '商业银行',
        'company': '温州银行'
      }, {'type': '商业银行', 'company': '陕西秦农农村商业银行'}, {'type': '商业银行', 'company': '宁夏银行'}, {
        'type': '商业银行',
        'company': '威海市商业银行'
      }, {'type': '商业银行', 'company': '晋商银行'}, {'type': '商业银行', 'company': '珠海华润银行'}, {
        'type': '商业银行',
        'company': '内蒙古银行'
      }, {'type': '商业银行', 'company': '桂林银行'}, {'type': '商业银行', 'company': '江苏常熟农村商业银行'}, {
        'type': '商业银行',
        'company': '厦门银行'
      }, {'type': '商业银行', 'company': '唐山市商业银行'}, {'type': '商业银行', 'company': '阜新银行'}, {
        'type': '商业银行',
        'company': '营口银行'
      }, {'type': '商业银行', 'company': '日照银行'}, {'type': '商业银行', 'company': '乌鲁木齐银行'}, {
        'type': '商业银行',
        'company': '大连农商银行'
      }, {'type': '商业银行', 'company': '江苏江阴农村商业银行'}, {'type': '商业银行', 'company': '福建海峡银行'}];
      this.departments = {
        '公募基金': ['投资部', '研究部', '交易部', '风险管理部', '监察稽核部', '市场部', '机构业务部', '基金清算', '基金会计', '行政管理', '信息技术', '财务',],
        '证券公司': ['暂无数据'], '信托公司': ['暂无数据'], '商业银行': ['暂无数据']
      };
      this.options = {
        sex_options: [
          {key: true, value: '男'},
          {key: false, value: '女'}
        ],
        politicial_background_options: [
          {key: 0, value: '党员'},
          {key: 1, value: '民主党派'},
          {key: 2, value: '团员'},
          {key: 3, value: '群众'},
        ],
        native_place_options: [
          {key: 0, value: '直辖市或省会城市'},
          {key: 1, value: '其他'}
        ],
        degree_options: [
          {key: 0, value: '本科'},
          {key: 1, value: '硕士'},
          {key: 2, value: '博士'},
        ],
        major_options: [
          '金融学/国际金融', '金融工程/计量经济学', '经济学/国际贸易', '财务管理/会计', '统计学/数学', '法学',
          '计算机科学/软件工程', '物理/化学/生物等基础学科', '工商管理', '企业管理', '市场营销', '电子商务', '信息系统',
          '外语', '历史', '中文', '艺术类', '社会学', '心理学', '其他文史类专业',
        ],
        certificate_map: {
          'CPA全科': 0, 'CFA三级': 1, '北美精算师': 2, 'CPA三级部分': 3, 'CFA一级或二级': 4, 'FRM': 5, '司法考试': 6,
          '证券从业资格': 7, '银行从业资格': 8, '基金从业资格': 9, '期货从业资格': 10, '保险从业资格': 11,
          '计算机二级': 12, '计算机三级': 13, '计算机四级': 14
        },
        language_map: {'英语四/六级': 0, '托福': 1, '雅思': 2, '托业': 3},
        fellowship_map: {'国家级 奖学金/学生干部/荣誉证书': 0, '省部级 奖学金/学生干部/荣誉证书': 1, '校级 奖学金/学生干部/荣誉证书': 2},
        other_map: {'国外交换经历': 0, '社会实践项目': 1, '国家一级运动员/演员': 2, '国家二级运动员/演员': 3, '省级运动员/演员': 4},
        target_map: {'赚钱': 0, '工作稳定': 1, '大城市户口': 2},
        preferred_job_map: {'投行业务': 0, '资产管理': 1, '商业银行': 2, '风险管理/合规': 3, '支持部门': 4},
        character_map: {'勤奋的': 0, '交际花': 1, '霸气的/自信的': 2, '学习能力强的': 3, '细心的': 4},
      }
    },
    data() {
      return {
        step: 0,
        toShowTip: [true, true, true, true, true],
        showSearchUniversity: {0: false, 1: false, 2: false},
        showSearchCompany: {0: false, 1: false, 2: false},
        showResult: false,
        resultScore: 0,
        form: {
          name: "金农",
          sex: true,
          age: 25,
          native_place: 0,
          politicial_background: 0,
          contact: "123456789012",
          certificate: [],
          language: [],
          fellowship: [],
          other: [],
          target: [],
          preferred_job: [],
          character: [],
          internship_experience: [{
            "begin_date": "2018-09-10", "end_date": "2018-09-20",
            "company": "南方基金",
            "department": "投资部",
            "type": "公募基金"
          }],
          education_background: [{
            "begin_date": "2013-09-10", "end_date": "2016-09-20",
            "university": "上海交通大学",
            "major": "计算机科学/软件工程", "degree": 1
          }, {
            "begin_date": "2009-09-10", "end_date": "2013-06-20",
            "university": "上海交通大学",
            "major": "计算机科学/软件工程", "degree": 0
          }]
        },
      }
    },
    methods: {
      submit() {
        this.$http.post(process.env.BACKEND_HOST_PORT + "/competitive/query/", this.form).then(({data}) => {
          console.log(data)
          this.resultScore = JSON.parse(data)["score"]
        }).catch(({data}) => {
          console.log(data)
          this.resultScore = -1
        }).finally(() => {
          this.showResult = true
        })
      },
      filterUniversity(results, val) {
        results.splice(0, results.length)
        let res = val ? this.universities.filter(u => u.indexOf(val) >= 0) : []
        if (res.length === 0 && val)
          res.push(val)
        res.forEach(v => results.push({
          title: v
        }))
      },
      filterCompany(results, val) {
        results.splice(0, results.length)
        let res = val ? this.companies.filter(u => u.company.indexOf(val) >= 0) : []
        if (res.length === 0 && val)
          res.push({company: val, type: ''})
        res.forEach(v => results.push({
          title: v.company,
          type: v.type
        }))
      },
      getDepartmentByCompanyType(type) {
        let res = type ? this.departments[type] : []
        return (res || res.length !== 0) ? res : ["其他"]
      }
    }
  }
</script>

<style scoped lang="less">
  .btn_wrap {
    padding: 0 1rem;
    margin-top: 2rem;
  }

  .demo1-item {
    border: 1px solid #ececec;
    padding: 5px 15px;
  }

  .demo1-item-selected {
    border: 1px solid green;
  }

  .demo2-item {
    width: 40px;
    height: 40px;
    border: 1px solid #ccc;
    display: inline-block;
    border-radius: 50%;
    line-height: 40px;
    text-align: center;
  }

  .demo2-item-selected {
    border-color: green;
  }

  .demo-content {
    padding: 10px 10px;
  }
</style>
