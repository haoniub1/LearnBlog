import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
// q 这个什么时候被调用呢？是显示调用还是框架内部隐式调用？
// a 显式调用。main.ts 里 import router from './router' 时执行这个文件，createRouter() 被调用。
// a 然后 main.ts 里 app.use(router) 把它注册到 Vue，Vue 内部开始监听 URL 变化。
const router = createRouter({
  //q 这两个参数全是options？
  //a 对，一个配置对象。history 是路由模式（这里用 History API），routes 是路由表。
  //a 类比 Go 的 http.Server{ Addr: ":8080", Handler: mux }
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/archive',
      name: 'archive',
      component: () => import('../views/ArchiveView.vue'),
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
    },
    {
      path:'/test',
      name:'test',
      component:() => import('../views/TestView.vue')
    }
  ],
})

export default router
