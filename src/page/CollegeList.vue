<template>
	<div>
		<tab active-color="#1e50ae" defaultColor="#333" bar-active-color="#1e50ae" class="college" style="position: absolute;top: 0;left: 0;width: 100%;z-index: 100;">
			<tab-item v-for="(item, index) in tabList" :selected="indexCur == index" :key="index" @on-item-click="indexCur = index">{{item}}</tab-item>
		</tab>
		<swiper v-model="indexCur" :show-dots="false" @on-index-change="onIndexChange" height="100%" style="padding-top: 44px;box-sizing: border-box; height: 100%;">
			<swiper-item>
				<view-box body-padding-bottom="0" ref="viewBox1">
					<div>
						<event-template v-for="item in tabData.list1" :data="item" type="1" :key="item.id" @click.native="toDetail_M(item.id, 1)">
							<div class="top-three" slot-scope="{firstName, secondName, thirdName}" slot="topThree">
					    		<div class="item"><div v-if="firstName">{{firstName}}</div><div v-else>暂无</div></div>
					    		<div class="item"><div v-if="secondName">{{secondName}}</div><div v-else>暂无</div></div>
					    		<div class="item"><div v-if="thirdName">{{thirdName}}</div><div v-else>暂无</div></div>
					    	</div>							
						</event-template>
						<div style="padding: 1px;">
							<load-more :show-loading="moreObj.more1" :tip="moreObj.more1 ? '正在加载' : '我是有底线的'" background-color="#f6f6f6"></load-more>
						</div>
					</div>
				</view-box>
				<div class="g-empty" v-if="emptyObj.empty1"><div class="text">休战期,好好学习哟</div></div>
			</swiper-item>
			<swiper-item>
				<view-box body-padding-bottom="0" ref="viewBox2">
					<div>
						<event-template v-for="item in tabData.list2" :data="item" type="2" :key="item.id" @click.native="toDetail_M(item.id, 2)">
							<div slot="enrol">
								<div class="btn-box">
						    		<a class="btn" @click.stop="enroll_M(item.id)">立即报名</a>
						    	</div>
						    	<p class="cutoff"><span class="icon-time"></span>报名截止：{{item.enrollTime | splitdate(10)}}</p>
							</div>
						</event-template>
						<div style="padding: 1px;">
							<load-more :show-loading="moreObj.more2" :tip="moreObj.more2 ? '正在加载' : '我是有底线的'" background-color="#f6f6f6"></load-more>
						</div>
					</div>
				</view-box>	
				<div class="g-empty" v-if="emptyObj.empty2"><div class="text">新赛筹备中,敬请期待哟</div></div>
			</swiper-item>
			<swiper-item>
				<view-box body-padding-bottom="0" ref="viewBox3">
					<div>
						<event-template v-for="item in tabData.list3" :data="item" type="3" :key="item.id" @click.native="toDetail_M(item.id, 3)">
					    	<div class="top-three" slot-scope="{firstName, secondName, thirdName}" slot="topThree">
					    		<div class="item"><div v-if="firstName">{{firstName}}</div><div v-else>暂无</div></div>
					    		<div class="item"><div v-if="secondName">{{secondName}}</div><div v-else>暂无</div></div>
					    		<div class="item"><div v-if="thirdName">{{thirdName}}</div><div v-else>暂无</div></div>
					    	</div>
					    </event-template>
						<div style="padding: 1px;">
							<load-more :show-loading="moreObj.more3" :tip="moreObj.more3 ? '正在加载' : '我是有底线的'" background-color="#f6f6f6"></load-more>
						</div>
					</div>
				</view-box>
				<div class="g-empty" v-if="emptyObj.empty3"><div class="text">暂无相关数据</div></div>
			</swiper-item>
			<swiper-item>
				<view-box body-padding-bottom="0" ref="viewBox4">
					<div>
						<event-template v-for="item in tabData.list4" :data="item" type="4" :key="item.id" @toGroupMe="toGroupMe_M" @click.native="toDetail_M(item.id, 4)" />
						<div style="padding: 1px;">
							<load-more :show-loading="moreObj.more4" :tip="moreObj.more4 ? '正在加载' : '我是有底线的'" background-color="#f6f6f6"></load-more>
						</div>
					</div>
				</view-box>
				<div class="g-empty" v-if="emptyObj.empty4"><div class="text">观战不如参赛,快去报名吧</div></div>
			</swiper-item>
		</swiper>
		
	</div>
</template>

