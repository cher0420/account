import { setCookies, removeCookies } from './cookie'
import {ADMINPORTAL,VALIDATETOKEN} from "../api/api";

import axios from 'axios'

export function validateToken(token) {
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
                axios({
                    method: 'post',
                    url: VALIDATETOKEN,
                    headers:{
                        'Content-Type':'application/json',
                        'Access-Token':token
                    }
                }).then(function(response) {
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
        const sid = redirecturl.match(/sid=(\S*)/)[1]
        const url = ADMINPORTAL +'?'+'sid='+sid +"&token=" + token + "&rk=" + new Date().getTime()
        window.location.href = decodeURIComponent(url)
    } else {
        window.location.href = ADMINPORTAL
    }
}
