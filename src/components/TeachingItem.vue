<template>
	<div class="box vux-1px-b">
		<div class="img"><img src="../assets/images/img2.png"/></div>
		<div class="content">
			<div class="tit white-space">XXXXXXX课程</div>
			<div class="s-label active">中级</div>
			<div class="num">863次播放</div>
		</div>
		<div class="label"></div>
	</div>
</template>

<script>
	export default {
		
	}
</script>

<style scoped>
	.box{
		display: flex;
		background-color: #fff;
		padding: 20px;
		position: relative;
	}
	.img{
		flex-shrink: 0;
		width: 300px;
		height: 200px;
		overflow: hidden;
		border-radius: 10px;
	}
	.img img{
		display: block;
		position: relative;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		width: 100%;
		min-height: 100%;
	}
	.content{
		padding-left: 30px;
	}
	.content .s-label{
		display: block;
		width: 70px;
	}
	.content .tit{
		color: #333;
		font-size: 36px;
		line-height: 76px;
	}
	.content .num{
		font-size: 30px;
		margin-top: 40px;
	}
	.label{
		position: absolute;
		top: 20px;
		left: 14px;
		background: url(../assets/images/i_label.png) no-repeat left top/100%;
		width: 70px;
		height: 40px;
		text-align: center;
		color: #fff;
		font-size: 24px;
		line-height: 36px;
		z-index: 2;
	}
</style>