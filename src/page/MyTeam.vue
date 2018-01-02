<template>
	<div>
		<div class="top-head vux-1px-b" v-if="type">
			<div class="left"><span class="icon i-commun"></span>小组排名</div>
			<div class="right"><span class="more">查看更多</span></div>					
		</div>
		<div class="top-head vux-1px-b" v-else>
			<div class="left">组员（{{data.rankListDtos.length}}）</div>
			<div class="right"><a class="btn" @click="routeTo_M">{{identity_C}}</a></div>					
		</div>
		<user-ranking :data="{myRanking:data.name,myNetworth:data.networth,myProfit:data.profit,myAvatar:avatar_C}" type="Y" style="padding-top: 30px; padding-bottom: 15px;" />
		<div v-for="item in data.rankListDtos" class="g-userinfo-item vux-1px-t">
			<div class="left">
				<div class="g-avatar"><img :src="item.avatar"/></div>
				<div class="info">
					<div class="name">{{item.realName}}</div>
					<p class="text">净值：{{item.networth}}<br />收益率：{{item.profit}}%</p>
				</div>
			</div>
			<div class="right">
				<!--<a class="g-s-btn">我要退出</a>-->
			</div>
		</div>
		<div class="empty-list" v-if="empty"><span>暂无任何组员,赶紧去添加吧！</span></div>
	</div>
</template>

<script>
	import UserRanking from '@/components/UserRanking'
	export default {
		data(){
			return {
				type: false,
				data: {rankListDtos: []},
				empty: false
			}
		},
		props: ['matchId', 'teamId'],
		components: {
			UserRanking
		},
		created(){
			//初始化数据
			this.$post('/api/app/team/findCrew.v1', {matchId: this.matchId, teamId: this.teamId}).then(
				res => {
					if(res.rankListDtos.length == 0){
						this.empty = true;
					}
					this.data = res;
				}
			).catch(
				e => {
					console.log(e);
				}
			)
		},
		methods: {
			//进入添加组员或退出小组
			routeTo_M(){
				if(this.data.isCaptain == 'Y'){
					this.$router.push({name: 'CreateTeam', params: {id: this.matchId, num: this.data.rankListDtos.length}})
				}else{
					this.$post('/api/app/team/exitTeam.v1', {teamId: this.teamId}).then(
						res => {
							this.$vux.alert.show({
								title: '提示',
								content: '您已成功退出该小组',
								buttonText: '知道了',
								onHide: () => {
									this.$router.go(-1);
								}
							})
						}
					).catch(
						e => {
							console.log(e);
						}
					)
				}
				
			}
		},
		computed: {
			//当前用户是否为组长
			identity_C(){
				return this.data.isCaptain == 'Y' ? '+添加组员' : '我要退出'
			},
			//获取组长avatar
			avatar_C(){
				let list = this.data.rankListDtos
				let avatar = ''
				if(!list || list.length == 0){
					return avatar
				}
				list.some((item) => {
					if(item.isLeader == 'Y'){
						avatar = item.avatar;
						return true
					}
				})
				return avatar
			}
		}
	}
</script>

<style lang="less" scoped>
	.empty-list{
		position: absolute;
		top: 46px;
		right: 0;
		left: 0;
		bottom: 0;
		background-color: #fff;
		z-index: 99;
	}
	.empty-list span{
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%,-50%);
		color: #999;
	    font-size: 15px;
	    white-space: nowrap;
	}
</style>