// 志愿者已加入项目列表
<template>
  <div>
    <!-- 已加入项目 -->
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
        <th>加入时间</th>
        <th>岗位</th>
        <th>服务时长</th>
        <th>状态</th>
        <th>操作</th>
      </tr>
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
        <!-- 项目详情 -->
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
            @click="toProjectInfo(el.areaid, el.id)"
            :title="el.albx0002"
            class="pointer"
            v-if="
              el.albx0072 == 3 ||
                el.albx0072 == 4 ||
                el.albx0072 == 5 ||
                el.albx0072 == 6
            "
            >{{ el.albx0002 | ellipsis(16) }}</em
          >
          <em :title="el.albx0002" v-else style="color: #000">{{
            el.albx0002 | ellipsis(16)
          }}</em>
          <p>{{ el.albe0002 | ellipsis(18) }}</p>
        </td>
        <!-- 联系方式 -->
        <td class="left">
          <p>
            <span v-text="el.albx0025"></span>
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
        <!-- 加入时间 -->
        <td class="left">{{ el.albx0055 | ellipsisNos(10, "--") }}</td>
        <!-- 岗位 -->
        <td
          class="left"
          style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis"
          :title="el.gwmc"
        >
          {{ el.gwmc }}
        </td>
        <!-- 服务时长 -->
        <td class="left">
          <em @click="toServiceTimeList" class="pointer"
            >{{ el.albx0083 | addZero }}小时</em
          >
        </td>
        <!-- 状态 -->
        <td class="left"><i>已加入</i></td>
        <!-- 操作 -->
        <td class="left">
          <!-- <em
            v-if="el.albx0061 > 0 && (el.albx0072 == 5 || el.albx0072 == 6)"
            class="pointer"
            style="margin-right: 6px"
            @click="evaluate(el.id, el.albx0011, el.albx0021)"
            >评价</em
          > -->
          <em
            class="pointer"
            style="margin-right: 6px"
            @click="
              applyTime(
                el.areaid,
                el.albx0011,
                el.id,
                el.albx0004,
                el.albx0005,
                el.albx0062,
                el.albx0002,
                el.albx0072,
                el.albx0073
              )
            "
            >申请时长</em
          >
        </td>
      </tr>
    </table>

    <!-- 分页 -->
    <paging
      :pageCount="tolPage"
      :rangePage="pageSize"
      :initPage="pageNow"
      :totals="tolCount"
      :val="jumpPage"
      @pageEvent="pageEvent"
    >
    </paging>

    <!-- 申请时长 -->
    <div class="mask time">
      <form id="form">
        <div
          class="mask-info"
          style="width: 700px; max-height: 705px; margin-left: -350px"
        >
          <div class="mask-header row w">
            <div class="col v-m"><h2>申请时长</h2></div>
            <div class="col v-m t-r">
              <a
                href="javascript:void(0);"
                @click="timeCloseMask"
                class="mask-close"
                ><img src="../../assets/img/close.png" alt=""
              /></a>
            </div>
          </div>
          <div style="padding: 20px 50px 0 50px">
            <div class="form">
              <p
                class="form-label"
                style="
                  overflow: hidden;
                  white-space: nowrap;
                  text-overflow: ellipsis;
                "
                :title="projectName"
                v-text="'项目名称：' + projectName"
              ></p>
            </div>
            <div class="form">
              <p
                class="form-label"
                v-text="'已申请时长：' + appliedTime + '小时（审核中）'"
              ></p>
            </div>
            <div class="form">
              <p class="form-label"><em>*</em>活动开始时长：</p>
              <date-picker
                :lang="lang"
                type="datetime"
                valueType="format"
                default-value="Date"
                v-model="startTime"
                @close="getApplyStartTime()"
                style="width: 50%"
                placeholder="请输入活动开始时长"
                :disabled-date="common.notAfterToday"
              ></date-picker>
            </div>
            <span
              class="form-error"
              style="padding-left: 20px; font-size: 14px"
              id="startTimeTips"
            ></span>
            <div class="form">
              <p class="form-label"><em>*</em>活动结束时长：</p>
              <date-picker
                :lang="lang"
                type="datetime"
                valueType="format"
                default-value="Date"
                v-model="endTime"
                @close="getApplyEndTime()"
                style="width: 50%"
                placeholder="请输入活动结束时长"
                :not-before="new Date()"
              ></date-picker>
              <!-- :disabled-date="common.notAfterToday" -->
            </div>
            <span
              class="form-error"
              style="padding-left: 20px; font-size: 14px"
              id="endTimeTips"
            ></span>
            <div class="form">
              <p class="form-label"><em>*</em>时长：</p>
              <input
                type="text"
                v-model="applyInfo.applyTime"
                maxlength="5"
                placeholder="请输入时长"
                readonly
              />
              <span
                class="form-label"
                style="position: absolute; right: 10px; top: 40px"
                >小时</span
              >
            </div>
            <span
              class="form-error"
              style="padding-left: 20px; font-size: 14px"
              id="applyTimeTips"
            ></span>
            <div class="form">
              <p class="form-label">
                <em>*</em>备注：（如：2018-8-8上午8:00-9:00慰问养老院）
              </p>
              <input
                type="text"
                v-model="applyInfo.remarks"
                @blur="remarksCheck"
                maxlength="50"
                placeholder="请输入备注"
              />
            </div>
            <span
              class="form-error"
              style="padding-left: 20px; font-size: 14px"
              id="remarksTips"
            ></span>
          </div>
          <div class="form t-c">
            <a
              href="javascript:void(0);"
              class="button"
              :class="{ 'button-disabled': !isApply }"
              @click="onSubmitApply"
              >提交</a
            >
          </div>
        </div>
      </form>
    </div>

    <!-- 评价 -->
    <!-- <div class="mask evaluate">
      <div class="mask-info" style="width: 550px; margin-left: -275px">
        <div class="mask-header row w">
          <div class="col v-m"><h2>评价</h2></div>
          <div class="col v-m t-r">
            <a
              href="javascript:void(0);"
              @click="evaluateCloseMask"
              class="mask-close"
              ><img src="../../assets/img/close.png" alt=""
            /></a>
          </div>
        </div>
        <div class="satisfy">
          <em style="color: #f00">*</em><span>对项目开展培训的满意度：</span>
          <star :row="1" :starOn="starOn" :starOff="starOff"></star>
        </div>
        <div class="satisfy">
          <em style="color: #f00">*</em><span>与志愿团体合作的满意度：</span>
          <star :row="2" :starOn="starOn" :starOff="starOff"></star>
        </div>
        <div class="satisfy">
          <em style="color: #f00">*</em><span>项目执行与计划的满意度：</span>
          <star :row="3" :starOn="starOn" :starOff="starOff"></star>
        </div>
        <div class="form" style="padding-left: 0">
          <p class="form-label"><em style="color: #f00">*</em>评价内容：</p>
          <textarea
            class="textarea"
            rows="4"
            v-model="content"
            maxlength="200"
          ></textarea>
        </div>
        <div class="pt-10 t-c">
          <a
            href="javascript:void(0);"
            class="button"
            style="width: 200px"
            @click="onEvaluateSubmit"
            >保存评价</a
          >
        </div>
      </div>
    </div> -->

    <!-- 查看评价 -->
    <!-- <div class="mask showEvaluate">
      <div class="mask-info" style="width: 550px; margin-left: -275px">
        <div class="mask-header row w">
          <div class="col v-m"><h2>查看评价</h2></div>
          <div class="col v-m t-r">
            <a
              href="javascript:void(0);"
              @click="hideEvaCloseMask"
              class="mask-close"
              ><img src="../../assets/img/close.png" alt=""
            /></a>
          </div>
        </div>
        <div>
          <p><span>我对志愿团体的评价</span></p>
          <p class="satisfy">
            <span>对项目开展培训的满意度：</span
            ><star ref="showNum1" :starOn="starOn" :starOff="starOff"></star
            >
          </p>
          <p class="satisfy">
            <span>与志愿团体合作的满意度：</span
            ><star ref="showNum2" :starOn="starOn" :starOff="starOff"></star
            >
          </p>
          <p class="satisfy">
            <span>项目执行与计划的满意度：</span
            ><star ref="showNum3" :starOn="starOn" :starOff="starOff"></star
            >
          </p>
          <p class="satisfy">
            <span>评价内容：</span
            ><em class="c-danger">{{
              volEvaluateInfo && volEvaluateInfo.albx0508
            }}</em>
          </p>
        </div>
        <div>
          <p><span>志愿团体对我的评价</span></p>
          <p class="satisfy">
            <span>守时程度：</span
            ><star ref="showNum4" :starOn="starOn" :starOff="starOff"></star
            >
          </p>
          <p class="satisfy">
            <span>服务态度：</span
            ><star ref="showNum5" :starOn="starOn" :starOff="starOff"></star
            >
          </p>
          <p class="satisfy">
            <span>专业水平：</span
            ><star ref="showNum6" :starOn="starOn" :starOff="starOff"></star
            >
          </p>
          <p class="satisfy">
            <span>评价内容：</span
            ><em class="c-danger">{{
              orgEvaluateInfo && orgEvaluateInfo.albx0468
            }}</em>
          </p>
        </div>
      </div>
    </div> -->
  </div>
