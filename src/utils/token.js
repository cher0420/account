import { setCookie, removeCookies } from './cookie'
export async function validateToken(token) {
    const that = this
    const data = {
        Token: token
    }
    axios.post(URL.SSOServerApi + '/api/Tenant/ValidateToken', data)
        .then(function(response) {
            if (response.data.IsValid) {
                setCookies('token', token, { expires: 1 }).then(() => {
                    const matchStr = window.location.href.match(/redirecturl=(\S*)[#]/)
                    const redirecturl = matchStr ? matchStr[1].replace('&type=login', '').replace('&type=logout', '') : null;
                    redirect(token, redirecturl)
                })
            } else {
                removeCookies('token')
            }
        })
        .catch(function(err) {
            removeCookies('token')
        });
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