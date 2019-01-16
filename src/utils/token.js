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
    if (redirecturl) {
        const url = redirecturl + "&token=" + token + "&rk=" + new Date().getTime()
        window.location.href = decodeURIComponent(url)
    } else {
        const host = window.location.host.indexOf('test') > -1 ? 'https://portal-test.hightalk.ai/' : 'https://portal.hightalk.online/'
        const url = host
        window.location.href = decodeURIComponent(url)
    }
}
