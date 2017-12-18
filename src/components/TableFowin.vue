<template>
	<div style="padding: 0 15px 15px;">
		<div class="table-scroll g-boxshadow">
			<div class="thead item vux-1px-b" :class="{'thead-white': all}">
				<div>排名</div>
				<div>姓名</div>
				<div>净值</div>
				<div>收益率</div>
			</div>
			<div class="tbody" :class="{'h-auto': all}">
				<div v-for="item in 10" :key="item" class="item vux-1px-b">
					<div>
						<span class="badge" v-if="topThreeFn(item)" :class="topThreeFn(item)"></span>
						<span v-else>{{item}}.</span>
					</div>
					<div>王晓涵</div>
					<div>146927.9</div>
					<div>56.39%</div>
				</div>
			</div>
		</div>
		<div class="f-color" style="font-size: 12px;margin-top: 8px;">榜单每日更新</div>
	</div>
</template>

<script>
	export default {
		props: ['all'],
		methods: {
			topThreeFn(index){
				switch(index){
					case 1: return 'one'
					case 2: return 'two'
					case 3: return 'three'
				}
				return false
			}
		},
		computed: {
			topThreeP(){
				
			}
		}
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
		height: 279px;
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