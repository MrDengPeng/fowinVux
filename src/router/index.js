import Vue from 'vue'
import Router from 'vue-router'



Vue.use(Router)


const routes = [
	{
	  path: '*',
	  redirect: '/college'
	},
	{
	  path: '/college',
	  name: 'CollegeList',
	  component: (resolve) => { require(['@/page/CollegeList'], resolve) }
	},
	{
	  path: '/college/detail',
	  name: 'CollegeDetail',
	  component: (resolve) => { require(['@/page/CollegeDetail'], resolve) }
	},
	{
	  path: '/ranking',
	  name: 'RankingAll',
	  component: (resolve) => { require(['@/page/RankingAll'], resolve) }
	},
	{
	  path: '/team',
	  name: 'MyTeam',
	  component: (resolve) => { require(['@/page/MyTeam'], resolve) }
	},
	{
	  path: '/teamlist',
	  name: 'TeamList',
	  component: (resolve) => { require(['@/page/TeamList'], resolve) }
	},
	{
	  path: '/createteam',
	  name: 'CreateTeam',
	  component: (resolve) => { require(['@/page/CreateTeam'], resolve) }
	},
	{
	  path: '/teach',
	  component: (resolve) => { require(['@/page/VideoTeach'], resolve) }
	},
	{
	  path: '/skill',
	  name: 'skill',
	  component: (resolve) => { require(['@/page/TradingSkill'], resolve) }
	},
	{
	  path: '/skill/detail/:id',
	  name: 'TradingDetail',
	  component: (resolve) => { require(['@/page/TradingDetail'], resolve) },
	  props: true
	},
	{
	  path: '/skill',
	  name: 'skill',
	  component: (resolve) => { require(['@/page/TradingSkill'], resolve) }
	},
	{
	  path: '/account/:type',
	  name: 'OpenAccount',
	  component: (resolve) => { require(['@/page/OpenAccount'], resolve) },
	  props: true
	},
	{
	  path: '/survey',
	  name: 'QuestionSurvey',
	  component: (resolve) => { require(['@/page/QuestionSurvey'], resolve) }
	}
]

export default new Router({
  routes
})

