<template>
	<div>
		<view-box ref="viewBox">
			<div class="search-reset">
				<search ref="search" :auto-fixed="false" v-model="keyword" @on-submit="onsubmit" @on-focus="searchMask=true" @on-blur="searchMask=false" @on-cancel="oncancel_M"></search>
				<div class="list vux-1px-b" v-for="item in data" @click="toDetail(item.id)">
					<div class="img"><img class="img-center" :src="item.photoUrl"/></div>
					<div class="cont">
						<div class="tit">{{item.skillName}}</div>
						<div class="time">{{item.createTime | splitdate}}</div>
					</div>
				</div>
				<div style="padding: 1px;">
					<load-more :show-loading="more" :tip="more ? '正在加载' : '我是有底线的'" background-color="#f6f6f6"></load-more>
				</div>
			</div>
		</view-box>
		<div class="search-mask" v-show="searchMask" @touchstart="$refs.search.setBlur()"></div>
	</div>
</template>

<script>
	import { Search, LoadMore, ViewBox } from 'vux'
	import { mapMutations } from 'vuex'
	
	export default {
		name: 'TradingSkill',
		data () {
			return {
				keyword: '',
				params: { page: 1, rows: 10, skillName: ''},
				scrollBody: null,//滚动盒子
				data: [],
				more: true,//是否有更多数据
				searchMask: false,//搜索遮罩
			}
		},
		activated(){
			/*滚动到上次滚动的距离*/
			this.$refs.viewBox.scrollTo(this.scrollTop || 0);
		  	this.TITLE({title: '交易技巧'});
		},
		deactivated(){
		  	/*保存滚动距离*/
		  	this.scrollTop = this.$refs.viewBox.getScrollTop();
		},
		mounted () {
			//初始化滚动插件
			let viewBox = this.$refs.viewBox;
			this.scrollInstance = new this.ScrollPlugin(viewBox, viewBox.getScrollBody(), viewBox.getScrollBody().children[0], this.getData, true);//true自动加载一次数据
		},
		methods: {
			...mapMutations(['TITLE']),
			getData () {
				this.$post('api/app/skill/findForPage.v1', this.params).then(
					res => {
						let rows = res.rows;
						if(this.params.page == 1){
							this.data = rows;							
							rows.length ===0 && this.$vux.toast.text('没有相关数据', 'middle')
						}else{
							this.data = this.data.concat(rows);
						}
						if(rows.length < 10){
							this.more = false;
						}else{
							this.more = true;
							this.params.page++;
							this.scrollInstance.addEvent();
						}						
					}
				).catch(
					e => {
						console.log(e);
					}
				)
			},
			//搜索
			onsubmit(){
				let keyword = this.keyword.trim()
				if(keyword != ''){
					this.$refs.search.setBlur();
					this.params.skillName = keyword;
					this.params.page = 1;
					this.getData();
				}else{
					this.$vux.toast.text('请输入关键字查询', 'top')
				}
				
			},
			//取消搜索reset params
			oncancel(){
				if(this.params.skillName != ''){
					this.params.skillName = '';
					this.params.page = 1;
					this.getData();
				}
				this.keyword = '';				
			},
			//进入详情
			toDetail(id){
				this.TITLE({title: '技巧详情'});
				this.$router.push({name: 'TradingDetail', params: {id: id}})
			}
		},
		components: {
			Search,
			LoadMore,
			ViewBox,
		},
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