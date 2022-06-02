<template>
  <div id="volreg">
    <!--中间部分-->
    <div class="main bannerimg">
      <div class="mid">
        <ul class="row w">
          <li class="col">
            <div class="router">
              <span>当前位置：</span>
              <a href="javascript:void(0);"
                ><router-link
                  tag="span"
                  :to="{ name: 'home', params: { define: routeDefine } }"
                  >首页</router-link
                ></a
              >
              <span>志愿者注册</span>
            </div>
          </li>
        </ul>
        <ul class="row w">
          <li class="col v-t w white">
            <div class="tabbar">
              <router-link
                class="active"
                tag="a"
                :to="{ name: 'volreg', params: { define: routeDefine } }"
                >志愿者注册</router-link
              >
              <router-link
                tag="a"
                :to="{ name: 'orgreg', params: { define: routeDefine } }"
                v-if="!$store.getters.getArea.industrycode"
                >志愿队伍注册</router-link
              >
            </div>
            <h2 class="subtitle subtitle-margin subtitle-noline">账号信息</h2>
            <ul class="grid">
              <li class="grid-item g-16">
                <ul class="grid">
                  <div class="form g-12">
                    <p class="form-label"><em>*</em>用户名：</p>
                    <!-- checkInfo('username') @focus="usernameTip"-->
                    <input
                      type="text"
                      id="username"
                      v-model="newUserInfo.username"
                      @blur="checkInfo(1)"
                      @focus="checkFocusInfo(1)"
                      maxlength="20"
                      oninput="this.value=this.value.replace(/[^\w_.]/g,'').slice(0,20);"
                      placeholder="请输入用户名"
                    />
                    <p
                      class="form-error warn-tip"
                      style="margin-top: 0"
                      id="usernameTips"
                    >
                      用户名长度6～20个字符，以字母a～z开头，且只能由字母、数字0～9和下划线组成
                    </p>
                  </div>
                  <div class="form g-12">
                    <p class="form-label"><em>*</em>密码：</p>
                    <!--  @focus="passwordTip" -->
                    <input
                      type="password"
                      id="password"
                      v-model="newUserInfo.password"
                      @blur="checkInfo(2)"
                      @focus="checkFocusInfo(2)"
                      oninput="this.value=this.value.replace(/[^\w\_\.]/g,'');"
                      maxlength="20"
                      placeholder="请输入密码"
                    />
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
                    <p
                      class="form-error warn-tip"
                      style="margin-top: 0"
                      id="passwordTips"
                    >
                      密码长度为8-20个字符，且必须同时包含数字、大写字母和小写字母
                    </p>
                  </div>
                  <div class="form g-12">
                    <p class="form-label"><em>*</em>确认密码：</p>
                    <input
                      type="password"
                      id="repeatpw"
                      v-model="newUserInfo.repeatpw"
                      @blur="checkInfo(3)"
                      oninput="this.value=this.value.replace(/[^\w\_\.]/g,'');"
                      maxlength="20"
                      placeholder="请输入确认密码"
                    />
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
                    <p class="form-error warn-tip" id="repeatpwTips"></p>
                  </div>
                  <div class="form g-12">
                    <p class="form-label"><em>*</em>手机号码：</p>
                    <!--  @focus="phoneTip" -->
                    <input
                      type="text"
                      id="phonenum"
                      v-model="newUserInfo.albp0068"
                      @blur="checkInfo(4)"
                      @focus="checkFocusInfo(3)"
                      oninput="value=value.replace(/[^\d]/g,'').slice(0,11);"
                      maxlength="11"
                      placeholder="请输入手机号码"
                    />
                    <p class="form-error warn-tip" id="phonenumTips">
                      手机号码不能为空，请确保该手机号码真实有效
                    </p>
                  </div>
                  <div class="form g-12">
                    <p class="form-label">邮箱：</p>
                    <input
                      type="text"
                      id="email"
                      v-model="email"
                      @input="checkEmail"
                      placeholder="请输入邮箱"
                    />
                    <p class="form-error warn-tip" id="emailTips">
                      邮箱可用于找回密码
                    </p>
                  </div>
                  <div class="form g-12">
                    <p class="form-label"><em>*</em>图文验证码：</p>
                    <div class="row w" style="display: inline-table">
                      <div class="col v-m">
                        <input
                          type="text"
                          id="imgCode"
                          v-model="newUserInfo_imgcode"
                          maxlength="4"
                          @blur="checkInfo(5)"
                          oninput="value=value.replace(/[^0-9a-zA-Z]/g,'').slice(0,4);"
                          placeholder="请输入图文验证码"
                        />
                      </div>
                      <div
                        class="col v-m pl-10"
                        style="width: 130px"
                        @click="changeImgCode"
                      >
                        <img
                          id="reg_image"
                          class="button button-line"
                          style="width: 100%; padding: 1px 1px 2px 5px"
                        />
                      </div>
                    </div>
                    <p class="form-error warn-tip" id="imgCodeTips">
                      图文验证码不能为空
                    </p>
                  </div>
                  <!-- <div class="form g-12">
                    <p class="form-label"><em>*</em>验证码：</p>
                    <div class="row w" style="display: inline-table;">
                      <div class="col v-m">
                        <input type="text" id="code" v-model="newUserInfocode" @blur="checkInfo(6)" oninput="value=value.replace(/[^\d]/g,'').slice(0,6);" maxlength="6" placeholder="请输入验证码">
                      </div>
                      <div class="col v-m pl-10" style="width:130px;"><button class="button button-line" id="codebutton" @click="getCode" v-text="codeButton" style="font-size: 14px;width: 100%;"></button></div>
                    </div>
                    <p class="form-error warn-tip" id="codeTips">验证码不能为空</p>
                  </div> -->
                  <div
                    class="form g-12"
                    v-if="$store.getters.getArea.areaid == '0'"
                  >
                    <p class="form-label"><em>*</em>区域：</p>
                    <div class="row w" style="display: inline-table">
                      <div class="col v-m">
                        <input
                          type="text"
                          v-model="volAreaName"
                          readonly
                          placeholder="请选择区域"
                        />
                      </div>
                      <div class="col v-m pl-10" style="width: 90px">
                        <a
                          href="javascript:void(0);"
                          @click="chooseArea"
                          class="button button-line"
                          >选择</a
                        >
                      </div>
                    </div>
                    <p class="form-error warn-tip" id="volAreaTips">
                      区域不能为空
                    </p>
                  </div>
                </ul>
              </li>
            </ul>
            <h2 class="subtitle subtitle-margin subtitle-noline">身份信息</h2>
            <ul class="grid">
              <li class="grid-item g-16">
                <ul class="grid">
                  <div class="form g-12">
                    <p class="form-label">
                      <em>*</em
                      ><span
                        >姓名：（若姓名中涉及标点符号，请使用中文字符圆点，同右侧样式“·”）</span
                      >
                    </p>
                    <!-- @focus="nameTip" -->
                    <input
                      type="text"
                      v-model="newUserInfo.albp0064"
                      @blur="checkInfo(8)"
                      @focus="checkFocusInfo(4)"
                      id="name"
                      maxlength="20"
                      placeholder="请输入姓名"
                    />
                    <p class="form-error warn-tip" id="nameTips">
                      真实姓名不能为空，请与证件上保持一致
                    </p>
                  </div>
                  <div class="form g-12">
                    <p class="form-label"><em>*</em>证件类型：</p>
                    <div class="select">
                      <select v-model="idType" id="idType">
                        <option value="0">请选择</option>
                        <option
                          :value="el.codeid"
                          v-for="(el, index) in idTypeList"
                          :key="index"
                        >
                          {{ el.codevalue }}
                        </option>
                      </select>
                    </div>
                    <p
                      class="form-error warn-tip"
                      style="top: 32px"
                      id="idTypeTips"
                    ></p>
                  </div>
                  <div class="form g-12">
                    <p class="form-label"><em>*</em>证件号码：</p>
                    <!-- @focus="idNumTip" -->
                    <!-- <input type="text" v-model="newUserInfo.albp0066" @blur="checkInfo(10)"  id="idNum" @focus="checkFocusInfo(5)" maxlength="20" oninput="value=value.replace(/[^\[A-Za-z0-9\u4e00]/g,'').slice(0,20);"  placeholder="请输入证件号码"> -->
                    <input
                      type="text"
                      v-model="newUserInfo.albp0066"
                      @blur="checkInfo(10)"
                      id="idNum"
                      @focus="checkFocusInfo(5)"
                      maxlength="20"
                      placeholder="请输入证件号码"
                    />
                    <p
                      class="form-error warn-tip"
                      id="idNumTips"
                      style="width: 600px"
                    >
                      证件号码请如实填写，建议填写身份证号码
                    </p>
                  </div>
                  <div id="other" style="display: none">
                    <div class="form row w">
                      <p class="form-label col v-m" style="width: 150px">
                        <em>*</em>性别：
                      </p>
                      <div class="col v-m t-l">
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
                    <div class="form g-12">
                      <p class="form-label"><em>*</em>出生日期：</p>
                      <date-picker
                        style="width: 100%"
                        :lang="lang"
                        v-model="birthday"
                        valueType="format"
                        @change="checkInfo(11)"
                        placeholder="请输入出生日期"
                        :disabled-date="common.notAfterToday"
                      ></date-picker>
                      <p class="form-error warn-tip" id="birthdayTips"></p>
                    </div>
                    <div class="form g-12">
                      <p class="form-label"><em>*</em>证件照片：</p>
                      <up-image
                        photo="1"
                        title="请上传证件反面照"
                        :img="img1"
                      ></up-image>
                    </div>
                    <div class="form g-12">
                      <up-image
                        photo="2"
                        title="请上传证件正面照"
                        :img="img2"
                      ></up-image>
                    </div>
                  </div>
                </ul>
              </li>
              <li class="grid-item g-8 t-c" id="othersm" style="display: none">
                <p
                  class="form-label"
                  style="text-align: initial; margin-top: 410px; color: red"
                >
                  实名认证时，需上传有效居民身份证正、反两面拍照的彩色照片。
                  <br />
                  提交照片需要注意以下几点： <br />
                  1、在拍摄证件时，确保图片清晰，证件信息能准确识别。 <br />
                  2、请拍摄证件的原件，照片必须为彩色图片，不支持扫描件。 <br />
                  3、确保身份证边角显示完整。 <br />
                  4、身份证需要在有效期内。 <br />
                  5、填写的真实姓名、身份证号码必须与提交的证件信息一致。 <br />
                  6、上传的证件照片只支持png、jpeg、jpg格式，大小不超过200k。
                </p>
              </li>
            </ul>
            <h2 class="subtitle subtitle-margin subtitle-noline">志愿者誓词</h2>
            <div class="vote">
              <p style="margin-bottom: 0">
                我宣誓，自愿成为一名光荣的志愿者，为使我们的国家和城市更美好、人民更幸福、环境更安全，我要团结身边的人，投身其间。面对需求，我要行动。<!-- <br>我承诺，我将竭尽所能，参加公益活动，帮助困难人群，真诚关怀有需要的人士，为他们带来温暖。 -->
              </p>
              <p>
                我承诺，我将竭尽所能，参加公益活动，帮助困难人群，真诚关怀有需要的人士，为他们带来温暖。
              </p>
              <a
                href="javascript:void(0);"
                class="button"
                @click="onSubmit"
                id="register"
                >申请成为实名注册志愿者</a
              >
            </div>
            <div
              class="agreement"
              style="
                height: 110px;
                line-height: 22px;
                margin: 20px auto 0;
                overflow-y: scroll;
              "
            >
              <p>
                本网站及与本网站链接的网站，仅提供志愿者、志愿服务队伍、志愿服务机构及其它与此相关联之志愿服务项目。志愿者、志愿服务队伍、志愿服务机构以及因其它任何目的进入本网站的访问者接受本协议书条款，注册成为中国志愿服务网网站用户，并遵守本协议所述之条款使用本网站所提供之服务。如果您不接受本声明之条款，请勿使用本网站。接受本声明之条款，您将遵守本协议之规定。
              </p>
              <br />
              <p>1.信息的发布</p>
              <br />
              <p>·不得发布任何违反有关法律规定信息；</p>
              <p>·不得发布任何与本网站志愿服务目的不适之信息；</p>
              <p>·不得发布任何不完整、虚假的信息；</p>
              <p>·用户对所发布的信息承担完全责任。</p>
              <br />
              <p>2.信息的使用</p>
              <br />
              <p>
                ·志愿服务队伍、志愿服务机构仅可就志愿服务目的使用志愿者之个人信息；
              </p>
              <p>
                ·志愿者仅可因参加某志愿服务项目，使用志愿服务队伍、志愿服务机构发布之项目招募信息；
              </p>
              <p>·本网站提供的其它信息，仅与其相应内容有关的目的而被使用；</p>
              <p>·不得将任何本网站的信息用作任何商业目的。</p>
              <br />
              <p>3.信息的公开</p>
              <br />
              <p>
                在本网站所登录的任何信息，均有可能被任何本网站的访问者浏览，也可能被错误使用。本网站对此将不予承担任何责任。
              </p>
              <br />
              <p>4.信息的准确性</p>
              <br />
              <p>
                任何在本网站发布的信息，均必须符合合法、准确、及时、完整的原则。但本网站将不能保证所有由第三方提供的信息，或本网站自行采集的信息完全准确。使用者了解，对这些信息的使用，需要经过进一步核实。本网站对访问者未经自行核实误用本网站信息造成的任何损失不予承担任何责任。
              </p>
              <br />
              <p>5.信息更改与删除</p>
              <br />
              <p>
                除了信息的发布者外，任何访问者不得更改或删除他人发布的任何信息。本网站有权根据其判断保留修改或删除任何不适信息之权利。
              </p>
              <br />
              <p>6.版权、商标权</p>
              <br />
              <p>
                本网站的图形、图像、文字及其程序等均属中国志愿服务网网站之版权，受商标法及相关知识产权法律保护，未经中国志愿服务网网站书面许可，任何人不得下载、复制、再使用。在本网发布信息之商标，归其相应的商标所有权人，受商标法保护。
              </p>
              <br />
              <p>7、注册信息使用</p>
              <br />
              <p>
                注册会员所提供的个人信息将会被中国志愿服务网网站统计、汇总，在我们的严格管理下，为中国志愿服务网网站的合作者提供依据。中国志愿服务网网站会不定期地通过注册会员留下的电子邮件、电话或通信地址同该会员保持联系。
              </p>
              <br />
              <p>
                中国志愿服务网网站承诺：在未经访问者授权同意的情况下，中国志愿服务网网站不会将访问者的个人资料泄露给第三方。但以下情况除外。
              </p>
              <p>·根据执法单位之要求或为公共之目的向相关单位提供个人资料；</p>
              <p>
                ·由于您将用户密码告知他人或与他人共享注册帐户，由此导致的任何个人资料泄露；
              </p>
              <p>
                ·由于计算机2000年问题、黑客攻击、计算机病毒侵入或发作、因政府管制而造成的暂时性关闭等影响网络正常经营之不可抗力而造成的个人资料泄露、丢失、被盗用或被窜改等；
              </p>
              <p>
                ·由于与中国志愿服务网网站链接的其它网站所造成之个人资料泄露及由此而导致的任何法律争议和后果；
              </p>
              <p>·为免除访问者在生命、身体或财产方面之急迫危险。</p>
              <br />
              <p>8.自责</p>
              <br />
              <p>
                所有使用本网站的用户，对使用本网站信息和在本网站发布信息的被使用，承担完全责任。本网站对任何因使用本网站而产生的第三方之间的纠纷，不负任何责任。
              </p>
              <br />
              <p>9.服务终止</p>
              <br />
              <p>本网站有权在预先通知或不予通知的情况下终止任何免费服务。</p>
              <br />
              <p>10.争议处理</p>
              <br />
              <p>
                本网站因正常的系统维护、系统升级，或者因网络拥塞而导致网站不能访问，本网站不承担任何责任。
              </p>
              <br />
              <p>11.免责条款</p>
              <br />
              <p>
                本网并无随时监视此网址，但保留对其实施实时监视的权利。对于他方输入的，不是本网发布的材料，本网概不负任何法律责任。对于其他网址链接在本网址的内容，本网概不负法律责任。
              </p>
            </div>
          </li>
        </ul>
      </div>
    </div>

    <!--区域选择弹窗-->
    <div class="mask area">
      <div class="mask-info">
        <div class="mask-header row w">
          <div class="col v-m"><h2>请选择区域</h2></div>
          <div class="col v-m t-r">
            <a href="javascript:void(0);" @click="closeArea" class="mask-close"
              ><img src="../../assets/img/close.png" alt=""
            /></a>
          </div>
        </div>
        <areaDialog ref="areaDialog"></areaDialog>
      </div>
    </div>
  </div>
