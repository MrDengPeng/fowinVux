<template>
	<div>
		<div class="top-head vux-1px-b">
			<div class="left"><span class="icon i-commun"></span>小组排名</div>
			<div class="right">查看更多</div>					
		</div>
		<user-ranking style="padding-top: 30px; padding-bottom: 15px;" />
		<div v-for="item in 3" :key="item" class="g-userinfo-item vux-1px-t">
			<div class="left">
				<div class="g-avatar"><img src="../../dist/static/img/img1.4ae8f01.png"/></div>
				<div class="info">
					<div class="name">李妍妍</div>
					<p class="text">净值：146927.9<br />收益率：65.39%</p>
				</div>
			</div>
			<div class="right">
				<div class="num">10</div>
			</div>
		</div>
	</div>
</template>

<script>
	import UserRanking from '@/components/UserRanking'
	export default {
		components: {
			UserRanking
		}
	}
</script>

<style lang="less">
	
</style>