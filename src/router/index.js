import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import store from '../store'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
        children: [
            {
                path: '',
                component: () =>
                    import(
                        /* webpackChunkName: "library" */ '../views/home/library.vue'
                    ),
            },
            {
                path: '/user',
                component: () =>
                    import(
                        /* webpackChunkName: "user" */ '../views/home/user.vue'
                    ),
            },
            {
                path: 'library',
                component: () =>
                    import(
                        /* webpackChunkName: "library" */ '../views/home/library.vue'
                    ),
            },
            {
                path: 'subject/:id?',
                component: () =>
                    import(
                        /* webpackChunkName: "subject" */ '../views/home/subject.vue'
                    ),
            },
            {
                path: 'opinion',
                component: () =>
                    import(
                        /* webpackChunkName: "opinion" */ '../views/home/opinion.vue'
                    ),
            },
        ],
    },
    {
        path: '/login',
        name: 'Login',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import(/* webpackChunkName: "login" */ '../views/login.vue'),
    },
]

const router = new VueRouter({
    mode: 'hash',
    base: process.env.BASE_URL,
    routes,
})

router.beforeEach((to, from, next) => {
    if (!store.state.user.userId && to.path !== '/login') {
        next('/login')
        return
    }
    next()
})

export default router
