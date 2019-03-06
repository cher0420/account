import Vue from 'vue';
import {Loading} from 'element-ui';
import App from './App';
import router from './router';
import {store} from './store/store';
import {getCookies} from "./utils/cookie";
import {deCry, enCry} from "./utils/encrypt";

import "babel-polyfill";
import {validateToken} from './utils/token'
import {TOKEN,LOCALKEY} from "./constants/constants";
import {ADMINPORTAL} from "./api/api";

let loadingInstance = Loading.service({ fullscreen: true });

import './assets/loginImage/back.png'

const value = getCookies(TOKEN)

const search = window.location.search
const redirecturl = search?search.match(/redirecturl=(\S*)&type/)[1]:null

if(redirecturl){
    if(value){
        const tokenStr = deCry(value)
        validateToken(tokenStr).then(
            () => {
                new Vue({
                    router,
                    store,
                    render: h => h(App),
                    mounted: () => {
                        loadingInstance.close()
                    }
                }).$mount('#app');
            }
        )
    }else{
        new Vue({
            router,
            store,
            render: h => h(App),
            mounted: () => {
                loadingInstance.close()
            }
        }).$mount('#app');
    }
}else{
    window.location.href=ADMINPORTAL
}
