<template>

    <div class="Allen login">


        <div class="AllenLogo">
            <div class="Logo_inner"></div>
        </div>


        <div class="login-wrap">
            <div class="ms-login">
                <div class="ms-title-r">
                    <span> 已有账号 </span> <span class="cuur" @click="currentLogin()"> 立即登录</span>
                </div>
                <div class="ms-title">
                    <div class="ms-title-l">
                        欢迎注册嗨聊平台
                    </div>
                </div>
                <el-form :model="ruleForm" label-width="0px" class="ms-content demo-ruleForm">
                    <el-form-item>
                        <el-input v-model="ruleForm.companyName" @blur="companyNameBlue()" @focus="companyNameFocus()"
                                  class="innerInput"
                                  maxlength="25"
                                  placeholder="公司名称 ( 选填 )">
                        </el-input>
                    </el-form-item>
                    <div class="passwordBlur11" style="height:30px;">
                    </div>
                    <div class="passwordBlur22"
                         style="color: #f43a38;padding-top: 5px;padding-bottom: 10px ;display: none">
                        <i class="el-icon-warning"></i> <span>请输入一个有效的公司名称</span>
                    </div>


                    <el-form-item required class="userName">
                        <el-col style="width: 180px;display: inline-block" :span="11">
                            <el-form-item class="user1">
                                <el-input v-model="ruleForm.username" placeholder="用户名" @focus="userNameFocus()"
                                          maxlength="20"
                                          @blur="userNameBlur()">
                                </el-input>
                            </el-form-item>
                        </el-col>
                        <el-col class="line"
                                style="display: inline-block;margin:0 12px;height: 50px;line-height: 50px;text-align: center;"
                                :span="1">@
                        </el-col>
                        <el-col style="width: 160px;display: inline-block;" :span="11">
                            <el-form-item class="user2">
                                <el-input v-model="ruleForm.domain" placeholder="租户域名" maxlength="20"
                                          @focus="domainFocus()"
                                          @blur="domainBlur()">
                                </el-input>
                            </el-form-item>
                        </el-col>
                        <el-col class="line"
                                style="display: inline-block;height: 50px;line-height: 50px;margin-left: 5px;"
                                :span="2">
                            .hightalk.online
                        </el-col>
                    </el-form-item>

                    <div style="position: relative;height: 30px;">
                        <div style="padding-top: 5px;font-size: 12px;color: #999;padding-bottom: 18px;"
                             class="userDis1">
                            例如 ：username@yourcompany.hightalk.online
                        </div>
                        <div
                            style="padding-top: 5px;font-size: 12px;color: #f43a38;padding-bottom: 18px;position: absolute;left: 0;top: 0;display: none;"
                            class="userDis2">
                            <i class="el-icon-warning"></i> 用户名为1-20位英文，数字，下划线
                        </div>
                        <div
                            style="padding-top: 5px;font-size: 12px;color: #f43a38;padding-bottom: 18px;position: absolute;right: 115px;top: 0;display: none;"
                            class="userDis3">
                            <i class="el-icon-warning"></i> 租户域名1-20位英文，数字
                        </div>
                        <!--    租户企业域名已存在  -->
                        <div
                            style="padding-top: 5px;font-size: 12px;color: #f43a38;padding-bottom: 18px;position: absolute;right: 168px;top: 0;display: none;"
                            class="userDis4">
                            <i class="el-icon-warning"></i> 租户域名已存在
                        </div>


                    </div>

                    <div class="pw">
                        <el-form-item style="position: relative;">
                            <el-input type="password" placeholder="密码" @focus='passwordFocus()' @blur="password()"
                                      maxlength="20"
                                      v-model="ruleForm.password">
                            </el-input>
                            <!--<span class="el-icon-view" style="position: absolute;right: 0;top: 0;font-size: 16px;width: 50px;height: 50px;text-align: center;line-height: 50px;cursor: pointer;"></span>-->
                        </el-form-item>


                    </div>
                    <div class="passwordBlur1" style="height:30px;">
                    </div>
                    <!-- 获取焦点显示-->
                    <div class="passwordBlur2"
                         style="color: #999;padding-top: 5px;padding-bottom: 10px ;display: none">
                        <span>密码需包含数字、字母和特殊字符 （ 8-20位,空格除外 )</span>
                    </div>

                    <!--<div class="passwordBlur3"-->
                    <!--style="color:#f43a38;padding-top: 5px;padding-bottom: 10px ;display: none">-->
                    <!--<span><span class="el-icon-warning"></span> <span v-text="passwordTip"></span></span>-->
                    <!--</div>-->


                    <div class="passwordBlur3"
                         style="color:#f43a38;padding-top: 5px;padding-bottom: 10px ;display: none">
                        <span><span class="el-icon-warning"></span> 密码需包含数字、字母和特殊字符（8-20位,空格除外 )</span>
                    </div>
                    <div class="passwordBlur4"
                         style="color:#f43a38;padding-top: 5px;padding-bottom: 10px ;display: none">
                        <span><span class="el-icon-warning"></span> 密码总长为8-20位字符 </span>
                    </div>

                    <div class="pws">
                        <el-form-item>
                            <!--<input type="password" placeholder="确认密码" @focus='passwordFocuss()' @blur="passwords()"-->
                            <!--maxlength="20" v-model="ruleForm.passwordTwo" >-->
                            <el-input type="password" placeholder="确认密码" @focus='passwordFocuss()' @blur="passwords()"
                                      maxlength="20" v-model="ruleForm.passwordTwo" autocomplete="off">
                            </el-input>
                        </el-form-item>
                    </div>
                    <div class="passwordBlur1s" style="height:30px;">
                    </div>
                    <div class="passwordBlur2s"
                         style="color: #999;padding-top: 5px;padding-bottom: 10px ;display: none">
                        <span>密码需包含数字、字母和特殊字符 （ 8-20位,空格除外 )</span>
                    </div>
                    <div class="passwordBlur3s"
                         style="color:#f43a38;padding-top: 5px;padding-bottom: 10px ;display: none">
                        <span><span class="el-icon-warning"></span> 密码需包含数字、字母和特殊字符 （ 8-20位,空格除外 )</span>
                    </div>
                    <div class="passwordBlur4s"
                         style="color:#f43a38;padding-top: 5px;padding-bottom: 10px ;display: none">
                        <span><span class="el-icon-warning"></span> 密码总长为8-20位字符 </span>
                    </div>
                    <div class="passwordBlur5s"
                         style="color:#f43a38;padding-top: 5px;padding-bottom: 10px ;display: none">
                        <span><span class="el-icon-warning"></span> 两次输入的密码不一致，请重新输入 </span>
                    </div>


                    <div>
                        <div class="verify-wrap" id="verify-wrap"></div>
                    </div>
                    <div style="margin-top: 15px;font-size: 14px">
                        <el-checkbox :disabled="register" v-model="ruleForm.reader" style="color: #999">我已阅读并同意
                        </el-checkbox>
                        <span style="color: #999">  <span style="color: #2a8ce7;cursor: pointer" @click="open()"
                                                          id="test">嗨聊平台服务协议</span> 和 <span
                            style="color: #2a8ce7;cursor: pointer" @click="open2('/test')">嗨聊平台隐私声明 </span></span>
                    </div>


                    <div class="login-btn" style="margin-top: 40px;">
                        <el-button type="primary" :disabled="agreement" @click="submitForm('ruleForm')">立即注册
                        </el-button>
                    </div>

                </el-form>
            </div>

        </div>

        <div class="Allen-tip">
            <div class="reserved" style="text-align:center;padding-bottom: 20px;">
                <p>2018 Pactera.All rights reserved.</p>
            </div>
            <div style="margin:0 auto; padding:0 0 0 0;text-align: center;font-size: 12px;">
                <a target="_blank" href=" "
                   style="display:inline-block;text-decoration:none;height:20px;line-height:20px;vertical-align: middle">
                    <img src="../../../static/copy.png" style="float:left;"/>
                    <p style="float:left;height:20px;line-height:20px;margin: 0px 0px 0px 5px; color:#939393;font-size: 12px;">
                        <a href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=31010402004967"
                           style="color:#939393;font-size: 12px;text-decoration: none;">沪公网安备 31010402004967号</a>
                    </p>
                </a>
                <a href="http://www.miitbeian.gov.cn"
                   style="margin-left:10px;color:#939393;font-size: 12px;text-decoration: none;vertical-align: middle;">沪ICP备18035763号-1</a>
            </div>

        </div>
    </div>

