<template>
  <li class="col v-t white">
    <div class="row w avatar">
      <div class="col v-t">
        <img
          v-if="basicInfo && basicInfo.photourl"
          :src="basicInfo.photourl"
          @error="imgError"
          alt=""
        />
        <img v-else src="../../assets/img/mruser.png" alt="" />
      </div>
      <div class="col v-t">
        <p class="avatar-tit">
          欢迎回来，<em class="name_color" v-html="realName"></em>
        </p>
        <p>
          <router-link
            href="javascript:void(0);"
            class="button button-line"
            tag="a"
            :to="{ name: 'updatedata', params: { define: routeDefine } }"
            >修改资料</router-link
          >
        </p>
        <ul class="grid" style="margin-top: 20px">
          <li class="grid-item g-12">
            <i>注册日期：</i>
            <span v-show="userInfo.albp0034">{{
              userInfo.albp0034 | ellipsisNos(10)
            }}</span>
            <a href="javascript:void(0);" class="time_button" @click="syncTime"
              >同步注册时间</a
            >
          </li>
          <!-- <li class="grid-item g-12">
            <i>最近登录时间：</i>
            <span v-show="userInfo.albp0054">{{
              userInfo.albp0054 | ellipsisNos(19)
            }}</span>
          </li> -->
          <li class="grid-item g-12">
            <i>登录IP：</i>
            <span v-text="ip"></span>
          </li>
        </ul>
      </div>
      <div
        class="col v-t t-c"
        style="width: 220px"
        v-if="$store.getters.getArea.cnname == '江苏'"
      >
        <img
          style="width: 119px; height: 115px"
          src="@/assets/img/js_erwei.png"
          alt=""
        />
        <p class="pt-10">扫码安装“江苏政务服务”APP</p>
      </div>
    </div>
    <div style="padding: 20px">
      <ul class="stats">
        <li style="width: 30%">
          <img src="../../assets/img/user1.png" alt="" /><span
            ><a href="javascript:void(0);" @click="toServiceTime"
              ><b><em v-text="addZero(basicInfo.albp0089)"></em></b></a
            ><i>总时长（小时）</i></span
          >
        </li>
        <li style="width: 24%">
          <img src="../../assets/img/user2.png" alt="" /><span>
            <b>{{ basicInfo.sort || "999+" }}</b
            ><i>当前站点排名</i></span
          >
        </li>
        <li style="width: 24%">
          <img src="../../assets/img/user3.png" alt="" /><span
            ><volstar
              style="line-height: 17px; margin-top: 13px"
              :score="basicInfo.albp0026"
              :starOn="starOn"
              :starOff="starOff"
            ></volstar
            ><i style="margin-top: 3px">星级志愿者</i></span
          >
        </li>
        <li style="width: 22%">
          <img src="../../assets/img/user4.png" alt="" /><span
            ><b>0</b><i>积分</i></span
          >
        </li>
      </ul>
      <ul class="stats">
        <li style="width: 30%">
          <img src="../../assets/img/user5.png" alt="" /><span
            ><a @click="toOrgList" href="javascript:void(0);"
              ><b class="danger"
                ><em>{{ basicInfo.teamNum || 0 }}</em></b
              ></a
            ><i>加入志愿团体（个）</i></span
          >
        </li>
        <li style="width: 24%">
          <img src="../../assets/img/user6.png" alt="" /><span
            ><a @click="toProjectList" href="javascript:void(0);"
              ><b class="danger"><em></em>{{ basicInfo.projectNum || 0 }}</b></a
            ><i>参与志愿项目（个）</i></span
          >
        </li>
        <li style="width: 24%">
          <img src="../../assets/img/user7.png" alt="" /><span
            ><b class="danger">{{ basicInfo.pxsum || "0.00" }}</b
            ><i>培训时长（小时）</i></span
          >
        </li>
        <li style="width: 22%">
          <img src="../../assets/img/user8.png" alt="" /><span
            ><b v-text="basicInfo.bzcount || 0"></b><i>表彰（次）</i></span
          >
        </li>
      </ul>
      <!-- <ul class="stats">
        <li style="width: 30%">
          <img src="../../assets/img/user9.png" alt="" /><span
            ><a @click="toMessageList" href="javascript:void(0);"
              ><b class="primary"
                ><em v-text="basicInfo.messagecount || 0"></em></b></a
            ><i>站内信（条）</i></span
          >
        </li>
        <li style="width: 24%">
          <img src="../../assets/img/user10.png" alt="" /><span
            ><a @click="toFriendsList" href="javascript:void(0);"
              ><b class="primary"
                ><em v-text="basicInfo.friendcount || 0"></em></b></a
            ><i>好友申请（条）</i></span
          >
        </li>
        <li style="width: 24%">
          <img src="../../assets/img/user11.png" alt="" /><span
            ><a @click="toCommentList" href="javascript:void(0);"
              ><b class="primary"
                ><em v-text="basicInfo.commentcount || 0"></em></b></a
            ><i>评论</i></span
          >
        </li>
        <li style="width: 22%">
          <img src="../../assets/img/user12.png" alt="" /><span
            ><a @click="toReportList" href="javascript:void(0);"
              ><b class="primary"
                ><em v-text="basicInfo.reportcount || 0"></em></b></a
            ><i>举报</i></span
          >
        </li>
      </ul> -->
      <!-- <ul class="stats">
        <li style="width: 30%">
          <img src="../../assets/img/user13.png" alt="" /><span
            ><b>{{ basicInfo.albx0463 || 5.0 }}</b
            ><i>守时程度（分）</i></span
          >
        </li>
        <li style="width: 24%">
          <img src="../../assets/img/user14.png" alt="" /><span
            ><b>{{ basicInfo.albx0464 || 5.0 }}</b
            ><i>服务态度（分）</i></span
          >
        </li>
        <li style="width: 24%">
          <img src="../../assets/img/user15.png" alt="" /><span
            ><b>{{ basicInfo.albx0465 || 5.0 }}</b
            ><i>专业水平（分）</i></span
          >
        </li>
        <li style="width: 22%">
          <img src="../../assets/img/user16.png" alt="" /><span
            ><a @click="toEvaluateList" href="javascript:void(0);"
              ><b class="success"
                ><em v-text="basicInfo.pjcount || 0"></em></b></a
            ><i>评价（条）</i></span
          >
        </li>
      </ul> -->
    </div>
  </li>
