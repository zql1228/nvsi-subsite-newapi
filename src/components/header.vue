<template>
  <div class="js-top-bar" id="header" :class="{
      'js-top-back':
        $store.getters.getArea.enname == 'fujian' ||
        $store.getters.getArea.enname == 'guizhou'
    }" style=" padding-bottom: 15px">
    <div class="mid row">
      <div class="col t-l">
        <h1 :style="{
            'margin-bottom':
              $store.getters.getArea.enname == 'guizhou' ? '29px' : ''
          }">
          <img v-if="$store.getters.getArea.enname != 'guizhou'" src="@/assets/img/top_logo.png" alt />
          <img v-else src="@/assets/images/logo_guizhou.png" alt style="height:60px" />
          <b class="top_title " :class="{
              h1fontsize:
                $store.getters.getArea.cnname &&
                $store.getters.getArea.cnname.length > 6
            }">
            {{ $store.getters.getArea.cnname }}志愿服务
            <b class="top_title1">中国志愿服务网</b>
            <span class="span_little" v-if="
                $store.getters.getArea.cnname &&
                  $store.getters.getArea.cnname.length < 6
              " v-text="$store.getters.getArea.cnname"></span>
            <span class="span_more" v-else v-text="$store.getters.getArea.cnname"></span>
          </b>
          <br />
        </h1>
      </div>
      <div class="col t-r v-m">
        <!-- 头部弹窗按钮 -->
        <div class="login-box" style="margin-bottom: -23px !important;">
          <!-- <dl class="address">
            <dt class="ab" @click="showsSite">站点切换</dt>
          </dl> -->
          <span><a :href="common.getASitel()" target="_blank">中国志愿服务网</a></span>
          <!-- <span><a :href="getASite" target="_blank">中国志愿服务网</a></span> -->
          <div style="display: inline-block;" v-html="logInfo"></div>

          <span v-if="!userInfo || userInfo.albp0076 == 1" class="red" @click="showsSite2">请登录</span>

          <a href="javascript:void(0);" v-if="!userInfo || userInfo.albp0076 == 1" class="a" @click="toVolandOrgReg('volreg')">志愿者注册</a>

          <span v-if="
              (!userInfo || userInfo.albp0076 == 1) &&
                !$store.getters.getArea.industrycode
            ">|</span>

          <a href="javascript:void(0);" v-if="
              (!userInfo || userInfo.albp0076 == 1) &&
                !$store.getters.getArea.industrycode
            " @click="toVolandOrgReg('orgreg')">志愿队伍注册</a>
          <img src="@/assets/img/login-img1.png" style="margin-bottom: 13px;ma" alt />
        </div>
        <!-- 头部搜索框 -->
        <div class="js-search" style="margin-top: -20px;overflow: visible;background:#fff">
          <div class="js-select">
            <b class="js-select-core" v-text="searchname"></b>
            <ul class="js-select-options">
              <li v-for="el in searchlist" :key="el.type" :class="{ active: searchtype == el.type }" @click="
                  searchname = el.name;
                  searchtype = el.type;
                " v-text="el.name"></li>
            </ul>
          </div>
          <input type="text" style="width: 412px;" v-model="searchtext" maxlength="30" />
          <button style="border-radius: 0 99px 99px 0;cursor: pointer;" @click="toSearch"></button>
        </div>
      </div>
    </div>

    <!--站点切换弹出层-->
    <!-- <div class="mask docs">
      <div class="mask-info" id="tc_zhandian">
        <div class="mask-header row w">
          <div class="col v-m">
            <h2>请选择站点</h2>
          </div>
          <div class="col v-m t-r">
            <a
              href="javascript:void(0);"
              class="mask-close"
              @click="closeMaskz"
            >
              <img src="@/assets/img/close.png" alt />
            </a>
          </div>
        </div>
        <div>
          <a
            :href="common.getASite()"
            style="width: 250px;"
            class="v-m category__item"
            target="_blank"
          >
            <h3>中国志愿服务网</h3>
          </a>
        </div>
      </div>
    </div> -->
    <!--选择登录方式弹窗-->
    <div class="mask docs2">
      <div class="mask-info" id="tc_denglu">
        <div class="mask-header row w">
          <div class="col v-m">
            <h2>请选择登录方式</h2>
          </div>
          <div class="col v-m t-r">
            <a href="javascript:void(0);" class="mask-close" @click="closeMaskz2">
              <img src="@/assets/img/close.png" alt />
            </a>
          </div>
        </div>
        <!--3个选项-->
        <div id="tc">
          <a @click="tiaozhuan(2)">
            <div class="d_1">
              <img src="@/assets/img/icon4.png" alt="" />
            </div>
            <div class="d_2">
              <p>志愿者登录</p>
              <div>
                <span>什么是志愿者</span>
                <span>有哪些权利和义务</span>
              </div>
            </div>
          </a>
          <a v-show="this.$store.getters.getArea.cnname != '税收'" @click="tiaozhuan(3)">
            <div class="d_1">
              <img src="@/assets/img/icon5.png" alt="" />
            </div>
            <div class="d_2">
              <p>志愿队伍登录</p>
              <div>
                <span>志愿队伍注册、审核</span>
                <span>招募志愿者、管理项目</span>
              </div>
            </div>
          </a>
          <a @click="tiaozhuan(1)">
            <div class="d_1">
              <img src="@/assets/img/icon6.png" alt="" />
            </div>
            <div class="d_2">
              <p>管理部门登录</p>
              <span>管理部门登录</span>
            </div>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "hearder",
  data: function() {
    return {
      docsListFirst: [], //有子站的站点
      nositelist: [], //无子站的站点
      industrylist: [], //特殊站点，税务
      routeDefine: this.$route.params.define,
      userInfo: null,
      logInfo: "",
      cnname: "",
      //全局搜索
      searchtype: 1,
      searchname: "新闻文章",
      searchlist: [
        { type: 1, name: "新闻文章" },
        { type: 2, name: "志愿项目" },
        { type: 3, name: "志愿队伍" }
      ],
      searchtext: "" //输入框
    };
  },
  watch: {
    "$route.name"(to, from) {
      this.searchinit(to);
    }
  },
  beforeMount() {
    window.Vueh = this; //页眉vue实例挂载
    // this.routeDefine = this.$route.params.define;
    this.searchinit(this.$route.name);
    // this.getDocsList();
    window.loginOut = this.loginOut;
    window.toUserCenter = this.toUserCenter;
    this.getUserInfo();
  },
  mounted() {
    this.class();
  },
  methods: {
    /*登录弹窗样式兼容*/
    class() {
      let a = navigator.userAgent;
      /*ie10以下ie浏览器登录弹窗样式*/
      if (a.indexOf("MSIE 10.0") != -1 || a.indexOf("MSIE 9.0") != -1) {
        $("#tc").addClass("i9login_way");
        $("#tc_zhandian").addClass("i9");
        $("#tc_denglu").addClass("i9");
      } else {
        /*非ie10以下浏览器样式*/
        $("#tc").addClass("login_way");
      }
    },
    showsSite2() {
      if (
        this.$route.params.define == "beijing" &&
        window.location.host != "wuhan.yxybb.com"
      ) {
        this.common.toBjSite();
      } else {
        //  打开选择登录方式
        $(".docs2").addClass("active");
      }
    },
    closeMaskz2() {
      //关闭切换站点
      $(".docs2").removeClass("active");
    },
    tiaozhuan(e) {
      this.closeMaskz2();
      let type = e;
      this.$router.push({
        name: "login",
        params: { type }
      });
    },
    searchinit(to) {
      //初始化搜索栏
      let idx = 0;
      if (to == "project" || to == "projectInfo") {
        //志愿团体
        idx = 1;
      } else if (to == "group" || to == "groupInfo") {
        //志愿项目
        idx = 2;
      } else if (to != "news") {
        this.searchtext = "";
      }
      this.searchtype = idx + 1;
      this.searchname = this.searchlist[idx].name;
    },
    // getDocsList() {
    //   this.utilscommit.request("nvsi_listWebDocs", null, this.callbackLevel1); //切换站点
    // },
    // callbackLevel1(data) {
    //   //总站站点信息
    //   if (data && data.data) {
    //     let site = data.data;
    //     //this.docsListFirst = site.list;//有站点栏目
    //     this.docsListFirst = data.data.listremovechild; //省级站点
    //     this.nositelist = site.nositelist; //无站点栏目
    //     this.industrylist = site.industrylist; //特殊站点栏目
    //   }
    // },
    getUserInfo: function() {
      // 旧接口，已废弃
      // this.utilscommit.request("nvsi_getUserInfo", null, this.userInfoCheck);
      this.userInfo = this.$store.getters.getUser;
      if (this.$store.getters.getUser) {
        let userInfo = this.$store.getters.getUser;
        let loginstatus = window.sessionStorage.getItem("nvsi_loginstatus"); //登录状态 1=已登录
        if (userInfo.albp0076 != 1 && loginstatus && loginstatus == 1) {
          //不为全国性组织登录
          this.logInfo =
            '<span style="width: 45px;margin-left: 17px;">您好！</span>' +
            '<a href="javascript:void(0);" class="icon-link" onclick="toUserCenter()">' +
            userInfo.albp0052 +
            "</a>" +
            '<a href="javascript:void(0);" class="icon-link" style="width: 35px;" onclick="loginOut()">退出</a>';
          this.userInfo = userInfo;
          window.sessionStorage.setItem("nvsi_loginOutType", 1); //登录状态
          //查看全局用户信息
          //console.log('登录人的信息为:',this.userInfo)
          this.$store.commit("saveUser", this.userInfo);
        } else {
          this.loginOut();
        }
      }
    },
    // userInfoCheck: function(result) {
    //   if (result.data) {
    //     let userInfo = result.data;
    //     let loginstatus = window.sessionStorage.getItem("nvsi_loginstatus"); //登录状态 1=已登录
    //     if (userInfo.albp0076 != 1 && loginstatus && loginstatus == 1) {
    //       //不为全国性组织登录
    //       this.logInfo =
    //         '<span style="width: 45px;margin-left: 17px;">您好！</span>' +
    //         '<a href="javascript:void(0);" class="icon-link" onclick="toUserCenter()">' +
    //         userInfo.albp0052 +
    //         "</a>" +
    //         '<a href="javascript:void(0);" class="icon-link" style="width: 35px;" onclick="loginOut()">退出</a>';
    //       this.userInfo = userInfo;
    //       window.sessionStorage.setItem("nvsi_loginOutType", 1); //登录状态
    //       //查看全局用户信息
    //       //console.log('登录人的信息为:',this.userInfo)
    //       this.$store.commit("saveUser", this.userInfo);
    //     } else {
    //       this.loginOut();
    //     }
    //   }
    // },
    loginOut: function() {
      //   this.utilscommit.request("nvsi_loginOut", null, this.loginOutCheck);
      // },
      // loginOutCheck: function(result) {
      //   if (result && result.code == 0) {
      window.sessionStorage.removeItem("nvsi_loginstatus");
      this.$store.commit("saveUser", null);
      this.$store.commit("saveBasic", null);
      if (window.sessionStorage.getItem("nvsi_loginOutType")) {
        //点击退出按钮
        this.$router.push({
          name: "login",
          params: { define: this.$route.params.define, type: 2 }
        });
        window.sessionStorage.removeItem("nvsi_loginOutType");
      }
      this.logInfo = "";
      this.userInfo = null;
      // }
    },
    toUserCenter: function() {
      if (this.userInfo) {
        if (this.userInfo.albp0087 == "1") {
          this.$router.push({
            name: "usercenter",
            params: { define: this.$route.params.define }
          });
        } else {
          const path = this.common.getCookie("mgpath");
          if (path) {
            window.open(path);
          } else {
            this.loginOut();
          }
        }
      } else {
        this.$swal("登录信息已过期，是否重新登录？", {
          buttons: ["取消", "确定"]
        }).then(function(value) {
          if (value) {
            Vue.$router.push({
              name: "login",
              params: { define: Vue.$route.params.define, type: 2 }
            });
          } else {
            Vue.$router.go(0); //刷新页面
          }
        });
      }
    },
    /* showsSite() {
      //打开切换站点
      $(".docs").addClass("active");
    },
    closeMaskz() {
      //关闭切换站点
      $(".docs").removeClass("active");
    }, */
    toSearch() {
      //全局搜索
      if (this.searchtext) {
        let routename = this.$route.name;
        if (this.searchtype == 2) {
          //项目
          if (routename == "project") {
            //当前页面
            Vues.projectName = this.searchtext; //全局搜索
            Vues.getProjectList();
          } else {
            this.$router.push({
              name: "project",
              params: { define: this.routeDefine }
            });
          }
        } else if (this.searchtype == 3) {
          //队伍
          if (routename == "group") {
            //当前页面
            Vues.groupName = this.searchtext; //全局搜索
            Vues.getOrgList();
          } else {
            this.$router.push({
              name: "group",
              params: { define: this.routeDefine }
            });
          }
        } else {
          //新闻文章
          this.$router.push({
            name: "news",
            params: { define: this.routeDefine, type: 5, id: this.searchtext }
          });
        }
      } else {
        this.$swal("请输入搜索关键字", { buttons: "确定" });
      }
    },
    toVolandOrgReg(name) {
      //志愿者注册/志愿队伍注册跳转
      if (
        this.routeDefine == "beijing" &&
        window.location.host != "wuhan.yxybb.com"
      ) {
        this.common.toBjSite();
      } else {
        this.$router.push({
          name: name,
          params: { define: this.routeDefine }
        });
      }
    },
    getASite() {
      window.open(
        "http://chinavolunteer.mca.gov.cn/NVSI/LEAP/site/index.html#/home"
      );
    }
  }
};
</script>

