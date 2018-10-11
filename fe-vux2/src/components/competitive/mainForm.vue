<template>
  <div style="width: 95%;margin: 0 auto;">

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
        <selector v-model="form.politicial_background" title="政治背景"
                  :options="options.politicial_background_options"></selector>
        <selector v-model="form.native_place" title="籍贯" :options="options.native_place_options"></selector>
        <cell title="年龄">
          <inline-x-number style="display:block;" v-model="form.age" :min="20" :max="35" width="50px" button-style="round"></inline-x-number>
        </cell>
        <x-input title="联系方式" v-model="form.contact"></x-input>
      </group>
    </div>
    <div v-show="step===1">
      <toast v-model="toShowTip[step]" :time="2000" type="text">tips:左滑可以删除</toast>
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
        <div>
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
      <toast v-model="toShowTip[step]" :time="2000" type="text">tips:左滑可以删除</toast>
      <div v-for="(item,index) in form.internship_experience" >
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
                <selector v-model="item.type" title="类型" v-show="!item.type"
                          :options="Object.keys(departments)"></selector>
                <selector v-model="item.department" title="部门" :options="getDepartmentByCompanyType(item.type)"
                          :placeholder="!item.type?'请先选择类型':''"></selector>
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
      <divider>奖学类</divider>
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
  </div>
</template>

<script>
  import {
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
    Toast
  } from 'vux'

  import SearchU from './search'
  import Panel from "vux/src/components/panel/index";

  export default {
    name: "mainForm",
    components: {
      Panel,
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
      Toast
    },
    created() {
      this.universities = ["上海交通大学", "复旦大学", "上海财经大学"];
      this.companies = [{company: "嘉实基金", type: "公募基金"}, {company: "东方证券", type: "证券公司"}];
      this.departments = {"公募基金": ["投资部", "信息部"], "证券公司": ["合规部", "营业部"]};
      this.options = {
        sex_options: [
          {key: true, value: "男"},
          {key: false, value: "女"}
        ],
        politicial_background_options: [
          {key: 0, value: "党员"},
          {key: 1, value: "民主党派"},
          {key: 2, value: "团员"},
          {key: 3, value: "群众"},
        ],
        native_place_options: [
          {key: 0, value: "直辖市或省会城市"},
          {key: 1, value: "其他"}
        ],
        degree_options: [
          {key: 0, value: "本科"},
          {key: 1, value: "硕士"},
          {key: 2, value: "博士"},
        ],
        major_options: [
          "金融学/国际金融", "金融工程/计量经济学", "经济学/国际贸易", "财务管理/会计", "统计学/数学", "法学",
          "计算机科学/软件工程", "物理/化学/生物等基础学科", "工商管理", "企业管理", "市场营销", "电子商务", "信息系统",
          "外语", "历史", "中文", "艺术类", "社会学", "心理学", "其他文史类专业",
        ],
        certificate_map: {
          "CPA全科": 0, "CFA三级": 1, "北美精算师": 2, "CPA三级部分": 3, "CFA一级或二级": 4, "FRM": 5, "司法考试": 6,
          "证券从业资格": 7, "银行从业资格": 8, "基金从业资格": 9, "期货从业资格": 10, "保险从业资格": 11,
          "计算机二级": 12, "计算机三级": 13, "计算机四级": 14
        },
        language_map: {"英语四/六级": 0, "托福": 1, "雅思": 2, "托业": 3},
        fellowship_map: {"国家级 奖学金/学生干部/荣誉证书": 0, "省部级 奖学金/学生干部/荣誉证书": 1, "校级 奖学金/学生干部/荣誉证书": 2},
        other_map: {"国外交换经历": 0, "社会实践项目": 1, "国家一级运动员/演员": 2, "国家二级运动员/演员": 3, "省级运动员/演员": 4},
        target_map: {"赚钱": 0, "工作稳定": 1, "大城市户口": 2},
        preferred_job_map: {"投行业务": 0, "资产管理": 1, "商业银行": 2, "风险管理/合规": 3, "支持部门": 4},
        character_map: {"勤奋的": 0, "交际花": 1, "霸气的/自信的": 2, "学习能力强的": 3, "细心的": 4},
      }
    },
    data() {
      return {
        step: 0,
        toShowTip: [true, true, true, true, true],
        showSearchUniversity: {0: false, 1: false, 2: false},
        showSearchCompany: {0: false, 1: false, 2: false},
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
        return (res || res.length === 0) ? res : ["其他"]
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
