<template>
  <li class="col v-t white tab-container">
    <div class="tabbar tabbar-tight mb-30">
      <span class="col v-m active">记录转移</span>
    </div>
    <div class="grid g-16 auto">
      <div class="grid-item g-8 v-m" style="width: 31.33%">
        <div class="form">
          <p class="form-label">省／直辖市：</p>
          <input type="text" v-model="first" readonly />
        </div>
        <div class="form">
          <p class="form-label">市／区：</p>
          <input type="text" v-model="second" readonly />
        </div>
        <div class="form">
          <p class="form-label">县／街道：</p>
          <input type="text" v-model="third" readonly />
        </div>
        <div class="form">
          <p class="form-label">乡镇／社区：</p>
          <input type="text" v-model="fourth" readonly />
        </div>
      </div>
      <div class="grid-item v-m pl-30 pr-30">
        <span class="form-label"><i>=></i></span>
        <a href="javascript:void(0);" class="button" style="margin: 0 10px" @click="onTransfer">立即转移</a>
        <span class="form-label"><i>=></i></span>
      </div>
      <div class="grid-item g-8 v-m" style="width: 31.33%">
        <div class="form">
          <p class="form-label"><em>*</em>省／直辖市：</p>
          <div class="select">
            <select name="first" v-model="firstSelect">
              <option value="0">请选择</option>
              <option v-for="(el, index) in firstList" :key="index" :value="el.areaid">
                {{ el.areaname }}
              </option>
            </select>
          </div>
        </div>
        <div class="form">
          <p class="form-label"><em>*</em>市／区：</p>
          <div class="select">
            <select name="second" v-model="secondSelect">
              <option value="0">请选择</option>
              <option v-for="(el, index) in this.secondList" :key="index" :value="el.areaid">
                {{ el.areaname }}
              </option>
            </select>
          </div>
        </div>
        <div class="form">
          <p class="form-label">
            <em v-show="
                firstSelect != '120000000000000000' &&
                  firstSelect != '310000000000000000' &&
                  firstSelect != '500000000000000000'
              ">*</em><span>县／街道：</span>
          </p>
          <div class="select">
            <select name="third" v-model="thirdSelect">
              <option value="0">请选择</option>
              <option v-for="(el, index) in thirdList" :value="el.areaid" :key="index">
                {{ el.areaname }}
              </option>
            </select>
          </div>
        </div>
        <div class="form">
          <p class="form-label">乡镇／社区：</p>
          <div class="select">
            <select name="fourth" v-model="fourthSelect">
              <option value="0">请选择</option>
              <option v-for="(el, index) in fourthList" :key="index" :value="el.areaid">
                {{ el.areaname }}
              </option>
            </select>
          </div>
        </div>
      </div>
    </div>
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
      userInfo: this.$store.getters.getUser, // 志愿者信息
      firstList: {},
      firstSelect: "0", //新区域
      secondList: {},
      secondSelect: "0",
      thirdList: {},
      thirdSelect: "0",
      fourthList: {},
      fourthSelect: "0",
      newareaid: "",
      first: "", //旧区域
      second: "",
      third: "",
      fourth: ""
    };
  },
  created() {
    window.Vues = this; //主体vue实例挂载
    this.utilscommit.requestapi(
      "areaFullInfo",
      { areaid: this.basicInfo.albp0020 },
      this.fullNameBack
    );
  },
  methods: {
    fullNameBack(result) {
      if (result && result.fullname) {
        let areaInfo = result.fullname.split(">");
        this.first = areaInfo[0] ? areaInfo[0] : "";
        this.second = areaInfo[1] ? areaInfo[1] : "";
        this.third = areaInfo[2] ? areaInfo[2] : "";
        this.fourth = areaInfo[3] ? areaInfo[3] : "";
        this.utilscommit.requestapi(
          "getNextAreaListFortisWeb",
          { areaid: null },
          this.firstListBack
        );
      }
    },
    onTransfer() {
      //天津120000000000000000 北京110000000000000000 上海310000000000000000 重庆310000000000000000
      //console.log(this.firstSelect,this.secondSelect,this.thirdSelect)
      if (!this.firstSelect || this.firstSelect == "0") {
        this.$swal("请选择省／直辖市", { buttons: "确定" });
        return;
      } else if (!this.secondSelect || this.secondSelect == "0") {
        this.$swal("请选择市／区", { buttons: "确定" });
        return;
      }
      // else if(!this.thirdSelect || this.thirdSelect == '0') {
      //   this.$swal('请选择县／街道',{buttons:'确定'});
      //   return;
      // }
      else if (
        this.firstSelect != "120000000000000000" &&
        this.firstSelect != "310000000000000000" &&
        this.firstSelect != "500000000000000000"
      ) {
        if (!this.thirdSelect || this.thirdSelect == "0") {
          this.$swal("请选择县／街道", { buttons: "确定" });
          return;
        }
      }
      var newArea = "";

      if (!this.fourthSelect || this.fourthSelect == "0") {
        if (!this.thirdSelect || this.thirdSelect == "0") {
          newArea = this.secondSelect;
        } else {
          newArea = this.thirdSelect;
        }
      } else {
        newArea = this.fourthSelect;
      }
      this.newareaid = newArea;
      this.utilscommit.requestapi(
        "updateVolunInforOnWeb",
        {
          albp0005: this.userInfo.albp0005,
          albp0020: newArea
        },
        this.modifyBack
      );
    },
    async modifyBack(result) {
      if (result && result.code == 0) {
        // 只保留志愿者的全国服务类别，地区类别全部不保留
        let serviceList = this.basicInfo.albp0021
          .split(",")
          .filter(item => item.indexOf("00") != -1)
          .join(",");
        let {
          data: { code }
        } = await this.utilscommit.asyncReq("updateVolunInforOnWeb", {
          albp0005: this.userInfo.albp0005,
          albp0021: serviceList
        });
        if (code != 0) {
          return this.$swal("转移失败", { buttons: "确定" });
        }
        this.$swal("转移成功，即将转到新站点登录？", { buttons: "确定" }).then(
          function(value) {
            // 退出登录
            Vues.loginOutCheck();
          }
        );
      } else {
        this.$swal("转移失败", { buttons: "确定" });
      }
    },
    loginOutCheck(result) {
      Vueh.loginOut();
      let area = this.newareaid.substring(0, 2);
      let path = this.common.areaList.filter(item => item.areaid == area)[0]
        .path;
      let name = this.common.areaList.filter(item => item.areaid == area)[0]
        .sname;
      if (name == "hubei") {
        if (window.location.host == "wuhan.yxybb.com") {
          window.open(`https://wuhan.yxybb.com/subsite/${name}/home`);
        } else {
          // 跳转对应正式环境站点
          window.open(path);
        }
      } 
      // else {
      //   //暂时只上湖北，所以登录区域对应不上时跳转到其他站点为老版网站地址
      //   if (window.location.host == "wuhan.yxybb.com") {
      //     window.open(
      //       `https://wuhan.yxybb.com/NVSICN/LEAP/dist/index.html#/${name}/home`
      //     );
      //   } else {
      //     // 跳转对应正式环境站点
      //     let url = path.replace(/subsite/, "NVSI/LEAP/dist/index.html#");
      //     window.open(url);
      //   }
      // }
    },
    areaBackInfos(result) {
      if (result && result.data) {
        window.localStorage.setItem(
          "subsite_areaInfo",
          JSON.stringify(result.data)
        );
        if (result.data.url) {
          window.open(result.data.url);
        } else {
          this.$router.push({
            name: "login",
            params: { define: result.data.enname, type: 2 }
          });
        }
      }
    },
    firstListBack(result) {
      let firstList =
        result && result.data
          ? this.common.orderBy(result.data, "areaid", "asc")
          : {};
      if (firstList && firstList.length > 0) {
        for (var i = 0; i < firstList.length; i++) {
          if (firstList[i].provincename.indexOf(this.first) > -1)
            firstList.splice(i, 1);
        }
      }
      this.firstList = firstList;
    },
    secondListBack(result) {
      this.secondList =
        result && result.data
          ? this.common.orderBy(result.data, "areaid", "asc")
          : {};
    },
    thirdListBack(result) {
      this.thirdList =
        result && result.data
          ? this.common.orderBy(result.data, "areaid", "asc")
          : {};
    },
    fourthListBack(result) {
      this.fourthList =
        result && result.data
          ? this.common.orderBy(result.data, "areaid", "asc")
          : {};
    }
  },
  watch: {
    firstSelect(newval, oldval) {
      this.thirdList = {};
      this.fourthList = {};
      this.secondSelect = "0";
      this.thirdSelect = "0";
      this.fourthSelect = "0";
      this.utilscommit.requestapi(
        "getNextAreaListFortisWeb",
        { areaid: newval },
        this.secondListBack
      );
    },
    secondSelect(newval, oldval) {
      this.fourthList = {};
      this.thirdSelect = "0";
      this.fourthSelect = "0";
      this.utilscommit.requestapi(
        "getNextAreaListFortisWeb",
        { areaid: newval },
        this.thirdListBack
      );
    },
    thirdSelect(newval, oldval) {
      this.utilscommit.requestapi(
        "getNextAreaListFortisWeb",
        { areaid: newval },
        this.fourthListBack
      );
    }
  }
};
</script>
