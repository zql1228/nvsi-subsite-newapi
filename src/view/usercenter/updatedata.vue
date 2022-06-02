<template>
  <div id="updatedata">
    <!--中右部分-->
    <li class="col v-t white tab-container">
      <updatemenu></updatemenu>
      <div class="tabbar-down">
        <!-- 基本信息 -->
        <div class="grid g-width">
          <div class="grid-item g-12">
            <div class="form">
              <p
                class="form-label"
                style="position: relative; top: -20px; margin-bottom: 0px"
              >
                <span>用户名：{{ userInfo.albp0052 }}</span>
              </p>
            </div>
            <div class="form">
              <p class="form-label">国家/地区</p>
              <div class="select">
                <select id="countrySelect" v-model="countrySelect">
                  <option value="0">请选择</option>
                  <option
                    :value="el.codeid"
                    v-for="el in countryList"
                    :key="el.codeid"
                  >
                    {{ el.codevalue }}
                  </option>
                </select>
              </div>
              <p class="form-error" id="countryTips"></p>
            </div>
            <div class="form">
              <p class="form-label">民族：</p>
              <div class="select">
                <select id="nationSelect" v-model="nationSelect">
                  <option value="0">请选择</option>
                  <option
                    :value="el.codeid"
                    v-for="el in nationList"
                    :key="el.codeid"
                  >
                    {{ el.codevalue }}
                  </option>
                </select>
              </div>
              <p class="form-error" id="nationTips"></p>
            </div>
            <div class="form">
              <p class="form-label">
                <!-- <em>*</em> -->政治面貌：<em>(建议填写)</em>
              </p>
              <div class="select">
                <select id="politicsSelect" v-model="politicsSelect">
                  <option value="0">请选择</option>
                  <option
                    :value="el.codeid"
                    v-for="(el, index) in politicsList"
                    :key="index"
                  >
                    {{ el.codevalue }}
                  </option>
                </select>
              </div>
              <p class="form-error" id="politicsTips"></p>
            </div>
            <div class="form">
              <p class="form-label">最高学历：</p>
              <div class="select">
                <select id="educationSelect" v-model="educationSelect">
                  <option value="0">请选择</option>
                  <option
                    :value="el.codeid"
                    v-for="(el, index) in educationList"
                    :key="index"
                  >
                    {{ el.codevalue }}
                  </option>
                </select>
              </div>
              <p class="form-error" id="educationTips"></p>
            </div>
            <div class="form">
              <p class="form-label">电子邮箱：</p>
              <input
                type="text"
                id="email"
                v-model="basicInfo.albp0081"
                @blur="emailCheck"
                maxlength="50"
                placeholder="请输入电子邮箱"
              />
              <p class="form-error" id="emailTips"></p>
            </div>
            <div class="form">
              <p class="form-label">固定电话：(格式如XXXX-XXXXXXXX)</p>
              <input
                type="text"
                id="telephone"
                v-model="basicInfo.albp0011"
                @blur="telephoneCheck"
                maxlength="13"
                oninput="this.value=this.value.replace(/[^\d-]/g,'')"
                placeholder="请输入固定电话"
              />
              <p class="form-error" id="telephoneTips"></p>
            </div>
            <div class="form">
              <p class="form-label">微信：</p>
              <input
                type="text"
                id="weixin"
                v-model="basicInfo.albp0015"
                maxlength="20"
                placeholder="请输入微信"
                oninput="this.value=this.value.replace(/[\u4e00-\u9fa5]/g, '')"
              />
              <p class="form-error"></p>
            </div>
            <div class="form">
              <p class="form-label">从业状况：</p>
              <div class="select">
                <select id="jobSelect" v-model="jobSelect">
                  <option value="0">请选择</option>
                  <option
                    :value="el.codeid"
                    v-for="(el, index) in jobList"
                    :key="index"
                  >
                    {{ el.codevalue }}
                  </option>
                </select>
              </div>
              <p class="form-error" id="jobTips"></p>
            </div>
          </div>
          <div class="grid-item g-12 mt-neg19">
            <div class="form p-rel" style="margin-bottom: 2px">
              <up-image
                :imgFile="imgFile"
                style="position: relative; left: -100px; bottom: -7px"
              ></up-image>
              <div
                style="
                  width: 209px;
                  font-size: 13px;
                  text-align: left;
                  position: absolute;
                  top: 50%;
                  right: 40px;
                  transform: translateY(-50%);
                "
              >
                宽110像素 X 高150像素，支持JPG,GIF,PNG格式大小不超过2M
              </div>
              <p class="form-error"></p>
            </div>

            <div class="form" id="nativeChoose_div">
              <p class="form-label">籍贯：</p>
              <div class="row w">
                <div class="col v-m">
                  <input
                    type="text"
                    id="nativeVal"
                    v-model="nativeChooseName"
                    readonly
                    placeholder="请选择籍贯"
                  />
                </div>
                <div class="col v-m pl-10" style="width: 90px">
                  <a
                    href="javascript:void(0);"
                    id="chooseNative"
                    @click="chooseNative"
                    class="button button-line"
                    >选择</a
                  >
                </div>
              </div>
              <p class="form-error" id="nativeTips"></p>
            </div>

            <div class="form">
              <!-- albp0075 绑定手机     albp0068 注册手机 -->
              <!-- 暂时不支持手机号登录 -->
              <p class="form-label"><em>*</em>手机号码：</p>
              <div class="row w">
                <div class="col v-m">
                  <input
                    type="text"
                    id="mobile"
                    :value="showPhone"
                    maxlength="11"
                    readonly
                  />
                </div>
                <div class="col v-m pl-10" style="width: 90px">
                  <a
                    href="javascript:void(0);"
                    @click="showBind()"
                    class="button button-line"
                    >修改</a
                  >
                </div>
              </div>
              <p class="form-error"></p>
            </div>

            <div class="form">
              <p class="form-label">QQ：</p>
              <input
                type="text"
                id="qq"
                v-model="basicInfo.albp0012"
                @blur="qqCheck"
                maxlength="15"
                oninput="this.value=this.value.replace(/^[1-9]\\d{4,10}/g,'')"
                placeholder="请输入QQ"
              />
              <p class="form-error" id="qqTips"></p>
            </div>

            <div class="form">
              <p class="form-label"><em>*</em>居住区域：</p>
              <div class="row w">
                <div class="col v-m">
                  <input
                    type="text"
                    id="liveAddress"
                    v-model="liveAddress"
                    readonly
                    placeholder="请选择居住区域"
                  />
                </div>
                <div class="col v-m pl-10" style="width: 90px">
                  <a
                    href="javascript:void(0);"
                    id="chooseLive"
                    @click="chooseLive()"
                    class="button button-line"
                    >选择</a
                  >
                </div>
              </div>
              <p class="form-error" id="liveAddressTips"></p>
            </div>

            <div class="form">
              <p class="form-label">详细地址：</p>
              <input
                type="text"
                id="detailedAddress"
                v-model="basicInfo.albp0013"
                maxlength="50"
                placeholder="请输入详细地址"
              />
              <p class="form-error" id="detailedAddressTips"></p>
            </div>
            <div class="form">
              <p class="form-label"><em>*</em>服务区域：</p>
              <div class="row w">
                <div class="col v-m">
                  <input
                    type="text"
                    v-model="serviceAreaName"
                    id="serviceArea"
                    readonly
                    placeholder="请选择服务区域"
                  />
                </div>
                <div class="col v-m pl-10" style="width: 90px">
                  <a
                    href="javascript:void(0);"
                    @click="chooseArea"
                    class="button button-line"
                    id="choose"
                    >选择</a
                  >
                </div>
              </div>
              <p class="form-error" id="serviceAreaTips"></p>
            </div>
          </div>
          <div class="grid-item g-24">
            <!-- 服务意愿 -->
            <div class="form">
              <p class="form-label">可参与服务时间：</p>
              <table class="table table-noline">
                <tr>
                  <th>星期一</th>
                  <th>星期二</th>
                  <th>星期三</th>
                  <th>星期四</th>
                  <th>星期五</th>
                  <th>星期六</th>
                  <th>星期日</th>
                  <th>节假日</th>
                </tr>
                <tr>
                  <td
                    v-for="(el, index) in canServiceTimeList.filter(
                      (obj, index) => index % 3 == 0
                    )"
                    :key="index"
                  >
                    <label class="checkbox" v-bind:for="el.id">
                      <input
                        type="checkbox"
                        name="time"
                        :value="el.codeid"
                        v-bind:id="el.id"
                        v-model="canServiceTime"
                      />
                      <span></span>
                      <i v-show="el.codevalue">{{
                        el.codevalue.substring(3, 5)
                      }}</i>
                    </label>
                  </td>
                </tr>
                <tr>
                  <td
                    v-for="(el, index) in canServiceTimeList.filter(
                      (obj, index) => index % 3 == 1
                    )"
                    :key="index"
                  >
                    <label class="checkbox" v-bind:for="el.id">
                      <input
                        type="checkbox"
                        name="time"
                        v-bind:id="el.id"
                        :value="el.codeid"
                        v-model="canServiceTime"
                      />
                      <span></span>
                      <i v-show="el.codevalue">{{
                        el.codevalue.substring(3, 5)
                      }}</i>
                    </label>
                  </td>
                </tr>
                <tr>
                  <td
                    v-for="(el, index) in canServiceTimeList.filter(
                      (obj, index) => index % 3 == 2
                    )"
                    :key="index"
                  >
                    <label class="checkbox" v-bind:for="el.id">
                      <input
                        type="checkbox"
                        name="time"
                        v-bind:id="el.id"
                        v-bind:value="el.codeid"
                        v-model="canServiceTime"
                      />
                      <span></span>
                      <i v-show="el.codevalue">{{
                        el.codevalue.substring(3, 5)
                      }}</i>
                    </label>
                  </td>
                </tr>
              </table>
            </div>
          </div>
          <div class="grid-item g-24" style="margin-top: 22px">
            <div class="form">
              <p class="form-label">
                <em>*</em>服务类别：<em>（最多选择4项）</em>
              </p>
              <div class="checkbox-fixed">
                <label
                  class="checkbox"
                  v-for="(el, index) in serviceTypeList"
                  :key="index"
                  :for="el.id"
                >
                  <input
                    type="checkbox"
                    name="checkbox"
                    :id="el.id"
                    :value="el.codeid"
                    v-model="serviceType"
                    @change="serviceTypeCheck"
                    :disabled="
                      serviceType.length > 3 &&
                        serviceType.indexOf(el.codeid) == -1
                    "
                  />
                  <span></span>
                  <i :title="el.codevalue">{{
                    el.codevalue | truncate(10, "...")
                  }}</i>
                </label>
              </div>
              <p class="form-error" id="serviceTypeTips"></p>
            </div>
          </div>
          <div class="grid-item g-24" v-if="serviceRangeList.length > 0">
            <div class="form">
              <p class="form-label">服务领域或行业：<em>(建议填写)</em></p>
              <div class="checkbox-fixed">
                <label
                  class="checkbox"
                  v-for="(el, index) in serviceRangeList"
                  :key="index"
                  :for="el.id"
                >
                  <input
                    type="checkbox"
                    name="checkbox"
                    :id="el.id"
                    :value="el.albe0113"
                    v-model="serviceRange"
                  />
                  <span></span>
                  <i :title="el.albe0112">{{
                    el.albe0112 | truncate(10, "...")
                  }}</i>
                </label>
              </div>
            </div>
          </div>
          <div
            class="grid-item g-12"
            v-if="isShowIdcardV"
            style="margin-top: 10px"
          >
            <div class="form row w">
              <p class="form-label col v-m" style="width: 150px">
                <em>*</em>是否取得涉税专业资格证书：
              </p>
              <div class="col v-m t-l">
                <label for="yesyes1" class="radio" style="margin-left: 50px">
                  <input
                    type="radio"
                    id="yesyes1"
                    name="yesyes1"
                    value="1"
                    v-model="isQualification"
                  />
                  <span></span>
                  <i>是</i>
                </label>
                <label for="nono1" class="radio">
                  <input
                    type="radio"
                    id="nono1"
                    name="nono1"
                    value="0"
                    v-model="isQualification"
                  />
                  <span></span>
                  <i>否</i>
                </label>
              </div>
            </div>
          </div>
          <div
            class="grid-item g-12"
            v-if="isShowIdcardV"
            style="margin-top: 10px"
          >
            <div class="form">
              <p class="form-label"><em>*</em>身份认证信息：</p>
              <div class="select">
                <select v-model="idcardV" @change="idcardVCheck">
                  <option value="0">请选择</option>
                  <option
                    :value="el.codeid"
                    v-for="(el, index) in idcardVList"
                    :key="index"
                  >
                    {{ el.codevalue }}
                  </option>
                </select>
              </div>
              <p class="form-error" id="idcardVTips"></p>
            </div>
          </div>
          <div
            class="grid-item g-12"
            style="margin-top: 10px"
            v-if="isQualification == 1 && isShowIdcardV"
          >
            <div class="form">
              <p class="form-label"><em>*</em>涉税专业资格证书类别：</p>
              <div class="select">
                <select v-model="taxRevenue" @change="taxRevenueCheck">
                  <option value="0">请选择</option>
                  <option
                    :value="el.codeid"
                    v-for="(el, index) in taxRevenueList"
                    :key="index"
                  >
                    {{ el.codevalue }}
                  </option>
                </select>
              </div>
              <p class="form-error" id="taxRevenueTips"></p>
            </div>
          </div>
          <div
            class="grid-item g-12"
            style="margin-top: 10px"
            v-if="isQualification == 1 && isShowIdcardV"
          >
            <div class="form">
              <p class="form-label"><em>*</em>涉税专业资格证书编号：</p>
              <input
                type="text"
                id="albp2807"
                v-model="basicInfoAlbp2807"
                maxlength="30"
                oninput="this.value=this.value.replace(/[^\w_.]/g,'').slice(0,30);"
                placeholder="请输入涉税专业资格证书编号"
                @click="albp2807Check"
              />
              <p class="form-error" id="albp2807Tips"></p>
            </div>
          </div>
          <div class="grid-item g-24" style="margin-top: 15px">
            <div class="form">
              <p class="form-label"><em>*</em>个人特长：</p>
              <div class="checkbox-fixed">
                <label
                  class="checkbox"
                  v-for="(el, index) in strengthList"
                  :key="index"
                  :for="el.id"
                >
                  <input
                    type="checkbox"
                    name="checkbox"
                    :id="el.id"
                    :value="el.codeid"
                    v-model="strength"
                    @change="strengthCheck"
                  />
                  <span></span>
                  <i>{{ el.codevalue }}</i>
                </label>
              </div>
              <p class="form-error" id="strengthTips"></p>
            </div>
          </div>
          <div class="grid-item g-24">
            <div class="form">
              <p class="form-label" style="width: 150px">
                <em>*</em>队伍邀请志愿者加入项目 (权限设置， 补录项目除外) ：
              </p>
              <div class="col v-m t-l">
                <label for="yes" class="radio">
                  <input
                    type="radio"
                    id="yes"
                    name="isInvite"
                    value="0"
                    v-model="isInvite"
                  />
                  <span></span>
                  <i>邀请加入项目,需要本人同意</i>
                </label>
                <label for="no" class="radio">
                  <input
                    type="radio"
                    id="no"
                    name="isInvite"
                    value="1"
                    v-model="isInvite"
                  />
                  <span></span>
                  <i>邀请加入项目,默认同意邀请</i>
                </label>
                <label for="no2" class="radio">
                  <input
                    type="radio"
                    id="no2"
                    name="isInvite"
                    value="2"
                    v-model="isInvite"
                  />
                  <span></span>
                  <i>邀请加入项目,默认拒绝邀请</i>
                </label>
              </div>
            </div>
          </div>
          <div class="grid-item g-24" style="margin-top: 25px">
            <div class="form">
              <p class="form-label" style="width: 150px">
                <em>*</em>队伍邀请志愿者加入队伍 (权限设置) ：
              </p>
              <div class="col v-m t-l">
                <label for="yesyes" class="radio">
                  <input
                    type="radio"
                    id="yesyes"
                    name="InviteOrg"
                    value="0"
                    v-model="isInviteOrg"
                  />
                  <span></span>
                  <i>默认同意加入</i>
                </label>
                <label for="nono" class="radio" style="margin-left: 98px">
                  <input
                    type="radio"
                    id="nono"
                    name="InviteOrg"
                    value="1"
                    v-model="isInviteOrg"
                  />
                  <span></span>
                  <i>默认拒绝加入</i>
                </label>
              </div>
            </div>
          </div>
          <!-- <div class="grid-item g-12">
            <div class="form row w">
              <p class="form-label col v-m" style="width:150px">受邀加入志愿项目：</p>
              <div class="col v-m t-l">
                <label for="yes" class="radio">
                  <input type="radio" id="yes" name="radio" value="1" v-model="isInvite">
                  <span></span>
                  <i>是</i>
                </label>
                <label for="no" class="radio">
                  <input type="radio" id="no" name="radio" value="0" v-model="isInvite">
                  <span></span>
                  <i>否</i>
                </label>
              </div>
            </div>
          </div> -->
          <!-- <div class="grid-item g-12">
            <div class="form row w">
              <p class="form-label col v-m" style="width:150px">受邀加入志愿队伍：</p>
              <div class="col v-m t-l">
                <label for="yesyes" class="radio">
                  <input type="radio" id="yesyes" name="InviteOrg" value="1" v-model="isInviteOrg">
                  <span></span>
                  <i>是</i>
                </label>
                <label for="nono" class="radio">
                  <input type="radio" id="nono" name="InviteOrg" value="0" v-model="isInviteOrg">
                  <span></span>
                  <i>否</i>
                </label>
              </div>
            </div>
          </div> -->
          <div class="pt-30 t-c">
            <a
              href="javascript:void(0);"
              @click="onSubmit"
              :class="isClick ? 'button' : 'button btn_disabled'"
              style="width: 200px"
              >保存修改</a
            >
          </div>
        </div>
      </div>
    </li>

    <!--区域选择弹窗-->
    <div class="mask area">
      <div class="mask-info">
        <div class="mask-header row w">
          <div class="col v-m">
            <h2>{{ areaChooseTip }}</h2>
          </div>
          <div class="col v-m t-r">
            <a href="javascript:void(0);" @click="closeMask" class="mask-close"
              ><img src="../../assets/img/close.png" alt=""
            /></a>
          </div>
        </div>
        <areaDialog ref="areaDialog" :areaType="areaType"></areaDialog>
      </div>
    </div>

    <!-- 绑定手机 -->
    <div class="mask bind">
      <div
        class="mask-info"
        style="width: 700px; max-height: 705px; margin-left: -350px"
      >
        <div class="mask-header row w">
          <div class="col v-m">
            <h2>修改手机</h2>
          </div>
          <div class="col v-m t-r">
            <a href="javascript:void(0);" class="mask-close" @click="closeBind"
              ><img src="../../assets/img/close.png" alt=""
            /></a>
          </div>
        </div>
        <div style="padding: 20px 50px 0 50px">
          <div class="form">
            <p class="form-label"><em>*</em>手机号码：</p>
            <input
              id="bindPhone"
              v-model="bindPhone"
              @blur="bindPhoneCheck"
              maxlength="11"
              placeholder="请输入手机号码"
            />
          </div>
          <span class="form-error" id="bindPhoneTips"></span>
        </div>
        <div class="form t-c">
          <a
            href="javascript:void(0);"
            class="button"
            @click="bindSubmit"
            style="margin-top: 15px"
            >确定</a
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const AreaDialog = () => import("@/view/home/area.vue"); //区域弹出层
const updatemenu = () => import("@/components/usercenter/updatemenu.vue"); //横向菜单栏
import UpImage from "@/view/home/upimage.vue";
import avatar from "../../assets/img/mruser.png";
import { getCodeList } from "../../assets/js/getCodevalueList";

