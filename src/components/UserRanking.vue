<template>
	<div class="team-wrap">
		<div class="team-box g-boxshadow">
			<div class="g-avatar"><img src="../../dist/static/img/img1.4ae8f01.png"/></div>
			<div class="team-info">
				<div class="item">
					<div>20</div>
					<p>小组排名</p>
				</div>
				<div class="item">
					<div>181477.67</div>
					<p>净值</p>
				</div>
				<div class="item">
					<div>44.2%</div>
					<p>收益率</p>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		
	}
</script>

<style lang="less" scoped>
	.team-wrap{
		background-color: #fff;
		padding: 15px;
		padding-bottom: 0;
	}
	.team-box{
		position: relative;
		border-radius: 5px;
		padding-top: 50px;
		padding-bottom: 15px;
	}
	.team-box .g-avatar{
		position: absolute;
		top: -15px;
		left: 50%;
		margin-left: -25px;
		z-index: 2;
	}
	.team-info{
		display: flex;
	}
	.team-info .item{
		flex: 1;
		text-align: center;
	}
	.team-info .item div{
		color: #1E50AE;
		font-size: 18px;
		font-weight: 500;
	}
	.team-info .item p{
		font-size: 12px;
		margin-top: 5px;
	}
</style>