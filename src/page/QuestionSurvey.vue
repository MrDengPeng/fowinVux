<template>
	<div style="background-color: #fff;">
		<img class="banner" src="../assets/images/i_question.png"/>
		<checklist class="check-list" v-model="cur" @on-change="onchange" title="1.请问您是否有以下投资经验？（多选）" :options="list1" :required="true" />
		<checklist class="check-list" title="2. 请问您有多少年的投资经验？" :options="list2" :max="1" :required="true" />
		<checklist class="check-list" title="3. 请问您对于自己的风险偏好程度认知？" :options="list3" :max="1" :required="true" />
		<checklist class="check-list" title="4.	请问您是否有过使用杠杆的投资经验？（股票配资，期货配资，外汇保证金交易等）" :options="list4" :max="1" :required="true" />
		<div class="g-b-btnbox">
			<x-button :gradients="['#669bff', '#1e50ae']" @click.native="dialogShow = !dialogShow" style="border-radius: 20px;">立即提交</x-button>
		</div>
	</div>
</template>

<script>
	import { Checklist, XButton } from 'vux'
	export default {
		data(){
			return {
				cur: [''],
				list1: [{key: 'a', value: '股票交易经验'}, {key: 'b', value: '期货交易经验'}, {key: 'c', value: '外汇保证金交易'}, {key: 'd', value: '股权投资'}, {key: 'e', value: '私募产品投资'}, {key: 'f', value: '无'}],
				list2: ['a) 一年以内', 'b) 一至三年', 'c) 三年以上 '],
				list3: ['a) 保守', 'b) 稳健', 'c) 激进 '],
				list4: ['a) 是', 'b) 否'],
			}
		},
		components: {
			Checklist,
			XButton
		},
		methods: {
			onchange(value, label){
				if(value[value.length-1] === 'f'){
					this.cur = ['f'];
				}
				if(value.length > 1 && value[0] === 'f' && value[1] !== 'f'){
					this.cur.shift();
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