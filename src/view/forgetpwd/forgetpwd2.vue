<template>
  <div id="forgetpwd2">
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
        <!-- 主体内容 -->
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
                  <span class="J-cicrl">2</span>
                  <p class="J-cicrl_p">身份验证</p>
                </div>
              </li>
              <li class="J-loading-box__li">
                <div class="J-loading-box__li_info">
                  <span class="J-cicrl">3</span>
                  <p class="J-cicrl_p">新密码</p>
                </div>
              </li>
              <div class="J-last-li">
                <span class="J-cicrl">4</span>
                <p class="J-cicrl_p">完成</p>
              </div>
            </ul>
          </div>
          <div class="J-check-ways">
            <ul class="J-check-ways__ul J-pb-43">
              <!-- 邮箱验证 -->
              <li
                class="J-check-ways__li"
                v-if="forget_email"
                @click="getclick('1')"
              >
                <div class="J-check-ways__li_info">
                  <img
                    class="J-left-img"
                    src="../../assets/img/forgetpwd/J-email.png"
                    alt=""
                  />
                  <div class="J-check-send">
                    <i class="J-check-send_i">邮箱验证</i>
                    <p class="J-check-send_p">
                      发送验证码至<span class="J-check-send_span">{{
                        forget_email | emailDes
                      }}</span
                      >的邮箱
                    </p>
                  </div>
                  <a
                    ><img
                      src="../../assets/img/forgetpwd/J-open.png"
                      alt=""
                      class="J-check-send_img"
                      style="cursor: pointer"
                  /></a>
                </div>
              </li>
              <!-- 短信验证 -->
              <!-- <li class="J-check-ways__li" v-if="forget_phone" @click="getclick('2')">
                <div class="J-check-ways__li_info">
                  <img class="J-left-img" src="../../assets/img/forgetpwd/J-handchick.png" alt="">
                  <div class="J-check-send">
                    <i class="J-check-send_i">短信验证</i>
                    <p class="J-check-send_p">发送验证码至<span class="J-check-send_span" v-text="forget_phone"></span>的的手机号进行短信验证
                    </p>
                  </div>
                  <a><img src="../../assets/img/forgetpwd/J-open.png" alt="" class="J-check-send_img"  style="cursor: pointer;"></a>
                </div>
              </li> -->
              <!-- 申述 -->
              <li class="J-check-ways__li" v-show="tabType == 1">
                <div class="J-check-ways__li_info">
                  <img
                    class="J-left-img"
                    src="../../assets/img/forgetpwd/J-none.png"
                    alt=""
                  />
                  <div class="J-check-send">
                    <i class="J-check-send_i">以上都不能用</i>
                    <p class="J-check-send_p">
                      您需要填写真实、详尽的账号资料来申诉
                    </p>
                  </div>
                  <router-link
                    :to="{
                      name: 'findpwd',
                      params: { define: routeDefine }
                    }"
                    class="J-help"
                    >申诉</router-link
                  >
                </div>
              </li>

              <li
                class="J-check-ways__li"
                v-show="tabType == 2 && !forget_email"
              >
                <div class="J-check-ways__li_info">
                  <img
                    class="J-left-img"
                    src="../../assets/img/forgetpwd/J-none.png"
                    alt=""
                  />
                  <div class="J-check-send">
                    <p class="J-check-send_p" style="margin: 0; width: 476px">
                      由于您队伍的手机号及邮箱信息不全，目前无法进行密码修改请联系您队伍所在地的民政部门，完善手机号及邮箱信息后，再进行密码修改。
                    </p>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "forgetpwd2",
  data() {
    return {
      routeDefine: this.$route.params.define,
      forget_email: "", //邮箱
      forget_phone: "", //手机号码
      tabType: this.$route.params.tabtype
    };
  },
  created() {
    this.getdata();
  },
  methods: {
    // 获取用户邮箱
    getdata() {
      if (!sessionStorage.getItem("username")) {
        this.$swal("您还未填写用户名？", { button: "确定" }).then(result => {
          this.$router.push({
            name: "forgetpwd1",
            params: {
              define: this.routeDefine,
              type: this.$route.params.tabtype
            }
          });
        });
      }

      // 获取志愿者/队伍邮箱
      let params = {
        albp0052: sessionStorage.getItem("username"),
        albp0087: 1
      };
      if (sessionStorage.getItem("areaid")) {
        params.areaid = sessionStorage.getItem("areaid").substring(0, 2);
        params.albp0087 = 2;
      }
      console.log(params);
      this.utilscommit.requestapi(
        "getVolEmailByUserFlag",
        params,
        this.userinfoBack
      );
    },
    // 获取用户邮箱返回结果
    userinfoBack({ code, data }) {
      if (code == 0) {
        this.forget_email = data.albp0081 || data.albe0049;
        this.forget_phone = data.showphone;
      } else {
        this.$swal("该账号未绑定邮箱", { buttons: "确定" }).then(value => {
          sessionStorage.removeItem("username");
          this.$router.push({
            name: "forgetpwd1",
            params: {
              define: this.routeDefine,
              type: this.$route.params.tabtype
            }
          });
        });
      }
    },
    // 选择验证方式
    getclick(id) {
      this.$router.push({
        name: "forgetpwd_check",
        params: { id: id, type: this.tabType, define: this.routeDefine }
      });
    }
  }
};
</script>

<style scoped>
@import "../../assets/css/mainpwd.css";
</style>
