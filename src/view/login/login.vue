<template>
  <div id="login">
    <!--中间部分-->
    <div class="main bannerimg">
      <div class="mid">
        <ul class="row w">
          <li class="col">
            <div class="router">
              <span>当前位置：</span>
              <a href="javascript:void(0);">
                <router-link tag="span" :to="{ name: 'home', params: { define: routeDefine } }">首页</router-link>
              </a>
              <span v-if="lotype == 1">管理部门登录</span><span v-else-if="lotype == 3">志愿队伍登录</span><span v-else> 志愿者登录</span>
            </div>
          </li>
        </ul>
        <div class="row w login">
          <div class="col v-t">
            <img src="../../assets/img/login.png" style="height: 460px; width: 754px" />
          </div>
          <div class="col v-t white">
            <h2 v-cloak class="login_header" style="margin: 0">
              <div v-show="lotype != 1">
                <router-link class="col v-m login-txt a_1" tag="a" :to="{
                    name: 'login',
                    params: { define: routeDefine, type: 3 }
                  }" v-show="lotype != 3 && !$store.getters.getArea.industrycode">志愿队伍登录</router-link>
                <router-link class="col v-m login-txt a_1" tag="a" :to="{
                    name: 'login',
                    params: { define: routeDefine, type: 2 }
                  }" v-show="lotype == 3 && !$store.getters.getArea.industrycode">志愿者登录</router-link>
              </div>
              <a :class="{
                  ml:
                    lotype == 2 && this.$store.getters.getArea.cnname == '税收'
                }">{{
                  lotype == 1
                    ? "管理部门"
                    : lotype == 3
                    ? "志愿队伍"
                    : "志愿者"
                }}登录</a>
              <router-link class="a_2" :to="{
                  name: 'login',
                  params: { define: routeDefine, type: 1 }
                }" style="color: #999; font-size: 14px" v-show="lotype != 1">管理部门登录</router-link>
            </h2>

            <!-- <div
              v-if="lotype == 2"
              style="
                height: 40px;
                width: 436px;
                text-align: right;
                padding-right: 10px;
               
                z-index: 100;
                background-color: white;
                position: absolute;
              "
              
            > -->
            <!-- {{ showch == 1 ? "微信登录" : "密码登录" }} -->
            <!-- <div v-if="showch == 1 ">
                <img style="height: 30px; cursor: pointer;" @click="switchs" title="微信登录"
                  src="../../assets/img/wxerwm.svg"
                  alt=""
                />
             
            </div>
            <div v-else>
               <img style="height: 25px; cursor: pointer;" @click="switchs" title="密码登录"
                  src="../../assets/img/wxdn.svg"
                  alt=""
                />
            </div>
            </div> -->
            <div v-if="lotype == 2" style="
                height: 40px;
                width: 436px;
                text-align: right;
                padding-right: 10px;
                cursor: pointer;
                z-index: 99;
                background-color: white;
                position: absolute;
              "></div>
            <div v-show="showch == 2" id="abc" style="display: flex; justify-content: center"></div>
            <div v-show="showch == 1" style="height: 40px"></div>
            <div class="login-wrap" v-show="showch == 1">
              <div class="login-input">
                <img src="../../assets/img/user.png" />
                <input type="text" v-if="lotype == 2" id="username" v-model="username" @blur="usernameCheck" @keypress.enter="login" placeholder="请输入用户名或身份证号码" maxlength="30"
                  onchange="this.value=this.value.replace(/[^\w_.]/g,'')" />
                <input type="text" v-else id="username" v-model="username" @blur="usernameCheck" @keypress.enter="login" placeholder="请输入用户名" maxlength="30"
                  onchange="this.value=this.value.replace(/[^\w_.]/g,'')" />
              </div>
              <span class="login-tips" id="usernameTips"></span>
              <div class="login-input">
                <img src="../../assets/img/pwd.png" />
                <input type="password" id="password" v-model="password" @blur="passwordCheck" @keypress.enter="login" placeholder="请输入密码" maxlength="30" />
                <img src="../../assets/images/hide.png" alt="" class="pwd_img" v-show="imgShow == 0" @click="changeType($event, 1)" />
                <img src="../../assets/images/show.png" alt="" class="pwd_img" v-show="imgShow == 1" @click="changeType($event, 0)" />
              </div>
              <span class="login-tips" id="passwordTips"></span>
              <div class="login-input" style="line-height: 2.1">
                <img src="../../assets/img/yzm.png" alt="" />
                <input type="text" placeholder="请输入验证码" id="code" v-model="imgCode" @blur="imgCodeCheck" maxlength="4" oninput="this.value=this.value.replace(/[^0-9a-zA-Z]/g,'')"
                  style="display: inline-block; width: 60%" @keypress.enter="login" />
                <span @click="getImgCode('imgCode')" id="imgCode" style="
                    margin-left: 10px;
                    cursor: pointer;
                    border: 1px solid #dfdfdf;
                    text-align: center;
                    width: 35%;
                    height: 46px;
                    border-radius: 4px;
                    float: right;
                  ">
                  <img id="reg_image" src="" alt="" /></span>
              </div>
              <span class="login-tips" id="imgCodeTips"></span>
              <a href="javascript:void(0);" class="button" :class="isclick ? '' : 'btn_disabled'" @click="login" @keypress.enter="login">{{ isclick ? "登 录" : "登 录 中..." }}</a>

              <div class="row w login_footer" v-show="lotype != 1">
                <router-link :class="lotype == 3 ? 'width2' : 'width1'" class="col v-m login-txt a_3" tag="a" :to="{ name: 'volreg', params: { define: routeDefine } }"
                  v-show="lotype == 2">立即注册</router-link>
                <router-link :class="lotype == 3 ? 'width2' : 'width1'" class="col v-m login-txt a_4" tag="a" :to="{ name: 'orgreg', params: { define: routeDefine } }"
                  v-show="lotype == 3 && !$store.getters.getArea.industrycode">立即注册</router-link>
                <!-- <a
                  :class="lotype == 3 ? 'width2' : 'width1'"
                  :href="context + '/site/forgetpwd1/' + (parseInt(lotype) - 1)"
                  class="col v-m t-r login-txt a_5"
                  id="Forgot_password"
                  >忘记密码?</a
                >
                <a
                  :class="lotype == 3 ? 'width2' : 'width1'"
                  :href="context + '/site/findpwd'"
                  class="col v-m t-r login-txt a_6"
                  v-show="lotype != 3"
                  id="Account_appeal"
                  >账户申诉</a
                > -->

                <!-- 往新版总站跳 -->
                <!-- <a
                  :class="lotype == 3 ? 'width2' : 'width1'"
                  :href="
                    contextl +
                      '/LEAP/site/index.html#/forgetpwd1/' +
                      (parseInt(lotype) - 1)
                  "
                  class="col v-m t-r login-txt a_5"
                  id="Forgot_password"
                  >忘记密码?</a
                >
                <a
                  :class="lotype == 3 ? 'width2' : 'width1'"
                  :href="contextl + '/LEAP/site/index.html#/findpwd'"
                  class="col v-m t-r login-txt a_6"
                  v-show="lotype != 3"
                  id="Account_appeal"
                  >账户申诉</a
                > -->

                <!--新版总站暂时不上 先将忘记密码和账户申述迁到子站-->
                <router-link :class="lotype == 3 ? 'width2' : 'width1'" :to="{
                    name: 'forgetpwd1',
                    params: { define: routeDefine, type: parseInt(lotype) - 1 }
                  }" class="col v-m t-r login-txt a_5" id="Forgot_password">忘记密码?</router-link>
                <router-link :class="lotype == 3 ? 'width2' : 'width1'" :to="{ name: 'findpwd', params: { define: routeDefine } }" class="col v-m t-r login-txt a_6"
                  v-show="lotype != 3" id="Account_appeal">账户申诉</router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--直属法人组织选择弹窗-->
    <div class="mask directlyorg active" v-show="bindingtc == 1">
      <div class="mask-info" style="max-height: 702px; width: 510px; left: 60%">
        <div class="mask-header row w">
          <div class="col v-m">
            <h2 style="text-align: center; padding: 30px 0 15px 0">
              该微信未绑定账号,请绑账号
            </h2>
          </div>
        </div>
        <div style="padding: 0 30px">
          <div class="login-input">
            <img src="../../assets/img/user.png" />
            <input type="text" id="usernamevxx" v-model="usernamevx" @blur="usernameCheckvx" placeholder="请输入用户名或身份证号码" maxlength="30"
              onchange="this.value=this.value.replace(/[^\w_.]/g,'')" />
          </div>
          <span class="login-tips" id="usernamevxxTips"></span>
          <div class="login-input">
            <img src="../../assets/img/pwd.png" />
            <input type="password" id="passwordvx" v-model="passwordvx" @blur="passwordCheckvx" @keypress.enter="login" placeholder="请输入密码" maxlength="30" />
          </div>
          <span class="login-tips" id="passwordvxTips"></span>
          <div class="login-input">
            <img src="../../assets/img/pwd.png" />
            <input type="password" id="passwordqvx" v-model="passwordqvx" @blur="passwordCheckqvx" @keypress.enter="login" placeholder="请再次输入密码" maxlength="30" />
          </div>
          <span class="login-tips" id="passwordqvxTips"></span>
        </div>
        <div style="display: flex; justify-content: space-around; margin-top: 10px">
          <div class="login-wrap button" @click="cancelbin">取消</div>
          <div class="login-wrap button" @click="binding">绑定</div>
        </div>
        <!-- <div class="col v-m t-r">
            <a href="javascript:void(0);" class="mask-close"
              ><img src="../../assets/img/close.png" alt=""
            /></a>
          </div> -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "login",
  data() {
    return {
      showch: "1", //1显示密码登录,"2"显示二维码登录
      context: this.common.getContent(),
      contextl: this.common.getUrls(),
      routeDefine: this.$route.params.define,
      lotype: "", //用户类型  1=管理部门登录 ，2=志愿者，3=队伍
      areaid: "",
      cnname: "",
      username: "",
      password: "",
      imgCode: "", // 图文验证码
      userInfo: {},
      imgShow: 0,
      imgKey: "", // 图文验证码缓存key
      //tositeurl:'http://219.148.94.205:8001/NVSI',//域名：http://chinavolunteer.cn     ip:http://219.148.94.205:8001

      usernamevx: "", //绑定微信的用户或身份证
      passwordvx: "", //绑定微信的密码
      passwordqvx: "", //绑定微信的确认密码
      informationvx: "", //微信信息
      bindingtc: "0", //0弹窗关闭,1弹窗显示
      isclick: true // 是否可以点击登录按钮
    };
  },
  created() {
    window.Vues = this;
    this.getAreaInfo();
    this.getUserInfo();
    // 全局监听键盘按下事件
    // document.onkeydown = (e) => {
    //   console.log(e);
    // }
  },
  mounted() {
    //微信登录代码别删
    // var diq =
    //   window.location.host +
    //   "-" +
    //   window.location.pathname.split("/")[2] +
    //   "-" +
    //   1;
    // var obj = new WxLogin({
    //   self_redirect: false,
    //   id: "abc", //盒子 ID
    //   appid: "wxc6f62cbc82e441df", //微信官网申请
    //   scope: "snsapi_login", //微信官网申 请
    //   style: "while", //二维码样式 只有black  while
    //   // href:
    //   //   "data:text/css;base64,LmltcG93ZXJCb3ggLnFyY29kZSB7d2lkdGg6IDIwMHB4O30NCi5pbXBvd2VyQm94IC50aXRsZSB7ZGlzcGxheTogbm9uZTt9DQouaW1wb3dlckJveCAuaW5mbyB7d2lkdGg6IDIwMHB4O30NCi5zdGF0dXNfaWNvbiB7ZGlzcGxheTpub25lfQ0KLmltcG93ZXJCb3ggLnN0YXR1cyB7dGV4dC1hbGlnbjogY2VudGVyO30=",
    //   redirect_uri: `https://chinavolunteer.mca.gov.cn/site/home?diq=${diq}`, //微信官网设置回调域名

    //   state: "STATE#wechat_redirect"
    // });
    this.getImgCode("imgCode");
  },
  methods: {
    kai(e) {
      if (e == 1) {
        $("#pwd").css("display", "block");
      } else {
        $("#aot").css("display", "block");
      }
    },
    guan(e) {
      if (e == 1) {
        $("#pwd").css("display", "none");
      } else {
        $("#aot").css("display", "none");
      }
    },
    getAreaInfo: function() {
      this.routeDefine = this.$route.params.define;
      this.lotype = this.$route.params.type;
      var areaInfo = this.$store.getters.getArea;
      if (areaInfo && areaInfo.enname && areaInfo.enname == this.routeDefine) {
        this.areaid = areaInfo.areaid;
        this.cnname = areaInfo.cnname;

        var url = location.search;
        if (url) {
          //判断url是否有传参
          var theRequest = new Object();
          if (url.indexOf("?") != -1) {
            var str = url.substr(1);
            let strs = str.split("&");
            for (var i = 0; i < strs.length; i++) {
              theRequest[strs[i].split("=")[0]] = strs[i].split("=")[1];
            }
          }
          let code = theRequest.code; //微信code
          //debugger;
          this.utilscommit.requestapi(
            //微信查询用户信息或是否绑定
            "getvolBasicInfoByUnionidFortisWeb",
            { code: code, areaid: this.areaid },
            this.wejump
          );
        }
      }
    },
    getUserInfo: function() {
      // 旧接口已废弃
      // this.utilscommit.request("nvsi_getUserInfo", null, this.userInfoCheck);
      this.userInfo = this.$store.getters.getUser;
      if (this.userInfo) {
        let loginstatus = window.sessionStorage.getItem("nvsi_loginstatus"); //登录状态 1=已登录
        if (loginstatus && loginstatus == 1) {
          Vueh.getUserInfo(); //打开页眉中的用户信息
          this.$router.push({
            name: "home",
            params: { define: this.routeDefine }
          });
        }
      }
    },
    userInfoCheck: function(result) {
      if (result.data) {
        let loginstatus = window.sessionStorage.getItem("nvsi_loginstatus"); //登录状态 1=已登录
        if (loginstatus && loginstatus == 1) {
          Vueh.getUserInfo(); //打开页眉中的用户信息
          this.$router.push({
            name: "home",
            params: { define: this.routeDefine }
          });
        }
      }
    },
    login: function() {
      if (!this.isclick) {
        return;
      }
      if (this.usernameCheck() && this.passwordCheck() && this.imgCodeCheck()) {
        /* if (this.lotype == 1 && !this.$store.getters.getArea.industrycode) {
          //管理员登录 和 非特殊站点管理员
          this.utilscommit.request(
            "nvsi_getManagerCheck",
            { username: this.username },
            this.getManagerCheckBack
          ); //验证该用户是否为管理员
          // this.toLoginLeap();//登录业务系统
        } else */
        // 响应之前禁止登录按钮
        this.isclick = false;
        if (this.lotype == 3 || this.lotype == 1) {
          //队伍、管理员登录
          this.loginOther();
        } else {
          // 按钮置灰
          // $(".button").addClass("btn_disabled");
          /*   var type = 1; //1:用户名，2:手机号码，3:身份证号码
          if (this.common.checkPhoneno(this.username)) {
            type = 2;
          } else if (this.common.checkCardNo(this.username)) {
            type = 3;
          } */
          let params = {
            areaid: this.areaid,
            username: this.username,
            password: this.password,
            code: this.imgCode.toLocaleUpperCase(),
            imgkey: this.imgKey
          };
          this.utilscommit.requestapi(
            "LoginVolFortisWeb",
            params,
            this.loginBack
          );
        }
      }
    },
    cancelbin() {
      this.bindingtc = "0";
    },
    binding() {
      if (
        this.usernameCheckvx() &&
        this.passwordCheckvx() &&
        this.passwordCheckqvx()
      ) {
        let params = this.informationvx;
        params.username = this.usernamevx;
        params.password = this.passwordvx;
        //debugger;
        this.utilscommit.requestapi(
          "updatebindvolAccountWeChatFortisWeb",
          params,
          src => {
            if (src.code == 0) {
              this.bindingtc = "0";
              this.toSwal("绑定成功");
            } else {
              this.toSwal(src.message);
            }
          }
        );
      }
      //绑定信息
    },
    wejump(result) {
      console.log(result);
      var url = window.location.href; //获取当前页面的url
      if (url.indexOf("?") != -1) {
        //判断是否存在参数
        url = url.replace(/(\?|#)[^'"]*/, ""); //去除参数
        window.history.pushState({}, 0, url);
      }
      if (result.code === 0) {
        //有用户信息直接登录
        this.loginBack(result);
      } else if (result.code === 500002) {
        this.informationvx = result.data;
        this.bindingtc = "1"; //打开绑定弹窗
        //没有用户信息可以绑定微信
      } else if (result) {
        this.toSwal(result.message);
      } else {
        this.toSwal("登录失败");
      }
    },
    /*  getManagerCheckBack(res) {
      if (res.code == 0 && res.data == 1) {
        // this.toLoginLeap(); //登录业务系统
        this.loginOther();
      } else {
        this.toSwal("该管理部门账号不存在!");
      }
    }, */
    loginBack: function(result) {
      debugger
      if (result && result.data) {
        // result.data.albp0029 = result.data.albp0029.trim();
        this.userInfo = result.data;
        this.userBack(result);
        // isdelete 0->有效，1->无效
        /*if (this.lotype == 2 ||  this.userInfo.isdelete == 0) {
          this.userBack(result);
        } else if (this.lotype == 3) {
          if (result.data.albe0026 == "3") {
            //停用团体
            this.toSwal("您的账号已被停用，如有问题请联系所在区域民政管理部门");
            return (this.isclick = true);
          } else {
            // this.toLoginLeap();
            this.loginOther();
          }
        } else {
          this.toSwal("无效用户!");
          this.isclick = true;
        } */
      } else if (result.message) {
        this.toSwal(result.message);
        // this.getImgCode("imgCode");
        this.isclick = true;
      } else {
        var msg = "用户名或密码错误";
        $("#imgCodeTips")
          .html(msg)
          .css("color", "red");
        this.getImgCode("imgCode");
        this.isclick = true;
      }
      this.isclick = true;
      // $(".button").removeClass("btn_disabled");
    },
    async userBack(result) {
      //debugger
      // if (this.lotype == 2) {
      if (result.data.albp0087 == 1) {
        //albp0087   1-志愿者  2-队伍
        if (result.data.albp0090 == 1) {
          //albp0090  1-有效   0-无效
          // 志愿者有服务区域，当前站点和志愿者服务区域不一致
          if (
            result.data.albp0020 &&
            result.data.albp0020.substring(0, 2) != this.areaid.substring(0, 2)
          ) {
            this.$swal(
              "您的服务区域和当前站点不一致，是否前往服务区域所在站点进行记录转移？",
              { buttons: ["确定", "取消"] }
            ).then(value => {
              if (value) {
                this.$router.go(0);
              } else {
                // 获取志愿者服务区域对应的站点域名
                let path = this.common.areaList.filter(
                  item => item.areaid == result.data.albp0020.substring(0, 2)
                )[0].path;
                let name = this.common.areaList.filter(
                  item => item.areaid == result.data.albp0020.substring(0, 2)
                )[0].sname;
                // 跳转测试环境
                if (name == "hubei") {
                  if (window.location.host == "wuhan.yxybb.com") {
                    window.open(`https://wuhan.yxybb.com/subsite/${name}/home`);
                  } else {
                    // 跳转对应正式环境站点
                    window.open(path);
                  }
                } else {
                  //暂时只上湖北，所以登录区域对应不上时跳转到其他站点为老版网站地址
                  if (window.location.host == "wuhan.yxybb.com") {
                    window.open(
                      `https://wuhan.yxybb.com/NVSICN/LEAP/dist/index.html#/${name}/home`
                    );
                  } else {
                    // 跳转对应正式环境站点
                    let url = path.replace(
                      /subsite/,
                      "NVSI/LEAP/dist/index.html#"
                    );
                    window.open(url);
                  }
                }
                this.$router.go(0);
              }
            });
            this.isclick = true;
          } else if (
            !result.data.albp0020 &&
            result.data.albp0057 &&
            result.data.albp0057.substring(0, 2) != this.areaid.substring(0, 2)
          ) {
            // 没有服务区域，只有注册区域，且当前站点区域和注册区域不同
            this.$swal(
              "您的注册区域和当前站点不一致，是否前往注册区域所在站点完善信息？",
              { buttons: ["确定", "取消"] }
            ).then(value => {
              if (value) {
                this.$router.go(0);
              } else {
                // 获取志愿者注册区域对应的站点域名
                let path = this.common.areaList.filter(
                  item => item.areaid == result.data.albp0057.substring(0, 2)
                )[0].path;
                let name = this.common.areaList.filter(
                  item => item.areaid == result.data.albp0020.substring(0, 2)
                )[0].sname;
                // 跳转测试环境
                if (name == "hubei") {
                  if (window.location.host == "wuhan.yxybb.com") {
                    window.open(`https://wuhan.yxybb.com/subsite/${name}/home`);
                  } else {
                    // 跳转对应正式环境站点
                    window.open(path);
                  }
                } else {
                  //暂时只上湖北，所以登录区域对应不上时跳转到其他站点为老版网站地址
                  if (window.location.host == "wuhan.yxybb.com") {
                    window.open(
                      `https://wuhan.yxybb.com/NVSICN/LEAP/dist/index.html#/${name}/home`
                    );
                  } else {
                    // 跳转对应正式环境站点
                    let url = path.replace(
                      /subsite/,
                      "NVSI/LEAP/dist/index.html#"
                    );
                    window.open(url);
                  }
                }
                this.$router.go(0);
              }
            });
            this.isclick = true;
          } else {
            window.sessionStorage.setItem("nvsi_loginstatus", 1);
            this.$store.commit("saveUser", this.userInfo);
            Vueh.getUserInfo(); //打开页眉中的用户信息
            console.log(this.userInfo.albp0005);
            let { data: res } = await this.utilscommit.asyncReq(
              "getVolunteerInfoFortisWeb",
              {
                cardno: this.userInfo.albp0005
              }
            );
            if (res.code == 0 && res.data) {
              this.$store.commit("saveBasic", res.data);
            }
            if (result.data.albp0028 && result.data.albp0020) {
              //有服务区域或居住区域
              this.$router.push({
                name: "usercenter",
                params: { define: this.routeDefine }
              });
            } else {
              //无服务区域和居住区域
              this.$router.push({
                name: "updatedata",
                params: { define: this.routeDefine }
              });
            }
            this.isclick = true;
          }
        } else {
          this.toSwal("您的账号已被停用，如有问题请联系所在区域民政管理部门");
          this.isclick = true;
        }
      } else {
        this.toSwal("未查询到该志愿者账号!");
        this.isclick = true;
      }

      // } else {
      //   this.toSwal("用户名或密码错误!");
      // }
      /*  } else {
        if (result.data.albe0026 == "3") {
          //停用团体
          this.toSwal("您的账号已被停用，如有问题请联系所在区域民政管理部门");
          return (this.isclick = true);
        } else {
          // this.toLoginLeap();
          this.loginOther();
        }
      } */
    },

    loginOther() {
      //后台登录方法
      let params = {
        username: this.username,
        password: this.password,
        code: this.imgCode.toLocaleUpperCase(),
        imgkey: this.imgKey,
        sign: "1" //传验证码必传字段
      };
      this.utilscommit.requestapi(
        "LEAPLoginFortisWeb",
        params,
        this.loginOtherBack
      );
    },
    loginOtherBack(res) {
      if (res.code == 0) {
        // let id = res.data.cursessionid;
        let location = window.location.origin;
        let headTxt = location + "/volunteer/redirect";
        let url = "";
        let eninfo = this.utilscommit.getSM4().encrypt(
          JSON.stringify({
            username: this.username,
            password: this.password
          })
        );
        let info = eninfo.replace(/\+/g, "%2B").replace(/\&/g, "%26");
        if (this.lotype == 1) {
          //管理部门

          let manage = res.data.manage;
          if (manage) {
            // url = headTxt + "mcaworkbench/" + id;
            url = headTxt + "?type=mcaworkbench&userinfo=" + info;
          } else {
            this.$swal("未查询到该管理部门!");
            this.getImgCode();
            return (this.isclick = true);
          }
        } else if (this.lotype == 3) {
          // 队伍
          let team = res.data.team;
          if (team) {
            if (team.albe0026 && team.albe0026 == "3") {
              //停用的队伍
              this.$swal(
                "您的账号已被停用，如有问题请联系所在区域民政管理部门",
                {
                  buttons: "确定"
                }
              );
              this.getImgCode();
              return (this.isclick = true);
            } else {
              url = headTxt + "?type=teamworkbench&userinfo=" + info;
              window.sessionStorage.setItem("nvsi_loginstatus", 1);
              this.$store.commit("saveUser", { ...team, albp0087: 2 }); //用户信息
            }
          } else {
            this.$swal("未查询到该队伍信息!");
            this.getImgCode();
            return (this.isclick = true);
          }
        }
        this.common.addCookie("mgpath", url, 0.5);
        if (this.lotype == 3) Vueh.getUserInfo(); //获取页眉用户信息
        this.isclick = true;
        window.open(url, "_blank");
        this.$router.push({
          name: "home",
          params: { define: this.routeDefine }
        });
      } else {
        this.$swal(res.message);
        this.getImgCode();
        this.isclick = true;
      }
    },

    toLoginLeap(type) {
      //登录业务系统
      let logintypes = type ? type : 1;
      var path = this.leaplogin.login(this.username, this.password, logintypes);
      if (path) {
        if (this.lotype == 3) {
          //志愿队伍
          window.sessionStorage.setItem("nvsi_loginstatus", 1);
          this.$store.commit("saveUser", this.userInfo);
          Vueh.getUserInfo(); //打开页眉中的用户信息
        }
        this.common.addCookie("mgpath", path, 0.5);
        window.open(path, "_blank");
        this.$router.push({
          name: "home",
          params: { define: this.routeDefine }
        });
      } else if (!type) {
        this.toSwal("用户名或密码错误!");
      }
    },
    loginOut: function() {
      //   this.utilscommit.request("nvsi_loginOut", null, this.loginOutCheck);
      // },
      // loginOutCheck: function(result) {
      //   if (result && result.code == 0) {
      //退出
      Vueh.getUserInfo(); //打开页眉中的用户信息
      // }
    },
    toSwal(msg) {
      //提示并刷新图文验证码
      this.loginOut();
      this.$swal(msg, { buttons: "确定" });
      this.getImgCode("imgCode");
    },
    usernameCheckvx: function() {
      //微信提交判断
      var tip = "";
      var flag = true;
      if (!this.usernamevx) {
        tip = "用户名不能为空";
        flag = false;
      }
      this.formTip("usernamevxx", tip);
      return flag;
    },
    passwordCheckvx: function() {
      var tip = "";
      var flag = true;
      if (!this.passwordvx) {
        tip = "密码不能为空";
        flag = false;
      } /* else if (!this.common.checkPW(this.password)) {
          tip='用户名或密码错误';
          flag = false;
        } */
      if (this.passwordqvx) {
        this.passwordCheckqvx();
      }
      this.formTip("passwordvx", tip);
      return flag;
    },
    passwordCheckqvx: function() {
      var tip = "";
      var flag = true;
      if (!this.passwordqvx) {
        tip = "密码不能为空";
        flag = false;
      } else if (this.passwordqvx != this.passwordvx) {
        tip = "确认密码不一致";
        flag = false;
      } /* else if (!this.common.checkPW(this.password)) {
          tip='用户名或密码错误';
          flag = false;
        } */
      this.formTip("passwordqvx", tip);
      return flag;
    },

    usernameCheck: function() {
      var tip = "";
      var flag = true;
      if (!this.username) {
        tip = "用户名不能为空";
        flag = false;
      }
      this.formTip("username", tip);
      return flag;
    },
    passwordCheck: function() {
      var tip = "";
      var flag = true;
      if (!this.password) {
        tip = "密码不能为空";
        flag = false;
      } /* else if (!this.common.checkPW(this.password)) {
          tip='用户名或密码错误';
          flag = false;
        } */
      this.formTip("password", tip);
      return flag;
    },
    // 用户输入验证码后校验验证码
    imgCodeCheck: function() {
      if (!this.imgCode) {
        this.formTip("imgCode", "验证码不能为空");
        return false;
      } else {
        this.formTip("imgCode", "");
        /* this.utilscommit.requestapi(
          "verificationCodeFortisWeb",
          { code: this.imgCode, imgkey: this.imgKey },
          this.imgCodeCheckBack
        ); */
        return true;
      }
    },
    /*  imgCodeCheckBack: function(data) {
      if (data.code == 0 && data.data) {
        this.codeFlag = true;
        this.formTip("imgCode", "");
      } else {
        let message = "验证码错误";
        if (data.message) message = data.message;
        this.formTip("imgCode", message);
        this.getImgCode();
      }
    }, */
    // 获取验证码
    getImgCode(node) {
      this.imgCode = "";
      this.utilscommit.requestapi(
        "getImageCodeFortisWeb",
        null,
        this.getImgBack
      );
    },
    getImgBack: function(data) {
      if (data && data.data) {
        $("#reg_image").attr("src", data.data.img);
        this.imgKey = data.data.imgkey;
      }
    },
    formTip: function(el, tip) {
      $("#" + el + "Tips")
        .html(tip)
        .css("color", "red");
    },
    changeType(el, type) {
      //密码框小眼睛点击事件切换
      this.imgShow = type;
      if (type == 0) {
        //隐藏
        el.target.parentNode.children[1].type = "password";
      } else if (type == 1) {
        //显示
        el.target.parentNode.children[1].type = "text";
      }
    },
    switchs: function() {
      if (this.showch === "1") {
        this.showch = "2";
      } else {
        this.showch = "1";
      }
    }
  },
  watch: {
    "$route.params.define": function(newval, oldval) {
      if (this.routeDefine != newval) {
        this.routeDefine = this.$route.params.define;
        this.getAreaInfo();
      }
    },
    "$route.params.type": function() {
      this.$router.go(0);
    }
  }
};
</script>

<style scoped>
.father {
  position: relative;
  display: flex;
}

.btn_disabled {
  background: rgb(121, 120, 120);
}

.fukuang {
  width: 280px;
  background: #fff;
  border: 1px solid #000;
  border-radius: 5px;
  box-sizing: border-box;
  color: #000;
  font-size: 14px;
  padding: 5px;
  position: absolute;
  left: 155px;
  top: -85px;
  display: none;
}
.red {
  color: red !important;
}
.login_header {
  text-align: center;
  position: relative;
}
.login_header a {
  width: 33.3%;
}
.a_1,
.a_2 {
  position: absolute;
  top: 48px;
}
.a_1,
.a_2,
.a_3,
.a_4,
.a_5,
.a_6 {
  font-size: 15px !important;
  color: #666 !important;
}
.login-input {
  margin: 5px 0;
}
.login-input span img {
  position: inherit;
  width: 100%;
  height: 100%;
  vertical-align: top;
}
.login-tips {
  display: inline-block;
  font-size: 14px;
}
.login_footer {
  margin-bottom: 10px;
}
.width1 {
  width: 33.3%;
  text-align: center;
  box-sizing: border-box;
}
.width2 {
  width: 50%;
  text-align: center;
  box-sizing: border-box;
}
.login_footer > a {
  font-size: 18px;
}
.login-input img.pwd_img {
  left: 330px;
  top: 12px;
}
/* .login_header .ml{
    margin-left: 88px !important;
  } */
</style>
