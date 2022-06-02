<template>
  <div id="forgetpwd_check">
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
              <li class="J-loading-box__li">
                <div class="J-loading-box__li_info J-active">
                  <span class="J-cicrl">2</span>
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
          <!-- 邮箱验证 -->
          <div class="J-check" v-if="forget_email">
            <h1 class="J-check_h1">请输入您绑定的电子邮箱</h1>
            <h2 class="J-check_h2">{{ forget_email | emailDes }}</h2>
            <div class="J-check-img J-pb-75">
              <img
                class="J-check-img_img"
                src="../../assets/img/forgetpwd/J-email1.png"
                alt=""
              />
              <input
                type="text"
                class="J-check_input"
                placeholder="请输入电子邮箱"
                v-model="email"
                @blur="getemail"
                maxlength="50"
                @keypress.enter="next_step(1)"
              />
              <span class="J-smb span-i" id="getemailTip"></span>
            </div>
            <div class="J-button-box">
              <button class="J-cancle" @click="nobtn">取消</button>
              <button class="J-sure" @click="next_step(1)">确定</button>
            </div>
          </div>
          <!-- 短信验证 -->
          <div class="J-check" v-if="forget_phone">
            <h1 class="J-check_h1">请输入您绑定的密保手机号</h1>
            <h2 class="J-check_h2" v-text="forget_phone"></h2>
            <div class="J-check-img J-pb-75">
              <img
                class="J-check-img_img"
                src="../../assets/img/forgetpwd/J-phone.png"
                alt=""
              />
              <input
                type="text"
                class="J-check_input"
                placeholder="请输入手机号码"
                v-model="phone"
                @blur="getphone"
                maxlength="11"
                @keypress.enter="next_step(2)"
              />
              <span class="J-smb span-i ass" id="getphoneTip"></span>
              <div v-if="type != 2" class="shenshu">
                注:若重新输入依然不正确，可选择点击<router-link
                  class="red"
                  :to="{
                    name: 'findpwd',
                    params: { define: this.routeDefine }
                  }"
                  >【账户申述】</router-link
                >重新绑定您的手机号码，并自动重置密码
              </div>
            </div>
            <div class="J-button-box">
              <button class="J-cancle" @click="nobtn">取消</button>
              <button class="J-sure" @click="next_step(2)">确定</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "forgetpwd_check",
  data: function() {
    return {
      routeDefine: this.$route.params.define,
      id: this.$route.params.id,
      type: this.$route.params.type,
      forget_email: "", //邮箱
      forget_phone: "", //手机号码
      userinfo: "", //用户信息
      email: "", //输入的邮箱
      phone: "" //输入的手机号码
    };
  },
  created() {
    this.getdata();
  },
  methods: {
    getdata() {
      // 获取用户信息
      if (!sessionStorage.getItem("username")) {
        this.$swal("您还未填写用户名？", { button: "确定" }).then(result => {
          this.$router.push({
            name: "forgetpwd1",
            params: { define: this.routeDefine, type: this.type }
          });
        });
      }
      // 获取志愿者/队伍邮箱
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
    // 获取邮箱返回结果
    userinfoBack(result) {
      if (result) {
        if (result.data) {
          this.userinfo = result.data;
          if (this.id == 1)
            this.forget_email = this.userinfo.albp0081 || result.data.albe0049; //邮箱
          if (this.id == 2) this.forget_phone = this.userinfo.showphone; //手机号码
        } else {
          sessionStorage.removeItem("username");
          this.$router.push({
            name: "forgetpwd1",
            params: { define: this.routeDefine, type: this.type }
          });
        }
      }
    },
    // 验证手机号码
    getphone() {
      if (!this.phone) {
        this.formTip("getphone", "请输入手机号码");
        $(".shenshu").css("display", "block");
        return false;
      } else if (!this.common.checkPhoneno(this.phone)) {
        this.formTip("getphone", "请输入正确的手机号码");
        $(".shenshu").css("display", "block");
        return false;
      } else {
        this.formTip("getphone", "");
        return true;
      }
    },
    // 验证电子邮箱
    getemail() {
      if (!this.email) {
        this.formTip("getemail", "请输入电子邮箱");
        return false;
      } else {
        this.formTip("getemail", "");
        return true;
      }
    },
    // 取消
    nobtn() {
      this.$router.push({
        name: "forgetpwd2",
        params: { define: this.routeDefine, tabtype: this.type }
      });
    },
    // 确定
    next_step(id) {
      // var params = null;
      if (id == 1 && this.getemail()) {
        // 邮箱
        if (this.email == this.forget_email) {
          sessionStorage.setItem("email", this.email);
          this.$router.push({
            name: "forgetpwd_checkout",
            params: { define: this.routeDefine, id: this.id, type: this.type }
          });
        } else {
          this.formTip("getemail", "电子邮箱不正确，请重新输入");
        }
      } else if (this.getphone()) {
        // params = {
        //   username: sessionStorage.getItem("username"),
        //   phone: this.phone,
        // };
      }
      // if (params) {
      //   // console.log(params);
      //   this.utilscommit.request("checkUsername", params, this.userLastBack); //验证用户信息
      // }
    },
    // 用户信息返回结果
    userLastBack(result) {
      if (result) {
        if (result.data) {
          if (this.id == 1) sessionStorage.setItem("email", this.email);
          if (this.id == 2) sessionStorage.setItem("phone", this.phone);
          this.$router.push({
            name: "forgetpwd_checkout",
            params: { define: routeDefine, id: this.id, type: this.type }
          });
        } else {
          if (this.id == 1)
            this.formTip("getemail", "电子邮箱不正确，请重新输入");
          if (this.id == 2) {
            this.formTip("getphone", "手机号码不正确，请重新输入");
            $(".shenshu").css("display", "block");
          }
        }
      }
    },
    // 展示
    formTip(el, tip) {
      $("#" + el + "Tip").html(tip);
    }
  }
};
</script>

<style scoped>
@import "../../assets/css/mainpwd.css";
.shenshu {
  display: none;
  width: 335px;
  font-size: 14px;
  margin-top: 20px;
}
.red {
  color: red;
}
</style>