</template>

<script>
    import host from "../../api/host";
    import {newUser} from "../../api/getdata";  // api

    export default {
        data() {

            var validatePass = (rule, value, callback) => {
                console.log("+++++++", value)

                if (value == "") {
                    callback(new Error('请输入密码'));

                }
                // else if( !reg.test(value) ){
                //     callback(new Error("密码需包含数字、字母和特殊字符 （ 空格除外 ）"));
                // }
                // else if( value.length < 8 ){
                //     callback(new Error("密码长度不得低于8位字符"));
                // }
                // else {
                //     callback();
                // }
            };
            return {

                agreement: true,
                passwordTip: "",// 密码提醒

                passwordBlur: true, // 密码
                register: false, // 注册

                ruleForm: {
                    domain: "",
                    companyName: "",
                    reader: false, // 协议复选框
                    username: '',
                    password: '',
                    passwordTwo: "",

                },

                slideVerify: {},

            }
        },
        created() {

        },
        mounted() {
            let that = this;
            let SlideVerifyPlug = window.slideVerifyPlug;
            this.slideVerify = new SlideVerifyPlug('#verify-wrap', {
                wrapWidth: '500',//设置 容器的宽度 ，默认为 350 ，也可不用设，你自己css 定义好也可以，插件里面会取一次这个 容器的宽度
                initText: '请按住滑块，拖动到最右边',  //设置  初始的 显示文字
                sucessText: '验证通过',//设置 验证通过 显示的文字
                getSucessState: function (res) {
                    // console.log("验证", res)
                    that.register = false;
                    that.agreement = false;
                }
            });

            this.myResize();
            window.onresize = function () {
                that.myResize();
            };

        },
        methods: {
            myResize() {
                let heightTop = $(".AllenLogo").outerHeight(true);
                let heightMiddle = $(".login-wrap").outerHeight(true);
                let sumHeight = heightTop + heightMiddle;
                let maxHeight = $(".login").outerHeight(true);
                let winHeight = $(window).height() // 可视区高度
                if (winHeight > sumHeight || winHeight == sumHeight) { // 如果可视区高度 > sum
                    $(".Allen-tip").css({
                        "position": "absolute",
                        "left": "0",
                        "bottom": "0"
                    })
                } else {
                    $(".Allen-tip").css({
                        "position": "static",
                        "left": "0",
                        "bottom": "0"
                    })
                }
            },
            currentLogin() { // 立即登录
                let that = this;
                let redirecturls = this.GetRequest();
                let ssoUrl = ''
                if (redirecturls != undefined) {
                    ssoUrl = host.SSOWebUrl.zh + "?redirecturl=" + redirecturls;
                } else {
                    ssoUrl = host.SSOWebUrl.zh;
                }


                window.location.href = ssoUrl
            },
            blankLoginIn() {
                let that = this;
                let redirecturls = this.GetRequest();
                if (redirecturls == undefined) {
                    const Account = that.ruleForm.username + "@" + that.ruleForm.domain + ".hightalk.online";
                    window.location.href = host.SSOWebUrl.zh + '?username=' + Account
                } else {
                    const Account = that.ruleForm.username + "@" + that.ruleForm.domain + ".hightalk.online";
                    window.location.href = host.SSOWebUrl.zh + '?username=' + Account + '&redirecturl=' + redirecturls;
                }


            },
            GetRequest() {
                let strr = "";
                let url = location.search; //获取url中"?"符后的字串
                let theRequest = new Object();
                if (url.indexOf("redirecturl=") != -1) {
                    let str = url.substr(1);
                    strr = str.substring(12);
                    return strr;
                }

            },

            open() {

                let routeData = this.$router.resolve({
                    path: "/serviceProtocol",

                });

                window.open(routeData.href, '_blank');

            },
            open2() {
                // const href = window.location.host + '#';
                //
                // console.log(href + v)
                //
                // window.open(href + v);
                let routeData = this.$router.resolve({
                    path: "/privacyStatement",

                });
                window.open(routeData.href, '_blank');

            },
            async submitForm(formName) {
                // 字符验证
                this.companyNameBlue();
                this.userNameBlur();
                this.domainBlur();
                this.password();
                this.passwords();
                if (!this.companyNameBlue() || !this.userNameBlur() || !this.domainBlur() || !this.password() || !this.passwords()) {
                    this.slideVerify.resetVerify();
                    this.agreement = true;
                    return false;
                }

                let that = this;
                console.log(this.ruleForm.reader);
                if (!this.ruleForm.reader) {
                    this.$message({
                        message: '请勾选同意协议',
                        type: 'warning'
                    });
                    return false;
                }

                const Account = that.ruleForm.username + "@" + that.ruleForm.domain + ".hightalk.online";
                let password = md5(that.ruleForm.password)

                // password =
                let data = {
                    "TenantInfo": {
                        "ID": "",
                        "TenantName": that.ruleForm.companyName, // 租户名
                        "Email": "",
                        "Tel": "",
                        "TenantSite": "",
                        "Trade": "",
                        "Address": "",
                        "LicenseNo": "",
                        "RegistrationNo": "",
                        "Description": "",
                        "Status": 1
                    },
                    "TenantUserProfiles": {
                        "ID": "",
                        "FullName": that.ruleForm.username, // 用户名
                        "Photo": "",
                        "TenantDomainName": that.ruleForm.domain, // 租户域名
                        "Account": Account, // 账号
                        "Password": password, // 密码
                        "Tel": "",
                        "AllowLogin": 1,
                        "AllowOrder": 1,
                        "Status": 1
                    }
                };
                let registerUser = await newUser(data);  // 调用注册接口
                if (registerUser.Status == 1) {

                    that.$message({
                        message: "注册成功，将返回登录页面",
                        type: 'success'
                    });
                    that.blankLoginIn();
                }
                if (registerUser.Status == 0) {
                    $(".userDis4").show();
                    $(".userDis1").hide();

                }


                // $.ajax({
                //     type: "POST",
                //     headers: {
                //         "Content-Type": "application/json;charset=utf-8",
                //     },
                //     url: host.registerHost + "/api/Tenant/Register?v=" + new Date(),
                //     data: JSON.stringify(data),
                //     dataType: "json",
                //     async: true,
                //     success: function (msg) {
                //         console.log("msg", msg);
                //         debugger;
                //         if (msg.Status == 1) {
                //
                //
                //             that.$message({
                //                 message: "注册成功，将返回登录页面",
                //                 type: 'success'
                //             });
                //
                //
                //             that.blankLoginIn();
                //
                //         }
                //         if (msg.Status == 0) {
                //
                //             $(".userDis4").show();
                //             $(".userDis1").show();
                //
                //             // that.$message({
                //             //     message: msg.ErrorCodes[0].ErrorMessage,
                //             //     type: 'success'
                //             // });
                //         }
                //     }
                // })


            }
            ,
            verification() {  // 验证
                let flag = false;
                console.log('====', this.reader)
                if (this.reader) {
                    flag = true;
                }
                if (!this.reader) {
                    this.$message({
                        message: '请勾选同意协议',
                        type: 'warning'
                    });
                    flag = false;
                }

                return flag;
            },
            companyNameBlue() {
                let that = this;
                that.ruleForm.companyName = $.trim(that.ruleForm.companyName);
                if (that.ruleForm.companyName == "") {
                    return true;
                }

                let regEn = /[`~!@#$%^&*()_+<>?:"{},.\/;'[\]]/im,
                    regCn = /[·！#￥（——）：；“”‘、，|《。》？、【】[\]]/im;

                if (regEn.test(that.ruleForm.companyName) || regCn.test(that.ruleForm.companyName)) {
                    $(".passwordBlur11").hide();
                    $(".passwordBlur22").show();
                    return false;
                } else {
                    $(".passwordBlur11").show();
                    $(".passwordBlur22").hide();
                    return true;
                }
            },
            companyNameFocus() {
                let that = this;
                that.ruleForm.companyName = $.trim(that.ruleForm.companyName);


                $(".passwordBlur11").show();
                $(".passwordBlur22").hide();


            },

            userNameFocus() {
                $(".userDis2").hide();
                $(".user1 input").css("border", "1px solid  #2a8ce7");

            },
            domainFocus() {
                // $(".userDis1").show();
                $(".user2 input").css("border", "1px solid  #2a8ce7");
                $(".userDis3").hide();
                $(".userDis4").hide();
            },
            domainBlur() {
                let username = this.ruleForm.domain
                let result = this.validateStrAndNo(username)
                if (!result) {
                    $(".userDis1").hide();
                    $(".userDis3").show();
                    $(".user2 input").css("border", "1px solid #f43a38");
                    return false;
                }
                $(".user2 input").css("border", "1px solid #c0c4cc");
                return true;


            },
            userNameBlur() {
                let that = this;
                this.ruleForm.username = $.trim(that.ruleForm.username)
                let username = this.ruleForm.username
                let regEx = /^[a-zA-Z0-9_]{1,20}$/;
                let result = regEx.test(username)
                if (!result) {
                    $(".userDis1").hide();
                    $(".userDis2").show();
                    $(".user1 input").css("border", "1px solid #f43a38");
                    return false;
                }
                $(".user1 input").css("border", "1px solid #c0c4cc");
                return true;
            },
            passwordFocus() {
                $(".passwordBlur1").hide();
                $(".passwordBlur2").show();
                $(".passwordBlur3").hide();
                $(".passwordBlur4").hide();
                $(".pw input").css("border", "1px solid #2a8ce7");

            },
            passwordFocuss() {
                $(".passwordBlur1s").hide();
                $(".passwordBlur2s").show();
                $(".passwordBlur3s").hide();
                $(".passwordBlur4s").hide();
                $(".passwordBlur5s").hide();
                $(".pws input").css("border", "1px solid #2a8ce7");

            },
            checkpassword(v) {  // 密码需包含数字、字母和特殊字符 （ 空格除外 )
                var numasc = 0;
                var charasc = 0;
                var otherasc = 0;
                if (0 == v.length) {
                    return "密码不能为空";
                } else if (v.length < 8 || v.length > 20) {
                    return "密码至少8个字符,最多20个字符";
                } else {
                    for (var i = 0; i < v.length; i++) {
                        var asciiNumber = v.substr(i, 1).charCodeAt();
                        if (asciiNumber >= 48 && asciiNumber <= 57) {
                            numasc += 1;
                        }
                        if ((asciiNumber >= 65 && asciiNumber <= 90) || (asciiNumber >= 97 && asciiNumber <= 122)) {
                            charasc += 1;
                        }
                        if ((asciiNumber >= 33 && asciiNumber <= 47) || (asciiNumber >= 58 && asciiNumber <= 64) || (asciiNumber >= 91 && asciiNumber <= 96) || (asciiNumber >= 123 && asciiNumber <= 126)) {
                            otherasc += 1;
                        }
                    }
                    if (0 == numasc) {
                        return "密码必须含有数字";
                    } else if (0 == charasc) {
                        return "密码必须含有字母";
                    } else if (0 == otherasc) {
                        return "密码必须含有特殊字符";
                    } else {
                        return true;
                    }
                }
            },
            password() {  // 密码1 失去焦点
                let that = this;
                that.ruleForm.password = $.trim(that.ruleForm.password)
                // console.log(that.ruleForm.password)
                let regg = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[~!@#$%\^&*()_+`\-={}:";'[\]/\\<>?,.\/ ]).{8,20}$/;
                if (that.ruleForm.password == "") {
                    $(".passwordBlur1").hide();
                    $(".passwordBlur2").hide();
                    $(".passwordBlur3").show();
                    $(".pw input").css("border", "1px solid #f43a38");
                    $(".pw input").css("border-radius", "4px");
                    return false;
                }
                if (!regg.test(that.ruleForm.password)) {
                    $(".passwordBlur1").hide();
                    $(".passwordBlur2").hide();
                    $(".passwordBlur3").show();
                    $(".passwordBlur4").hide();
                    $(".pw input").css("border", "1px solid #f43a38");
                    $(".pw input").css("border-radius", "4px");
                    return false;
                }
                if (that.ruleForm.password.length < 8) {
                    $(".passwordBlur1").hide();
                    $(".passwordBlur2").hide();
                    $(".passwordBlur3").hide();
                    $(".passwordBlur4").show();
                    $(".pw input").css("border", "1px solid #f43a38");
                    $(".pw input").css("border-radius", "4px");
                    return false;
                } else {
                    $(".passwordBlur1").show();
                    $(".passwordBlur2").hide();
                    $(".passwordBlur3").hide();
                    $(".passwordBlur4").hide();
                    $(".pw input").css("border", "1px solid #c0c4cc");
                    return true;
                }


            },
            passwords() {
                let that = this;
                that.ruleForm.passwordTwo = $.trim(that.ruleForm.passwordTwo);
                let reg = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[~!@#$%\^&*()_+`\-={}:";'[\]/\\<>?,.\/ ]).{8,20}$/;
                if (that.ruleForm.passwordTwo == "") {
                    $(".passwordBlur1s").hide();
                    $(".passwordBlur2s").hide();
                    $(".passwordBlur3s").show();
                    $(".passwordBlur4s").hide();
                    $(".passwordBlur5s").hide();
                    $(".pws input").css("border", "1px solid #f43a38");
                    $(".pws input").css("border-radius", "4px");
                    return false;
                }
                if (!reg.test(that.ruleForm.passwordTwo)) {
                    console.log("验证",)
                    $(".passwordBlur1s").hide();
                    $(".passwordBlur2s").hide();
                    $(".passwordBlur3s").show();
                    $(".passwordBlur4s").hide();
                    $(".passwordBlur5s").hide();
                    $(".pws input").css("border", "1px solid #f43a38");
                    $(".pws input").css("border-radius", "4px");
                    return false;
                }
                if (that.ruleForm.passwordTwo.length < 8) {
                    $(".passwordBlur1s").hide();
                    $(".passwordBlur2s").hide();
                    $(".passwordBlur3s").hide();
                    $(".passwordBlur4s").show();
                    $(".passwordBlur5s").hide();
                    $(".pws input").css("border", "1px solid #f43a38");
                    $(".pws input").css("border-radius", "4px");
                    return false;
                }
                if (that.ruleForm.passwordTwo != that.ruleForm.password) {
                    $(".passwordBlur1s").hide();
                    $(".passwordBlur2s").hide();
                    $(".passwordBlur3s").hide();
                    $(".passwordBlur4s").hide();
                    $(".passwordBlur5s").show();
                    $(".pws input").css("border", "1px solid #f43a38");
                    $(".pws input").css("border-radius", "4px");
                    return false;
                } else {
                    $(".passwordBlur1s").show();
                    $(".passwordBlur2s").hide();
                    $(".passwordBlur3s").hide();
                    $(".passwordBlur4s").hide();
                    $(".passwordBlur5s").hide();
                    $(".pws input").css("border", "1px solid #c0c4cc");
                    return true;
                }


            },
            validateStrAndNo(str) {
                let reg = /^[0-9a-zA-Z]+$/;

                if (str.indexOf("_") != -1) {
                    return false;
                }
                return reg.test(str);


            }


        }
    }
</script>
<style lang="scss">


    .login input {
        height: 50px !important;
        font-size: 16px !important;
        color: #999 !important;
        width: 100%;

    }

    .login .el-form-item {
        margin: 0;
    }

    .login .login-btn button {
        height: 50px !important;
        line-height: 50px !important;
        padding: 0 !important;
        font-size: 16px !important;
    }

    .login .el-form-item {
        margin-bottom: 0 !important;
    }
</style>
<style scoped lang="scss">
    body {
        font-family: "微软雅黑";
        padding-top: 0;
        padding-bottom: 20px;
        background: #fff;
        opacity: 1;
        max-width: 100%;
        max-height: 100%;
        font-size: 14px;
    }

    .login * {
        line-height: 1;
    }

    .Allen {
        height: 100%;
        /*min-height: 760px;*/
        background: #f8f8f8;
        position: relative;
    }

    .AllenLogo {
        box-sizing: border-box;
        height: 60px;
        background-size: contain;
        background-repeat: no-repeat;
        width: 100%;
        padding-top: 15px;
        background: #3b516f;
        position: relative;
        left: 0;
        top: 0;
    }

    .Logo_inner {
        height: 60px;
        background: url(../../../static/img/Hightalk-Logo_36090@2x2.png) 50% no-repeat;;
        width: 240px;
        height: 30px;
        z-index: 9;
        background-size: contain;
        padding: 10px;
        line-height: 60px;

    }

    .Allen-tip {
        position: absolute;
        left: 0;
        bottom: 0px;
        padding-bottom: 5px;
        z-index: 9;
        font-size: 14px;
        text-align: center;
        width: 100%;
        color: #999999;
        background: #f8f8f8;;
    }

    .ms-title-l {
        display: inline-block;
    }

    .ms-title-r {
        position: absolute;
        right: 40px;
        top: 40px;
        font-size: 16px;
        color: #555;
    }

    .ms-title-r .cuur {
        color: #2a8ce7;
        text-decoration: none;
        cursor: pointer;
    }

    .userName {
        /*padding-top: 30px;*/
    }

    body {
    }

    .login-wrap {
        min-width: 890px;
        background: #f8f8f8;
        position: relative;
        padding-top: 60px;
        padding-bottom: 40px;
    }

    .innerInput {

        width: 500px;
    }

    .userName > * {
        display: inline-block;
    }

    .ms-title {
        width: 100%;
        /*line-height: 50px;*/
        /*text-align: center;*/
        /*font-size: 20px;*/
        position: relative;
        text-align: center;
        font-size: 30px;
        color: #333;
    }

    .ms-login {
        height: 100%;
        width: 1000px;
        border-radius: 5px;
        overflow: hidden;
        background: #fff;
        padding: 40px 250px;
        padding-bottom: 50px;
        margin: auto;
        /*margin-top: 60px;*/
        /*margin-bottom: 100px;*/
        position: relative;
    }

    .ms-content {
        /*padding: 30px 30px;*/
        padding-top: 40px;
    }

    .login-btn {
        text-align: center;
    }

    .login-btn button {
        width: 100%;
        height: 36px;
        margin-bottom: 10px;
    }

    .login-tips {
        font-size: 12px;
        line-height: 30px;
        color: #fff;
    }
</style>
