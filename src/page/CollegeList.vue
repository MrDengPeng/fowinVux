<template>
	<div>
		<tab active-color="#1e50ae" defaultColor="#333" bar-active-color="#1e50ae" class="college" style="position: absolute;top: 0;left: 0;width: 100%;z-index: 100;">
			<tab-item v-for="(item, index) in tabList" :selected="indexCur == index" :key="index" @on-item-click="onItemClick">{{item}}</tab-item>
		</tab>
		<swiper v-model="indexCur" :show-dots="false" height="100%" style="padding-top: 44px;box-sizing: border-box; height: 100%;">
			<swiper-item v-for="(item, index) in tabList" :key="index">
				<view-box body-padding-bottom="0" ref="viewBox">
					<event-template v-for="item in 10" :key="item" @click.native="link" />
				</view-box>
				
			</swiper-item>
		</swiper>
		
	</div>
</template>

<script>
	import { Tab, TabItem, Swiper, SwiperItem, ViewBox } from 'vux'
	import EventTemplate from '@/components/EventTemplate'
	
	export default {
		name: 'CollegeList',
		data () {
			return {
				tabList: ['当前赛事', '我要参赛', '历史赛事', '我的竞赛'],
				indexCur: 0
			}
		},
		components: {
			Tab,
			TabItem,
			Swiper,
			SwiperItem,
			ViewBox,
			EventTemplate
		},
		created(){
			
		},
		methods: {
			onItemClick (index) {
				this.indexCur = index;
				console.log(this.$refs.viewBox[index].getScrollTop())
			},
			link(){
				this.$router.push({name:'CollegeDetail'})
			}
		}
	}
</script>

<style lang="less">
	.college .vux-tab-item{
		font-weight: 500;
	}
</style>