<template>
    <div class="contrainer">
        <div class="logo-block">
            <div></div>
        </div>
        <div class="lump-contrainer">
            <div class="welcome">欢迎登录</div>
            <div class="item">
                <el-input type="text" name="name" id="name" placeholder="请输入用户名" v-model="form.name"/>
                <span class="for-IE-special"></span>
            </div>
            <div class="item">
                <el-input type="password" name="password" id="password" placeholder="请输入密码" v-model="form.password"/>
                <span class="for-IE-special"></span>
            </div>

        </div>
        <div class="footer" style="position: absolute;bottom: 0;width: 100%;">
            <div style="color:#939393;text-align: center">
                2019 Pactera.All rights reserved.
            </div>
        <div style="margin:0 auto; padding:15px 0;text-align: center;font-size: 12px;">
            <a target="_blank" href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=31010402004967" style="display:inline-block;text-decoration:none;height:20px;line-height:20px;vertical-align: middle"><img src="../../../assets/loginImage/copy.png" style="float:left;"/><p style="float:left;height:20px;line-height:20px;margin: 0px 0px 0px 5px; color:#939393;font-size: 12px;">沪公网安备 31010402004967号</p></a>
            <a href="http://www.miitbeian.gov.cn" style="margin-left:10px;color:#939393;font-size: 12px;text-decoration: none;vertical-align: middle;">沪ICP备18035763号-1</a>
        </div>
        </div>
    </div>
</template>
<style lang="scss">
    .lump-contrainer{
        .item{
            margin-top: 30px;
        }
        input{
            height: 50px !important;
            font-size: 16px !important;
        }
    }
</style>
<style lang="scss">
    body {
        font-family: "微软雅黑";
        padding-top: 0;
        padding-bottom: 20px;
        width: 100%;
        height: 100%;
        position: absolute;
        background: #fff;
        opacity: 1;
        background: url(../../../assets/loginImage/back.png) no-repeat center center fixed;
        -webkit-background-size: cover;
        -moz-background-size: cover;
        -o-background-size: cover;
        background-size: cover;
        max-width: 100%;
        max-height: 100%;
        font-size: 14px;
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

    .lump-contrainer {
        box-sizing: border-box;
        width: 560px;
        height: 432px;
        padding: 50px 100px 0 100px;
        background: #fff;
        -webkit-border-radius: 5px;
        -moz-border-radius: 5px;
        border-radius: 5px;
        position: absolute;
        left: 50%;
        top: 50%;
        margin-left: -280px;
        margin-top: -216px;
        .welcome{
            font-size: 25px;
            color:#333;
        }
    }

    .contrainer {
        width: 100%;
        height: 100%;
        min-width: 800px;
        min-height: 648px;
        position: relative;
    }

</style>
<style>
    @media screen and (max-width: 1366px) {
        .logo-block {
            padding: 34px 0 0 80px;
        }
    }
</style>
<script>
    export default {
        data(){
            return{
                form:{
                    name:'',
                    password:''
                }
            }
        }
    }
</script>
