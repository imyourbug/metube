// export default router
import { createRouter, createWebHistory } from 'vue-router'
import Login from "../components/Login.vue";
// import Navbar from "../components/Navbar.vue";
import About from "../components/About.vue";
import Home from "@/components/Home.vue";
import SearchVideo from "@/components/homes/SearchVideo.vue";
import DetailVideo from "@/components/homes/DetailVideo.vue";
// import Error from "../components/Error.vue";

const routes = [
    {
        path: '/home',
        name: 'Home',
        component: Home,
        meta: {
            requiresAuth: true
        },
    },
    {
        path: '/videos/search',
        name: 'SearchVideo',
        component: SearchVideo,
        meta: {
            requiresAuth: true
        },
    },
    {
        path: '/videos/detail/:id',
        name: 'DetailVideo',
        component: DetailVideo,
        meta: {
            requiresAuth: true
        },
    },
    {
        path: '/about',
        name: 'About',
        component: About,
    },
    {
        path: '/login',
        name: 'Login',
        component: Login,
    },
    {
        // path: '/:pathMatch(.*)*',
        // name: 'Error',
        // component: Error,
    }
]

const router = createRouter({ history: createWebHistory(), routes });

// Middleware
router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (!localStorage.getItem('name')) {
            next('/login');
        } else {
            next();
        }
    } else {
        next();
    }
});

export default router
