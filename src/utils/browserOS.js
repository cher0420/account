export const isIE9 = () => {
    if(!-[1,]){
        return true;
    }else{
        if(navigator.userAgent.indexOf('MSIE 9.0')>0){
            return true;
        }else{
            return false;
        }
    }
}
export default isIE9
