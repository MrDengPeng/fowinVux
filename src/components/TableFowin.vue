<template>
	<div style="padding: 0 15px 15px;">
		<div class="table-scroll g-boxshadow">
			<div class="thead item vux-1px-b" :class="{'thead-white': all}">
				<div>排名</div>
				<div>姓名</div>
				<div>净值</div>
				<div>收益率</div>
			</div>
			<div class="tbody" :class="{'h-auto': heightauto}">
				<div v-for="(item,index) in rankList" class="item vux-1px-b">
					<div>
						<span class="badge" :class="{one: index==0&&page==1,two: index==1&&page==1,three: index==2&&page==1}">{{topThree_M(index)}}</span>
					</div>
					<div>{{item.teamName}}</div>
					<div>{{item.averageNetworth}}</div>
					<div>{{item.profit}}%</div>
				</div>
			</div>
		</div>
		<div class="f-color" style="font-size: 12px;margin-top: 8px;">榜单每日更新</div>
	</div>
</template>

<script>
	export default {
		props: ['all', 'rankList', 'heightauto', 'page'],
		methods: {
			topThree_M(index){
				index = index + 1;
				let text = index + '.'				
				if(this.page == 1){
					if(index < 4){
						return ''	
					}										
				}else{
					text = (this.page-1) + text;
				}
				return text
			}
		},
	}
</script>
<style lang="less" scoped>
	.badge{
		display: inline-block;
		width: 28px;
		height: 28px;
		background-position: center;
		background-size: 100% 100%;
		background-repeat: no-repeat;
		line-height: 28px;
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
	.h-auto{
		height: auto !important;
	}
	.table-scroll .thead.vux-1px-b:after{
		border-color: #1E50AE !important;
	}
	.table-scroll .thead.item.thead-white{
		background-color: #fff;
		color: #1e50ae;
	}
	.table-scroll{
		position: relative;
		z-index: 1;
		border-radius: 5px;
		overflow: hidden;
	}
	.table-scroll .thead.item{
		background-color: #1e50ae;
		color: #fff;
		font-size: 12px;
		font-weight: 500;
	}
	.table-scroll .tbody{
		background-color: #fff;
		/*height: 279px;*/
		height: 400px;
		overflow: hidden;
	}
	.table-scroll .item{
		display: flex;
		font-size: 15px;
		text-align: center;
		color: #333;
		height: 40px;
		line-height: 40px;
	}
	.table-scroll .item.vux-1px-b:after{
		border-color: #cfe0ff;
	}
	.table-scroll .item > div{
		flex: 2;
		white-space: nowrap;
	}
	.table-scroll .item > div:first-child{
		flex: 1;
		display: flex;
		justify-content: center;
		align-items: center;
	}
</style>