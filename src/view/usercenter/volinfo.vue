<template>
  <div id="volinfo">
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
              <a href="javascript:void(0);">志愿者</a>
            </div>
          </li>
        </ul>
        <div class="row w avatar" style="padding-left: 0">
          <div class="col v-t">
            <img :src="common.changeImgsrc(volInfo.photo)" @error="imgError" alt="" />
          </div>
          <div class="col v-t">
            <p class="avatar-tit mb-20">
              <em style="color: #333">{{ volInfo.albp0003 }}</em>
              <span class="button button-small" style="
                  color: #fff;
                  border-radius: 20px;
                  width: auto;
                  height: 24px;
                  line-height: 24px;
                  margin-left: 10px;
                  padding: 0 10px;
                  font-size: 12px;
                ">实名志愿者</span>
            </p>
            <ul class="grid">
              <li class="grid-item g-8">
                <i>服务星级：</i>
                <span>{{ star }}</span>
              </li>
              <li class="grid-item g-16">
                <i>区域：</i>
                <span>{{ volInfo.albp0025 }}</span>
              </li>
              <li class="grid-item g-8">
                <i>服务时长：</i>
                <span>{{ volInfo.albp0089 || "0.0" }}</span><span>小时</span>
              </li>
              <li class="grid-item g-8">
                <i>注册日期：</i>
                <span>{{ volInfo.albp0034 | ellipsisNos(10) }}</span>
              </li>
              <li class="grid-item g-8">
                <i>排名：</i>
                <span>999+</span>
              </li>
              <li class="grid-item g-8">
                <i>积分：</i>
                <span>0</span>
              </li>
              <li class="grid-item g-16">
                <i>服务评价：</i>
                <span>守时程度：5.0 服务态度：5.0 专业水平：5.0</span>
              </li>
            </ul>
          </div>
        </div>
        <div class="tabbar row w" style="margin-top: 20px">
          <div class="col v-t">
            <span class="active">特长和服务经历</span>
            <span>加入的项目</span>
            <span>加入的团体</span>
          </div>
          <!-- <div class="col v-m t-r">
            <a
              href="javascript:void(0);"
              @click="sendMessage(volInfo.albp0029, volInfo.albp0031)"
              class="button button-normal"
              >给他发站内信</a
            >
          </div> -->
        </div>
        <!-- 特长和服务经历 -->
        <div class="tabbar-down" style="margin: 10px; line-height: 200%">
          <p style="color: #008d03"><span>特长：</span></p>
          <span>{{ volInfo.albp0039 || "无" }}</span>
          <p style="color: #008d03"><span>服务经历：</span></p>
          <span>{{ volInfo.albp0040 || "无" }}</span>
        </div>
        <!-- 加入的项目 -->
        <div class="tabbar-down" style="display: none">
          <ProjectList v-if="nowIndex == 1"></ProjectList>
        </div>
        <!-- 加入的团体 -->
        <div class="tabbar-down" style="display: none">
          <GroupList v-if="nowIndex == 2"></GroupList>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const ProjectList = () => import("@/components/VolInfo/ProjectList.vue"); // 项目列表
const GroupList = () => import("@/components/VolInfo/GroupList.vue"); // 队伍列表
import avatar from "../../assets/img/mruser.png";

export default {
  name: "volinfo",
  components: {
    ProjectList,
    GroupList
  },
  data() {
    return {
      routeDefine: this.$route.params.define,
      userInfo: {}, // 当前登录志愿者信息
      albp0005: "", // 当前查询志愿者证件号
      albp0020: "", // 当前查询志愿者服务区域（不一定是当前服务区域）
      volInfo: {}, // 当前查询志愿者信息
      nowIndex: ""
    };
  },
  created() {
    window.Vues = this; //主体vue实例挂载
    this.getUserInfo();
    this.albp0005 = this.$route.params.data1;
    this.albp0020 = this.$route.params.data2;
    this.getVolInfo();
  },
  mounted() {
    this.setData();
  },
  computed: {
    star: function() {
      if (
        !this.volInfo.albp0089 ||
        (this.volInfo.albp0089 && this.volInfo.albp0089 < 100)
      ) {
        return "暂无星级";
      } else if (this.volInfo.albp0089 >= 100 && this.volInfo.albp0089 < 300) {
        return "1星";
      } else if (this.volInfo.albp0089 >= 300 && this.volInfo.albp0089 < 600) {
        return "2星";
      } else if (this.volInfo.albp0089 >= 600 && this.volInfo.albp0089 < 1000) {
        return "3星";
      } else if (this.volInfo.albp0089 >= 1000) {
        return "4星";
      }
    }
  },
  methods: {
    // 获取当前登录用户信息
    getUserInfo() {
      if (!this.$store.getters.getUser) {
        return false;
      }
      this.utilscommit.requestapi(
        "getVolunteerInfoFortisWeb",
        {
          cardno: this.$store.getters.getUser.albp0005
        },
        this.userInfoCheck
      );
    },
    // 获取当前登录用户信息回调
    userInfoCheck(result) {
      if (result.code == 0 && result.data) this.userInfo = result.data;
    },
    // tab点击事件
    setData() {
      $(".tabbar span").each(function(idx, el) {
        $(el).click(function() {
          Vues.nowIndex = idx;
          $(this)
            .addClass("active")
            .siblings()
            .removeClass("active");
          $(".tabbar-down")
            .eq(idx)
            .show()
            .siblings(".tabbar-down")
            .hide();
        });
      });
    },
    // 获取志愿者基本资料
    async getVolInfo() {
      let params = {
        cardno: this.albp0005
      };
      let { data: res } = await this.utilscommit.asyncReq(
        "getVolunteerInfoFortisWeb",
        params
      );
      if (res.code == 0 && res.data) {
        this.volInfo = res.data;
        this.getVolAlbp0039();
        this.getVolPhoto();
      }
    },
    // 查询志愿者特长
    async getVolAlbp0039() {
      let params = {
        tableName: "nvsi_albp0039",
        codeid: this.volInfo.albp0039
      };
      let { data: res } = await this.utilscommit.asyncReqH5(
        "getValueFromCodeId",
        params
      );
      if (res.code == 0 && res.data) {
        this.volInfo.albp0039 = res.data.value;
      }
    },
    // 获取志愿者头像
    async getVolPhoto() {
      let { data: res } = await this.utilscommit.asyncReq(
        "getVolunteerPhotoOnSecret",
        {
          cardno: this.albp0005
        }
      );
      if (res.code == 0 && res.data) {
        this.$set(this.volInfo, "photo", res.data.photourl);
      }
    },
    // 发站内信 -> 跳转个人中心发站内信
    sendMessage(acceptId, userid) {
      if (this.userInfo) {
        if (this.userInfo.albp0087 == "1") {
          this.common.addCookie("msg", 2, 0.2);
          this.$router.push({
            name: "message",
            params: {
              define: this.routeDefine,
              data1: acceptId,
              data2: userid
            }
          });
        } else {
          const path = this.common.getCookie("mgpath");
          if (path) {
            window.open(path);
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
                Vueh.loginOut();
                Vue.$router.go(0); //刷新页面
              }
            });
          }
        }
      } else {
        this.$router.push({
          name: "login",
          params: { define: this.routeDefine, type: 2 }
        });
      }
    },
    // 图片错误时间
    imgError(el) {
      el.target.src = avatar;
    }
  }
};
</script>

<style>
.table-list th {
  text-align: left;
}
</style>
