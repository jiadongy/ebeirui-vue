<template>
    <el-form ref="form" :model="form" label-width="80px">

        <!--<el-form :inline="true">-->
        <el-row>
            <el-col :span="12">
                <el-form-item label="姓名">
                    <el-input v-model="form.name" placeholder="姓名"/>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="联系方式">
                    <el-input v-model="form.contact" placeholder="邮箱或手机号"/>
                </el-form-item>
            </el-col>

        </el-row>
        <el-row>
            <el-col :span="12">
                <el-form-item label="年龄">
                    <el-input type="age" v-model.number="form.age" placeholder="年龄"/>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="性别">
                    <el-select v-model="form.sex" placeholder="请选择" value="true">
                        <el-option v-for="item in sex_options"
                                   :key="item.value"
                                   :label="item.label"
                                   :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-col>
        </el-row>

        <el-row>
            <el-col :span="12">
                <el-form-item label="籍贯">
                    <el-select v-model="form.native_place" placeholder="请选择" value="0">
                        <el-option v-for="item in native_place_options"
                                   :key="item.value"
                                   :label="item.label"
                                   :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="政治背景">
                    <el-select v-model="form.politicial_background" placeholder="请选择" value="0">
                        <el-option v-for="item in politicial_background_options"
                                   :key="item.value"
                                   :label="item.label"
                                   :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-col>
        </el-row>

        <!--</el-form>-->
        <br/>

        <el-tabs v-model="ebCurrentTabName" type="card"
                 addable
                 :closable="form.education_background.length>1"
                 @edit="handleEbTabsEdit">
            <el-tab-pane v-for="(eb,index) in form.education_background"
                         :key="String(index)"
                         :label="'教育背景'+String(index)"
                         :name="String(index)"
            >
                <!--<el-form :inline="true">-->
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="学历">
                            <el-select v-model="eb.degree" placeholder="请选择" value="0">
                                <el-option v-for="item in degree_options"
                                           :key="item.value"
                                           :label="item.label"
                                           :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="学校">
                            <!--<el-input v-model="eb.university" placeholder=""/>-->
                            <el-autocomplete v-model="eb.university" :trigger-on-focus="false"
                                             :fetch-suggestions="searchUniversity"
                                             placeholder="" style="width: 100%"/>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="专业">
                            <el-select v-model="eb.major" placeholder="请选择" value="''">
                                <el-option v-for="item in major_options"
                                           :key="item.value"
                                           :label="item.value"
                                           :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <!--<el-form :inline="true">-->
                    <el-form-item label="起止日期">
                        <el-col :span="11">
                            <el-date-picker
                                    v-model="eb.begin_date"
                                    type="date"
                                    placeholder="请选择" style="width: 100%;">
                            </el-date-picker>
                        </el-col>
                        <el-col :span="2" style="text-align: center;">至</el-col>
                        <el-col :span="11">
                            <el-date-picker
                                    v-model="eb.end_date"
                                    type="date"
                                    placeholder="请选择" style="width: 100%;">
                            </el-date-picker>
                        </el-col>
                    </el-form-item>
                    <!--</el-form>-->
                </el-row>

                <!--</el-form>-->
            </el-tab-pane>
        </el-tabs>
        <br/>
        <el-tabs v-model="ieCurrentTabName" type="card"
                 editable
                 @edit="handleIeTabsEdit">
            <el-tab-pane v-for="(ie,index) in form.internship_experience"
                         :key="''+index"
                         :label="'实习经历'+index"
                         :name="''+index">
                <!--<el-form :inline="true">-->
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="机构">
                            <el-input v-model="ie.company" placeholder=""/>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="部门">
                            <el-input v-model="ie.department" placeholder=""/>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-form-item label="起止日期">
                        <el-col :span="11">
                            <el-date-picker
                                    v-model="ie.begin_date"
                                    type="date"
                                    placeholder="请选择" style="width: 100%;">
                            </el-date-picker>
                        </el-col>
                        <el-col :span="2" style="text-align: center;">至</el-col>
                        <el-col :span="11">
                            <el-date-picker
                                    v-model="ie.end_date"
                                    type="date"
                                    placeholder="请选择" style="width: 100%;">
                            </el-date-picker>
                        </el-col>
                    </el-form-item>
                </el-row>
                <!--</el-form>-->
            </el-tab-pane>
        </el-tabs>

        <el-form>
            <el-form-item label="专业证书">
                <el-checkbox-group v-model="form.certificate">
                    <el-checkbox v-for="(co,index) of Object.keys(certificate_map)" :label="co" :key="String(index)"></el-checkbox>
                </el-checkbox-group>
            </el-form-item>
        </el-form>

        <el-form>
            <el-form-item label="语言">
                <el-checkbox-group v-model="form.language">
                    <el-checkbox v-for="(co,index) of Object.keys(language_map)" :label="co" :key="String(index)"></el-checkbox>
                </el-checkbox-group>
            </el-form-item>
        </el-form>

        <el-form>
            <el-form-item label="奖学金">
                <el-checkbox-group v-model="form.fellowship">
                    <el-checkbox v-for="(co,index) of Object.keys(fellowship_map)" :label="co" :key="String(index)"></el-checkbox>
                </el-checkbox-group>
            </el-form-item>
        </el-form>

        <el-form>
            <el-form-item label="其他">
                <el-checkbox-group v-model="form.other">
                    <el-checkbox v-for="(co,index) of Object.keys(other_map)" :label="co" :key="String(index)"></el-checkbox>
                </el-checkbox-group>
            </el-form-item>
        </el-form>

        <el-form>
            <el-form-item label="人生目标">
                <el-checkbox-group v-model="form.target">
                    <el-checkbox v-for="(co,index) of Object.keys(target_map)" :label="co" :key="String(index)"></el-checkbox>
                </el-checkbox-group>
            </el-form-item>
        </el-form>

        <el-form>
            <el-form-item label="职业偏好">
                <el-checkbox-group v-model="form.preferred_job">
                    <el-checkbox v-for="(co,index) of Object.keys(preferred_job_map)" :label="co" :key="String(index)"></el-checkbox>
                </el-checkbox-group>
            </el-form-item>
        </el-form>

        <el-form>
            <el-form-item label="性格描述">
                <el-checkbox-group v-model="form.character">
                    <el-checkbox v-for="(co,index) of Object.keys(character_map)" :label="co" :key="String(index)"></el-checkbox>
                </el-checkbox-group>
            </el-form-item>
        </el-form>


        <el-form-item>
            <el-button type="primary" @click="onSubmit">立即了解我的求职竞争力</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
    export default {
        methods: {
            onSubmit() {
                // this.$alert(JSON.stringify(this.form));
                let data = JSON.parse(JSON.stringify(this.form));
                data.certificate = data.certificate.map((currentValue) => {
                    return currentValue in this.certificate_map ? this.certificate_map[currentValue] : -1
                }).filter(num => num >= 0);
                data.language = data.language.map((currentValue) => {
                    return currentValue in this.language_map ? this.language_map[currentValue] : -1
                }).filter(num => num >= 0);
                data.fellowship = data.fellowship.map((currentValue) => {
                    return currentValue in this.fellowship_map ? this.fellowship_map[currentValue] : -1
                }).filter(num => num >= 0);
                data.other = data.other.map((currentValue) => {
                    return currentValue in this.other_map ? this.other_map[currentValue] : -1
                }).filter(num => num >= 0);
                data.target = data.target.map((currentValue) => {
                    return currentValue in this.target_map ? this.target_map[currentValue] : -1
                }).filter(num => num >= 0);
                data.preferred_job = data.preferred_job.map((currentValue) => {
                    return currentValue in this.preferred_job_map ? this.preferred_job_map[currentValue] : -1
                }).filter(num => num >= 0);
                data.character = data.character.map((currentValue) => {
                    return currentValue in this.character_map ? this.character_map[currentValue] : -1
                }).filter(num => num >= 0);
                // alert(JSON.stringify(data));
                this.axios.post(process.env.VUE_APP_HOST+"/competitive/query/", data).then(response =>
                        this.$alert("您的求职竞争力为 " + Number(JSON.parse(response.data).score),"Wow",{center:true}),
                    () => this.$alert("服务器开小差去了", "额", {type: "error"}))
            },

            searchUniversity(queryString, cb) {
                let results = queryString ? ["上海交通大学", "复旦大学", "上海财经大学"].filter(u => u.toLowerCase().indexOf(queryString.toLowerCase()) === 0) : ["上海交通大学", "复旦大学", "上海财经大学"];
                //alert(JSON.stringify(results))
                cb(results)
            },

            handleEbTabsEdit(targetName, action) {
                if (action === 'add') {
                    this.form.education_background.push({});
                    this.ebCurrentTabName = String(this.form.education_background.length - 1);
                }
                else if (action === 'remove') {
                    let tabs = this.form.education_background;
                    let index = Number(targetName);
                    let newIndex = index > 0 ? index - 1 : 0;
                    this.ebCurrentTabName = String(newIndex);
                    tabs.splice(index, 1);
                }
            },
            handleIeTabsEdit(targetName, action) {
                if (action === 'add') {
                    this.form.internship_experience.push({});
                    this.ebCurrentTabName = (this.form.internship_experience.length - 1) + '';
                }
                if (action === 'remove') {
                    let tabs = this.form.internship_experience;
                    let index = Number(targetName);
                    let newIndex = index > 0 ? index - 1 : 0;
                    this.ieCurrentTabName = String(newIndex);
                    tabs.splice(index, 1);
                }
            }
        },
        data() {
            return {
                name: "competitive",
                ebCurrentTabName: '0',
                ieCurrentTabName: '0',

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
                    },{
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

                //todo
                validate_rules: {
                    name: [
                        {required: true, message: '请输入活动名称', trigger: 'blur'},
                        {min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur'}
                    ],
                    region: [
                        {required: true, message: '请选择活动区域', trigger: 'change'}
                    ],
                    date1: [
                        {type: 'date', required: true, message: '请选择日期', trigger: 'change'}
                    ],
                    date2: [
                        {type: 'date', required: true, message: '请选择时间', trigger: 'change'}
                    ],
                    type: [
                        {type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change'}
                    ],
                    resource: [
                        {required: true, message: '请选择活动资源', trigger: 'change'}
                    ],
                    desc: [
                        {required: true, message: '请填写活动形式', trigger: 'blur'}
                    ]
                }
            }
        },
        mounted() {
            this.universities = ["上海交通大学", "复旦大学", "上海财经大学"];
            this.majors = ["金融工程", "软件工程"];
            this.companies = [{company: "嘉实基金", type: "公募基金"}];
            this.departments = {"公募基金": ["投资部", "信息部"]};
        }
    }
</script>

<style scoped>

</style>
