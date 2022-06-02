<template>
  <!-- 登录按钮模块组件 -->
  <div>
    <div
      class="box row w"
      style="height:80px"
      v-for="loginItem in itemInfoLogin"
      :key="loginItem.loginType"
      @click="toLogin(loginItem.loginType)"
    >
      <div class="col v-m">
        <img
          :src="require('@/assets/img/' + loginItem.url)"
          alt
          style="width:60px;margin:0 5px;"
        />
      </div>
      <div class="col v-m">
        <h2 v-text="loginItem.name"></h2>
        <p v-text="loginItem.info"></p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      itemInfoLogin: [
        {
          url: "icon21.png",
          name: "志愿者登录",
          info: "什么是志愿者 有哪些权利和义务",
          loginType: 2
        },
        {
          url: "icon22.png",
          name: "志愿队伍登录",
          info: "志愿队伍注册、审核 招募志愿者、管理项目",
          loginType: 3
        },
        {
          url: "icon26.png",
          name: "管理部门登录",
          info: "管理部门登录",
          loginType: 1
        }
      ]
    };
  },
  methods: {
    toLogin: function(type) {
      if (
        this.routeDefine == "beijing" &&
        window.location.host != "wuhan.yxybb.com"
      ) {
        this.common.toBjSite();
      } else {
        //志愿者说明--跳转到使用指南   1=管理部门登录 ，2=志愿者，3=队伍
        window.open(
          this.$router.resolve({
            name: "login",
            params: { define: this.routeDefine, type: type }
          }).href,
          "_blank"
        );
      }
    }
  }
};
</script>

<style></style>
