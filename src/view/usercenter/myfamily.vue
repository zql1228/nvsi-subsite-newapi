<template>
  <li class="col v-t white tab-container">
    <div class="tabbar tabbar-tight mb-20">
      <span class="active">我的家庭</span>
      <span>家庭时长</span>
    </div>
    <div class="tabbar-down">
      <div class="tabbar tabbar-tight mb-20 row w">
        <span class="col v-m">家庭信息</span>
        <div class="col v-m t-r" v-if="!familyInfo.albx0233">
          <a
            href="javascript:void(0);"
            class="button button-normal"
            @click="showFamilyDialog(0)"
            >创建家庭</a
          >
        </div>
      </div>
      <table class="user-table">
        <colgroup>
          <col width="10%" />
          <col width="20%" />
          <col width="20%" />
          <col width="10%" />
          <col width="10%" />
          <col width="15%" />
          <col width="15%" v-if="familyInfo.albx3405 == 1" />
        </colgroup>
        <tr>
          <th>类型</th>
          <th>家庭名称</th>
          <th>家庭编号</th>
          <th>成员总数</th>
          <th>家庭时长</th>
          <th>日期</th>
          <th v-if="familyInfo.albx3405 == 1">操作</th>
        </tr>
        <tr v-if="!familyInfo.id">
          <td
            v-if="familyInfo.albx3405 != 1"
            colspan="6"
            style="text-align: center;border-bottom: 1px #F6F3F7;"
          >
            <img src="../../assets/img/js-wujilu.png" />
          </td>
          <td
            v-if="familyInfo.albx3405 == 1"
            colspan="7"
            style="text-align: center;border-bottom: 1px #F6F3F7;"
          >
            <img src="../../assets/img/js-wujilu.png" />
          </td>
        </tr>
        <tr v-if="familyInfo.id">
          <td class="left">{{ familyInfo.type }}</td>
          <td class="left">{{ familyInfo.albx0232 }}</td>
          <td class="left">{{ familyInfo.albx0233 }}</td>
          <td class="left">{{ familyInfo.members }}</td>
          <td class="left" v-if="familyInfo.members">
            {{ familyInfo.times | addZero }}
          </td>
          <td class="left">{{ familyInfo.albx3404 | ellipsisNos(10) }}</td>
          <td class="left" v-if="familyInfo.albx3405 == 1">
            <em class="pointer" style="margin-right: 6px;" @click="updateFamily"
              >修改</em
            >
          </td>
        </tr>
      </table>

      <div class="tabbar tabbar-tight mb-20 row w">
        <span class="col v-m">成员信息</span>
        <div class="col v-m t-r" v-if="familyInfo.albx3405 == 1">
          <a
            href="javascript:void(0);"
            class="button button-normal"
            @click="showMemberDialog"
            >添加成员</a
          >
        </div>
      </div>
      <table class="user-table">
        <colgroup>
          <col width="30%" />
          <col width="25%" />
          <col width="25%" />
          <col
            v-if="
              familyInfo.albx3405 == 1 || familyInfo.albx3403 == userInfo.volnum
            "
            width="20%"
          />
        </colgroup>
        <tr>
          <th>姓名</th>
          <th>家庭时长</th>
          <th>加入时间</th>
          <th
            v-if="
              familyInfo.albx3405 == 1 || familyInfo.albx3403 == userInfo.volnum
            "
          >
            操作
          </th>
        </tr>
        <tr v-if="!membersList.length">
          <td
            colspan="4"
            v-if="
              familyInfo.albx3405 == 1 || familyInfo.albx3403 == userInfo.volnum
            "
            style="text-align: center;border-bottom: 1px #F6F3F7;"
          >
            <img src="../../assets/img/js-wujilu.png" />
          </td>
          <td
            colspan="3"
            v-if="
              familyInfo.albx3405 != 1 && familyInfo.albx3403 != userInfo.volnum
            "
            style="text-align: center;border-bottom: 1px #F6F3F7;"
          >
            <img src="../../assets/img/js-wujilu.png" />
          </td>
        </tr>
        <tr v-for="(el, index) in membersList" :key="index">
          <td class="left pointer">
            <em
              class="name_color"
              @click="toVol(el.albx3403, el.albp0020)"
              v-text="el.albx3406"
            ></em
            ><em
              class="name_color"
              @click="toVol(el.albx3403, el.albp0020)"
              v-if="el.albx3405 == 1"
              >（户主）</em
            >
          </td>
          <td class="left">{{ el.sums | addZero }}</td>
          <td class="left">{{ el.albx3404 | ellipsisNos(10) }}</td>
          <td
            class="left"
            v-if="familyInfo.albx3405 == 1 || el.albx3403 == userInfo.volnum"
          >
            <em
              class="pointer"
              style="margin-right: 6px;"
              @click="showTimeDialog(el)"
              >时长录入</em
            >
            <em
              class="pointer"
              v-if="familyInfo.albx3405 == 1"
              style="margin-right: 6px;"
              @click="deleteMember(el.albx3405, el.sums, el.albx3403)"
              >删除</em
            >
          </td>
        </tr>
      </table>
    </div>
    <div class="tabbar-down" style="display:none;">
      <table class="user-table">
        <colgroup>
          <col width="20%" />
          <col width="20%" />
          <col width="20%" />
          <col width="20%" />
          <col
            width="20%"
            v-if="
              familyInfo.albx3405 == 1 || familyInfo.albx3403 == userInfo.volnum
            "
          />
        </colgroup>
        <tr>
          <th>姓名</th>
          <th>照片</th>
          <th>家庭时长</th>
          <th>日期</th>
          <th
            v-if="
              familyInfo.albx3405 == 1 || familyInfo.albx3403 == userInfo.volnum
            "
          >
            操作
          </th>
        </tr>
        <tr v-if="!timeList.length">
          <td
            colspan="5"
            v-if="
              familyInfo.albx3405 == 1 || familyInfo.albx3403 == userInfo.volnum
            "
            style="text-align: center;border-bottom: 1px #F6F3F7;"
          >
            <img src="../../assets/img/js-wujilu.png" />
          </td>
          <td
            colspan="4"
            v-if="
              familyInfo.albx3405 != 1 && familyInfo.albx3403 != userInfo.volnum
            "
            style="text-align: center;border-bottom: 1px #F6F3F7;"
          >
            <img src="../../assets/img/js-wujilu.png" />
          </td>
        </tr>
        <tr v-for="(el, index) in timeList" :key="index">
          <td class="left">
            <em
              class="pointer name_color"
              @click="toVol(el.albx3403, el.albp0020)"
              v-text="el.vname"
            ></em>
          </td>
          <td class="left">
            <img
              v-if="el.imgpath"
              :src="common.changeImgsrc(el.imgpath)"
              width="80px"
              height="80px"
            />
          </td>
          <td class="left" v-text="addZero(el.albx0245)"></td>
          <td class="left">{{ el.albx0246 | ellipsisNos(10) }}</td>
          <td
            class="left"
            v-if="
              familyInfo.albx3405 == 1 || familyInfo.albx3403 == userInfo.volnum
            "
          >
            <em class="pointer" @click="delTime(el.id)">删除</em>
          </td>
        </tr>
      </table>
    </div>
    <paging
      :pageCount="tolPage"
      :rangePage="pageSize"
      :initPage="pageNow"
      :totals="tolCount"
      :val="jumpPage"
      @pageEvent="pageEvent"
    >
    </paging>

    <!-- 创建家庭 -->
    <div class="mask family">
      <div
        class="mask-info"
        style="width:700px;max-height:705px;margin-left:-350px;"
      >
        <div class="mask-header row w">
          <div class="col v-m"><h2 v-text="showFamily"></h2></div>
          <div class="col v-m t-r">
            <a
              href="javascript:void(0);"
              class="mask-close"
              @click="closeFamily"
              ><img src="../../assets/img/close.png" alt=""
            /></a>
          </div>
        </div>
        <div style="padding:20px 50px 0 50px;">
          <div class="form">
            <p class="form-label"><em>*</em>家庭名称：</p>
            <input
              v-model="familyName"
              @blur="familyNameCheck"
              maxlength="20"
              placeholder="请输入家庭名称"
            />
            <p class="form-error" id="familyNameTips"></p>
          </div>
        </div>
        <div class="form t-c">
          <a href="javascript:void(0);" class="button" @click="onSubmit"
            >确定</a
          >
        </div>
      </div>
    </div>

    <!-- 邀请成员 -->
    <div class="mask member">
      <div
        class="mask-info"
        style="width:700px;max-height:705px;margin-left:-350px;"
      >
        <div class="mask-header row w">
          <div class="col v-m"><h2>邀请成员</h2></div>
          <div class="col v-m t-r">
            <a
              href="javascript:void(0);"
              class="mask-close"
              @click="closeMember"
              ><img src="../../assets/img/close.png" alt=""
            /></a>
          </div>
        </div>
        <div style="padding:20px 50px 0 50px;">
          <div class="form">
            <p class="form-label"><em>*</em>姓名：</p>
            <input
              v-model="memberName"
              @blur="memberNameCheck"
              maxlength="20"
              placeholder="请输入姓名"
            />
            <p class="form-error" id="memberNameTips"></p>
          </div>
          <div class="form">
            <p class="form-label"><em>*</em>证件号码：</p>
            <input
              v-model="memberCard"
              @blur="memberCardCheck"
              maxlength="18"
              placeholder="请输入证件号码"
            />
            <p class="form-error" id="memberCardTips"></p>
          </div>
        </div>
        <div class="form t-c">
          <a href="javascript:void(0);" class="button" @click="submitMember"
            >确定</a
          >
        </div>
      </div>
    </div>

    <!-- 录入时长 -->
    <div class="mask time">
      <div
        class="mask-info"
        style="width:700px;max-height:705px;margin-left:-350px;"
      >
        <div class="mask-header row w">
          <div class="col v-m"><h2>录入时长</h2></div>
          <div class="col v-m t-r">
            <a
              href="javascript:void(0);"
              class="mask-close pointer"
              @click="closeTime"
              ><img src="../../assets/img/close.png" alt=""
            /></a>
          </div>
        </div>
        <div style="padding:20px 50px 0 50px;">
          <div class="form">
            <div class="form-label">
              <em>*</em>照片：
              <up-card
                :imgFile="imgFile"
                ref="imgtitle"
                style="margin-top: -20px;"
              ></up-card>
              <div style="margin-top: -5px;text-align: center;font-size: 13px;">
                只支持格式为jpg、png、jpeg、gif，大小不超过2M
              </div>
              <!-- <a href="javascript:void(0);" class="button" @click="uploadPhoto">上传照片</a> -->
            </div>
            <p class="form-error" id="photoTips"></p>
            <input
              type="file"
              ref="photo"
              @change="photoChanged"
              accept="image/*"
              hidden
            />
          </div>
          <div class="form">
            <p class="form-label"><em>*</em>时长：</p>
            <input
              v-model="applyTime"
              @blur="applyTimeCheck"
              maxlength="20"
              placeholder="请输入时长"
            />
            <p class="form-error" id="applyTimeTips"></p>
          </div>
          <div class="form">
            <p class="form-label"><em>*</em>备注：</p>
            <input
              v-model="remarks"
              @blur="remarksCheck"
              maxlength="200"
              placeholder="请输入备注"
            />
            <p class="form-error" id="remarksTips"></p>
          </div>
        </div>
        <div class="form t-c">
          <a href="javascript:void(0);" class="button" @click="submitTime"
            >确定</a
          >
        </div>
      </div>
    </div>
  </li>
