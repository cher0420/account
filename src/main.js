import Vue from 'vue';
import App from './App';
import router from './router';
import {store} from './store/store';
import {getCookies} from "./utils/cookie";
import {deCry} from "./utils/encrypt";

import 'element-ui/lib/theme-chalk/index.css';    // 默认主题

import "babel-polyfill";
import {validateToken} from './utils/token'
import {TOKEN,LOCALKEY} from "./constants/constants";
import {ADMINPORTAL} from "./api/api";

import './assets/loginImage/back.png'

const value = getCookies(TOKEN)

const search = window.location.search
const redirecturl = search?search.match(/redirecturl=(\S*)&type/)[1]:null

if(redirecturl){
    if(value){
        const token = deCry(value,LOCALKEY)
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
}else{
    window.location.href=ADMINPORTAL
}