</template>

<script>
const UpImage = () => import("@/view/home/upcardimg.vue"); //上传图片
const AreaDialog = () => import("@/view/home/area.vue"); //区域弹出层
import { getCodeList } from "../../assets/js/getCodevalueList";

export default {
  name: "volreg",
  components: { AreaDialog, UpImage },
  data() {
    return {
      lang: {
        //配置日期语音环境
        formatLocale: {
          firstDayOfWeek: 1
        },
        monthBeforeYear: false
      },
      email: "", // 邮箱
      routeDefine: this.$route.params.define,
      areaid: "",
      newUserInfo: {},
      newUserInfo_imgcode: "", //图文验证码
      newUserInfocode: "", //短信验证码
      idType: "01", //证件类型
      idTypeList: {},
      gender: "1", //性别
      birthday: "", //生日
      usernameFlag: false, //用户名是否可用
      imgCodeFlag: false, //图文验证码是否正确
      idNumFlag: false, //证件号是否正确
      passwordFlag: false, //密码是否可用
      status: 0,
      codeButton: "获取验证码",
      countdown: 60,
      tip: "",
      type: 3, //状态，1=正确，2=错误，3=提示
      imgFile1: "",
      imgFile2: "",
      // imgFile3: "",
      photo1: "",
      photo2: "",
      // photo3: "",
      volAreaName: "",
      img1: require("../../assets/img/IDCard01.png"),
      img2: require("../../assets/img/IDCard02.png"),
      img3: require("../../assets/img/IDCard03.png"),
      isClick: true, //注册按钮状态
      timer: "", //定时器
      imgkey: "", //图文验证码key
      imgShow: 0,
      imgShow1: 0
    };
  },
  created() {
    window.Vues = this; //主体vue实例挂载
    // this.utilscommit.requestapi(
    //   "codeValueQueryFortisWeb",
    //   { tablename: "nvsi_albp0065" },
    //   this.getIdTypeList
    // );
    this.getIdTypeList();
  },
  mounted() {
    this.changeImgCode(1);
  },
  methods: {
    getIdTypeList: function() {
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
    onSubmit: async function() {
      // debugger
      if (!this.areaid) {
        this.areaid = this.$store.getters.getArea.areaid;
      }
      if (!this.isClick) {
        return this.checkUserInfo();
      }
      let flag =
        this.type == 1 &&
        this.passwordFlag &&
        this.usernameFlag &&
        this.imgCodeFlag &&
        this.idNumFlag &&
        this.isClick;
      if (this.email) {
        flag = flag && this.checkEmail();
      }
      if (flag) {
        if (this.idType == "01") {
          //身份证
          var idNum = this.newUserInfo.albp0066;
          if (parseInt(idNum.substr(16, 1)) % 2 == 1) {
            this.gender = "1";
          } else {
            this.gender = "2";
          }
          var birthdayNum = idNum.substring(6, 14);
          this.birthday =
            birthdayNum.substring(0, 4) +
            "-" +
            birthdayNum.substring(4, 6) +
            "-" +
            birthdayNum.substring(6, 8);
          $("#register").css({ background: "gray", opacity: "1" }); //修改注册按钮状态
          this.isClick = false;
          this.commit();
        } else {
          if (this.imgFile1 && this.imgFile2 && this.birthday) {
            $("#register").css({ background: "gray", opacity: "1" }); //修改注册按钮状态
            this.isClick = false;
            // 上传证件正面照
            let { data: front } = await this.utilscommit.asyncUpload(
              this.imgFile1
            );
            if (front.code != 0 || !front.data) {
              this.isClick = true;
              $("#register").css({ background: "#cc0000", opacity: "1" }); //修改注册按钮状态
              this.$swal("证件正面照上传失败，请更换图片或者稍后再试", {
                buttons: "确定"
              });
              return;
            }
            // 上传证件反面照
            let { data: reverse } = await this.utilscommit.asyncUpload(
              this.imgFile2
            );
            if (reverse.code != 0 || !reverse.data) {
              this.isClick = true;
              $("#register").css({ background: "#cc0000", opacity: "1" }); //修改注册按钮状态
              this.$swal("证件反面照上传失败，请更换图片或者稍后再试", {
                buttons: "确定"
              });
              return;
            }
            this.photo1 = JSON.stringify(front.data);
            this.photo2 = JSON.stringify(reverse.data);
            this.commit();
          } else if (!this.birthday) {
            return this.$swal("请选择出生日期", { buttons: "确定" });
          } else {
            this.checkInfoList(13);
          }
        }
      } else {
        //去校验相关数据
        if (this.idType == "1") {
          this.checkInfoList(11);
        } else if (this.idType == "0") {
          this.$swal("请选择证件类型", { buttons: "确定" });
        } else {
          this.checkInfoList(13);
        }
        this.checkUserInfo();
      }
    },
    // 用户信息校验
    checkUserInfo() {
      // 校验用户基本信息
      if (
        this.idType == "01" &&
        (!this.newUserInfo.username ||
          !this.newUserInfo.password ||
          !this.newUserInfo.repeatpw ||
          !this.newUserInfo.albp0068 ||
          !this.newUserInfo.albp0064 ||
          !this.newUserInfo.albp0066)
      ) {
        return this.$swal("请填写账号信息", { buttons: "确定" });
      }
      // 校验图片验证码
      if (!this.newUserInfo_imgcode) {
        return this.$swal("请填写图片验证码", { buttons: "确定" });
      }
    },
    checkInfoList(nums) {
      //校验相关参数    nums=校验到第几步
      for (let index = 1; index < nums; index++) {
        if (index == 6) {
          continue;
        }
        this.checkInfo(index);
      }
    },
    // 邮箱校验
    checkEmail() {
      this.email = this.email.replace(/[\u4e00-\u9fa5]/g, "");
      if (!this.email) {
        this.toShowTips("email", "");
        this.formTip2("email", "邮箱可用于找回密码", 3);
        return false;
      } else if (this.email && !this.common.checkEmail(this.email)) {
        let tips = "请输入正确的邮箱";
        this.toShowTips("email", tips);
        return false;
      } else if (this.email && this.common.checkEmail(this.email)) {
        this.formTip2("email", "", 1);
        return true;
      }
    },
    closeArea: function() {
      //关闭区域弹出层
      $(".mask.area").removeClass("active");
      $("#first").css("display", "");
      $(".category__item").removeClass("active");
      this.$refs.areaDialog.chooseArea = "";
      this.$refs.areaDialog.preAreaId = "";
      this.$refs.areaDialog.preName = "";
    },
    chooseArea: function() {
      $("#preButton").css("display", "none");
      $(".category__content").css("display", "none");
      $("#first").css("display", "");
      $(".mask.area").addClass("active");
      this.$refs.areaDialog.preAreaId = "";
      this.$refs.areaDialog.preName = "";
      this.$refs.areaDialog.listArea(null, 0, 1);
    },
    confirmArea: function(areaid) {
      if (areaid) {
        this.areaid = areaid;
        this.utilscommit.requestapi(
          "areaFullInfo",
          { areaid: areaid },
          this.areaBack
        );
      } else {
        this.volAreaName = this.areaName;
        this.checkInfo(7);
      }
    },
    areaBack: function(result) {
      if (result && result.fullname) {
        this.volAreaName = result.fullname;
        this.checkInfo(7);
      } else {
        this.volAreaName = "";
      }
    },
    // 用户注册
    commit: function() {
      // 新api参数
      let params = {
        areaid: this.areaid, // 区域id
        // areaid: '420000000000000000', // 区域id
        imgkey: this.imgkey, // 图文验证码
        code: this.newUserInfo_imgcode.toUpperCase(), // 验证码
        albp0014: this.birthday, // 出生日期
        albp0052: this.newUserInfo.username, // 用户名
        albp0053: this.newUserInfo.password, // 密码
        albp0087: "1", // 用户类型
        albp0063: "2", // 是否实名,默认已实名
        albp0064: this.newUserInfo.albp0064.trim(), // 姓名
        albp0065: this.idType, // 证件类型
        albp0006: this.gender, // 性别
        albp0066: this.newUserInfo.albp0066, // 证件号码
        albp0068: this.newUserInfo.albp0068, // 手机
        albp0069: this.photo1, // 证件正面照
        albp01_121: this.photo2, // 证件反面照
        source: "0", // 0 -> pc, 1 -> 小程序, 2 -> app
        albp0081: this.email // 邮箱
      };
      // 除大陆身份证外，都需要传性别
      if (this.idType != 0) {
        params.albp0006 = this.gender;
      }
      console.log(params);
      // 新api，用户注册
      this.utilscommit.requestapi(
        "registerVolunteerFortisWeb",
        params,
        this.regBack
      );
    },
    regBack: function(result) {
      this.isClick = true;
      if (result) {
        if (result.code == 0 && result.data) {
          this.$swal(
            "注册成功，请登录完善信息后等待实名认证，预计1～5个工作日可完成实名认证！",
            { buttons: ["留在当前页", "去登录"] }
          ).then(value => {
            if (value) {
              this.$router.push({
                name: "login",
                params: { type: 2 }
              });
            } else {
              this.$router.go(0);
            }
          });
        } else {
          this.failLogin(result.message);
        }
      } else {
        this.failLogin("注册失败");
      }
    },
    failLogin(message) {
      //注册失败
      this.$swal(message, { buttons: "确定" });
      this.changeImgCode();
      this.isClick = true;
      $("#register").css({ background: "#cc0000", opacity: "1" }); //修改注册按钮状态
    },
    /* loginBack: function(result) {
      if (result && result.data) {
        window.sessionStorage.setItem("nvsi_loginstatus", 1);
        Vueh.getUserInfo(); //打开页眉中的用户信息
        this.$router.push({
          name: "updatedata",
          params: { define: this.routeDefine }
        });
      } else {
        this.$swal(
          "注册成功，预计1～5个工作日可完成实名认证，请实名认证完成后再登录",
          { buttons: "确定" }
        );
      }
    }, */
    checkInfo(type) {
      //失焦事件
      this.type = 1;
      let tips = null;
      switch (type) {
        case 1: //用户名
          this.usernameFlag = false;
          if (!this.newUserInfo.username) {
            tips = "用户名不能为空";
          } else if (!this.common.checkUsername(this.newUserInfo.username)) {
            tips =
              "用户名长度6～20个字符，以字母a～z开头，且只能由字母、数字0～9和下划线组成";
          } else {
            // 新api -> 验证用户名唯一 字段名 username 改为 albp0052
            this.utilscommit.requestapi(
              "getVolNameCheckFortisWeb",
              { albp0052: this.newUserInfo.username },
              this.callback1
            );
          }
          this.toShowTips("username", tips);
          break;
        case 2: //密码
          this.passwordFlag = false;
          if (!this.newUserInfo.password) {
            this.toShowTips("password", "密码不能为空");
          } else if (!this.common.checkPW(this.newUserInfo.password)) {
            this.toShowTips(
              "password",
              "密码长度为8-20个字符，且必须同时包含数字、大写字母和小写字母"
            );
          } else if (
            this.newUserInfo.repeatpw &&
            this.newUserInfo.repeatpw != this.newUserInfo.password
          ) {
            this.toShowTips("password", "两次输入密码不一致");
          } else {
            if (this.newUserInfo.repeatpw) {
              this.toShowTips("repeatpw", "");
            }
            this.toShowTips("password", "");
            this.passwordFlag = true;
          }
          break;
        case 3: //确认密码
          if (!this.newUserInfo.repeatpw) {
            this.toShowTips("repeatpw", "确认密码不能为空");
          } else if (this.newUserInfo.repeatpw != this.newUserInfo.password) {
            this.toShowTips("repeatpw", "两次输入密码不一致");
          } else {
            this.toShowTips("repeatpw", "");
            this.toShowTips("password", "");
          }
          break;
        case 4: //手机号码
          if (!this.newUserInfo.albp0068) {
            tips = "手机号码不能为空";
          } else if (!this.common.checkPhoneno(this.newUserInfo.albp0068)) {
            tips = "请输入正确的手机号码";
          }
          this.toShowTips("phonenum", tips);
          break;
        case 5: //图文验证码
          this.imgCodeFlag = false;
          if (!this.newUserInfo_imgcode) {
            tips = "图文验证码不能为空";
          } else if (this.newUserInfo_imgcode.length != 4) {
            tips = "图文验证码格式错误";
          } else {
            this.imgCodeFlag = true;
          }
          this.toShowTips("imgCode", tips);
          break;
        case 6: //短信验证码
          if (!this.newUserInfocode) {
            tips = "验证码不能为空";
          } else if (this.newUserInfocode.length != 6) {
            tips = "请输入6位数的验证码";
          }
          this.toShowTips("code", tips);
          break;
        case 7: //区域
          if (!this.volAreaName && this.$store.getters.getArea.areaid == "0") {
            //特殊站点的区域
            tips = "区域不能为空";
          }
          this.toShowTips("volArea", tips);
          break;
        case 8: //姓名
          if (!this.newUserInfo.albp0064) {
            tips = "姓名不能为空";
          } else if (!this.common.checkName(this.newUserInfo.albp0064)) {
            tips = "请正确填写姓名";
          }
          this.toShowTips("name", tips);
          break;
        case 9: //证件类型
          if (this.idType == "0") {
            tips = "证件类型不能为空";
          }
          this.toShowTips("idType", tips);
          break;
        case 10: //证件号码
          this.idNumFlag = false;
          if (!this.newUserInfo.albp0066) {
            tips = "证件号码不能为空";
          } else if (
            this.idType == "01" &&
            !this.common.checkCardNo(this.newUserInfo.albp0066)
          ) {
            tips = "证件号码格式错误，请重新输入";
          } else if (
            this.idType != "01" &&
            (this.common.checkCardNo(this.newUserInfo.albp0066) ||
              this.newUserInfo.albp0066.length < 6)
          ) {
            // 港澳台地区不允许使用内地身份证号注册
            tips = "证件号码格式错误，请重新输入";
          } else {
            // 新api -> 验证证件号唯一, card 改为 albp0066,删除cardtype,新增用户名字段 albp0052
            this.utilscommit.requestapi(
              "getVolCardCheckFortisWeb",
              {
                albp0066: this.newUserInfo.albp0066,
                albp0052: this.newUserInfo.username
              },
              this.callback4
            );
          }
          this.toShowTips("idNum", tips);
          break;
        case 11: //出生日期
          if (this.idType != "01" && !this.birthday) {
            tips = "出生日期不能为空";
          }
          this.toShowTips("birthday", tips);
          break;
        case 12: //证件照片
          if (this.idType != "01") {
            if (!this.imgFile1) {
              tips = "请上传证件正面照";
            } else if (!this.imgFile2) {
              tips = "请上传证件反面照";
            }
            if (tips) {
              this.type = 2;
              this.$swal(tips, { buttons: "确定" });
            }
          }
          break;
      }
    },
    toShowTips(type, tips) {
      //提示框显示
      this.type = tips ? 2 : this.type;
      this.formTip2(type, tips, this.type);
    },
    callback1: function(result) {
      if (result) {
        let tips = "";
        if (result.code == "0") {
          this.usernameFlag = true;
        } else {
          this.type = 2;
          tips = "该用户名已存在，请重新输入";
        }
        this.formTip2("username", tips, this.type);
      }
    },
    checkFocusInfo(type) {
      //聚焦事件
      switch (type) {
        case 1: //用户名
          this.formTip2(
            "username",
            "用户名长度6～20个字符，以字母a～z开头，且只能由字母、数字0～9和下划线组成",
            3
          );
          break;
        case 2: //密码
          this.formTip2(
            "password",
            "密码长度为8-20个字符，且必须同时包含数字、大写字母和小写字母",
            3
          );
          break;
        case 3: //手机号码
          this.formTip2(
            "phonenum",
            "手机号码不能为空，请确保该手机号码真实有效",
            3
          );
          break;
        case 4: //姓名
          this.formTip2("name", "真实姓名不能为空，请与证件上保持一致", 3);
          break;
        case 5: //证件号码
          this.formTip2("idNum", "证件号码请如实填写，建议填写身份证号码", 3);
          break;
      }
    },
    changeImgCode: function(type) {
      this.newUserInfo_imgcode = "";
      this.newUserInfocode = "";
      this.codeButton = "获取验证码";
      this.countdown = 60;
      if (type != 1) {
        //非首次进入
        this.checkInfo(5);
        //this.checkInfo(6);
      }
      if (this.timer) {
        clearTimeout(this.timer);
        $("#codebutton").removeAttr("disabled");
        this.timer = null;
      }

      // 新api，获取图片验证码
      this.utilscommit.requestapi(
        "getImageCodeFortisWeb",
        null,
        this.changeImgCodeBack
      );
    },
    changeImgCodeBack(data) {
      //图片验证码获取结果
      if (data && data.data) {
        $("#reg_image").attr("src", data.data.img);
        this.imgkey = data.data.imgkey;
        this.imgCodeFlag = false;
      }
    },
    callback4: function(result) {
      if (result) {
        if (result.code == 0 || result.data) {
          this.idNumFlag = true;
        } else if (result.message == 1) {
          this.type = 2;
          this.tip = "证件号码已注册，请直接登录";
        } else {
          this.type = 2;
          this.tip = "证件号码已注册，请直接登录";
        }
      }
      this.formTip2("idNum", this.tip, this.type);
    },
    formTip2(el, tip, type) {
      if (type == 1) {
        //正确
        $("#" + el + "Tips")
          .html("&nbsp")
          .removeClass("warn-tip")
          .removeClass("wrong-tip")
          .addClass("right2-tip");
      } else if (type == 2) {
        //错误
        $("#" + el + "Tips")
          .html(tip)
          .removeClass("right2-tip")
          .removeClass("warn-tip")
          .addClass("wrong-tip");
      } else if (type == 3) {
        //提示
        $("#" + el + "Tips")
          .html(tip)
          .removeClass("right2-tip")
          .removeClass("wrong-tip")
          .addClass("warn-tip");
      }
      if (el == "username" || el == "password") {
        //用户名和密码
        if (tip && tip.length > 14) {
          $("#" + el + "Tips").css("margin-top", "0px");
        } else {
          $("#" + el + "Tips").css("margin-top", "10px");
        }
      }
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
  },
  watch: {
    idType: function(newval, oldval) {
      this.checkInfo(9);
      // 切换证件类型，置空已填写的证件号
      this.$set(this.newUserInfo, "albp0066", "");
      this.formTip2("idNum", "证件号码请如实填写，建议填写身份证号码", 3);

      if (newval == 0 || newval == 1) {
        //未选择或内地身份证
        $("#other").hide();
        $("#othersm").hide();
        this.gender = "1";
        this.birthday = this.photo1 = this.photo2 = this.photo3 = "";
        $("#photo1").html('<img src="' + this.img1 + '"  alt="" class="w">');
        $("#photo2").html('<img src="' + this.img2 + '"  alt="" class="w">');
        $("#photo3").html('<img src="' + this.img3 + '"  alt="" class="w">');
      } else {
        $("#other").show();
        $("#othersm").show();
      }
    }
  }
};
</script>

<style scoped>
p {
  font-size: 14px;
}
.warn-tip {
  background: url("../../assets/img/warn.png") 10px no-repeat;
  color: #666;
}
.wrong-tip {
  background: url("../../assets/img/wrong.png") 10px no-repeat;
  color: #cc0000;
}
.right2-tip {
  background: url("../../assets/img/right2.png") 10px no-repeat;
  color: #666;
}
.form .form-error {
  display: inline-block;
  font-size: 14px;
  margin-top: 10px;
  width: 330px;
  position: absolute;
  left: 100%;
  padding-left: 30px;
}
.form input {
  height: 42px;
  line-height: 42px;
}
.pwd_img {
  bottom: 8px;
}
</style>
