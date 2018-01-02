// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import router from './router'
import store from './vuex'
import { sync } from 'vuex-router-sync'
import App from './App'
import { ScrollPlugin, randomString, hex_sha1 } from './assets/js/utils'
import { Http } from './assets/js/http'
Vue.use(ScrollPlugin)

require('amfe-flexible')
//require('./assets/js/rem')

FastClick.attach(document.body)

Vue.config.productionTip = false

import { querystring, DatetimePlugin, CloseDialogsPlugin, ConfigPlugin, BusPlugin, LocalePlugin, DevicePlugin, ToastPlugin, AlertPlugin, ConfirmPlugin, LoadingPlugin, WechatPlugin, AjaxPlugin, AppPlugin } from 'vux'

store.registerModule('vux', {
  state: {
    demoScrollTop: 0,
    isLoading: false,
    direction: 'forward'
  },
  mutations: {
    updateDemoPosition (state, payload) {
      state.demoScrollTop = payload.top
    },
    updateLoadingStatus (state, payload) {
      state.isLoading = payload.isLoading
    },
    updateDirection (state, payload) {
      state.direction = payload.direction
    }
  },
  actions: {
    updateDemoPosition ({commit}, top) {
      commit({type: 'updateDemoPosition', top: top})
    }
  }
})

sync(store, router)

// global VUX config
Vue.use(ConfigPlugin, {
  $layout: 'VIEW_BOX' // global config for VUX, since v2.5.12
})

// plugins
Vue.use(DevicePlugin)
Vue.use(ToastPlugin)
Vue.use(AlertPlugin)
Vue.use(ConfirmPlugin)
Vue.use(LoadingPlugin)
Vue.use(WechatPlugin)
Vue.use(AjaxPlugin)
Vue.use(BusPlugin)
Vue.use(DatetimePlugin)
Vue.use(CloseDialogsPlugin, router)

//启用http.js
Vue.use(Http)


Vue.filter('splitdate', function(time, index){
	if(!time){
		return ''
	}
	time = time.trim();
	if(time.length >= 19){
		return index ? time.substring(0, index) : time.substring(0, time.length-3)	
	}
	return time
})

// simple history management
const history = window.sessionStorage
history.clear()
let historyCount = history.getItem('count') * 1 || 0
history.setItem('/', 0)
let isPush = false
let endTime = Date.now()
let methods = ['push', 'go', 'replace', 'forward', 'back']

document.addEventListener('touchend', () => {
  endTime = Date.now()
})
methods.forEach(key => {
  let method = router[key].bind(router)
  router[key] = function (...args) {
    isPush = true
    method.apply(null, args)
  }
})

router.beforeEach(function (to, from, next) {
  store.commit('updateLoadingStatus', {isLoading: true})
  const toIndex = history.getItem(to.path)
  const fromIndex = history.getItem(from.path)

  if (toIndex) {
    if (!fromIndex || parseInt(toIndex, 10) > parseInt(fromIndex, 10) || (toIndex === '0' && fromIndex === '0')) {
      store.commit('updateDirection', {direction: 'forward'})
    } else {
      // 判断是否是ios左滑返回
      if (!isPush && (Date.now() - endTime) < 377) {
        store.commit('updateDirection', {direction: ''})
      } else {
        store.commit('updateDirection', { direction: 'reverse' })
      }
    }
  } else {
    ++historyCount
    history.setItem('count', historyCount)
    to.path !== '/' && history.setItem(to.path, historyCount)
    store.commit('updateDirection', {direction: 'forward'})
  }

  if (/\/http/.test(to.path)) {
    let url = to.path.split('http')[1]
    window.location.href = `http${url}`
  } else {
    next()
  }
})

router.afterEach(function (to) {
  isPush = false
  store.commit('updateLoadingStatus', {isLoading: false})
   
//if (process.env.NODE_ENV === 'production') {
//  ga && ga('set', 'page', to.fullPath)
//  ga && ga('send', 'pageview')
//}
})
const wx = Vue.wechat
//var noncestr = '6nxfZh2rhp68xPweda8fdRnhzKE57S74'//randomString()
//var timestamp = 1514359949//Date.now()
////let str = 'jsapi_ticket=kgt8ON7yVITDhtdwci0qeWgFWFiskGM4FAn7InNYWqejrw9Y4hLirtJ-YnvSPz23xoiiAgajsYNOb9caLVsuuQ&noncestr='+noncestr+'&timestamp='+timestamp+'&url=http://192.168.0.58:80/account/open'
//var str = 'jsapi_ticket=kgt8ON7yVITDhtdwci0qeWgFWFiskGM4FAn7InNYWqchAvobghhDCIDFepMNjJQayVqH_lOYxUoKuTc_lBACMg&noncestr=6nxfZh2rhp68xPweda8fdRnhzKE57S74&timestamp=1514359949&url=http://192.168.0.58:80/account/open'
//var signature = hex_sha1(str)
////
////
//console.log(signature)
//
//wx.config({
//  debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
//  appId: 'wxa7e231e937a1d596', // 必填，公众号的唯一标识
//  timestamp: 1514359949, // 必填，生成签名的时间戳
//  nonceStr: '6nxfZh2rhp68xPweda8fdRnhzKE57S74', // 必填，生成签名的随机串
//  signature: signature,// 必填，签名，见附录1
//  jsApiList: ['chooseImage'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
//});
Vue.prototype.wx = wx
/* eslint-disable no-new */
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app-box');