</template>

<script>
const CompleteTip = () => import("@/view/usercenter/completetip.vue"); //弹出层
const volstar = () => import("@/view/home/volstar.vue"); //星星
import avatar from "../../assets/img/mruser.png";

export default {
  name: "usercenter",
  components: {
    CompleteTip,
    volstar
  },
  data() {
    return {
      routeDefine: this.$route.params.define,
      userInfo: "", //账户信息
      basicInfo: this.$store.getters.getBasic, //用户信息
      starOn: require("../../assets/img/star.png"),
      starOff: require("../../assets/img/star1.png"),
      ip: window.localStorage.getItem("ip")
    };
  },
  created() {
    window.Vuei = this;
    this.getData();
    console.log("created");
  },
  computed: {
    realName: function() {
      let name = this.basicInfo.albp0003;
      console.log(this.$store.getters.getBasic);
      if (!this.common.checkChinese(name)) {
        return '<b class="fontF">' + name + "</b>";
      } else {
        return name;
      }
    }
  },
  methods: {
    getData() {
      this.basicInfo = this.$store.getters.getBasic;
      this.userInfo = this.$store.state.userinfo;
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
    },
    countBack: function(result) {
      this.basicInfo = result.data;
    },
    imgError(el) {
      el.target.src = avatar;
    },
    toServiceTime: function() {
      this.$router.push({
        name: "myservicetime",
        params: { define: this.routeDefine }
      });
    },
    toOrgList() {
      this.$router.push({
        name: "myorg",
        params: { define: this.routeDefine }
      });
    },
    toProjectList() {
      this.$router.push({
        name: "myproject",
        params: { define: this.routeDefine }
      });
    },
    toEvaluateList: function() {
      //我的评价
      this.$router.push({
        name: "myevaluate",
        params: { define: this.routeDefine }
      });
    },
    toMessageList: function() {
      //站内信
      this.$router.push({
        name: "message",
        params: { define: this.routeDefine }
      });
    },
    toFriendsList: function() {
      //好友申请
      this.$router.push({
        name: "myfriends",
        params: { define: this.routeDefine }
      });
    },
    toCommentList: function() {
      //我的评论
      this.$router.push({
        name: "mycomment",
        params: { define: this.routeDefine }
      });
    },
    toReportList: function() {
      //我的举报
      this.$router.push({
        name: "myreport",
        params: { define: this.routeDefine }
      });
    },

    syncTime() {
      //同步时间
      this.utilscommit.request(
        "nvsi_updateRegistrationDate",
        {},
        this.timeBack
      );
    },
    timeBack(res) {
      if (res.code == 0) {
        Vuec.getUser();
      }
      this.$swal(res.message, { buttons: "确定" });
    }
  }
};
</script>

<style scoped>
.user-table td {
  padding: 0 10px;
  line-height: 25px;
}
.time_button {
  display: inline-block;
  box-sizing: border-box;
  height: 19px;
  line-height: 19px;
  padding: 0 20px;
  font-size: 12px;
  border: 1px solid #e60012;
  color: #e60012;
  background: #fff;
  transition: 0.3s;
  white-space: nowrap;
  outline: none;
  cursor: pointer;
  border-radius: 4px;
  margin-left: 5px;
}
</style>
