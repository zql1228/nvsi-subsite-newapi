// 已加入队伍列表
<template>
  <div>
    <!-- 已加入列表 -->
    <table class="user-table" id="orgTable">
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
        <th>加入时间</th>
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
            @click="$utilroutes.toGroupInfo(el.id, el.albe0012)"
            class="pointer"
            >{{ el.albe0002 | ellipsis(18) }}</em
          >
          <p>{{ el.albe0038 || "" }}</p>
        </td>
        <td class="left">
          <p>
            <span>{{ el.albe0022 || "" }}</span>
            <span>{{ el.albe0019 || "" }}</span>
            <span style="margin: 0 6px">{{
              (el.albe0047 == "1" && el.albe0024) ||
                (el.albe0048 == "1" && el.albe0020) ||
                ""
            }}</span>
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
          {{ el.albe0136 | ellipsisNos(10) }}
        </td>
        <td class="left">
          <i>已加入</i>
        </td>
        <td class="left">
          <em @click="outOfOrg(el.id, el.albe0012)" class="pointer">脱离</em>
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
    paging
  },
  computed: {
    ...mapGetters({
      userInfo: "getUser", // 志愿者登录信息
      basicInfo: "getBasic" // 志愿者个人信息
    })
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
      groupList: []
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
    // 查询列表
    async getList(e) {
      // 状态初始化
      this.groupList = [];
      this.tolCount = 0;
      this.tolPage = 0;
      this.queryStatus = 0;
      let params = {
        pageSize: this.pageSize,
        pageNum: e || 1,
        cardno: this.userInfo.albp0005
      };
      let { data: res } = await this.utilscommit.asyncReq(
        "queryMyTeamPageWeb",
        params
      );
      if (res.code == 0 && res.data) {
        this.groupList = res.data;
        this.common.getTolData(this, res);
      }
      this.queryStatus = 1;
    },
    // 显示脱离队伍弹窗
    outOfOrg(id, albe0012) {
      if (this.userInfo) {
        this.$swal("确认脱离？", { buttons: ["取消", "确定"] }).then(value => {
          if (value) this.outOfOrgConfirm(id, albe0012);
        });
      }
    },
    // 确定脱离队伍
    outOfOrgConfirm(id, albe0012) {
      let params = {
        albp0029: this.userInfo.albp0029, // 志愿者编号
        albp0020: this.userInfo.albp0020, // 志愿者服务区域
        id: id, // 队伍id
        albe0012: albe0012, // 队伍服务区域
        albp0005: this.userInfo.albp0005 //证件号
      };
      this.utilscommit.requestapi("volBreakawayTeamWeb", params, res => {
        if (res && res.code == 0) {
          this.getList();
          this.$swal("脱离成功", { buttons: "确定" });
        } else {
          this.$swal("脱离失败，请稍后再试", { buttons: "确定" });
        }
      });
    },
    // 发站内信
    sendMessage(acceptId, userid) {
      if (this.userInfo) {
        this.common.addCookie("msg", 2, 0.2);
        this.$router.push({
          name: "message",
          params: { define: this.routeDefine, data1: acceptId, data2: userid }
        });
      } else {
        this.$utilroutes.toLogin();
      }
    }
  }
};
</script>

<style scoped>
.user-table th {
  text-align: left;
  padding: 10px;
}
</style>
