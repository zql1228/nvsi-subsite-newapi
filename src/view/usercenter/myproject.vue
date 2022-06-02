<template>
  <li class="col v-t white tab-container">
    <div class="tabbar tabbar-tight mb-20 row w" @click="Addactive($event)">
      <span class="col v-m" data-a="1" :class="addactive == 1 ? 'active' : ''"
        >我的项目</span
      >
      <span class="col v-m" data-a="2" :class="addactive == 2 ? 'active' : ''"
        >待定项目</span
      >
      <div class="col v-m t-r">
        <a
          class="button button-normal"
          href="javascript:void(0);"
          @click="getPro"
          >项目同步</a
        >
        <router-link
          tag="a"
          class="button button-normal"
          href="javascript:void(0);"
          :to="{ name: 'project', params: { define: routeDefine } }"
          >参加更多项目</router-link
        >
      </div>
    </div>
    <!-- 已加入项目 -->
    <div v-if="addactive == 1">
      <JoinedList></JoinedList>
    </div>

    <!-- 待定项目 -->
    <div v-if="addactive == 2">
      <PendingList></PendingList>
    </div>
  </li>
</template>

<script>
const paging = () => import("@/components/page/paginationRed.vue"); // 分页
const star = () => import("@/view/home/star.vue"); // 星星
const JoinedList = () => import("@/components/MyProject/JoinedList.vue");
const PendingList = () => import("@/components/MyProject/PendingList.vue");

export default {
  name: "myproject",
  components: {
    paging,
    star, //星星插件
    JoinedList,
    PendingList,
  },
  data() {
    return {
      routeDefine: this.$route.params.define,
      // 配置日期语音环境
      lang: {
        formatLocale: {
          firstDayOfWeek: 1,
        },
        monthBeforeYear: false,
      },
      addactive: 1,
      //#region
      // zxendTime: "", // 项目真实结束时间
      // zxstartTime: "", // 项目真实开始时间
      // userInfo: this.$store.getters.getUser, //账号信息
      // basicInfo: this.$store.getters.getBasic, //志愿者信息
      // myProjectList: {}, // 已加入列表
      // myAppendList: {}, // 待定列表
      // appliedTime: "0.00", //申请中的时长
      // applyInfo: {}, // 申请的信息
      // projectName: "", //申请的项目名
      // lineProjectId: "", // 脱离项目id
      // lineAreaid: "", // 脱离项目区划
      // lineGroupId: "", // 脱离项目的队伍id
      // lineJobId: "", // 脱离项目的岗位id
      // jobList: {}, //岗位列表
      // job: "", // 更换岗位时选中的岗位信息
      // evaluateInfo: {}, //评价信息
      // row1: "0",
      // row2: "0",
      // row3: "0",
      // content: "", // 评价内容
      // tolCount: 0, // 总条数
      // tolPage: 0, // 总页数
      // pageSize: 8, // 每页条数
      // pageNow: 1, // 当前页
      // jumpPage: 1,
      // starOn: require("../../assets/img/star.png"),
      // starOff: require("../../assets/img/star1.png"),
      // startTime: "", // 活动开始时间
      // endTime: "", // 活动结束时间
      // timeDifference: 0.0, //时间差
      // lbx02id: "", //
      // jobid: "", //
      // oldpostid: "", // 旧岗位id
      // queryStatus: 0, // 查询状态，0->查询中，1->查询结束
      //#endregion
    };
  },
  created() {
    window.Vues = this; //主体vue实例挂载
  },
  watch: {
    // 监听tab页面
    addactive(newval, oldval) {
      this.pageNow = 1;
    },
  },
  methods: {
    // 切换tab
    Addactive(e) {
      let a = e.target.dataset.a;
      if (a == 1 || a == 2) {
        this.addactive = e.target.dataset.a * 1;
      }
    },
    // 同步项目
    getPro() {
      if (this.basicInfo) {
        let id = this.basicInfo.id;
        this.utilscommit.request(
          "nvsi_findOldTeam",
          { albx0053: id },
          this.getProConfirmBack
        );
      }
    },
    // 同步项目回调
    getProConfirmBack(res) {
      if (res.data) {
        this.$swal("同步成功", { buttons: "确定" });
      } else {
        this.$swal(res.message, { buttons: "确定" });
      }
    },
  },
};
</script>

<style scoped>
.user-table th {
  text-align: left;
  padding: 10px;
}
</style>
