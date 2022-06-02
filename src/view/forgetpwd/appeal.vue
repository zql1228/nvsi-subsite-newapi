<template>
  <div id="appeal">
    <!--中间部分-->
    <div class="main bannerimg">
      <div class="mid">
        <ul class="row w">
          <li class="col">
            <div class="router">
              <span>当前位置：</span>
              <a href="javascript:void(0);"
                ><router-link tag="span" :to="{ name: 'home' }"
                  >首页</router-link
                ></a
              >
              <span>申诉进度查询</span>
            </div>
          </li>
        </ul>
        <!-- 志愿者信息查询 -->
        <ul class="tabbar-down row w">
          <li class="col v-t w">
            <h2 class="subtitle subtitle-noline">
              申诉进度查询
            </h2>
            <!-- 查询输入框 -->
            <div class="vote vote-form" style="display: flex">
              <!-- 证件号 -->
              <div style="display: flex">
                <span class="fontSpan" style="margin-right: 20px"
                  >证件号查询</span
                >
                <div class="select">
                  <select v-model="idType" id="idType">
                    <option value="0">请选择证件类型</option>
                    <option
                      v-for="(el, index) in idTypeList"
                      :key="index"
                      :value="el.codeid"
                    >
                      {{ el.codevalue }}
                    </option>
                  </select>
                </div>
                <input
                  type="text"
                  class="input"
                  style="width:310px;margin-left:0"
                  v-model="card"
                  maxlength="20"
                  placeholder="请输入完整证件号码"
                />
              </div>
              <!-- 手机号 -->
              <span class="fontSpan">图文验证码</span>
              <input
                type="text"
                class="input"
                style="width:150px;margin-right:5px"
                v-model="code"
                maxlength="4"
                placeholder="请输入图文验证码"
              />
              <span class="imgcode"
                ><img :src="imgcode" @click="getImgcode"
              /></span>
              <a
                href="javascript:void(0);"
                class="button button-bold"
                @click="searchVol"
                >查询</a
              >
            </div>
            <!-- 查询结果列表展示 -->
            <h2 class="subtitle subtitle-margin subtitle-noline">查询结果</h2>
            <!-- 查询错误提示 -->
            <span class="tipErr" v-text="msg1"></span>
            <!-- 查询结果列表 -->
            <table class="table table_cell" v-if="resultItem">
              <colgroup>
                <col width="25%" />
                <col width="25%" />
                <col width="25%" />
                <col width="25%" />
              </colgroup>
              <tr>
                <th>姓名</th>
                <th>证件号码</th>
                <th>申诉时间</th>
                <th>状态</th>
              </tr>
              <tr>
                <td>{{ resultItem.albp1002 }}</td>
                <td>{{ resultItem.albp1003 }}</td>
                <td>
                  {{
                    resultItem.createtime
                      ? resultItem.createtime.slice(0, 19)
                      : ""
                  }}
                </td>
                <td>{{ progress }}</td>
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
  name: "appeal",
  data() {
    return {
      card: "", //证件号
      code: "", //验证码
      imgcode: "", //图形验证码
      imgkey: "",
      msg1: "", //志愿者查询提示信息
      idType: "", //证件类型
      idTypeList: {},
      resultItem: null, //查询结果
      progress: ""
    };
  },
  created() {
    this.getImgcode(); //验证码获取
    // this.utilscommit.requestapi(
    //   "codeValueQueryFortisWeb",
    //   { tablename: "nvsi_albp0065" },
    //   this.getIdTypeList
    // ); //获取证件类型列表
    this.getIdTypeList();
  },
  methods: {
    getIdTypeList: function() {
      //证件类型列表获取返回
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
    getImgcode() {
      //获取图形验证码
      this.utilscommit.requestapi(
        "getImageCodeFortisWeb",
        null,
        this.imgCodeBack
      );
    },
    imgCodeBack(result) {
      //图像验证码返回
      if (result && result.data) {
        this.imgcode = result.data.img;
        this.imgkey = result.data.imgkey;
      }
    },
    searchVol: function() {
      //查询进度列表
      if (this.checkForm()) {
        this.utilscommit.requestapi(
          "volunteerAppealProgressFortisWeb",
          {
            code: this.code,
            imgkey: this.imgkey,
            servicecredentialnum: this.card
          },
          this.searchVolBack
        );
      }
    },
    searchVolBack: function(result) {
      //进度列表返回
      if (result) {
        if (result.data) {
          this.resultItem = result.data;
          this.getValue(result.data.albp1009);
          this.msg1 = "";
        } else {
          this.resultItem = null;
          this.msg1 = result.message;
        }
      } else {
        this.resultItem = null;
        this.msg1 = "未查询到结果";
      }
      this.getImgcode();
    },
    checkForm() {
      //校验
      if (!this.card) {
        this.msg1 = "请填写完整的证件号码";
        this.resultItem = null;
        return false;
      } else if (!this.code) {
        this.msg1 = "请填写完整的验证码";
        this.resultItem = null;
        return false;
      } else if (this.card && this.idType == "01") {
        if (!this.common.checkCardNo(this.card)) {
          this.msg1 = "请填写正确的证件号码";
          this.resultItem = null;
          return false;
        } else {
          this.msg1 = "";
          return true;
        }
      } else {
        this.msg1 = "";
        return true;
      }
    },
    getValue(value) {
      //获取代码表值
      var that = this;
      getCodeList("codeValueQueryFortisWeb", "nvsi_albp1009", {
        tablename: "nvsi_albp1009"
      }).then(res => {
        res.forEach(element => {
          if (element.codeid === value) {
            that.progress = element.codevalue;
            return;
          }
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
.vote .fontSpan {
  line-height: 40px;
}
.vote-form input {
  padding: 0 0 0 15px;
}
.vote .imgcode {
  height: 40px;
  cursor: pointer;
  margin-right: 20px;
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
.table_cell tr > td {
  padding: 10px 18px;
}
.tipErr {
  color: red;
  display: inline-block;
  font-size: 18px;
  width: 100%;
  text-align: center;
}
</style>