<style>
/* @import "../../assets/css/base.css";
  @import "../../assets/css/main.css"; 
  @import "../../assets/fonts/UniveConBol.css";*/
.col .login-box span > a {
  color: #333 !important;
  font-weight: bold;
  line-height: 51px !important;
}
.col .login-box span > a:hover {
  color: red !important;
}
.col .login-box .a {
  color: #666 !important;
}
.red,
.col .login-box .a:hover {
  color: red !important;
}
.red:hover {
  cursor: pointer;
}
.top_title {
  /* 顶部logo标题样式 */
  font-size: 41px;
  font-weight: bold;
  letter-spacing: 7px;
  position: absolute;
  width: max-content;
  min-width: 18rem;
  left: 85px;
  top: -8px;
}
.top_title1 {
  font-size: 16px;
  font-weight: 600;
  letter-spacing: 0.4em;
  position: absolute;
  width: max-content;
  bottom: -30px;
  left: 0px;
  width: 65%;
}
/*   .category__item{
    display: flex;
    flex-direction: row;
    align-items: top
  } */

.category__item img {
  width: 22px;
  height: 14px;
  margin-top: -15px;
}
.h1fontsize {
  font-size: 36px;
}

.span_little {
  bottom: -30px;
  right: 11px;
  width: 35%;
}
.span_more {
  bottom: -30px;
  right: 11px;
  width: 51%;
}

