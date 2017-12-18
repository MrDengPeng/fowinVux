<template>
	<div>
		<div class="g-round-btn">我要<br />分享</div>
		<div class="ban-chunk">
			<div class="ban">
				<img src="../../dist/static/img/img1.4ae8f01.png" class="img-center"/>
				<span class="label active">进行中</span>
				<div class="num">参赛人数：200人</div>
			</div>
			<div class="tit">湘潭大学第一届境外金融交易大赛</div>
			<p class="time">赛事时间：2017-12-01~2017-12-10</p>
			<p class="time"><span class="icon-time"></span>报名截止日期：12-23</p>
		</div>
		<div class="margin-bg">
			<div class="top-head vux-1px-b">
				<div class="left"><span class="icon i-cur"></span>当季榜单</div>
				<div class="right"><span class="more">查看更多</span></div>					
			</div>
			
			<user-ranking style="margin-top: 15px;" />
			<top-three style="padding-top: 15px; padding-bottom: 15px;" />
			
			<table-fowin />
		</div>
		<div class="margin-bg">
			<div class="top-head vux-1px-b">
				<div class="left"><span class="icon i-analysis"></span>赛事分析</div>
				<div class="right"></div>					
			</div>
			<div class="analysis-chunk">
				<div class="tit">参赛盈亏</div>
				<div class="profit-loss">
					<div class="box">
						<div class="progress">
							<div class="item"></div>
						</div>
						<div class="focu-box">
							<div class="focu">
								<span></span>
								<span></span>
							</div>
							<div class="percent-box">
								<!--<div class="line left vux-1px-b"></div>-->
								<div class="percent vux-1px-b">盈亏比：76%</div>
								<div class="line right vux-1px-b"></div>
							</div>
						</div>
					</div>
					<div class="text"><span>盈</span><span>亏</span></div>
				</div>
				<div class="tit">收益率分布</div>
				<div id="myChart" :style="{width: '100%', height: '300px', 'margin-top': '-50px'}"></div>
			</div>
		</div>
		<div class="enrol-chunk margin-bg">
			<div class="top-head vux-1px-b">
				<div class="left"><span class="icon i-progress"></span>报名进度</div>
				<div class="right"><span class="more">立即建组</span></div>					
			</div>
			<div class="content">
				<div class="step-box">
					<div class="active">						
						<div class="statu"><span></span></div>						
						<p>报名成功</p>
					</div>
					<div class="active">
						<div class="statu"><span></span></div>
						<p>完善资料</p>
					</div>
					<div>
						<div class="statu"><span></span></div>
						<p>组建小组</p>
					</div>
					<div>
						<div class="statu"><span></span></div>
						<p>等待开赛</p>
					</div>
				</div>
				<p class="tip">提示：本次比赛中允许个人参赛，“组建小组”不是必要步骤。</p>
			</div>
		</div>
		<div class="margin-bg">
			<div class="top-head vux-1px-b">
				<div class="left"><span class="icon i-cur"></span>本次竞赛前三甲</div>
				<div class="right"><span class="more">查看更多</span></div>					
			</div>
			<div class="topthree-chunk">
				<div class="topthree-item vux-1px-b">
					<div class="img one">
						<div class="box"><img class="img-center" src="../../dist/static/img/img1.4ae8f01.png"/></div>
					</div>
					<div class="info">
						<div class="name">李妍妍</div>
						<p>净值：146927.9<br />收益率：65.39%</p>
					</div>
					<a class="btn">查看采访</a>
				</div>
				<div class="topthree-item vux-1px-b">
					<div class="img two">
						<div class="box"><img class="img-center" src="../../dist/static/img/img1.4ae8f01.png"/></div>
					</div>
					<div class="info">
						<div class="name">李妍妍</div>
						<p>净值：146927.9<br />收益率：65.39%</p>
					</div>
					<a class="btn">查看采访</a>
				</div>
				<div class="topthree-item">
					<div class="img three">
						<div class="box"><img class="img-center" src="../../dist/static/img/img1.4ae8f01.png"/></div>
					</div>
					<div class="info">
						<div class="name">李妍妍</div>
						<p>净值：146927.9<br />收益率：65.39%</p>
					</div>
					<a class="btn">查看采访</a>
				</div>
			</div>
		</div>
		<div class="awards-chunk margin-bg">
			<div class="top-head vux-1px-b">
				<div class="left"><span class="icon i-award"></span>奖项设置</div>				
			</div>
			<div class="awards-list">
				<div class="item one">
					<div>冠军（3名） </div>
					<div>xxx奖品</div>
				</div>
				<div class="item two">
					<div>亚军（3名） </div>
					<div>xxx奖品</div>
				</div>
				<div class="item three">
					<div>季军（3名） </div>
					<div>xxx奖品</div>
				</div>
			</div>
		</div>
		<div class="rule-chunk margin-bg">
			<div class="top-head vux-1px-b">
				<div class="left"><span class="icon i-rule"></span>活动规则</div>				
			</div>
			<div class="content">
				<p>1. 此处显示活动规则，可自定义编辑此处显示活动规则，可自定义编辑此处显示活动规则，可自定义编辑此处显示活动规则，可自定义编辑此处显示活动规则，可自定义编辑</p>
				<p>2. 此处显示活动规则，可自定义编辑此处显示活动规则，可自定义编辑此处显示活动规则，可自定义编辑此处显示活动规则，可自定义编辑此处显示活动规则，可自定义编辑</p>
				<p>3. 此处显示活动规则，可自定义编辑此处显示活动规则，可自定义编辑此处显示活动规则，可自定义编辑此处显示活动规则，可自定义编辑此处显示活动规则，可自定义编辑</p>
			</div>
		</div>
		<div class="rule-chunk margin-bg">
			<div class="top-head vux-1px-b">
				<div class="left"><span class="icon i-sum"></span>赛事总结</div>				
			</div>
			<div class="content">
				<p>1. 此处是赛事总结，可自定义编辑此处是赛事总结，可自定义编辑此处是赛事总结，可自定义编辑此处是赛事总结，可自定义编辑</p>
			</div>
		</div>
		<div class="commun-chunk margin-bg">
			<div class="top-head vux-1px-b">
				<div class="left"><span class="icon i-commun"></span>官方交流讨论群</div>				
			</div>
			<div class="content">
				<div class="code"><img src="../assets/images/erweima.png"/></div>
				<p>如已报名参赛，请长按上方二维码，或输入群号加入官方讨论群，群人数上限为1000人，请尽快添加。</p>
			</div>
		</div>
	</div>
