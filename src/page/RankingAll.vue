<template>
	<div class="wrap">
		<div class="search-mask" v-show="searchMask" @touchstart="$refs.search.setBlur()" :style="searchMaskTop"></div>
		<div class="bg" :style="bgHeight"></div>
		<div class="warpper" v-if="$route.query.isAlways=='Y'" style="z-index: 2;">
			<tab class="tab-box" v-model="curIndex" @on-item-click="onIndexChange_M" bar-active-color="#fff" active-color="#fff" defaultColor="#a9b5d9" custom-bar-width="40px">
				<tab-item selected>当前</tab-item>
				<tab-item>历史</tab-item>
			</tab>
			<div class="wrap-box">
				<swiper v-model="curIndex" :show-dots="false" @on-index-change="onIndexChange_M" style="height: 100%;" height="100%">
					<swiper-item>
						<div class="view-box">
							<search class="search-reset search-reset-rank" ref="search" :auto-fixed="false" v-model="keyword" @on-submit="onsubmit" @on-focus="searchMask=true" @on-blur="searchMask=false" @on-cancel="oncancel_M"></search>
							<table-team v-if="rankType=='group'" :groupList="groupList" />
							<table-fowin v-else all="1" :rankList="userList" />
							<div class="page-box">
								<div>上一页</div>
								<div>1/13</div>
								<div>下一页</div>
							</div>
						</div>
					</swiper-item>
					<swiper-item>
						<div v-if="rankType=='group'" class="history-box view-box">
							<div class="history-item" v-for="item in historyList">
								<div class="head vux-1px-b">
									<span>上一{{weekSeason_C}}</span>
									<span>{{item.startTime | splitdate(10)}}至{{item.endTime | splitdate(10)}}</span>
								</div>
								<top-three :rankList="item.matchRankListDtos" style="padding-bottom: 15px; padding-top: 15px;" />
							</div>
						</div>
						<div class="history-me view-box" v-else>
							<div class="history-me-item" v-for="item in historyList">
								<div class="head vux-1px-b">
									<span>上一{{weekSeason_C}}</span>
									<span>{{item.startTime | splitdate(10)}}至{{item.endTime | splitdate(10)}}</span>
								</div>
								<div class="content">
									<div class="item">
										<div>{{item.myRanking}}</div>
										<p>我的排名</p>
									</div>
									<div class="item">
										<div>{{item.myNetworth}}</div>
										<p>净值</p>
									</div>
									<div class="item">
										<div>{{item.myProfit}}%</div>
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
		</div>
		<div v-else style="height: 100%; overflow: auto;position: relative;z-index: 2;">
			<div class="ranking-box">
				<!--<div class="search-box" style="padding-bottom: 20px;">
					<icon type="search" class="i-search"></icon>
					<form action="" @submit.prevent="searchTap">
		                <input type="search" name="search" v-model="keyword" autocomplete="off" placeholder="请输入姓名查找">
		            </form>
				</div>-->
				<search class="search-reset search-reset-rank" ref="search" :auto-fixed="false" v-model="keyword" @on-submit="onsubmit" @on-focus="searchMask=true" @on-blur="searchMask=false" @on-cancel="oncancel_M"></search>
				<table-team v-if="rankType=='group'" :groupList="groupList" />
				<table-fowin v-else all="1" :rankList="userList" :page="params.page" />
				
			</div>
			
			<!--<table-fowin all="1" />-->
			<div class="page-box">
				<div @click.stop="pageData_M('pre')">上一页</div>
				<div>{{params.page}}/{{pageNum}}</div>
				<div @click.stop="pageData_M('next')">下一页</div>
			</div>
		</div>
	</div>
</template>

<script>
	import { Icon, Tab, TabItem, Swiper, SwiperItem, Search } from 'vux'
	import TableFowin from '@/components/TableFowin'
	import TopThree from '@/components/TopThree'
	import TableTeam from '@/components/TableTeam'
	
	export default {
		data(){
			return {
				curIndex: 0,
				
				userList: [],//当前个人排名
				groupList: [],//当前小组排名
				historyList: [],//历史排名
				keyword: '',//搜索框value
				params: {realName: '', rankId: this.$route.query.rankId, page: 1, rows: 10},//请求参数(当前)
				paramsHistory: {matchId: this.$route.query.matchId, type: 'T', rankType: 'Season'},//请求参数(历史)
				initHistory: false,//是否已初始化历史数据
				pageNum: 0,//分页数
				searchMask: false,//搜索遮罩
				searchMaskTop: {
					top: this.$route.query.isAlways == 'Y' ? '99px' : '55px'
				},//搜索遮罩top
				bgHeight: {
					height: this.$route.query.isAlways == 'Y' ? '124px' : '80px'
				},//背景height
			}
		},
		props: ['rankType'],//排名类型 user个人 group小组
		created(){
			this.$store.commit('TITLE', {title: '全部排名'})
			this.getData();
		},
		computed: {
			weekSeason_C(){
				return this.$route.query.historyType == 'week' ? '周' : '季'
			}
		},
		methods: {
			//请求当前排名数据
			getData(){
				this.$post('/api/app/match/findRankInfo.v1', this.params).then(
					res => {
						let rows = res.rows
						let list = []
						if(this.rankType == 'user'){
							for(let i = 0; i < rows.length; i++){
								let obj = {}
								obj.teamName = rows[i].name;
								obj.averageNetworth = rows[i].networth;
								obj.profit = rows[i].profit;
								list.push(obj)
							}
							this.userList = list;
						}else{
							this.groupList = rows;
						}
						if(res.total > 0){
							this.pageNum = Math.ceil(res.total/10);
						}else{
							this.pageNum = 1;
						}
						
					}
				).catch(
					e => {
						console.log(e);
					}
				)
			},
			//翻页
			pageData_M(direction){
				if((direction == 'pre' && this.params.page == 1) || (direction == 'next' && this.params.page == this.pageNum)){
					return
				}else{
					if(direction == 'pre'){
						this.params.page--;											
					}else{
						this.params.page++;
					}
					this.getData();	
				}
				
			},
			//搜索
			onsubmit(e){
				if(this.keyword.trim() != ''){
					this.$refs.search.setBlur();
					this.params.realName = this.keyword;
					this.params.page = 1;
					this.getData();
				}else{
					this.$vux.toast.text('请输入关键字查询', 'top')
				}
				
			},
			//取消搜索reset params
			oncancel_M(){
				if(this.params.realName != ''){
					this.params.realName = '';
					this.params.page = 1;
					this.getData();
				}
				this.keyword = '';				
			},
			//监测tab index 来初始化历史数据
			onIndexChange_M(index){
				if(index == 1 && !this.initHistory){
					this.getHistoryData();
					this.initHistory = true;
				}
			},
			//请求历史排名数据
			getHistoryData(){
				this.$post('/api/app/match/findHistoryRank.v1', this.paramsHistory, {loading: false}).then(
					res => {
						this.historyList = res
					}
				).catch(
					e => {
						console.log(e);
					}
				)
			},
		},
		components: {
			Search,
			Icon,
			Tab,
			TabItem,
			Swiper,
			SwiperItem,
			TableFowin,
			TopThree,
			TableTeam
		}
	}
</script>
<style lang="less">
	.tab-box .vux-tab-ink-bar{
		bottom: 5px;
	}
</style>
<style lang="less" scoped>
	.search-mask-top99{
		top: 99px;
	}
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
		height: 28px;	
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
		height: 80px;
		background-color: #1E50AE;
		z-index: 1;
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