<template>
  <div id="information">
    <!--中间部分-->
    <div class="main bannerimg">
      <div class="mid">
        <ul class="row w">
          <li class="col">
            <div class="router">
              <span>当前位置：</span>
              <router-link tag="a" :to="{ name: 'home' }">首页</router-link>
              <router-link
                tag="a"
                :to="{ name: 'forgetpwd1', params: { type: 1 } }"
                >忘记密码</router-link
              >
            </div>
          </li>
        </ul>
        <!-- 主体 -->
        <div class="J-main J-auto">
          <div class="J-loading-box">
            <ul class="J-loading-box__ul">
              <li class="J-loading-box__li J-after-w90">
                <div class="J-loading-box__li_info J-active">
                  <span class="J-cicrl">✔</span>
                  <p class="J-cicrl_p">填写账号</p>
                </div>
              </li>
              <li class="J-loading-box__li">
                <div class="J-loading-box__li_info J-active">
                  <span class="J-cicrl">✔</span>
                  <p class="J-cicrl_p">身份验证</p>
                </div>
              </li>
              <li class="J-loading-box__li">
                <div class="J-loading-box__li_info J-active">
                  <span class="J-cicrl">✔</span>
                  <p class="J-cicrl_p">新密码</p>
                </div>
              </li>
              <div class="J-last-li J-active">
                <span class="J-cicrl">4</span>
                <p class="J-cicrl_p">完成</p>
              </div>
            </ul>
          </div>
          <div class="J-get">
            <img
              src="../../assets/img/forgetpwd/J-get.png"
              alt=""
              class="J-get_img"
            />
            <p class="J-get_p">
              找回密码成功！
              <span class="J-get_span" v-text="time"></span> 秒自动返回首页，去
              <router-link
                tag="a"
                href="javascript:void(0)"
                :to="{
                  name: 'home',
                  params: { define: routeDefine }
                }"
                >登录</router-link
              >
              吧~
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "information",
  data: function() {
    return {
      routeDefine: this.$route.params.define,
      time: 4 //时间
    };
  },
  mounted() {
    this.setTime();
  },
  methods: {
    setTime: function() {
      //设置超时
      if (this.time == 1) {
        this.$router.push({
          name: "home",
          params: { define: this.routeDefine }
        }); //固定总站地址
      } else {
        this.time--;
        let _this = this;
        setTimeout(function() {
          _this.setTime();
        }, 1000);
      }
    }
  }
};
</script>

<style>
@import "../../assets/css/mainpwd.css";
</style>
