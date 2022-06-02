<template>
  <div id="app">
    <!--页眉-->
    <header-body v-show="!(name === 'proShare') && !(name === 'groupShare')"></header-body>
    <!--导航栏-->
    <navigation-bar v-show="!(name === 'proShare') && !(name === 'groupShare')"></navigation-bar>
    <!-- 主体内容 -->
    <router-view />
    <rightTips />
    <!-- 页脚 -->
    <footer-body v-show="!(name === 'proShare') && !(name === 'groupShare')"></footer-body>
  </div>
</template>

<script>
const HeaderBody = () => import("@/components/header.vue"); //页眉
//const navigationBar =()=>import('@/components/navigationBar.vue');//导航栏
//const FooterBody =()=>import('@/components/footer.vue');//页脚

import navigationBar from "@/components/navigationBar1.vue"; //含 1 的是新版的导航，不含的是老版的导航
import FooterBody from "@/components/footer.vue";
import rightTips from "@/components/rightTips.vue";

export default {
  name: "App",
  components: {
    HeaderBody, //页眉
    navigationBar, //导航栏
    FooterBody, //页脚
    rightTips //网站右侧二维码展示
  },
  data: function() {
    return {
      routeDefine: this.$route.params.define,
      isRouterAlive: true,
      name: ""
    };
  },
  provide() {
    return {
      reload: this.reload
    };
  },
  beforeCreate() {
    window.Vue = this;
  },
  created() {
    this.clearCookies(); //清缓存
    this.getDefind();
    //获取布局
    // this.getLayoutBySite();
  },
  watch: {
    "$route.params.define"(to, from) {
      //路由参数变化
      if (to != this.routeDefine) {
        if (this.getRealDefind(to)) {
          this.routeDefine = to;
          this.getDefind();
        }
      }
    },
    $route(to, from) {
      this.name = to.name;
    }
  },
  methods: {
    getRealDefind(define) {
      let route_name = this.$route.name;
      let path = this.$route.path;
      if (route_name) {
        let setparams = this.$route.params;
        let hostList = this.common.siteList();
        let localHost = window.location.host;
        if (localHost) {
          localHost = localHost.replace("www.", "");
        }
        if (
          localHost != "wuhan.yxybb.com" &&
          localHost != "localhost:8003" &&
          localHost.substring(0, 7) != "192.168"
        ) {
          //不是测试环境以及本地环境
          hostList.forEach(element => {
            if (localHost == element.path && define != element.name) {
              //匹配相应域名，切换相关区域站点
              setparams.define = element.name;
              this.$router.push({ name: route_name, params: setparams });
              return false;
            } else if (define == element.name && localHost != element.path) {
              //匹配相应区域，切换相关域名
              window.location.href =
                "http://" + element.path + "/subsite" + path;
              return false;
            }
          });
        }
      }
      return true;
    },
    getDefind() {
      //获取当前区域信息
      var areaInfo = this.$store.getters.getArea; //this.common.areaInfo();
      if (!areaInfo.enname || areaInfo.enname != this.routeDefine) {
        /* this.utilscommit.request(
          "nvsi_listWebDocsInfo",
          { enname: this.routeDefine },
          this.areasBack
        ); */
        this.utilscommit.requestapi(
          "getSiteInfoFrontWeb",
          { enname: this.routeDefine },
          this.areasBack
        );
      } //头部信息
    },
    areasBack(result) {
      if (
        result &&
        result.data &&
        result.data.enname &&
        this.routeDefine == result.data.enname
      ) {
        let area = result.data;
        if (area.industrycode) area.areaid = "0"; //特殊站点查询总站
        this.$store.commit("saveArea", area);
        window.localStorage.setItem("subsite_areaInfo", JSON.stringify(area));
        VueB.getMenus(); //横向菜单栏
        Vuef.getdatafooter(); //底部菜单栏
        let routename = this.$route.name;
        if (
          routename == "home" ||
          routename == "group" ||
          routename == "project" ||
          routename == "orgreg" ||
          routename == "login"
        )
          Vues.getAreaInfo(); //首页
      }
    },
    reload() {
      //刷新页面
      this.isRouterAlive = false; //先关闭
      this.$nextTick(function() {
        this.isRouterAlive = true; //再打开
      });
    },
    clearCookies() {
      //清cookies
      if (!this.common.getCookie("clear_c")) {
        // this.utilscommit.requestOther(
        //   "SystemCheck?clearAll=" + new Date().getTime(),
        //   function(res) {
        //     Vue.common.addCookie("clear_c", new Date().getTime(), 1);
        //   }
        // );
      }
    },
    getLayoutBySite() {
      //根据站点信息查询布局
      this.utilscommit.requestapi(
        "getLayoutBySite",
        { sitename: this.routeDefine },
        this.siteLayoutBack
      );
    },
    siteLayoutBack(res) {
      if (res) {
        console.log(res);
      }
    }
  }
};
</script>

<style>
/*去掉百度地图水印的css*/
.BMap_cpyCtrl {
  display: none !important;
}
.anchorBL {
  display: none !important;
}
</style>
