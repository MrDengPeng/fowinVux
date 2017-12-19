<template>
	<div class="wrap">
		<div v-transfer-dom>
			<x-dialog v-model="dialogShow" :dialog-style="{'border-radius': '5px'}">
				<div class="dia-head">					
					<x-icon type="ios-close-empty" size="30" class="close" @click.native="dialogShow = !dialogShow"></x-icon>
					<img src="../assets/images/i_dialogTwo.png"/>
				</div>
				<div class="dia-body">
					<div class="tit white-space">已提交，系统审核中</div>
					<p>开户成功会有消息提示，请耐心等待</p>
					<x-button :gradients="['#669bff', '#1e50ae']" @click.native="dialogBtnTap" style="border-radius: 20px;height: 40px;" class="btn">{{type=='open'?'我知道了':'去完善'}}</x-button>					
				</div>
			</x-dialog>
		</div>
		<group v-if="type!='upload'" label-width="4.5em" label-margin-right="15px" style="color: #333;">
			<popup-picker title="认证类型" v-model="typeValue" :data="[['社会', '高校']]" value-text-align="left" />
			<x-input title="真实姓名" v-model="name" placeholder="请输入真实姓名" :max="5" :required="true" />
			<x-input title="身份证" type="number" v-model="identCard" placeholder="请输入身份证号" :max="18" :required="true"/>
			<x-input title="手机号" type="tel" is-type="china-mobile" v-model="mobile" placeholder="请输入手机号" :max="11" :required="true"/>
			<x-input title="邮箱" type="email" is-type="email" v-model="email" placeholder="请输入邮箱" :max="26" :required="true" />
			<x-textarea title="地址" v-if="typeValue[0]=='社会'" v-model="address" :rows="2" placehoder="请填写地址" :required="true" />
			<popup-picker title="学校" v-if="typeValue[0]!='社会'" v-model="scholl" :data="[['清华', '北大', '深大']]" value-text-align="left" />
			<popup-picker title="年级" v-if="typeValue[0]!='社会'" v-model="grade" :data="[['一年一班', '一年二班', '一年三班']]" value-text-align="left" />
			<x-input title="详细信息" v-if="typeValue[0]!='社会'" v-model="info" placeholder="如：金融2班" :max="20" :required="true" />
		</group>
		
		<div v-if="type!='sign'">
			<group-title>上传身份证{{type}}</group-title>
			<div class="photo-box">
				<div>
					<div class="photo-item ident one">
						<img src="../assets/images/img1.png"/>
						<div class="camera"></div>
					</div>
					<p class="p1">身份证正面</p>
				</div>
				<div>
					<div class="photo-item ident two">
						
						<div class="camera"></div>
					</div>
					<p class="p1">身份证反面</p>
				</div>
			</div>
			<group-title>其他认证证明</group-title>
			<div class="photo-box">
				<div>
					<div class="photo-item border">
						<div class="camera"></div>
					</div>
				</div>
				<div>
					<div class="photo-item">
						<img src="../assets/images/img1.png"/>
						<div class="camera"></div>
					</div>
				</div>
			</div>
			<div class="tip">请上传驾驶证正反面照片，如果没有驾驶证可上传三个月内的水
电、物业、信用卡对账单（其中一个月内的即可）</div>
		</div>
		
		<div v-if="type!='upload'" class="protocol">
			<check-icon :value.sync="checked" type="plain" class="check"></check-icon>
			<p>我已阅读并同意接受TMC的<a href="static/file/Trademax-Group-Client-Agreement-1.pdf">《客户协议》</a>、<a href="static/file/Trademax-Financial-Services-Guide-2.pdf">《金融服务指南》</a>、<a href="static/file/Trademax-Privacy-Policy-3.pdf">《隐私条款》</a>、<a href="static/file/Trademax-Group-Product-Disclosure-Statement-4.pdf">《产品披露声明》</a>、<a href="static/file/Trademax-Group-Risk-Disclosure-5.pdf">《风险声明》</a>，并允许通过CRA进行身份信息验证。</p>
		</div>
		<div class="g-b-btnbox">
			<x-button :gradients="['#669bff', '#1e50ae']" @click.native="dialogShow = !dialogShow" style="border-radius: 20px;">{{btnText}}</x-button>
		</div>
	</div>
</template>

<script>
	import { Group, XInput, PopupPicker, XTextarea, GroupTitle, XButton, XDialog, CheckIcon, TransferDomDirective as TransferDom } from 'vux'
	export default {
		name: 'OpenAccount',
		directives: {
			TransferDom
		},
		data () {
			return {
				dialogShow: false,
				typeValue: ['社会'],
				name: '',
				identCard: '',
				mobile: '',
				email: '',
				address: '',
				scholl: ['清华'],
				grade: ['一年一班'],
				info: '',
				checked: true
			}
		},
		props: ['type'],
		computed: {
			btnText(){
				return this.type == 'open' ? '立即提交' : this.type == 'sign' ? '确认报名' : '上传'
			}
		},
		methods: {
			dialogBtnTap(){
				this.dialogShow = !this.dialogShow; 
				switch(this.type){
					case 'open': 						
						break;
					case 'sign':
						this.$router.push('/account/upload');
						break;
				}
			}
		},
		components: {
			Group,
			XInput,
			PopupPicker,
			XTextarea,
			GroupTitle,
			XButton,
			XDialog,
			CheckIcon
		}
	}
</script>

<style lang="less">
	.wrap .weui-cells{
		font-size: 16px;
		margin-top: 10px;
	}
	.vux-popup-picker-value.vux-cell-value{
		color: #333;
	}
</style>
<style lang="less" scoped>
	.photo-box{
		display: flex;
		background-color: #fff;
		color: #999;
		font-size: 12px;
		padding: 15px;
		justify-content: space-between;
		padding-bottom: 10px;
	}
	.photo-box .p1{
		text-align: center;
		margin-top: 6px;
	}
	.tip{
		background-color: #fff;
		font-size: 12px;
		color: #999;
		padding: 0 15px 10px;
	}
</style>
<style>
	.protocol{
		position: relative;
		padding: 15px 15px 15px 40px;/*no*/
		color: #333;
		font-size: 12px;/*no*/
	}
	.protocol p{
		color: #666;
	}
	.protocol .check{
		position: absolute;
		left: 8px;/*no*/
		top: 15px;/*no*/
	}
	.protocol a{
		color: blue;
		text-decoration: underline;
	}
	.photo-item{
		width: 330px;
		height: 200px;
		background-color: #fff;
		position: relative;
		border-radius: 10px;
		overflow: hidden;
	}
	.photo-item.border{
		border: 1px #ddd dashed;/*no*/
	}
	.photo-item img{
		display: block;
		width: 100%;
		position: relative;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		z-index: 1;
	}
	.photo-item.ident{
		background-repeat: no-repeat;
		background-position: center;
		background-size: 270px 150px;
		
		box-shadow: 0 0 7px rgba(51, 122, 255, .2);
	}
	.photo-item.ident.one{
		background-image: url(../assets/images/i_identOne.png);
	}
	.photo-item.ident.two{
		background-image: url(../assets/images/i_identTwo.png);
	}
	.camera{
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		z-index: 0;
		width: 120px;
		height: 120px;
		border-radius: 50%;
		overflow: hidden;
		background: url(../assets/images/i_camera.png) no-repeat center/50px 41px, linear-gradient(to left, #1e50ae, #669bff);
		opacity: .7;
	}
	
</style>