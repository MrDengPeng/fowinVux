<template>
	<div>
		<div class="top-head vux-1px-b">
			<div class="left">组员（5）</div>
			<div class="right"><a class="btn">+添加组员</a></div>					
		</div>
		<div class="box">
			<input class="input" type="text" placeholder="请输入成员手机号+身份证后四位" />
			<input class="input" type="text" placeholder="请输入成员手机号+身份证后四位" />
		</div>
		<div class="g-b-btnbox">
			<x-button :gradients="['#669bff', '#1e50ae']" @click.native="onSubmit" style="border-radius: 20px;">确认</x-button>
		</div>
	</div>
</template>

<script>
	import { XButton } from 'vux'
	export default {
		components: {
			XButton
		},
		methods: {
			onSubmit(){
				this.$vux.confirm.show({
					confirmText: '去看看',
					cancelText: '继续添加',
					content: '组员邀请成功'
				});
			}
		}
	}
</script>

<style lang="less" scoped>
	.box{
		padding: 20px 15px;
		background-color: #fff;
	}
	.input{
		display: block;
		border: 1px solid #666;
		border-radius: 3px;
		width: 100%;
		box-sizing: border-box;
		padding: 10px 15px;
		line-height: 26px;
		font-size: 16px;
		margin-bottom: 20px;
	}
</style>