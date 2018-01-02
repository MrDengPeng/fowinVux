<template>
	<div class="box vux-1px-b" @click="$emit('toDetail', data.id)">
		<div class="img"><img class="img-center" :src="data.photoUrl"/></div>
		<div class="content">
			<div class="tit white-space">{{data.videoName}}</div>
			<div class="s-label active">{{data.level}}</div>
			<div class="num">{{data.frequency}}次播放</div>
		</div>
		<div v-if="data.boutique == 'Y'" class="label"></div>
	</div>
</template>

<script>
	export default {
		data(){
			return {
				
			}
		},
		props: ['data']
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
		border-radius: 6px;
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