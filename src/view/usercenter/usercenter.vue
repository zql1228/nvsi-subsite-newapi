<template>
  <div id="usercenter">
    <!--中间部分-->
    <div class="main bannerimg">
      <div class="mid">
        <ul class="row w">
          <li class="col">
            <div class="router">
              <span>当前位置：</span>
              <a href="javascript:void(0);">
                <router-link
                  tag="span"
                  :to="{ name: 'home', params: { define: routeDefine } }"
                  >首页</router-link
                >
              </a>
              <a href="javascript:void(0);" v-if="routename != 'userinfo'">
                <router-link
                  tag="span"
                  :to="{ name: 'usercenter', params: { define: routeDefine } }"
                  >用户中心</router-link
                >
              </a>
              <span v-text="metaTitle"></span>
            </div>
          </li>
        </ul>
        <ul class="row w">
          <li class="col v-t" style="width: 130px !important">
            <ul class="navbar" id="usermenu" style="background: #ffffff">
              <li>
                <em>用户中心<i>></i></em>
                <div>
                  <router-link
                    href="javascript:void(0);"
                    :class="{ active: routename == 'userinfo' }"
                    tag="a"
                    :to="{
                      name: 'usercenter',
                      params: { define: routeDefine }
                    }"
                    datatype="usercenter"
                    >我的首页</router-link
                  >
                  <router-link
                    href="javascript:void(0);"
                    :class="{
                      active:
                        routename == 'updatedata' ||
                        routename == 'updateiden' ||
                        routename == 'updateother' ||
                        routename == 'updatetamasha' ||
                        routename == 'updatepassword' ||
                        routename == 'updatestar'
                    }"
                    tag="a"
                    :to="{
                      name: 'updatedata',
                      params: { define: routeDefine }
                    }"
                    datatype="updatedata"
                    >修改资料</router-link
                  >
                  <router-link
                    href="javascript:void(0);"
                    v-if="
                      userinfo && userinfo.albp0063 == '1' && userinfo.albp0020
                    "
                    :class="{ active: routename == 'usercard' }"
                    tag="a"
                    :to="{ name: 'usercard', params: { define: routeDefine } }"
                    datatype="usercard"
                    >志愿者证</router-link
                  >
                  <!-- 我的信用 -->
                  <!-- <router-link
                    href="javascript:void(0);"
                    :class="{ active: routename == 'mycredit' }"
                    tag="a"
                    :to="{ name: 'mycredit', params: { define: routeDefine } }"
                    >我的信用</router-link
                  > -->
                  <!-- 站内信 -->
                  <!-- <router-link
                    href="javascript:void(0);"
                    :class="{ active: routename == 'message' }"
                    tag="a"
                    :to="{ name: 'message', params: { define: routeDefine } }"
                    >站内信</router-link
                  > -->
                  <!-- 我的好友 -->
                  <!-- <router-link
                    href="javascript:void(0);"
                    :class="{ active: routename == 'myfriends' }"
                    tag="a"
                    :to="{ name: 'myfriends', params: { define: routeDefine } }"
                    >我的好友</router-link
                  > -->
                  <!-- <router-link href="javascript:void(0);" :class="{active:routename=='myproving'}" tag="a" :to="{name:'myproving',params:{define:routeDefine}}">我的求证</router-link> -->
                  <!-- 动态评论 -->
                  <!-- <router-link
                    href="javascript:void(0);"
                    :class="{ active: routename == 'mycomment' }"
                    tag="a"
                    :to="{ name: 'mycomment', params: { define: routeDefine } }"
                    >动态评论</router-link
                  > -->
                  <!-- 我的评价 -->
                  <!-- <router-link
                    href="javascript:void(0);"
                    :class="{ active: routename == 'myevaluate' }"
                    tag="a"
                    :to="{
                      name: 'myevaluate',
                      params: { define: routeDefine }
                    }"
                    >我的评价</router-link
                  > -->
                  <!-- 投诉举报 -->
                  <!-- <router-link
                    href="javascript:void(0);"
                    :class="{ active: routename == 'myreport' }"
                    tag="a"
                    :to="{ name: 'myreport', params: { define: routeDefine } }"
                    >投诉举报</router-link
                  > -->
                  <!-- 我的学习 -->
                  <!-- <router-link
                    href="javascript:void(0);"
                    :class="{ active: routename == 'mystudy' }"
                    tag="a"
                    :to="{ name: 'mystudy', params: { define: routeDefine } }"
                    >我的学习</router-link
                  > -->
                  <!-- 我的表彰 -->
                  <!-- <router-link
                    href="javascript:void(0);"
                    :class="{ active: routename == 'mycommend' }"
                    tag="a"
                    :to="{ name: 'mycommend', params: { define: routeDefine } }"
                    >我的表彰</router-link
                  > -->
                  <!-- 我的兑换 -->
                  <!-- <router-link
                    href="javascript:void(0);"
                    :class="{ active: routename == 'myexchange' }"
                    tag="a"
                    :to="{
                      name: 'myexchange',
                      params: { define: routeDefine }
                    }"
                    >我的兑换</router-link
                  > -->
                  <router-link
                    href="javascript:void(0);"
                    :class="{ active: routename == 'servicelog' }"
                    tag="a"
                    :to="{
                      name: 'servicelog',
                      params: { define: routeDefine }
                    }"
                    datatype="servicelog"
                    >下载证明</router-link
                  >
                  <!-- 新版只开放湖北站点时先关闭“记录转移”功能,全国开放时再启用 -->
                  <!-- <router-link href="javascript:void(0);" :class="{ active: routename == 'mytransfer' }" tag="a" :to="{
                      name: 'mytransfer',
                      params: { define: routeDefine }
                    }" datatype="mytransfer">记录转移</router-link> -->
                  <!--  <router-link href="javascript:void(0);" :class="{active:routename=='starapply'}" tag="a" :to="{name:'starapply',params:{define:routeDefine}}">星级申请</router-link> -->
                </div>
              </li>
              <li>
                <em>志愿项目<i>></i></em>
                <div>
                  <router-link
                    href="javascript:void(0);"
                    :class="{ active: routename == 'myproject' }"
                    tag="a"
                    :to="{ name: 'myproject', params: { define: routeDefine } }"
                    datatype="myproject"
                    >我的项目</router-link
                  >
                  <!-- <router-link href="javascript:void(0);" :class="{active:routename=='myschedule'}" tag="a" :to="{name:'myschedule',params:{define:routeDefine}}">我的排班</router-link> -->
                  <router-link
                    href="javascript:void(0);"
                    :class="{ active: routename == 'myservicetime' }"
                    tag="a"
                    :to="{
                      name: 'myservicetime',
                      params: { define: routeDefine }
                    }"
                    datatype="myservicetime"
                    >服务时长</router-link
                  >
                </div>
              </li>
              <li>
                <em>志愿队伍<i>></i></em>
                <div>
                  <router-link
                    href="javascript:void(0);"
                    :class="{ active: routename == 'myorg' }"
                    tag="a"
                    :to="{ name: 'myorg', params: { define: routeDefine } }"
                    datatype="myorg"
                    >我的队伍</router-link
                  >
                  <!-- <a id="myhistoryorg" href="myhistoryorg.html">历史队伍</a> -->
                </div>
              </li>
              <!-- 志愿家庭 -->
              <!-- <li>
                <em>志愿家庭<i>></i></em>
                <div>
                  <router-link
                    href="javascript:void(0);"
                    :class="{ active: routename == 'myfamily' }"
                    tag="a"
                    :to="{ name: 'myfamily', params: { define: routeDefine } }"
                    >我的家庭</router-link
                  >
                </div>
              </li> -->
            </ul>
          </li>
          <router-view ref="child" />
        </ul>
      </div>
    </div>
    <!-- 完善信息 -->
    <complete-tip
      :basicInfo="basicInfo"
      :showtype="showtype"
      :albp0010="userinfo.albp0010"
    ></complete-tip>
  </div>
