<template>
	<div>
		<div v-transfer-dom>
			<x-dialog v-model="dialogShow" :dialog-style="{'border-radius': '5px'}">
				<div class="dia-head">					
					<x-icon type="ios-close-empty" size="30" class="close" @click.native="dialogBtn_M"></x-icon>
					<img src="../assets/images/i_dialogTwo.png"/>
				</div>
				<div class="dia-body">
					<div class="tit white-space">{{dialogTitle}}</div>
					<p>{{dialogText}}</p>
					<x-button :gradients="['#669bff', '#1e50ae']" @click.native="dialogBtn_M" style="border-radius: 20px;height: 40px;" class="btn">{{type=='open'||type=='upload'?'我知道了':'去完善'}}</x-button>					
				</div>
			</x-dialog>
		</div>
		
		<group class="account" v-if="type!='upload'" label-width="4.5em" label-margin-right="15px" style="color: #333;">
			<popup-picker title="认证类型" v-model="attestType" :data="[['高校', '社会']]" value-text-align="left" />
			<x-input title="真实姓名" v-model="realName" placeholder="请输入真实姓名" :max="5" :required="true" />
			<x-input title="身份证" type="number" v-model="idcard" placeholder="请输入身份证号" :max="18" :required="true"/>
			<x-input title="手机号" type="tel" is-type="china-mobile" v-model="telphone" placeholder="请输入手机号" :max="11" :required="true"/>
			<x-input title="邮箱" type="email" is-type="email" v-model="email" placeholder="请输入邮箱" :max="26" :required="true" />
			<popup-picker title="学校/年级" v-if="attestType[0]!='社会'" v-model="curSchool" :columns="2" :data="schoolData" value-text-align="left" />
			<x-input :title="attestType[0]!='社会'?'详细信息':'地址'" v-model="address" :placeholder="attestType[0]!='社会'?'如：金融2班':'请输入地址'" :max="20" :required="true" />
		</group>
		
		<div v-if="type!='sign'">
			<group-title>上传身份证</group-title>
			<div class="photo-box">
				<div>
					<div class="photo-item ident one" @click="chooseImage_M(1)">
						<img class="img" v-if="cardImg1" :src="cardImg1"/>
						<img class="bg-img" src="../assets/images/i_identbig.png"/>
						<div class="camera"></div>
					</div>
					<p class="p1">身份证正面</p>
				</div>
				<div>
					<div class="photo-item ident two" @click="chooseImage_M(2)">
						<img class="img" v-if="cardImg2" :src="cardImg2"/>
						<img class="bg-img" src="../assets/images/i_identbig.png"/>
						<div class="camera"></div>
					</div>
					<p class="p1">身份证反面</p>
				</div>
			</div>
			<group-title>其他认证证明</group-title>
			<div class="photo-box">
				<div>
					<div class="photo-item" :class="{border: !cardImg3}" @click="chooseImage_M(3)">
						<img class="img" v-if="cardImg3" :src="cardImg3"/>
						<img class="bg-img" src="../assets/images/i_identbig.png"/>
						<div class="camera"></div>
					</div>
				</div>
				<div>
					<div class="photo-item" :class="{border: !cardImg4}" @click="chooseImage_M(4)">
						<img class="img" v-if="cardImg4" :src="cardImg4"/>						
						<img class="bg-img" src="../assets/images/i_identbig.png"/>
						<div class="camera"></div>
					</div>
				</div>
			</div>
			<div class="tip">请上传驾驶证正反面照片，如果没有驾驶证可上传三个月内的水
