<template>
  <div>
    <!-- 仅作为社工一体化平台跳转，获取登录信息的重定向页面 和  老网站跳转，获取登录信息的重定向页面-->
  </div>
</template>

<script>
export default {
  data() {
    return {
      userinfo: {}
    };
  },
  async mounted() {
    // if (this.$route.query && this.$route.query.token) {//社工一体化平台跳转
    //   let token = this.$route.query.token;
    //   this.utilscommit.requestApi("FotisNoLogin", token, this.Back);
    // } else
    if (this.$route.query && this.$route.query.userinfo) {
      //如果地址栏存在userinfo参数 说明是从老网站跳转过来的
      this.userinfo = JSON.parse(
        this.utilscommit.getSM4().decrypt(this.$route.query.userinfo)
      );
      window.sessionStorage.setItem("nvsi_loginstatus", 1);
      this.$store.commit("saveUser", this.userinfo);
      let { data: res } = await this.utilscommit.asyncReq(
        "getVolunteerInfoOnSecret",
        {
          cardno: this.userinfo.albp0005
        }
      );
      if (res.code == 0 && res.data) {
        this.$store.commit("saveBasic", res.data);
      }
      // setTimeout(() => {
      this.$router.replace({
        name: "usercenter",
        params: { define: "hubei" }
      });
      // }, 2000);
    }
  },
  methods: {
    Back(res) {
      if (res.code == 0) {
        window.sessionStorage.setItem("nvsi_loginstatus", 1);
        this.$store.commit("saveUser", res.data);
        Vueh.getUserInfo(); //打开页眉中的用户信息
        let hostList = this.common.siteList();
        let localHost = window.location.host;
        if (localHost) {
          localHost = localHost.replace("www.", "");
        }
        //不是测试环境以及本地环境
        hostList.forEach(element => {
          if (res.data.sitename == element.name) {
            //匹配相应区域，切换相关域名
            if (res.data.albp0028 && res.data.albp0020) {
              //有服务区域或居住区域
              window.location.replace(
                "http://" +
                  element.path +
                  "/subsite/" +
                  res.data.sitename +
                  "/usercenter"
              );
            } else {
              //无服务区域和居住区域
              window.location.replace(
                "http://" +
                  element.path +
                  "/subsite/" +
                  res.data.sitename +
                  "/updatedata"
              );
            }
          }
        });
      } else {
        this.$router.push({
          name: "home",
          params: { define: this.$route.params.define }
        });
      }
    }
  }
};
</script>
