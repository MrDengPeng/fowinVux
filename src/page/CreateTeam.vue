<template>
	<div>
		<div class="top-head vux-1px-b">
			<div class="left">组员（{{num}}）</div>
			<div class="right"><a class="btn" @click="addMember_M">添加</a></div>					
		</div>
		<div class="box">
			<input class="input" type="number" maxlength="15" v-for="item in inputList" v-model="item.value" placeholder="请输入成员手机号+身份证后四位" />
		</div>
		<div class="g-b-btnbox">
			<x-button :gradients="['#669bff', '#1e50ae']" @click.native="onSubmit_M" style="border-radius: 20px;">确认</x-button>
		</div>
	</div>
</template>

<script>
	import { XButton } from 'vux'
	export default {
		data(){
			return {
				inputList: [{value:''}]
			}
		},
		props: ['id', 'num'],
		components: {
			XButton
		},
		methods: {
			//提交添加组员请求
			onSubmit_M(){
				let crewTelphone = []
				let list = this.inputList
				for(let i = 0; i < list.length; i++){
					let value = list[i].value
					if(value != '' && value != undefined){
						//!/^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/.test(value.trim().substring(0,11))
						if(value.trim().length != 15){
							this.$vux.toast.text('成员信息格式不对');
							return
						}
						crewTelphone.push(value.trim())
					}
				}
				console.log(crewTelphone);
				if(!crewTelphone.length){
					this.$vux.toast.text('请填写成员信息');
					return
				}
				this.$post('/api/app/team/addCrew.v1', {matchId: this.id, crewTelphone: crewTelphone.join()}).then(
					res => {
						this.$vux.confirm.show({
							confirmText: '去看看',
							cancelText: '继续添加',
							content: '组员邀请成功',
							onCancel: () => {
								this.inputList = [{value:''}]
							},
							onConfirm: () => {
								this.$router.replace({name: 'MyTeam', params: {matchId: this.id, teamId: res.id}})
							}
						});
						
					}
				).catch(
					e => {
						console.log(e);
					}
				)
				
			},
			//添加组员输入框
			addMember_M(){
				this.inputList.push({vaule:''})
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