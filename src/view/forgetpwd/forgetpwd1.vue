<template>
  <div id="forgetpwd1">
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

        <div class="tabbar">
          <a
            :class="{ active: tab == 1 }"
            @click="changeTab(1)"
            style="font-size: 16px"
            >志愿者</a
          >
          <a
            :class="{ active: tab == 2 }"
            @click="changeTab(2)"
            style="font-size: 16px"
            >志愿队伍</a
          >
        </div>
        <!-- 主体 -->
        <div class="J-main J-auto">
          <div class="J-loading-box">
            <ul class="J-loading-box__ul">
              <li class="J-loading-box__li J-after-w90">
                <div class="J-loading-box__li_info J-active">
                  <span class="J-cicrl">1</span>
                  <p class="J-cicrl_p">填写账号</p>
                </div>
              </li>
              <li class="J-loading-box__li">
                <div class="J-loading-box__li_info">
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
          <div class="J-check">
            <h1 class="J-check_h1" v-text="tabName"></h1>
            <div class="J-check-img">
              <img
                class="J-check-img_img"
                src="../../assets/img/forgetpwd/J-check1.png"
                alt=""
              />
              <input
                type="text"
                class="J-check_input"
                :placeholder="nameHolder"
                v-model="username"
                @blur="getforget_name"
                maxlength="25"
                @keypress.enter="next_step1"
              />
              <span class="span-i J-smb" id="forget_nameTip"></span>
            </div>
            <div v-show="tab == 2" class="J-check-img">
              <select
                name=""
                id=""
                style="
                  width: 100%;
                  height: 50px;
                  border: 1px solid #dcdcdc;
                  padding-left: 13px;
                  color: #999999;
                "
                v-model="areaid"
              >
                <option value="">请选择队伍所在区域</option>
                <option
                  v-for="item in areaList"
                  :key="item.areaid"
                  :value="item.areaid"
                >
                  {{ item.name }}
                </option>
              </select>
              <span class="span-i J-smb" id="forget_areaTip"></span>
            </div>
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
                    v-model="username_imgCode"
                    @blur="getforget_img"
                    maxlength="4"
                    @keypress.enter="next_step1"
                  />
                </div>
              </li>
              <li
                class="J-check__li"
                style="width: 31.5%; vertical-align: bottom"
              >
                <div
                  class="J-check-code"
                  @click="getImgCode()"
                  id="imgCode"
                  style="text-align: center; line-height: 48px; cursor: pointer"
                >
                  <img :src="imgcode" />
                </div>
              </li>
            </ul>
            <span class="span-i J-smb" id="forget_imgCodeTip"></span>
            <p v-show="tab == 1" class="J-find">
              用户名、身份证号全部忘记？ 通过
              <router-link
                :to="{
                  name: 'findpwd',
                  params: { define: routeDefine }
                }"
                class="J-find_a"
                >申诉</router-link
              >
              找回
            </p>
            <div class="J-button-box" style="padding-top: 39px">
              <button class="J-next" @click="next_step1">下一步</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "forgetpwd1",
  data: function() {
    return {
      routeDefine: this.$route.params.define,
      w_imageCode: "", //图文验证码
      username: "", //用户名
      username_imgCode: "", //用户名相关图文验证码
      isReal: false, //是否正确
      timer: "", //定时器
      tab: this.$route.params.type, //用户类型  1=志愿者，2志愿队伍
      tabName: "",
      nameHolder: "",
      imgcode: "",
      imgkey: "",
      usernameFlag: false, // 用户名校验是否通过
      imgCodeFlag: false, // 图片验证码校验是否通过
      areaList: this.common.areaList, // 区划列表
      areaid: ""
    };
  },
  created() {
    window.Vues = this; //主体页面vue实例挂载
    this.changeTab(this.tab);
    this.getImgCode();
  },
  methods: {
    getImgCode() {
      // 获取图文验证码
      this.utilscommit.requestapi(
        "getImageCodeFortisWeb",
        null,
        this.imgCodeBack
      );
    },
    // 获取图文验证码返回结果
    imgCodeBack(result) {
      if (result.code == 0 && result.data) {
        this.imgkey = result.data.imgkey;
        this.imgcode = result.data.img;
      }
    },
    // 校验用户名是否已注册
    getforget_name() {
      if (!this.username) {
        let txt = this.tab == 1 ? "请输入用户名或身份证号码" : "请输入用户名";
        this.formTip("forget_name", txt);
        this.usernameFlag = false;
      } else {
        this.formTip("forget_name", "");
        let params = {
          albp0052: this.username
        };
        this.utilscommit.requestapi("getVolNameCheckFortisWeb", params, res => {
          if (res.code != 0) {
            this.usernameFlag = true;
            this.formTip("forget_name", "");
          } else {
            this.usernameFlag = false;
            this.formTip("forget_name", "用户名不存在，请重新输入");
            this.getImgCode();
          }
        });
      }
    },
    // 校验用户名是否注册结果
    checkUsernameBack(result) {
      if (result && result.data) {
        this.formTip("forget_name", "");
        this.isReal = true;
      } else {
        var txt =
          this.tab == 1
            ? "用户名或身份证号不存在，请重新输入"
            : "用户名不存在，请重新输入";
        this.formTip("forget_name", txt);
        this.getImgCode();
      }
    },
    // 验证图文验证码
    getforget_img() {
      if (!this.username_imgCode) {
        this.formTip("forget_imgCode", "请输入图文验证码");
        this.imgCodeFlag = false;
      } else {
        this.formTip("forget_imgCode", "");
        let params = {
          imgkey: this.imgkey,
          code: this.username_imgCode.toUpperCase()
        };
        this.utilscommit.requestapi(
          "verificationCodeFortisWeb",
          params,
          res => {
            if (res && res.code == 0) {
              this.formTip("forget_imgCode", "");
              this.imgCodeFlag = true;
            } else {
              this.formTip("forget_imgCode", "验证码错误");
              this.imgCodeFlag = false;
            }
          }
        );
      }
    },
    // 下一步
    next_step1() {
      if (this.usernameFlag && this.imgCodeFlag) {
        if (this.tab == 2 && !this.areaid) {
          return this.formTip("forget_area", "请选择队伍所在区域");
        }
        sessionStorage.setItem("username", this.username);
        sessionStorage.setItem("areaid", this.areaid);
        this.$router.push({
          name: "forgetpwd2",
          params: { define: this.routeDefine, tabtype: this.tab }
        });
      }
    },
    // 展示提示
    formTip(el, tip) {
      $("#" + el + "Tip").html(tip);
    },
    changeTab(tab) {
      this.tab = tab;
      this.tabName = tab == 1 ? "用户名或身份证号验证" : "用户名验证";
      this.nameHolder = tab == 1 ? "请输入用户名或身份证号码" : "请输入用户名";
      this.username = "";
      this.username_imgCode = "";
      this.formTip("forget_name", "");
      this.formTip("forget_imgCode", "");
    }
  },
  watch: {
    areaid() {
      if (!this.areaid) {
        this.formTip("forget_area", "请选择队伍所在区域");
      } else {
        this.formTip("forget_area", "");
      }
    }
  }
};
</script>

<style scoped>
@import "../../assets/css/mainpwd.css";
</style>
