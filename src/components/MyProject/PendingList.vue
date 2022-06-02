// 志愿者待定项目列表
<template>
  <div>
    <!-- 待定项目 -->
    <table class="user-table">
      <colgroup>
        <col width="25%" />
        <col width="18%" />
        <col width="10%" />
        <col width="15%" />
        <col width="10%" />
        <col width="8%" />
        <col width="14%" />
      </colgroup>
      <tr>
        <th>项目名称</th>
        <th>联系方式</th>
        <th>申请时间</th>
        <th>岗位</th>
        <th>服务时长</th>
        <th>状态</th>
        <th>操作</th>
      </tr>
      <!-- 无数据显示空状态 -->
      <tr v-if="!projectList.length">
        <td
          colspan="7"
          style="text-align: center; border-bottom: 1px #f6f3f7"
          v-show="queryStatus == 1"
        >
          <img src="../../assets/img/js-wujilu.png" />
        </td>
        <td
          colspan="7"
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
        <td
          class="left"
          style="
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            color: #e60012;
          "
        >
          <em
            @click="toProjectInfo(el.albx0021, el.albx0057, el.albx0073l)"
            :title="el.albx0002"
            class="pointer"
            v-if="
              el.albx0072l == 4 ||
              el.albx0072l == 3 ||
              el.albx0072l == 5 ||
              el.albx0072l == 6
            "
            >{{ el.albx0002 }}</em
          >
          <em v-else style="color: #333">
            {{ el.albx0002 }}
          </em>
          <p>{{ el.albe0002 | ellipsis(18) }}</p>
        </td>
        <td class="left">
          <p>
            <span v-text="el.albx0025"></span>
            <!-- 联系手机公开显示手机，座机公开显示座机，都不公开就不显示，优先显示手机 -->
            <span style="margin: 0 6px">{{
              (el.albx0027 == "1" && el.albx0026) ||
              (el.albx0029 == "1" && el.albx0028) ||
              ""
            }}</span>
          </p>
          <!-- <span
            ><button
              @click="sendMessage(el.albx0011)"
              class="button button-line button-line-mini pointer"
            >
              给他发站内信
            </button></span
          > -->
        </td>
        <td class="left">{{ el.albx0056 | ellipsisNos(10, "--") }}</td>
        <td class="left">
          <em
            :title="el.albx0072"
            style="
              color: #333;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
            "
            >{{ el.albx0072 | ellipsis(8) }}</em
          >
        </td>
        <td class="left">
          <em @click="toServiceTimeList" class="pointer"
            >{{ el.servicetimesum | addZero }}小时</em
          >
        </td>
        <td class="left">
          <span style="color: #cc0000" v-if="el.albx0085 == 1">申请中</span>
          <span style="color: #cc0000" v-if="el.albx0085 == 4">邀请中</span>
          <span style="color: #cc0000" v-if="el.albx0085 == 7">已拒绝</span>
        </td>
        <td class="left">
          <!-- 待定列表只有四种操作：同意，拒绝，删除，更换岗位 -->
          <!-- 被拒绝后再次申请 -->
          <em
            v-if="el.albx0085 == 7"
            class="pointer"
            style="margin-right: 6px"
            @click="
              applyProAgain(
                el.albx0021,
                el.albx0057,
                el.albx0052,
                el.albx0072l,
                el.albx0073l
              )
            "
            >再次申请</em
          >
          <!-- 当前被邀请 -->
          <em
            v-if="el.albx0085 == 4"
            class="pointer"
            style="margin-right: 6px"
            @click="agreeOrgInvite(el.albx0021, el.albx0057, el.albx0052)"
            >同意</em
          >
          <!-- 当前被邀请 -->
          <em
            v-if="el.albx0085 == 4"
            class="pointer"
            style="margin-right: 6px"
            @click="refuseOrgInvite(el.albx0021, el.albx0057, el.albx0052)"
            >拒绝</em
          >
          <!-- 删除 等同于 取消申请 -->
          <em
            v-if="el.albx0085 == 1 || el.albx0085 == 7"
            class="pointer"
            style="margin-right: 6px"
            @click="deleteApplyOrg(el.albx0021, el.albx0057, el.albx0052)"
            >删除</em
          >
          <em
            v-if="el.albx0085 == 1"
            class="pointer"
            style="margin-right: 6px"
            @click="changeJob(el.albx0057, el.albx0021, el.albx0052)"
            >更换岗位</em
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

    <!-- 更换岗位 -->
    <div class="mask job">
      <div
        class="mask-info"
        style="width: 700px; max-height: 705px; margin-left: -350px"
      >
        <div class="mask-header row w">
          <div class="col v-m"><h2>更换岗位</h2></div>
          <div class="col v-m t-r">
            <a
              href="javascript:void(0);"
              @click="jobCloseMask"
              class="mask-close"
              ><img src="../../assets/img/close.png" alt=""
            /></a>
          </div>
        </div>
        <div style="padding: 20px 50px 0 50px">
          <div class="form">
            <p class="form-label"><em>*</em>岗位：</p>
            <div class="select">
              <select v-model="job" id="changeJob">
                <option value="">请选择</option>
                <option v-for="(el, index) in jobList" :key="index" :value="el">
                  {{ el.albx0072 }}
                </option>
              </select>
            </div>
          </div>
          <span
            class="form-error"
            style="padding-left: 20px; font-size: 14px"
            id="jobTips"
          ></span>
        </div>
        <div class="form t-c">
          <a href="javascript:void(0);" class="button" @click="onChange"
            >提交</a
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const paging = () => import("@/components/page/paginationRed.vue");