</template>

<script>
// 分页
const paging = () => import("@/components/page/paginationRed.vue");
// 星星
const star = () => import("@/view/home/star.vue");

import { mapGetters } from "vuex";
export default {
  components: {
    paging,
    star
  },
  data() {
    return {
      routeDefine: this.$route.params.define, // 站点路由参数
      projectList: [], // 项目列表
      // 申请时长参数
      appliedTime: "0.00", // 申请中的时长
      applyInfo: {}, // 申请时长的信息
      projectName: "", // 申请时长的项目名
      startTime: "", // 活动开始时间
      endTime: "", // 活动结束时间
      zxstartTime: "", // 项目真实开始时间
      zxendTime: "", // 项目真实结束时间
      timeDifference: 0.0, //时间差
      // 分页参数
      tolCount: 0, // 总条数
      tolPage: 0, // 总页数
      pageSize: 8, // 每页条数
      pageNow: 1, // 当前页
      jumpPage: 1,
      // 脱离项目参数
      lineProjectId: "", // 脱离项目id
      lineAreaid: "", // 脱离项目区划
      lineGroupId: "", // 脱离项目的队伍id
      lineJobId: "", // 脱离项目的岗位id
      lbx02id: "",
      // 评价
      evaluateInfo: {}, //评价信息
      row1: "0",
      row2: "0",
      row3: "0",
      content: "", // 评价内容
      starOn: require("../../assets/img/star.png"),
      starOff: require("../../assets/img/star1.png"),
      lang: {
        // 配置日期语音环境
        formatLocale: {
          firstDayOfWeek: 1
        },
        monthBeforeYear: false
      },
      queryStatus: 0, // 查询状态，0->查询中，1->查询结束
      isApply: true //是否可以点击提交时长申请按钮
    };
  },
  computed: {
    ...mapGetters({
      userInfo: "getUser", // 志愿者登录信息
      basicInfo: "getBasic" // 志愿者个人信息
    })
  },
  created() {
    this.getList();
  },
  methods: {
    // 分页
    pageEvent(e) {
      this.getList();
    },
    // 获取项目列表
    async getList() {
      // 查询状态重置
      this.projectList = [];
      this.queryStatus = 0;
      this.tolCount = 0;
      this.tolPage = 0;
      // 查询已加入项目列表
      let params = {
        cardno: this.userInfo.albp0005, // 用户加密身份证号
        albx0084: "B", // 项目状态
        pageNum: this.pageNow,
        pageSize: this.pageSize
      };
      let { data: res } = await this.utilscommit.asyncReq(
        "listVolMyProjectsFortisWeb",
        params
      );
      let { code, data } = res;
      if (code == 0 && data && data.data) {
        this.projectList = data.data;
        this.tolCount = res.totalCount;
        this.tolPage = res.pageCount;
      }
      this.queryStatus = 1;
    },
    // 跳转时长列表
    toServiceTimeList() {
      this.$router.push({
        name: "myservicetime",
        params: { define: this.routeDefine }
      });
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
            data2: data.data.id
          }
        });
      }
    },
    // 跳转到项目详情
    toProjectInfo(albx0021, albx0057) {
      let params = {
        albx0021: albx0021,
        proId: albx0057
      };
      this.utilscommit.requestapi(
        "getProjectInfoFortisWeb",
        params,
        ({ code, data }) => {
          if (code == 0 && data) {
            let { albx0072, albx0073 } = data;
            // 项目已停用
            if (albx0073 == 21) {
              return this.$swal("当前项目已停用！", { buttons: "确定" });
            }
            // 项目已作废
            if (albx0073 == 22) {
              return this.$swal("当前项目已作废！", { buttons: "确定" });
            }
            // 跳转项目详情
            this.$utilroutes.toProjectInfo(albx0057, albx0021);
          }
        }
      );
    },
    // 脱离项目
    outProject(groupId, projectId, areaid, jobid, lbx02id) {
      if (this.userInfo) {
        this.lineProjectId = projectId;
        this.lineAreaid = areaid;
        this.lbx02id = lbx02id;
        this.jobid = jobid;
        var data = {
          albx0522: groupId,
          albx0523: projectId
        };
        this.utilscommit.request(
          "nvsi_countHasSchedule",
          data,
          this.countScheduleBack
        );
      } else {
        this.$utilroutes.toLogin();
      }
    },
    // 脱离之前是否存在未完成的排班
    countScheduleBack(result) {
      if (result && result.data) {
        this.$swal("您还有未完成的排班，请联系项目负责人删除排班后再脱离", {
          buttons: "确定"
        });
        return;
      }
      this.$swal("确认脱离项目？", { buttons: ["取消", "确定"] }).then(function(
        value
      ) {
        if (value) {
          var data2 = {
            projectid: this.lineProjectId,
            areaid: this.lineAreaid,
            lbx02id: this.lbx02id,
            jobid: this.jobid
          };
          this.utilscommit.request(
            "nvsi_chostVolOutProject",
            data2,
            this.outOfProjectBack
          );
        }
      });
    },
    // 脱离项目回调
    outOfProjectBack(result) {
      if (result) {
        if (result.data) {
          this.$router.go(0); //刷新页面
        } else {
          this.$swal(result.message, { buttons: "确定" });
        }
      }
    },
    // 申请时长 areaid->项目所属区域 groupId->项目所属队伍id projectId->项目id albx0004->项目开始时间 albx0005->项目结束时间
    applyTime(
      areaid,
      groupId,
      projectId,
      albx0004,
      albx0005,
      albx0062,
      albx0002,
      albx0072,
      albx0073
    ) {
      if (this.userInfo) {
        if (albx0072 == 3) {
          // 未启动项目
          return this.$swal("该项目未启动！", { buttons: "确定" });
        }
        if (albx0072 == 7 || albx0072 == 9) {
          // 无效项目
          return this.$swal("该项目已停用！", { buttons: "确定" });
        }
        this.zxstartTime = albx0004; //项目真实开始时间
        this.zxendTime = albx0005; //项目真实结束时间
        // 查询志愿者已申请时长
        let params = {
          albx0021: areaid, // 项目所属区域
          albx0175: this.userInfo.albp0029, // 志愿者编号
          albx0176: projectId // 项目id
        };
        this.utilscommit.requestapi(
          "addTimeFortisWeb",
          params,
          this.countApplyTimeBack
        );
        this.applyInfo.projectId = projectId;
        this.applyInfo.areaid = areaid;
        this.projectName = albx0002;
        this.applyInfo.groupId = groupId;
        this.applyInfo.appllyTimeTeamName = albx0062;
        $(".mask.time").addClass("active");
      } else {
        this.$utilroutes.toLogin();
      }
    },
    // 查询志愿已申请时长回调
    countApplyTimeBack(res) {
      res.code == 0 && typeof res.data == "number"
        ? (this.appliedTime = res.data.toFixed(2))
        : "";
    },
    // 关闭申请时长弹窗
    timeCloseMask() {
      this.startTime = "";
      this.endTime = "";
      this.zxstartTime = "";
      this.zxendTime = "";
      this.applyInfo = {};
      this.projectName = "";
      this.appliedTime = "0.00";
      document.getElementById("form").reset();
      $(".mask.time").removeClass("active");
      $(".form-error").html("");
    },
    // 判断申请时长开始时间不为空
    getApplyStartTime() {
      if (!this.startTime) {
        this.formTip("startTime", "活动开始时间不能为空");
        return false;
      }
      this.formTip("startTime", "");
      this.getTimeNum();
      return true;
    },
    // 判断申请时长结束时间不为空
    getApplyEndTime() {
      if (!this.endTime) {
        this.formTip("endTime", "活动结束时间不能为空");
        return false;
      }
      this.formTip("endTime", "");
      this.getTimeNum();
      return true;
    },
    // 判断时长
    getTimeNum() {
      let startTime = new Date(this.startTime.replace(/\-/g, "/"));
      let endTime = new Date(this.endTime.replace(/\-/g, "/"));
      let zxstartTime = new Date(this.zxstartTime.replace(/\-/g, "/")); //项目真实开始时间
      let zxendTime = new Date(this.zxendTime.replace(/\-/g, "/")); //项目真实结束时间
      let TodayLastTime = new Date(
        this.startTime.substring(0, 10) + " 23:59:59.999"
      ); // 当天最后时长
      // 当前时间
      let now = new Date();
      if (startTime < zxstartTime) {
        // 判断开始时间是否超过项目开始时间
        this.startTime = "";
        return this.$swal("活动开始时间不能早于项目开始时间", {
          buttons: "确定"
        });
      } else if (startTime > zxendTime) {
        // 判断开始时间是否超过项目结束时间
        this.startTime = "";
        return this.$swal("活动开始时间不能晚于项目结束时间", {
          buttons: "确定"
        });
      } else if (startTime > now) {
        // 判断开始时间是否超出当前时间
        this.startTime = "";
        return this.$swal("活动开始时间不能晚于当前时间", {
          buttons: "确定"
        });
      } else if (endTime < startTime) {
        // 判断结束时间是否早于活动开始时间
        this.endTime = "";
        return this.$swal("活动结束时间不能早于活动开始时间", {
          buttons: "确定"
        });
      } else if (endTime > TodayLastTime) {
        // 判断活动结束时间是否超过活动开始当天
        this.endTime = "";
        return this.$swal("活动结束时间必须在当天内", { buttons: "确定" });
      } else if (endTime > now) {
        // 判断结束时间是否超出当前时间
        this.endTime = "";
        return this.$swal("活动结束时间不能晚于当前时间", {
          buttons: "确定"
        });
      }
      let timeDifference = endTime - startTime; //时长差
      if (timeDifference < 60000) {
        this.endTime = "";
        return this.$swal("时长不能小于1分钟", { buttons: "确定" });
      } else if (timeDifference > 86400000) {
        this.endTime = "";
        return this.$swal("活动时间间隔不能大于24小时", { buttons: "确定" });
      }
      if (this.startTime && this.endTime) {
        this.$set(
          this.applyInfo,
          "applyTime",
          (timeDifference / (1000 * 3600)).toFixed(2) + ""
        );
      }
    },
    getApplyTimeBack(data) {
      if (data) {
        if (data.data) {
          this.$swal("录入时长与已生效的时长存在重复，请核实后重试！", {
            buttons: "确定"
          });
          this.timeDifference = 0.0;
        } else {
          this.timeDifference = this.timeDifference / (1000 * 3600);
          this.$set(
            this.applyInfo,
            "applyTime",
            this.timeDifference.toFixed(2) + ""
          );
        }
      }
    },
    // 申请的时长校验
    applyTimeCheck() {
      var applyTime = this.applyInfo.applyTime;
      var tip = "";
      var flag = true;
      if (!applyTime) {
        tip = "申请时长不能为空";
        flag = false;
      }
      this.formTip("applyTime", tip);
      return flag;
    },
    // 备注校验
    remarksCheck() {
      var remarks = this.applyInfo.remarks;
      var tip = "";
      var flag = true;
      if (!remarks) {
        tip = "备注不能为空";
        flag = false;
      }
      this.formTip("remarks", tip);
      return flag;
    },
    // 确认申请时长
    async onSubmitApply() {
      if (this.userInfo) {
        if (
          this.getApplyStartTime() &&
          this.getApplyEndTime() &&
          this.applyTimeCheck() &&
          this.remarksCheck() &&
          this.isApply
        ) {
          let params = {
            albx0172: this.applyInfo.applyTime, // 申请时长
            start: this.startTime, // 开始时长
            end: this.endTime, // 结束时长
            albx0175: this.userInfo.albp0029, // 志愿者编号
            albx0176: this.applyInfo.projectId, // 项目id
            albx0177: this.applyInfo.groupId, // 队伍id
            name: this.userInfo.albp0003, // 志愿者姓名
            cardno: this.userInfo.albp0005, // 志愿者身份证号
            albx0021: this.applyInfo.areaid, // 项目服务区域
            albx0062: this.applyInfo.appllyTimeTeamName, // 项目队伍名称
            type: 2,
            bz: this.applyInfo.remarks // 备注
          };
          this.isApply = false;
          let { data: res } = await this.utilscommit.asyncReq(
            "addTimeBeforeFortisWebService",
            {
              list: params
            }
          );
          // 该志愿者存在APP未签退时长，判断和当前项目申请时长是否存在交集
          if (
            res.code == 0 &&
            res.data.length &&
            res.data.filter(item => Boolean(item)).length
          ) {
            let { albx0181, albx0182 } = res.data[0];
            albx0181 = new Date(albx0181).getTime();
            albx0182 = new Date(albx0182).getTime();
            let startTime = new Date(this.startTime).getTime();
            let endTime = new Date(this.endTime).getTime();
            if (
              (startTime > albx0181 && startTime < albx0182) ||
              (endTime > albx0181 && endTime < albx0182) ||
              (startTime < albx0181 && endTime > albx0182)
            ) {
              this.isApply = true;
              return this.$swal(
                `您在${res.data[0].albx0181}~${res.data[0].albx0182}时间段未签退，暂不能录入该时间段的时长`
              );
            }
          }
          // 申请时长
          this.utilscommit.requestapi(
            "addTimeFortisWebService",
            { list: params },
            this.applyTimeBack
          );
        }
      } else {
        this.$utilroutes.toLogin();
      }
    },
    // 确认申请时长回调
    applyTimeBack(result) {
      this.isApply = true;
      if (result) {
        if (result.code == 0 && result.data) {
          this.$swal("申请成功", { buttons: "确定" }).then(function(value) {
            Vues.$router.go(0); //刷新页面
          });
        } else {
          this.$swal(result.message, { buttons: "确定" });
        }
      }
    },
    // 提示
    formTip(el, tip) {
      $("#" + el + "Tips")
        .html(tip)
        .css("color", "red");
    }
  }
};
</script>

<style lang="css" scoped>
.user-table th {
  text-align: left;
  padding: 10px;
}
.button-disabled {
  background: #999;
}
</style>
