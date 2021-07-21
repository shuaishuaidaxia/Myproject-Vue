import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import OPtion1 from '../views/OPtion1'
import Option2 from '../views/Option2'
import usermanger from '../views/user-manger'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    children: [
      {
        // 当 /user/:id/profile 匹配成功，
        // UserProfile 会被渲染在 User 的 <router-view> 中
        path: '/option1',
        component: OPtion1,
        name: 'option1'
      },
      {
        // 当 /user/:id/posts 匹配成功
        // UserPosts 会被渲染在 User 的 <router-view> 中
        path: '/option2',
        name: 'option2',
        component: Option2,
        children: [
          {
            path: 'usermanger',
            name: 'usermanger',
            component: usermanger
          }
        ]
      }
    ]

  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
