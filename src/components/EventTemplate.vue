<template>
  <div class="wrap-box">
  	<div class="img">
		<!--<img src="../assets/images/img1.png"/>-->
	<img :src="data.coverUrl"/>   		
	</div>
    <div class="content">
	    <div class="head">
	    	<div class="box">
	    		<slot name="topThree" :firstName="data.firstName" :secondName="data.secondName" :thirdName="data.thirdName"></slot>
	    		<slot name="enrol"></slot>
	    		<!--我的竞赛-->  
	    		<div v-if="type == '4'">
	    				<div class="rank-state" v-if="data.myEnrolState == 'EnrollSuccess' && data.matchState != 'Enrolling'">
				    		<p>{{data.isTeam=='Y'?'小组':'我的'}}排名：<span class="num" v-if="data.myRanking!=0">{{data.myRanking}}</span><span class="num" v-else>暂无</span></p>
				    		<p>净值：<span v-if="data.myRanking!=0">{{data.myNetworth}}</span><span v-else>暂无</span></p>
				    		<p>收益率：<span v-if="data.myRanking!=0">{{data.myProfit}}</span><span v-else>暂无</span></p>
				    	</div>
				    	<div v-else>
				    		<div class="btn-box">
					    		<a class="btn" v-if="data.myEnrolState == 'ImproveInfo'" @click.stop="toAccountUpload">完善资料</a>
					    		<div class="wait-text" v-else>{{enrollSuc_C}}</div>
					    	</div>				    	
					    	<p class="cutoff"><span class="icon-time"></span>报名截止：{{data.enrollTime | splitdate(10)}}</p>
				    	</div>
	    		</div>
	    	</div>
	    	<div class="statu-box">
	    		<span :class="{active: data.matchState!='GameOver'}">{{matchState_C}}</span>{{data.joinNum}}人
	    	</div>
	    </div>
	    <div class="info">
	    	<div>{{data.matchName}}</div>
	    	<p v-if="data.isAlways!='Y'">赛事时间：{{data.startTime | splitdate(10)}} ~ {{data.endTime | splitdate(10)}}</p>
	    </div>
	    <div class="always" v-if="data.isAlways=='Y'">长期</div>
	    <div class="group-btn vux-1px-t" v-if="data.myTeamId" @click.stop="$emit('toGroupMe', data.id, data.myTeamId)">我的小组</div>
    </div>
  </div>
</template>

<script>
	import { XButton } from 'vux'
	
	export default {
	  props: ['data','type'],
	  computed: {
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
	  	//我的排名
	  	metourna_C(){
	  		return this.data.myEnrolState == 'EnrollSuccess' && this.data.matchState == 'InGame' ? true : false
	  	},
	  	//资料审核或报名成功
	  	enrollSuc_C(){
	  		if(this.data.matchState == 'GameOver'){
	  			return '本次赛事已结束'
	  		}
	  		switch(this.data.myEnrolState){
	  			case 'EnrollSuccess': return '我已报名,等待开赛'
	  			case 'NeedAccount': return '等待分配账号'
	  			case 'NeedExamine': return '等待审核资料'
	  			case 'NeedTeam': return '待组队'
	  			case 'NeedCrew': return '队友人数不够'
	  			case 'ErrTeam': return '组队失败'
	  			default: return ''
	  		}
	  	}
	  },
	  methods: {
	  	//完善资料
	  	toAccountUpload(){
	  		let statu = localStorage.getItem('statu');
	  		console.log(statu)
	  		switch(statu){
	  			case 'N': this.$router.push({path: '/survey'});break;
					case 'W': this.$router.push({path: '/account/sign'});break;
					case 'C': this.$router.push({path: '/account/upload'});break;
					case 'E': this.$router.push({name: '/account/open'});break;					
				} 		
	  	}
	  },
	  components: {
	    XButton
	  },
	}
