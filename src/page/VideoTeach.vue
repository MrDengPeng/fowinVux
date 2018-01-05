<template>
	<div>
		<view-box ref="viewBox">
			<div class="search-reset">
				<search ref="search" :auto-fixed="false" v-model="videoName" @on-submit="onsubmit" @on-focus="searchMask=true" @on-blur="searchMask=false" @on-cancel="oncancel_M"></search>
				<teach-item v-for="item in data" :data="item" :key="item.id" @toDetail="toDetail" />
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
	import TeachItem from '@/components/TeachItem'
	import { mapMutations } from 'vuex'
	
	export default {
		name: 'VideoDetail',
		data () {
			return {
				videoName: '',
				params: { page: 1, rows: 8, videoName: ''},
				scrollBody: null,
				data: [],
				more: true,
				searchMask: false
			}
		},
		components: {
			Search,
			LoadMore,
			ViewBox,
			TeachItem
		},
		activated(){
			//滚动至上次的位置
			this.$refs.viewBox.scrollTo(this.scrollTop || 0);
		  	this.TITLE({title: '抱佛脚-有料'});
		},
		deactivated(){
			//保存滚动位置
		  	this.scrollTop = this.$refs.viewBox.getScrollTop();
		},
		mounted () {
			//初始化上拉加载插件
			let viewBox = this.$refs.viewBox;
			this.scrollInstance = new this.ScrollPlugin(viewBox, viewBox.getScrollBody(), viewBox.getScrollBody().children[0], this.getData, true);//true自动加载一次数据		
		},
		methods: {
			...mapMutations(['TITLE']),
			getData () {
				this.$post('api/app/video/findForPage.v1', this.params).then(
					res => {
						console.log(res)
						let rows = res.rows;
						if(this.params.page == 1){
							this.data = rows;							
							rows.length ===0 && this.$vux.toast.text('没有相关数据', 'middle')
						}else{
							this.data = this.data.concat(rows);
						}
						if(rows.length < this.params.rows){
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
				this.$refs.search.setBlur();
				this.params.videoName = this.videoName.trim();
				this.params.page = 1;
				this.getData();				
			},
			//取消搜索并reset params
			oncancel_M(){
				if(this.params.videoName != ''){
					this.params.videoName = '';
					this.params.page = 1;
					this.getData();
				}
				this.videoName = '';
				
			},
			//进入详情
			toDetail(id){
				this.TITLE({title: '抱佛脚-有料(详情)'});
				this.$router.push({name: 'VideoDetail', params: {id: id}})
			}
		}
	}
</script>

<style>
</style>