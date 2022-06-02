<template>
  <div id="forgetpwd_checkout">
    <!--中间部分-->
    <div class="main bannerimg">
      <div class="mid">
        <ul class="row w">
          <li class="col">
            <div class="router">
              <span>当前位置：</span>
              <router-link
                tag="a"
                :to="{ name: 'home', params: { define: this.routeDefine } }"
                >首页</router-link
              >
              <router-link
                tag="a"
                :to="{
                  name: 'forgetpwd1',
                  params: { define: this.routeDefine, type: 1 }
                }"
                >忘记密码</router-link
              >
            </div>
          </li>
        </ul>
        <!-- 主体 -->
        <div class="J-main J-auto">
          <div class="J-loading-box">
            <ul class="J-loading-box__ul">
              <li class="J-loading-box__li J-after-w90">
                <div class="J-loading-box__li_info J-active">
                  <span class="J-cicrl">✔</span>
                  <p class="J-cicrl_p">填写账号</p>
                </div>
              </li>
              <li class="J-loading-box__li J-after-w90">
                <div class="J-loading-box__li_info J-active">
                  <span class="J-cicrl">✔</span>
                  <p class="J-cicrl_p">身份验证</p>
                </div>
              </li>
              <li class="J-loading-box__li">
                <div class="J-loading-box__li_info">
                  <span class="J-cicrl">3</span>
                  <p class="J-cicrl_p">新密码</p>
                </div>
              </li>
              <div class="J-last-li">
                <span class="J-cicrl">4</span>
                <p class="J-cicrl_p">完成</p>
              </div>
            </ul>
          </div>
          <!-- 短信验证 -->
          <div class="J-check" style="width: 480px" v-if="forget_phone">
            <p class="J-find-page_p">
              <span class="J-find-page_span">* </span>图文验证码
            </p>
            <ul class="J-check__ul">
              <li
                class="J-check__li"
                style="width: 68.5%; vertical-align: bottom"
              >
                <div class="J-check-img">
                  <img
                    class="J-check-img_img"
                    src="../../assets/img/forgetpwd/J-check2.png"
                    alt=""
                  />
                  <input
                    type="text"
                    class="J-check_input"
                    placeholder="请输入图文验证码"
                    v-model="imgCode"
                    style="font-size: 16px"
                    @blur="getforget_img"
                    maxlength="4"
                  />
                </div>
              </li>
              <li
                class="J-check__li"
                style="width: 31.5%; vertical-align: bottom"
              >
                <div
                  class="J-check-code"
                  @click="getImgCode"
                  style="text-align: center; line-height: 48px"
                >
                  <img :src="reg_image" />
                </div>
              </li>
            </ul>
            <span class="J-smb span-i" id="forget_imgCodeTip"></span>
            <!-- <div>&nbsp;</div> -->
            <div
              style="
                display: flex;
                justify-content: space-between;
                margin: 15px 0;
              "
            >
              <h1 class="J-check_h1" v-text="forget_text"></h1>
              <a
                class="J-code"
                style="margin-top: 0"
                @click="getVerificationCode()"
                v-text="codeButton"
              ></a>
            </div>
            <p class="J-find-page_p">
              <span class="J-find-page_span">* </span>手机验证码
            </p>
            <div class="J-check-img">
              <img
                class="J-check-img_img"
                src="../../assets/img/forgetpwd/J-check2.png"
                alt=""
              />
              <!-- J-pb-75 -->
              <input
                type="text"
                class="J-check_input"
                placeholder="请输入完整的验证码"
                v-model="phoneCode"
                @blur="getPhoneCode"
                maxlength="6"
                @keypress.enter="next_step"
              />
              <span class="J-smb span-i" id="phoneCodeTip"></span>
            </div>
            <p class="J-find-page_p">
              <span class="J-find-page_span">* </span>新密码
            </p>
            <div class="J-check-img">
              <img
                class="J-check-img_img"
                src="../../assets/img/forgetpwd/J-lock.png"
                alt=""
              />
              <input
                type="password"
                class="J-check_input"
                placeholder="请输入新密码"
                v-model="newpwd"
                @blur="getnewpwd"
                maxlength="20"
                @keypress.enter="next_step"
              />
              <span class="J-smb span-i" id="newpwdTip"
                >密码长度为8-20个字符，且必须同时包含数字、大写字母和小写字母</span
              >
            </div>
            <p class="J-find-page_p">
              <span class="J-find-page_span">* </span>确认新密码
            </p>
            <div class="J-check-img J-pb-75">
              <img
                class="J-check-img_img"
                src="../../assets/img/forgetpwd/J-lock.png"
                alt=""
              />
              <input
                type="password"
                class="J-check_input"
                placeholder="请再次输入新密码"
                v-model="newpwdagain"
                @blur="getnewpwdagain"
                maxlength="20"
                @keypress.enter="next_step"
              />
              <span class="J-smb span-i" id="newpwdagainTip"></span>
            </div>
            <div class="J-button-box J-pb-0">
              <button class="J-next" @click="next_step">确定</button>
              <p class="J-bottom-tip">
                短信用不了？
                <router-link
                  tag="a"
                  class="J-bottom-tip_a"
                  href="javascript:void(0)"
                  :to="{
                    name: 'forgetpwd2',
                    params: { define: this.routeDefine, tabtype: this.type }
                  }"
                >
                  变更其他验证方式</router-link
                >
              </p>
            </div>
          </div>
          <!-- 邮箱验证 -->
          <div class="J-check" v-if="forget_email">
            <h1 class="J-check_h1">
              请用电子邮箱{{ forget_email | emailDes }}获取邮件验证码
            </h1>
            <a
              class="J-code"
              @click="getVerificationCode()"
              v-text="codeButton"
            ></a
            ><!-- J-pb-75 -->
            <div class="J-check-img" style="margin-top: 5px">
              <img
                class="J-check-img_img"
                src="../../assets/img/forgetpwd/J-check2.png"
                alt=""
              />
              <input
                type="text"
                class="J-check_input"
                placeholder="请输入邮箱验证码"
                v-model="emailCode"
                @blur="getEmailCode"
                maxlength="6"
                @keypress.enter="next_step"
              />
              <span class="J-smb span-i" id="emailCodeTip"></span>
            </div>
            <div class="J-check-img">
              <img
                class="J-check-img_img"
                src="../../assets/img/forgetpwd/J-lock.png"
                alt=""
              />
              <input
                type="password"
                class="J-check_input"
                placeholder="请输入新密码"
                v-model="newpwd"
                @blur="getnewpwd"
                maxlength="20"
                @keypress.enter="next_step"
              />
              <img
                src="../../assets/img/hide.png"
                alt=""
                class="pwd_img"
                v-show="imgShow == 0"
                @click="changeType($event, 'imgShow', 1)"
              />
              <img
                src="../../assets/img/show.png"
                alt=""
                class="pwd_img"
                v-show="imgShow == 1"
                @click="changeType($event, 'imgShow', 0)"
              />
              <span class="J-smb span-i" id="newpwdTip"
                >密码长度为8-20个字符，且必须同时包含数字、大写字母和小写字母</span
              >
            </div>
            <!-- <p class="J-find J-mp-0" style="margin-left:0" v-show="newpwdTips">密码长度为8-20个字符，且必须同时包含数字、大写字母和小写字母</p> -->
            <div class="J-check-img J-pb-75">
              <img
                class="J-check-img_img"
                src="../../assets/img/forgetpwd/J-lock.png"
                alt=""
              />
              <input
                type="password"
                class="J-check_input"
                placeholder="请再次输入新密码"
                v-model="newpwdagain"
                @blur="getnewpwdagain"
                maxlength="20"
                @keypress.enter="next_step"
              />
              <img
                src="../../assets/img/hide.png"
                alt=""
                class="pwd_img"
                v-show="imgShow1 == 0"
                @click="changeType($event, 'imgShow1', 1)"
              />
              <img
                src="../../assets/img/show.png"
                alt=""
                class="pwd_img"
                v-show="imgShow1 == 1"
                @click="changeType($event, 'imgShow1', 0)"
              />
              <span class="J-smb span-i" id="newpwdagainTip"></span>
            </div>
            <div class="J-button-box J-pb-0">
              <button class="J-next" @click="next_step">确定</button>
              <p class="J-bottom-tip">
                电子邮箱用不了？
                <router-link
                  tag="a"
                  class="J-bottom-tip_a"
                  href="javascript:void(0)"
                  :to="{
                    name: 'forgetpwd2',
                    params: { define: this.routeDefine, tabtype: this.type }
                  }"
                >
                  变更其他验证方式</router-link
                >
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "forgetpwd_checkout",
  data() {
    return {
      routeDefine: this.$route.params.define,
      id: this.$route.params.id,
      type: this.$route.params.type,
      forget_email: "", //邮箱（加密）
      forget_phone: "", //手机号码（加密）
      imgCode: "", //输入的图文验证码
      forget_text: "", //展示
      reg_image: "",
      countdown: 300, //时间
      codeButton: "获取验证码",
      isReal: false, //图文验证码是否正确
      phoneCode: "", //输入的手机验证码
      emailCode: "", //输入的邮箱验证码
      imgkey: "", //图文验证码的key
      // codekey:'',//手机验证码的key
      timer: "", //定时器名字
      //新密码
      newpwd: "", //新密码
      newpwdagain: "", //确认密码
      newpwdTips: true, //
      issend: 1,
      imgShow: 0,
      imgShow1: 0
    };
  },
  created() {
    //初始化信息
    this.getdata();
    // this.getImgCode();
  },
  methods: {
    // 获取用户信息
    getdata() {
      if (!sessionStorage.getItem("username")) {
        this.$swal("您还未填写用户名？", { button: "确定" }).then(result => {
          this.$router.push({
            name: "forgetpwd1",
            params: { define: this.routeDefine, type: this.type }
          });
        });
      }
      let params = {
        albp0052: sessionStorage.getItem("username"),
        albp0087: 1
      };
      if (sessionStorage.getItem("areaid")) {
        params.areaid = sessionStorage.getItem("areaid").substring(0, 2);
        params.albp0087 = 2;
      }
      this.utilscommit.requestapi(
        "getVolEmailByUserFlag",
        params,
        this.userinfoBack
      );
    },
    // 用户信息返回结果
    userinfoBack(result) {
      if (result) {
        if (result.data) {
          if (this.id == 1) {
            //邮箱
            this.forget_email = sessionStorage.getItem("email");
            this.forget_text =
              "请用电子邮箱" + result.data.albp0081 + "获取邮件验证码";
          }
          if (this.id == 2) {
            this.forget_phone = sessionStorage.getItem("phone"); //手机号码
            this.forget_text =
              "请用手机" + result.data.showphone + "获取短信验证码";
          }
        } else {
          sessionStorage.removeItem("username");
          this.$router.push({
            name: "forgetpwd1",
            params: { define: this.routeDefine, type: this.type }
          });
        }
      }
    },
    // 获取图文验证码
    getImgCode() {
      this.imgCode = "";
      if (this.timer) {
        clearTimeout(this.timer); //使timeout失效
        $("#codebutton").removeAttr("disabled");
        this.timer = null;
      }
      this.phoneCode = "";
      this.codeButton = "获取验证码";
      this.countdown = 60;
      this.utilscommit.request("nvsi_getImageCode", null, this.imgCodeBack); //验证图形验证码
    },
    // 图文验证码返回结果
    imgCodeBack(result) {
      if (result && result.data) {
        this.reg_image = result.data.img;
        this.imgkey = result.data.imgkey;
      }
    },
    // 验证输入的图文验证码
    getforget_img() {
      this.isReal = false;
      if (!this.imgCode) {
        this.formTip("forget_imgCode", "请输入图文验证码");
      } else {
        //var imgcode = this.common.trimAll(this.imgCode).toUpperCase();//将验证码变为大写
        this.utilscommit.request(
          "nvsi_getImgCodeCheck",
          { imgcode: this.imgCode, imgkey: this.imgkey },
          this.checkImgCodeBack
        ); //验证图文验证码
      }
    },
    // 返回图文验证码的校验结果
    checkImgCodeBack(result) {
      if (result) {
        if (result.data) {
          this.isReal = true;
          this.formTip("forget_imgCode", "");
        } else {
          this.formTip("forget_imgCode", "图文验证码错误");
        }
      }
    },
    // 获取验证码
    getVerificationCode() {
      if (this.id == 1 && this.issend == 1) {
        // 获取邮箱验证码
        let params = {
          email: this.forget_email
        };
        // 发送邮箱验证码
        this.utilscommit.requestapi(
          "sentEmailCodeFortisWeb",
          params,
          ({ code, data }) => {
            if (code == 0 && data) {
              this.setTime();
            } else {
              this.$swal("获取验证码失败", { buttos: "确定" });
            }
          }
        );
        this.issend = 0;
      } else if (this.countdown == 60) {
        //获取手机验证码 若页面计时未置零，不能发送请求
        // var imgcode = this.common.trimAll(this.imgCode).toUpperCase();
        var data = {
          imgcode: this.imgCode,
          phonenum: sessionStorage.getItem("phone"),
          userflag: sessionStorage.getItem("username"),
          imgkey: this.imgkey
        };
        this.utilscommit.request("nvsi_sendCode", data, this.sendPhoneCodeBack); //发送手机验证码
      }
    },
    // 发送验证码结果
    sendPhoneCodeBack(result) {
      if (result) {
        if (result.data) {
          //  this.codekey=result.message;
          this.setTime();
        } else {
          if (this.imgCode) {
            this.$swal(result.message);
          } else {
            this.$swal("请输入图文验证码");
          }
        }
      }
    },
    // 设置发送验证码的按钮状态
    setTime() {
      if (this.countdown == 0) {
        $("#codebutton").removeAttr("disabled");
        this.codeButton = "获取验证码";
        this.countdown = 300;
        this.issend = 1;
        return;
      } else {
        $("#codebutton").attr("disabled", true);
        this.codeButton = "重新发送需" + this.countdown + "s";
        this.countdown--;
        let _this = this;
        this.timer = setTimeout(function() {
          _this.setTime();
        }, 1000);
      }
    },
    // 邮箱验证码返回结果
    sendEmailBack(result) {
      if (result) {
        // this.codekey=result.msg;
        this.$swal(result.message, { button: "确定" });
        if (result.data) this.setTime();
      }
    },
    // 校验手机验证码
    getPhoneCode() {
      if (!this.phoneCode) {
        this.formTip("phoneCode", "请输入手机验证码");
        return false;
      }
      this.formTip("phoneCode", "");
      return true;
    },
    // 校验邮箱验证码
    getEmailCode() {
      if (!this.emailCode) {
        this.formTip("emailCode", "请输入邮箱验证码");
        return false;
      }
      this.formTip("emailCode", "");
      return true;
    },
    // 验证密码
    getnewpwd() {
      if (!this.newpwd) {
        this.formTip("newpwd", "新密码不能为空");
        this.newpwdTips = false;
        return false;
      } else if (!this.common.checkPW(this.newpwd)) {
        this.formTip(
          "newpwd",
          "密码长度为8-20个字符，且必须同时包含数字、大写字母和小写字母"
        );
        this.newpwdTips = false;
        return false;
      } else {
        this.newpwdTips = true;
      }
      this.formTip("newpwd", "");
      return true;
    },
    // 验证确认密码
    getnewpwdagain() {
      if (!this.newpwdagain) {
        this.formTip("newpwdagain", "第二次输入的新密码不能为空");
        return false;
      } else if (!this.common.checkPW(this.newpwdagain)) {
        this.newpwdTips = false;
        this.formTip(
          "newpwd",
          "密码长度为8-20个字符，且必须同时包含数字、大写字母和小写字母"
        );
        return false;
      } else if (this.newpwdagain != this.newpwd) {
        this.formTip("newpwdagain", "两次输入的密码不一致，请重新输入");
        return false;
      }
      this.formTip("newpwdagain", "");
      return true;
    },
    // 下一步
    next_step() {
      if (this.id == 1) {
        // 邮箱
        if (this.getEmailCode() && this.getnewpwd() && this.getnewpwdagain()) {
          let params = {
            code: this.emailCode,
            username: sessionStorage.getItem("username"),
            email: sessionStorage.getItem("email"),
            newpw: this.newpwd
          };
          console.log(params);
          this.utilscommit.requestapi(
            "forgetPasswordFortisWeb",
            params,
            this.codeBack
          );
        }
      } else {
        // 手机号码
        if (!this.isReal) {
          this.formTip("forget_imgCode", "请输入图文验证码");
        } else if (
          this.isReal &&
          this.getPhoneCode() &&
          this.getnewpwd() &&
          this.getnewpwdagain()
        ) {
          this.utilscommit.request(
            "nvsi_checkCode",
            {
              code: this.phoneCode,
              phone: sessionStorage.getItem("phone"),
              username: sessionStorage.getItem("username"),
              password: this.newpwd
            },
            this.codeBack
          ); //校验手机验证码
        }
      }
    },
    // 验证码和短信校验结果
    codeBack({ code }) {
      if (code == 0) {
        sessionStorage.removeItem("email");
        sessionStorage.removeItem("username");
        this.$router.push({
          name: "forgetpwd4",
          params: { define: this.routeDefine }
        });
      } else {
        this.$swal("重置密码失败！", { button: "确定" });
      }
    },
    // 展示
    formTip(el, tip) {
      $("#" + el + "Tip").html(tip);
    },
    // 密码框小眼睛点击事件切换
    changeType(el, name, type) {
      if (name == "imgShow") {
        //密码
        this.imgShow = type;
      } else if (name == "imgShow1") {
        //确认密码
        this.imgShow1 = type;
      }
      if (type == 0) {
        //隐藏
        el.target.parentNode.children[1].type = "password";
      } else if (type == 1) {
        //显示
        el.target.parentNode.children[1].type = "text";
      }
    }
  }
};
</script>

<style scoped>
@import "../../assets/css/mainpwd.css";

.J-check .J-check-img {
  margin-top: 0px;
}
.J-check .J-check-img .J-smb {
  margin-bottom: 15px;
}
.pwd_img {
  top: 10px;
}
</style>