电、物业、信用卡对账单（其中一个月内的即可）</div>
		</div>
		
		<div v-if="type!='upload'" class="protocol">
			<check-icon :value.sync="checked" type="plain" class="check"></check-icon>
			<p>我已阅读并同意接受TMC的<a href="/src/assets/file/Trademax-Financial-Services-Guide-2.pdf">《客户协议》</a>、<a href="/src/assets/file/Trademax-Financial-Services-Guide-2.pdf">《金融服务指南》</a>、<a href="/src/assets/file/Trademax-Privacy-Policy-3.pdf">《隐私条款》</a>、<a href="/src/assets/file/Trademax-Group-Product-Disclosure-Statement-4.pdf">《产品披露声明》</a>、<a href="/src/assets/file/Trademax-Group-Risk-Disclosure-5.pdf">《风险声明》</a>，并允许通过CRA进行身份信息验证。</p>
		</div>
		
		<div class="g-b-btnbox">
			<x-button @click.native="onsubmit" :gradients="['#669bff', '#1e50ae']" style="border-radius: 20px;">{{btnText_C}}</x-button>
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
				attestType: ['高校'],
				realName: '',
				idcard: '',
				telphone: '',
				email: '',
				address: '',
				curSchool: [],
				schoolData: [],
				grade: ['一年一班'],
				info: '',
				checked: false,
				dialogTitle: '已提交，系统审核中',
				dialogText: '开户成功会有消息提示，请耐心等待',
				cardImg1: '',
				cardImg2: '',
				cardImg3: '',
				cardImg4: '',
			}
		},
		props: ['type'],
		created(){						
			//切换title
			let title = ''
			switch(this.type){
				case 'open': title = '开户';break;
				case 'sign': title = '填写资料';break;
				case 'upload': title = '上传';break;
			}
			this.$store.commit('TITLE',{title: title})
		},
		mounted(){
			//请求联动数据
			this.$post('/api/app/member/findSchoolForSelect.v1',{}).then(
				res => {
					if(typeof res === 'string'){
						res = JSON.parse(res)
					}
					let arr = []
					for(let i = 0; i < res.length; i++){
						let child = res[i].child
						child.push('其他');
						let parentObj = {parent: 0}
						parentObj.name = parentObj.value = res[i].parent;
						arr.push(parentObj);
						for(let j = 0; j < child.length; j++){
							let childObj = {parent: res[i].parent}
							childObj.name = childObj.value = child[j];
							arr.push(childObj);
						}
					}
					this.schoolData = arr;
				}
			)
			//切换弹窗text
			if(this.type == 'sign'){
				this.dialogTitle = '报名成功';
				this.dialogText = '需要在比赛前完善报名信息,以便开户\n如未完善将取消本次报名';
			}
			
		},
		beforeRouteUpdate (to, from, next) {
			//切换弹窗text
			if(this.type == 'sign'){
				this.dialogTitle = '已提交，系统审核中';
				this.dialogText = '开户成功会有消息提示，请耐心等待';
			}
			next()
		},
		computed: {
			//切换btn text
			btnText_C(){
				return this.type == 'open' ? '立即提交' : this.type == 'sign' ? '确认报名' : '上传'
			}
		},
		methods: {
			onsubmit(){
				//报名参数
				let params = {
					attestType: 'S',
					realName: this.realName,
					idcard: this.idcard,
					telphone: this.telphone,
					email: this.email,
					address: this.address
				}
				if(this.type == 'open' || this.type == 'sign'){
					if(params.realName == ''){
						this.$vux.toast.text('请填写您的姓名');
						return
					}
					if(params.idcard == '' || !/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(params.idcard)){
						this.$vux.toast.text('请填写正确的身份证号');
						return
					}
					if(params.telphone == '' || !/^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/.test(params.telphone)){
						this.$vux.toast.text('请填写正确的手机号');
						return
					}
					if(params.email == '' || !/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(params.email)){
						this.$vux.toast.text('请填写正确的邮箱');
						return
					}
					if(this.attestType[0] === '高校'){
						params.attestType = 'G';
						params.school = this.curSchool[0];
						params.grade = this.curSchool[1];
						if(!params.school){
							this.$vux.toast.text('请选择您的学校');
							return
						}
						if(params.address == ''){
							this.$vux.toast.text('请填写您的详细信息');
							return
						}
					}else{
						if(params.address == ''){
							this.$vux.toast.text('请填写您的地址');
							return
						}
					}
				}
				
				//开户参数
				if(this.type === 'open'){
					params.idcardFaceUrl = this.cardImg1;
					params.idcardBackUrl = this.cardImg2;
					params.materialUrl = this.cardImg3+','+this.cardImg4;
				}
				/*上传参数*/
				if(this.type == 'upload'){
					params = {
						idcardFaceUrl: this.cardImg1,
						idcardBackUrl: this.cardImg2,
						materialUrl: this.cardImg3+','+this.cardImg4
					}
				}
				if(this.type == 'open' || this.type == 'upload'){
					let text = ''
					if(params.idcardFaceUrl == ''){
						text = '请上传您的身份证正面';
					}else if(params.idcardBackUrl == ''){
						text = '请上传您的身份证背面';
					}else if(params.materialUrl == ','){
						text = '请上传您的其他证明';
					}
					if(text != ''){
						this.$vux.toast.text(text,'middle')
						return
					}
				}
				if(!this.checked && this.type != 'upload'){
					this.$vux.toast.text('请勾选协议');
					return
				}
				console.log(params);
//				this.dialogShow = true;
//				return
				this.$post('/api/app/member/update.v1', params).then(
					res => {
						localStorage.setItem('statu',res.examineState);
						this.dialogShow = true; 
					}
				).catch(
					e => {
						console.log(e);
					}
				)
			},
			//关闭弹窗
			dialogBtn_M(){
				this.dialogShow = !this.dialogShow; 
				if(this.type == 'sign'){
					this.$router.replace('/account/upload')//进入上传
				}else{
					this.$router.go(-1);
				}
			},
			//拍照
			chooseImage_M(index){
				this.wx.chooseImage({
					count: 1, // 默认9
					sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
					success:  (res) => {						
						var localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
						//window.wxjs_is_wkwebview
						this.wx.getLocalImgData({
							localId: localIds[0],
							success: (res) => {
								var pre = res.localData.split(',')[0].split(';')[0],     //上传的图片排除头部后的数据
                    				result = pre.slice(11);
                    				if(result == 'jgp'){
                    					result = 'jpeg'
                    				}
                    			var base64 = res.localData.split(',')[1];//res.localData.replace(/jgp/,'jpeg')
								this.$post('/api/file/uploadBase64Img.v1', {fileStr: base64, suffix: result}).then(
									res => {
										this['cardImg'+index] = res;
									}
								)								
							}
						})
					}
				});
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
	.account .weui-cells{
		font-size: 16px;
		margin-top: 10px;
	}
	.account .vux-popup-picker-value.vux-cell-value{
		color: #333;
	}
</style>
<style lang="less" scoped>
	.photo-box{
		display: flex;
		background-color: #fff;
		color: #999;
		font-size: 12px;
		padding: 15px 0;
		justify-content: space-between;
		padding-bottom: 10px;
	}
	.photo-box > div{
		flex: 1;
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
	.photo-item{
		width: 90%;
		background-color: #fff;
		position: relative;
		border-radius: 5px;
		overflow: hidden;
		margin: 0 auto;
	}
	.photo-item.border{
		border: 1px #ddd dashed;
	}
	.photo-item .img{
		display: block;
		width: 100%;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		z-index: 1;
		min-height: 100%;
	}
	.photo-item .bg-img{
		display: block;
		width: 100%;
		height: auto;
		opacity: 0;
	}
	.photo-item.ident{
		background-repeat: no-repeat;
		background-position: center;
		background-size: 135px 75px;
		
		box-shadow: 0 0 3px rgba(51, 122, 255, .2);
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
		width: 60px;
		height: 60px;
		border-radius: 50%;
		overflow: hidden;
		background: url(../assets/images/i_camera.png) no-repeat center/24px 20px, linear-gradient(to left, #1e50ae, #669bff);
		opacity: .7;
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
	.check.vux-check-icon > .weui-icon-success:before, .check.vux-check-icon > .weui-icon-success-circle:before{
		color: #1E50AE;
	}
	.protocol a{
		color: blue;
		text-decoration: underline;
	}
	/*.photo-item{
		width: 330px;
		height: 200px;
		background-color: #fff;
		position: relative;
		border-radius: 10px;
		overflow: hidden;
	}
	.photo-item.border{
		border: 1px #ddd dashed;
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
	}*/
</style>