<template>
    <div>
        <van-nav-bar
                title="Demo for mobile"
                left-text="返回"
                right-text="按钮"
                left-arrow
                @click-left="/*onClickLeft*/"
                @click-right="/*onClickRight*/"
        ></van-nav-bar>


        <van-steps :active="activeStepIndex">
            <van-step>基本信息</van-step>
            <van-step>教育/实习经历</van-step>
            <van-step>资质/个性</van-step>
        </van-steps>

        <div>
            <van-cell-group v-if="activeStepIndex===0">
                <van-field
                        :value="form.name"
                        label="姓名"
                        left-icon="contact"
                />
                <van-field
                        :value="form.contact"
                        label="联系方式"
                        left-icon="<!--contact-->"
                />
                <van-field
                        :value="form.age"
                        label="年龄"
                        left-icon="<!--contact-->"
                />

                <van-cell-group>
                    <van-cell title="性别" is-link arrow-direction="down"
                              :value="sex_options.filter(item=>item.value===form.sex).pop().label"
                              @click="showSexOptions=!showSexOptions"/>
                    <van-radio-group v-model="form.sex" v-show="showSexOptions">
                        <van-cell-group>
                            <van-cell v-for="item in sex_options" :title="item.label">
                                <van-radio :name="item.value"/>
                            </van-cell>
                        </van-cell-group>
                    </van-radio-group>
                </van-cell-group>


                <!--<van-popup v-model="selector_show" position="bottom" :overlay="false">-->
                <!--<van-picker :columns="columns" @change="onChange"></van-picker>-->
                <!--</van-popup>-->

                <van-cell-group>
                    <van-cell title="籍贯" is-link arrow-direction="down"
                              :value="native_place_options.filter(item=>item.value===form.native_place).pop().label"
                              @click="showNativePlaceOptions=!showNativePlaceOptions"/>
                    <van-radio-group v-model="form.native_place" v-show="showNativePlaceOptions">
                        <van-cell-group>
                            <van-cell v-for="item in native_place_options" :title="item.label">
                                <van-radio :name="item.value"/>
                            </van-cell>
                        </van-cell-group>
                    </van-radio-group>
                </van-cell-group>

                <van-cell-group>
                    <van-cell title="政治背景" is-link arrow-direction="down"
                              :value="politicial_background_options.filter(item=>item.value===form.politicial_background).pop().label"
                              @click="showPoliticalBackgroundOptions=!showPoliticalBackgroundOptions"/>
                    <van-radio-group v-model="form.politicial_background" v-show="showPoliticalBackgroundOptions">
                        <van-cell-group>
                            <van-cell v-for="item in politicial_background_options" :title="item.label">
                                <van-radio :name="item.value"/>
                            </van-cell>
                        </van-cell-group>
                    </van-radio-group>
                </van-cell-group>
            </van-cell-group>

            <van-cell-group v-if="activeStepIndex===1">
                <van-cell>教育经历</van-cell>

                <van-cell-group v-for="(eb,index) in form.education_background"
                                :key="String(index)"
                                :label="'教育背景'+String(index)"
                                :name="String(index)">
                    <van-cell-group>
                        <van-cell title="学历" is-link arrow-direction="down"
                                  :value="degree_options.filter(item=>item.value===eb.degree).pop().label"
                                  @click="showEBOptions=!showEBOptions"/>
                        <van-radio-group v-model="eb.degree" v-show="showEBOptions">
                            <van-cell-group>
                                <van-cell v-for="item in degree_options" :title="item.label">
                                    <van-radio :name="item.value"/>
                                </van-cell>
                            </van-cell-group>
                        </van-radio-group>
                    </van-cell-group>

                    <van-field
                            :value="eb.university"
                            label="学校"
                            left-icon="<!--contact-->"
                    />

                    <van-field
                            :value="eb.major"
                            label="专业"
                            left-icon="<!--contact-->"
                    />

                    <van-field
                            :value="eb.begin_date"
                            label="起始日期"
                            left-icon="<!--contact-->"
                    />

                    <van-field
                            :value="eb.end_date"
                            label="截止日期"
                            left-icon="<!--contact-->"
                    />
                </van-cell-group>

                <van-cell>实习经历</van-cell>
            </van-cell-group>

            <van-button type="default" v-if="activeStepIndex>0" @click="activeStepIndex--">上一步</van-button>
            <van-button type="primary" v-if="activeStepIndex<2" @click="activeStepIndex++">下一步</van-button>
            <van-button type="primary" v-if="activeStepIndex===2">提交</van-button>
        </div>

        <van-tabbar v-model="activePageIndex" fixed style="position: fixed">
            <van-tabbar-item icon="shop">标签</van-tabbar-item>
            <van-tabbar-item icon="chat" dot>标签</van-tabbar-item>
            <van-tabbar-item icon="records" info="5">标签</van-tabbar-item>
            <van-tabbar-item icon="gold-coin" info="20">标签</van-tabbar-item>
        </van-tabbar>
    </div>
</template>

<script>

    export default {
        name: "Competitive",
        data() {
            return {
                activePageIndex: 0,
                activeStepIndex: 1,

                showSexOptions: false,
                showNativePlaceOptions: false,
                showPoliticalBackgroundOptions: false,
                showEBOptions:false,
                showIEOptions:false,

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
                        "department": "投资部"
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

                sex_options: [
                    {value: true, label: "男"},
                    {value: false, label: "女"}
                ],
                politicial_background_options: [
                    {value: 0, label: "党员"},
                    {value: 1, label: "民主党派"},
                    {value: 2, label: "团员"},
                    {value: 3, label: "群众"},
                ],
                native_place_options: [
                    {value: 0, label: "直辖市或省会城市"},
                    {value: 1, label: "其他"}
                ],
                degree_options: [
                    {value: 0, label: "本科"},
                    {value: 1, label: "硕士"},
                    {value: 2, label: "博士"},
                ],
                major_options: [
                    {"value": "金融学/国际金融"},
                    {"value": "金融工程/计量经济学"},
                    {"value": "经济学/国际贸易"},
                    {"value": "财务管理/会计"},
                    {"value": "统计学/数学"},
                    {"value": "法学"},
                    {"value": "计算机科学/软件工程"},
                    {"value": "物理/化学/生物等基础学科"},
                    {"value": "工商管理"},
                    {"value": "企业管理"},
                    {"value": "市场营销"},
                    {"value": "电子商务"},
                    {"value": "信息系统"},
                    {"value": "外语"},
                    {"value": "历史"},
                    {"value": "中文"},
                    {"value": "艺术类"},
                    {"value": "社会学"},
                    {"value": "心理学"},
                    {"value": "其他文史类专业"},
                ],

                certificate_map: {
                    "CPA全科": 0, "CFA三级": 1, "北美精算师": 2, "CPA三级部分": 3, "CFA一级或二级": 4,
                    "FRM": 5, "司法考试": 6,
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
        }
    }
</script>

<style scoped>

</style>