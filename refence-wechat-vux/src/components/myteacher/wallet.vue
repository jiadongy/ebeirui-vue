<template>
	<div class="wallet-content">
		<group>
			<!-- <cell title="银行卡信息" :link="{name:'AddBankCard'}" isLink></cell> -->
			<cell title="银行卡信息" @click.native="goBank" isLink></cell>
			<cell title="总收入" :link="{name:'Particulars'}" :value="walletModel.sumIncome"></cell>
			<!-- <cell title="账户余额" :value="money"></cell> -->
			<walletcell :title="title" :money="walletModel.incomeMoney" @feedback="getFeedback"></walletcell>
			<cell title="提现金额" :value="walletModel.withdrowMoney"></cell>
			
		</group>
		<group>
			<cell title="提现进度">
	      		<img slot="icon" src="../../assets/wallet.png" style="display:block; margin-right:5px" width="16">
	      	</cell>
	      	<!--    <scroller lock-x height="-46px" @on-scroll="onScroll" ref="scrollerEvent" >
			      <div class="box2"> -->
			        <p v-for="item in walletModel.withdrawDeposits" class="withDrawal">{{ item.withdrawMoney }}    {{ item.withdrawCreateTime * 1000 | formatDate }}      {{ item.withdrawStatus }}</p>
			  <!--     </div>
    			</scroller> -->
		</group>
		<transition name="fade">
			<modalbank v-show="modalshow" @commitAction="commitAction" @hideGiveFriend="hideGiveFriend"></modalbank>
		</transition>
	</div>
</template>
<script type="text/javascript">
import { Cell, Group, Scroller } from 'vux';
import WalletCell from '@/components/myteacher/walletCell';
import modalbank from '@/components/common/addBankModal';
import { mapState } from 'vuex';
import {formatDate} from '../../utils/datetime.js';
	export default {
		computed: {
	        ...mapState({
	            common_request_base_url: state => state.common.common_request_base_url,
	           	userinfo_data: state => state.UserInfo.userinfo_data,
	            common_request_appendv1_url: state => state.common.common_request_appendv1_url
	        })
    	},
		data() {
			return {
				money: 900,
				title: '账户余额',
				modalshow: false,
				scroller: null,
				walletModel: {}
			};
		},
		components: {
			Cell,
			Group,
			walletcell: WalletCell,
			Scroller,
			modalbank
		},
		methods: {
			onScroll(pos) {
				this.scrollTop = pos.top;
			},
			getFeedback() {
				this.modalshow = true;
				console.log('提现操作');
			},
			commitAction(val) {
				this.modalshow = false;
				// 提现接口有遗留问题
				var params = {
					id: localStorage.getItem('dataid'),
					withdrawLecturerId: this.$store.state.UserInfo.lecturerId,
					withdrawCardId: '',
					withdrawMoney: val
				};
				let url = this.common_request_base_url + 'v1/app/savewithdraw';
				var qs = require('qs');
				this.$http.post(url, qs.stringify(params), {
					 headers: {
	    				'Content-Type': 'application/x-www-form-urlencoded'
	  				}
				}).then((res) => {
					console.log(res);
					// 提现成功刷新页面
					if (res.data.content.result !== null) {
						let url = this.common_request_base_url + 'v1/app/findincomebyid?id=' + localStorage.getItem('dataid') + '&lecturerId=' + vm.$store.state.UserInfo.lecturerId;
						vm.$http.get(url)
						.then((res) => {
							vm.walletModel = res.data.content.result;
							if (vm.walletModel.sumIncome === null) {
								vm.walletModel.sumIncome = 0;
              }
              if (vm.walletModel.incomeMoney === null) {
								vm.walletModel.incomeMoney = 0;
              }
              if (vm.walletModel.withdrowMoney === null) {
								vm.walletModel.withdrowMoney = 0;
              }
            });
          }
        });
				console.log('提交提现', val);
			},
			hideGiveFriend() {
				this.modalshow = false;
				console.log('提现取消');
			},
			goBank() {
				console.log(111111111111111);
				let id = localStorage.getItem('dataid');
				let lecturerId = this.$store.state.UserInfo.lecturerId;
				let url = this.common_request_base_url + 'v1/app/findbankcardbylecturerid?id=' + id + '&&lecturerId=' + lecturerId;
				this.$http.get(url)
				.then((res) => {
					if (res.data.content.result === null) {
						this.$router.push({ name: 'AddBankCard' });
					} else {
						// console.log(res.data.content.result);
						this.$router.push({ name: 'BankCard', params: { cardMessage: res.data.content.result } });
          }
        });
			}
		},
		mounted() {
			this.scroller = this.$el;
		},
		beforeRouteEnter (to, from, next) {
			next(vm => {
				let url = vm.common_request_base_url + vm.common_request_appendv1_url + 'findincomebyid?id=' + localStorage.getItem('dataid') + '&lecturerId=' + vm.$store.state.UserInfo.userinfo_data.lecturerId + '&openid=' + localStorage.getItem('openid');
				console.log(url);
				vm.$http.get(url)
				.then((res) => {
					console.log(res);
					vm.walletModel = res.data.content.result;
					if (vm.walletModel.sumIncome === null) {
						vm.walletModel.sumIncome = 0;
          }
          if (vm.walletModel.incomeMoney === null) {
						vm.walletModel.incomeMoney = 0;
          }
          if (vm.walletModel.withdrowMoney === null) {
						vm.walletModel.withdrowMoney = 0;
          }
        });
			});
		},
		filters: {
		    formatDate(time) {
		        var date = new Date(time);
		        return formatDate(date, 'yyyy-MM-dd hh:mm');
		    }
    	}
	};
</script>
<style lang="stylus" scroped>
.wallet-content
	width: 100vw
	height: 100vh
	overflow: auto;
	transition: transform 0.3s ease;
	-webkit-overflow-scrolling: touch;
	.withDrawal
		border-bottom: 1px solid rgba(7, 17, 27, 0.1)
		line-height: 40px
		padding-left: 10px
		font-size: 14px
	
</style>