</template>

<script>
//	import echarts from 'echarts'
	var pie = require('echarts');
	require('echarts/lib/component/tooltip');
	require('echarts/lib/component/title')
	import { Step, StepItem, Range } from 'vux'
	import TopThree from '@/components/TopThree'
	import UserRanking from '@/components/UserRanking'
	import TableFowin from '@/components/TableFowin'
	export default {
		data(){
			return {
				step: 1
			}
		},
		components: {
			Step,
			StepItem,
			Range,
			TopThree,
			UserRanking,
			TableFowin
		},
		mounted(){
			let myChart = pie.init(document.getElementById('myChart'))
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
			            data:[
			                {
			                	value:335,
			                	itemStyle: {
			                		normal: {
			                			color: '#1e50ae'
			                		}
			                	}
			                },
			                {
			                	value:310,
			                	itemStyle: {
			                		normal: {
			                			color: '#4985f6'
			                		}
			                	}
			                },
			                {
			                	value:234,
			                	itemStyle: {
			                		normal: {
			                			color: '#88b1ff'
			                		}
			                	}
			                },
			                {
			                	value:135,
			                	itemStyle: {
			                		normal: {
			                			color: '#40d28c'
			                		}
			                	}
			                }
			            ],
			            labelLine: {
			            	normal: {
			            		show: false
			            	}
			            }
			        }
			    ]
			})
		}	
	}
</script>

<style lang="less">
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
	.icon-time{
		margin-right: 5px;
		display: inline-block;
		vertical-align: text-bottom;
		width: 14px;
		height: 14px;
		background: url(../assets/images/i_time.png) no-repeat center/100%;
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
		margin-bottom: 15px;
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
		left: -10%;
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
		right:10% ;
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
		right: 11px;
		height: 25px;
	}
	.profit-loss .percent-box > div{
		height: 100%;
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
		width: 20px;
		position: relative;
		overflow: hidden;
	}
	.profit-loss .line.vux-1px-b:after{
		right: auto;
		width: 100px;
	}
	.profit-loss .line.left.vux-1px-b:after{
		transform: rotate(45deg);
		top: 4px;
	}
	.profit-loss .line.right.vux-1px-b:after{
		transform: rotate(-45deg);
	}
</style>