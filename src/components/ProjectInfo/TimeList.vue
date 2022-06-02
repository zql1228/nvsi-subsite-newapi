// 项目详情/试产公示
<template>
  <div>
    <table class="table-list">
      <colgroup>
        <col width="15%" />
        <col width="15%" />
        <col width="65%" />
        <!-- <col width="15%" /> -->
      </colgroup>
      <tbody>
        <tr>
          <th>姓名</th>
          <th>服务时长</th>
          <th>备注</th>
          <!-- <th>操作</th> -->
        </tr>
        <tr v-if="!timeList.length">
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
        <tr v-for="el in timeList" :key="el.id">
          <td class="left">
            <i
              class="pointer c-danger name_color"
              :title="el.albp0003"
              @click="$utilroutes.toUserInfo(el.albp0005, el.albp0020)"
              >{{ el.albp0003 }}</i
            >
          </td>
          <td class="left">{{ el.albx0172 | addZero }}小时</td>
          <td
            class="left"
            style="
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;
            "
            :title="el.albp0057"
          >
            {{ el.albp0057 }}
          </td>
          <!-- 举报操作 -->
          <!-- <td class="left">
            <a
              href="javascript:void(0);"
              class="c-danger"
              @click="inform(el.id, el.albp0029, el.albx0172)"
              >举报</a
            >
            (<span>{{ el.count || 0 }}</span
            >)
          </td> -->
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

    <!-- 举报 -->
    <div class="mask inform">
      <div
        class="mask-info"
        style="width: 700px; max-height: 705px; margin-left: -350px"
      >
        <div class="mask-header row w">
          <div class="col v-m"><h2>服务时长举报</h2></div>
          <div class="col v-m t-r">
            <a
              href="javascript:void(0);"
              class="mask-close"
              @click="closeInform"
              ><img src="@/assets/img/close.png" alt=""
            /></a>
          </div>
        </div>
        <div style="padding: 20px 50px 0 50px">
          <div class="form">
            <p class="form-label"><em>*</em>举报理由：</p>
            <textarea
              rows="2"
              v-model="reason"
              @blur="reasonCheck"
              maxlength="100"
              style="height: 70px"
            ></textarea>
          </div>
          <span
            class="form-error"
            style="padding-left: 20px"
            id="reasonTips"
          ></span>
        </div>
        <div class="form t-c">
          <a href="javascript:void(0);" class="button" @click="informSubmit"
            >确定</a
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// 分页
const paging = () => import("@/components/page/paginationRed.vue");
import { mapGetters } from "vuex";
export default {
  name: "ProjectInfoTimeList",
  components: {
    paging,
  },
  computed: {
    ...mapGetters({
      userInfo: "getUser", // 志愿者登录信息
      basicInfo: "getBasic", // 志愿者个人信息
    }),
  },
  props: ["projectInfo", "groupInfo"],
  data() {
    return {
      routeDefine: this.$route.params.define, // 路由
      areaid: this.$route.params.data2, // 项目区域id
      projectId: this.$route.params.data1, // 项目id
      timeList: [], // 时长列表
      // 举报参数
      reason: "", // 举报理由
      timeId: "", // 举报时长id
      albx0347: "", // 被举报志愿者编号
      albx0340: "", // 被举报的时长
      // 分页参数
      tolCount: 0, //总条数
      tolPage: 0, //总页数
      pageSize: 8, //每页条数
      pageNow: 1, //当前页
      jumpPage: 1,
      queryStatus: 0,
    };
  },
  created() {
    this.getList();
  },
  methods: {
    // 获取时长列表
    async getList() {
      // 查询状态重置
      this.timeList = [];
      this.tolCount = 0;
      this.tolPage = 0;
      this.queryStatus = 0;
      let params = {
        areaid: this.areaid,
        albx0176: this.projectId,
        pageNum: this.pageNow,
        pageSize: this.pageSize,
      };
      console.log(params);
      let { data: res } = await this.utilscommit.asyncReq(
        "timeFortisWeb",
        params
      );
      if (res.code == 0 && res.data) {
        this.timeList = res.data;
        this.common.getTolData(this, res);
      }
      this.queryStatus = 1;
    },
    // 分页
    pageEvent(e) {
      this.getList();
    },
    // 显示时长举报弹窗
    inform(timeid, albx0347, albx0340) {
      if (this.userInfo) {
        if (this.userInfo.isdelete == 0) {
          //是否有效
          if (
            (this.basicInfo.albp0020 && this.basicInfo.albp0028) ||
            (this.userInfo.albp0087 >= 4 && this.userInfo.albp0087 <= 8)
          ) {
            //是否完善信息
            $(".mask.inform").addClass("active");
            this.timeId = timeid;
            this.albx0347 = albx0347;
            this.albx0340 = albx0340;
          } else {
            this.$swal("未完善基本信息不能举报，是否前去完善？", {
              buttons: ["取消", "确定"],
            }).then(function (value) {
              if (value) {
                Vue.$router.push({
                  name: "updatedata",
                  params: { define: Vue.$route.params.define },
                });
              }
            });
          }
        } else {
          this.$swal("无效用户！", { buttons: "确定" });
        }
      } else {
        this.$swal("未登录不能举报，是否前去登录？", {
          buttons: ["取消", "确定"],
        }).then(function (value) {
          if (value) {
            Vue.$utilroutes.toLogin();
          }
        });
      }
    },
    // 时长举报理由校验
    reasonCheck() {
      // 失去焦点
      var tip = "";
      var flag = true;
      if (!this.reason) {
        tip = "请输入举报理由！";
        flag = false;
      }
      this.formTip("reason", tip);
      return flag;
    },
    // 提交时长举报
    informSubmit() {
      if (this.reasonCheck()) {
        let data = {
          albx0338: this.areaid,
          albx0339: this.groupInfo.id,
          albx0342: this.timeId, //被投诉对象
          // "albx0343":this.userInfo.albp0087 == '1' ? '1' : '2',
          albx0344: this.reason,
          albx0346: "1",
          albx0347: this.albx0347,
          albx0348: this.projectId,
          albx0340: this.albx0340, //服务时长
          albx0353: this.projectInfo.albx0002, //项目名
        };
        // console.log(data);
        this.utilscommit.request("nvsi_insertReport", data, this.reportBack); //时长举报
      }
    },
    // 关闭举报弹窗
    closeInform() {
      this.reason = "";
      this.timeId = "";
      this.albx0347 = "";
      this.albx0340 = "";
      $(".form-error").html("");
      $(".mask.inform").removeClass("active");
    },
  },
};
</script>

<style scpoed>
@import "../../assets/css/base.css";
@import "../../assets/css/main.css";
.table-list th {
  text-align: left;
}
</style>