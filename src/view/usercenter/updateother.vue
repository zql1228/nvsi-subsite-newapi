<template>
  <li class="col v-t white tab-container">
    <updatemenu></updatemenu>
    <div class="tabbar-down">
      <!-- 其他信息 -->
      <div class="grid g-20 auto">
        <!--<div class="grid-item g-14 form">
          <p class="form-label">职称</p>
          <div class="select">
            <select name="">
              <option value="">请选择</option>
            </select>
          </div>
        </div>-->
        <div class="grid-item g-14 form">
          <p class="form-label">工作单位：</p>
          <input
            type="text"
            v-model="basicInfo.albp0044"
            maxlength="50"
            placeholder="请输入工作单位"
          />
        </div>
        <div class="grid-item g-14 form">
          <p class="form-label">职务：</p>
          <input
            type="text"
            v-model="basicInfo.albp0042"
            maxlength="20"
            placeholder="请输入职务"
          />
        </div>
        <div class="grid-item g-24 form">
          <p class="form-label">血型：</p>
          <div class="checkbox-fixed">
            <label
              class="radio"
              v-for="(el, index) in bloodTypeList"
              :key="index"
              :for="el.id"
            >
              <input
                type="radio"
                name="blood"
                :id="el.id"
                :value="el.codeid"
                v-model="bloodType"
              />
              <span></span>
              <i v-text="el.codevalue"></i>
            </label>
          </div>
        </div>
        <div class="grid-item g-24 form">
          <p class="form-label">制服型号：</p>
          <div class="checkbox-fixed">
            <label
              class="radio"
              v-for="(el, index) in sizeTypeList"
              :key="index"
              :for="el.id"
            >
              <input
                type="radio"
                name="size"
                :id="el.id"
                :value="el.codeid"
                v-model="sizeType"
              />
              <span></span>
              <i v-text="el.codevalue"></i>
            </label>
          </div>
        </div>
        <div class="grid-item g-22 form">
          <p class="form-label">志愿服务经历：</p>
          <textarea
            class="textarea"
            rows="5"
            v-model="basicInfo.albp0040"
            maxlength="300"
            placeholder="请输入志愿服务经历"
          ></textarea>
        </div>
        <div class="pt-30 t-c">
          <a
            href="javascript:void(0);"
            class="button"
            style="width: 200px"
            @click="onSubmit"
            >保存修改</a
          >
        </div>
      </div>
    </div>
  </li>
</template>

<script>
const updatemenu = () => import("@/components/usercenter/updatemenu.vue"); //横向菜单栏
import { getCodeList } from "../../assets/js/getCodevalueList";
export default {
  components: { updatemenu },
  data() {
    return {
      userInfo: this.$store.getters.getUser, //账号信息
      basicInfo: "", //志愿者信息
      titleLever: "", //职称
      bloodTypeList: {}, //血型
      bloodType: "",
      sizeTypeList: {}, //制服型号
      sizeType: ""
    };
  },
  created() {
    this.basicInfo = this.$store.getters.getBasic;
    this.getUserInfo();
    // this.utilscommit.requestapi(
    //   "codeValueQueryFortisWeb",
    //   { tablename: "nvsi_albp0048" },
    //   this.callback1
    // );
    this.callback1();
    // this.utilscommit.requestapi(
    //   "codeValueQueryFortisWeb",
    //   { tablename: "nvsi_albp0049" },
    //   this.callback2
    // );
    this.callback2();
  },
  methods: {
    onSubmit: function() {
      if (this.userInfo) {
        // 判断志愿者是否填写服务区域和居住区域
        if (!this.userInfo.albp0020 || !this.basicInfo.albp0028) {
          this.$swal("请先完善志愿者基本信息！", {
            buttons: ["确定", "取消"]
          }).then(value => {
            if (!value) {
              this.$router.push({
                name: "updatedata",
                params: { define: this.routeDefine }
              });
            }
          });
        } else {
          let params = {
            albp0005: this.userInfo.albp0005 // 志愿者证件号
          };
          // 工作单位
          this.basicInfo.albp0044
            ? (params.albp0044 = this.basicInfo.albp0044)
            : "";
          // 职务
          this.basicInfo.albp0042
            ? (params.albp0042 = this.basicInfo.albp0042)
            : "";
          // 血型
          this.bloodType ? (params.albp0048 = this.bloodType) : "";
          // 制服型号
          this.sizeType ? (params.albp0049 = this.sizeType) : "";
          // 服务经历
          this.basicInfo.albp0040
            ? (params.albp0040 = this.basicInfo.albp0040)
            : "";
          console.log(params);
          this.utilscommit.requestapi(
            "updateVolunInforOnWeb",
            params,
            this.modifyBack
          );
        }
      } else {
        this.$utilroutes.toLogin();
      }
    },
    modifyBack: function(result) {
      if (result) {
        if (result.code == 0) {
          this.$swal("修改成功", { buttons: "确定" }).then(value => {
            // Vuec.getUser();
            this.utilscommit.requestapi(
              "getVolunteerInfoFortisWeb",
              {
                cardno: this.userInfo.albp0005
              },
              res => {
                if (res.code == 0 && res.data) {
                  this.basicInfo = res.data;
                  this.$store.commit("saveBasic", this.basicInfo);
                  Vuec.checkUser();
                } else {
                  this.$utilroutes.toLogin();
                }
              }
            );
          });
        } else {
          this.$swal(result.message, { buttons: "确定" });
        }
      }
    },
    getUserInfo: function() {
      this.bloodType = this.basicInfo.albp0048 ? this.basicInfo.albp0048 : "";
      this.sizeType = this.basicInfo.albp0049 ? this.basicInfo.albp0049 : "";
    },
    callback1: function() {
      getCodeList("codeValueQueryFortisWeb", "nvsi_albp0048", {
        tablename: "nvsi_albp0048"
      }).then(res => {
        this.bloodTypeList = this.common.orderBy(res, "orderid", "asc");
      });
    },
    callback2: function() {
      getCodeList("codeValueQueryFortisWeb", "nvsi_albp0049", {
        tablename: "nvsi_albp0049"
      }).then(res => {
        this.sizeTypeList = this.common.orderBy(res, "orderid", "asc");
      });
    }
  }
};
</script>

<style scoped>
.form {
  margin: 10px 0 0 20px;
}
</style>
