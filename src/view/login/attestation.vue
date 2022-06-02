<template>
  <div id="findpwd">
    <!--中间部分-->
    <div class="main bannerimg">
      <div class="mid">
        <ul class="row w">
          <li class="col">
            <div class="router">
              <span>当前位置：</span>
              <router-link
                tag="a"
                :to="{ name: 'home', params: { define: routeDefine } }"
                >首页</router-link
              >
              <router-link
                tag="a"
                :to="{
                  name: 'attestation',
                  params: { define: routeDefine, id: userInfo.id }
                }"
                >实名认证</router-link
              >
            </div>
          </li>
        </ul>
        <!-- 主体 -->
        <div class="J-main J-auto">
          <div class="J-find-page">
            <h1 class="J-find-page_h1">实名认证</h1>
            <!-- 姓名输入框 -->
            <div>
              <p class="J-find-page_p" style="width: 570px">
                <span class="J-find-page_span">* </span>真实姓名
                （若姓名中涉及标点符号，请使用中文字符圆点，同右侧样式“·”）
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
            <!-- 手机输入框 -->
            <!-- <div class="J-mt-23">
              <p class="J-find-page_p">
                <span class="J-find-page_span">* </span>手机号码
              </p>
              <div class="J-find-page__inputgap">
                <img
                  class="J-check-img_img"
                  src="../../assets/img/forgetpwd/J-phone.png"
                  alt=""
                />
                <div class="change_phone">
                  <input
                    type="text"
                    class="J-check_input"
                    placeholder="请输入手机号码"
                    id="phone"
                    v-model="showPhone"
                    maxlength="11"
                    readonly
                  />
                  <button @click="showChangePhone">修改</button>
                </div>
                <span class="J-smb span-i"></span>
              </div>
            </div> -->
            <!-- 证件类型选择框 -->
            <div class="J-mt-23">
              <p class="J-find-page_p">
                <span class="J-find-page_span">* </span>证件类型
              </p>
              <div class="J-find-page__inputgap">
                <select
                  v-model="cardtype"
                  id="idType"
                  class="J-check_input"
                  style="padding-left: 10px; font-size: 14px; font-weight: 400"
                >
                  <option value="0" disabled selected>请选择证件类型</option>
                  <option
                    :value="el.codeid"
                    v-for="(el, index) in idTypeList"
                    :key="index"
                  >
                    {{ el.codevalue }}
                  </option>
                </select>
                <span class="J-smb span-i" id="idcareTypeTip"></span>
              </div>
            </div>
            <!-- 证件号码输入框 -->
            <div>
              <p class="J-find-page_p J-mt-23">
                <span class="J-find-page_span">* </span>证件号码
              </p>
              <div class="J-find-page__inputgap">
                <img
                  class="J-check-img_img"
                  src="../../assets/img/forgetpwd/J-check1.png"
                  alt=""
                />
                <div class="change_phone">
                  <input
                    type="text"
                    class="J-check_input"
                    placeholder="请输入证件号码"
                    id="idcare"
                    v-model="showCardno"
                    maxlength="18"
                    readonly
                  />
                  <button @click="showChangeCard">修改</button>
                </div>
                <span class="J-smb span-i"></span>
              </div>
            </div>
            <!-- 性别选择框 -->
            <div
              style="display: flex; margin-top: 10px"
              v-if="cardtype != '01'"
            >
              <p class="J-find-page_p" style="line-height: 43px">
                <span class="J-find-page_span">* </span>性别
              </p>
              <div>
                <div style="margin-left: 100px">
                  <label for="man" class="radio">
                    <input
                      type="radio"
                      id="man"
                      name="radio"
                      value="1"
                      v-model="gender"
                    />
                    <span></span>
                    <i>男</i>
                  </label>
                  <label for="woman" class="radio">
                    <input
                      type="radio"
                      id="woman"
                      name="radio"
                      value="2"
                      v-model="gender"
                    />
                    <span></span>
                    <i>女</i>
                  </label>
                </div>
              </div>
            </div>
            <!-- 出生年月选择框 -->
            <div class="J-mt-23" v-if="cardtype != '01'">
              <p class="J-find-page_p">
                <span class="J-find-page_span">* </span>出生日期
              </p>
              <div class="J-find-page__inputgap J-birth_input">
                <date-picker
                  style="width: 100%"
                  :lang="lang"
                  v-model="birthday"
                  valueType="format"
                  placeholder="请输入出生日期"
                  @blur="checkbirthDay"
                  @input="checkbirthDay"
                >
                </date-picker>
                <span class="J-smb span-i" id="birthdayTip"></span>
              </div>
            </div>
            <!-- 图文验证码输入框 -->
            <div>
              <p class="J-find-page_p J-mt-23">
                <span class="J-find-page_span">* </span>图文验证码
              </p>
            </div>
            <div class="J-find-page__inputgap">
              <img
                class="J-check-img_img"
                style="width: 18px"
                src="../../assets/img/forgetpwd/imgyz.png"
                alt=""
              />
              <input
                type="text"
                class="J-check_input"
                style="width: 330px"
                v-model="photoCode"
                @blur="photoCodeCheck"
                id="photoCode"
                placeholder="请输入图文验证码"
                maxlength="4"
                oninput="value=value.replace(/[^0-9a-zA-Z]/g,'');"
              />
              <div
                class="col v-m"
                style="display: inline; padding-left: 15px"
                @click="changeImgCode"
              >
                <img
                  :src="imgsrc"
                  class="button button-line"
                  style="width: 100px; height: 45px; padding: 0 0 0 5px"
                />
              </div>
              <span class="J-smb span-i" id="photoCodeTip"></span>
            </div>
            <!-- 证件上传 -->
            <p class="J-find-page_p J-mt-23" v-if="cardtype != '01'">
              <span class="J-find-page_span">* </span
              >上传证件照片（证件正面照、证件反面照）
            </p>
            <ul class="J-find-page__ul" v-if="cardtype != '01'">
              <li class="J-find-page__li">
                <div class="J-upload J-mt-20">
                  <up-image
                    photo="1"
                    title="请上传证件反面照"
                    :img="img1"
                  ></up-image>
                </div>
              </li>
              <li class="J-find-page__li">
                <div class="J-upload J-mt-20">
                  <up-image
                    photo="2"
                    title="请上传证件正面照"
                    :img="img2"
                  ></up-image>
                </div>
              </li>
            </ul>
            <div class="J-button-box J-mt-54">
              <button
                :class="isClick ? 'J-next' : 'disabled-button'"
                @click="submitBtn"
              >
                提交
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 修改手机号 -->
    <!-- <div class="mask bind changePhone">
      <div
        class="mask-info"
        style="width: 700px; max-height: 705px; margin-left: -350px"
      >
        <div class="mask-header row w">
          <div class="col v-m"><h2>修改手机</h2></div>
          <div class="col v-m t-r">
            <a
              href="javascript:void(0);"
              class="mask-close"
              @click="closeChangePhone"
              ><img src="../../assets/img/close.png" alt=""
            /></a>
          </div>
        </div>
        <div style="padding: 20px 50px 0 50px">
          <div class="form">
            <p class="form-label"><em>*</em>手机号码：</p>
            <input
              id="bindPhone"
              v-model="changePhone"
              @blur="getPhone"
              oninput="value=value.replace(/[^0-9]/g,'');"
              maxlength="11"
              placeholder="请输入手机号码"
            />
          </div>
          <span class="form-error" style="color: #e60012" id="phoneTip"></span>
        </div>
        <div class="form t-c">
          <a
            href="javascript:void(0);"
            class="button"
            @click="sureChangePhone"
            style="margin-top: 15px"
            >确定</a
          >
        </div>
      </div>
    </div> -->
    <!-- 修改证件号 -->
    <div class="mask bind changeCardno">
      <div
        class="mask-info"
        style="width: 700px; max-height: 705px; margin-left: -350px"
      >
        <div class="mask-header row w">
          <div class="col v-m">
            <h2>修改证件号</h2>
          </div>
          <div class="col v-m t-r">
            <a
              href="javascript:void(0);"
              class="mask-close"
              @click="closeChangeCard"
              ><img src="../../assets/img/close.png" alt=""
            /></a>
          </div>
        </div>
        <div style="padding: 20px 50px 0 50px">
          <div class="form">
            <p class="form-label"><em>*</em>证件号码：</p>
            <input
              id="bindPhone"
              v-model="changeCardno"
              @blur="getIDcard"
              @focus="getIDcard"
              maxlength="18"
              placeholder="请输入证件号码"
            />
          </div>
          <span class="form-error" style="color: #e60012" id="idcareTip"></span>
        </div>
        <div class="form t-c">
          <a
            href="javascript:void(0);"
            class="button"
            @click="suerChangeCard"
            style="margin-top: 15px"
            >确定</a
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const UpImage = () => import("@/view/home/upcardimg.vue"); //上传图片
import { getCodeList } from "../../assets/js/getCodevalueList";
export default {
  name: "findpwd",
  components: {
    UpImage
  },
  data: function() {
    return {
      routeDefine: this.$route.params.define,
      userInfo: this.$store.getters.getUser, //用户信息
      basicInfo: this.$store.getters.getBasic, // 基本信息
      lang: {
        //配置日期语音环境
        formatLocale: {
          firstDayOfWeek: 1
        },
        monthBeforeYear: false
      },
      name: "", //姓名
      phone: "", //电话号码
      showPhone: "", // 脱敏显示手机号
      changePhone: "", // 修改弹窗手机号
      cardtype: "0", //证件类型
      idTypeList: "", //证件类型列表
      showCardno: "", // 脱敏显示证件号
      cardno: "", //证件号
      changeCardno: "", // 修改弹窗证件号
      gender: "1", //性别
      birthday: "", //出生年月
      photoCode: "", //图文验证码
      phoneCode: "", //手机验证码
      imgsrc: "", //图文验证码图片地址
      codeButton: "获取验证码",
      countdown: 60,
      timer: "", //定时器
      getIDcardFlag: false,
      photoCodeCheckFlag: false,
      img1: require("../../assets/img/IDCard01.png"),
      img2: require("../../assets/img/IDCard02.png"),
      img3: require("../../assets/img/IDCard03.png"),
      imgFile1: "",
      imgFile2: "",
      imgFile3: "",
      imgkey: "", //图文验证码
      isClick: true // 提交按钮是否可以点击
    };
  },
  created() {
    // 获取证件类型
    this.getIdTypeList();
    // 获取验证码
    this.changeImgCode();
    // 数据初始化
    this.init();
  },
  methods: {
    //初始化数据
    init() {
      if (this.userInfo) {
        this.name = this.userInfo.albp0003 ? this.userInfo.albp0003 : ""; //姓名
        this.showPhone = this.userInfo.telephone ? this.userInfo.telephone : ""; //电话
        this.cardtype = this.userInfo.albp0004 ? this.userInfo.albp0004 : "0"; //证件类型
        this.showCardno = this.userInfo.cardno ? this.userInfo.cardno : ""; //证件号码
        this.gender = this.userInfo.albp0006 ? this.userInfo.albp0006 : "1"; //性别
        this.birthday = this.userInfo.albp0014 ? this.userInfo.albp0014 : ""; //出生日期
      }
    },
    // 获取证件类型
    // getdata() {
    //   this.utilscommit.requestapi(
    //     "codeValueQueryFortisWeb",
    //     { tablename: "nvsi_albp0065" },
    //     this.getIdTypeList
    //   );
    // },
    // 获取证件类型回调
    getIdTypeList() {
      getCodeList("codeValueQueryFortisWeb", "nvsi_albp0065", {
        tablename: "nvsi_albp0065"
      }).then(res => {
        let idTypeList = this.common.orderBy(res, "codeid", "asc");
        let idTypeLists = []; //去除军官证、士兵证、其他有效国籍旅行证件
        if (idTypeList) {
          for (let index = 0; index < idTypeList.length; index++) {
            if (index == 0 && idTypeList[0]) this.idType = idTypeList[0].codeid; //默认给第一个赋值
            if (index < 5) idTypeLists.push(idTypeList[index]);
          }
        }
        this.idTypeList = idTypeLists;
      });
    },
    // 获取图文验证码
    changeImgCode() {
      this.photoCode = "";
      this.formTip("photoCode", ""); //置空图文验证码及其验证
      if (this.timer) {
        //清空定时器
        clearTimeout(this.timer);
        this.timer = null;
      }
      this.phoneCode = "";
      this.formTip("phoneCode", ""); //置空手机验证码及其验证
      this.codeButton = "获取验证码";
      this.countdown = 60;
      this.utilscommit.requestapi(
        "getImageCodeFortisWeb",
        null,
        this.changeImgCodeBack
      );
    },
    // 图片验证码获取结果
    changeImgCodeBack(data) {
      if (data && data.data) {
        this.imgsrc = data.data.img;
        this.imgkey = data.data.imgkey;
      }
    },
    // 用户姓名验证
    getRealName() {
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
    // 显示修改手机号弹窗
    showChangePhone() {
      $(".changePhone").addClass("active");
    },
    // 关闭修改手机号弹窗
    closeChangePhone() {
      $(".changePhone").removeClass("active");
      $(".form-error").html("");
    },
    // 确认修改手机号
    sureChangePhone() {
      if (this.getPhone) {
        this.phone = this.changePhone;
        this.showPhone = this.changePhone.replace(
          /(\d{3})\d*(\d{4})/,
          "$1****$2"
        );
        $(".changePhone").removeClass("active");
        $(".form-error").html("");
        this.changePhone = "";
      }
    },
    // 手机号验证
    getPhone() {
      if (!this.changePhone) {
        this.formTip("phone", "手机号码不能为空");
        return false;
      } else if (!this.common.checkPhoneno(this.changePhone)) {
        this.formTip("phone", "手机号码不合法");
        return false;
      }
      this.formTip("phone", "");
      return true;
    },
    // 证件类型验证
    getIDcardType() {
      if (!this.cardtype || this.cardtype == 0) {
        this.formTip("idcareType", "请选择证件类型");
        return false;
      }
      this.formTip("idcareType", "");
      return true;
    },
    // 显示修改证件号弹窗
    showChangeCard() {
      $(".changeCardno").addClass("active");
      this.changeCardno = "";
    },
    // 关闭修改证件号弹窗
    closeChangeCard() {
      $(".changeCardno").removeClass("active");
      $(".form-error").html("");
    },
    // 确认修改证件号
    suerChangeCard() {
      if (this.getIDcard() && this.getIDcardFlag) {
        this.cardno = this.changeCardno;
        // this.showCardno = this.changeCardno.replace(
        //   /^(?:\d+)(.{4})$/,
        //   "**************$1"
        // );
        this.showCardno = this.common.noDes(this.changeCardno);
        $(".changeCardno").removeClass("active");
        $(".form-error").html("");
        this.changeCardno = "";
      }
    },
    // 证件号码验证
    getIDcard() {
      // debugger
      if (!this.changeCardno) {
        this.formTip("idcare", "证件号码不能为空");
        return false;
      } else if (
        (this.cardtype == "01" &&
          !this.common.checkCardNo(this.changeCardno)) ||
        (this.cardtype != "01" && this.common.checkCardNo(this.changeCardno))
      ) {
        this.formTip("idcare", "证件号码不合法");
        return false;
      } else {
        if (!this.name) {
          this.formTip("idcare", "请先填写真实姓名");
          return false;
        }
        this.utilscommit.requestapi(
          "getVolCardCheckFortisWeb",
          {
            albp0066: this.changeCardno
          },
          this.getIDcardBack
        );
        this.formTip("idcare", "");
        return true;
      }
    },
    // 证件号码验证返回结果
    getIDcardBack(result) {
      if (result.code == 0) {
        this.formTip("idcare", "");
        this.getIDcardFlag = true;
      } else {
        this.formTip("idcare", "证件号已被注册");
        this.getIDcardFlag = false;
      }
    },
    checkbirthDay() {
      // 出生日期校验
      if (!this.birthday) {
        this.formTip("birthday", "请选择出生日期");
        return false;
      }
      this.formTip("birthday", "");
      return true;
    },
    photoCodeCheck() {
      // 图文验证码验证
      if (!this.photoCode) {
        this.formTip("photoCode", "图文验证码不能为空");
        return false;
      } else {
        this.formTip("photoCode", "");
        this.utilscommit.requestapi(
          "verificationCodeFortisWeb",
          {
            imgkey: this.imgkey,
            code: this.photoCode
          },
          res => {
            if (res && res.data) {
              this.formTip("photoCode", "");
              this.photoCodeCheckFlag = true;
            } else {
              this.formTip("photoCode", res.message);
              this.photoCodeCheckFlag = false;
            }
          }
        );
        return this.photoCodeCheckFlag;
      }
    },
    async submitBtn() {
      if (!this.isClick) {
        return false;
      }
      //提交
      var flag = true;
      if (this.cardtype == "01") {
        flag =
          this.getRealName() &&
          // this.getIDcard() &&
          // this.getIDcardFlag &&
          this.getIDcardType() &&
          this.photoCodeCheck();
      } else {
        //非内地居民身份证
        flag =
          this.getRealName() &&
          // this.getIDcard() &&
          // this.getIDcardFlag &&
          this.getIDcardType() &&
          this.photoCodeCheck() &&
          this.checkbirthDay();
      }
      if (flag) {
        if (this.cardtype != "01" && !this.imgFile1) {
          this.$swal("请上传身份证人像面", { buttons: "确定" });
        } else if (this.cardtype != "01" && !this.imgFile2) {
          this.$swal("请上传身份证国徽面", { buttons: "确定" });
        } else if (this.cardtype != "01") {
          // 字段校验通过之后按钮置灰
          this.isClick = false;
          // 上传证件正面照
          let { data: front } = await this.utilscommit.asyncUpload(
            this.imgFile1
          );
          if (front.code != 0 || !front.data) {
            this.isClick = true;
            return this.$swal("证件正面照上传失败，请更换图片或者稍后再试", {
              buttons: "确定"
            });
          }
          // 上传证件反面照
          let { data: reverse } = await this.utilscommit.asyncUpload(
            this.imgFile2
          );
          if (reverse.code != 0 || !reverse.data) {
            this.isClick = true;
            return this.$swal("证件反面照上传失败，请更换图片或者稍后再试", {
              buttons: "确定"
            });
          }
          // 修改基本信息成功后才能继续修改姓名和证件号
          this.utilscommit.requestapi(
            "updateVolunInforOnWeb",
            {
              albp0004: this.cardtype, // 证件类型
              albp0005: this.userInfo.albp0005, // 证件号
              albp0006: this.gender, // 性别
              albp0014: this.birthday, // 出生日期
              albp0069: JSON.stringify(front.data), // 证件照正面
              albp01_121: JSON.stringify(reverse.data) // 证件照反面
            },
            result => {
              if (result.code == 0) {
                // 获取最新志愿者信息
                this.updateVolInfo();
                this.commit();
              } else {
                this.isClick = true;
                this.$swal("实名认证失败", { buttons: "确定" });
              }
            }
          );
        } else {
          // 字段校验通过之后按钮置灰
          this.isClick = false;
          // 截取证件号生日并修改
          if (this.cardno) {
            let year = this.cardno.substring(6, 10);
            let month = this.cardno.substring(10, 12);
            let day = this.cardno.substring(12, 14);
            let birthday = `${year}-${month}-${day}`;
            let params = {
              albp0005: this.userInfo.albp0005,
              albp0014: birthday
            };
            this.utilscommit.requestapi(
              "updateVolunInforOnWeb",
              params,
              res => {
                console.log(res);
              }
            );
          }
          this.commit();
        }
      }
    },
    commit() {
      // 修改身份证和姓名
      let params = {
        oldbean: {
          cardno: this.userInfo.albp0005, // 旧证件号，加密
          name: this.basicInfo.albp0003,
          userflag: this.basicInfo.albp0084 // 用户名
        },
        newbean: {
          cardno: this.cardno ? this.cardno : this.userInfo.albp0005, // 新证件号
          name: this.name,
          flag: this.cardno ? 1 : 0 // 是否修改过证件号
        }
      };
      console.log(params);
      this.utilscommit.requestapi(
        "updateVolunCardnoAndNameOnWeb",
        params,
        this.commitback
      );
    },
    async commitback(result) {
      this.isClick = true;
      if (result.code == 0) {
        let { data: res } = await this.utilscommit.asyncReq("cardnoOnWeb", {
          cardno: this.cardno
        });
        if (res.code == 0 && res.data) {
          this.cardno = res.data.cardno;
        }
        console.log(this.cardno);
        this.$swal("提交实名认证成功，请等待审核", { buttons: "确定" }).then(
          async () => {
            // 保存用户基本信息
            let { data: basicInfo } = await this.utilscommit.asyncReq(
              "getVolunteerInfoFortisWeb",
              {
                cardno: this.cardno
              }
            );
            if (basicInfo.code == 0 && basicInfo.data) {
              this.$store.commit("saveBasic", basicInfo.data);
            }
            // 保存用户信息
            let { data: userInfo } = await this.utilscommit.asyncReq(
              "getUserInfoFortisWeb",
              {
                albp0005: this.cardno
              }
            );
            if (userInfo.code == 0 && userInfo.data) {
              this.$store.commit("saveUser", userInfo.data);
            }
            // 跳回个人中心
            this.$router.push({
              name: "updateiden",
              params: { define: this.routeDefine }
            });
          }
        );
      } else {
        if (result.message) {
          this.$swal(result.message, { buttons: "确定" });
        } else {
          this.$swal("实名认证失败", { buttons: "确定" });
        }
      }
    },
    formTip(el, tip) {
      //错误提示
      $("#" + el + "Tip").html(tip);
    },
    // 更新志愿者信息
    updateVolInfo() {
      this.utilscommit.requestapi(
        "getVolunteerInfoFortisWeb",
        { cardno: this.userInfo.albp0005 },
        res => {
          if (res.code == 0 && res.data) {
            this.$store.commit("saveBasic", res.data);
          }
        }
      );
      this.utilscommit.requestapi(
        "getUserInfoFortisWeb",
        { albp0005: this.userInfo.albp0005 },
        res => {
          if (res.code == 0 && res.data) {
            this.$store.commit("saveUser", res.data);
          }
        }
      );
    }
  }
};
</script>

<style lang="css" scoped>
.change_phone {
  display: flex;
}

.change_phone button {
  width: 25%;
  background: transparent;
  outline: none;
  border: 1px solid #f56c6c;
  border-radius: 3px;
  margin-left: 20px;
  cursor: pointer;
  transition: all 0.3s;
  font-size: 14px;
}

.change_phone button:hover {
  background: #f56c6c;
  color: #fff;
}

.disabled-button {
  border: 1px solid #9b9b9b;
  outline: none;
  background: #9b9b9b;
  border-radius: 3px;
  color: #fff;
  font-size: 16px;
  font-weight: 400;
  width: 98px;
  height: 38px;
  /* cursor: pointer; */
}
</style>
