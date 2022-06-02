// 待定队伍列表
<template>
  <div>
    <!-- 待定列表 -->
    <table class="user-table" id="orgTablesq">
      <colgroup>
        <col width="30%" />
        <col width="20%" />
        <col width="20%" />
        <col width="15%" />
        <col width="15%" />
      </colgroup>
      <tr>
        <th>队伍名称</th>
        <th>联系方式</th>
        <th>申请时间</th>
        <th>状态</th>
        <th>操作</th>
      </tr>
      <tr v-if="!groupList.length">
        <td
          colspan="5"
          style="text-align: center; border-bottom: 1px #f6f3f7"
          v-show="queryStatus == 1"
        >
          <img src="../../assets/img/js-wujilu.png" />
        </td>
        <td
          colspan="5"
          style="text-align: center; border-bottom: 1px #f6f3f7"
          v-show="queryStatus == 0"
        >
          <img src="@/assets/img/loader.png" style="margin-right: 5px" /><span
            style="font-size: 16px; color: #666666; vertical-align: middle"
            >加载中...</span
          >
        </td>
      </tr>
      <tr v-for="(el, index) in groupList" :key="index">
        <td class="left">
          <em
            @click="$utilroutes.toGroupInfo(el.albp3309, el.albp3311)"
            class="pointer"
            >{{ el.albp3308 }}</em
          >
          <p>{{ el.albe0038 || "" }}</p>
        </td>
        <td class="left">
          <p>
            <span>{{ el.albp3306 || "" }}</span>
            <span style="margin: 0 6px">{{
              (el.albe0047 == "1" && el.albe0024) ||
              (el.albe0048 == "1" && el.albe0020) ||
              ""
            }}</span>
            <!-- <span>{{ el.albp3306 || '' }}</span> -->
          </p>
          <!-- <span
            ><button
              @click="sendMessage(el.id, el.albe0037)"
              class="button button-line button-line-mini pointer"
            >
              给他发站内信
            </button></span
          > -->
        </td>
        <td class="left">
          {{ el.albp3305 || "" | ellipsisNos(10) }}
        </td>
        <td class="left">
          <span v-if="el.albp3307 == 2" style="color: #cc0000">申请审核中</span>
          <span v-if="el.albp3307 == 3" style="color: #cc0000">申请被拒绝</span>
        </td>
        <td class="left">
          <em
            v-if="el.albp3307 == 3"
            @click="
              applyOrgAgain(el.albp3306, el.albp3308, el.albp3309, el.albp3311)
            "
            class="pointer"
            >再次申请</em
          >
          <!-- 删除被拒绝记录 -->
          <em
            v-if="el.albp3307 == 3"
            @click="deleteRefuseRecord(el.albp3309, el.albp3311)"
            class="pointer"
            >删除</em
          >
          <!-- 删除申请 -->
          <em
            v-if="el.albp3307 == 2"
            @click="deleteApplyOrg(el.albp3309, el.albp3311)"
            class="pointer"
            >删除</em
          >
        </td>
      </tr>
    </table>
    <paging
      :pageCount="tolPage"
      :rangePage="pageSize"
      :initPage="pageNow"
      :totals="tolCount"
      :val="jumpPage"
      @pageEvent="pageEvent"
    >
    </paging>
  </div>
</template>

<script>
const paging = () => import("@/components/page/paginationRed.vue");
import { mapGetters } from "vuex";
export default {
  components: {
    paging,
  },
  computed: {
    ...mapGetters({
      userInfo: "getUser", // 志愿者登录信息
      basicInfo: "getBasic", // 志愿者个人信息
    }),
  },
  data() {
    return {
      routeDefine: this.$route.params.define,
      // 分页参数
      tolCount: 0, // 总条数
      tolPage: 0, // 总页数
      pageSize: 8, // 每页条数
      pageNow: 1, // 当前页
      jumpPage: 1,
      queryStatus: 0, // 查询状态，0->查询中，1->查询结束
      // 列表
      groupList: [],
    };
  },
  created() {
    this.getList();
  },
  methods: {
    // 分页
    pageEvent(e) {
      this.getList(e);
    },
    // 获取待定列表
    async getList(e) {
      // 状态初始化
      this.groupList = [];
      this.tolCount = 0;
      this.tolPage = 0;
      this.queryStatus = 0;
      let params = {
        pageSize: this.pageSize,
        pageNum: e || 1,
        idCard: this.userInfo.albp0005,
      };
      let { data: res } = await this.utilscommit.asyncReq(
        "quertWaitTeamPageWeb",
        params
      );
      if (res.code == 0 && res.data) {
        this.groupList = res.data;
        this.common.getTolData(this, res);
      }
      this.queryStatus = 1;
    },
    // 删除申请中队伍
    deleteApplyOrg(albp3309, albp3311) {
      if (this.userInfo) {
        this.$swal("确认删除申请？", { buttons: ["取消", "确定"] }).then(
          (value) => {
            if (value) {
              let params = {
                albp3310: this.userInfo.albp0005, // 志愿者身份证
                albp3309: albp3309, // 队伍id
                albp3311: albp3311, // 队伍服务区域
              };
              this.utilscommit.requestapi(
                "volDeleteTeamApplyWeb",
                params,
                this.deleteApplyOrgBack
              );
            }
          }
        );
      } else {
        // 校验用户是否登录
        Vuec.checkUser();
      }
    },
    // 删除申请中队伍回调
    deleteApplyOrgBack(result) {
      if (result && result.code == 0) {
        this.getList();
        this.$swal("删除成功", { buttons: "确定" });
      } else {
        this.$swal("删除失败", { buttons: "确定" });
      }
    },
    // 再次申请队伍
    async applyOrgAgain(albp3306, albp3308, albp3309, albp3311) {
      let params = {
        albp3302: this.userInfo.albp0003, // 志愿者姓名
        albp3303: this.userInfo.albp0020, // 志愿者服务区域
        albp3304: this.userInfo.albp0089, // 志愿者服务时长
        albp3306: albp3306, // 队伍联系方式
        albp3308: albp3308, // 队伍名称
        albp3309: albp3309, // 队伍id
        albp3310: this.userInfo.albp0005, // 志愿者证件号
        albp3311: albp3311, // 队伍服务区域
        albe0133: this.userInfo.albp0029, // 志愿者编号
        albp0010: this.userInfo.albp0010, // 志愿者手机号
        albp0006: this.userInfo.albp0006, // 志愿者性别
      };
      let { data: data } = await this.utilscommit.asyncReq(
        "volApplyTeamWeb",
        params
      );
      if (data && data.code == 0) {
        this.getList();
        this.$swal("申请成功", { buttons: "确定" });
      } else {
        this.$swal("申请失败", { buttons: "确定" });
      }
    },
    // 删除被拒绝记录
    async deleteRefuseRecord(albp3309, albp3311) {
      let params = {
        albp3309, // 队伍id
        albp3310: this.userInfo.albp0005, // 志愿者编号
        albp3311, // 队伍服务区域
      };
      let { data: res } = await this.utilscommit.asyncReq(
        "updateRefuseTeamWeb",
        params
      );
      if (res && res.code == 0) {
        this.getList();
        this.$swal("删除成功", { buttons: "确定" });
      } else {
        this.$swal("删除失败", { buttons: "确定" });
      }
    },
    // 发站内信
    sendMessage(acceptId, userid) {
      if (this.userInfo) {
        this.common.addCookie("msg", 2, 0.2);
        this.$router.push({
          name: "message",
          params: { define: this.routeDefine, data1: acceptId, data2: userid },
        });
      } else {
        this.$utilroutes.toLogin();
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