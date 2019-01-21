import { setCookies, removeCookies } from './cookie'
import URL from '../api/host'

import axios from 'axios'

export function validateToken(token) {
    const data = {
        Token: token
    }
    return new Promise(
        (resolve,reject) =>{
            const path = window.location.href
            if(path.indexOf('&type=logout')>-1){
                removeCookies('token').then(
                    () =>{
                        resolve(true)
                    }
                )
            }else{
                axios.post(URL.SSOServerApi + '/api/Tenant/ValidateToken', data)
                    .then(function(response) {
                        if (response.data.IsValid) {
                            setCookies('token', token, { expires: 1 }).then(() => {
                                const matchStr = window.location.href.match(/redirecturl=(\S*)[#]/)
                                const redirecturl = matchStr ? matchStr[1].replace('&type=login', '').replace('&type=logout', '') : null;
                                redirect(token, redirecturl)
                                reject
                            })
                        } else {
                            removeCookies('token').then(
                                () =>{
                                    resolve(true)
                                }
                            )
                        }
                    })
                    .catch(function(err) {
                        removeCookies('token').then(
                            () =>{
                                resolve(true)
                            }
                        )
                    });
            }
        }
    )

}

export function redirect(token, redirecturl) {
    const host = window.location.host
    if (redirecturl) {
        const url = redirecturl + "&token=" + token + "&rk=" + new Date().getTime()
        window.location.href = decodeURIComponent(url)
    } else if(host.indexOf('test') > -1){
        window.location.href = decodeURIComponent('https://portal-test.hightalk.ai/')
    } else if(host.indexOf('staging') > -1){
        window.location.href = decodeURIComponent('https://portal-staging.hightalk.ai/')
    } else{
        window.location.href = decodeURIComponent('https://portal.hightalk.online/')
    }
}