/*ie浏览器i10以下样式 */
.i9 {
  top: 40% !important;
}
.i9login_way > a {
  display: inline-block;
  width: 240px;
  text-align: center;
  border: 1px solid #dcdcdc;
  box-sizing: border-box;
  padding: 15px;
}
.i9login_way > a:nth-child(3) {
  position: relative;
  top: -20px;
}
.i9login_way {
  margin-top: 30px;
}
.i9login_way > a:hover {
  cursor: pointer;
}
.i9login_way .d_1 {
  width: 70px;
  height: 60px;
  margin: auto;
}
.i9login_way .d_1 > img {
  width: 100%;
  height: 100%;
}
.i9login_way .d_2 > p {
  color: #000;
  font-weight: bold;
}
.i9login_way .d_2 span {
  width: 190px;
  color: #666;
  font-size: 12px;
}
/* ie10 ie11 非ie样式*/
.login_way {
  display: flex;
  justify-content: space-around;
  margin-top: 30px;
}
.login_way > a {
  width: 240px;
  text-align: center;
  border: 1px solid #dcdcdc;
  box-sizing: border-box;
  padding: 15px;
}
.login_way {
  margin-top: 30px;
}
.login_way > a:hover {
  cursor: pointer;
}
.login_way .d_1 {
  width: 70px;
  height: 60px;
  margin: auto;
}
.login_way .d_1 > img {
  width: 100%;
  height: 100%;
}
.login_way .d_2 > p {
  color: #000;
  font-weight: bold;
}
.login_way .d_2 span {
  width: 190px;
  color: #666;
  font-size: 12px;
}
</style>
