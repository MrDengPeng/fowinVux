<template>
	<div class="warpper">
		<div class="tab-box vux-1px-b">
			<button-tab v-model="tabIndex">
				<button-tab-item>免费</button-tab-item>
				<button-tab-item>付费</button-tab-item>
			</button-tab>
		</div>
		<swiper v-model="tabIndex" :show-dots="false" height="100%">
			<swiper-item v-for="item in 2" :key="item">
				<view-box>
					<teaching-item v-for="item in 10" :key="item"/>
				</view-box>
			</swiper-item>
		</swiper>
	</div>
	
</template>

<script>
	import { ButtonTab, ButtonTabItem, ViewBox, Swiper, SwiperItem } from 'vux'
	import TeachingItem from '@/components/TeachingItem'
	export default {
		data () {
			return {
				tabIndex: 0
			}
		},
		components: {
			ButtonTab,
			ButtonTabItem,
			ViewBox,
			Swiper,
			SwiperItem,
			TeachingItem
		}
	}
</script>

<style lang="less" scoped>
	/*reset vux style start*/
	.tab-box{
		position: absolute;
		padding: 10px 85px;
		box-sizing: border-box;
		width: 100%;
		top: 0;
		left: 0;
		z-index: 2;
	}
	.vux-slider{
		height: 100%;
		padding-top: 55px;
		box-sizing: border-box;
	}
	.vux-button-group > a{
		height: 35px;
		color: #333;
		font-size: 15px;
		line-height: 35px;
	}
	.vux-button-group > a.vux-button-tab-item-first, .vux-button-group > a.vux-button-tab-item-first:after{
		border-top-left-radius: 10px;
    	border-bottom-left-radius: 10px;
	}
	.vux-button-group > a.vux-button-tab-item-last, .vux-button-group > a.vux-button-tab-item-last:after{
		border-top-right-radius: 10px;
    	border-bottom-right-radius: 10px;
	}
	/*reset vux style end*/
</style>
<style>
	.vux-swiper{
		background-color: #fff;
	}
</style>