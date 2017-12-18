<template>
	<div class="wrap">
		<div class="bg" style="height: 124px;"></div>
		<tab v-if="statuCur" class="tab-box" v-model="index" bar-active-color="#fff" active-color="#fff" defaultColor="#a9b5d9" custom-bar-width="40px">
			<tab-item selected>当前</tab-item>
			<tab-item>历史</tab-item>
		</tab>
		<div v-if="statuCur" class="wrap-box">
			<swiper v-model="index" :show-dots="false" style="height: 100%;" height="100%">
				<swiper-item>
					<div class="view-box">
						<div class="search-box" style="padding-top: 1px;">
							<icon type="search" class="i-search" style="top: 12px"></icon>
							<form action="">
				                <input type="search" autocomplete="off" placeholder="请输入姓名查找">
				            </form>
						</div>
						<table-fowin all="1" />
						<div class="page-box">
							<div>上一页</div>
							<div>1/13</div>
							<div>下一页</div>
						</div>
					</div>
				</swiper-item>
				<swiper-item>
					<div v-if="!me" class="history-box view-box">
						<div class="history-item" v-for="item in 10">
							<div class="head vux-1px-b">
								<span>上一季度</span>
								<span>2018-1-1至2018-3-31</span>
							</div>
							<top-three style="padding-bottom: 15px; padding-top: 15px;" />
						</div>
					</div>
					<div class="history-me view-box">
						<div class="history-me-item" v-for="item in 10">
							<div class="head vux-1px-b">
								<span>上一周</span>
								<span>2018-1-1至2018-1-5</span>
							</div>
							<div class="content">
								<div class="item">
									<div>20</div>
									<p>我的排名</p>
								</div>
								<div class="item">
									<div>181477.67</div>
									<p>净值</p>
								</div>
								<div class="item">
									<div>10%</div>
									<p>收益率</p>
								</div>
							</div>
							<span class="semicircle"></span>
							<span class="semicircle"></span>
						</div>
					</div>
				</swiper-item>
			</swiper>
		</div>
		<div v-else style="height: 100%; background-color: #f6f6f6; overflow: auto;">
			<div class="ranking-box">
				<div class="search-box" style="padding-bottom: 20px;">
					<icon type="search" class="i-search"></icon>
					<form action="">
		                <input type="search" autocomplete="off" placeholder="请输入姓名查找">
		            </form>
				</div>
				<div class="table-group g-boxshadow">
					<div class="item head">
						<div>排名</div>
						<div>小组</div>
						<div>净值</div>
						<div>收益率</div>
						<div></div>
					</div>
					<div class="box" v-for="item in 6">
						<div class="item main vux-1px-t" @click="subTap(item)">
							<div>
								<span class="badge" v-if="topThreeFn(item)" :class="topThreeFn(item)"></span>
								<span v-else>{{item}}.</span>
							</div>
							<div>小组</div>
							<div>146927.9</div>
							<div>146927.9</div>
							<div><x-icon type="ios-arrow-down" :ref="'arrow'+item" size="22" style="fill: #6e6e6e;"></x-icon></div>
						</div>
						<div class="sub-box" :ref="'sub'+item" v-show="bool">
							<div class="item sub" v-for="item in 3">
								<div></div>
								<div>王晓涵</div>
								<div>146927.9</div>
								<div>56.39%</div>
								<div></div>
							</div>
						</div>
						
					</div>
				</div>
				<div class="update">榜单每日更新</div>
			</div>
			
			<!--<table-fowin all="1" />-->
			<div class="page-box">
				<div>上一页</div>
				<div>1/13</div>
				<div>下一页</div>
			</div>
		</div>
	</div>
</template>

<script>
	import { Icon, Tab, TabItem, Swiper, SwiperItem } from 'vux'
	import TableFowin from '@/components/TableFowin'
	import TopThree from '@/components/TopThree'
	export default {
		data(){
			return {
				index: 0,
				statuCur: true,
				bool: false,
				me: true
			}
		},
		components: {
			Icon,
			Tab,
			TabItem,
			Swiper,
			SwiperItem,
			TableFowin,
			TopThree
		},
		methods: {
			topThreeFn(index){
				switch(index){
					case 1: return 'one'
					case 2: return 'two'
					case 3: return 'three'
				}
				return false
			},
			subTap(index){
				var display = this.$refs['sub'+index][0].style.display;
				if(display == 'none'){
					this.$refs['arrow'+index][0].style.transition = 'all .3s';
					this.$refs['arrow'+index][0].style.transform = 'rotate3d(0, 0, 1, -180deg)';
					this.$refs['sub'+index][0].style.display = 'block';
				}else{
					this.$refs['arrow'+index][0].style.transition = 'all .3s';
					this.$refs['arrow'+index][0].style.transform = 'rotate3d(0, 0, 1, 0deg)';
					this.$refs['sub'+index][0].style.display = 'none';
				}
			},
			
		},
		computed: {
			subTwo(bool){
				return bool
			}
		}
	}
