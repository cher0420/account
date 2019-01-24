import './jsencrypt.min'

/**
 *
 * @param str //传入的值
 * @param key //key值
 * @return {string}
 */
export function encrypt(str,key) {
    //rsa加密随机密钥
    var rsa = new JSEncrypt();
    //设置后端接口传回的公钥（无需对公钥字符串做任何处理）
    rsa.setPublicKey(key);
    //注意：RSA加解密有大小限制（最多117 bytes）
    var rsaEncrypted = rsa.encrypt(str);
    //已加密的字符串（Base64）
    return rsaEncrypted;
}
