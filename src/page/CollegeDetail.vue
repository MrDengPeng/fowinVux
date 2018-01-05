<template>
	<div>
		<div class="g-round-btn" v-if="sharebtn_C" v-html="sharebtn_C" @click="enrollShare_M"></div>
		
		<div class="ban-chunk">
			<div class="ban">
				<img :src="data.coverUrl" class="img-center"/>
				<span class="label" :class="{active: data.matchState!='GameOver'}">{{matchState_C}}</span>
				<div class="num">参赛人数：{{data.joinNum}}人</div>
			</div>
			<div class="tit">{{data.matchName}}</div>
			<p class="time">赛事时间：{{data.startTime | splitdate(10)}}<span v-if="data.endTime"> ~ {{data.endTime | splitdate(10)}}</span></p>
			<p class="time" v-if="data.matchState=='Enrolling'"><span class="icon-time"></span>报名截止日期：{{data.enrollTime | splitdate(10)}}</p>
		</div>
		<div class="enrol-chunk margin-bg" v-if="enrollProg_C">
			<div class="top-head vux-1px-b">
				<div class="left"><span class="icon i-progress"></span>报名进度</div>
				<div class="right" v-if="data.myEnrollState=='NeedTeam'"><span class="more" @click="toCreateTeam_M(data.id)">立即建组</span></div>					
			</div>
			<div class="content">
				<!--报名进度-->
				<step-box :isTeam="data.isTeam" :myEnrollState="data.myEnrollState" :matchState="data.matchState" />
				<p class="tip" v-if="data.isTeam=='Y'">提示：本次比赛中允许个人参赛，“组建小组”不是必要步骤。</p>
			</div>
		</div>
		
		<div class="margin-bg" v-if="data.myEnrollState=='EnrollSuccess' && data.isTeam=='N'">
			<div class="top-head vux-1px-b">
				<div class="left"><span class="icon i-me"></span>我的排名</div>
				<div class="right"></div>					
			</div>			
			<user-ranking :data="{myNetworth:data.myNetworth,myProfit:data.myProfit,myRanking:data.myRanking,myAvatar:data.myAvatar}" :isTeam="data.isTeam" style="margin-top: 15px;padding-bottom: 15px;" />
		</div>
		
		<div class="margin-bg" v-if="data.matchState=='InGame'&&data.weekRankList&&data.weekRankList.length">
			<div class="top-head vux-1px-b">
				<div class="left"><span class="icon i-cur"></span>周赛榜单</div>
				<div class="right"><span class="more" @click="toRanking_M(data.weekRankId,'week')">查看更多</span></div>					
			</div>
			
			<user-ranking v-if="data.isTeam=='Y'" :data="{myNetworth:data.myNetworth,myProfit:data.myProfit,myRanking:data.myRanking,myAvatar:data.myAvatar}" :isTeam="data.isTeam" style="margin-top: 15px;" />
			
			<top-three :topThree="data.weekRankList" style="padding-top: 15px;" />
			
			<table-fowin class="parent" :rankList="data.weekRankList" :isTeam="data.isTeam" :page="1" style="margin-top: 15px;" />
		</div>
		
		<div class="margin-bg" v-if="data.isAlways=='Y'&&data.seasonRankList&&data.seasonRankList.length">
			<div class="top-head vux-1px-b">
				<div class="left"><span class="icon i-cur"></span>季赛榜单</div>
				<div class="right"><span class="more" @click="toRanking_M(data.seasonRankId,'season')">查看更多</span></div>					
			</div>
			
			<user-ranking v-if="data.isTeam=='Y'" :data="{myNetworth:data.myNetworth,myProfit:data.myProfit,myRanking:data.myRanking,myAvatar:data.myAvatar}" :isTeam="data.isTeam" style="margin-top: 15px;" />
			
			<top-three :topThree="data.seasonRankList" style="padding-top: 15px; padding-bottom: 15px;" />
			
			<table-fowin class="parent" :rankList="data.seasonRankList" :isTeam="data.isTeam" :page="1" />
		</div>
		
		<div class="margin-bg" v-if="data.matchState=='GameOver'&&data.weekRankList&&data.weekRankList.length">
			<div class="top-head vux-1px-b">
				<div class="left"><span class="icon i-cur"></span>本次周赛前三甲</div>
				<div class="right"><span class="more" @click="toRanking_M(data.weekRankId,'week')">查看更多</span></div>					
			</div>
			<div>
				<div class="topthree-item vux-1px-b" v-for="(item,index) in data.weekRankList" v-if="index<3">
					<div class="img" :class="{one:index==0,two:index==1,three:index==2}">
						<div class="box"><img class="img-center" src="../assets/images/img1.png"/></div>
					</div>
					<div class="info">
						<div class="name">{{item.teamName}}</div>
						<p>净值：{{item.averageNetworth}}<br />收益率：{{item.profit}}%</p>
					</div>
					<a class="btn" v-if="item.interview" :href="item.interview">查看采访</a>
				</div>
			</div>
		</div>
		
		<div class="margin-bg" v-if="data.matchState=='GameOver'&&data.seasonRankList&&data.seasonRankList.length">
			<div class="top-head vux-1px-b">
				<div class="left"><span class="icon i-cur"></span>本次季赛前三甲</div>
				<div class="right"><span class="more" @click="toRanking_M(data.seasonRankId,'season')">查看更多</span></div>					
			</div>
			<div>
				<div class="topthree-item vux-1px-b" v-for="(item,index) in data.seasonRankList" v-if="index<3">
					<div class="img" :class="{one:index==0,two:index==1,three:index==2}">
						<div class="box"><img class="img-center" src="../assets/images/img1.png"/></div>
					</div>
					<div class="info">
						<div class="name">{{item.teamName}}</div>
						<p>净值：{{item.averageNetworth}}<br />收益率：{{item.profit}}%</p>
					</div>
					<a class="btn" v-if="item.interview" :href="item.interview">查看采访</a>
				</div>
			</div>
		</div>
		
		<div class="margin-bg" v-if="data.chartData">
			<div class="top-head vux-1px-b">
				<div class="left"><span class="icon i-analysis"></span>赛事分析</div>
				<div class="right"></div>					
			</div>
			<div class="analysis-chunk">
				<div class="tit">参赛盈亏</div>
				<div class="profit-loss">
					<div class="box">
						<div class="progress">
							<div class="item" :style="{right: profitLost_C}"></div>
						</div>
						<div class="focu-box" :style="{right: profitLost_C}">
							<div class="focu">
								<span></span>
								<span></span>
							</div>
							<div class="percent-box" :class="classobj">
								<div class="line"></div>
								<div class="percent vux-1px-b">盈亏比：{{profitLostNum_C}}%</div>								
							</div>
						</div>
					</div>
					<div class="text"><span>盈</span><span>亏</span></div>
				</div>
				<div v-if="data.chartData!='[]'">
					<div class="tit">收益率分布</div>
					<div class="echart-label-box">
						<div class="echart-label" v-for="(item,index) in echartLabel"><span :style="{backgroundColor: echartColor[index]}"></span>{{item.propertyName}}</div>
					</div>
					<div id="myChart" style="width: 100%;height: 300px;margin-top: -80px;"></div>
				</div>
			</div>
		</div>
		
		<div class="awards-chunk margin-bg" v-if="data.weekPrize">
			<div class="top-head vux-1px-b">
				<div class="left"><span class="icon i-award"></span>周赛奖项设置</div>				
			</div>
			<div class="awards-list">
				<div class="item one" v-for="(item,index) in data.weekPrize" :class="{one:index==0,two:index==1,three:index==2,}">
					<div>{{item.prizeName}}<span v-if="item.prizeNum!=0">（{{item.prizeNum}}名）</span></div>
					<div>{{item.award}}</div>
				</div>
				<div class="award-tip" v-if="data.weekPrize[0].prizeNum==0">具体奖项见活动规则</div>
			</div>
		</div>
		
		<div class="awards-chunk margin-bg" v-if="data.seasonPrize">
			<div class="top-head vux-1px-b">
				<div class="left"><span class="icon i-award"></span>季赛奖项设置</div>				
			</div>
			<div class="awards-list">
				<div class="item one" v-for="(item,index) in data.seasonPrize" :class="{one:index==0,two:index==1,three:index==2,}">
					<div>{{item.prizeName}}<span v-if="item.prizeNum!=0">（{{item.prizeNum}}名）</span> </div>
					<div>{{item.award}}</div>
				</div>
				<div class="award-tip" v-if="data.weekPrize[0].prizeNum==0">具体奖项见活动规则</div>
			</div>
		</div>
		
		<div class="rule-chunk margin-bg" v-if="data.rule">
			<div class="top-head vux-1px-b">
				<div class="left"><span class="icon i-rule"></span>活动规则</div>				
			</div>
			<div class="content" v-html="data.rule">
				
			</div>
		</div>
		
		<div class="rule-chunk margin-bg" v-if="data.summary">
			<div class="top-head vux-1px-b">
				<div class="left"><span class="icon i-sum"></span>赛事总结</div>				
			</div>
			<div class="content">
				<p v-html="data.summary"></p>
			</div>
		</div>
		
		<div class="commun-chunk margin-bg" v-if="data.exchangeGroup">
			<div class="top-head vux-1px-b">
				<div class="left"><span class="icon i-commun"></span>官方交流讨论群</div>				
			</div>
			<div class="content">
				<!--<div class="code"><img src="../assets/images/erweima.png"/></div>--> 
				<p v-html="data.exchangeGroup"></p>
			</div>
		</div>
	</div>
