<template>
  <div id="app">
  	<div v-transfer-dom>
      <loading v-model="isLoading"></loading>
    </div>
    <!-- main content -->
      <!--<view-box ref="viewBox" body-padding-top="0" body-padding-bottom="0">-->

        <!--<x-header slot="header"
        style="width:100%;position:fixed;left:0;top:0;z-index:100;"
        :left-options="leftOptions"
        :right-options="rightOptions"
        :title="title"
        :transition="headerTransition"
        @on-click-more="onClickMore">
        </x-header>-->

        <!-- remember to import BusPlugin in main.js if you use components: x-img and sticky -->

        	<transition        	
	        @after-enter="$vux.bus && $vux.bus.$emit('vux:after-view-enter')"
	        :name="viewTransition" :css="!!direction">
	        				<keep-alive include="CollegeList,CollegeDetail,TradingSkill,TradingDetail,VideoTeach,VideoDetail">
					        	<router-view class="router-view"></router-view>					        	
					        </keep-alive>
	        </transition>
	        <!--<transition        	
	        @after-enter="$vux.bus && $vux.bus.$emit('vux:after-view-enter')"
	        :name="viewTransition" :css="!!direction">
        					<router-view v-if="!$route.meta.cache" class="router-view"></router-view>
	        </transition>-->
	        <!--<transition
	        @after-enter="$vux.bus && $vux.bus.$emit('vux:after-view-enter')"
	        :name="viewTransition" :css="!!direction">
	          <router-view class="router-view"></router-view>
	        </transition>-->

      <!--</view-box>-->
  </div>
</template>

<script>
import { XHeader, Loading, TransferDom, ViewBox, querystring } from 'vux'
import { mapState, mapActions } from 'vuex'
import { appid } from '@/assets/js/http'

export default {
	name: 'app',
  directives: {
    TransferDom
  },
  components: {
  	ViewBox,
    XHeader,
    Loading
  },
  methods: {
    ...mapActions([
      'updateDemoPosition'
    ]),
    onClickMore(){
    	console.log(this.$refs.viewBox)
    }
  },
  created(){
			this.$post('/api/weixin/checkSignAtion', {url: location.href}).then(
				res => {
					if(typeof res === 'string'){
						res = JSON.parse(res);
					}
					this.wx.config({
					  //debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
					  appId: appid,//'wxa7e231e937a1d596', // 必填，公众号的唯一标识
					  timestamp: res.timestamp, // 必填，生成签名的时间戳
					  nonceStr: res.noncestr, // 必填，生成签名的随机串
					  signature: res.signature,// 必填，签名，见附录1
					  jsApiList: ['chooseImage','getLocalImgData'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
					});
				}
			)
		
  },
  mounted () {
    this.handler = () => {
      if (this.path === '/demo') {
        this.box = document.querySelector('#demo_list_box')
        this.updateDemoPosition(this.box.scrollTop)
      }
    }
    
  },
  beforeDestroy () {
    this.box && this.box.removeEventListener('scroll', this.handler, false)
  },
  computed: {
    ...mapState({
      route: state => state.route,
      path: state => state.route.path,
      title: 'title',
      deviceready: state => state.app.deviceready,
      demoTop: state => state.vux.demoScrollTop,
      isLoading: state => state.vux.isLoading,
      direction: state => state.vux.direction
    }),
    leftOptions () {
      return {
        showBack: true,
        backText: ''
      }
    },
    rightOptions () {
      return {
        showMore: false
      }
    },
    headerTransition () {
      if (!this.direction) return ''
      return this.direction === 'forward' ? 'vux-header-fade-in-right' : 'vux-header-fade-in-left'
    },
    viewTransition () {
      	if (!this.direction) return ''
      return 'vux-pop-' + (this.direction === 'forward' ? 'in' : 'out')
    }
  },
  data () {
    return {
    	
    }
  }
}
</script>
<style lang="less">
@import '~vux/src/styles/reset.less';
@import '~vux/src/styles/1px.less';
@import '~vux/src/styles/tap.less';
@import 'assets/style/common.css';

</style>
