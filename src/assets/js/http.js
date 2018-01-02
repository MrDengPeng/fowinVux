/**
 * Created by xqj on 17/11/20.
 */
import axios from 'axios';
import qs from 'qs';
//import { ToastPlugin, LoadingPlugin } from 'vux'
//localStorage.removeItem('token')
const token = localStorage.getItem('token')


var instance = axios.create({
    baseURL: 'http://192.168.0.50:8080/Fowin/',
    headers: { 
    	'Content-Type': 'application/x-www-form-urlencoded',
    },
    timeout: 100000,
    transformRequest: [ (data) => {
//		Object.assign(data, {token: '6a766615b59863dabf2543f44f1d91c8'})
		Object.assign(data, {token: token})
		console.log(data);
		return qs.stringify(data)
	} ]
});

function HttpPlugin() {}

HttpPlugin.prototype.install = function(Vue, options){
	var that = this;
	this.Vue = Vue;
	Vue.prototype.$get = function (url, urlParams, params, options = {}) {
        options.urlParams = urlParams;
        return that.request('GET', url, params, options);
   }
    Vue.prototype.$post = function (url, params, options = {loading: true, allData: false}, urlParams = {}) {
        options.urlParams = urlParams;
        return that.request('POST', url, params, options);
    }
    // 目前只用于登录
    Vue.prototype.$submit = function (url, params, options = {}) {
        return that.submit(url, params, options);
    }
    //  文件上传
    Vue.prototype.$upload = function (url, params, options = {}) {
        return that.upload(url, params, options)
    }
}

HttpPlugin.prototype.request = function (methods, url, params, options = {}) {
    if (options.urlParams) {
        var arr = Object.keys(options.urlParams);
        for (let i = 0; i < arr.length; i++) {
            url = url.replace('{' + arr[i] + '}', options.urlParams[arr[i]]);
        }
    }

    switch (methods) {
        case 'GET':
            return this.get(url, params, options);
        case 'POST':
            return this.post(url, params, options);
    }
}
HttpPlugin.prototype.post = function (url, params, options = {}) {
    options.loading && this.Vue.$vux.loading.show({
    	text: '加载中'
    })
    return new Promise((resolve, reject) => {
        instance.post(url, params, options.config).then(
        	res => {
                this.handlerSuccess(res, resolve, reject, options.allData);
            }
        ).catch(
        	e => {
                this.handlerError(e, reject);
            }
        );
    })
}
HttpPlugin.prototype.get = function (url, params, options) {
    return new Promise((resolve, reject) => {
        options.params = params;
        instance.get(
            url,
            options.params,
            options.config
        ).then((result) => {
            this.handlerSuccess(result, resolve, reject)
        }).catch((e) => {
            this.handlerError(e, reject);
        })
    })
}
HttpPlugin.prototype.submit = function (url, params, options = {}) {
    options.config = {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        transformRequest: [function (data) {
            // 这里可以在发送请求之前对请求数据做处理，比如form-data格式化等，这里可以使用开头引入的Qs（这个模块在安装axios的时候就已经安装了，不需要另外安装）
            data = Qs.stringify(data);
            return data;
        }]
    }
    return this.post(url, params, options)
}
HttpPlugin.prototype.upload = function (url, params, options = {}) {
    options.config = {
        headers: { 
            'Content-Type': 'multipart/form-data'
        }
    }
    return this.request('POST', url, params, options)
}
HttpPlugin.prototype.handlerSuccess = function (res, resolve, reject, allData) {
	console.log(res.data)
	this.Vue.$vux.loading.hide();
    // 请求成功
    if (res.data.code == 0) {
    	let data = allData ? res.data : res.data.data
        resolve(data);
        return;
    }else if(res.data.code == 11000){
  		let params = encodeURIComponent(location.href)
  		let url = encodeURIComponent('http://192.168.0.58/#/new')
		location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxa7e231e937a1d596&redirect_uri='+url+'&response_type=code&scope=snsapi_userinfo&state='+params+'#wechat_redirect'
      	
    }else{
    	this.Vue.$vux.toast.text(res.data.msg);
    	reject(res);
    }
    
}
HttpPlugin.prototype.handlerError = function (error, reject) {
	this.Vue.$vux.loading.hide();
	let text = '请求出错404'	
    if (error.message.match("timeout")) {
    	text = '连接超时，请稍后再试';             
    }
    if (error.message.match("Network Error")) {
    	text = '服务器出小差了，请稍后再试';
    }
    this.Vue.$vux.toast.text(text, 'middle');
    reject()
}
let Http = new HttpPlugin()
export {
	Http
}
