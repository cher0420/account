<template>
    <div class="contrainer-box">
        <div class="logo-block">
            <div></div>
        </div>
        <div class="lump-contrainer">
            <div class="welcome">欢迎登录</div>
            <el-form :model="form" :rules="rules" ref="form" label-width="0">
                <el-form-item class="margin-t-40 for-IE-special-container" :error="errorMsg" prop="name">
                    <el-input type="text" name="name" id="name" placeholder="请输入用户名" v-model="form.name" @keyup.enter.native="signIn" @focus="hideSomeThing('name','showNameTips')" @blur="showSomeThing('name','showNameTips')" @change="hideSomeThing('name','showNameTips')"/>
                    <span v-show="showNameTips" class="for-IE-special">请输入用户名</span>
                </el-form-item>
                <el-form-item class="margin-t-30 for-IE-special-container" :error="errorMsg" prop="password">
                    <el-input :type="showPWDStatus?'text':'password'" name="password" id="password" placeholder="请输入密码" v-model="form.password" @keyup.enter.native="signIn" @focus="hideSomeThing('password','showPWDTips')" @blur="showSomeThing('password','showPWDTips')" @change="hideSomeThing('password','showNameTips')">
                        <i
                            :class="showPWDStatus?['showPWD','PWD']:['noShowPwd','PWD']"
                            slot="suffix"
                            @click="showPWD">
                        </i>
                    </el-input>
                    <span v-show="showPWDTips" class="for-IE-special">请输入密码</span>
                </el-form-item>
            <div class="margin-t-30 clearfix">
                <el-checkbox v-model="rememberMe" class="f-l" style="color: #999;" @change = 'remember'>记住密码</el-checkbox>
                <span class="f-r primary-color register" @click="register">立即注册</span>
            </div>
            <div class="margin-t-40">
                <button
                    type="button"
                    :disabled="disabled"
                    :class="loadingText === '登录中'||disabled?['login-submit','opacity-background']:'login-submit'"
                    @click="signIn"
                    >
                    <span>
                        <span v-show='loadingText === "登录中"' class="sign-in-loading">
                        </span>{{loadingText}}</span>
                </button>
            </div>
            </el-form>
        </div>
        <footer-bar></footer-bar>
    </div>
