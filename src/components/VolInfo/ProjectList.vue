// 志愿者信息/已加入项目列表
<template>
  <div>
    <table class="table-list">
      <colgroup>
        <col width="50%" />
        <col width="25%" />
        <col width="25%" />
      </colgroup>
      <tbody>
        <tr>
          <th>项目名称</th>
          <th>立项日期</th>
          <th>项目状态</th>
        </tr>
        <tr v-if="!projectList.length">
          <td
            colspan="3"
            style="text-align: center; border-bottom: 1px #f6f3f7"
            v-show="queryStatus == 1"
          >
            <img src="@/assets/img/js-wujilu.png" />
          </td>
          <td
            colspan="3"
            style="text-align: center; border-bottom: 1px #f6f3f7"
            v-show="queryStatus == 0"
          >
            <img src="@/assets/img/loader.png" style="margin-right: 5px" /><span
              style="font-size: 16px; color: #666666; vertical-align: middle"
              >加载中...</span
            >
          </td>
        </tr>
        <tr v-for="(el, index) in projectList" :key="index">
          <td class="left">
            <span
              @click="$utilroutes.toProjectInfo(el.id, el.areaid)"
              class="c-danger pointer"
              v-if="el.albx0072 == 3 || el.albx0072 == 4 || el.albx0072 == 5"
              >{{ el.albx0002 | ellipsis(25) }}</span
            >
            <span v-else>{{ el.albx0002 | ellipsis(25) }}</span>
          </td>
          <td class="left">{{ el.albx0004 | ellipsisNos(10) }}</td>
          <td class="left">
            <span v-show="el.albx0072 == 6 || el.albx0072 == 7">{{
              el.albx0073 == 20 ? "补录中" : el.albx0073 == 21 ? "已停用" : "已作废"
            }}</span
            ><i
              v-show="el.albx0072 == 5 || el.albx0072 == 3 || el.albx0072 == 4"
              >{{
                ((el.albx0073 == 16 ||
                  el.albx0073 == 14 ||
                  el.albx0073 == 15) &&
                  "运行中") ||
                (el.albx0073 == 19 && "手动结项") ||
                (el.albx0073 == 18 && "自动结项") ||
                (el.albx0073 == 13 && "待启动")
              }}</i
            >
          </td>
        </tr>
      </tbody>
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
// 分页
const paging = () => import("@/components/page/paginationRed.vue");

export default {
  components: {
    paging,
  },
  data() {
    return {
      routeDefine: this.$route.params.define, // 当前站点路由信息
      projectList: [], // 当前被查询志愿者项目列表
      albp0005: this.$route.params.data1, // 当前被查询志愿者证件号
      albp0020: this.$route.params.data2, // 当前被查询志愿者服务区域
      tolCount: 0, // 总条数
      tolPage: 0, // 总页数
      pageSize: 8, // 每页条数
      pageNow: 1, // 当前页
      jumpPage: 1,
      queryStatus: 0, // 查询状态
    };
  },
  created() {
    this.getList();
  },
  methods: {
    // 获取项目列表
    async getList() {
      // 查询之前状态初始化
      this.queryStatus = 0;
      this.projectList = [];
      this.tolCount = 0;
      this.tolPage = 0;
      let params = {
        cardno: this.albp0005,
        albx0084: "B",
        pageNum: this.pageNow,
        pageSize: this.pageSize,
      };
      let { data: res } = await this.utilscommit.asyncReq(
        "listVolMyProjectsFortisWeb",
        params
      );
      if (res.code == 0 && res.data != "SELECT_NULL") {
        this.projectList = res.data.data;
        this.common.getTolData(this, res);
      }
      this.queryStatus = 1;
    },
    // 分页
    pageEvent() {
      this.getList();
    },
  },
};
</script>

<style>
.table-list th {
  text-align: left;
}
</style>