export default {
  name: "updatedata",
  components: {
    AreaDialog,
    UpImage,
    updatemenu
  },
  data() {
    return {
      routeDefine: this.$route.params.define,
      areaid: "",
      userInfo: this.$store.getters.getUser, //账户信息
      basicInfo: this.$store.getters.getBasic, //用户信息
      countryList: {}, //国家列表
      countrySelect: "156", //国家，默认中国
      nationList: {}, //民族列表
      nationSelect: "01", //民族，默认汉族
      politicsList: {}, //政治面貌列表
      politicsSelect: "0", //政治面貌
      educationList: {}, //学历列表
      educationSelect: "0", //学历
      jobList: {}, //从业列表
      jobSelect: "0", //从业
      isInvite: "0", //队伍邀请志愿者加入项目
      isInviteOrg: "0", //队伍邀请志愿者加入队伍权限
      liveAddress: "", //居住区域名
      nativeChooseName: "", //籍贯区域名
      photo: {}, //头像
      areaType: "",
      areaChooseTip: "",
      imgFile: "",
      canServiceTimeList: [], //可参与服务时间
      canServiceTime: [],
      serviceTypeList: [], //服务类型
      serviceType: [],
      serviceRangeList: [], //服务领域或行业
      idcardV: 0, //身份认证
      idcardVList: [], //身份认证信息
      isQualification: 0, //是否取得涉税专业资格证书
      taxRevenue: 0, //涉税专业资格证书类别
      taxRevenueList: [], //涉税专业资格证书类别
      serviceRange: [],
      basicInfoAlbp2807: "", //涉税专业资格证书编号
      serviceAreaName: "", //服务区域名
      strength: [], //个人特长
      strengthList: [],
      bindPhone: "",
      bindPhoneFlag: false,
      imgcode: "",
      code: "",
      codeButton: "获取验证码",
      countdown: 60,
      imgCodeFlag: false,
      timer: null, //定时器
      imgkey: "", //图文验证码key
      // isLoginphone:false,//是否将手机号用作登录
      telephone: "", // 手机号码
      showPhone: "", // 脱敏显示手机号
      isClick: true // 按钮是否可以点击
    };
  },
  created() {
    window.Vues = this; //主体vue实例挂载
    window.imgError = this.imgError;
    this.areaid = this.$store.getters.getArea.areaid;
    // 国家
    // this.utilscommit.requestapi(
    //   "codeValueQueryFortisWeb",
    //   { tableName: "nvsi_albp0002" },
    //   this.getCountryList
    // );
    this.getCountryList();
    // 民族
    // this.utilscommit.requestapi(
    //   "codeValueQueryFortisWeb",
    //   { tableName: "nvsi_albp0008" },
    //   this.getNationList
    // );
    this.getNationList();
    // 政治面貌
    // this.utilscommit.requestapi(
    //   "codeValueQueryFortisWeb",
    //   { tableName: "nvsi_albp0007" },
    //   this.getPoliticsList
    // );
    this.getPoliticsList();
    // 最高学历
    // this.utilscommit.requestapi(
    //   "codeValueQueryFortisWeb",
    //   { tableName: "nvsi_albp0017" },
    //   this.getEducationList
    // );
    this.getEducationList();
    // 从业状况
    // this.utilscommit.requestapi(
    //   "codeValueQueryFortisWeb",
    //   { tableName: "nvsi_albp0018" },
    //   this.getJobList
    // );
    this.getJobList();
    // this.utilscommit.requestapi(
    //   "getAllCodeWeb",
    //   { codeTypeName: "lbe05", areaId: this.areaid },
    //   this.getServiceTypeList
    // );
    this.getServiceTypeList();
    // this.utilscommit.requestapi(
    //   "listServiceRangeFortisWeb",
    //   { areaid: this.areaid },
    //   this.getServiceRangeList
    // );
    this.getServiceRangeList();
    // this.utilscommit.requestapi(
    //   "codeValueQueryFortisWeb",
    //   { tableName: "nvsi_albp0035" },
    //   this.getCanServiceTimeList
    // );
    this.getCanServiceTimeList();
    // this.utilscommit.requestapi(
    //   "codeValueQueryFortisWeb",
    //   { tableName: "nvsi_albp0039" },
    //   this.getStrengthList
    // );
    this.getStrengthList();
    // this.utilscommit.requestapi(
    //   "codeValueQueryFortisWeb",
    //   { tableName: "nvsi_albp2804" },
    //   this.getidcardVList
    // ); //身份认证信息
    this.getidcardVList();
    // this.utilscommit.requestapi(
    //   "codeValueQueryFortisWeb",
    //   { tableName: "nvsi_albp2806" },
    //   this.getTaxRevenueList
    // ); // 涉税专业资格证书类别
    this.getTaxRevenueList();
  },
  methods: {
    getCountryList() {
      getCodeList("codeValueQueryFortisWeb", "nvsi_albp0002", {
        tablename: "nvsi_albp0002"
      }).then(res => {
        this.countryList = res;
      });
    },
    getNationList() {
      getCodeList("codeValueQueryFortisWeb", "nvsi_albp0008", {
        tablename: "nvsi_albp0008"
      }).then(res => {
        this.nationList = this.common.orderBy(res, "codeid", "asc");
      });
    },
    getPoliticsList() {
      getCodeList("codeValueQueryFortisWeb", "nvsi_albp0007", {
        tablename: "nvsi_albp0007"
      }).then(res => {
        this.politicsList = this.common.orderBy(res, "codeid", "asc");
      });
    },
    getEducationList() {
      getCodeList("codeValueQueryFortisWeb", "nvsi_albp0017", {
        tablename: "nvsi_albp0017"
      }).then(res => {
        this.educationList = this.common.orderBy(res, "orderid", "asc");
      });
    },
    getJobList() {
      getCodeList("codeValueQueryFortisWeb", "nvsi_albp0018", {
        tablename: "nvsi_albp0018"
      }).then(res => {
        this.jobList = this.common.orderBy(res, "codeid", "asc");
      });
    },
    getServiceTypeList() {
      getCodeList("getAllCodeWeb", "lbe05", {
        codeTypeName: "lbe05",
        areaId: this.areaid
      }).then(res => {
        this.serviceTypeList = res;
      });
    },
    getServiceRangeList() {
      getCodeList("listServiceRangeFortisWeb", "ServiceRange", {
        areaid: this.areaid
      }).then(res => {
        this.serviceRangeList = res;
      });
    },
    getCanServiceTimeList() {
      getCodeList("codeValueQueryFortisWeb", "nvsi_albp0035", {
        tablename: "nvsi_albp0035"
      }).then(res => {
        this.canServiceTimeList = this.common.orderBy(res, "codeid", "asc");
      });
    },
    getStrengthList() {
      getCodeList("codeValueQueryFortisWeb", "nvsi_albp0039", {
        tablename: "nvsi_albp0039"
      }).then(res => {
        this.strengthList = this.common.orderBy(res, "codeid", "asc");
      });
    },
    getidcardVList() {
      getCodeList("codeValueQueryFortisWeb", "nvsi_albp2804", {
        tablename: "nvsi_albp2804"
      }).then(res => {
        if (res) this.idcardVList = res;
      });
      //身份认证信息
    },
    getTaxRevenueList() {
      getCodeList("codeValueQueryFortisWeb", "nvsi_albp2806", {
        tablename: "nvsi_albp2806"
      }).then(res => {
        this.taxRevenueList = res;
      });
      //涉税专业资格证书类别
    },
    getBasicInfo() {
      this.basicInfo = this.$store.getters.getBasic;
      // 国家/地区
      this.countrySelect = this.basicInfo.albp0002
        ? this.basicInfo.albp0002.replace(/(^\s*)|(\s*$)/g, "")
        : "156";
      // 民族
      this.nationSelect = this.basicInfo.albp0008
        ? this.basicInfo.albp0008
        : "01";
      // 政治面貌
      this.politicsSelect = this.basicInfo.albp0007
        ? this.basicInfo.albp0007.replace(/^\s+|\s+$/g, "")
        : "0";
      // 最高学历
      this.educationSelect = this.basicInfo.albp0017
        ? this.basicInfo.albp0017.replace(/^\s+|\s+$/g, "")
        : "0";
      // 手机号
      this.telephone = this.basicInfo.albp0010
        ? this.basicInfo.albp0010
        : this.userInfo.albp0010;
      // 脱敏手机号
      this.showPhone = this.basicInfo.phone
        ? this.basicInfo.phone
        : this.userInfo.telephone;
      // 从业状况
      this.jobSelect = this.basicInfo.albp0018
        ? this.basicInfo.albp0018.replace(/(^\s*)|(\s*$)/g, "")
        : "0";
      // 受邀加入项目
      this.isInvite = this.basicInfo.albp0098 ? this.basicInfo.albp0098 : "0";
      // 受邀加入队伍
      this.isInviteOrg = this.basicInfo.albp0099
        ? this.basicInfo.albp0099
        : "0";
      // 服务范围
      this.serviceRange = this.basicInfo.albp0022
        ? this.basicInfo.albp0022.split(",")
        : [];
      // 服务时间
      this.canServiceTime = this.basicInfo.albp0035
        ? this.basicInfo.albp0035.split(",")
        : [];
      // 个人特长
      this.strength = this.basicInfo.albp0039
        ? this.basicInfo.albp0039.split(",")
        : [];
      // 身份认证信息
      this.idcardV = this.basicInfo.albp2804 ? this.basicInfo.albp2804 : 0;
      // 是否取得涉税专业资格证书
      this.isQualification = this.basicInfo.albp2805
        ? this.basicInfo.albp2805
        : "0";
      // 涉税专业资格证书类别
      this.taxRevenue = this.basicInfo.albp2806 ? this.basicInfo.albp2806 : "0";
      // 涉税专业资格证书编号
      this.basicInfoAlbp2807 = this.basicInfo.albp2807
        ? this.basicInfo.albp2807
        : "";
      // 设置照片
      if (this.basicInfo.albp0027) {
        this.utilscommit.requestapi(
          "getVolunteerPhotoOnSecret",
          { cardno: this.userInfo.albp0005 },
          res => {
            if (res.code == 0 && res.data.photourl) {
              this.basicInfo.photourl = res.data.photourl;
              $("#photo").html(
                '<img style="width: 100%;height: 100%;" alt="" class="w" src="' +
                  this.basicInfo.photourl +
                  '" onerror="imgError(this)">'
              );
            }
          }
        );
      }
      if (this.basicInfo.albp0009) {
        //设置籍贯
        this.utilscommit.requestapi(
          "areaFullInfo",
          { areaid: this.basicInfo.albp0009 },
          this.nativeBack
        );
      }
      if (this.basicInfo.albp0028) {
        //设置居住区域
        this.utilscommit.requestapi(
          "areaFullInfo",
          { areaid: this.basicInfo.albp0028 },
          this.liveBack
        );
      }
      //设置服务区域
      var nowareaid = this.$store.getters.getArea.areaid;
      var nowsitestye = 0; //1=非本站
      if (
        this.basicInfo.albp0020 &&
        nowareaid &&
        this.basicInfo.albp0020.substring(0, 2) != nowareaid.substring(0, 2) &&
        !this.$store.getters.getArea.industrycode
      ) {
        // 非本站志愿者
        nowsitestye = 1;
        this.serviceAreaName = "";
      } else if (this.basicInfo.albp0020) {
        this.utilscommit.requestapi(
          "areaFullInfo",
          { areaid: this.basicInfo.albp0020 },
          this.serviceBack
        );
      }
      if (this.basicInfo.albp0021) {
        //设置服务类型
        let array = this.basicInfo.albp0021.split(",");
        this.serviceType = [...new Set(array)]; //去重
        // this.serviceType = this.basicInfo.albp0021.split(',');
        if (nowsitestye == 1 && this.serviceType && this.serviceTypeList) {
          //非本站点的志愿者，地方的服务类别需去除
          for (let i = 0; i < this.serviceTypeList.length; i++) {
            if (this.serviceTypeList[i].albe0124 != "0") {
              //地方的服务类别
              for (let j = 0; j < this.serviceType.length; j++) {
                if (this.serviceTypeList[i].codeid == this.serviceType[j]) {
                  this.serviceType.splice(j, 1);
                }
              }
            }
          }
        }
      }
      $("#nativeChoose_div")
        .val("0")
        .css("display", "none");
      switch (this.countrySelect) {
        case "156":
          $("#nativeChoose_div")
            .val(this.basicInfo.albp0008)
            .css("display", "");
          break;
        case "344": //香港
          break;
        case "446": //澳门
          break;
        case "158": //台湾
          break;
        default:
          $("#politicsSelect")
            .val("13")
            .attr("disabled", true);
          $("#nationSelect")
            .val("97")
            .attr("disabled", true);
      }
    },
    basicInfoCheck(result) {
      if (result && result.data) {
      } else {
        Vueh.loginOut();
        // this.utilscommit.request("nvsi_loginOut", null, this.loginOutCheck);
      }
    },
    loginOutCheck(result) {
      this.$utilroutes.toLogin();
    },
    nativeBack(result) {
      if (result && result.fullname) {
        this.nativeChooseName = result.fullname;
      } else {
        this.nativeChooseName = "";
      }
    },
    liveBack(result) {
      if (result && result.fullname) {
        this.liveAddress = result.fullname;
      } else {
        this.liveAddress = "";
      }
    },
    serviceBack(result) {
      if (result && result.fullname) {
        this.serviceAreaName = result.fullname;
      } else {
        this.serviceAreaName = "";
      }
    },
    onSubmit() {
      if (!this.isClick) {
        return;
      }
      let flag =
        this.telephoneCheck() &&
        this.qqCheck() &&
        this.liveAddressCheck() &&
        this.serviceAreaCheck() &&
        this.serviceTypeCheck() &&
        this.strengthCheck() &&
        this.$store.getters.getUser.albp0010;
      if (flag) {
        if (this.serviceRange && this.serviceRange.length > 0) {
          let serviceRange = this.serviceRange.toString();
          if (serviceRange.indexOf("0013") != -1) {
            if (
              (this.idcardVCheck() && this.isQualification == 0) ||
              (this.idcardVCheck() &&
                this.isQualification == 1 &&
                this.albp2807Check() &&
                this.taxRevenueCheck())
            ) {
              this.toSubmit();
            } else {
              this.$swal("存在未填写或填写错误的信息", { buttons: "确定" });
            }
          } else {
            this.toSubmit();
          }
        } else {
          this.toSubmit();
        }
      } else {
        this.$swal("存在未填写或填写错误的信息", { buttons: "确定" });
      }
    },
    async toSubmit() {
      // 按钮置灰不可点击
      this.isClick = false;
      // 判断是否需要上传头像
      if ($("#nowImg").length > 0) {
        // 上传头像
        let { data: res } = await this.utilscommit.asyncUpload(this.imgFile);
        if (res.code == 0 && res.data) {
          this.commit(JSON.stringify(res.data));
        } else {
          this.$swal("头像上传失败", { buttons: "确定" });
          this.isClick = true;
        }
      } else {
        this.commit(null);
      }
    },
    // 提交修改资料
    commit(serverData) {
      let params = {
        albp0005: this.userInfo.albp0005 // 身份证号
      };
      // 首次修改需要传所有字段
      if (!this.userInfo.albp0020) {
        params.albp0003 = this.basicInfo.albp0003; // 用户名serviceRange
        params.albp0006 = this.basicInfo.albp0006; // 性别
        params.albp0004 = this.basicInfo.albp0004; // 证件类型
        params.albp0057 = this.basicInfo.albp0057; // 注册区域
        params.albp0014 = this.basicInfo.albp0014; // 出生日期
        params.albp0034 = this.basicInfo.albp0034; // 注册日期
        params.albp0052 = this.basicInfo.albp0052; // 用户名
        // 港澳台账号需要传证件照正反面
        if (this.userInfo.albp0004 != "01") {
          params.albp0069 = this.basicInfo.albp0069;
          params.albp01_121 = this.basicInfo.albp01_121;
        }
      }
      this.countrySelect == 0 ? "" : (params.albp0002 = this.countrySelect); // 国籍
      this.politicsSelect == 0 ? "" : (params.albp0007 = this.politicsSelect); // 政治面貌
      this.nationSelect == 0 ? "" : (params.albp0008 = this.nationSelect); // 民族
      this.basicInfo.albp0009
        ? (params.albp0009 = this.basicInfo.albp0009)
        : ""; // 籍贯
      this.telephone.length == 11 ? (params.albp0010 = this.telephone) : ""; // 手机号
      this.basicInfo.albp0011
        ? (params.albp0011 = this.basicInfo.albp0011)
        : ""; // 固定电话
      // this.basicInfo.albp0012
      //   ? (params.albp0012 = this.basicInfo.albp0012)
      //   : ""; // QQ
      params.albp0012 = this.basicInfo.albp0012;
      this.basicInfo.albp0013
        ? (params.albp0013 = this.basicInfo.albp0013)
        : ""; // 详细地址
      this.basicInfo.albp0015
        ? (params.albp0015 = this.basicInfo.albp0015)
        : ""; // 微信
      this.educationSelect == 0 ? "" : (params.albp0017 = this.educationSelect); // 最高学历
      this.jobSelect == 0 ? "" : (params.albp0018 = this.jobSelect); // 从业状况
      params.albp0098 = this.isInvite; // 邀请志愿者加入项目权限
      params.albp0099 = this.isInviteOrg; // 邀请志愿者加入队伍权限
      params.albp0020 = this.basicInfo.albp0020; // 志愿者服务区域
      params.albp0021 = this.serviceType.join(","); // 服务类别
      this.serviceRange.length
        ? (params.albp0022 = this.serviceRange.join(","))
        : ""; // 领域类别
      params.albp0025 = this.serviceAreaName; // 服务区域名
      serverData || this.basicInfo.albp0027
        ? (params.albp0027 = serverData || this.basicInfo.albp0027)
        : ""; // 头像
      this.basicInfo.albp0028
        ? (params.albp0028 = this.basicInfo.albp0028)
        : ""; // 居住区域id
      this.canServiceTime.length
        ? (params.albp0035 = this.canServiceTime.join(","))
        : ""; // 可服务时间
      this.strength.length ? (params.albp0039 = this.strength.join(",")) : ""; // 个人特长
      params.albp0047 = this.liveAddress; // 居住区域名
      this.basicInfo.albp0081
        ? (params.albp0081 = this.basicInfo.albp0081)
        : ""; // 邮箱

      if (this.serviceRange && this.serviceRange.length > 0) {
        let serviceRange = this.serviceRange.toString();
        if (serviceRange.indexOf("0013") != -1) {
          if (this.idcardV != 0) params.albp2804 = this.idcardV; //身份认证信息
          if (this.isQualification != 0) params.albp2805 = this.isQualification; //是否取得涉税专业资格证书
          if (this.taxRevenue != 0) params.albp2806 = this.taxRevenue; //涉税专业资格证书类别
          if (this.basicInfoAlbp2807) params.albp2807 = this.basicInfoAlbp2807; //涉税专业资格证书编号
        }
      }
      console.log(params);
      this.utilscommit.requestapi(
        "updateVolunInforOnWeb",
        params,
        this.modifyBack
      );
    },
    modifyBack(result) {
      if (result) {
        if (result.code == 0) {
          this.$swal("修改成功", { buttons: "确定" }).then(function(value) {
            Vuec.getUser(); //刷新页面
          });
          let params = { albp0005: this.userInfo.albp0005 };
          this.utilscommit.requestapi("getUserInfoFortisWeb", params, res => {
            if (res.code == 0 && res.data) {
              this.$store.commit("saveUser", res.data);
            }
          });
        } else {
          this.$swal("修改失败", { buttons: "确定" }).then(function(value) {
            Vuec.getUser(); //刷新页面
          });
        }
      }
      this.isClick = true;
    },
    countryCheck() {
      var tip = "";
      var flag = true;
      if (this.countrySelect == "0") {
        tip = "国家/地区不能为空";
        flag = false;
      }
      this.formTip("country", tip);
      return flag;
    },
    nationCheck() {
      var tip = "";
      var flag = true;
      if (this.nationSelect == "0") {
        tip = "民族不能为空";
        flag = false;
      }
      this.formTip("nation", tip);
      return flag;
    },
    politicsCheck() {
      var tip = "";
      var flag = true;
      if (this.politicsSelect == "0") {
        tip = "政治面貌不能为空";
        flag = false;
      }
      this.formTip("politics", tip);
      return flag;
    },
    emailCheck() {
      var tip = "";
      var flag = true;
      if ($("#email").val() && !this.common.checkEmail($("#email").val())) {
        tip = "请输入正确的电子邮箱";
        flag = false;
      }
      this.formTip("email", tip);
      return flag;
    },
    telephoneCheck() {
      var tip = "";
      var flag = true;
      if (
        $("#telephone").val() != "" &&
        !this.common.checkTelPhoneno($("#telephone").val())
      ) {
        tip = "请填写正确的固定电话号码";
        flag = false;
      }
      this.formTip("telephone", tip);
      return flag;
    },
    qqCheck() {
      var tip = "";
      var flag = true;
      if ($("#qq").val() != "" && !this.common.checkqqphoneno($("#qq").val())) {
        tip = "请填写正确的qq号码";
        flag = false;
      }
      this.formTip("qq", tip);
      return flag;
    },
    liveAddressCheck() {
      var tip = "";
      var flag = true;
      if (this.liveAddress == "") {
        tip = "居住区域不能为空";
        flag = false;
      } else if (this.basicInfo.albp0028.substring(4, 6) == "00") {
        tip = "居住区域没有精确到区（县）";
        flag = false;
      }
      this.formTip("liveAddress", tip);
      return flag;
    },
    serviceAreaCheck() {
      var tip = "";
      var flag = true;
      if (this.serviceAreaName == "") {
        tip = "服务区域不能为空";
        flag = false;
      } else if (this.basicInfo.albp0020.substring(4, 6) == "00") {
        tip = "服务区域没有精确到区（县）";
        flag = false;
      }
      this.formTip("serviceArea", tip);
      return flag;
    },
    serviceTypeCheck(el) {
      var tip = "";
      var flag = true;
      if (this.serviceType.length > 0) {
        var sList = [];
        var array = [];
        for (let i = 0; i < this.serviceTypeList.length; i++) {
          sList.push(this.serviceTypeList[i].codeid);
        }
        for (let i = 0; i < this.serviceType.length; i++) {
          if (sList.indexOf(this.serviceType[i]) > -1) {
            array.push(this.serviceType[i]);
          }
        }
        this.serviceType = array;
        if (array.length > 4) {
          // el.target.checked=false;
          tip = "服务类别最多选择四项";
          flag = false;
        }
      } else {
        tip = "服务类别不能为空";
        flag = false;
      }
      this.formTip("serviceType", tip);
      return flag;
    },
    strengthCheck() {
      var tip = "";
      var flag = true;
      if (this.strength.length <= 0) {
        tip = "个人特长不能为空";
        flag = false;
      }
      this.formTip("strength", tip);
      return flag;
    },
    idcardVCheck() {
      var tip = "";
      var flag = true;
      if (this.idcardV == 0) {
        tip = "身份认证信息不能为空";
        flag = false;
      }
      this.formTip("idcardV", tip);
      return flag;
    },
    taxRevenueCheck() {
      var tip = "";
      var flag = true;
      if (this.taxRevenue == 0) {
        tip = "涉税专业资格证书类别不能为空";
        flag = false;
      }
      this.formTip("taxRevenue", tip);
      return flag;
    },
    albp2807Check() {
      var tip = "";
      var flag = true;
      if (this.basicInfoAlbp2807.length <= 0) {
        tip = "涉税专业资格证书编号不能为空";
        flag = false;
      }
      this.formTip("albp2807", tip);
      return flag;
    },
    formTip(el, tip) {
      $("#" + el + "Tips")
        .html(tip)
        .css("color", "red");
    },
    chooseNative() {
      $("#preButton").css("display", "none");
      $(".category__content").css("display", "none");
      $("#first").css("display", "");
      $(".mask.area").addClass("active");
      this.$refs.areaDialog.preAreaId = "";
      this.$refs.areaDialog.preName = "";
      this.$refs.areaDialog.listArea("000000000000000000", 0, 3);
      this.areaType = 0;
      this.areaChooseTip = "请选择籍贯";
    },
    chooseLive() {
      $("#preButton").css("display", "none");
      $(".category__content").css("display", "none");
      $("#first").css("display", "");
      $(".mask.area").addClass("active");
      this.$refs.areaDialog.preAreaId = "";
      this.$refs.areaDialog.preName = "";
      this.$refs.areaDialog.listArea("000000000000000000", 0, 3); //到区
      this.areaType = 1;
      this.areaChooseTip = "请选择居住区域";
    },
    chooseArea() {
      $("#preButton").css("display", "none");
      $(".category__content").css("display", "none");
      $("#first").css("display", "");
      $(".mask.area").addClass("active");
      this.$refs.areaDialog.preAreaId = "";
      this.$refs.areaDialog.preName = "";
      let areaArr = ["50", "11", "12", "31"]; // 直辖市
      var flag;
      if (areaArr.indexOf(this.areaid.substring(0, 2)) == -1) {
        flag = 2;
      } else {
        flag = 1;
      }
      if (this.$store.getters.getArea.industrycode) {
        this.$refs.areaDialog.listArea(null, 0, flag);
      } else {
        this.$refs.areaDialog.listArea(this.areaid, 0, flag);
      }
      this.areaType = 2;
      this.areaChooseTip = "请选择服务区域";
    },
    confirmArea(areaid) {
      if (!areaid) areaid = this.areaid;
      if (areaid) {
        if (this.areaType == 0) {
          this.basicInfo.albp0009 = areaid;
          this.utilscommit.requestapi(
            "areaFullInfo",
            { areaid: areaid },
            this.nativeBack
          );
        } else if (this.areaType == 1) {
          if (
            areaid.substring(4, 6) == "00" ||
            areaid.substring(6, 8) != "00"
          ) {
            this.$swal("居住区域没有精确到区（县），请重新选择", {
              buttons: "确定"
            });
          } else {
            this.basicInfo.albp0028 = areaid;
            this.utilscommit.requestapi(
              "areaFullInfo",
              { areaid: areaid },
              this.liveBack
            );
          }
        } else if (this.areaType == 2) {
          if (
            areaid.substring(4, 6) == "00" ||
            areaid.substring(6, 8) != "00"
          ) {
            this.$swal("服务区域没有精确到区（县），请重新选择", {
              buttons: "确定"
            });
          } else {
            this.basicInfo.albp0020 = areaid;
            this.utilscommit.requestapi(
              "areaFullInfo",
              { areaid: areaid },
              this.serviceBack
            );
          }
        }
      }
    },
    closeMask() {
      $(".mask.area").removeClass("active");
      $("#first").css("display", "");
      $(".category__item").removeClass("active");
      this.$refs.areaDialog.chooseArea = "";
      this.$refs.areaDialog.preAreaId = "";
      this.$refs.areaDialog.preName = "";
    },
    showBind() {
      this.changeImgCode();
      $(".mask.bind").addClass("active");
    },
    closeBind() {
      $(".mask.bind").removeClass("active");
      $(".form-error").html("");
      this.bindPhone = this.code = this.imgcode = "";
    },
    bindPhoneCheck() {
      this.bindPhoneFlag = false;
      var el = $("#bindPhone");
      var val = el.val();
      var tip = "";
      var type = 1;
      if (!val) {
        tip = "手机号码不能为空";
        type = 2;
        this.formTip("bindPhone", tip, type);
      } else if (!this.common.checkPhoneno(val)) {
        tip = "请输入正确的手机号码";
        type = 2;
        this.formTip("bindPhone", tip, type);
      } else {
        this.formTip("bindPhone", tip, type);
        this.bindPhoneFlag = true;
      }
    },
    codeCheck() {
      var el = $("#code");
      var val = el.val();
      var tip = "";
      var flag = true;
      var type = 1;
      if (!val) {
        tip = "验证码不能为空";
        flag = false;
        type = 2;
      } else if (val.length != 6) {
        tip = "请输入6位手机验证码";
        flag = false;
        type = 2;
      }
      this.formTip("code", tip, type);
      return flag;
    },
    changeImgCode() {
      this.imgcode = "";
      this.utilscommit.requestapi(
        "getImageCodeFortisWeb",
        null,
        this.changeImgCodeBack
      );
    },
    changeImgCodeBack(data) {
      // 图片验证码获取结果
      if (data && data.data) {
        $("#reg_image").attr("src", data.data.img);
        this.imgkey = data.data.imgkey;
      }
    },
    imgCodeCheck() {
      var el = $("#inputImgCode");
      var tip = "";
      var type = 1;
      var flag = true;
      var code = el.val();
      if (!code) {
        tip = "图文验证码不能为空";
        type = 2;
        flag = false;
      }
      this.formTip("imgCode", tip, type);
      return flag;
    },

    bindSubmit() {
      if (!this.bindPhoneFlag) {
        this.bindPhoneCheck();
      }
      if (this.bindPhoneFlag) {
        // 显示修改后手机号脱敏显示
        this.showPhone = this.bindPhone.replace(
          /(\d{3})\d*(\d{4})/,
          "$1****$2"
        );
        // 修改后明文手机号
        this.telephone = this.bindPhone;
        Vues.closeBind();
      }
    },
    imgError(el) {
      el.src = avatar;
    }
  },
  computed: {
    isShowIdcardV() {
      if (this.serviceRange && this.serviceRange.length > 0) {
        let serviceRange = this.serviceRange.toString();
        if (serviceRange.indexOf("0013") != -1) {
          return true;
        }
      }
      this.idcardV = 0; //身份认证信息
      this.isQualification = 0; //是否取得涉税专业资格证书
      this.taxRevenue = 0; //涉税专业资格证书类别
      this.basicInfoAlbp2807 = ""; //涉税专业资格证书编号
      return false;
    }
  },
  watch: {
    countrySelect(newval, oldval) {
      $("#nationSelect").attr("disabled", false);
      $("#politicsSelect").attr("disabled", false);
      $("#nativeChoose_div")
        .val("0")
        .css("display", "none");
      this.nativeChooseName = "";
      switch (newval) {
        case "156":
          $("#nativeChoose_div")
            .val(this.basicInfo.albp0008)
            .css("display", "");
          break;
        case "344": //香港
          break;
        case "446": //澳门
          break;
        case "158": //台湾
          break;
        default:
          this.politicsSelect = "13";
          this.nationSelect = "97";
          $("#politicsSelect").attr("disabled", true);
          $("#nationSelect").attr("disabled", true);
      }
      this.countryCheck();
    },
    nationSelect(newval, oldval) {
      this.nationCheck();
    },
    politicsSelect(newval, oldval) {
      this.politicsCheck();
    },
    liveAddress(newval, oldval) {
      this.liveAddressCheck();
    },
    serviceAreaName(newval, oldval) {
      this.serviceAreaCheck();
    },
    isQualification(newval, oldval) {
      //是否取得涉税专业资格证书
      if (newval == 0) {
        this.taxRevenue = 0;
        this.basicInfoAlbp2807 = "";
      }
    }
  }
};
</script>

<style scoped>
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

.btn_disabled {
  background: rgb(121, 120, 120);
  cursor: default;
}
</style>
