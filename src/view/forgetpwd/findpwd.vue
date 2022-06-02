<template>
  <div id="findpwd">
    <!--中间部分-->
    <div class="main bannerimg">
      <div class="mid">
        <ul class="row w">
          <li class="col">
            <div class="router">
              <span>当前位置：</span>
              <router-link tag="a" :to="{ name: 'home' }">首页</router-link>
              <router-link tag="a" :to="{ name: 'findpwd' }"
                >账户申诉</router-link
              >
            </div>
          </li>
        </ul>
        <!-- 主体 -->
        <div class="J-main J-auto">
          <div class="J-find-page" style="width: 1100px">
            <h1 class="J-find-page_h1">《 中国志愿服务网账号安全中心 》</h1>
            <p class="J-find-page_h1_p">
              注：仅支持志愿者进行账号申诉，若您已申诉，请点击<router-link
                href="javascript:void(0);"
                style="color: red"
                :to="{
                  name: 'appeal',
                  params: { define: routeDefine }
                }"
                >【申诉进度】</router-link
              >查询
            </p>
            <!-- 姓名输入框 -->
            <div class="J-mt-23">
              <p class="J-find-page_p">
                <span class="J-find-page_span">* </span>真实姓名
                <span style="font-size: 14px"
                  >（若姓名中涉及标点符号，请使用中文字符圆点，同右侧样式“·”)</span
                >
              </p>
              <div class="J-find-page__inputgap">
                <img
                  class="J-check-img_img"
                  src="../../assets/img/forgetpwd/J-personal.png"
                  alt=""
                />
                <input
                  type="text"
                  class="J-check_input"
                  placeholder="请输入真实姓名"
                  id="realName"
                  v-model="name"
                  @blur="getRealName"
                  maxlength="20"
                />
                <span class="J-smb span-i" id="realNameTip"></span>
              </div>
            </div>
            <!-- 证件号码输入框 -->
            <div class="J-mt-23">
              <p class="J-find-page_p">
                <span class="J-find-page_span">* </span>证件号码
              </p>
              <div class="J-find-page__inputgap">
                <img
                  class="J-check-img_img"
                  src="../../assets/img/forgetpwd/J-check1.png"
                  alt=""
                />
                <input
                  type="text"
                  class="J-check_input"
                  placeholder="请输入证件号码"
                  id="idcare"
                  v-model="cardno"
                  @blur="getIDcard"
                  maxlength="18"
                />
                <span class="J-smb span-i" id="idcareTip"></span>
              </div>
            </div>
            <!-- 新密码输入框 -->
            <div class="J-mt-23">
              <p class="J-find-page_p">
                <span class="J-find-page_span">* </span>新密码
              </p>
              <div class="J-find-page__inputgap">
                <img
                  class="J-check-img_img"
                  src="../../assets/img/forgetpwd/J-lock.png"
                  alt=""
                />
                <input
                  type="password"
                  class="J-check_input"
                  placeholder="请输入新密码"
                  id="pwd"
                  v-model="pwd"
                  @blur="getpassword"
                  maxlength="20"
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
                <span class="J-smb span-i" id="pwdTip"></span>
              </div>
            </div>

            <!-- 确认密码输入框 -->
            <div class="J-mt-23">
              <p class="J-find-page_p">
                <span class="J-find-page_span">* </span>确认密码
              </p>
              <div class="J-find-page__inputgap">
                <img
                  class="J-check-img_img"
                  src="../../assets/img/forgetpwd/J-lock.png"
                  alt=""
                />
                <input
                  type="password"
                  class="J-check_input"
                  placeholder="请输入确认密码"
                  id="repwd"
                  v-model="repwd"
                  @blur="getrepassword"
                  maxlength="20"
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
                <span class="J-smb span-i" id="repwdTip"></span>
              </div>
            </div>
            <!-- 图文验证码输入框 -->
            <div class="J-mt-23">
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
                  <div class="J-check-code" @click="getImgCode">
                    <img :src="reg_image" />
                  </div>
                </li>
              </ul>
              <span class="J-smb span-i" id="imgCodeTip"></span>
            </div>
            <!-- 区域选择框 -->
            <div class="J-mt-23">
              <p class="J-find-page_p">
                <span class="J-find-page_span">* </span>区域
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
                      placeholder="请选择区域"
                      v-model="orgAreaName"
                      style="font-size: 16px"
                      @blur="orgAreaCheck"
                      readonly
                    />
                  </div>
                </li>
                <li
                  class="J-check__li"
                  style="width: 31.5%; vertical-align: bottom"
                >
                  <a
                    class="J-code fin_pwd_button"
                    @click="chooseOrgArea"
                    id="chooseOrgArea"
                    >选择</a
                  >
                </li>
              </ul>
              <span class="J-smb span-i" id="orgAreaTip"></span>
            </div>
            <!-- 手机号输入框 -->
            <div class="J-mt-23">
              <p class="J-find-page_p">
                <span class="J-find-page_span">* </span>手机号码
              </p>
              <div class="J-find-page__inputgap">
                <img
                  class="J-check-img_img"
                  src="../../assets/img/forgetpwd/J-phone.png"
                  alt=""
                />
                <input
                  type="text"
                  class="J-check_input"
                  placeholder="请输入手机号码"
                  id="phone"
                  v-model="phone"
                  @blur="getPhone"
                  maxlength="11"
                />
                <span class="J-smb span-i" id="phoneTip"></span>
              </div>
            </div>
            <!-- 证件上传 -->
            <p class="J-find-page_p J-mt-23" style="width: 100%">
              <span class="J-find-page_span">* </span
              >上传证件照片（证件人像面、证件国徽面照片）,大小不超过150k
            </p>
            <ul
              class="J-find-page__ul"
              style="display: flex;
    justify-content: space-evenly;"
            >
              <li class="J-find-page__li">
                <div class="J-upload J-mt-20" style="width: 100%">
                  <up-image photo="1" :imgSrc="imgSrc1"></up-image>
                  <p class="J-upload_p" style="margin-left:125px;">
                    证件反面
                  </p>
                </div>
              </li>
              <li class="J-find-page__li">
                <div class="J-upload J-mt-20" style="width: 100%">
                  <up-image photo="2" :imgSrc="imgSrc2"></up-image>
                  <p class="J-upload_p" style="margin-left:125px;">
                    证件正面
                  </p>
                </div>
              </li>
              <!-- <li class="J-find-page__li">
                <div class="J-upload J-mt-20" style="width:100%;">
                  <up-image photo="3" :imgSrc="imgSrc3"></up-image>
                  <p class="J-upload_p" style="margin-left: 102px">
                    本人免冠正面照片
                  </p>
                </div>
              </li> -->
            </ul>
            <div class="J-button-box">
              <button class="J-next" @click="submitBtn" id="submitBtn">
                提交
              </button>
            </div>
          </div>
        </div>
        <!--区域选择弹窗-->
        <div class="mask area">
          <div class="mask-info">
            <div class="mask-header row w">
              <div class="col v-m">
                <h2>请选择服务区域</h2>
              </div>
              <div class="col v-m t-r">
                <a href="javascript:void(0);" @click="closeMask"
                  ><img src="../../assets/img/close.png" alt=""
                /></a>
              </div>
            </div>
            <areaDialog ref="areaDialog"></areaDialog>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const AreaDialog = () => import("@/components/area.vue"); //区域弹出层
