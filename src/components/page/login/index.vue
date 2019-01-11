<template>
    <div class="contrainer-box">
        <div class="logo-block">
            <div></div>
        </div>
        <div class="lump-contrainer">
            <div class="welcome">欢迎登录</div>
            <el-form :model="form" :rules="rules" ref="form" label-width="0">
                <el-form-item class="margin-t-40 p-relative" :error="errorMsg">
                    <el-input type="text" name="name" id="name" placeholder="请输入用户名" v-model="form.name"/>
                    <span class="for-IE-special"></span>
                    <!--<span v-if='itemError' class="item-error el-form-item__error">用户名或密码错误</span>-->
                </el-form-item>
                <el-form-item class="margin-t-30 p-relative" :error="errorMsg">
                    <el-input :type="showPWDStatus?'text':'password'" name="password" id="password" placeholder="请输入密码" v-model="form.password">
                        <i
                            :class="showPWDStatus?['showPWD','PWD']:['noShowPwd','PWD']"
                            slot="suffix"
                            @click="showPWD">
                        </i>
                    </el-input>
                    <span class="for-IE-special"></span>
                    <!--<span v-if='itemError' class="item-error el-form-item__error">用户名或密码错误</span>-->
                </el-form-item>
            <div class="margin-t-30 clearfix">
                <el-checkbox v-model="checked" class="f-l" style="color: #999;" @change="remember">记住密码</el-checkbox>
                <span class="f-r primary-color register" @click="register">立即注册</span>
            </div>
            <div class="margin-t-40">
                <button type="primary" disabled="disabled" :class="loadingText === '登录中'||disabled?['login-submit','opacity-background']:'login-submit'">
                    <span><span v-show='loadingText === "登录中"' class="sign-in-loading"></span>{{loadingText}}</span>
                </button>
            </div>
            </el-form>
        </div>
        <footer-bar></footer-bar>
    </div>
</template>
<script>
    import FooterBar from './footer'
    import {setCookies,removeCookies,getCookies} from "./cookie";
    import CryptoJS from 'crypto-js'
    import {SECRETSTRING} from './constants'

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
                checked:false,
                loadingText:'立即登录',
                disabled:true,
                showPWDStatus:false,
                // itemError: false,
                errorMsg:'用户名或密码错误',
            }
        },

        components:{
            FooterBar,
        },
        /*
        生命周期函数
        */
        created(){
            const res = this.GetQueryString('username')
            this.form.name = res
            console.log(this.decrypt('admin@123'));
        },
        methods:{
            /**
             * @return ciphertext
             */
            encrypt(message){
                // Encrypt
                const ciphertext = CryptoJS.AES.encrypt(message, SECRETSTRING).toString();
                return ciphertext
                // Decrypt


            },
            /**
             * @return string
             */
            decrypt(message){
                const answer = this.encrypt(message)
                const bytes  = CryptoJS.AES.decrypt(answer, SECRETSTRING);
                const originalText = bytes.toString(CryptoJS.enc.Utf8);
                return originalText
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
                const name = this.form.name
                const password = this.encrypt(this.form.password)
                v?setCookies(name,password,{expires:365}):removeCookies(name)
                console.log(name, password);
            },
            signIn(){
                var redirecturl = $("#redirecturl").val();
                var name = $("#name").val();
                var rememb = $("#remember").get(0).checked;

                //$("#loading").addClass("loading-show");

                if (!name) {
                    //alert("请输入用户名");
                    ShowUserError("请输入用户名");
                    return false;
                }
                //if (!IsEmail(name)) {
                //    //alert("用户名格式错误！");
                //    ShowUserError("用户名格式错误!");
                //    return false;
                //}
                var pwd = $("#pwd").val();
                if (!pwd) {
                    ShowPwdError("请输入密码");
                    //alert("请输入密码！");
                    return false;
                }
                //if (!IsPwdComplex(pwd)) {
                //    ShowPwdError("密码格式错误");
                //    //alert("密码格式错误！");
                //    return false;
                //}
                $.ajax({
                    url: '/zh-cn/login/index'
                    , type: 'POST'
                    , dataType: 'text'
                    , data: {
                        name: name,
                        pwd: pwd.length>=32?pwd:md5(pwd),
                        remember: rememb,
                        redirecturl: redirecturl
                    }
                    , success: function (data, textStatus, jqXHR) {
                        console.log(data);
                        if (data == "error") {
                            //ShowUserError("请求来源不合法!");
                            window.location.href = defaultRedirectUrl;
                        }
                        else if (data == "failedmax") {
                            ShowUserError("请" + tips + "后重试!");
                        }
                        else if (data == "pwd") {
                            ShowPwdError("请输入密码!");
                        }
                        else if (data == "name") {
                            ShowUserError("请输入用户名!");
                        }
                        else if (data == "failed") {
                            ShowUserError("用户名错误!");
                            ShowPwdError("密码错误!");
                        }
                        else {
                            console.log(encodeURIComponent(data));
                            //是否包含多个参数
                            if (redirecturl.indexOf("?") != - 1) {
                                window.location.href = redirecturl + "&token=" + encodeURIComponent(data) + "&rk=" + new Date().getTime();
                            }
                            else {
                                window.location.href = redirecturl + "?token=" + encodeURIComponent(data) + "&rk=" + new Date().getTime();
                            }
                        }
                    }
                    , error: function (XMLHttpRequest, textStatus, errorThrown) {
                        switch (XMLHttpRequest.status) {
                            case 500:
                                alert("服务器内部错误！");
                                break;
                            case 404:
                                alert("请求丢失了！");
                                break;
                            default:
                                alert("请求出错！");
                                break;
                        }
                    }
                });
                return false;
            },
            register() {
                var params = location.search;
                location.href = "https://register.hightalk.online" + params;
            }
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
