<template>
	<div class="box">
		<view-box ref="viewBox">
			<search :auto-fixed="false"></search>
			<div class="list vux-1px-b" v-for="item in num" :key="item" @click="link">
				<div class="img"><img class="img-center" src="../assets/images/img1.png"/></div>
				<div class="cont">
					<div class="tit">十年炒股经验总结t0交易技巧从 入门到精通</div>
					<div class="time">2017-11-20</div>
				</div>
			</div>
			<div style="padding: 1px;">
				<load-more :show-loading="more" :tip="more ? '正在加载' : '我是有底线的'" background-color="#f6f6f6"></load-more>
			</div>
		</view-box>		
	</div>
</template>

<script>
	import { Search, LoadMore, ViewBox } from 'vux'
	import { mapMutations, mapState } from 'vuex'
	export default {
		name: 'TradingSkill',
		data () {
			return {
				scrollBody: null,
				num: 10,
				more: true,
				scrollTop: 0
			}
		},
		activated(){
			this.$refs.viewBox.scrollTo(this.scrollTop);
		  	this.TITLE({title: '交易技巧'});
		  },
		  deactivated(){
		  	this.scrollTop = this.$refs.viewBox.getScrollTop();
		  	console.log(this.$refs.viewBox.getScrollTop())
		  },
		components: {
			Search,
			LoadMore,
			ViewBox
		},
		created(){
			
		},
		mounted () {
			this.scrollBody = this.$refs.viewBox.getScrollBody();
			if(this.num >=10 ){
				this.onscroll();
			}else{
				this.more = false;
			}
			
		},
		methods: {
			...mapMutations(['TITLE']),
			getData () {
				this.scrollBody.removeEventListener('scroll', this.scroll);
				setTimeout(() => {						
					if(this.num > 21){
						this.more = false						
					}else{
						this.onscroll();
						this.num += 10;
					}					
				},1000)
			},
			onscroll(){
				this.scrollBody.addEventListener('scroll', this.scroll, false);
			},
			scroll(){
				var parentHeight = this.scrollBody.offsetHeight + this.$refs.viewBox.getScrollTop();
				var childHeight = this.scrollBody.children[0].children[0].offsetHeight-50;
				console.log(parentHeight, childHeight);
				if(parentHeight >= childHeight){
					this.getData();
				}
			},
			link(){
				
				this.TITLE({title: '技巧详情'});
				this.$router.push({name: 'TradingDetail'})
			}
		},
		computed: {
			...mapState({
				direction: (state) => state.vux.direction
			})
		}
	}
</script>
<style scoped>
	
	.list{
		background-color: #fff;
		padding: 20px;
		display: flex;
	}
	.list .img{
		flex-shrink: 0;
		width: 240px;
		height: 180px;
		overflow: hidden;
		border-radius: 6px;
	}
	.list .cont{
		display: flex;
		padding: 20px;
		padding-right: 0;
		flex-direction: column;
		justify-content: space-between;
	}
	.list .tit{
		color: #333;
		font-size: 30px;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		overflow: hidden;
	}
	.list .time{
		font-size: 24px;
	}
</style>
<style lang="less">
	.weui-search-bar{
		padding: 10px 15px !important;
	}
	.weui-search-bar__box{
		display: flex;
		align-items: center;
		padding-left: 40px !important;
	}
	.weui-search-bar__label{
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.weui-search-bar__form{
		height: 35px;
	}
	.weui-search-bar__box .weui-icon-search{
		line-height: 35px !important;
	}
	.box .weui-icon-search{
		font-size: 18px;
	}
	.box .weui-search-bar__label span{
		font-size: 16px;
	}
	.box .weui-search-bar__cancel-btn{
		font-size: 16px;
		line-height: 35px;
	}
	.box .weui-search-bar:after{
		display: none;
	}
</style>