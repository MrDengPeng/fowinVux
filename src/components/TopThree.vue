<template>
	<div class="box">
		<flexbox align="flex-end">
			<!--<flexbox-item v-for="item in topThree" :key="item.id" :order="order_M(item.ranking)" :class="{leftflex: item.ranking==2}">
				<div class="item-box g-boxshadow" :class="{one: item.ranking==1,two: item.ranking==2,three: item.ranking==3}">
					<div class="name">{{item.teamName}}</div>
					<p class="data">{{item.averageNetworth}}<br />{{item.profit}}%</p>
				</div>
			</flexbox-item>-->
			<flexbox-item>
				<div class="item-box g-boxshadow two">
					<div class="name">{{topThree[1].teamName}}</div>
					<p class="data">{{topThree[1].averageNetworth}}<br />{{topThree[1].profit}}%</p>
				</div>
			</flexbox-item>
			<flexbox-item>
				<div class="item-box g-boxshadow one">
					<div class="name">{{topThree[0].teamName}}</div>
					<p class="data">{{topThree[0].averageNetworth}}<br />{{topThree[0].profit}}%</p>
				</div>
			</flexbox-item>
			<flexbox-item>
				<div class="item-box g-boxshadow three">
					<div class="name"><span v-if="topThree[2]">{{topThree[2].teamName}}</span><span v-else>暂无</span></div>
					<p class="data"><span v-if="topThree[2]">{{topThree[2].averageNetworth}}</span><span v-else>暂无</span><br /><span v-if="topThree[2]">{{topThree[2].profit}}</span><span v-else>暂无</span></p>
				</div>
			</flexbox-item>
		</flexbox>
	</div>
</template>

<script>
	import { Flexbox, FlexboxItem} from 'vux'
	export default {
		props: ['topThree'],
		
		created(){
			
		},
		methods: {
			//调整前三名位置
			order_M(ranking){
				switch(ranking){
					case 1: return 2
					case 2: return 1
					case 3: return 3
				}
			}
		},
		components: {
			Flexbox,
			FlexboxItem
		},
	}
</script>

<style lang="less" scoped>
	.leftflex{
		margin-left: 0 !important;
		margin-right: 8px !important;
	}
	.box{
		background-color: #fff;
		padding: 0 10px;
	}
	.item-box{
		padding-top: 55px;
		background-position: center top;
		background-repeat: no-repeat;
		background-size: 40px 55px;
		font-size: 12px;
		color: #333;
		text-align: center;
		border-radius: 5px;
		height: 117px;
		box-sizing: border-box;
	}
	.item-box.one{
		height: 127px;
		background-image: url(../assets/images/i_badge1.png);
	}
	.item-box.two{
		background-image: url(../assets/images/i_badge2.png);
	}
	.item-box.three{
		background-image: url(../assets/images/i_badge3.png);
	}
	.item-box.one .name{
		font-size: 16px;
	}
	.item-box.one .data{
		font-size: 14px;
	}
	.item-box .name{
		color: #1E50AE;
		font-size: 14px;
		font-weight: 500;
	}
	.item-box .data{
		line-height: 1.3;
		padding: 5px;
	}
</style>