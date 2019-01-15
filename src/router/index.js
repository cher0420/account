import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: "/",
            redirect: "/login"
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
        {
            path: "/serviceProtocol",
            component: resolve =>
                require(["../components/page/serviceAgreement.vue"], resolve)
        },
        {
            path: "/privacyStatement",
            component: resolve =>
                require(["../components/page/privacyStatement.vue"], resolve)
        },
        {
            path: '*',
            name: 'Error',
            redirect: "/"
        }

    ],
});
