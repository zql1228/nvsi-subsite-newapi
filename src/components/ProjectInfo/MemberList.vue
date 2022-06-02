// 项目详情/报名信息
<template>
  <div>
    <table class="table-list">
      <colgroup>
        <col width="15%" />
        <col width="30%" />
        <col width="20%" />
        <col width="20%" />
        <col width="15%" />
      </colgroup>
      <tbody>
        <tr>
          <th>姓名</th>
          <th>岗位</th>
          <th>服务时长</th>
          <th>报名时间</th>
          <th>操作</th>
        </tr>
        <tr v-if="!memberList.length">
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
        <tr v-for="el in memberList" :key="el.id">
          <td class="left">
            <i
              class="c-danger pointer name_color"
              :title="el.albp0003"
              @click="$utilroutes.toUserInfo(el.albp0005, el.albp0020)"
              >{{ el.albp0003 }}</i
            >
          </td>
          <td class="left">{{ el.albx0072 }}</td>
          <td class="left">{{ el.albx0083 | addZero }}小时</td>
          <td class="left">{{ el.albx0056 | ellipsisNos(10) }}</td>
          <!-- 投诉操作 -->
          <td class="left">
            <a
              href="javascript:void(0);"
              class="c-danger"
              @click="showComplain(el.albp0029, el.albp0003, el.albx0053)"
              >我要投诉</a
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

    <!-- 志愿者投诉 -->
    <div class="mask complain">
      <div
        class="mask-info"
        style="width: 700px; max-height: 705px; margin-left: -350px; top: 50%"
      >
        <div class="mask-header row w">
          <div class="col v-m"><h2>我要投诉</h2></div>
          <div class="col v-m t-r">
            <a
              href="javascript:void(0);"
              @click="closeComplain"
              class="mask-close"
              ><img src="../../assets/img/close.png" alt=""
            /></a>
          </div>
        </div>
        <ul class="grid" style="margin-top: 10px">
          <li class="grid-item g-12">
            <div class="form">
              <p class="form-label"><em>*</em>被投诉对象：</p>
              <input
                :value="objname"
                readonly
                style="height: 42px !important"
              />
            </div>
            <span
              class="form-error"
              style="padding: 5px 0 0 20px"
              id="objTips"
              placeholder="请输入被投诉对象"
            ></span>
          </li>
          <li class="grid-item g-12">
            <div class="form">
              <p class="form-label"><em>*</em>投诉人姓名：</p>
              <input
                type="text"
                v-model="name"
                @blur="nameCheck"
                maxlength="20"
                placeholder="请输入投诉人姓名"
              />
            </div>
            <span
              class="form-error"
              style="padding: 5px 0 0 20px; height: 17px; color: red"
              id="nameTips"
            ></span>
          </li>
          <li class="grid-item g-24">
            <div class="form">
              <p class="form-label"><em>*</em>投诉内容：</p>
              <textarea
                rows="2"
                v-model="content"
                @blur="contentCheck"
                maxlength="100"
                class="form_textarea"
                placeholder="请输入投诉内容"
              ></textarea>
            </div>
            <span
              class="form-error"
              style="padding: 5px 0 0 20px; height: 17px; color: red"
              id="contentTips"
            ></span>
          </li>
          <li class="grid-item g-12">
            <div class="form">
              <p class="form-label"><em>*</em>投诉人身份证号码：</p>
              <input
                type="text"
                v-model="card"
                @blur="cardCheck"
                maxlength="18"
                placeholder="请输入投诉人身份证号码"
              />
            </div>
            <span
              class="form-error"
              style="padding: 5px 0 0 20px; height: 17px; color: red"
              id="cardTips"
            ></span>
          </li>
          <li class="grid-item g-12">
            <div class="form">
              <p class="form-label"><em>*</em>投诉人手机号码：</p>
              <input
                type="text"
                v-model="phone"
                @blur="phoneCheck"
                maxlength="11"
                placeholder="请输入投诉人手机号码"
              />
            </div>
            <span
              class="form-error"
              style="padding: 5px 0 0 20px; height: 17px; color: red"
              id="phoneTips"
            ></span>
          </li>
          <li class="grid-item g-12">
            <div class="form">
              <p class="form-label"><em>*</em>图文验证码：</p>
              <div class="row w" style="display: inline-table">
                <div class="col v-m">
                  <input
                    type="text"
                    id="inputImgCode"
                    v-model="imgcode"
                    maxlength="4"
                    @blur="imgCodeCheck"
                    placeholder="请输入图文验证码"
                  />
                </div>
                <div
                  class="col v-m pl-10"
                  style="width: 130px"
                  @click="changeImgCode"
                >
                  <img
                    id="reg_image"
                    class="button button-line"
                    style="width: 100%; padding: 1px 1px 2px 5px"
                  />
                </div>
              </div>
            </div>
            <span
              class="form-error"
              style="padding: 5px 0 0 20px; height: 17px; color: red"
              id="imgCodeTips"
            ></span>
          </li>
        </ul>
        <div class="form t-c">
          <a
            href="javascript:void(0);"
            class="button"
            style="margin-top: 5px"
            @click="onSubmit"
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
      routeDefine: this.$route.params.define, // 路由
      areaid: this.$route.params.data2, // 项目区域id
      projectId: this.$route.params.data1, // 项目id
      memberList: [], // 成员列表
      // 分页参数
      tolCount: 0, //总条数
      tolPage: 0, //总页数
      pageSize: 8, //每页条数
      pageNow: 1, //当前页
      jumpPage: 1,
      queryStatus: 0,
      // 投诉参数
      objname: "", // 被投诉志愿者姓名
      obj: "", // 被投诉对象id
      reporterNum: "", // 被投诉志愿者编号
      content: "", // 投诉内容
      name: "", // 投诉人姓名
      card: "", // 投诉人证件号
      phone: "", // 投诉人手机号
      imgkey: "", // 图片验证码key
      imgcode: "", // 图片验证码
      imgCodeFlag: false,
    };
  },
  created() {
    this.getList();
  },
  methods: {
    // 获取成员列表
    async getList() {
      // 查询状态初始化
      this.memberList = [];
      this.queryStatus = 0;
      this.tolCount = 0;
      this.tolPage = 0;
      let params = {
        areaid: this.areaid,
        proId: this.projectId,
        albx0084: "B",
        pageNum: this.pageNow,
        pageSize: this.pageSize,
      };
      let { data: res } = await this.utilscommit.asyncReq(
        "volSignUpProjectListFortisWeb",
        params
      );
      if (res.code == 0 && res.data) {
        this.memberList = res.data;
        this.common.getTolData(this, res);
      }
      this.queryStatus = 1;
    },
    // 分页
    pageEvent(e) {
      this.getList();
    },
    // 显示投诉弹窗
    showComplain(id, name, albx0053) {
      this.objname = name;
      this.obj = id;
      this.reporterNum = albx0053;
      this.changeImgCode();
      $(".mask.complain").addClass("active");
    },
    // 投诉内容校验
    contentCheck() {
      var tip = "";
      var flag = true;
      if (!this.content) {
        tip = "投诉内容不能为空";
        flag = false;
      }
      this.formTip("content", tip);
      return flag;
    },
    // 投诉人姓名校验
    nameCheck() {
      var tip = "";
      var flag = true;
      if (!this.name) {
        tip = "投诉人姓名不能为空";
        flag = false;
      }
      this.formTip("name", tip);
      return flag;
    },
    // 投诉人证件号校验
    cardCheck() {
      var tip = "";
      var flag = true;
      if (!this.card) {
        tip = "身份证号码不能为空";
        flag = false;
      } else if (!this.common.checkCardNo(this.card)) {
        tip = "请填写正确的身份证号码";
        flag = false;
      }
      this.formTip("card", tip);
      return flag;
    },
    // 投诉人手机号校验
    phoneCheck() {
      var tip = "";
      var flag = true;
      if (!this.phone) {
        tip = "手机号码不能为空";
        flag = false;
      } else if (!this.common.checkPhoneno(this.phone)) {
        tip = "请填写正确的手机号码";
        flag = false;
      }
      this.formTip("phone", tip);
      return flag;
    },
    // 获取图片验证码
    async changeImgCode() {
      $("#inputImgCode").val("");
      let { data: res } = await this.utilscommit.asyncReq(
        "getImageCodeFortisWeb",
        null
      );
      if (res.code == 0 && res.data) {
        $("#reg_image").attr("src", res.data.img);
        this.imgkey = res.data.imgkey;
      }
    },
    // 图片验证码校验
    imgCodeCheck() {
      var el = $("#inputImgCode");
      this.tip = "";
      this.type = 1;
      var flag = true;
      var code = el.val();
      if (!code) {
        this.tip = "图文验证码不能为空";
        this.type = 2;
        flag = false;
      }
      if (!flag && this.status == 1) {
        el.focus();
        this.status = 0;
      }
      this.formTip("imgCode", this.tip, this.type);
    },
    // 关闭投诉
    closeComplain() {
      $(".mask.complain").removeClass("active");
      $(".form-error").html("");
      this.objname =
        this.obj =
        this.content =
        this.name =
        this.card =
        this.phone =
        this.imgcode =
        this.code =
          "";
    },
    // 提交投诉
    onSubmit() {
      if (
        this.contentCheck() &&
        this.nameCheck() &&
        this.cardCheck() &&
        this.phoneCheck() &&
        this.imgCodeCheck()
      ) {
        let params = {
          bname: this.objname, // 被举报者姓名
          name: this.name, // 举报者姓名
          content: this.content, // 举报内容
          cardno: this.card, // 身份证
          phone: this.phone, // 手机号
          type: 3, // 举报类型
          ttt: 3, // 操作者类型
          albx0347: this.reporterNum, // 志愿者编号
          areaid: this.areaid, // 区域id
          groupid: this.projectInfo.albx0011, // 当前项目所属队伍id
        };
        // this.utilscommit.request(
        //   "nvsi_insertComplain",
        //   data,
        //    (result) => {
        //     if (result) {
        //       if (result.data) {
        //         Vues.closeComplain();
        //         Vues.$swal("投诉提交成功", { buttons: "确定" });
        //       } else {
        //         Vues.$swal(result.message, { buttons: "确定" }).then(() => {
        //           Vues.changeImgCode();
        //         });
        //       }
        //     }
        //   }
        // );
      }
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

<style>
@import "../../assets/css/base.css";
@import "../../assets/css/main.css";
.table-list th {
  text-align: left;
}
</style>