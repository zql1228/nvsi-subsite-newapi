<template>
  <li class="col v-t white tab-container">
    <div class="tabbar tabbar-tight mb-20">
      <span class="active">下载证明</span>
    </div>
    <div class="grid g-width">
      <div class="grid-item g-12" style="padding-right: 10px">
        <div class="form">
          <p class="form-label">服务区域：</p>
          <div class="row w">
            <div class="col v-m">
              <input
                type="text"
                id="serviceArea"
                v-model="quyxswb"
                readonly
                placeholder="请选择服务区域"
                style="width: 300px"
              />
            </div>
            <div class="col v-m pl-10" style="width: 90px">
              <a
                href="javascript:void(0);"
                id="chooseServiceArea"
                @click="chooseServiceArea"
                class="button button-line"
                >选择</a
              >
            </div>
          </div>
        </div>
        <div class="form">
          <p class="form-label">服务队伍：</p>
          <input
            type="text"
            placeholder="请输入"
            v-model="groupname"
            style="width: 407px"
          />
        </div>
        <div class="form">
          <p class="form-label">服务项目：</p>
          <input
            type="text"
            placeholder="请输入"
            v-model="projectname"
            style="width: 407px"
          />
        </div>
      </div>
      <div class="grid-item g-12" style="padding-left: 10px">
        <div class="form">
          <p class="form-label">服务类别：</p>
          <div class="select" id="type_div" style="width: 407px">
            <select
              v-model="servicetype"
              :style="servicetype == '' && 'color:#C4C4C4;'"
            >
              <option value="">请选择</option>
              <option
                v-for="(el, index) in serviceTypeList"
                :key="index"
                :value="el.codeid"
              >
                {{ el.codevalue }}
              </option>
            </select>
          </div>
        </div>
        <div class="form">
          <p class="form-label">时间范围:</p>
          <date-picker
            style="width: 200px; margin-left: 5px"
            :lang="lang"
            v-model="starttime"
            valueType="format"
            placeholder="开始日期"
          ></date-picker>
          <div class="henxian"></div>
          <date-picker
            style="width: 200px"
            :lang="lang"
            v-model="endtime"
            valueType="format"
            placeholder="结束日期"
          ></date-picker>
        </div>
        <div
          style="
            font-size: 13px;
            line-height: 40px;
            padding-left: 93px;
            color: #c4c4c4;
          "
        >
          筛选加入日期在这个时间范围内的项目
        </div>
        <div
          class="form"
          style="
            flex-direction: row-reverse;
            margin-top: 0;
            padding-top: 0;
            align-items: flex-start;
          "
        >
          <div class="col v-m pl-10" style="width: 90px">
            <a
              href="javascript:void(0);"
              class="button button-line"
              style="
                color: #fff;
                background: #e60012;
                border: 1px solid #cc0000;
              "
              @click="download"
              >查询项目</a
            >
          </div>
          <div class="col v-m pl-10" style="width: 90px">
            <a
              href="javascript:void(0);"
              class="button button-line"
              style="color: #999; border: 1px solid #999"
              @click="reset"
              >重置</a
            >
          </div>
        </div>
      </div>
    </div>
    <div class="biaqtanx">
      <div class="tabbar-tips" style="margin-bottom: 2px">
        <p>
          <em>注：</em
          >下方列表默认展示您所参与所有(拥有时长)的项目,可以通过上方条件查询您想要下载的项目
        </p>
      </div>
      <div>
        <a
          href="javascript:void(0);"
          :class="!isClick ? 'disabled-button' : 'button'"
          style="padding: 0 10px"
          @click="downloadPDF"
        >
          <img src="../../assets/img/xizbingzn.png" alt="" /> 生成并下载证明</a
        >
      </div>
    </div>
    <div class="tabbar-down">
      <table class="user-table">
        <colgroup>
          <col width="24%" />
          <col width="24%" />
          <col width="18%" />
          <col width="18%" />
          <col width="16%" />
        </colgroup>
        <tr>
          <th>服务项目名称</th>
          <th>服务队伍名称</th>
          <th>服务区域</th>
          <th>加入时间</th>
          <th>服务时长</th>
        </tr>
        <tr v-show="!xiangmlb.length && queryStatus == 1">
          <td
            colspan="6"
            style="text-align: center; border-bottom: 1px #f6f3f7"
          >
            <img src="../../assets/img/js-wujilu.png" />
          </td>
        </tr>
        <tr v-show="!xiangmlb.length && queryStatus == 0">
          <td
            colspan="6"
            style="text-align: center; border-bottom: 1px #f6f3f7"
          >
            <img src="@/assets/img/loader.png" style="margin-right: 5px" /><span
              style="font-size: 16px; color: #666666; vertical-align: middle"
              >加载中...</span
            >
          </td>
        </tr>
        <tr v-for="(el, index) in xiangmlb" :key="index">
          <td class="left">
            <em
              class="pointer"
              @click="$utilroutes.toProjectInfo(el.id, el.areaid)"
              v-if="el.albx0072 == 3 || el.albx0072 == 4 || el.albx0072 == 5"
              >{{ el.albx0002 }}</em
            >
            <em v-else class="pointer" style="color: #333; cursor: default">{{
              el.albx0002
            }}</em>
          </td>
          <td class="left">{{ el.albx0062 }}</td>
          <td class="left">{{ el.albx0021 }}</td>
          <td class="left">{{ el.albx0055 | ellipsisNos(10) }}</td>
          <td class="left">{{ addZero(el.albx0083) + "小时" }}</td>
        </tr>
      </table>

      <cpaginate
        :pageCount="tolPage"
        :rangePage="pageSize"
        :initPage="pageNow"
        :totals="tolCount"
        :val="jumpPage"
        @pageEvent="pageEvent"
      >
      </cpaginate>
    </div>
    <!--区域选择弹窗-->
    <div class="mask area">
      <div class="mask-info">
        <div class="mask-header row w">
          <div class="col v-m">
            <h2>服务区域</h2>
          </div>
          <div class="col v-m t-r">
            <a href="javascript:void(0);" @click="closeMask" class="mask-close"
              ><img src="../../assets/img/close.png" alt=""
            /></a>
          </div>
        </div>
        <areaDialog ref="areaDialog"></areaDialog>
      </div>
    </div>
    <a href="" ref="download" download></a>
  </li>
