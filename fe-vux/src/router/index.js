import Vue from 'vue'
import Router from 'vue-router'
import WxHome from '../components/home/wxHome'
import CompetitiveForm from '../components/competitive/mainForm'
import ArticleList from '../components/article/list'
import ArticleDetail from '../components/article/detail'
import AboutMe from '../components/me/myHome'
import LessonList from '../components/lesson/list'
import LessonDetail from '../components/lesson/detail'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: WxHome,
      meta: {
        title: 'Demo for WxApp'
      }
    },
    {
      path: '/me',
      component: AboutMe,
      meta: {
        title: 'Demo for WxApp'
      }
    },
    {
      path: '/lesson',
      component: LessonList,
      meta: {
        title: 'Demo for WxApp'
      }
    },
    {
      path: '/lesson/:id',
      component: LessonDetail,
      meta: {
        title: 'Competitive Form Demo for Mobile'
      }
    },
    {
      path: '/cc',
      component: CompetitiveForm,
      meta: {
        title: 'Competitive Form Demo for Mobile'
      }
    },
    {
      path: '/article',
      component: ArticleList,
      meta: {
        title: 'Competitive Form Demo for Mobile'
      }
    },
    {
      path: '/article/:id',
      component: ArticleDetail,
      meta: {
        title: 'Competitive Form Demo for Mobile'
      }
    }
  ]
})
