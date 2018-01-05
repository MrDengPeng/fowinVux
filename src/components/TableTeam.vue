<template>
	<div>
		<div class="table-group g-boxshadow">
			<div class="item head">
				<div>排名</div>
				<div>小组</div>
				<div>净值</div>
				<div>收益率</div>
				<div></div>
			</div>
			<div class="box" v-for="(item,index) in groupList">
				<div class="item main vux-1px-t" @click="teamMembers_M(index)">
					<div>
						<span class="badge" :class="{one: index==0,two: index==1,three: index==2}">{{topThree_M(index)}}</span>
					</div>
					<div>{{item.name}}</div>
					<div>{{item.networth}}</div>
					<div>{{item.profit}}%</div>
					<div><x-icon type="ios-arrow-down" :ref="'arrow'+index" class="arrow-tran" size="22" style="fill: #6e6e6e;"></x-icon></div>
				</div>
				<div class="sub-box" :class="{pb10: item.rankListDtos.length}" :ref="'sub'+index" style="display: none;">
					<div class="item sub" v-for="subItem in item.rankListDtos">
						<div></div>
						<div>{{subItem.realName}}</div>
						<div>{{subItem.networth}}</div>
						<div>{{subItem.profit}}%</div>
						<div></div>
					</div>
				</div>						
			</div>
		</div>
		<div class="update">榜单每日更新</div>
	</div>
</template>

<script>
	export default {
		props: ['groupList'],
		methods: {
			//显示前三名徽章
			topThree_M(index){
				index = index + 1;
				return index > 3 ? index+'.' : ''
			},
			//查看小组成员
			teamMembers_M(index){
				var ele = this.$refs['sub'+index][0];			
				var arrow = this.$refs['arrow'+index][0];
				var display = ele.style.display;	
				if(display == 'none'){
					arrow.style.transform = 'rotate3d(0, 0, 1, -180deg)';
					ele.style.display = 'block';
				}else{
					arrow.style.transform = 'rotate3d(0, 0, 1, 0deg)';
					ele.style.display = 'none';
				}
			}
		}
	}
</script>

<style lang="less" scoped>
	.arrow-tran{
		transition: all .3s;
		transform: rotate3d(0, 0, 1, 0deg)
	}
	.update{
		color: #1E50AE;
		font-size: 12px;
		padding: 10px 15px;
	}
	.arrow-rotate{
		transform: rotate3d(0, 0, 1, -180deg)
	}
	.badge{
		display: inline-block;
		width: 28px;
		height: 28px;
		background-position: center;
		background-size: 100% 100%;
		background-repeat: no-repeat;
		vertical-align: middle;
	}
	.one{
		background-image: url(../assets/images/i_small_badge1.png);
	}
	.two{
		background-image: url(../assets/images/i_small_badge2.png);
	}
	.three{
		background-image: url(../assets/images/i_small_badge3.png);
	}
	.table-group{
		position: relative;
		background-color: #fff;
		border-radius: 5px;
		overflow: hidden;
		z-index: 1;
	}
	.table-group .head{
		height: 40px;
		font-size: 12px;
		font-weight: 500;
		color: #1E50AE;
		text-align: center;
		
	}
	.table-group .sub{
		color: #333;
		font-size: 12px;
		height: 30px;
		align-items: stretch !important;
		line-height: 30px;
	}
	.table-group .sub > div:nth-child(2), .table-group .sub > div:nth-child(3), .table-group .sub > div:nth-child(4){
		background-color: #F6F6F6;
	}
	.table-group .main{
		color: #333;
		font-size: 15px;
		height: 50px;
	}
	.table-group .main > div:last-child{
		display: flex;
		align-content: center;
		justify-content: center;
	}
	.table-group .item{
		display: flex;
		justify-content: center;
		align-items: center;
		text-align: center;
	}
	.pb10{
		padding-bottom: 10px;
	}
	.table-group .sub-box .item:nth-child(even) > div:nth-child(2), .table-group .sub-box .item:nth-child(even) > div:nth-child(3), .table-group .sub-box .item:nth-child(even) > div:nth-child(4){
		background-color: #eaeaea;
	}
	.table-group .item > div{
		flex: 2;
	}
	.table-group .item > div:first-child{
		flex: 1;
	}
	.table-group .item > div:last-child{
		flex: .8;
	}
</style>