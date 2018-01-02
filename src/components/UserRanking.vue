<template>
	<div class="team-wrap">
		<div class="team-box g-boxshadow">
			<div class="g-avatar"><img :src="data.myAvatar"/></div>
			<div class="team-info">
				<div class="item">
					<div v-if="data.myRanking!=0">{{data.myRanking}}</div>
					<div v-else>暂无</div>
					<p>{{isTeam=='Y'?'小组':'我的'}}排名</p>
				</div>
				<div class="item">
					<div v-if="data.myRanking!=0">{{data.myNetworth}}</div>
					<div v-else>暂无</div>
					<p>净值</p>
				</div>
				<div class="item">
					<div v-if="data.myRanking!=0">{{data.myProfit}}%</div>
					<div v-else>暂无</div>
					<p>收益率</p>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		props: ['data', 'isTeam'],
		created(){
			console.log(this.data.myAvatar)
		},
		computed: {
			rank_C(){
				if(this.data.myRanking){
					
				}
			}
		}
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
		height: 28px;
	}
	.team-info .item p{
		font-size: 12px;
		margin-top: 5px;
	}
</style>