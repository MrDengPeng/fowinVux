<template>
	<div>
		<div class="wrapper">
			<div class="head">
				<h1>{{data.skillName}}</h1>
				<p>时间：{{data.createTime | splitdate}}</p>
			</div>
			<p class="paragraph">{{data.content}}</p>
			<!--<p class="paragraph">人们之所以发生亏损，最主要的理由莫过于交易者尝试与趋势抗衡，想要猜测市场的头部或底部。交易者务必记住一句古老的市场格言：“趋势是你的朋友”，尽可能顺着趋势方向进行交易。胜算最高的交易，通常也都是顺着趋势方向进行的交易。</p>
			<p class="paragraph">如果你尝试与趋势抗衡，就等于与市场动能抗衡。市场趋势之所以存在，理由只有一个：市场参与者----整体而言---- 认为行情应该朝着某特定方向发展。在这种情况下，最好挑大的西瓜，站在市场动能的一边，不要站在另一边。不幸的，在趋势发展过程中，贪婪的心理经常促使很多人试图猜测市场的头部或底部。</p>
			<img class="img" src="../assets/images/img1.png"/>
			<p class="paragraph">趋势追随交易是技术分析在操作上最普遍被接受的原则之一，因为这也是胜算最高的交易方式。不幸的，市场经常缺乏明确的趋势。然而，只要出现明确的趋势，就千万不要错过。趋势追随交易之所以最容易获利，因为这代表阻力最小的价格发展路径。因此，交易者的首要任务，就是思考趋势追随的发展方向。一旦决定趋势方向之后，就必须假设部位最好都应该顺着趋势方向建立，除非有充分证据显示相反的情况。如果想判断长期趋势，则采用日线图、周线图与月线图。趋势延续的时间越长，其效力越高。
	</p>-->
		</div>
	</div>
</template>

<script>
	export default {
		name: 'TradingDetail',
		data(){
			return {
				data: {
					createTime: '',
					skillName: ''
				}
			}
		},
		props: ['id'],
		created(){
			this.getData();
		},
		methods: {
			getData(){
				this.$vux.loading.show({
					text: '加载中'
				})
				this.$http.post('/api/app/skill/findById.v1', {id: this.id}).then(
					res => {
						this.$vux.loading.hide();
						this.data = res.data.data;
					}
				).catch(
					e => {
						console.log(e);
						this.$vux.loading.hide();
						this.$vux.toast.text('请求出错', 'middle')
					}
				)
			}
		},
		watch: {
			'$route' (to, from) {
				to.name === 'TradingDetail' && this.getData();
			}
		}
	}
</script>

<style scoped>
	.wrapper{
		background-color: #fff;
		padding: 30px;
		min-height: 100%;
		box-sizing: border-box;
	}
	.img{
		display: block;
		width: 100%;
		margin-top: 20px;
	}
	.head{
		margin-bottom: 30px;
	}
	.head h1{
		font-size: 40px;
		color: #333;
	}
	.head p{
		font-size: 24px;
		line-height: 2.5em;
	}
	.paragraph{
		color: #333;
		font-size: 28px;
		margin-top: 20px;
	}
</style>