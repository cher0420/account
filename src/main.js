import Vue from 'vue';
import App from './App';
import router from './router';
import {store} from './store/store';
import {getCookies} from "./utils/cookie";

import 'element-ui/lib/theme-chalk/index.css';    // 默认主题
import "../static/css/theme/index.css"

import ElementUI from 'element-ui';

import "babel-polyfill";
import {validateToken} from './utils/token'

Vue.use(ElementUI, { size: 'small' });

const token = getCookies('token')
if(token){
    validateToken(token).then(
        () => {
            new Vue({
                router,
                store,
                render: h => h(App)
            }).$mount('#app');
        }
    ).catch(
        err =>err
    )
}else{
    new Vue({
        router,
        store,
        render: h => h(App)
    }).$mount('#app');
}