</script>
<style lang="less">
	.tab-box .vux-tab-ink-bar{
		bottom: 5px;
	}
</style>
<style lang="less" scoped>
	/*我的排名 start*/
	.history-me{
		background-color: #f6f6f6;
		padding: 15px;
		box-sizing: border-box;
	}
	.history-me-item{
		position: relative;
		margin-bottom: 10px;
		background-color: #fff;
		border-radius: 5px;
		overflow: hidden;
	}
	.history-me-item .head{
		display: flex;
		padding: 0 15px;
		justify-content: space-between;
		align-items: center;
		font-size: 12px;
		height: 40px;
	}
	.history-me-item .head span:nth-child(1){
		color: #333;
		font-size: 15px;
		font-weight: 500;
	}
	.history-me-item .head.vux-1px-b:after{
		border-bottom: 1px dashed #CFE0FF;
	}
	.history-me-item .content{
		display: flex;
	}
	.history-me-item .item{
		flex: 1;
		font-size: 12px;
		text-align: center;
		padding: 15px 0;
	}
	.history-me-item .item div{
		font-size: 18px;
		color: #1E50AE;
		font-weight: 500;
		margin-bottom: 5px;		
	}
	.history-me-item .semicircle{
		position: absolute;
		top: 50px;
		background-color: #F6F6F6;
		height: 20px;
		width: 10px;
	}
	.history-me-item .semicircle:nth-of-type(1){
		left: 0;
		border-top-right-radius: 10px;
		border-bottom-right-radius: 10px;
	}
	.history-me-item .semicircle:nth-of-type(2){
		right: 0;
		border-top-left-radius: 10px;
		border-bottom-left-radius: 10px;
	}
	/*我的排名 end*/
	.update{
		color: #1E50AE;
		font-size: 12px;
		padding: 10px 15px;
	}
	.arrow-rotate{
		transform: rotate(180deg);
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
		margin-top: -5px;
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
	.table-group .sub-box{
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
	.main.vux-1px-t:before{
		border-color: #cfe0ff;
	}
	.view-box{
		height: 100%;
		-webkit-overflow-scrolling: touch;
		overflow: auto;
	}
	.history-box{
		background-color: #f6f6f6;
	}
	.history-item{
		background-color: #fff;
		margin-bottom: 10px;
	}
	.history-item .head{
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 45px;
		padding: 0 15px;
		color: #666;
		font-size: 15px;		
	}
	.history-item .head span:nth-child(1){
		color: #333;
		font-size: 18px;
		font-weight: 500;
	}
	.history-item .head.vux-1px-b:after{
		left: 15px;
	}
	.wrap-box{
		padding-top: 44px;
		height: 100%;
		box-sizing: border-box;
	}
	.tab-box{
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		background-color: #1e50ae;
		justify-content: center;
		z-index: 99;
		
	}
	.tab-box .vux-tab-item{
		background: #1E50AE;
		width: 110px;
		font-size: 15px;
		
	}
	.tab-box .vux-tab-selected{
		font-weight: 500;
	}
	
	.wrap{
		background-color: #fff;
	}
	
	.bg{
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 90px;
		background-color: #1E50AE;
		z-index: 0;
	}
	.search-box{
		background-color: #1E50AE;
		position: relative;
		z-index: 1;
		padding: 15px;
	}
	.search-box input{
		display: block;
		width: 100%;
		background-color: #fff;
		border: none;
		padding: 8px 40px;
		line-height: 24px;
		font-size: 15px;
		border-radius: 0;
		-webkit-appearance: none;
	}
	.i-search{
		position: absolute;
		top: 24px;
	    left: 21px;
		color: #999;
		font-size: 20px;
	}
	.page-box{
		line-height: 30px;
		color: #1E50AE;
		font-size: 15px;
		text-align: center;
		padding-bottom: 20px;
	}
	.page-box > div{
		display: inline-block;
		padding: 0 5px;
	}
	.page-box > div:nth-child(2){
		margin: 0 10px;
		font-weight: 500;
	}
</style>