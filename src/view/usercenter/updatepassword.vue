<template>
  <li class="col v-t white tab-container">
    <updatemenu></updatemenu>
    <form id="pwForm">
      <div class="grid g-14 auto">
        <div class="form">
          <p class="form-label"><em>*</em>原密码：</p>
          <input
            type="password"
            v-model="oldPw"
            @blur="oldPwCheck"
            id="oldPw"
            maxlength="20"
            placeholder="请输入原密码"
          /><!-- oninput="this.value=this.value.replace(/[^\w_.]/g,'');" -->
          <p class="form-error" id="oldPwTips"></p>
          <img
            src="../../assets/images/hide.png"
            alt=""
            class="pwd_img"
            v-show="imgShow == 0"
            @click="changeType($event, 'imgShow', 1)"
          />
          <img
            src="../../assets/images/show.png"
            alt=""
            class="pwd_img"
            v-show="imgShow == 1"
            @click="changeType($event, 'imgShow', 0)"
          />
        </div>
        <div class="form">
          <p class="form-label"><em>*</em>新密码：</p>
          <input
            type="password"
            v-model="newPw"
            @blur="newPwCheck"
            id="newPw"
            maxlength="20"
            placeholder="请输入新密码"
          /><!-- oninput="this.value=this.value.replace(/[^\w_.]/g,'');" -->
          <p class="form-error" id="newPwTips"></p>
          <img
            src="../../assets/images/hide.png"
            alt=""
            class="pwd_img"
            v-show="imgShow1 == 0"
            @click="changeType($event, 'imgShow1', 1)"
          />
          <img
            src="../../assets/images/show.png"
            alt=""
            class="pwd_img"
            v-show="imgShow1 == 1"
            @click="changeType($event, 'imgShow1', 0)"
          />
        </div>
        <div class="form">
          <p class="form-label"><em>*</em>确认新密码：</p>
          <input
            type="password"
            v-model="confirmPw"
            @blur="confirmPwCheck"
            id="confirmPw"
            maxlength="20"
            placeholder="请输入确认新密码"
          /><!-- oninput="this.value=this.value.replace(/[^\w_.]/g,'');" -->
          <p class="form-error" id="confirmPwTips"></p>
          <img
            src="../../assets/images/hide.png"
            alt=""
            class="pwd_img"
            v-show="imgShow2 == 0"
            @click="changeType($event, 'imgShow2', 1)"
          />
          <img
            src="../../assets/images/show.png"
            alt=""
            class="pwd_img"
            v-show="imgShow2 == 1"
            @click="changeType($event, 'imgShow2', 0)"
          />
        </div>
        <div class="pt-30 pb-40 t-c">
          <a
            href="javascript:void(0);"
            class="button"
            style="width: 200px"
            @click="changePw"
            >修改密码</a
          >
        </div>
      </div>
    </form>
  </li>
</template>

<script>
const updatemenu = () => import("@/components/usercenter/updatemenu.vue"); //横向菜单栏

export default {
  components: { updatemenu },
  data() {
    return {
      userInfo: this.$store.getters.getUser, //账号信息
      basicInfo: this.$store.getters.getBasic,
      oldPw: "",
      newPw: "",
      confirmPw: "",
      imgShow: 0,
      imgShow1: 0,
      imgShow2: 0,
    };
  },
  created() {
    window.Vues = this; //主体vue实例挂载
  },
  methods: {
    changePw: function () {
      if (this.userInfo) {
        // 验证志愿者是否填写服务区域和居住区域
        if (!this.userInfo.albp0020 || !this.basicInfo.albp0028) {
          this.$swal("请先完善志愿者基本信息！", {
            buttons: ["确定", "取消"],
          }).then((value) => {
            if (!value) {
              this.$router.push({
                name: "updatedata",
                params: { define: this.routeDefine },
              });
            }
          });
        } else {
          if (this.oldPwCheck() && this.newPwCheck() && this.confirmPwCheck()) {
            let params = {
              oldpw: this.oldPw,
              newpw: this.newPw,
              username: this.userInfo.albp0052,
            };
            this.utilscommit.requestapi(
              "volChangePasswordFortisWeb",
              params,
              this.changeBack
            );
          }
        }
      }
    },
    changeBack: function (result) {
      if (result.code == 0 && result.data) {
        if (result.data) {
          this.$swal("修改成功,请重新登录", { buttons: "确定" }).then(function (
            value
          ) {
            Vueh.loginOut(); //触发页眉的退出事件
          });
        } else {
          this.$swal(result.message, { buttons: "确定" });
        }
      } else {
        this.$swal(`修改失败，${result.message}`, { buttons: "确定" });
      }
    },
    oldPwCheck: function () {
      var tip = "";
      var flag = true;
      if (!this.oldPw) {
        tip = "原密码不能为空";
        flag = false;
      }
      this.formTip("oldPw", tip);
      return flag;
    },
    newPwCheck: function () {
      var tip = "";
      var flag = true;
      if (!this.newPw) {
        tip = "新密码不能为空";
        flag = false;
      } else if (!this.common.checkPW(this.newPw)) {
        tip = "密码长度为8-20个字符，且必须同时包含数字、大写字母和小写字母";
        flag = false;
      }
      this.formTip("newPw", tip);
      return flag;
    },
    confirmPwCheck: function () {
      var tip = "";
      var flag = true;
      if (!this.confirmPw) {
        tip = "确认新密码不能为空";
        flag = false;
      } else if (this.confirmPw != this.newPw) {
        tip = "两次输入密码不一致";
        flag = false;
      }
      this.formTip("confirmPw", tip);
      return flag;
    },
    formTip: function (el, tip) {
      $("#" + el + "Tips")
        .html(tip)
        .css("color", "red");
    },
    changeType(el, name, type) {
      //密码框小眼睛点击事件切换
      if (name == "imgShow") {
        //原密码
        this.imgShow = type;
      } else if (name == "imgShow1") {
        //新密码
        this.imgShow1 = type;
      } else if (name == "imgShow2") {
        //确认密码
        this.imgShow2 = type;
      }
      if (type == 0) {
        //隐藏
        el.target.parentNode.children[1].type = "password";
      } else if (type == 1) {
        //显示
        el.target.parentNode.children[1].type = "text";
      }
    },
  },
};
</script>

<style scoped>
#pwForm .form-error {
  height: 20px;
}
.form input {
  height: 42px;
  line-height: 42px;
}
.pwd_img {
  bottom: 28px;
}
</style>
