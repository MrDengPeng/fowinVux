<template>
	<div>
		<div class="top-head vux-1px-b">
			<div class="left">组员（5）</div>
			<div class="right"><a class="btn" @click="routeTo">+添加组员</a></div>					
		</div>
		<div class="g-userinfo-item">
			<div class="left">
				<div class="g-avatar"><img src="../assets/images/img1.png"/></div>
				<div class="info">
					<div class="name">李妍妍</div>
				</div>
			</div>
			<div class="right">
				
			</div>
		</div>
		<div class="g-userinfo-item vux-1px-t">
			<div class="left">
				<div class="g-avatar"><img src="../assets/images/img1.png"/></div>
				<div class="info">
					<div class="name">李妍妍</div>
				</div>
			</div>
			<div class="right">
				
			</div>
		</div>
		<div class="g-userinfo-item vux-1px-t">
			<div class="left">
				<div class="g-avatar"><img src="../assets/images/img1.png"/></div>
				<div class="info">
					<div class="name">李妍妍</div>
				</div>
			</div>
			<div class="right">
				<a class="g-s-btn">我要退出</a>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		props: ['id'],
		created(){
			console.log(this.id)
		},
		methods: {
			routeTo(){
				this.$router.push({name: 'CreateTeam'})
			}
		}
	}
</script>

<style>
</style>