// export default router
import { createRouter, createWebHistory } from 'vue-router'
import Login from "../components/Login.vue";
// import Navbar from "../components/Navbar.vue";
import About from "../components/About.vue";
import Home from "../components/Home.vue";
import Error from "../components/Error.vue";

const isUserLoggedIn = true;

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
        meta: {
            requireAuth: true
        },
        user: {}
    },
    {
        path: '/about',
        name: 'About',
        component: About,
        meta: {
            requireAuth: false
        },
        user: {}
    },
    {
        path: '/login',
        name: 'Login',
        component: Login,
        meta: {
            requireAuth: false
        },
        user: {}
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'Error',
        component: Error,
        meta: {
            requireAuth: false
        },
        user: {}
    }
]

const router = createRouter({ history: createWebHistory(), routes });

// Middleware
router.beforeEach((to, from, next) => {
    if (to.meta.requireAuth) {
        // console.log(from.user);
        if (from.user) {
            next('/');
        } else {
            next('/login');
        }
    } else {
        next();
    }
});

export default router
