<template>
	<div class="wrapper-content" style="padding-bottom: 30px;">
		<img src="../assets/images/logo.jpg" alt="" style="display: block;width: 80%;margin: 15px auto 30px;" />
		<div class="tit">汇盈外汇学苑——微信公众号平台</div>
		<p class="text">是由深圳市汇盈学汇咨询管理有限公司（简称“汇赢学汇”）全情打造的专业外汇学习平台，通过线上教育体系和境外金融交易大赛，实现了金融理论、国际时事和金融工具实操的有效结合，以开拓高校学生的全球金融视野，并为高校学生的创业就业提供专项技能支持。</p>
		
		<div class="tit">汇盈学汇</div>
		<p class="text">是深圳市康盈资产管理有限公司（简称“康盈资产”）的子公司，以把“汇盈外汇学苑”打造成外汇交易员及投资家的摇篮为愿景，着力植根于高校，培养挖掘外汇交易专才，以期为金融机构输送优秀高端金融人才，并以“普及外汇交易知识，提供更为丰富的金融投资工具”为使命，开创外汇金融更为繁荣的市场未来。</p>
		<div class="tit">康盈资产</div>
		<p class="text">成立于2015年8月，是一家综合金融服务机构。公司汇集银行、信托、证券、保险、基金等各金融机构具有资深从业经验的顶尖精英组成一流的理财专业团队，团队成员具备金融和产业的复合背景，秉承诚信、专业、务实、共赢的经营理念，以健康财富管理为核心，根据中高端个人和机构客户制定个性化境内外资产配置方案，以期实现客户健康盈利。</p>
		
		<img src="../assets/images/erweima.jpg" style="display: block;width: 150px;margin: 20px auto 0;"/>
		<div style="text-align: center;font-size: 14px;">汇盈外汇学苑微信公众号二维码</div>
	</div>
</template>

<script>
	import { ViewBox } from 'vux'
	export default {
		name: 'AboutHy',
		created(){
			this.$store.commit('TITLE',{title: '关于汇盈'})
		},
		components: {
			ViewBox
		}
		
	}
</script>

<style lang="less" scoped>
	.box{
		background-color: #fff;
		padding: 15px;
	}
	.wrap{
	    box-sizing: border-box;
	    height: 100%;
	    overflow: auto;
	    -webkit-overflow-scrolling: touch;
	    padding: 15px;
	    background-color: #fff;		
	}
	.tit{
		color: #333;
		font-size: 18px;
		font-weight: 500;
		margin-top: 10px;
		margin-bottom: 3px;
	}
	.text{
		color: #666;
		font-size: 14px;
		line-height: 1.3;
		text-indent: 2em;
	}
</style>