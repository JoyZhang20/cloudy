import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
const router = new Router({
    base: '/cloudy/',
    routes: [{
            path: '/',
            redirect: "/start/login",
        },
        {
            path: '/start',
            component: () =>
                import ("@/components/start.vue"),
            redirect: "/start/login",
            children: [{
                    path: 'login',
                    component: () =>
                        import ("@/components/login.vue"),
                },
                {
                    path: 'register',
                    component: () =>
                        import ("@/components/register.vue"),
                },
            ]
        },
        {
            path: '/home',
            component: () =>
                import ("@/components/home.vue"),
            redirect: "/start/login",
            meta: {
                requireAuth: true
            },
            children: [{
                    path: 'clip/:phoneNumber',
                    component: () =>
                        import ("@/components/clip.vue"),
                },
                {
                    path: 'schedule/:phoneNumber',
                    component: () =>
                        import ("@/components/schedule.vue"),
                },
            ]
        }
    ]
})


router.beforeEach((to, from, next) => {
    if (to.matched.some(res => res.meta.requireAuth)) { // 判断是否需要登录权限
        if (localStorage.getItem('phoneNumber') == to.params.phoneNumber) { // 判断是否登录
            next()
        } else { // 没登录则跳转到登录界面
            next({
                path: '/start/login',
                query: { redirect: to.fullPath }
            })
        }
    } else {
        next()
    }
})
const VueRouterPush = Router.prototype.push
Router.prototype.push = function push(to) {
    return VueRouterPush.call(this, to).catch(err => err)
}
export default router