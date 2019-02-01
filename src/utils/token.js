import {setCookies, removeCookies, getCookies} from './cookie'
import {ADMINPORTAL,VALIDATETOKEN} from "../api/api";
import {TOKEN} from "../components/page/login/constants";

import axios from 'axios'

export function validateToken(token) {
    return new Promise(
        (resolve,reject) =>{
            const path = window.location.href
            if(path.indexOf('&type=logout')>-1){
                removeCookies(TOKEN).then(
                    () =>{
                        resolve(true)
                    }
                )
            }else{
                axios({
                    method: 'post',
                    url: VALIDATETOKEN,
                    headers:{
                        'Content-Type':'application/json',
                        'Access-Token':token
                    }
                }).then(function(response) {
                        if (response.data.IsValid) {
                            setCookies(TOKEN, token, { expires: 1 }).then(() => {
                                const matchStr = window.location.href.match(/redirecturl=(\S*)[#]/)
                                const redirecturl = matchStr ? matchStr[1].replace('&type=login', '').replace('&type=logout', '') : null;
                                redirect(token, redirecturl)
                                reject
                            })
                        } else {
                            removeCookies(TOKEN).then(
                                () =>{
                                    resolve(true)
                                }
                            )
                        }
                    })
                    .catch(function(err) {
                        removeCookies(TOKEN).then(
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
        const url = redirecturl+"&token=" + token + "&rk=" + new Date().getTime()
        window.location.href = url
    }
    else {
        window.location.href = ADMINPORTAL
    }
}
