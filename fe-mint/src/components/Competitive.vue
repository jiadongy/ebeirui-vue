<template>
<div>
    <mt-header title="Demo for mobile">
        <!--<router-link to="/" slot="left">-->
            <!--<mt-button icon="back">返回</mt-button>-->
            <!--<mt-button @click="handleClose">关闭</mt-button>-->
        <!--</router-link>-->
        <!--<mt-button icon="more" slot="right"></mt-button>-->
    </mt-header>

    <mt-tab-container v-model="activePage" swipeable>
        <mt-tab-container-item id="发现">
            <mt-cell v-for="n in 10" title="tab-container 1"></mt-cell>
        </mt-tab-container-item>
        <mt-tab-container-item id="订单">
            <mt-cell v-for="n in 5" title="tab-container 2"></mt-cell>
        </mt-tab-container-item>
        <mt-tab-container-item id="我的">
            <mt-cell v-for="n in 7" title="tab-container 3"></mt-cell>
        </mt-tab-container-item>
    </mt-tab-container>



    <mt-tabbar v-model="activePage">
        <mt-tab-item id="发现">
            <!--<img slot="icon" src="../assets/100x100.png">-->
            发现
        </mt-tab-item>
        <mt-tab-item id="订单">
            <!--<img slot="icon" src="../assets/100x100.png">-->
            订单
        </mt-tab-item>
        <mt-tab-item id="我的">
            <!--<img slot="icon" src="../assets/100x100.png">-->
            我的
        </mt-tab-item>
    </mt-tabbar>
</div>
</template>

<script>
    export default {
        name: "Competitive",
        data() {
            return {
                activePage:'发现',

            }
        }
    }
</script>

<style scoped>

</style>