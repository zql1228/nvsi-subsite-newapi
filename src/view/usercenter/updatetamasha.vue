<template>
  <li class="col v-t white tab-container">
    <updatemenu></updatemenu>
    <div class="tabbar-down">
      <!-- 赛会志愿者 -->
      <div class="grid g-14 auto">
        <div class="form mb-10">
          <p class="form-label">姓的拼音：<i>（请不要填写汉字)</i></p>
          <input type="text" v-model="basicInfo.albp0050" @blur="firstNameCheck" id="albp0050" oninput="this.value=this.value.replace(/[^a-z]/g,'')" maxlength="30"
            placeholder="请输入姓的拼音" />
          <span style="display: inline-block; font-size: 14px" id="albp0050Tips"></span>
        </div>

        <div class="form mb-10">
          <p class="form-label">名的拼音：<i>（请不要填写汉字)</i></p>
          <input type="text" v-model="basicInfo.albp0071" @blur="lastNameCheck" id="albp0071" oninput="this.value=this.value.replace(/[^a-z]/g,'')" maxlength="30"
            placeholder="请输入名的拼音" />
          <span style="display: inline-block; font-size: 14px" id="albp0071Tips"></span>
        </div>
        <div class="form mb-10">
          <p class="form-label">证件有效截止日期：</p>
          <date-picker :lang="lang" v-model="basicInfo.albp0072" valueType="format" placeholder="请输入证件有效截止日期"></date-picker>
          <!-- <input type="text" id="albp0072" class="input" v-model="basicInfo.albp0072" maxlength="10" readOnly>-->
          <p class="form-error" id="albp0072Tips"></p>
        </div>
        <div class="form mb-10">
          <p class="form-label">专业：</p>
          <input type="text" v-model="basicInfo.albp0043" id="albp0043" maxlength="20" placeholder="请输入专业" />
          <p class="form-error" id="albp0043Tips"></p>
        </div>
        <div class="grid-item g-12 form">
          <p class="form-label">身高：<i>（厘米）</i></p>
          <input type="text" v-model="basicInfo.albp0074" @blur="heightCheck" id="albp0074" maxlength="5" oninput="this.value=this.value.replace(/[^\d]/g,'')"
            placeholder="请输入身高" />
          <p class="form-error" id="albp0074Tips"></p>
        </div>
        <div class="pt-30 t-c">
          <a href="javascript:void(0);" class="button" style="width: 200px" @click="onSubmit">保存修改</a>
        </div>
      </div>
    </div>
  </li>
</template>

<script>
const updatemenu = () => import("@/components/usercenter/updatemenu.vue"); //横向菜单栏

export default {
  components: { updatemenu },
  data() {
    return {
      routeDefine: this.$route.params.define,
      userInfo: this.$store.getters.getUser, //账号信息
      basicInfo: '', //志愿者信息
      lang: {
        //配置日期语音环境
        formatLocale: {
          firstDayOfWeek: 1,
        },
        monthBeforeYear: false,
      },
    };
  },
  created() {
    this.basicInfo = this.$store.getters.getBasic
    this.getBasicInfo();
  },
  methods: {
    getBasicInfo() {
      if (this.basicInfo.albp0072)
        this.basicInfo.albp0072 = this.basicInfo.albp0072.slice(0, 10);
    },
    onSubmit: function () {
      if (this.userInfo) {
        // 判断志愿者是否填写服务区域和居住区域
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
          if (
            this.firstNameCheck() &&
            this.lastNameCheck() &&
            this.heightCheck()
          ) {
            let params = {
              albp0005: this.userInfo.albp0005, // 志愿者证件号
            }
            // 姓的拼音
            this.basicInfo.albp0050 ? (params.albp0050 = this.basicInfo.albp0050) : ''
            // 名的拼音
            this.basicInfo.albp0071 ? (params.albp0071 = this.basicInfo.albp0071) : ''
            // 证件有效期
            this.basicInfo.albp0072 ? (params.albp0072 = this.basicInfo.albp0072) : ''
            // 专业
            this.basicInfo.albp0043 ? (params.albp0043 = this.basicInfo.albp0043) : ''
            // 身高
            this.basicInfo.albp0074 ? (params.albp0074 = this.basicInfo.albp0074) : ''
            this.utilscommit.requestapi('updateVolunInforOnWeb', params, this.modifyBack)
          }
        }
      } else {
        this.$utilroutes.toLogin();
      }
    },
    modifyBack: function (result) {
      if (result) {
        if (result.code == 0) {
          this.$swal("修改成功", { buttons: "确定" }).then((value) => {
            this.utilscommit.requestapi(
              "getVolunteerInfoFortisWeb",
              {
                cardno: this.userInfo.albp0005,
              },
              (res) => {
                if (res.code == 0 && res.data) {
                  this.basicInfo = res.data;
                  this.$store.commit("saveBasic", this.basicInfo);
                  Vuec.checkUser();
                } else {
                  this.$utilroutes.toLogin();
                }
              }
            );
          });
        } else {
          this.$swal(result.message, { buttons: "确定" });
        }
      }
    },
    firstNameCheck: function () {
      var tip = "";
      var flag = true;
      if (
        $("#albp0050").val() != "" &&
        !this.common.checkEnglishOnly($("#albp0050").val())
      ) {
        tip = "请填写正确的姓的拼音";
        flag = false;
      }
      this.formTip("albp0050", tip);
      return flag;
    },
    lastNameCheck: function () {
      var tip = "";
      var flag = true;
      if (
        $("#albp0071").val() != "" &&
        !this.common.checkEnglishOnly($("#albp0071").val())
      ) {
        tip = "请填写正确的名的拼音";
        flag = false;
      }
      this.formTip("albp0071", tip);
      return flag;
    },
    heightCheck: function () {
      var tip = "";
      var flag = true;
      if (
        $("#albp0074").val() != "" &&
        !this.common.checkNumber($("#albp0074").val())
      ) {
        tip = "请填写正确的身高";
        flag = false;
      }
      this.formTip("albp0074", tip);
      return flag;
    },
    formTip: function (el, tip) {
      $("#" + el + "Tips")
        .html(tip)
        .css("color", "red");
    },
  },
};
</script>

<style scoped>
.mx-datepicker {
  width: 100% !important;
}
</style>