</template>
<script>
    import FooterBar from './footer'
    import {setCookies,removeCookies,getCookies} from "../../../utils/cookie.js";
    import axios from 'axios'
    import CryptoJS from 'crypto-js'
    import URL from '../../../api/host'
    import {redirect} from '../../../utils/token'
    import {LOGIN} from "../../../api/api";
    import {isIE9} from "../../../utils/browserOS";

    export default {
        data(){
            return{
                form:{
                    name:'',
                    password:''
                },
                rules: {
                    name: [
                        {required: true, message: '请输用户名', trigger: 'blur'},
                    ],
                    password: [
                        {
                            required: true, message:'请输入密码', trigger: 'blur'
                        }
                    ]
                },
                showPWDTips:false,
                showNameTips:false,
                rememberMe:false,
                loadingText:'立即登录',
                disabled: false,
                showPWDStatus:false,
                // itemError: false,
                errorMsg:'',
            }
        },

        components:{
            FooterBar,
        },
        /*
        生命周期函数
        */
        beforeCreate(){
            document.title = '登录'
        },
        created(){
            if(isIE9()){
                this.showPWDTips = true;this.showNameTips = true
            }else{
                this.showPWDTips = false;this.showNameTips = false
            }
            const cookies = getCookies('remember')?getCookies('remember').split('&'):''
            if(cookies){
                if(this.$route.query.username){
                    this.form.name = this.$route.query.username
                    this.form.password = ''
                    this.rememberMe = false
                }else{
                    this.form.name = cookies[0]
                    this.form.password = cookies[1]
                    this.rememberMe = cookies.length === 2
                }
            }else{
                this.rememberMe  = false
            }

        },
        methods:{
            /**
             * @return ciphertext
             */
            encrypt(message){
                // Encrypt
                // const ciphertext = CryptoJS.AES.encrypt(message, SECRETSTRING).toString();
                // console.log('加密字段',ciphertext);
                // return ciphertext
                // export var des = (message) => {
                    var keyHex = CryptoJS.enc.Utf8.parse('ANEG124*+$@223U34SG]34#0394XP0455@@##');
                    var encrypted = CryptoJS.DES.encrypt(message, keyHex, {
                        mode: CryptoJS.mode.ECB,
                        padding: CryptoJS.pad.Pkcs7
                    });
                    console.log('加密字段',encrypted.ciphertext.toString());
                    return encrypted.ciphertext.toString();
                // }

            },
            /**
             * @return string
             */
            decrypt(ciphertext){
                var keyHex = CryptoJS.enc.Utf8.parse('ANEG124*+$@223U34SG]34#0394XP0455@@##');
                var decrypted = CryptoJS.DES.decrypt(
                    ciphertext,keyHex, {
                    mode: CryptoJS.mode.ECB,
                    padding: CryptoJS.pad.Pkcs7
                });
                console.log('解密字段',decrypted.toString(CryptoJS.enc.Utf8))
                return decrypted.toString(CryptoJS.enc.Utf8);
            },
            showSomeThing(key,v){
                if(isIE9()){
                    this[v] = !this.form[key];
                }
            },
            hideSomeThing(key,v){
                if(isIE9()){
                    this[v] = false
                }
            },
            showPWD(){
                this.showPWDStatus = !this.showPWDStatus
            },
            /**
             * @return {null}
             */
            GetQueryString(name) {
                var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
                var r = window.location.search.substr(1).match(reg);
                if (r != null) return unescape(r[2]); return null;
            },
            /**
             *
             */
            remember(v){
                // const str = this.encrypt(`${this.form.name}&${this.form.password}`)
                // const password = this.decrypt(str)
            },
            signIn(){
                const that = this
                this.$refs['form'].validate((valid) => {
                    if (valid) {
                        that.loadingText = '登录中'
                        this.submit(that.form)
                    } else {
                        return false;
                    }
                });
            },
            submit(v){
                const that =this
                const data = {
                    Account:v.name,
                    Password:v.password.length>=32?v.password:md5(v.password),
                }
                axios.post(LOGIN, data)
                    .then(function (response) {
                        if(!response.data.ErrorCodes){
                         setCookies('token',response.data.Token,{expires:1}).then(()=>{
                                const res = that.validate_someThing(response)
                                if(res){
                                    const matchStr = window.location.href.match(/redirecturl=(\S*)[#]/)
                                    const redirecturl = matchStr ? matchStr[1].replace('&type=login','').replace('&type=logout','') : null;
                                    redirect(response.data.Token,redirecturl)
                                }
                            })
                        }else{
                            that.errorMsg = Math.random()
                            that.$nextTick(() => {
                                that.errorMsg = response.data.ErrorCodes[0].ErrorMessage
                            })
                            that.loadingText = '立即登录'
                        }
                    })
                    .catch(function (err) {
                        removeCookies('token')
                    //    that.validate_someThing(err)
                    });
            },
            register() {
                this.$router.push({
                    path: '/register'
                })
                var params = location.search;
                // location.href = "https://register.hightalk.online" + params;
            },

            validate_someThing(v){
                const that = this
                if(v.data&&v.data.ErrorCodes){
                    this.errorMsg = v.data.ErrorCodes[0].ErrorMessage
                    this.loadingText = '立即登录'
                    return false
                }else {
                    if(that.rememberMe){
                        const password = that.form.password.length>=32?that.form.password:md5(that.form.password)
                        const rememberStr = that.form.name+'&'+password
                        setCookies('remember',rememberStr,{expires: 365})
                    }else{
                        removeCookies('remember')
                    }
                    return true
                }
            },

        }
    }
</script>
<style lang="scss">
    .f-r{
        float: right;
    }
    .f-l{
        float: left;
    }
    .clearfix:before,.clearfix:after {
        content: "";
        display: block;
        clear: both;
    }
    .clearfix {
        zoom: 1;
    }
    .margin-t-40{
        margin-top: 40px;
    }
    .margin-t-30{
        margin-top: 30px;
    }
    .p-relative{
        position: relative;
    }
    .p-absolute{
        position: absolute;
    }
    .for-IE-special-container{
        .el-form-item__content{
            position: relative;
        }
    }
    .for-IE-special{
        position: absolute;
        top: 0;
        left: 0;
        display: inline-block;
        height: 50px;
        line-height: 50px;
        padding-left: 25px;
    }
</style>
<style lang="scss">
    //font
    $primaryFontS:16px;
    $h1FontS:30px;

    //color
    $normalColor: #999;
    $primaryColor: #2a8ce7;
    $hoverColor:#55a3ec;
    $error:#F04B4B;
    //size
    $inputH:50px;
    @keyframes rolling
    {
        from {-webkit-transform: rotate(0deg);}
        to {-webkit-transform: rotate(360deg);}
    }

    /*Safari 和 Chrome:*/
    @-webkit-keyframes rolling
    {
        from {transform: rotate(0deg);}
        to {transform: rotate(0deg);}
    }
    .contrainer-box {
        width: 100%;
        height: 100%;
        background: url(../../../assets/loginImage/back.png) no-repeat center center fixed;
        -webkit-background-size: cover;
        -moz-background-size: cover;
        -o-background-size: cover;
        background-size: cover;
        font-size: 14px;
        color:$normalColor;
        min-width: 800px;
        min-height: 648px;
        position: relative;
        input{
            height: $inputH !important;
            font-size: $primaryFontS !important;
            padding:0 25px;
        }
        button{
            //消除button的默认样式
            margin: 0;
            padding: 0;
            border: 1px solid transparent;  //自定义边框
            outline: none;    //消除默认点击蓝色边框效果
        }

    }
    .lump-contrainer {
        box-sizing: border-box;
        width: 648px;
        height: 480px;
        padding: 75px 100px 0 100px;
        background: #fff;
        -webkit-border-radius: 5px;
        -moz-border-radius: 5px;
        border-radius: 5px;
        position: absolute;
        left: 50%;
        top: 50%;
        margin-left: -324px;
        margin-top: -240px;
        .welcome{
            font-size: $h1FontS;
            height: $h1FontS; //取h1字体大小
            line-height: $h1FontS; //取h1字体大小
            color:#333;
        }
        .el-checkbox__inner{
            width: 16px;
            height: 16px;
        }
        .el-checkbox__inner::after{
            height: 8px;
            left: 5px;
            width: 4px;
        }
        .register{
            cursor: pointer;
        }
        .login-submit{
            /*display: inline-block;*/
            vertical-align: middle;
            width: 100%;
            height: $inputH;
            line-height: $inputH;
            /*text-align: center;*/
            background: $primaryColor;
            color: #fff;
            -webkit-border-radius: 5px;
            -moz-border-radius: 5px;
            border-radius: 5px;
            cursor: pointer;
            font-size: 16px;
            .sign-in-loading{
                position: relative;
                display: inline-block;
                width: 20px;
                height: 20px;
                vertical-align: middle;
                margin-right: 15px;
                margin-top: -2px;
            }
            .sign-in-loading::before{
                -webkit-box-sizing: border-box;
                -moz-box-sizing: border-box;
                box-sizing: border-box;
                display: inline-block;
                content: "";
                width: 20px;
                height: 20px;
                border-radius: 10px;
                border: 2px solid #fff;
                border-bottom-color: transparent;
                vertical-align: middle;
                position: absolute;
                top: 0;
                left: 0;
                -webkit-animation: rolling .8s infinite linear;
                -o-animation: rolling .8s infinite linear;
                animation: rolling .8s infinite linear;
                z-index: 1;
            }
        }
        .login-submit:hover{
            background: $hoverColor;
        }
        .opacity-background{
            background: $hoverColor;
            cursor: default;
        }
        .el-form-item__error:before{
            content: "\E62E";
            font-family: element-icons;
            -webkit-box-sizing: border-box;
            -moz-box-sizing: border-box;
            box-sizing: border-box;
            width: 12px;
            height: 12px;
            line-height: 12px;
            margin-right: 5px;
            color: $error;
            display: inline-block;
            text-align: center;
            -webkit-border-radius: 50%;
            -moz-border-radius: 50%;
            border-radius: 50%;
            background: #fff;
        }
        .el-form-item--small .el-form-item__error{
            padding-top: 5px;
        }
        .el-checkbox__input .el-checkbox__inner{
            border-color: #dcdfe6;
        }
        .el-checkbox__input.is-checked .el-checkbox__inner{
            border-color: $primaryColor;
        }
        .el-form-item.is-success .el-input__inner, .el-form-item.is-success .el-input__inner:focus, .el-form-item.is-success .el-textarea__inner, .el-form-item.is-success .el-textarea__inner:focus{
            border-color: $primaryColor;
        }

    }
    a {
        color: #999999;
    }

    .logo-block {
        width: 100%;
        padding: 64px 0 0 80px;
        height: 80px;
        box-sizing: border-box;
    }

    .logo-block > div {
        height: 60px;
        /*z-index: 1;*/
        background-image: url(../../../assets/loginImage/Hightalk-Logo_36090@2x.png);
        /*background-position: -125px -35px;*/
        background-repeat: no-repeat;
        background-size: contain;
    }
    .PWD{
        display: inline-block;
        width: 44px;
        height: 100%;
        line-height: 100%;
        margin-right: 10px;
        cursor: pointer;
    }
    .showPWD{
        background: url("../../../assets/loginImage/show.png")center no-repeat;
    }
    .noShowPwd {
        background: url("../../../assets/loginImage/unshow.png")center no-repeat;
    }
    /*.item-error{*/
        /*position: absolute;*/
        /*left: 0;*/
        /*top: 50px;*/
    /*}*/
</style>
<style>
    @media screen and (max-width: 1366px) {
        .logo-block {
            padding: 20px 0 0 80px;
        }
    }
</style>