</template>

<script>
const paging = () => import("@/components/page/paginationRed.vue"); //分页
const UpCard = () => import("@/view/home/upimage.vue"); //上传头像

export default {
  name: "myfamily",
  components: {
    paging,
    UpCard
  },
  data() {
    return {
      nav2: "myfamily",
      routeDefine: this.$route.params.define,
      userInfo: this.$store.getters.getUser, //账号信息
      familyInfo: {}, //家庭信息
      membersList: [], //成员列表
      showFamily: "创建家庭", //家庭弹窗展示名称
      familyName: "", //新建家庭名称
      memberName: "", //邀请成员姓名
      memberCard: "", //邀请成员证件
      //录入时长
      photo: "", //时长照片
      memberinfo: "", //时长成员
      remarks: "", //备注
      applyTime: "", //申请时长
      photoFile: "", //图片文件
      nowIndex: "0",
      //家庭时长
      timeList: [],
      delTimeId: "", //需要删除的时长id
      imgFile: "",
      //分页
      tolCount: 0, //总条数
      tolPage: 0, //总页数
      pageSize: 8, //每页条数
      pageNow: 1, //当前页
      jumpPage: 1
    };
  },
  created() {
    window.Vues = this; //主体vue实例挂载
    this.getFamilyInfo();
  },
  mounted() {
    this.setData();
  },
  methods: {
    setData: function() {
      $(".tabbar span").each(function(idx, el) {
        $(el).click(function() {
          Vues.nowIndex = idx;
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
    },
    getFamilyInfo: function() {
      this.utilscommit.request("nvsi_getVolMyFamily", null, this.getBack);
    },
    getBack: function(result) {
      //console.log("familyInfo.3403",result);
      if (result) {
        if (result.data) {
          this.familyInfo = result.data;
          this.listMembers();
        }
      }
    },
    pageEvent: function(e) {
      //分页
      this.listMembers();
    },
    listMembers: function() {
      if (this.nowIndex == 0) {
        //我的家庭
        this.utilscommit.request(
          "nvsi_listFamilyMembers",
          {
            albx0233: this.familyInfo.albx0233,
            pageNow: this.pageNow,
            pageSize: this.pageSize
          },
          this.memberListBack
        );
      } else {
        //家庭时长
        this.utilscommit.request(
          "nvsi_familyTimeList",
          {
            areaid: this.userInfo.realareaid,
            familyid: this.familyInfo.albx0233,
            pageNow: this.pageNow,
            pageSize: this.pageSize
          },
          this.getTimeListBack
        );
      }
    },
    memberListBack: function(result) {
      if (result && result.data) {
        this.membersList = result.data;
        this.common.getTolData(this, result);
      } else {
        this.membersList = {};
        this.common.getTolData(this);
      }
    },
    getTimeListBack: function(result) {
      if (result && result.data) {
        this.timeList = result.data;
        this.common.getTolData(this, result);
      } else {
        this.timeList = {};
        this.common.getTolData(this);
      }
    },
    updateFamily: function() {
      //户主修改家庭
      this.showFamily = "修改家庭";
      this.familyName = this.familyInfo.albx0232;
      $(".mask.family").addClass("active");
    },
    deleteMember: function(type, times, memberid) {
      //户主删除成员
      if (type == 1) {
        //删除户主
        if (this.familyInfo.members > 1) {
          this.$swal("家庭中有其他成员，不可删除户主", { buttons: "确定" });
        } else if (times > 0) {
          this.$swal("家庭成员有时长记录，不可删除", { buttons: "确定" });
          return;
        }
      } else if (type == 2) {
        //删除成员
        if (times > 0) {
          this.$swal("家庭成员有时长记录，不可删除", { buttons: "确定" });
          return;
        }
      }
      this.$swal("确认删除成员？", { buttons: ["取消", "确定"] }).then(
        value => {
          if (value) {
            var data = {
              albx3402: Vues.familyInfo.albx0233,
              albx3403: memberid,
              albx3405: type
            };
            Vues.utilscommit.request(
              "nvsi_deleteFamilyMember",
              data,
              Vues.deleteMemberBack
            );
          }
        }
      );
    },
    deleteMemberBack: function(result) {
      if (result) {
        if (result.data) {
          window.location.reload();
        } else {
          this.$swal(result.message, { buttons: "确定" });
        }
      }
    },
    showFamilyDialog: function() {
      this.showFamily = "创建家庭";
      $(".mask.family").addClass("active");
    },
    closeFamily: function() {
      $(".mask.family").removeClass("active");
      $(".form-error").html("");
      this.familyName = "";
    },
    familyNameCheck: function() {
      var tip = "";
      var flag = true;
      if (!this.familyName) {
        tip = "请填写家庭名称";
        flag = false;
      } else if (
        this.familyInfo &&
        this.familyInfo.albx0232 == this.familyName
      ) {
        tip = "请修改家庭名称";
        flag = false;
      }
      this.formTip("familyName", tip);
      return flag;
    },
    onSubmit: function() {
      if (this.familyNameCheck()) {
        if (this.familyInfo && this.familyInfo.albx0232) {
          this.utilscommit.request(
            "nvsi_updateVolFamily",
            { id: this.familyInfo.id, albx0232: this.familyName },
            this.submitBack
          );
        } else {
          this.utilscommit.request(
            "nvsi_chostVolFamily",
            { albx0232: this.familyName },
            this.submitBack
          );
        }
      }
    },
    submitBack: function(result) {
      if (result) {
        if (result.data) {
          window.location.reload();
        } else {
          this.$swal(result.message, { buttons: "确定" });
        }
      }
    },
    showMemberDialog: function() {
      $(".mask.member").addClass("active");
    },
    closeMember: function() {
      $(".mask.member").removeClass("active");
      $(".form-error").html("");
      this.memberName = this.memberCard = "";
    },
    memberNameCheck: function() {
      var tip = "";
      var flag = true;
      if (!this.common.checkName(this.memberName)) {
        tip = "请正确填写姓名";
        flag = false;
      }
      this.formTip("memberName", tip);
      return flag;
    },
    memberCardCheck: function() {
      var tip = "";
      var flag = true;
      if (!this.common.checkCardNo(this.memberCard)) {
        tip = "请正确填写证件号码";
        flag = false;
      }
      this.formTip("memberCard", tip);
      return flag;
    },
    submitMember: function() {
      if (this.memberNameCheck() && this.memberCardCheck()) {
        var data = {
          name: this.memberName,
          card: this.memberCard,
          albx3402: this.familyInfo.albx0233
        };
        this.utilscommit.request(
          "nvsi_insertFamilyMember",
          data,
          this.insertMemberBack
        );
      }
    },
    insertMemberBack: function(result) {
      if (result) {
        if (result.data) {
          window.location.reload();
        } else {
          this.$swal(result.message, { buttons: "确定" });
        }
      }
    },
    showTimeDialog: function(memberinfo) {
      this.memberinfo = memberinfo;
      $(".mask.time").addClass("active");
      this.$refs.imgtitle.getImgTitle("选择照片上传");
    },
    closeTime: function() {
      $(".mask.time").removeClass("active");
      $(".form-error").html("");
      this.timePhoto = this.timeMember = this.timeRemark = "";
    },
    uploadPhoto() {
      //点击上传照片
      this.$refs.photo.click();
    },
    photoChanged(event) {
      //上传照片
      let file = event.target.files[0];
      if (!file.size) {
        return;
      } else {
        let filesize = (file.size / 1024).toFixed(2);
        //console.log("图片大小(2048)      ",filesize);
        if (filesize > 2048)
          return this.$swal("图片大小不能超过2M！", { buttons: "确定" });
      }
      //文件后缀
      let ext = file.name.substring(
        file.name.lastIndexOf(".") + 1,
        file.name.length
      );
      if (!/gif|png|jpg|jpeg/i.test(ext)) {
        return this.$swal("您只能上传格式为jpg、png、jpeg、gif的图片！", {
          buttons: "确定"
        });
      }
      $("#photoTips").html(file.name);
      this.photoFile = file;
    },
    applyTimeCheck() {
      //校验时长
      if (!this.applyTime) {
        // this.formTip("applyTime","时长不能为空");
        this.$swal("时长不能为空！", { buttons: "确定" });
        return false;
      } else if (
        this.applyTime <= 0 ||
        this.applyTime > 10 ||
        !this.common.checkApplyTime(this.applyTime)
      ) {
        // this.formTip("applyTime","申请时长必须是0.01-10的数字,小数点后保留两位");
        this.$swal("申请时长必须是0.01-10的数字,小数点后保留两位", {
          buttons: "确定"
        });
        return false;
      } else {
        this.formTip("applyTime", "");
        return true;
      }
    },
    photoCheck() {
      //校验照片
      if ($("#nowImg").length > 0) {
        return true;
      } else {
        this.$swal("照片不能为空", { buttons: "确定" });
        return false;
      }
      /* if(!this.photoFile){
          this.formTip("photo","照片不能为空");
          return false;
        }else{
          this.formTip("photo",'');
          return true;
        } */
    },
    remarksCheck() {
      //校验备注
      if (!this.remarks) {
        //this.formTip("remarks","备注不能为空");
        this.$swal("备注不能为空", { buttons: "确定" });
        return false;
      } else {
        //this.formTip("remarks","");
        return true;
      }
    },
    submitTime: function() {
      //提交时长
      if (this.photoCheck() && this.applyTimeCheck() && this.remarksCheck()) {
        let param = new FormData(); //创建form对象
        //let files = new window.File([this.imgFile], this.imgFile.name, {type: this.imgFile.type});
        //param.append('file',files);
        param.append("file", this.imgFile, this.imgFile.name);
        this.utilscommit.uploadImg(param, "sctp", this.uploadImgResult); //上传图片
      }
    },
    uploadImgResult(data) {
      this.photo = JSON.stringify(data);
      // ALBX0242		志愿者编号,ALBX0243		志愿家庭编号,ALBX0244		服务照片,ALBX0245		家庭时长,ALBX0247		备注
      var params = {
        albx0242: this.memberinfo.albx3403,
        albx0243: this.familyInfo.albx0233,
        albx0244: this.photo,
        albx0245: this.applyTime,
        albx0247: this.remarks
      };
      this.utilscommit.request(
        "nvsi_insertVolFamilyTime",
        params,
        this.submitTimeBack
      );
    },
    submitTimeBack(data) {
      //时长返回结果
      if (data && data.data) {
        this.$swal("录入成功", { buttons: "确定" }).then(function(value) {
          Vue.$router.go(0); //刷新页面
        });
      } else {
        this.$swal("录入失败", { buttons: "确定" });
      }
    },
    delTime(id) {
      //删除时长
      this.delTimeId = id;
      this.$swal("您确定要删除吗", { buttons: ["取消", "确定"] }).then(
        value => {
          if (value)
            Vues.utilscommit.request(
              "nvsi_delVolFamilyTime",
              { id: Vues.delTimeId },
              Vues.delTimeBack
            );
        }
      );
    },
    delTimeBack(data) {
      //删除时长结果
      if (data && data.data) {
        this.$swal("录入成功", { buttons: "确定" }).then(function(value) {
          Vues.listMembers(); //刷新页面
        });
      } else {
        this.$swal("删除成功", { buttons: "确定" }).then(function(value) {
          Vues.listMembers(); //刷新页面
        });
      }
    },
    formTip: function(el, tip) {
      $("#" + el + "Tips")
        .html(tip)
        .css("color", "red");
    },
    toVol(volnum, albp0020) {
      //志愿者
      window.open(
        this.$router.resolve({
          name: "volinfo",
          params: { define: this.routeDefine, data1: volnum, data2: albp0020 }
        }).href
      );
    }
  },
  watch: {
    nowIndex: function(newval, oldval) {
      //监听tab页面
      //刷新列表
      this.pageNow = 1;
      this.getFamilyInfo();
    }
  }
};
</script>

<style scoped>
.user-table th {
  text-align: left;
  padding: 10px;
}
p {
  font-size: 14px;
}
.form .form-error {
  padding-top: 5px;
  height: 17px;
}
.table tr th {
  padding-left: 0;
  text-align: left;
}
.table td {
  text-align: left;
}
</style>
