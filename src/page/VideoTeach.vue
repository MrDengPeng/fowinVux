<template>
	<div style="background-color: #fff;">
		<view-box ref="viewBox">
			<div class="search-reset">
				<search ref="search" :auto-fixed="false" v-model="videoName" @on-submit="onsubmit" @on-cancel="oncancel"></search>
				<teach-item v-for="item in data" :data="item" :key="item.id" />
				<div style="padding: 1px;">
					<load-more :show-loading="more" :tip="more ? '正在加载' : '我是有底线的'" background-color="#f6f6f6"></load-more>
				</div>
			</div>
		</view-box>	
	</div>
</template>

<script>
	import { Search, LoadMore, ViewBox } from 'vux'
	import TeachItem from '@/components/TeachItem'
	import { mapMutations } from 'vuex'
	export default {
		data () {
			return {
				videoName: '',
				params: { page: 1, rows: 8, videoName: ''},
				scrollBody: null,
				data: [],
				more: true,
				scrollTop: 0,
			}
		},
		components: {
			Search,
			LoadMore,
			ViewBox,
			TeachItem
		},
		activated(){
			this.$refs.viewBox.scrollTo(this.scrollTop);
		  	this.TITLE({title: '交易技巧'});
		},
		  deactivated(){
		  	this.scrollTop = this.$refs.viewBox.getScrollTop();
		  	console.log(this.$refs.viewBox.getScrollTop())
		},
		mounted () {
			this.scrollBody = this.$refs.viewBox.getScrollBody();
			this.getData();			
		},
		methods: {
			...mapMutations(['TITLE']),
			getData () {
				this.scrollBody.removeEventListener('scroll', this.scrollBottom);
				this.$http.post('api/app/video/findForPage.v1', this.params).then(
					res => {
						this.$vux.loading.hide();
						let rows = res.data.data.rows;
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
							this.onscroll();
						}						
					}
				).catch(
					e => {
						console.log(e);
						this.$vux.loading.hide();
						this.$vux.toast.text('请求出错', 'middle')
					}
				)
			},
			onsubmit(){
				
				if(this.videoName.trim() != ''){
					this.$refs.search.setBlur();
					this.params.videoName = this.videoName.trim();
					this.params.page = 1;
					this.$vux.loading.show({
						text: '加载中'
					});
					this.getData();
				}else{
					this.$vux.toast.text('请输入关键字查询', 'top')
				}
				
			},
			oncancel(){
				if(this.params.videoName != ''){
					this.params.videoName = '';
					this.params.page = 1;
					this.$vux.loading.show({
						text: '加载中'
					});
					this.getData();
				}
				this.videoName = '';
				
			},
			onscroll(){
				this.scrollBody.addEventListener('scroll', this.scrollBottom, false);
			},
			scrollBottom(){
				var parentHeight = this.scrollBody.offsetHeight + this.$refs.viewBox.getScrollTop();
				var childHeight = this.scrollBody.children[0].offsetHeight;
				if(parentHeight >= childHeight){
					this.getData();
				}
			},
			routeTo(id){
				this.TITLE({title: '技巧详情'});
				this.$router.push({name: 'TradingDetail', params: {id: id}})
			}
		}
	}
</script>

<style>
</style>