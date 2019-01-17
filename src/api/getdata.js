// import fetch from './fetch';
import getRequest from "./easy-fetch";


import base from "./host";


/**
 *  api异步请求
 */


/**
 *  01.注册新用户
 */
export const newUser = params => getRequest(base.SSOServerApi + "/api/Tenant/Register?v=" + new Date(), params, "POST");  //  注册新用户

/**
 * 02.登录
 */
export const login = params => getRequest('https://auth.hightalk.online/zh-cn/login/index',params,'POST')















