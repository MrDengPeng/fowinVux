<template>
	<div>
		<div class="wrap" v-html="data.videoUrl" ref="wrap"></div>
	</div>
</template>

<script>
	import { mapMutations } from 'vuex'
	export default {
		name: 'VideoDetail',
		data(){
			return {
				data: {
					videoUrl: ''
				}
			}
		},
		props: ['id'],
		mounted(){
			this.getData();
		},
		beforeRouteLeave(to, from, next){
			console.log(to)
			if(to.path === '/teach'){
				 
				this.TITLE({title: '视频教学'})
			}
			next()
		},
		methods: {
			getData(){
				this.$post('api/app/video/findById.v1', {id: this.id}).then(
					res => {
						this.data = res;
						//给视频添加封面
						this.$nextTick().then(() => {
							let videos = this.$refs.wrap.getElementsByTagName('video')[0];
							if(videos){
								videos.poster = res.photoUrl;
							}
						})
					}
				).catch(
					e => {
						console.log(e);
					}
				)
			},
			...mapMutations(['TITLE'])
		},
		watch: {
			'$route' (to, from) {
				to.name === 'VideoDetail' && this.getData();				
			}
		}
	}
</script>

<style lang="less">
	.wrap > p{
		padding: 15px;
	}
	.wrap video{
		display: block;
		width: 100%;
	}
</style>