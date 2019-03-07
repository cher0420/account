import {Message} from 'element-ui'
import {setCookies, removeCookies} from './cookie'
import {ADMINPORTAL,VALIDATETOKEN} from "../api/api";
import {TOKEN} from "../constants/constants";

import axios from 'axios'
import {enCry} from "./encrypt";

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
                            const tokenStr = enCry(token)
                            setCookies(TOKEN, tokenStr, { expires: 1 }).then(() => {
                                const matchStr = window.location.href.match(/redirecturl=(\S*)[#]/)
                                const redirecturl = matchStr ? matchStr[1].replace('&type=login', '').replace('&type=logout', '') : null;
                                redirect(token, redirecturl)
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
                        removeCookies(TOKEN)
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
