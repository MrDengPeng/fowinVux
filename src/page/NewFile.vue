<template>
	<div>123</div>
</template>

<script>
	import { XHeader, Loading, TransferDom, ViewBox, querystring } from 'vux'
	export default {
		created(){
			let obj = querystring.parse(location.search.substring(1))
		
			if(obj.code){
				this.$post('/api/weixin/checkRealAuthentication', {code: obj.code}).then(
					res => {
						let stateObj = querystring.parse(location.search.substring(1))
						localStorage.setItem('token',res.token);
						location.replace(stateObj.state)
					}
				)
			}
		}
	}
</script>

<style>
</style>