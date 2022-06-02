<template>
  <li class="col v-t white tab-container">
    <updatemenu></updatemenu>
    <div class="tabbar-down">
      <!-- 身份信息 -->
      <!-- <table class="user-table user-table-single" v-show="userInfo.albp0063"> -->
      <table class="user-table user-table-single">
        <colgroup>
          <col width="15%" />
          <col width="10%" />
          <col width="12%" />
          <col width="12%" />
          <!-- <col width="20%"> -->
          <col width="20%" />
          <col v-if="userInfo.albp0063 != 2" width="20%" />
        </colgroup>
        <tr>
          <th>姓名</th>
          <th>性别</th>
          <th>出生年月</th>
          <th>证件类型</th>
          <!-- <th>证件号码</th> -->
          <th>实名认证状态</th>
          <th v-if="userInfo.albp0063 != 2">操作</th>
        </tr>
        <tr>
          <td v-html="realName"></td>
          <td v-text="gender"></td>
          <td v-html="birthDate"></td>
          <td v-text="cardType"></td>
          <!-- <td v-text="userInfo.albp0066"></td> -->
          <td>
            <em v-show="userInfo.albp0063 == 1">已实名</em
            ><em v-show="!userInfo.albp0063">未实名</em
            ><em v-show="userInfo.albp0063 == 2">认证中</em>
            <em v-show="userInfo.albp0063 == 0">认证未通过</em>
          </td>
          <td v-if="userInfo.albp0063 != 2">
            <em class="pointer" @click="toAttestation">{{
              !userInfo.albp0063 ||
              userInfo.albp0063 == 0 ||
              userInfo.albp0063 == 3
                ? "实名认证"
                : "修改"
            }}</em>
          </td>
        </tr>
      </table>
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
      routeDefine: this.$route.params.define,
      userInfo: this.$store.getters.getUser, //用户信息
      cardType: "", //证件类型
      birthDate: "", //生日
      gender: "" //性别
    };
  },
  created() {
    this.getData();
  },
  computed: {
    realName: function() {
      let name = this.userInfo.albp0003;
      if (!this.common.checkChinese(name)) {
        return '<span class="fontF">' + name + "</span>";
      } else {
        return name;
      }
    }
  },
  methods: {
    getData() {
      // 获取证件类型codeList
      // this.utilscommit.requestapi(
      //   "codeValueQueryFortisWeb",
      //   { tablename: "nvsi_albp0065" },
      //   this.getIdTypeList
      // );
      this.getIdTypeList();
      // 获取性别codeList
      // this.utilscommit.requestapi(
      //   "codeValueQueryFortisWeb",
      //   { tablename: "nvsi_albp0067" },
      //   this.getSexList
      // );
      this.getSexList();
      // 处理用户生日
      this.birthDate = this.userInfo.albp0014;
      if (this.birthDate.length > 10) {
        this.birthDate = this.birthDate.substring(0, 10);
      }
    },
    getIdTypeList() {
      getCodeList("codeValueQueryFortisWeb", "nvsi_albp0065", {
        tablename: "nvsi_albp0065"
      }).then(res => {
        var cardTypeList = res;
        for (var i = 0; i < cardTypeList.length; i++) {
          if (cardTypeList[i].codeid == this.userInfo.albp0004) {
            this.cardType = cardTypeList[i].codevalue;
            break;
          }
        }
      });
    },
    getSexList() {
      getCodeList("codeValueQueryFortisWeb", "nvsi_albp0067", {
        tablename: "nvsi_albp0067"
      }).then(res => {
        var genderTypeList = res;
        for (var i = 0; i < genderTypeList.length; i++) {
          if (genderTypeList[i].codeid == this.userInfo.albp0006) {
            this.gender = genderTypeList[i].codevalue;
            break;
          }
        }
      });
    },
    toAttestation() {
      if (
        !this.userInfo.albp0063 ||
        this.userInfo.albp0063 == 0 ||
        this.userInfo.albp0063 == 3
      ) {
        // 未实名认证
        this.$router.push({
          name: "attestation",
          params: { define: this.routeDefine, id: this.userInfo.id }
        });
      } else {
        // 已实名认证，重新修改
        this.$swal("修改实名认证信息后，需再次实名认证，请慎用", {
          buttons: ["取消", "确定"]
        }).then(function(value) {
          if (value)
            Vue.$router.push({
              name: "attestation",
              params: {
                define: Vue.routeDefine,
                id: Vue.$store.getters.getUser.id
              }
            });
        });
      }
    }
  }
};
</script>
