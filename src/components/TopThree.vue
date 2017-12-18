<template>
	<div class="box">
		<flexbox align="flex-end">
			<flexbox-item>
				<div class="item-box two g-boxshadow">
					<div class="name">唐江涛</div>
					<p class="data">146927.9<br />65.39%</p>
				</div>
			</flexbox-item>
			<flexbox-item>
				<div class="item-box one g-boxshadow">
					<div class="name">唐江涛</div>
					<p class="data">146927.9<br />65.39%</p>
				</div>
			</flexbox-item>
			<flexbox-item>
				<div class="item-box three g-boxshadow">
					<div class="name">唐江涛</div>
					<p class="data">146927.9<br />65.39%</p>
				</div>
			</flexbox-item>
		</flexbox>
	</div>
</template>

<script>
	import { Flexbox, FlexboxItem} from 'vux'
	export default {
		components: {
			Flexbox,
			FlexboxItem
		}
	}
</script>

<style lang="less" scoped>
	.box{
		background-color: #fff;
		padding: 0 10px;
	}
	.item-box{
		padding-top: 55px;
		background-position: center top;
		background-repeat: no-repeat;
		background-size: 40px 55px;
		font-size: 12px;
		color: #333;
		text-align: center;
		border-radius: 5px;
		height: 117px;
		box-sizing: border-box;
	}
	.item-box.one{
		height: 127px;
		background-image: url(../assets/images/i_badge1.png);
	}
	.item-box.two{
		background-image: url(../assets/images/i_badge2.png);
	}
	.item-box.three{
		background-image: url(../assets/images/i_badge3.png);
	}
	.item-box.one .name{
		font-size: 16px;
	}
	.item-box.one .data{
		font-size: 14px;
	}
	.item-box .name{
		color: #1E50AE;
		font-size: 14px;
		font-weight: 500;
	}
	.item-box .data{
		line-height: 1.3;
		padding: 5px;
	}
</style>