</template>

<script>
	import { Flexbox, FlexboxItem } from 'vux'
	import TopThree from '@/components/TopThree'
	import UserRanking from '@/components/UserRanking'
	import TableFowin from '@/components/TableFowin'
	export default {
		name: 'CollegeDetail',
		data(){
			return {
				data: {},
				classobj: {one: false, two: true},//盈亏率显示（左或右）
				echartColor: ['#1e50ae', '#4985f6', '#88b1ff', '#40d28c'],//图表label color
				echartLabel: [],//图表label
			}
		},
		props: ['id', 'type'],
		activated(){
			this.$store.commit('TITLE',{title: '赛事详情'})
			this.getData();
		},
		computed: {
			profitLostNum_C(){
				let profitLost = this.data.profitLost
				if(typeof profitLost === 'string'){
					profitLost = parseFloat(profitLost)
				}
				return profitLost*100
			},
			//盈亏率显示的位置计算
			profitLost_C(){	
				let profitLost = this.profitLostNum_C
				if(profitLost > 40){
					this.classobj.one = true;
					this.classobj.two = false;
				}
				return (100-profitLost) + '%'
			},
			//是否显示报名进度
			enrollProg_C(){
				let matchState = this.data.matchState
				let myEnrollState = this.data.myEnrollState
				if(matchState != 'GameOver' && myEnrollState != 'NotEnroll'){
					if(matchState == 'InGame' && myEnrollState == 'EnrollSuccess'){
						return false;
					}
					return true;
				}
				return false
			},
			//赛事状态
			matchState_C(){
		  		switch(this.data.matchState){
		  			case 'UnPublish': return '未发布';
		  			case 'Enrolling': return '报名中';
		  			case 'InGame': return '进行中';
		  			case 'GameOver': return '已结束';
		  			case 'GameCancel': return '赛事取消';
		  		}
		  	},
		  	//分享或报名btn
			sharebtn_C(){
				if(this.data.myEnrollState == 'NotEnroll' && this.data.matchState != 'GameOver'){
					return '立即<br/>报名'
				}
				if(this.data.matchState == 'GameOver' && this.data.myEnrollState == 'EnrollSuccess'){
					return '我要<br/>分享'
				}
				return false
			},
		},
		methods: {
			//请求数据
			getData(){
				this.$post('/api/app/match/findMatchInfoDto.v1', {id: this.id}).then(
					res => {
						this.data = res;
						let chartData = res.chartData
						let chart = []
						//是否有图表数据
						if(chartData && chartData != '[]'){
							if(typeof chartData !== 'Object'){
								chartData = JSON.parse(chartData)
							}
							let arrLabel = [] 
							for(let i = 0; i < chartData.length; i++){
								let obj = {
				                	value: 335,
				                	itemStyle: {
				                		normal: {
				                			color: '#1e50ae'
				                		}
				                	}
				                }
								obj.value = chartData[i].propertyValue;
								obj.itemStyle.normal.color = this.echartColor[i];
								chart.push(obj)
								arrLabel.push({propertyName: chartData[i].propertyName})
							}
							this.echartLabel = this.echartLabel.splice(0,0).concat(arrLabel)
							setTimeout(() => {
								this.initEchart_M(chart);
							}, 500)
						}
						
					}
				).catch(
					e => {
						console.log(e);
					}
				)
			},
			//初始化图表
			initEchart_M(chartData){
				var echarts = require('echarts');
				var myChart = echarts.init(document.getElementById('myChart'));
				myChart.setOption({
				    title : {
				        
				    },
				    legend: {
				        
				    },
				    series : [
				        {
				            name: '访问来源',
				            type: 'pie',
				            radius : '55%',
				            center: ['50%', '60%'],
				            data: chartData,
				            labelLine: {
				            	normal: {
				            		show: false
				            	}
				            }
				        }
				    ]
				})
			},
			//进入排行榜
			toRanking_M(randId, historyType){
				let rankType = this.data.isTeam == 'Y' ? 'group' : 'user'
				let query = {matchId: this.data.id, rankId: randId, isAlways: this.data.isAlways, historyType: historyType, hisUser: 'T'}
				if(this.type == '4' && this.data.isAlways == 'Y'){
					query.hisUser = 'M'
				}
				this.$router.push({name: 'RankingAll', params: {rankType: rankType}, query: query})
			},
			//进入建组
			toCreateTeam_M(id){
				this.$router.push({name: 'CreateTeam', params:{id: id, num: 0}})
			},
			//报名或分享
			enrollShare_M(){
				if(this.data.myEnrollState == 'NotEnroll'){
					this.$post('/api/app/match/enrollMatch.v1', {matchId: this.id}).then(
						res => {
							localStorage.setItem('statu', res.memberState);
							switch(res.memberState){
								case 'N': this.$router.push({path: '/survey'});break;
								case 'W': this.$router.push({path: '/account/sign'});break;
								case 'C': this.$router.push({path: '/account/upload'});break;
								case 'E': this.$router.push({path: '/account/open'});break;
								default: 
									this.$vux.toast.text('报名成功')
									setTimeout(() => {
										this.getData();
									}, 1000)
									break;
							}
							
						}
					).catch(
						e => {
							console.log(e);
						}
					)
				}else{
					this.$vux.alert.show({
						title: '提示',
						content: '请点击页面右上角进行分享',
						buttonText: '知道了'
					})
				}
			}
		},
		components: {
			Flexbox,
			FlexboxItem,
			TopThree,
			UserRanking,
			TableFowin,
			//报名进度组件
			'step-box': {				
				data(){
					return {
						statu1: false,
						statu2: false,
						statu3: false,
						statu4: false,
						name: '完善资料'
					}
				},
				props: ['isTeam', 'myEnrollState', 'matchState'],
				template: `<div class="step-box">
					<div class="active">
						<div class="statu"><span></span></div>					
						<p>已报名{{statu(myEnrollState)}}</p>
					</div>
					<div :class="{active: statu1}">
						<div class="statu"><span></span></div>
						<p>{{name}}</p>
					</div>
//					<div :class="{active: statu2}">
//						<div class="statu"><span></span></div>
//						<p>{{name}}</p>
//					</div>
					<div v-if="isTeam=='Y'" :class="{active: statu2}">
						<div class="statu"><span></span></div>
						<p>组建小组</p>
					</div>
					<div :class="{active: statu3}">
						<div class="statu"><span></span></div>
						<p>{{matchState=='Enrolling'?'等待开赛':'参加比赛'}}</p>
					</div>
				</div>`,
				computed: {
					
				},
				methods: {
					statu(myEnrollState){
						switch(myEnrollState){
							case 'NeedAccount': 
								this.name = '分配账号';
								break;
							case 'ImproveInfo': 
								this.name = '完善资料';
								break;							
							case 'NeedExamine':
								this.name = '审核资料';
								break;
							case 'NeedTeam': 
								this.statu1 = true;
								break;NeedCrew
							case 'NeedCrew': 
								this.statu1 = this.statu2 = true;
								break;
							case 'EnrollSuccess': 
								this.name = '审核通过';
								this.statu1 = this.statu2 = this.statu3 = true;
								break;
							default: 
								this.statu1 = this.statu2 = this.statu3 = false;
								break;
						}
					},
//					statu2(){
//						switch(this.matchState){
//							case 'NeedTeam': return true
//							case 'EnrollSuccess': return true
//							default: return false
//						}
//					},
//					statu3(){
//						switch(this.matchState){
//							case 'EnrollSuccess': return true
//							default: return false
//						}
//					},
				}
			}
		},
	}
