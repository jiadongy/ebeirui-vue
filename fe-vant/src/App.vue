<template>
    <div id="app">
        <!--<div id="nav">-->
        <!--<router-link to="/">Home</router-link> |-->
        <!--<router-link to="/about">About</router-link> |-->
        <!--<router-link to="/competitive">Competitive</router-link>-->
        <!--</div>-->
        <!--<router-view/>-->
        <Competitive/>
    </div>
</template>

<style>
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        /*margin-top: 60px;*/
    }
</style>
<script>
    import Competitive from "../../fe-vant/src/components/Competitive";

    export default {
        components: {Competitive}
    }
</script>