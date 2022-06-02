<template>
  <div id="infosearch">
    <!--中间部分-->
    <div class="main bannerimg">
      <div class="mid">
        <ul class="row w">
          <li class="col">
            <div class="router">
              <span>当前位置：</span>
              <a href="javascript:void(0);">
                <router-link tag="span" :to="{ name: 'home' }">首页</router-link>
              </a>
              <span>志愿信息查询</span>
            </div>
          </li>
        </ul>
        <div class="tabbar">
          <span class="active">志愿者信息查询</span>
          <span>志愿服务证书查询</span>
        </div>
        <!-- 志愿者信息查询 -->
        <ul class="tabbar-down row w">
          <li class="col v-t w">
            <h2 class="subtitle subtitle-margin subtitle-noline">
              志愿者信息查询
            </h2>
            <div class="vote vote-form" style="display: flex">
              <div style="display: flex; ">
                <span style="margin-right: 20px">证件号查询</span>
                <div class="select">
                  <select v-model="idType" id="idType">
                    <option value="0">请选择证件类型</option>
                    <option :value="el.codeid" v-for="(el, index) in idTypeList" :key="index">
                      {{ el.codevalue }}
                    </option>
                  </select>
                </div>
                <input type="text" class="input" style="width: 200px; margin-left: 0; flex: 1" v-model="name" maxlength="20" placeholder="请输入完整证件号码" />
              </div>
              <span>姓名</span>
              <input type="text" class="input" style="width: 150px; " v-model="card" maxlength="20" placeholder="请输入姓名" />
              <span>图文验证码</span>
              <input type="text" class="input" style="width: 140px;margin-right:5px" v-model="imgcode" maxlength="4" placeholder="请输入图文验证码" />
              <div class="my_imgcode">
                <img style="width: 100%" :src="imgcodesrc" alt="" @click="getcode" />
              </div>
              <a href="javascript:void(0);" class="button button-bold" @click="searchVol">查询</a>
            </div>
            <h2 class="subtitle subtitle-margin subtitle-noline">查询结果</h2>
            <span class="tipErr" v-text="msg1"></span>
            <table class="table table_cell" v-if="volInfo">
              <colgroup>
                <col width="15%" />
                <col width="15%" />
                <col width="17%" />
                <col width="17%" />
                <col width="18%" />
                <col width="18%" />
              </colgroup>
              <tr>
                <th>姓名</th>
                <th>性别</th>
                <th>证件号码</th>
                <th>服务时长</th>
                <th>服务省份</th>
                <th>手机号</th>
              </tr>
              <tr v-for="(el, index) in volInfo" :key="index">
                <td>
                  <a href="javascript:void(0);" @click="toVolDetail(encryptCard, el.albp0020)"><em class="name_color">{{ el.albp0003 }}</em></a>
                </td>
                <td>{{ el.albp0006 == 2 ? "女" : "男" }}</td>
                <td>
                  <p>{{ el.cartype }}</p>
                  <p>{{ el.cardno }}</p>
                </td>
                <td>
                  <span>{{ el.albp0089 || "0.00" }}</span>小时
                </td>
                <td>
                  <a v-if="el.albp0020" :href="el.url" target="_blank" :title="el.areaid + '（' + el.url + '）'" style="color: #cc0000">{{ el.albp0025 }}</a>
                </td>
                <td>
                  {{ el.phone ? el.phone : "未绑定手机号" }}
                </td>
              </tr>
            </table>
          </li>
        </ul>
        <!-- 证书查询 -->
        <ul class="tabbar-down row w" style="display: none">
          <li class="col v-t w">
            <h2 class="subtitle subtitle-margin subtitle-noline">
              志愿服务证书查询<em style="color: #cc0000; font-size: 18px"></em>
            </h2>
            <div class="vote vote-form" style="display: flex; justify-content: space-between">
              <div>
                <span>证书编号</span>
                <input type="text" class="input" style="width: 530px" v-model="front" maxlength="18" placeholder="请输入志愿者证件号" />
              </div>
              <span class="gray">—</span>
              <input type="text" class="input" style="width: 250px" v-model="back" placeholder="请输入证书编号后半部分" />
              <a href="javascript:void(0);" class="button button-bold" @click="searchServiceBook">查询服务证书</a>
            </div>
            <h2 class="subtitle subtitle-margin subtitle-noline">查询结果</h2>
            <span class="tipErr" v-text="msg2"></span>
            <table class="table" v-if="certificateInfo">
              <colgroup>
                <col width="10%" />
                <!-- <col width="15%" /> -->
                <col width="30%" />
                <col width="15%" />
                <col width="15%" />
                <col width="30%" />
              </colgroup>
              <tr>
                <th>姓名</th>
                <!-- <th>颁发机构</th> -->
                <th>证书编号</th>
                <th>服务时长</th>
                <th>颁发时间</th>
                <th>属地</th>
              </tr>
              <tr>
                <td>
                  <a href="javascript:void(0);" @click="
                      toVolDetail(
                        certificateInfo.encryptCard,
                        certificateInfo.albp0020
                      )
                    "><em class="name_color">{{
                      certificateInfo.albp0003
                    }}</em></a>
                </td>
                <!-- <td>{{ certificateInfo.albp1107 }}</td> -->
                <td>
                  {{
                    certificateInfo.albp1110 + "-" + certificateInfo.albp1103
                  }}
                </td>
                <td>{{ (certificateInfo.albp1106 || "0.0") + "小时" }}</td>
                <td>{{ certificateInfo.albp1104 | ellipsisNos(10) }}</td>
                <td>
                  {{ certificateInfo.cnname
                  }}<a :href="certificateInfo.url" target="_blank" :title="
                      certificateInfo.cnname + '（' + certificateInfo.url + '）'
                    ">{{ ("（" + certificateInfo.url + "）") | ellipsis(36) }}</a>
                </td>
              </tr>
            </table>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { getCodeList } from "../../assets/js/getCodevalueList";
