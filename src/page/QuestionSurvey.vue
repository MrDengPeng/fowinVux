<template>
	<div style="background-color: #fff;">
		<img class="banner" src="../assets/images/i_question.png"/>
		<checklist class="check-list" v-model="cur1" @on-change="onchange" title="1.请问您是否有以下投资经验？（多选）" :options="list1" :required="true" />
		<checklist class="check-list" v-model="cur2" title="2. 请问您有多少年的投资经验？" :options="list2" :max="1" :required="true" />
		<checklist class="check-list" v-model="cur3" title="3. 请问您对于自己的风险偏好程度认知？" :options="list3" :max="1" :required="true" />
		<checklist class="check-list" v-model="cur4" title="4.	请问您是否有过使用杠杆的投资经验？（股票配资，期货配资，外汇保证金交易等）" :options="list4" :max="1" :required="true" />
		<div class="g-b-btnbox">
			<x-button :gradients="['#669bff', '#1e50ae']" @click.native="onsubmit" style="border-radius: 20px;">立即提交</x-button>
		</div>
	</div>
</template>

<script>
	import { Checklist, XButton } from 'vux'
	export default {
		data(){
			return {
				cur1: [],
				cur2: [],
				cur3: [],
				cur4: [],
				list1: [{key: 'a', value: 'a) 股票交易经验'}, {key: 'b', value: 'b) 期货交易经验'}, {key: 'c', value: 'c) 外汇保证金交易'}, {key: 'd', value: 'd) 股权投资'}, {key: 'e', value: 'e) 私募产品投资'}, {key: 'f', value: 'f) 无'}],
				list2: [{key: 'a', value: 'a) 一年以内'}, {key: 'b', value: 'b) 一至三年'}, {key: 'c', value: 'c) 三年以上'}],
				list3: [{key: 'a', value: 'a) 保守'}, {key: 'b', value: 'b) 稳健'}, {key: 'c', value: 'c) 激进 '}],
				list4: [{key: 'a', value: 'a) 是'}, {key: 'b', value: 'b) 否'}],
			}
		},
		components: {
			Checklist,
			XButton
		},
		methods: {
			onchange(value, label){
				if(value[value.length-1] === 'f'){
					this.cur1 = ['f'];
				}
				if(value.length > 1 && value[0] === 'f' && value[1] !== 'f'){
					this.cur1.shift();
				}
				console.log(this.cur1)
			},
			onsubmit(){
				if(this.cur1.length > 0 && this.cur2.length > 0 && this.cur3.length > 0 && this.cur4.length > 0){
					this.$post('/api/app/member/questionnaire.v1',{answer1: this.cur1.join(), answer2: this.cur2.join(), answer3: this.cur3.join(), answer4: this.cur4.join()}).then(
						res => {
							switch(res.examineState){
								case 'W': this.$router.replace({path: '/account/sign'});break;
								case 'C': this.$router.replace({path: '/account/upload'});break;
								case 'E': this.$router.replace({path: '/account/open'});break;
								default: 
									this.$vux.toast.text('提交成功');
									setTimeout(() => {
										this.$router.go(-1);
									}, 1000)
							}
							
						}
					).catch(
						e => {
							console.log(e);
						}
					)
				}else{
					this.$vux.toast.text('请填写问卷调查')
				}
			}
		}
	}
</script>
<style lang="less">
	.check-list .weui-cells{
		background-color: transparent;
		font-size: 15px;
	}
	.check-list .weui-cells:before, .check-list .weui-cells:after, .check-list .weui-cell:before{
		display: none;
	}
	.check-list .weui-cells__title{
		font-size: 15px;
		color: #333;
		margin-top: 20px;
	}
	.check-list .weui-cell{
		padding: 6px 15px;
	}
</style>
<style lang="less" scoped>
	.banner{
		display: block;
		width: 100%;
	}
	
</style>