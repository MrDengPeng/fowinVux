import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)


const routes = [{
  path: '/',
  component: (resolve) => { require(['@/page/CollegeList'], resolve) }
}]

export default new Router({
  routes
})

