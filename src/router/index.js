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
            component:() => import ('../page/login')
        },
        {
            path: "/register",
            component: resolve =>
                require(["../page/register.vue"], resolve)
        },
        {
            path: "/serviceProtocol",
            component: resolve =>
                require(["../page/serviceAgreement.vue"], resolve)
        },
        {
            path: "/privacyStatement",
            component: resolve =>
                require(["../page/privacyStatement.vue"], resolve)
        },
        {
            path: '*',
            name: 'Error',
            redirect: "/"
        }

    ],
});
