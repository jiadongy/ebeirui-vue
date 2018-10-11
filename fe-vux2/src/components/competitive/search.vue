<!--suppress UnterminatedStatementJS -->
<template>
  <div>
    <search
      @result-click="resultClick"
      @on-change="getResult"
      :results="results"
      v-model="value"
      position="absolute"
      auto-scroll-to-top
      top="0px"
      @on-focus="onFocus"
      @on-cancel="onCancel"
      @on-submit="onSubmit"
      ref="search"></search>
  </div>
</template>

<script>
  import { Search, Group, Cell, XButton } from 'vux'

  export default {
    name:"searchPage",
    components: {
      Search,
      Group,
      Cell,
      XButton
    },
    methods: {
      resultClick (item) {
        this.$emit('value-selected',item)
      },
      getResult (val) {
        this.picker(this.results,val)
      },
      onSubmit () {
        this.$refs.search.setBlur()
      },
      onFocus () {
        console.log('on focus')
      },
      onCancel () {
        console.log('on cancel')
        this.$emit('cancel')
      }
    },
    props:{
      picker:{type:Function,required:true}
      },
    data () {
      return {
        results: [],
        value: ''
      }
    }
  }
</script>
