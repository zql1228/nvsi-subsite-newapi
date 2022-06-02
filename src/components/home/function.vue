<template>
  <!-- 功能按钮组件 -->
  <div class="center">
    <div class="row w">
      <div class="col v-m" style="width:25%;">
        <p>欢迎进入</p>
        <h2 v-show="!areaName">北京志愿</h2>
        <h2 v-show="areaName" v-text="areaName + '志愿'"></h2>
      </div>
      <div class="col v-m">
        <div class="row w">
          <div class="col v-m" style="width:25%;padding-right:20px;">
            <h3 class="primary">求助者</h3>
          </div>
          <div class="col v-m" style="font-size:0;">
            <a
              href="javascript:void(0);"
              @click="toOtherPage('volreg')"
              style="width:100%;background:#2BBAD9;"
              >注册成为志愿者</a
            >
            <a
              href="javascript:void(0);"
              @click="toOtherPage('orgreg', 1)"
              style="width:100%;background:#8061CB;"
              >注册成为志愿服务队伍</a
            >
          </div>
        </div>
        <div class="row w">
          <div class="col v-m" style="width:25%;padding-right:20px;">
            <h3 class="danger">志愿者</h3>
          </div>
          <div class="col v-m" style="font-size:0;">
            <a
              href="javascript:void(0);"
              @click="toOtherPage('volreg')"
              style="width:19%;background:#4C75D1;margin-right:1%;"
              >实名注册</a
            >
            <a
              href="javascript:void(0);"
              @click="toOther('myproject', '记录时长')"
              style="width:30%;background:#44AC45;"
              >记录时长</a
            >
            <a
              href="javascript:void(0);"
              @click="toOther('usercard', '下载志愿服务证书')"
              style="width:49%;background:#E29133;margin-left:1%;"
              >下载志愿服务记录证明</a
            >
            <a
              href="javascript:void(0);"
              @click="toOtherPage('infosearch')"
              style="width:48%;background:#2BBAD9;margin-right:1%;"
              >志愿者、记录证明查询</a
            >
            <a
              href="javascript:void(0);"
              @click="toOtherPage('project')"
              style="width:25%;background:#328DDB;"
              >志愿项目</a
            >
            <a
              href="javascript:void(0);"
              @click="toOtherPage('group', 1)"
              style="width:25%;background:#A2BA34;margin-left:1%;"
              >志愿队伍</a
            >
          </div>
        </div>
        <div class="row w">
          <div class="col v-m" style="width:25%;padding-right:20px;">
            <h3 class="info">志愿队伍</h3>
          </div>
          <div class="col v-m" style="font-size:0;">
            <a
              href="javascript:void(0);"
              @click="toOtherPage('orgreg', 1)"
              style="width:19%;background:#A2BA34;margin-right:1%;"
              >队伍注册</a
            >
            <a
              href="javascript:void(0);"
              @click="toOther(null, '评价志愿者')"
              style="width:45%;background:#8061CB;"
              >评价志愿者</a
            >
            <a
              href="javascript:void(0);"
              @click="toOther(null, '招募志愿者')"
              style="width:34%;background:#13A9A0;margin-left:1%;"
              >招募志愿者</a
            >
            <a
              href="javascript:void(0);"
              @click="toOther(null, '发布志愿项目')"
              style="width:100%;background:#E29133;"
              >发布志愿服务项目</a
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      areaid: "",
      areaName: "",
      routeDefine: this.$route.params.define
    };
  },
  mounted() {
    window.Vues = this;
    this.getAreaInfo();
    //用户信息
    this.userInfo = this.$store.getters.getUser;
  },
  methods: {
    getAreaInfo: function() {
      var areaInfo = this.$store.getters.getArea;
      if (areaInfo && areaInfo.enname && areaInfo.enname == this.routeDefine) {
        this.areaid = areaInfo.areaid;
        this.areaName = areaInfo.cnname;
      }
    },
    toOtherPage(name, type) {
      //页面跳转  name-跳转的路由名称   type-有值时税收站点无法跳转
      if (
        this.routeDefine == "beijing" &&
        window.location.host != "wuhan.yxybb.com"
      ) {
        this.common.toBjSite();
      } else if (type == 1 && this.$store.getters.getArea.industrycode) {
        //特殊站点
        this.$swal("暂未开放", { buttons: "确定" });
      } else {
        window.open(
          this.$router.resolve({
            name: name,
            params: { define: this.routeDefine }
          }).href,
          "_blank"
        );
      }
    },
    toOther(name, value) {
      //页面跳转  name-跳转的路由名称
      if (
        this.routeDefine == "beijing" &&
        window.location.host != "wuhan.yxybb.com"
      ) {
        this.common.toBjSite();
      } else if (!this.userInfo || (this.userInfo && !this.userInfo.id)) {
        this.$swal("未登录不能" + value + "，是否前去登录？", {
          buttons: ["取消", "确定"]
        }).then(function(value) {
          if (value) {
            Vues.$router.push({
              name: "login",
              params: { define: Vues.routeDefine, type: 2 }
            });
          }
        });
      } else if (name) {
        if (this.userInfo.albp0087 == "1") {
          //志愿者
          window.open(
            this.$router.resolve({
              name: name,
              params: { define: this.routeDefine }
            }).href
          );
        } else {
          this.$swal("您不是志愿者，无法" + value, { buttons: "确定" });
        }
      } else {
        //进入团体工作台
        if (this.userInfo.albp0087 == "1") {
          //志愿者
          this.$swal("您不是团体用户，无法" + value, { buttons: "确定" });
        } else {
          const path = this.common.getCookie("mgpath");
          if (path) window.open(path);
        }
      }
    }
  }
};
</script>

<style></style>