export default {
  name: "infosearch",
  data() {
    return {
      context: window.location.origin,
      volInfo: "", //志愿者查询结果
      name: "", //证件号
      card: "", //手机号码  姓名
      imgcode: "", //填写的图文验证码
      imgcodesrc: "", //图文验证码地址
      imgcodeid: "", //图文验证码标识
      msg1: "", //志愿者查询提示信息
      certificateInfo: "", //证书信息
      front: "", //编号前
      back: "", //编号后
      msg2: "", //提示
      idType: "", //证件类型
      idTypeList: {},
      encryptCard: "" // 加密证件号
    };
  },
  created() {
    // this.utilscommit.requestapi(
    //   "codeValueQueryFortisWeb",
    //   { tablename: "nvsi_albp0065" },
    //   this.getIdTypeList
    // );
    this.getIdTypeList();
  },
  mounted() {
    window.Vues = this; //主体页面vue实例挂载
    this.tabSpanClick();
    this.getcode();
  },
  methods: {
    getcode() {
      //发送验证码请求
      this.utilscommit.requestapi(
        "getImageCodeFortisWeb",
        {},
        this.getCodeback
      );
    },
    getCodeback(result) {
      if (result.data) {
        this.imgcodeid = result.data.imgkey;
        this.imgcodesrc = result.data.img;
      }
    },
    // 获取证件类型
    getIdTypeList() {
      getCodeList("codeValueQueryFortisWeb", "nvsi_albp0065", {
        tablename: "nvsi_albp0065"
      }).then(res => {
        let idTypeList = this.common.orderBy(res, "codeid", "asc");
        let idTypeLists = []; //去除军官证、士兵证、其他有效国籍旅行证件
        if (idTypeList) {
          for (let index = 0; index < idTypeList.length; index++) {
            if (index == 0 && idTypeList[0]) this.idType = idTypeList[0].codeid; //默认给第一个赋值
            if (index < 5) idTypeLists.push(idTypeList[index]);
          }
        }
        this.idTypeList = idTypeLists;
      });
    },
    // 查询志愿者信息
    async searchVol() {
      this.volInfo = "";
      if (this.checked()) {
        // 证件号加密
        let { data: res } = await this.utilscommit.asyncReq("cardnoOnWeb", {
          cardno: this.name
        });
        if (res.code != 0 || !res.data.cardno) {
          return (this.msg1 = "未查询到相关结果");
        }
        // 加密证件号
        this.encryptCard = res.data.cardno;
        // 获取志愿者信息
        this.utilscommit.requestapi(
          "getVolunteerInfoOnWeb",
          {
            cardno: this.name,
            imgkey: this.imgcodeid,
            code: this.imgcode.toLocaleUpperCase()
          },
          this.searchVolBack
        );
      }
    },
    // 查询志愿者信息回调
    searchVolBack(result) {
      if (
        result.code == 0 &&
        result.data &&
        this.card == result.data.albp0003
      ) {
        let array = [result.data];
        array.forEach(element => {
          element.cartype = this.getIdName(element.albp0004);
          // 证件号脱敏
          element.cardno = this.common.noDes(element.albp0005);
          //手机号脱敏
          element.phone = this.common.phoneDes(element.albp0010);
          if (element.albp0020) {
            // 获取服务区域
            element.enname = this.common.areaList.filter(
              item => item.areaid == result.data.albp0020.substring(0, 2)
            )[0].sname;
            // 根据服务区域获取name
            element.albp0025 = this.common.areaList.filter(
              item => item.areaid == result.data.albp0020.substring(0, 2)
            )[0].name;
          }

          //判断当前志愿者属地的跳转路径
          if (element.enname == "jiangsu") {
            element.url = "http://js.chinavolunteer.cn/jszy/home";
          } else if (element.enname == "hubei") {
            if (window.location.host == "wuhan.yxybb.com") {
              //测试
              element.url = "https://wuhan.yxybb.com/subsite/hubei/home";
            } else {
              //生产
              element.url =
                "http://hubei.chinavolunteer.mca.gov.cn/subsite/hubei/home";
            }
          } else {
            element.url =
              this.context +
              "/LEAP/dist/index.html#/" +
              element.enname +
              "/home";
          }
        });
        this.volInfo = array;
        this.msg1 = "";
      } else if (result.code == -1) {
        this.volInfo = "";
        this.msg1 = "验证码错误";
        this.getcode();
      } else {
        this.volInfo = "";
        this.msg1 = "未查询到相关信息";
        this.getcode();
      }
    },
    // 查询志愿者信息校验
    checked() {
      if (this.idType == "0") {
        this.msg1 = "请选择证件类型";
        return false;
      }
      if (this.name && this.card && this.imgcode) {
        if (this.idType == "01") {
          if (this.common.checkCardNo(this.name)) {
            if (this.common.checkName(this.card)) {
              return true;
            } else {
              this.msg1 = "请填写正确的姓名";
              return false;
            }
          } else {
            this.msg1 = "请输入正确的证件号";
            return false;
          }
        } else {
          return true;
        }
      } else {
        this.msg1 = "请将身份证号码、姓名、图文验证码全部填写完成";
        return false;
      }
    },
    // 根据code获取证件类型
    getIdName(a) {
      let idName = "";
      switch (a) {
        case "01":
          idName = "内地居民身份证";
          break;
        case "02":
          idName = "香港居民身份证";
          break;
        case "03":
          idName = "澳门居民身份证";
          break;
        case "04":
          idName = "台湾居民身份证";
          break;
        case "05":
          idName = "护照";
          break;
        case "06":
          idName = "军官证";
          break;
        case "07":
          idName = "士兵证";
          break;
        case "99":
          idName = "其他有效国际旅行证件";
          break;
      }
      return idName;
    },
    // 根据志愿者证件号和志愿者编号查询服务证书
    searchServiceBook() {
      this.certificateInfo = "";
      if (this.frontCheck() && this.backCheck()) {
        let params = {
          albp1110: this.front,
          albp1103: this.back
        };
        console.log(params);
        this.utilscommit.requestapi(
          "getCertificateFortisWeb",
          params,
          this.serviceBookBack
        );
      }
    },
    // 查询服务证书回调
    async serviceBookBack(result) {
      if (result.code == 0 && result.data) {
        let { data: res } = await this.utilscommit.asyncReq("cardnoOnWeb", {
          cardno: result.data.albp1110
        });
        if (res.code == 0 && !res.data.cardno) {
          return (this.msg2 = "未查询到相关信息");
        }

        let info = result.data;
        if (info.enname == "jiangsu") {
          info.url = "http://js.chinavolunteer.cn/jszy/home";
        } else if (info.enname == "hubei") {
          if (window.location.host == "wuhan.yxybb.com") {
            //测试
            info.url = "https://wuhan.yxybb.com/subsite/hubei/home";
          } else {
            //生产
            info.url =
              "http://hubei.chinavolunteer.mca.gov.cn/subsite/hubei/home";
          }
        } else {
          info.url =
            this.context + "/LEAP/dist/index.html#/" + info.enname + "/home";
        }

        this.certificateInfo = { ...info, encryptCard: res.data.cardno };
        this.msg2 = "";
      } else {
        this.certificateInfo = "";
        this.msg2 = "未查询到相关信息";
      }
    },
    // 证书查询证件号校验
    frontCheck() {
      var flag = true;
      this.msg2 = "";
      if (!this.front) {
        this.msg2 = "证书编号不能为空";
        flag = false;
      }
      return flag;
    },
    // 证书查询志愿者编号校验
    backCheck() {
      var flag = true;
      this.msg2 = "";
      if (!this.back) {
        this.msg2 = "证书编号不能为空";
        flag = false;
      }
      return flag;
    },
    // 跳转到志愿者信息页面
    toVolDetail(volnum, areaid) {
      window.open(
        this.$router.resolve({
          name: "volinfo",
          params: {
            define: Vue.$route.params.define,
            data1: volnum,
            data2: areaid
          }
        }).href
      );
    },
    // span点击事件
    tabSpanClick() {
      $(".tabbar span").each(function(idx, el) {
        $(el).click(function() {
          Vues.name = "";
          Vues.card = "";
          Vues.volInfo = "";
          Vues.msg1 = "";
          Vues.front = "";
          Vues.back = "";
          Vues.certificateInfo = "";
          Vues.msg2 = "";
          $(this)
            .addClass("active")
            .siblings()
            .removeClass("active");
          $(".tabbar-down")
            .eq(idx)
            .show()
            .siblings(".tabbar-down")
            .hide();
        });
      });
    }
  }
};
</script>

