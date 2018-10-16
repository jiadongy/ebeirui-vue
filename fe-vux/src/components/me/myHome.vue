<template>
  <div>
    <cell title="昵称">{{name}}</cell>
    <cell title="微信Id">{{wxId}}</cell>

    <divider></divider>

    <card header="我的钱包">
      <div slot="content" class="card-demo-flex card-demo-content01">
        <div class="vux-1px-r">
          <span>1130</span>
          <br/>
          课程
        </div>
        <div class="vux-1px-r">
          <span>15</span>
          <br/>
          收藏
        </div>
        <div class="vux-1px-r">
          <span>0</span>
          <br/>
          余额
        </div>
        <div>
          <span>88</span>
          <br/>
          优惠券
        </div>
      </div>
    </card>

  </div>
</template>

<script>
  import {Card, Cell, CellBox, CellFormPreview, Divider} from 'vux'

  export default {
    name: "aboutMe",
    components: {Card, Cell, CellBox, CellFormPreview, Divider},
    data() {
      return {
        imgUrl: '',
        name: 'testName',
        userId: '',
        wxId: '',
        phone: '',
        email: '',
      }
    }
  }
</script>

<style scoped>

  .card-demo-flex {
    display: flex;
  }

  .card-demo-content01 {
    padding: 10px 0;
  }

  .card-padding {
    padding: 15px;
  }

  .card-demo-flex > div {
    flex: 1;
    text-align: center;
    font-size: 12px;
  }

  .card-demo-flex span {
    color: #f74c31;
  }
</style>