</script>

<style lang="less">
	.award-tip{
		text-align: 1.6;
		font-size: 14px;
		text-align: center;
		color: #1E50AE;
		margin-top: 10px;
	}
	.echart-label-box{
		overflow: hidden;
	}
	.echart-label{
		float: left;
		display: inline-block;
		color: #1e50ae;
		font-size: 15px;
		line-height: 20px;
		width: 33.33%;
		padding: 3px 0;
	}
	.echart-label span{
		display: inline-block;
		width: 30px;
		height: 10px;
		background-color: #4985f6;
		vertical-align: baseline;
		margin-right: 5px;
	}
	.parent .tbody{
		height: auto !important;
		max-height: 279px;
	}
	.g-round-btn{
		position: fixed;
		right: 15px;
		bottom: 60px;
		z-index: 100;
	}
	
	.ban-chunk{
		background-color: #fff;
		padding: 10px 15px;		
	}
	.ban-chunk .ban{
		height: 180px;
		position: relative;
		overflow: hidden;
		border-radius: 3px;
	}
	.ban-chunk .ban .num{
		position: absolute;
		left: 10px;
		bottom: 5px;
		color: #fff;
		font-size: 15px;
		z-index: 10;
	}
	.ban-chunk .label{
		position: absolute;
		top: 10px;
		right: -20px;
		width: 80px;
		background-color: #3e3e3e;
		color: #fff;
		font-size: 12px;
		text-align: center;
		line-height: 20px;
		transform: rotate(45deg);
		transform-origin: center;
		z-index: 10;
	}
	.ban-chunk .label.active{
		background-color: #1e50ae;
	}
	.ban-chunk .tit{
		color: #333;
		font-size: 18px;
		margin-top: 15px;
		line-height: 1.3;
		font-weight: 500;
	}
	.ban-chunk .time{
		font-size: 12px;
		line-height: 2;
	}
	
	
	.curlist-chunk{
		margin-top: 10px;
	}
	.margin-bg{
		background-color: #fff;
		margin-top: 10px;
	}
	/*奖项设置*/
	.awards-list{
		position: relative;
		padding: 10px 15px;
	}
	.awards-list .item{
		display: flex;
		flex-direction: column;
		justify-content: center;
		height: 90px;
		padding-left: 90px;
		color: #333;
		line-height: 1.3;
		background-position: left center;
		background-size: 61px 79px;
		background-repeat: no-repeat;
	}
	.awards-list .item > div:nth-child(1){
		font-size: 18px;
		font-weight: 500;
	}
	.awards-list .item > div:nth-child(2){
		font-size: 15px;
	}
	.awards-list .one{
		background-image: url(../assets/images/i_insignia1.png);
	}
	.awards-list .two{
		background-image: url(../assets/images/i_insignia2.png);
	}
	.awards-list .three{
		background-image: url(../assets/images/i_insignia3.png);
	}
	
	
	/*规则*/
	.rule-chunk .content{
		padding: 10px 15px;
	}
	.rule-chunk .content p{
		font-size: 14px;
		color: #333;
		margin-top: 10px;
	}
	.rule-chunk .content p:first-child{
		margin-top: 0;
	}
	/*交流*/
	.commun-chunk .content{
		padding: 15px;
	}
	.commun-chunk .content .code{
		display: block;
		width: 150px;
		height: 150px;
		padding: 5px;
		margin: 0 auto 20px;
		box-sizing: border-box;
		box-shadow: 0 0 3px rgba(0,0,0,.1);
	}
	.commun-chunk .content .code img{
		display: block;
		width: 100%;
		height: 100%;
	}
	.commun-chunk .content p{
		font-size: 14px;
		color: #333;
		line-height: 1.3;
	}
	/*报名进度*/
	.enrol-chunk .content{
		padding: 15px;
	}
	.enrol-chunk .content p{
		font-size: 12px;
	}
	.step-box{
		display: flex;
		margin-bottom: 15px;
	}
	.step-box > div{
		position: relative;
		flex: 1;
		text-align: center;
	}
	.step-box > div:after, .step-box > div:before{
		content: '';
		position: absolute;
		top: 12px;
		width: 50%;
		height: 2px;
		background-color: #cbcbcb;
		z-index: 1;
	}
	.step-box > div:first-child:before, .step-box > div:last-child:after{
		display: none;
	}
	.step-box > div:before{
		left: 0;
	}
	.step-box > div:after{
		right: 0;
	}
	.step-box .statu{
		position: relative;
		z-index: 2;
		display: flex;
		justify-content: center;
		align-items: center;
		width: 16px;
		height: 16px;
		border-radius: 50%;
		background-color: #e0e0e0;
		margin: 0 auto;
		border: 6px #fff solid;
	}
	.step-box .statu span{
		position: relative;
		width: 8px;
		height: 8px;
		border-radius: 50%;
		background-color: #999;
	}
	
	.step-box p{
		margin-top: 5px;
	}
	.step-box .active:before, .step-box .active:after{
		background-color: #1e50ae;
	}
	.step-box .active p{
		color: #1e50ae;
	}
	.step-box .active .statu{
		background-color: #d2dcef;
	}
	.step-box .active .statu span{
		background-color: #1e50ae;
	}
	/*前三甲*/
	.topthree-item{
		position: relative;
		padding: 10px 15px;
		height: 90px;
	}
	.topthree-item .img{
		position: relative;
		float: left;
		width: 52px;
		height: 71px;
		background-repeat: no-repeat;
		background-size: 100% 100%;
	}
	.topthree-item .img.one{
		background-image: url(../assets/images/i_top1.png);
	}
	.topthree-item .img.two{
		background-image: url(../assets/images/i_top2.png);
	}
	.topthree-item .img.three{
		background-image: url(../assets/images/i_top3.png);
	}
	.topthree-item .box{
		position: absolute;
		left: 2px;
		bottom: 1px;
		width: 48px;
		height: 48px;
		border-radius: 50%;
		overflow: hidden;
		z-index: 2;
	}
	.topthree-item .info{
		padding: 5px 70px 5px 65px;
		font-size: 15px;
		color: #333;
	}
	.topthree-item .name{		
		color: #1e50ae;
		font-weight: 500;
	}
	.topthree-item .info p{
		line-height: 1.3;
		margin-top: 3px;
	}
	.topthree-item .btn{
		position: absolute;
		top: 50%;
		right: 15px;
		margin-top: -10px;
		width: 60px;
		text-align: center;
		line-height: 18px;
		color: #1e50ae;
		font-size: 12px;
		border: 1px solid #1e50ae;
		border-radius: 3px;
	}
	.topthree-item.vux-1px-b:after{
		left: 15px;
		border-bottom-color: #cfe0ff;
	}
	/*赛事分析*/
	.analysis-chunk{
		padding: 15px;
		
	}
	.analysis-chunk .tit{
		color: #1e50ae;
		font-size: 15px;
		margin-bottom: 20px;
		font-weight: 500;
	}
	.profit-loss{
		margin-bottom: 30px;
	}
	.profit-loss .progress{
		width: 100%;
		height: 5px;
		background-color: #e3e3e3;
		border-radius: 3px;
		overflow: hidden;
	}
	.profit-loss .progress .item{
		position: relative;
		right: 10%;
		display: block;
		width: 100%;
		height: 100%;
		background-color: #1e50ae;
		z-index: 1;
	}
	.profit-loss .focu{
		position: relative;
		width: 26px;
		height: 26px;
		background-color: #d5e4ff;
		border-radius: 50%;
		z-index: 11;
	}
	.profit-loss .focu span{
		position: absolute;
		top: 50%;
		left: 50%;
		border-radius: 50%;
		transform: translate(-50%, -50%);
	}
	.profit-loss .focu span:first-child{
		background-color: #8ca9df;
		width: 18px;
		height: 18px;
	}
	.profit-loss .focu span:last-child{
		background-color: #1e50ae;
		width: 8px;
		height: 8px;
	}
	.profit-loss .focu-box{
		position: absolute;
		top: -10px;
		right: 10%;
		margin-right: -13px;
		z-index: 10;
	}
	.profit-loss .box{
		position: relative;
	}
	.profit-loss .text{
		display: flex;
		justify-content: space-between;
		font-size: 12px;
		color: #333;
		margin-top: 6px;
		font-weight: 500;
	}
	.profit-loss .percent-box{
		display: flex;
		position: absolute;
		top: 20px;
		height: 25px;
	}
	.profit-loss .percent-box.one{
		right: 12px;
	}
	.profit-loss .percent-box.two{
		left: 15px;
	}
	.profit-loss .percent-box > div{
		height: 100%;
	}
	.profit-loss .percent-box.one .percent{
		margin-right: 20px;
	}
	.profit-loss .percent-box.two .percent{
		margin-left: 20px;
	}
	.profit-loss .percent{
		color: #333;
		font-size: 12px;
		padding: 0 5px;
		line-height: 25px;
		box-sizing: border-box;
		white-space:nowrap
	}
	.profit-loss .vux-1px-b:after{
		border-color: #1e50ae;
	}
	.profit-loss .line{
		position: absolute !important;
		top: 0;
		width: 20px;
		position: relative;
		overflow: hidden;
	}
	.profit-loss .line:after{
		
		width: 100px;
		content: '';
	    position: absolute;
	    top: 23px;
	    left: 0;
	    height: 1px;
	    border-bottom: 1px solid #1E50AE;
	    color: #1E50AE;
	    transform-origin: 0 100%;
	}
	.profit-loss .one .line{
		right: 0;
	}
	.profit-loss .two .line{
		left: 0;
	}
	.profit-loss .two .line:after{
		transform: scaleY(0.5) rotate(65deg);
		top: 4px;
		left: 1px;
	}
	.profit-loss .one .line:after{
		transform: scaleY(0.5) rotate(-65deg);
	}
</style>