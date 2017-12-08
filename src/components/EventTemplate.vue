<template>
  <div class="wrap-box">
    <div class="content">
    	<div class="img"><img src="../assets/images/img1.png"/></div>
	    <div class="head">
	    	<div class="top-three">
	    		<div class="item">唐江涛</div>
	    		<div class="item">李妍妍</div>
	    		<div class="item">徐语州</div>
	    	</div>
	    	<div class="statu-box">
	    		<span class="active">进行中</span>200人
	    	</div>
	    </div>
	    <div class="info">
	    	<div>湘潭大学第一届境外金融交易大赛</div>
	    	<p>赛事时间：2017-12-01~2017-12-10</p>
	    </div>
    </div>
  </div>
</template>

<script>
import { XButton } from 'vux'

export default {
  components: {
    XButton
  },
  data () {
    return {
      // note: changing this line won't causes changes
      // with hot-reload because the reloaded component
      // preserves its current state and we are modifying
      // its initial state.
      msg: 'Hello World!'
    }
  },
  mounted(){
  	
  }
}
</script>
<style scoped>
	
	.wrap-box{
		margin: 40px 30px;
	}
	.content{
		position: relative;
		background-color: #fff;
		box-shadow: 0 0 7px rgba(0,0,0,.1);/*no*/
		border-radius: 8px;
	}
	.content .img{
		position: absolute;
		top: -20px;
		left: -10px;
		width: 330px;
		height: 260px;
		border-radius: 8px;
		overflow: hidden;
		z-index: 2;
	}
	.content .img img{
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
	.top-three{
		display: flex;
		padding: 0 20px;
	}
	.top-three .item{
		flex: 1;
		padding-top: 110px;
		line-height: 40px;
		color: #333;
		text-align: center;
		background-position: center top;
		background-repeat: no-repeat;
		background-size: 80px 110px;
		font-size: 24px;
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
		padding: 30px 0 0 40px;
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
		padding: 30px 20px;
	}
	.content .info div{
		font-size: 36px;
		color: #333;
	}
	.content .info p{
		font-size: 24px;
		margin-top: 10px;
	}
</style>