const upImage = () => import("@/components/upImage.vue"); //上传图片
export default {
  name: "findpwd",
  components: {
    AreaDialog, //区域弹窗
    upImage
  },
  data() {
    return {
      routeDefine: this.$route.params.define,
      name: "", //姓名
      pwd: "", //密码
      repwd: "", //确认密码
      cardno: "", //证件号
      orgAreaName: "", //选择区域
      getIDcardFlag: false,
      phone: "",
      areaid: "",
      imgFile1: "",
      imgFile2: "",
      // imgFile3: "",
      imgSrc1: require("../../assets/img/IDCard01.png"),
      imgSrc2: require("../../assets/img/IDCard02.png"),
      // imgSrc3: require("../../assets/img/IDCard03.png"),
      isClick: true, //按钮状态
      //验证码
      imgCode: "", //输入的图文验证码
      reg_image: "",
      imgkey: "", //图文验证码的key
      isReal: false, //图文验证码是否正确
      imgShow: 0,
      imgShow1: 0
    };
  },
  created() {
    this.getImgCode();
  },
  methods: {
    getRealName() {
      //用户姓名验证
      if (!this.name) {
        this.formTip("realName", "真实姓名不能为空");
        return false;
      } else if (!this.common.checkName(this.name)) {
        this.formTip("realName", "请正确填写姓名");
        return false;
      }
      this.formTip("realName", "");
      return true;
    },
    getIDcard() {
      //证件号码验证
      if (!this.cardno) {
        this.formTip("idcare", "身份证号码不能为空");
        return false;
      } else {
        this.utilscommit.requestapi(
          "nvsi_cheakCardno",
          { cardno: this.cardno },
          this.getIDcardBack
        );
        return true;
      }
    },
    getIDcardBack(result) {
      //证件号码验证返回结果
      if (result && result.data) {
        this.formTip("idcare", "");
        this.getIDcardFlag = true;
      } else {
        this.formTip("idcare", result.message);
        this.getIDcardFlag = false;
      }
    },
    getpassword() {
      if (!this.pwd) {
        this.formTip("pwd", "新密码不能为空");
        return false;
      } else if (!this.common.checkPW(this.pwd)) {
        this.formTip(
          "pwd",
          "密码长度为8-20个字符，且必须同时包含数字、大写字母和小写字母"
        );
        return false;
      }
      this.formTip("pwd", "");
      return true;
    },
    getrepassword() {
      if (!this.repwd) {
        this.formTip("repwd", "确认密码不能为空");
        return false;
      } else if (!this.common.checkPW(this.repwd)) {
        this.formTip(
          "repwd",
          "密码长度为8-20个字符，且必须同时包含数字、大写字母和小写字母"
        );
        return false;
      } else if (this.repwd != this.pwd) {
        this.formTip("repwd", "两次输入的密码不一致，请重新输入");
        return false;
      }
      this.formTip("repwd", "");
      return true;
    },
    getPhone() {
      if (!this.phone) {
        this.formTip("phone", "手机号码不能为空");
        return false;
      } else if (!this.common.checkPhoneno(this.phone)) {
        this.formTip("phone", "请输入正确的手机号码");
        return false;
      }
      this.formTip("phone", "");
      return true;
    },
    orgAreaCheck() {
      //区域选择验证
      if (!this.orgAreaName) {
        this.formTip("orgArea", "服务区域不能为空");
        return false;
      }
      this.formTip("orgArea", "");
      return true;
    },
    chooseOrgArea() {
      //区域选择
      $("#preButton").css("display", "none");
      $(".category__content").css("display", "none");
      $("#first").css("display", "");
      $(".mask.area").addClass("active");
      this.$refs.areaDialog.preAreaId = "";
      this.$refs.areaDialog.preName = "";
      this.$refs.areaDialog.listArea(null, 0, 3);
    },
    confirmArea(areaid) {
      //确认选择区域
      if (
        (areaid.substring(4, 6) == "00" || areaid.substring(6, 8) != "00") &&
        areaid != "100000000000000000"
      ) {
        this.$swal("服务区域没有精确到区（县），请重新选择", {
          buttons: "确定"
        });
      } else {
        this.areaid = areaid;
        this.utilscommit.requestapi(
          "areaFullInfo",
          { areaid: areaid },
          this.getAreaname
        );
      }
    },
    getAreaname(result) {
      if (result && result.fullname) {
        this.orgAreaName = result.fullname;
      }
    },
    getImgCode() {
      //获取图文验证码
      this.imgCode = "";
      this.utilscommit.requestapi(
        "getImageCodeFortisWeb",
        null,
        this.imgCodeBack
      ); //验证图形验证码
    },
    imgCodeBack(result) {
      //图文验证码返回结果
      if (result && result.data) {
        this.reg_image = result.data.img;
        this.imgkey = result.data.imgkey;
      }
    },
    getforget_img() {
      //验证输入的图文验证码
      // this.isReal=false;
      if (!this.imgCode) {
        this.formTip("imgCode", "请输入图文验证码");
        return false;
      } else {
        //var imgcode = this.common.trimAll(this.imgCode).toUpperCase();//将验证码变为大写
        // this.utilscommit.request("nvsi_getImgCodeCheck", {"imgcode": this.imgCode,imgkey:this.imgkey}, this.checkImgCodeBack);//验证图文验证码
        this.formTip("imgCode", "");
        return true;
      }
    },

    /* checkImgCodeBack(result){//返回图文验证码的校验结果
            if(result){
                if(result.data){
                    this.isReal = true;
                    this.formTip("imgCode",'');
                }else{
                    this.isReal = false;
                    this.formTip("imgCode",'图文验证码错误');
                    this.getImgCode();
                }
            }

        }, */
    async submitBtn() {
      //提交
      if (
        this.getRealName() &&
        this.getIDcard() &&
        this.getIDcardFlag &&
        this.getpassword() &&
        this.getrepassword() &&
        this.getforget_img() &&
        this.orgAreaCheck() &&
        this.getPhone() &&
        this.isClick
      ) {
        if (!this.imgFile1) {
          this.$swal("请上传证件反面照", { buttons: "确定" });
        } else if (!this.imgFile2) {
          this.$swal("请上传证件正面照", { buttons: "确定" });
        } else {
          let { data: front } = await this.utilscommit.asyncUpload(
            this.imgFile1
          );
          if (front.code != 0 || !front.data) {
            return this.$swal("证件反面照上传失败，请更换图片或者稍后再试", {
              buttons: "确定"
            });
          }
          // 上传证件反面照
          let { data: reverse } = await this.utilscommit.asyncUpload(
            this.imgFile2
          );
          if (reverse.code != 0 || !reverse.data) {
            return this.$swal("证件正面照上传失败，请更换图片或者稍后再试", {
              buttons: "确定"
            });
          }
          this.photo1 = JSON.stringify(front.data);
          this.photo2 = JSON.stringify(reverse.data);
          console.log(front.data);
          console.log(reverse.data);
          this.commit();
        }
      }
    },
    // uploadImgResult: function(result) {
    //   if (result) {
    //     this.commit(JSON.stringify(result));
    //   } else {
    //     this.$swal("上传照片失败，请重新上传!", { buttons: "确定" });
    //   }
    // },
    commit() {
      var data = {
        name: this.name.trim(),
        cardno: this.cardno,
        code: this.imgCode.toUpperCase(),
        imgkey: this.imgkey,
        albp1011: this.pwd,
        cardphoto1: this.photo1,
        cardphoto2: this.photo2,
        albp1010: this.areaid,
        phone: this.phone
      };
      this.isClick = false;
      $("#submitBtn").css({ background: "gray", "border-color": "gray" }); //修改按钮状态
      $("#submitBtn")
        .addClass("focus")
        .css("pointer-events", "none"); //禁掉 hover 事件
      this.utilscommit.requestapi("nvsi_submitAppeal", data, this.commitback);
    },
    commitback(result) {
      if (result && result.data) {
        this.$swal(result.message, { buttons: "确定" }).then(value => {
          this.$router.push({
            name: "home",
            params: { define: this.routeDefine }
          });
        });
      } else {
        this.$swal(result.message, { buttons: "确定" });
        this.getImgCode();
        this.isClick = true;
        $("#submitBtn").css({
          background: "#ED3C3C",
          "border-color": "#ED3C3C"
        }); //修改按钮状态
        $("#submitBtn")
          .addClass("focus")
          .css("pointer-events", "auto"); //恢复 hover 事件
      }
    },
    closeMask() {
      //关闭区域弹框
      $(".mask.area").removeClass("active");
      $("#first").css("display", "");
      $(".category__item").removeClass("active");
      this.$refs.areaDialog.chooseArea = "";
      this.$refs.areaDialog.preAreaId = "";
      this.$refs.areaDialog.preName = "";
    },
    formTip(el, tip) {
      //错误提示
      $("#" + el + "Tip").html(tip);
    },
    changeType(el, name, type) {
      //密码框小眼睛点击事件切换
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

.fin_pwd_button {
  text-align: center;
  line-height: 38px;
  margin-left: 10px;
  width: -webkit-fill-available;
}
.J-find-page_h1_p {
  color: #ed3c3c;
  font-size: 14px;
  font-weight: 550;
  margin-bottom: 15px;
}
.J-find-page_h1 {
  margin: 30px 0 25px;
}
.J-check_input {
  height: 45px;
}
.J-mt-23 {
  margin-top: 8px;
  width: 46%;
  margin-right: 20px;
  display: inline-block;
}
/* .J-find-page__inputgap{
      margin-top: 8px;
  } */
.J-smb,
.J-check-img,
.J-code,
.J-find-page__inputgap,
.J-mt-20 {
  margin-top: 8px;
}
.J-smb {
  height: 15px;
}
.J-check-code,
.J-code {
  text-align: center;
  height: 43px;
}
.J-find-page__li {
  display: inline-block;
  width: 30%;
  margin-right: 25px;
}
.J-button-box {
  margin: 30px 0 30px;
  padding-bottom: 0px;
}
.pwd_img {
  bottom: 35px;
}
</style>