<script>
	import { Tab, TabItem, Swiper, SwiperItem, ViewBox, LoadMore, querystring } from 'vux'
	import { mapMutations } from 'vuex'
	import EventTemplate from '@/components/EventTemplate'
	
	export default {
		name: 'CollegeList',
		data () {
			return {
				tabList: ['当前赛事', '我要参赛', '历史赛事', '我的竞赛'],
				indexCur: 0,//当前tab index
				params: [{type: 1, page: 1, rows: 10}, {type: 2, page: 1, rows: 10}, {type: 3, page: 1, rows: 10}, {type: 4, page: 1, rows: 10}],//请求参数
				tabData: {list1: [], list2: [], list3: [], list4: []},
				listData1: [],//tab1 数据
				listData2: [],//tab2 数据
				listData3: [],//tab3 数据
				listData4: [],//tab4 数据
				moreObj: {more1: true, more2: true, more3: true, more4: true},//是否有更多数据
				emptyObj: {empty1: false, empty2: false, empty3: false, empty4: false},//初始化时是否有数据
				loadState: [false, false, false, false], //tab各项是否已初始数据
			}
		},
		activated(){
			this.loadState = [false, false, false, false];
			this['tabBox'+(this.indexCur+1)]();
		},
		deactivated(){
			
		},
		created(){
			let index = location.href.indexOf('?')
			if(index > 0){
				let urlParams = querystring.parse(location.href.substring(index+1))
				if(urlParams.tabIndex){
					this.indexCur = parseInt(urlParams.tabIndex)
				}
			}	
		},
		mounted(){
			//切换title
			this.TITLE({title: '当前赛事'})
			//初始化上拉加载插件
			var viewBox1 = this.$refs.viewBox1;
			var viewBox2 = this.$refs.viewBox2;
			var viewBox3 = this.$refs.viewBox3;
			var viewBox4 = this.$refs.viewBox4;
			this.scrollInstance1 = new this.ScrollPlugin(viewBox1, viewBox1.getScrollBody(), viewBox1.getScrollBody().children[0], this.tabBox1);//true自动加载一次数据
			this.scrollInstance2 = new this.ScrollPlugin(viewBox2, viewBox2.getScrollBody(), viewBox2.getScrollBody().children[0], this.tabBox2);
			this.scrollInstance3 = new this.ScrollPlugin(viewBox3, viewBox3.getScrollBody(), viewBox3.getScrollBody().children[0], this.tabBox3);
			this.scrollInstance4 = new this.ScrollPlugin(viewBox4, viewBox4.getScrollBody(), viewBox4.getScrollBody().children[0], this.tabBox4);
		},
		methods: {
			...mapMutations(['TITLE']),//切换title
			//请求数据
			getData(params,loading){
				
				this.$post('/api/app/match/findForPage.v1', params, {loading: loading}).then(
					res => {
						let rows = res.rows
						let index = params.type
						if(params.page == 1 && (rows == null || rows.length == 0)){
							this.emptyObj['empty'+index] = true
						}
						this.loadState[index-1] = true;
						if(rows){
							if(params.page == 1){
								this.tabData['list'+index] = this.tabData['list'+index].splice(0, 0).concat(rows);								
							}else{
								this.tabData['list'+index] = this.tabData['list'+index].concat(rows);
							}
							if(rows.length < params.rows){
								this.moreObj['more'+index] = false;
							}else{
								this.moreObj['more'+index] = true;
								params.page++
								this['scrollInstance' + index].addEvent();
							}
						}
												
					}
				).catch(
					e => {
						console.log(e);
					}
				)
			},
			//当前赛事请求
			tabBox1(loading){
				this.getData(this.params[0], loading || false)
			},
			//我要报名请求
			tabBox2(loading){
				this.getData(this.params[1], loading || false)
			},
			//历史赛事请求
			tabBox3(loading){
				this.getData(this.params[2], loading || false)
			},
			//我的赛事请求
			tabBox4(loading){
				this.getData(this.params[3], loading || false)
			},
			//监测index变化来初始化对应的tab数据
			onIndexChange (index) {
				//切换title
				this.TITLE({title: this.tabList[index]});
				this.indexCur = index;
				if(!this.loadState[index]){
					this['tabBox'+(index+1)]();
				}
			},
			//报名
			enroll_M(id){
				this.$post('/api/app/match/enrollMatch.v1', {matchId: id}).then(
					res => {
						localStorage.setItem('statu',res.memberState);
						switch(res.memberState){
							case 'N': this.$router.push({path: '/survey'});break;
							case 'W': this.$router.push({path: '/account/sign'});break;
							case 'C': this.$router.push({path: '/account/upload'});break;
							case 'E': this.$router.push({path: '/account/open'});break;
							default: 
								//刷新我要参赛和刷新我的竞赛
								this.emptyObj.empty2 = this.emptyObj.empty4 = false;
								this.params[1].page = this.params[3].page = 1;
								this.moreObj.more2 = this.moreObj.more4 = true;
								this.loadState[3] = false;
								this.$vux.confirm.show({
									confirmText: '去看看',
									content: '报名成功,是否进入我的竞赛？',
									onConfirm: () => {
										//刷新我要参赛
										this.loadState[1] = false;
										this.indexCur = 3;									
									},
									onCancel: () => {
										this.tabBox2();
									}
								})
								break;
						}
													
					}
				).catch(
					e => {
						console.log(e);
					}
				)
			},
			//进入详情
			toDetail_M(id, type){
				this.$router.push({name:'CollegeDetail', params: {id: id}, query: {type: type}})
			},
			//进入我的小组
			toGroupMe_M(matchId, teamId){
				this.$router.push({name: 'MyTeam', params:{matchId: matchId, teamId: teamId}})				
			},
		},
		components: {
			Tab,
			TabItem,
			Swiper,
			SwiperItem,
			ViewBox,
			LoadMore,
			EventTemplate
		},
	}
</script>

<style>
	.g-empty{
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: 100;
		background-color: #F6F6F6;
	}
	.g-empty .text{
		position: absolute;
		top: 50%;
		left: 0;
		transform: translateY(-50%);
		font-size: 30px;
		color: #999;
		width: 100%;
		line-height: 1.3;
		text-align: center;
	}
	.g-empty .text span{
		font-size: 24px;
	}
	.college .vux-tab-item{
		font-weight: 500;
	}
	
</style>