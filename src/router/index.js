import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: "/",
            redirect: "/register"
        },
        {
            path: "/login",
            component:() => import ('../components/page/login')
        },
        {
            path: "/register",
            component: resolve =>
                require(["../components/page/register.vue"], resolve)
        },

    ],
    mode: 'history'
});