</template>

<script>
const AreaDialog = () => import("@/view/home/area.vue"); //区域弹出层
const cpaginate = () => import("@/components/page/paginationRed.vue"); //分页
import { getCodeList } from "../../assets/js/getCodevalueList";
export default {
  components: { AreaDialog, cpaginate },
  data() {
    return {
      lang: {
        //配置日期语音环境
        formatLocale: {
          firstDayOfWeek: 1
        },
        monthBeforeYear: false
      },
      userInfo: this.$store.getters.getUser,
      // projectList:[],
      projectname: "", //项目名
      // orgList:[],
      groupname: "", //团体名
      serviceTypeList: [],
      servicetype: "",
      starttime: "", //开始时间
      endtime: "", //结束时间
      serviceareaid: "", //区域id
      quyxswb: "", //区域的文本内容
      xiangmlb: [], //项目列表
      tolCount: 0, //总条数
      tolPage: 0, //总页数
      pageSize: 10, //每页条数
      pageNow: 1, //当前页
      jumpPage: 1, //记录输入框中的值
      queryStatus: 0, // 查询状态 0->查询中，1->查询完成
      isClick: false, // 下载是否可以点击
      params: {} // 下载之前查询全部记录参数
    };
  },
  created() {
    this.download();
    // 查询服务类型
    // this.utilscommit.requestapi(
    //   "getAllCodeWeb",
    //   { codeTypeName: "lbe05", areaId: this.$store.getters.getArea.areaid },
    //   this.listTypeBack
    // );
    this.listTypeBack();
  },
  methods: {
    listTypeBack() {
      getCodeList("getAllCodeWeb", "lbe05", {
        codeTypeName: "lbe05",
        areaId: this.$store.getters.getArea.areaid
      }).then(res => {
        this.serviceTypeList = res;
      });
    },
    chooseServiceArea() {
      // 打开选择区域的弹出框并初始化数据
      $("#preButton").css("display", "none");
      $(".category__content").css("display", "none");
      $("#first").css("display", "");
      $(".mask.area").addClass("active");
      this.$refs.areaDialog.preAreaId = "";
      this.$refs.areaDialog.preName = "";
      this.$refs.areaDialog.listArea(this.areaid, 0);
    },
    confirmArea(areaid) {
      if (areaid) {
        this.serviceareaid = areaid;
        this.utilscommit.requestapi(
          "areaFullInfo",
          { areaid: areaid },
          this.areaBack
        );
      }
    },
    areaBack(result) {
      if (result && result.fullname) {
        let areaInfo = result.fullname.split(">");
        var provinceName = areaInfo[0] ? areaInfo[0] : "";
        var cityName = areaInfo[1] ? ">" + areaInfo[1] : "";
        var countyName = areaInfo[2] ? ">" + areaInfo[2] : "";
        var streetName = areaInfo[3] ? ">" + areaInfo[3] : "";
        this.quyxswb = provinceName + cityName + countyName + streetName;
      } else {
        this.quyxswb = "";
      }
    },
    closeMask() {
      //弹出框清除选择的信息
      $(".mask").removeClass("active");
      $("#first").css("display", "");
      $(".category__item").removeClass("active");
      this.$refs.areaDialog.chooseArea = "";
      this.$refs.areaDialog.preAreaId = "";
      this.$refs.areaDialog.preName = "";
    },
    pageEvent(e) {
      //分页
      this.download();
    },
    download() {
      // 变更查询状态
      this.queryStatus = 0;
      this.xiangmlb = [];
      this.isClick = false;
      let params = {
        cardno: this.utilscommit.getDecrypt(this.userInfo.albp0005), // 志愿者证件号
        pageNum: this.pageNow,
        pageSize: this.pageSize,
        albx0061: 1 // 只查询时长大于0的数据
      };
      // 队伍名称
      this.groupname ? (params.teamname = this.groupname) : "";
      // 项目名称
      this.projectname ? (params.proname = this.projectname) : "";
      // 服务区域
      this.serviceareaid ? (params.proarea = this.serviceareaid) : "";
      // 服务类别
      this.servicetype ? (params.albx0009 = this.servicetype) : "";
      // 结束查询时间
      this.endtime ? (params.maxtime = this.endtime) : "";
      // 开始查询时间
      this.starttime ? (params.mintime = this.starttime) : "";
      this.params = params;
      this.utilscommit.requestapi(
        "getVolunteerProjectOnWeb",
        params,
        this.downloadBack
      );
    },
    async downloadBack(result) {
      if (result.code == 0 && result.data.data) {
        // #region 获取项目状态
        // for (let i = 0; i < result.data.data.length; i++) {
        //   let params = {
        //     albx0021: result.data.data[i].albx0021,
        //     proId: result.data.data[i].albx0057,
        //   };
        //   let { data: res } = await this.utilscommit.asyncReq(
        //     "getProjectInfoFortisWeb",
        //     params
        //   );
        //   if (res.code == 0 && res.data) {
        //     result.data.data[i].albx0072A = res.data.albx0072;
        //     result.data.data[i].albx0073A = res.data.albx0073;
        //   } else {
        //     result.data.data[i].albx0072A = "";
        //     result.data.data[i].albx0073A = "";
        //   }
        // }
        //#endregion
        this.tolPage = result.pageCount;
        this.tolCount = result.totalCount;
        this.xiangmlb = result.data.data;
        this.queryStatus = 1;
      } else {
        this.tolCount = 0;
        this.queryStatus = 1;
      }
      this.isClick = true;
    },
    async downloadPDF() {
      if (!this.isClick) {
        return false;
      }
      this.isClick = false;
      // 获取志愿者所有时长记录
      let {
        data: { code, data }
      } = await this.utilscommit.asyncReq("getVolunteerProjectPdfWeb", {
        ...this.params
      });
      if (code != 0 || !data.data) {
        return this.$swal("无服务时长,无法生成证明", { buttons: "确定" });
      }
      // 根据所有时长记录打印服务证明
      let list = data.data.map(item => {
        return {
          albx0002: item.albx0002,
          albx0062: item.albx0062,
          albx0083: item.albx0083,
          albx0012: item.areaid
        };
      });
      let params = {
        volnum: this.userInfo.albp0029, // 志愿者编号
        cardno: this.userInfo.albp0005, // 志愿者证件号
        areaid: this.userInfo.albp0020, // 志愿者服务区域
        projectlist: list
      };
      this.utilscommit.requestapi(
        "nvsi_getVolServicePDF2Web",
        params,
        this.printReport
      );
    },
    printReport(result) {
      if (result) {
        if (result.code == 0 && result.data) {
          this.$refs.download.href = result.data;
          this.$refs.download.click();
        } else {
          this.$swal(result.message, { buttons: "确定" });
        }
      }
      this.isClick = true;
    },
    reset() {
      //清空输入内容
      this.endtime = "";
      this.starttime = "";
      this.servicetype = "";
      this.projectname = "";
      this.groupname = "";
      this.quyxswb = "";
      this.serviceareaid = "";
      this.xiangmlb = {};
      this.$refs.areaDialog.preAreaId = ""; //清除点击的区域id
      this.$refs.areaDialog.preName = ""; //清除点击的区域名
      this.$refs.areaDialog.listArea(this.areaid, 0);
      this.tolCount = 0;
      this.download();
    }
  }
};
</script>

<style scoped>
.form {
  margin: 10px 0 0 20px;
  display: flex;
}
.disabled-button {
  display: inline-block;
  font-size: 14px;
  color: #fff;
  background: #9e9b9b;
  height: 40px;
  line-height: 40px;
  border-radius: 4px;
  text-align: center;
  box-sizing: border-box;
  transition: 0.3s;
  white-space: nowrap;
  outline: none;
  cursor: pointer;
}
.form-label {
  width: 70px;
  height: 19px;
  font-size: 14px;
  font-family: Microsoft YaHei;
  font-weight: bold;
  line-height: 24px;
  color: #333333;
  opacity: 1;
  margin: 0;
  line-height: 40px;
}
.henxian {
  margin: 20px 7px 0 7px;
  width: 12px;
  height: 0px;
  border: 1px solid #707070;
  opacity: 1;
}
.biaqtanx {
  display: flex;
  justify-content: space-between;
  margin: 40px 0 0 0;
}
.user-table th {
  text-align: left;
  padding-left: 10px;
}
.left {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
select > option {
  color: #333333 !important;
}
</style>