import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters({
      userInfo: "getUser", // 志愿者登录信息
      basicInfo: "getBasic", // 志愿者个人信息
    }),
  },
  components: {
    paging,
  },
  data() {
    return {
      routeDefine: this.$route.params.define, // 站点路由参数
      projectList: [], // 待定项目列表
      // 分页参数
      tolCount: 0, // 总条数
      tolPage: 0, // 总页数
      pageSize: 8, // 每页条数
      pageNow: 1, // 当前页
      jumpPage: 1,
      // 更换岗位参数
      oldpostid: "", // 旧岗位id
      jobList: {}, //岗位列表
      job: "", // 更换岗位时选中的岗位信息
      // 配置日期语音环境
      lang: {
        formatLocale: {
          firstDayOfWeek: 1,
        },
        monthBeforeYear: false,
      },
      queryStatus: 0, // 查询状态，0->查询中，1->查询结束
    };
  },
  created() {
    this.getList();
  },
  methods: {
    // 分页
    pageEvent(e) {
      this.getList();
    },
    // 获取待定列表
    async getList() {
      // 查询状态重置
      this.projectList = [];
      this.queryStatus = 0;
      this.tolCount = 0;
      this.tolPage = 0;
      // 查询待定列表
      let params = {
        volNum: this.basicInfo.albp0029, // 志愿者编号
      };
      let { data: result } = await this.utilscommit.asyncReq(
        "listVolMyProjectApplyFortisWeb",
        params
      );
      if (result.code == 0 && result.data) {
        this.projectList = result.data;
        this.tolCount = result.totalCount;
        this.tolPage = result.tolPage;
      }
      this.queryStatus = 1;
    },
    // 发站内信
    sendMessage(acceptId) {
      if (this.userInfo) {
        this.utilscommit.request(
          "nvsi_selectCountInfo",
          { groupid: acceptId },
          this.sendMessageBack
        );
      } else {
        this.$utilroutes.toLogin();
      }
    },
    // 发站内信回调
    sendMessageBack(data) {
      if (data && data.data && data.data.id) {
        this.common.addCookie("msg", 2, 0.2);
        this.$router.push({
          name: "message",
          params: {
            define: this.routeDefine,
            data1: data.data.albp0055,
            data2: data.data.id,
          },
        });
      }
    },
    // 跳转到项目详情
    toProjectInfo(albx0021, albx0057, albx0073l) {
      // 项目已停用
      if (albx0073l == 21) {
        return this.$swal("当前项目已停用！", { buttons: "确定" });
      }
      // 项目已作废
      if (albx0073l == 22) {
        return this.$swal("当前项目已作废！", { buttons: "确定" });
      }
      // 跳转项目详情
      this.$utilroutes.toProjectInfo(albx0057, albx0021);
    },
    // 再次加入项目
    applyProAgain(albx0021, albx0057, albx0052, albx0072l, albx0073l) {
      // 项目关闭招募
      if (albx0072l == 4 && albx0073l == 15) {
        return this.$swal("该项目不在招募时间范围", { buttons: "确定" });
      }
      // 项目已结束招募
      if (albx0072l != 4) {
        return this.$swal("该项目已结束招募", { buttons: "确定" });
      }
      // 再次申请
      let params = {
        volunteerid: this.userInfo.albp0029, // 志愿者编号
        areaid: albx0021, // 服务区域
        projectId: albx0057, // 项目id
        volAreaId: this.userInfo.albp0020, // 志愿者服务区划分
        postid: albx0052, // 岗位id
        operatetype: 71,
        voltime: this.userInfo.albp0089, // 志愿者服务时长
      };
      this.utilscommit.requestapi(
        "getVolOperateProjectFortisWeb",
        params,
        this.applyProAgainBack
      );
    },
    // 再次加入项目回调
    applyProAgainBack(res) {
      if (res && res.code == 0) {
        this.getList();
        this.$swal("申请成功", { buttons: "确定" });
      } else {
        this.$swal(res.message, { buttons: "确定" });
      }
    },
    // 同意加入项目
    agreeOrgInvite(albx0021, albx0057, albx0052) {
      if (this.userInfo) {
        this.$swal("确认同意邀请？", { buttons: ["取消", "确定"] }).then(
          (value) => {
            if (value) {
              let params = {
                volunteerid: this.userInfo.albp0029, // 志愿者编号
                areaid: albx0021, // 服务区域
                projectId: albx0057, // 项目id
                volAreaId: this.userInfo.albp0020, // 志愿者服务区划分
                postid: albx0052, // 岗位id
                operatetype: 41,
              };
              this.utilscommit.requestapi(
                "getVolOperateProjectFortisWeb",
                params,
                this.agreeBack
              );
            }
          }
        );
      } else {
        this.$utilroutes.toLogin();
      }
    },
    // 同意加入项目回调
    agreeBack(result) {
      if (result) {
        if (result.code == 0) {
          // this.$router.go(0); //刷新页面
          this.getList();
        } else {
          this.$swal(result.message, { buttons: "确定" });
        }
      } else {
        this.$swal("同意邀请失败", { buttons: "确定" });
      }
    },
    // 拒绝加入项目
    refuseOrgInvite(albx0021, albx0057, albx0052) {
      //拒绝邀请
      if (this.userInfo) {
        this.$swal("确认拒绝邀请？", { buttons: ["取消", "确定"] }).then(
          (value) => {
            if (value) {
              let params = {
                volunteerid: this.userInfo.albp0029, // 志愿者编号
                areaid: albx0021, // 服务区域
                projectId: albx0057, // 项目id
                volAreaId: this.userInfo.albp0020, // 志愿者服务区划分
                postid: albx0052, // 岗位id
                operatetype: 42,
              };
              this.utilscommit.requestapi(
                "getVolOperateProjectFortisWeb",
                params,
                this.refuseBack
              );
            }
          }
        );
      } else {
        this.$utilroutes.toLogin();
      }
    },
    // 拒绝加入项目回调
    refuseBack(result) {
      if (result) {
        if (result.data) {
          // this.$router.go(0); //刷新页面
          this.getList();
        } else {
          this.$swal(result.message, { buttons: "确定" });
        }
      } else {
        this.$swal("拒绝邀请失败", { buttons: "确定" });
      }
    },
    // 更换岗位获取岗位列表
    changeJob(albx0057, albx0021, albx0052) {
      if (this.userInfo) {
        let params = {
          albx0021,
          proId: albx0057,
        };
        this.utilscommit.requestapi(
          "ProjectPostFortisWeb",
          params,
          this.listJobsBack,
          { albx0052 }
        );
        $(".mask.job").addClass("active");
      } else {
        this.$utilroutes.toLogin();
      }
    },
    // 获取岗位列表回调
    listJobsBack(result, params) {
      if (result) {
        this.oldpostid = params.albx0052;
        this.jobList = result.data;
      }
    },
    // 更换岗位
    onChange() {
      if (this.userInfo) {
        if (this.jobCheck()) {
          if (this.oldpostid == this.job.id) {
            return this.$swal("更换的岗位和当前申请的岗位一致！", {
              buttons: "确定",
            });
          }
          // 获取项目服务区
          let areaid;
          this.projectList.map((item) => {
            if (item.albx0057 == this.job.albx0076) {
              areaid = item.albx0021;
            }
          });

          let params = {
            volunteerid: this.userInfo.albp0029, // 志愿者编号
            postid: this.oldpostid, // 旧岗位id
            newpostid: this.job.id, // 新岗位id
            volAreaId: this.userInfo.albp0020, // 志愿者服务区
            projectid: this.job.albx0076, // 项目id
            areaid, // 项目服务区
            operatetype: 11, // 更换岗位代码
          };
          this.utilscommit.requestapi(
            "getVolOperateProjectFortisWeb",
            params,
            this.updateJobBack
          );
        }
      }
    },
    // 更换岗位回调
    updateJobBack(result) {
      if (result && result.data) {
        this.$swal("更换岗位成功", { buttons: "确定" }).then((value) => {
          // Vue.$router.go(0); //刷新页面
          // 关闭弹窗，清空弹窗数据
          $(".mask.job").removeClass("active");
          this.oldpostid = "";
          this.jobList = "";
          // 重新请求待定列表
          this.getList();
        });
      } else {
        this.$swal("更换岗位失败", { buttons: "确定" });
      }
    },
    // 关闭更换岗位弹窗
    jobCloseMask() {
      $(".mask.job").removeClass("active");
      $(".form-error").html("");
      this.job = "";
    },
    // 校验更换岗位是否为空
    jobCheck() {
      var job = this.job;
      var tip = "";
      var flag = true;
      if (!job) {
        tip = "更换的岗位不能为空";
        flag = false;
      }
      this.formTip("job", tip);
      return flag;
    },
    // 删除申请
    deleteApplyOrg(albx0021, albx0057, albx0052) {
      if (this.userInfo) {
        this.$swal("确认删除申请？", { buttons: ["取消", "确定"] }).then(
          (value) => {
            if (value) {
              let params = {
                volunteerid: this.userInfo.albp0029, // 志愿者编号
                areaid: albx0021, // 服务区域
                projectId: albx0057, // 项目id
                volAreaId: this.userInfo.albp0020, // 志愿者服务区划分
                postid: albx0052, // 岗位id
                operatetype: 12,
              };
              this.utilscommit.requestapi(
                "getVolOperateProjectFortisWeb",
                params,
                this.deleteApplyBack
              );
            }
          }
        );
      } else {
        this.$utilroutes.toLogin();
      }
    },
    // 删除申请回调
    deleteApplyBack(result) {
      if (result && result.data) {
        this.getList();
        this.$swal("删除成功", { buttons: "确定" });
      } else {
        this.$swal("删除失败！", { buttons: "确定" });
      }
    },
    // 评价
    evaluate(projectId, orgId) {
      if (this.userInfo) {
        this.evaluateInfo.orgId = orgId;
        this.evaluateInfo.projectId = projectId;
        $(".mask.evaluate").addClass("active");
      } else {
        this.$utilroutes.toLogin();
      }
    },
    // 关闭评价弹窗
    evaluateCloseMask() {
      $(".mask.evaluate").removeClass("active");
      $(".form-error").html("");
    },
    // 提交评价
    onEvaluateSubmit() {
      if (this.row1 && this.row2 && this.row3 && this.content) {
        var data = {
          albx0502: this.evaluateInfo.orgId,
          albx0503: this.row1,
          albx0504: this.row2,
          albx0505: this.row3,
          albx0508: this.content,
          albx0509: this.evaluateInfo.projectId,
        };
        this.utilscommit.request(
          "nvsi_insertVolEvaluateProject",
          data,
          this.evaluateBack
        );
      } else {
        this.$swal("请评价", { buttons: "确定" });
      }
    },
    // 提交评价回调
    evaluateBack(result) {
      if (result && result.data) {
        this.$swal("评价成功", { buttons: "确定" }).then(function (value) {
          Vue.$router.go(0); //刷新页面
        });
      } else {
        this.$swal("评价失败", { buttons: "确定" });
      }
    },
    // 跳转时长列表
    toServiceTimeList() {
      this.$router.push({
        name: "myservicetime",
        params: { define: this.routeDefine },
      });
    },
    // 提示
    formTip(el, tip) {
      $("#" + el + "Tips")
        .html(tip)
        .css("color", "red");
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