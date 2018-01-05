import Vue from 'vue'
import Router from 'vue-router'



Vue.use(Router)


const routes = [
	{
	  path: '*',
	  redirect: '/college'
	},
	{
	  path: '/new',
	  name: 'new',
	  component: (resolve) => { require(['@/page/NewFile'], resolve) }
	},
	{
	  path: '/college',
	  name: 'CollegeList',
	  component: (resolve) => { require(['@/page/CollegeList'], resolve) }
	},
	{
	  path: '/college/detail/:id',
	  name: 'CollegeDetail',
	  component: (resolve) => { require(['@/page/CollegeDetail'], resolve) },
	  props: (route) => ({id: route.params.id, type: route.query.type})
	},
	{
	  path: '/ranking/:rankType',
	  name: 'RankingAll',
	  component: (resolve) => { require(['@/page/RankingAll'], resolve) },
	  props: true
	},
	{
	  path: '/team/:matchId/:teamId',
	  name: 'MyTeam',
	  component: (resolve) => { require(['@/page/MyTeam'], resolve) },
	  props: true
	},
	{
	  path: '/teamlist/:id',
	  name: 'TeamList',
	  component: (resolve) => { require(['@/page/TeamList'], resolve) },
	  props: true
	},
	{
	  path: '/createteam/:id',
	  name: 'CreateTeam',
	  component: (resolve) => { require(['@/page/CreateTeam'], resolve) },
	  props: true
	},
	{
	  path: '/teach',
	  name: 'VideoTeach',
	  component: (resolve) => { require(['@/page/VideoTeach'], resolve) }
	},
	{
	  path: '/teach/detail/:id',
	  name: 'VideoDetail',
	  component: (resolve) => { require(['@/page/VideoDetail'], resolve) },
	  props: true
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
	  path: '/account/:type',
	  name: 'OpenAccount',
	  component: (resolve) => { require(['@/page/OpenAccount'], resolve) },
	  props: true
	},
	{
	  path: '/survey',
	  name: 'QuestionSurvey',
	  component: (resolve) => { require(['@/page/QuestionSurvey'], resolve) }
	},
	{
	  path: '/about',
	  name: 'AboutHy',
	  component: (resolve) => { require(['@/page/AboutHy'], resolve) }
	}
]

export default new Router({

  routes
})

