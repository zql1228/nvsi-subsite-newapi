// 志愿者信息/已加入团体列表
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
          <th>团体名称</th>
          <th>成员</th>
          <th>成立日期</th>
        </tr>
        <tr v-if="!groupList.length">
          <td
            colspan="3"
            style="text-align: center; border-bottom: 1px #f6f3f7"
            v-show="queryStatus == 1"
          >
            <img src="../../assets/img/js-wujilu.png" />
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
        <tr v-for="(el, index) in groupList" :key="index">
          <td class="left">
            <em
              @click="$utilroutes.toGroupInfo(el.id, el.albe0012)"
              :title="el.albe0002"
              class="c-danger pointer"
              >{{ el.albe0002 | ellipsis(25) }}</em
            >
          </td>
          <td class="left">{{ el.albe0056 || "0" }}</td>
          <td class="left">{{ el.albe0046 | ellipsisNos(10) }}</td>
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
const paging = () => import("@/components/page/paginationRed.vue");
export default {
  components: {
    paging,
  },
  data() {
    return {
      routeDefine: this.$route.params.define, // 当前站点路由信息
      groupList: [], // 当前被查询志愿者项目列表
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
    async getList() {
      // 查询之前状态初始化
      this.queryStatus = 0;
      this.groupList = [];
      this.tolCount = 0;
      this.tolPage = 0;
      let params = {
        cardno: this.albp0005,
        pageNum: this.pageNow,
        pageSize: this.pageSize,
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
    // 分页
    pageEvent() {
      this.getList();
    },
  },
};
</script>

<style>
</style>