<style scoped>
.table th {
  padding: 18px;
  text-align: left;
}
.table td {
  padding: 18px;
  text-align: left;
}
.select:after {
  right: 4px;
}
.select {
  width: 140px;
  height: 40px;
  box-sizing: border-box;
}
.vote span {
  line-height: 40px;
}
.table th {
  font-weight: bold;
}
.table th,
.table td {
  border: 1px solid #dfdfdf;
}
.table td:nth-child(1),
table td:nth-child(5) {
  color: #cc0000;
  font-weight: bold;
}
/* .unbindTips {
  color: #e2000e;
  font-size: 14px;
  text-align: left;
  margin-top: 20px;
} */
.form {
  padding: 5px 0 0 0;
}
.form-label {
  color: #000;
  padding-bottom: 10px;
}
.mask-info {
  padding: 20px;
  padding-top: 0;
}
.form-error {
  margin: 10px 0;
  font-size: 12px;
}
.form-error img {
  height: 20px;
  margin-right: 5px;
}
.table_cell tr > td {
  padding: 10px 18px;
}
/* .Unbind {
  cursor: pointer;
  margin-left: 10px;
  padding: 2px 5px;
  color: #fff;
  background: #0088e4;
  border-radius: 5px;
  transition: 0.3s;
}
.Unbind:hover {
  opacity: 0.8;
} */
/* .my_fonts {
  font-size: 22px;
  color: #000;
  margin: 40px 0;
  font-weight: 900;
} */
.tipErr {
  color: red;
  display: inline-block;
  font-size: 18px;
  width: 100%;
  text-align: center;
}
.my_imgcode {
  width: 80px;
  height: 40px;
  line-height: 40px;
  margin-right: 20px;
}
</style>