</script>
<style scoped>
	.wu-rank{
		line-height: 180px;
		font-size: 32px;
		padding: 0 30px;
		color: #1E50AE;
	}
	.group-btn{
		color: #1E50AE;
		font-size: 30px;
		text-align: center;
		line-height: 80px;
		background: url(../assets/images/i_arrow_two.png) no-repeat 430px 33px/22px 20px;
	}
	.group-btn .icon-r-two{
		margin-left: 20px;
	}
	.wait-text{
		color: #1E50AE;
		font-size: 30px;
		line-height: 60px;
		white-space: nowrap;
		font-weight: 500;
	}
	.cutoff{
		font-size: 24px;
		padding-left: 30px;
		white-space: nowrap;
	}
	.btn-box{
		padding: 30px;
		line-height: 60px;
	}
	.btn{
		display: inline-block;
		vertical-align: middle;
		width: 200px;
		line-height: 60px;
		color: #fff;
		font-size: 30px;
		text-align: center;
		background-image: linear-gradient(to right, #669bff, #1e50ae);
		border-radius: 40px;
	}
	.wrap-box{
		position: relative;
		margin: 40px 30px;
	}
	.always{
		position: absolute;
		bottom: -44px;
		right: -100px;
		transform: rotate(-45deg);
		background-color: #1E50AE;
		color: #fff;
		font-size: 24px;
		text-align: center;
		line-height: 1.3;
		padding: 8px 80px 80px;
		z-index: 2;
	}
	.content{
		position: relative;
		background-color: #fff;
		box-shadow: 0 0 7px rgba(0,0,0,.1);/*no*/
		border-radius: 8px;
		overflow: hidden;
	}
	.img{
		position: absolute;
		top: -20px;
		left: -10px;
		width: 330px;
		height: 260px;
		border-radius: 8px;
		overflow: hidden;
		z-index: 2;
	}
	.img img{
		position: relative;
		display: block;
		top: 50%;
		left: 50%;
		width: 100%;
		min-height: 100%;
		transform: translate(-50%, -50%);
	}
	.content .head{
		height: 240px;
		padding-left: 320px;
	}
	.content .head .box{
		height: 180px;
		
	}
	.rank-state{
		font-size: 24px;
		line-height: 44px;
		padding-left: 30px;
		padding-top: 20px;
	}
	.rank-state span{
		color: #333;		
		font-weight: 500;
	}
	.rank-state .num{
		display: inline-block;
		vertical-align: bottom;
		font-size: 48px;
		font-weight: 500;
		color: #1E50AE;
	}
	.top-three{
		display: flex;
		padding: 0 20px;
	}
	.top-three .item{
		width: 33.333%;
		padding-top: 110px;
		line-height: 40px;
		color: #333;
		text-align: center;
		background-position: center top;
		background-repeat: no-repeat;
		background-size: 80px 110px;
		font-size: 24px;
	}
	.top-three .item > div{
		margin-top: 4px;
		line-height: 30px;
		max-height: 60px;
		display: -webkit-box;
	-webkit-box-orient: vertical;
	-webkit-line-clamp: 2;
	overflow: hidden;
	}
	.top-three .item:nth-child(1){
		background-image: url(../assets/images/i_badge1.png);
	}
	.top-three .item:nth-child(2){
		background-image: url(../assets/images/i_badge2.png);
	}
	.top-three .item:nth-child(3){
		background-image: url(../assets/images/i_badge3.png);
	}
	.statu-box{
		padding-left: 30px;
		font-size: 24px;
	}
	.statu-box .active{
		background-color: #1e50ae;
	}
	.statu-box span{
		color: #fff;
		display: inline-block;
		line-height: 40px;
		padding: 0 10px;
		background-color: #3e3e3e;
		border-radius: 5px;
		margin-right: 20px;
		font-size: 24px;
	}
	.content .info{
		padding: 20px 20px 30px;
	}
	.content .info div{
		font-weight: 500;
		font-size: 36px;
		color: #333;
		padding: 10px 0;
		line-height: 1.3;
	}
	.content .info p{
		font-size: 24px;
	}
</style>


