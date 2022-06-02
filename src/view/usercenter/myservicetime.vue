<template>
  <li class="col v-t white tab-container">
    <div class="tabbar tabbar-tight mb-20 row w">
      <span class="col v-m">服务时长</span>
      <div class="col v-m t-r">
        <a
          class="button button-normal"
          href="javascript:void(0);"
          @click="getServiceTime"
          >时长同步</a
        >
      </div>
    </div>
    <div class="tabbar-tips">
      <p>
        <em>友情提示：</em
        ><br />1.请联系志愿团体真实准确为您记录志愿服务时长。<br />2.请不要购买志愿服务时长，一经查实，该服务时长将被标记为“非法购买”。<br />3.欢迎举报虚假记录或买卖志愿服务时长行为，举报电话：{{
          servicePhone
        }}
      </p>
    </div>
    <table class="user-table">
      <colgroup>
        <col width="15%" />
        <col width="16%" />
        <col width="12%" />
        <col width="11%" />
        <col width="18%" />
        <col width="18%" />
        <col width="10%" />
      </colgroup>
      <tr>
        <th>服务时长</th>
        <th>服务时间</th>
        <th>添加方式</th>
        <th>状态</th>
        <th>服务项目</th>
        <th>服务团体</th>
        <th>日期</th>
      </tr>
      <tr v-show="!serviceTimeList.length">
        <td
          colspan="6"
          style="text-align: center; border-bottom: 1px #f6f3f7"
          v-show="queryStatus == 1"
        >
          <img src="../../assets/img/js-wujilu.png" />
        </td>
        <td
          colspan="6"
          style="text-align: center; border-bottom: 1px #f6f3f7"
          v-show="queryStatus == 0"
        >
          <img src="@/assets/img/loader.png" style="margin-right: 5px" /><span
            style="font-size: 16px; color: #666666; vertical-align: middle"
            >加载中...</span
          >
        </td>
      </tr>
      <tr v-for="(el, index) in serviceTimeList" :key="index">
        <td
          class="left"
          v-html="addZero(el.albx0172) + '小时<br>' + el.albp0057"
        ></td>
        <td class="left">
          {{ el.albx0182 | ellipsisNos(10) }}<br />{{
            el.albx0181 | ellipsisNosx(el.albx0182, 19)
          }}
        </td>
        <td class="left">
          <span v-if="el.albx0173 == 1">团体录入</span>
          <span v-if="el.albx0173 == 2">个人申请</span>
          <span v-if="el.albx0173 == 4">app打卡</span>
        </td>
        <td class="left">
          <span v-if="el.albx0174 == 0">申请中</span>
          <span v-if="el.albx0174 == 1">未签退</span>
          <i v-if="el.albx0174 == 2">已生效</i>
          <span style="color: #cc0000" v-if="el.albx0174 == 3">已删除</span>
          <span v-if="el.albx0174 == 4">已拒绝</span>
          <span v-if="el.albx0174 == 5">未生效</span>
        </td>
        <td class="left">
          <em
            class="pointer"
            :title="el.albx0002"
            @click="$utilroutes.toProjectInfo(el.albx0176, el.albx0021)"
            >{{ el.albx0002 | ellipsis(18) }}</em
          >
        </td>
        <td class="left">
          <em
            class="pointer"
            :title="el.albe0002"
            @click="$utilroutes.toGroupInfo(el.albx0177, el.albe0012)"
            >{{ el.albe0002 | ellipsis(18) }}</em
          >
        </td>
        <td class="left">{{ el.albx0178 | ellipsisNos(10) }}</td>
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
  </li>
</template>

<script>
const paging = () => import("@/components/page/paginationRed.vue"); //分页

export default {
  components: { paging },
  data() {
    return {
      routeDefine: this.$route.params.define,
      basicInfo: this.$store.getters.getBasic, //志愿者信息
      servicePhone: "", // 举报电话--民政部电话：010-53975820
      serviceTimeList: {}, //求证列表
      //分页参数
      tolCount: 0, //总条数
      tolPage: 0, //总页数
      pageSize: 8, //每页条数
      pageNow: 1, //当前页
      jumpPage: 1,
      queryStatus: 0 // 查询状态，0->查询中，1->查询结束
    };
  },
  created() {
    this.getTimeList();
    this.getdate();
  },
  methods: {
    getdate: function() {
      // 获取当前站点举报电话信息
      this.utilscommit.requestapi(
        "getDepartmentTelFortisWeb",
        { areaid: this.basicInfo.albp0020 },
        this.dateBack
      );
    },
    dateBack: function(result) {
      // 获取举报电话的结果
      if (result && result.code == 0) {
        this.servicePhone = result.data && result.data.albe0079 || '';
      }
    },
    pageEvent: function(e) {
      // 分页
      this.getTimeList(e);
    },
    getTimeList(e) {
      // 变更查询状态
      this.queryStatus = 0;
      this.serviceTimeList = [];
      // 服务时长列表
      let params = {
        albx0175: this.$store.getters.getUser.albp0029, // 志愿者编号
        cardno: this.$store.getters.getUser.albp0005, // 志愿者身份证号
        pageNow: e || this.pageNow,
        pageSize: this.pageSize
      };
      console.log(params);
      this.utilscommit.requestapi(
        "listVolMyServiceTimeFortisWeb",
        params,
        this.timeListBack
      );
    },
    timeListBack(result) {
      if (result && result.data) {
        this.serviceTimeList = result.data;
        this.common.getTolData(this, result);
      } else {
        this.serviceTimeList = {};
        this.common.getTolData(this);
      }
      this.queryStatus = 1
    },
    getServiceTime() {
      //同步服务时长
      if (this.basicInfo) {
        let id = this.basicInfo.id;
        this.utilscommit.request(
          "nvsi_findOldTime",
          { albx0053: id },
          this.getTimeBack
        );
      }
    },
    getTimeBack(res) {
      if (res.data) {
        this.$swal("同步成功", { buttons: "确定" });
      } else {
        this.$swal(res.message, { buttons: "确定" });
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
