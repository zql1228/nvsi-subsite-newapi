<template>
  <div id="forgetpwd3">
    <!--中间部分-->
    <div class="main bannerimg">
      <div class="mid">
        <ul class="row w">
          <li class="col">
            <div class="router">
              <span>当前位置：</span>
              <router-link tag="a" :to="{ name: 'home' }">首页</router-link>
              <router-link
                tag="a"
                :to="{ name: 'forgetpwd1', params: { type: 1 } }"
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
                  <span class="J-cicrl">✔</span>
                  <p class="J-cicrl_p">身份验证</p>
                </div>
              </li>
              <li class="J-loading-box__li">
                <div class="J-loading-box__li_info J-active">
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
          <div class="J-check">
            <h1 class="J-check_h1">重置密码</h1>
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
              <span class="J-smb span-i" id="newpwdTip"></span>
            </div>
            <p class="J-find J-mp-0" style="margin-left: 0" v-show="newpwdTips">
              密码长度为8-20个字符，且必须同时包含数字、大写字母和小写字母
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
            <div class="J-button-box">
              <button class="J-next" @click="next_step">下一步</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "forgetpwd3",
  data: function() {
    return {
      routeDefine: this.$route.params.define,
      newpwd: "", //新密码
      newpwdagain: "", //确认密码
      newpwdTips: true //
    };
  },
  created() {
    //初始化信息
    this.getdata();
  },
  methods: {
    getdata() {
      //获取用户信息
      if (!sessionStorage.getItem("username")) {
        this.$swal("您还未填写用户名？", { button: "确定" }).then(result => {
          this.$router.push({
            name: "forgetpwd1",
            params: { define: this.routeDefine, type: 1 }
          });
        });
      }
    },
    getnewpwd() {
      //验证密码
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
    getnewpwdagain() {
      //验证确认密码
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
    next_step() {
      //下一步
      if (this.getnewpwd() && this.getnewpwdagain()) {
        this.utilscommit.request(
          "nvsi_findPassword",
          {
            username: sessionStorage.getItem("username"),
            password: this.newpwd
          },
          this.updatePwdBack
        ); //验证用户名
      }
    },
    updatePwdBack(result) {
      if (result) {
        if (result.data) {
          sessionStorage.removeItem("email");
          sessionStorage.removeItem("phone");
          sessionStorage.removeItem("username");
          this.$router.push({
            name: "forgetpwd4",
            params: { define: this.routeDefine }
          });
        } else {
          this.$swal(result.message, { bottom: "确定" });
        }
      }
    },
    formTip(el, tip) {
      //展示
      $("#" + el + "Tip").html(tip);
    }
  }
};
</script>

<style scoped>
@import "../../assets/css/mainpwd.css";
</style>