</template>

<script>
const CompleteTip = () => import("@/view/usercenter/completetip.vue"); //弹出层

export default {
  name: "usercenter",
  components: {
    CompleteTip
  },
  data() {
    return {
      routeDefine: this.$route.params.define,
      routename: this.$route.name,
      metaTitle: this.$route.meta.titlename,
      userinfo: this.$store.getters.getUser,
      basicInfo: {},
      showtype: ""
    };
  },
  created() {
    window.Vuec = this;
    this.checkUser();
  },
  mounted() {
    this.emClick();
  },
  methods: {
    checkUser() {
      if (
        !this.userinfo ||
        !this.userinfo.id ||
        this.userinfo.isdelete == "1"
      ) {
        // albp0087 用户类型 1->志愿者 2->队伍
        let flag =
          this.routename != "userdata" ||
          (this.routename == "userdata" &&
            (this.userinfo.albp0087 != "1" || this.userinfo.albp0087 != "2"));
        if (flag) {
          this.$utilroutes.toLogin();
        }
      } else {
        // 新api
        this.utilscommit.requestapi(
          "getVolunteerInfoFortisWeb",
          { cardno: this.userinfo.albp0005 },
          this.basicInfoCheck
        );
      }
    },
    basicInfoCheck(result) {
      if (result.code == 0 && result.data) {
        this.basicInfo = result.data;
        this.$store.commit("saveBasic", this.basicInfo);
        this.showTip(); //是否完善资料
      } else {
        Vueh.loginOut(); //触发页眉的退出事件
      }
    },
    emClick: function() {
      $(".navbar li em").click(function() {
        $(this)
          .parent()
          .toggleClass("active")
          .siblings()
          .removeClass("active");
      });
      $(".navbar div a.active")
        .parent()
        .parent()
        .toggleClass("active")
        .siblings()
        .removeClass("active");
    },
    showTip() {
      //是否完善资料
      let showtype = this.common.getComShowtype(
        this.userinfo.albp0087,
        this.basicInfo,
        this.userinfo.albp0063, // 实名状态
        this.userinfo.albp0010 // 注册手机号
      ); //获取弹窗展示
      //showtpe   3-未实名   1-基本信息不完善    2-非本站志愿者   4-区域未到区县级
      if (this.$route.name == "updatedata") {
        //修改资料
        if (showtype != 2) {
          this.showtype = 0;
        } else {
          this.showtype = showtype;
        }
        if (window.Vues) {
          this.$nextTick(function() {
            window.Vues.getBasicInfo();
          });
        }
      } else if (this.$route.name == "updateiden") {
        //身份信息
        if (showtype != 3) {
          this.showtype = showtype;
        } else if (this.userinfo.albp0063 == "0" || !this.userinfo.albp0063) {
          this.showtype = 0;
        }
      } else {
        if (
          //   this.$route.name == "userinfo" ||
          //   this.$route.name == "updateiden" ||
          this.$route.name == "updateother" ||
          this.$route.name == "updatetamasha" ||
          this.$route.name == "updatepassword" ||
          this.$route.name == "updatestar"
        ) {
          if (showtype != 3) {
            // 更新志愿者基本信息
            this.$nextTick(() => {
              this.basicInfo = this.$store.getters.getBasic;
              this.userInfo = this.$store.getters.getUser;
              this.utilscommit.requestH5api(
                "getPersonInfor",
                { cardno: this.userInfo.albp0005 },
                res => {
                  if (res.code == 0 && res.data) {
                    this.basicInfo = {
                      ...this.basicInfo,
                      projectNum: res.data.project,
                      teamNum: res.data.team,
                      sort: res.data.sort
                    };
                  }
                }
              );
              // 获取志愿者头像
              if (!this.basicInfo.albp0027) {
                return false;
              }
              this.utilscommit.requestapi(
                "getVolunteerPhotoOnSecret",
                { cardno: this.userInfo.albp0005 },
                res => {
                  if (res.code == 0 && res.data.photourl) {
                    this.basicInfo = {
                      ...this.basicInfo,
                      photourl: res.data.photourl
                    };
                  }
                }
              );
            });
            return (this.showtype = 0);
          }
        }
        this.showtype = showtype;
      }
    },
    closeTip() {
      this.showtype = 0;
    },
    getUser() {
      //更新用户信息
      this.utilscommit.requestapi(
        "getVolunteerInfoFortisWeb",
        { cardno: this.userinfo.albp0005 },
        this.getUserBack
      );
    },
    getUserBack: function(result) {
      //用户信息返回
      if (result && result.data) {
        this.basicInfo = result.data;
        this.$store.commit("saveBasic", this.basicInfo);
        this.checkUser();
      } else {
        this.$utilroutes.toLogin();
      }
    }
  },
  watch: {
    $route: function(to, from) {
      //监听路由是否变化
      this.routename = to.name;
      this.metaTitle = to.meta.titlename;
      this.showTip(); //是否完善资料
      if (
        !$(`a[datatype=${to.name}]`)
          .parent()
          .parent()
          .hasClass("active")
      ) {
        $(`a[datatype=${to.name}]`)
          .parent()
          .parent()
          .children("em")
          .click();
      }
    }
  }
};
</script>

<style scoped>
.user-table td {
  padding: 0 10px;
  line-height: 25px;
}
</style>
