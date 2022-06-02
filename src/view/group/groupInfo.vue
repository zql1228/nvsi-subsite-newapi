<template>
  <div id="groupInfo">
    <!--中间部分-->
    <div class="main bannerimg">
      <div class="mid">
        <ul class="row w">
          <li class="col">
            <div class="router">
              <span>当前位置：</span>
              <a href="javascript:void(0);">
                <router-link tag="span" :to="{ name: 'home', params: { define: routeDefine } }">首页</router-link>
              </a>
              <a href="javascript:void(0);">
                <router-link tag="span" :to="{ name: 'group', params: { define: routeDefine } }">志愿队伍</router-link>
              </a>
              <a href="javascript:void(0);">志愿队伍详情</a>
            </div>
          </li>
        </ul>
        <div class="section">
          <div class="row w">
            <div class="col v-t" style="padding-right: 50px">
              <div class="row w">
                <div class="col v-t" style="width: 38%">
                  <img :src="groupInfo.albe0025" @error="imgError" style="height: 158px; width: 260px" alt="" v-if="groupInfo.albe0025" />
                  <img v-else-if="groupInfo.defaultImg" :src="groupInfo.defaultImg" style="height: 158px; width: 260px" alt="" />
                  <img :src="errorImg" @error="imgError" style="height: 158px; width: 260px" alt="" v-else />
                </div>
                <div class="col v-t">
                  <h2 class="h2">{{ groupInfo.albe0002 }}</h2>
                  <table class="table-info">
                    <colgroup>
                      <col width="30%" />
                      <col width="40%" />
                    </colgroup>
                    <tr>
                      <th colspan="2" style="padding-bottom: 10px">
                        队伍联络编号：<em class="c-danger">{{
                          groupInfo.albe0041
                        }}</em>
                      </th>
                    </tr>
                    <tr>
                      <th>
                        人员规模：<em class="c-danger">{{
                          groupInfo.albe0016
                        }}</em>
                      </th>
                      <th>
                        正式人员：<em class="c-danger">{{
                          groupInfo.albe0056 ? groupInfo.albe0056 : 0
                        }}</em>
                      </th>
                    </tr>
                    <tr>
                      <th colspan="2" style="padding-top: 10px">
                        <span class="v-m">队伍分享到：</span>
                        <div style="display: inline-block" class="v-m">
                          <a href="javascript:void(0);" @click="toWB">
                            <img src="../../assets/img/weibo-2.png" alt="" />
                          </a>
                          <a href="javascript:void(0);" @click="showtype = 1">
                            <img src="../../assets/img/weixin.png" alt="" />
                          </a>
                          <a href="javascript:void(0);" @click="showtype = 2">
                            <img src="../../assets/img/qq.png" alt="" />
                          </a>
                        </div>
                      </th>
                    </tr>
                  </table>
                </div>
              </div>
              <div class="arrow-box">
                <table class="table-info">
                  <colgroup>
                    <col width="12%" />
                    <col width="38%" />
                    <col width="13%" />
                    <col width="37%" />
                  </colgroup>
                  <tr>
                    <th>区域：</th>
                    <td>{{ groupInfo.albe0038 }}</td>
                    <th>加入方式：</th>
                    <td>{{ groupInfo.joinway }}</td>
                  </tr>
                  <tr>
                    <th>成立日期：</th>
                    <td>{{ groupInfo.albe0015 | ellipsisNos(10) }}</td>
                    <!-- <th v-show="groupInfo.albe0004">联络团体：</th> -->
                    <th v-show="
                        groupInfo.albe0063 !== '0' || groupInfo.albe0065 !== '0'
                      ">
                      联络组织：
                    </th>
                    <td v-show="groupInfo.albe0063 && groupInfo.albe0063 !== '0'">
                      <a href="javascript:void(0);" @click="
                          $utilroutes.toGroupInfo(
                            groupInfo.linkgroupid,
                            groupInfo.linkgroupareaid
                          )
                        ">
                        <em class="c-danger">{{ groupInfo.linkgroup }}</em>
                      </a>
                    </td>
                    <td v-show="groupInfo.albe0065 && groupInfo.albe0065 !== '0'">
                      <a href="javascript:void(0);" @click="
                          $utilroutes.toGroupInfo(
                            groupInfo.albe0066,
                            groupInfo.linkareaid
                          )
                        ">
                        <em class="c-danger">{{ groupInfo.linkgroup }}</em>
                      </a>
                    </td>
                    <th v-show="
                        groupInfo.albe0063 == '0' && groupInfo.albe0065 == '0'
                      ">
                      登记机关：
                    </th>
                    <td v-show="
                        groupInfo.albe0063 == '0' && groupInfo.albe0065 == '0'
                      ">
                      {{ groupInfo.albe0007 }}
                    </td>
                  </tr>
                  <tr>
                    <th>详细地址：</th>
                    <td>{{ groupInfo.albe0013 }}</td>
                    <th></th>
                    <td></td>
                  </tr>
                </table>
              </div>
              <div class="tabbar" style="margin: 20px 0 0 0">
                <span class="active">队伍简介</span>
                <span>发起的项目</span>
                <!-- <span>留言咨询</span> -->
                <div v-html="applyButton" v-show="groupInfo.albe0027 == 1" style="margin-top: -32px; text-align: right"></div>
              </div>
              <!-- 团体简介 -->
              <div class="tabbar-down">
                <p v-html="ecellipsiSpace(groupInfo.albe0032)" style="padding: 18px; word-break: break-all"></p>
                <p v-if="!groupInfo.albe0032" style="width: 100%; text-align: center">
                  <img src="../../assets/img/js-wujilu.png" />
                </p>
              </div>
              <!-- 发起的项目 -->
              <div class="tabbar-down" style="display: none">
                <table class="table-list">
                  <colgroup>
                    <col width="50%" />
                    <col width="25%" />
                    <col width="25%" />
                  </colgroup>
                  <tbody>
                    <tr>
                      <th>项目名称</th>
                      <th>立项日期</th>
                      <th>项目状态</th>
                    </tr>
                    <tr v-if="!projectList.length">
                      <td colspan="3" style="text-align: center; border-bottom: 1px #f6f3f7">
                        <img src="../../assets/img/js-wujilu.png" />
                      </td>
                    </tr>
                    <tr v-for="item in projectList" :key="item.id">
                      <td class="left">
                        <em class="pointer" :title="item.albx0002" @click="
                            $utilroutes.toProjectInfo(item.id, item.albx0021)
                          ">{{ item.albx0002 | ellipsis(20) }}</em>
                      </td>
                      <td class="left">
                        {{ item.albx0031 | ellipsisNos(10) }}
                      </td>
                      <td class="left">
                        <i v-if="item.albx0072 == 3">待启动</i>
                        <i v-if="item.albx0072 == 4">运行中</i>
                        <i v-if="item.albx0072 == 5 || item.albx0072 == 6">已结项</i>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <!-- 留言咨询 -->
              <div class="tabbar-down" style="display: none">
                <div class="load">
                  <textarea class="textarea" rows="4" placeholder="在这里畅所欲言吧～" v-model="leaveContent" maxlength="200" style="height: 146px"></textarea>
                  <a href="javascript:void(0);" style="margin-top: 15px" class="button" @click="publish(1)">发布评论</a>
                  <h2 class="subtitle subtitle-plain">最新留言</h2>
                  <p v-if="!mainMessageList.length" style="width: 100%; text-align: center">
                    <img src="../../assets/img/js-wujilu.png" />
                  </p>
                  <ul class="activity">
                    <li class="row w" v-for="el in mainMessageList" :key="el.id">
                      <div class="col v-t">
                        <img :src="common.changeImgsrc(el.photo)" @error="imgError2" alt="" />
                      </div>
                      <div class="col v-t">
                        <h3 class="activity-tit">
                          <a href="javascript:void(0);" @click="
                              toDetailInfo(
                                el.albp0029,
                                el.albp0020,
                                el.orgid,
                                el.albe0012
                              )
                            "><em>{{ el.showname }}</em></a>
                          <span>{{ el.albx4006 | ellipsisNos(19) }}</span>
                          <a href="javascript:void(0);" @click="
                              showReply(el.id, el.albp0029 || el.orgid, el)
                            "><em>回复</em></a>
                        </h3>
                        <div class="activity-info">{{ el.albx4003 }}</div>
                        <div class="message-child">
                          <div class="row w line-message" v-for="el2 in el.sublist" :key="el2.id">
                            <h3 class="activity-tit" style="margin-top: 10px">
                              <a href="javascript:void(0);" @click="
                                  toDetailInfo(
                                    el2.volnum1,
                                    el2.area1,
                                    el2.orgid1,
                                    el2.area3
                                  )
                                "><em>{{ el2.name1 || el2.name3 }}</em></a>
                              <span>回复</span>
                              <a href="javascript:void(0);" @click="
                                  toDetailInfo(
                                    el2.volnum2,
                                    el2.area2,
                                    el2.orgid2,
                                    el2.area4
                                  )
                                "><em>{{ el2.name2 || el2.name4 }}</em></a>
                              <span>{{ el2.albx4006 | ellipsisNos(19) }}</span>
                              <a href="javascript:void(0);" @click="
                                  showReply(
                                    el.id,
                                    el2.volnum1 || el2.orgid1,
                                    el2
                                  )
                                "><em>回复</em></a>
                            </h3>
                            <div class="activity-info">{{ el2.albx4003 }}</div>
                          </div>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
              <div v-if="nowIndex == 1 || nowIndex == 2">
                <cpaginate :pageCount="tolPage" :rangePage="pageSize" :initPage="pageNow" :totals="tolCount" :val="jumpPage" @pageEvent="pageEvent">
                </cpaginate>
              </div>
            </div>
            <div class="col v-t" style="width: 30%">
              <h2 class="subtitle subtitle-noline" style="margin-top: -10px">
                队伍联系人
              </h2>
              <div class="link-info">
                <h2 v-if="groupInfo.albe0018">{{ groupInfo.albe0018 }}</h2>
                <p v-if="groupInfo.albe0047 == 1 && groupInfo.albe0019" v-text="'手机：' + groupInfo.albe0019"></p>
                <p v-if="groupInfo.albe0048 == 1 && groupInfo.albe0020" v-text="'电话：' + groupInfo.albe0020"></p>
                <p v-if="groupInfo.albp0054" :text="'邮箱：' + groupInfo.albp0054"></p>
                <!-- <p class="row w">
                  <span class="col v-m" style="padding-right: 10px">
                    <a
                      href="javascript:void(0);"
                      class="button outline"
                      @click="sendMessage(groupid, groupInfo.albe0037)"
                      >给他发站内信</a
                    >
                  </span>
                  <span class="col v-m" style="padding-left: 10px">
                    <a
                      href="javascript:void(0);"
                      @click="showComplain"
                      class="button outline"
                      >我要投诉</a
                    >
                  </span>
                </p> -->
              </div>
              <h2 class="subtitle subtitle-noline subtitle-margin">服务评价</h2>
              <div class="info-detail">
                <p>对项目开展培训的满意度：5.00</p>
                <p>与志愿队伍合作的满意度：5.00</p>
                <p>项目执行与计划的符合度：5.00</p>
              </div>
              <h2 class="subtitle subtitle-noline subtitle-margin">队伍地址</h2>
              <div class="link-info">
                <p>{{ groupInfo.albe0013 }}</p>
                <p class="row w">
                  <span class="col v-m" style="padding-right: 10px">
                    <a href="javascript:void(0);" class="button outline" @click="showMapg">查看地图</a>
                  </span>
                  <span class="col v-m" style="padding-left: 10px"> </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 地图 -->
    <div class="mask mapgroupinfo">
      <div class="mask-info" style="max-height: 600px">
        <div class="mask-header row w">
          <div class="col v-m">
            <h2>地图</h2>
          </div>
          <div class="col v-m t-r">
            <a href="javascript:void(0);" class="mask-close" @click="closeMapg">
              <img src="../../assets/img/close.png" alt="" /></a>
          </div>
        </div>
        <div>
          <div id="groupinfomap" style="height: 450px"></div>
        </div>
      </div>
    </div>

    <!-- 免审密码 -->
    <div class="mask password">
      <div class="mask-info" style="width: 700px; max-height: 705px; margin-left: -350px">
        <div class="mask-header row w">
          <div class="col v-m">
            <h2>免审密码</h2>
          </div>
          <div class="col v-m t-r">
            <a href="javascript:void(0);" class="mask-close" @click="closePassword"><img src="../../assets/img/close.png" alt="" /></a>
          </div>
        </div>
        <div style="padding: 20px 50px 0 50px">
          <div class="form">
            <p class="form-label"><em>*</em>请输入免审密码：</p>
            <input type="text" @blur="passwordCheck" v-model="password" maxlength="20" placeholder="请输入面审密码" />
          </div>
          <span class="form-error" style="padding-left: 20px" id="passwordTips"></span>
        </div>
        <div class="form t-c">
          <a href="javascript:void(0);" class="button" @click="submitPassword">提交</a>
        </div>
      </div>
    </div>

    <!-- 我要投诉 -->
    <div class="mask complain">
      <div class="mask-info" style="width: 700px; max-height: 705px; margin-left: -350px; top: 50%">
        <div class="mask-header row w">
          <div class="col v-m">
            <h2>我要投诉</h2>
          </div>
          <div class="col v-m t-r">
            <a href="javascript:void(0);" @click="closeComplain" class="mask-close"><img src="../../assets/img/close.png" alt="" /></a>
          </div>
        </div>
        <ul class="grid" style="margin-top: 10px">
          <li class="grid-item g-12">
            <div class="form">
              <p class="form-label"><em>*</em>被投诉对象：</p>
              <input :value="groupInfo.albe0002" readonly placeholder="请输入被投诉对象" />
            </div>
            <span class="form-error" style="padding: 5px 0 0 20px" id="objTips"></span>
          </li>
          <li class="grid-item g-12">
            <div class="form">
              <p class="form-label"><em>*</em>投诉人姓名：</p>
              <input type="text" v-model="name" @blur="nameCheck" maxlength="20" placeholder="请输入投诉人姓名" />
            </div>
            <span class="form-error" style="padding: 5px 0 0 20px; height: 17px; color: red" id="nameTips"></span>
          </li>
          <li class="grid-item g-24">
            <div class="form">
              <p class="form-label"><em>*</em>投诉内容：</p>
              <textarea rows="2" v-model="content" @blur="contentCheck" maxlength="100" class="form_textarea" placeholder="请输入投诉内容"></textarea>
            </div>
            <span class="form-error" style="padding: 5px 0 0 20px; height: 17px; color: red" id="contentTips"></span>
          </li>
          <li class="grid-item g-12">
            <div class="form">
              <p class="form-label"><em>*</em>投诉人身份证号码：</p>
              <input type="text" v-model="card" @blur="cardCheck" maxlength="18" placeholder="请输入投诉人身份证号码" />
            </div>
            <span class="form-error" style="padding: 5px 0 0 20px; height: 17px; color: red" id="cardTips"></span>
          </li>
          <li class="grid-item g-12">
            <div class="form">
              <p class="form-label"><em>*</em>投诉人手机号码：</p>
              <input type="text" v-model="phone" @blur="phoneCheck" maxlength="11" placeholder="请输入投诉人手机号码" />
            </div>
            <span class="form-error" style="padding: 5px 0 0 20px; height: 17px; color: red" id="phoneTips"></span>
          </li>
          <li class="grid-item g-12">
            <div class="form">
              <p class="form-label"><em>*</em>图文验证码：</p>
              <div class="row w" style="display: inline-table">
                <div class="col v-m">
                  <input type="text" id="inputImgCode" v-model="imgcode" maxlength="4" @blur="imgCodeCheck" placeholder="请输入图文验证码" />
                </div>
                <div class="col v-m pl-10" style="width: 130px" @click="changeImgCode">
                  <img id="reg_image" class="button button-line" style="width: 100%; padding: 1px 1px 2px 5px" />
                </div>
              </div>
            </div>
            <span class="form-error" style="padding: 5px 0 0 20px; height: 17px; color: red" id="imgCodeTips"></span>
          </li>
          <!-- <li class="grid-item g-12">
            <div class="form">
              <p class="form-label"><em>*</em>验证码：</p>
              <div class="row w" style="display: inline-table;">
                <div class="col v-m">
                  <input type="text" id="code" v-model="code" @blur="codeCheck" oninput="value=value.replace(/[^\d]/g,'')" maxlength="6" placeholder="请输入验证码">
                </div>
                <div class="col v-m pl-10" style="width:130px;"><button class="button button-line" id="codebutton" @click="getCode" v-text="codeButton" style="font-size: 14px;width: 100%;"></button></div>
              </div>
            </div>
            <span class="form-error" style="padding: 5px 0 0 20px;height: 17px;color: red;" id="codeTips"></span>
          </li> -->
        </ul>
        <div class="form t-c">
          <a href="javascript:void(0);" class="button" style="margin-top: 5px" @click="onSubmit">提交</a>
        </div>
      </div>
    </div>

    <!-- 回复 -->
    <div class="mask reply">
      <div class="mask-info" style="width: 700px; max-height: 705px; margin-left: -350px">
        <div class="mask-header row w">
          <div class="col v-m">
            <h2>回复</h2>
          </div>
          <div class="col v-m t-r">
            <a href="javascript:void(0);" class="mask-close" @click="closeReply"><img src="../../assets/img/close.png" alt="" /></a>
          </div>
        </div>
        <textarea class="textarea" rows="4" placeholder="在这里畅所欲言吧～" v-model="leaveContent" maxlength="200" style="height: 146px"></textarea>
        <a href="javascript:void(0);" style="margin-top: 15px" class="button" @click="publish(0)">发布评论</a>
      </div>
    </div>

    <!-- 微信分享 -->
    <share :showtype="showtype" type="group"></share>
  </div>
</template>

<script>
import i1 from "../../assets/img/i1.png";
import avatar from "../../assets/img/avatar.png";
const cpaginate = () => import("@/components/page/paginationRed.vue"); //分页
const share = () => import("@/components/share.vue"); //分享

export default {
  name: "groupInfo",
  components: { cpaginate, share },
  data() {
    return {
      routeDefine: this.$route.params.define,
      groupid: this.$route.params.data1,
      areaid: this.$route.params.data2,
      groupInfo: {}, //团体信息
      userInfo: [], //用户信息
      basicInfo: [], //该用户团体信息
      applyButton: "", //申请按钮
      mbNum: 0, //正式成员数
      projectList: [], //发布的项目列表
      password: "", //免审密码
      content: "",
      name: "",
      card: "",
      phone: "",
      imgcode: "",
      // code:'',
      // codeButton:"获取验证码",
      // countdown:60,
      // imgCodeFlag:false,
      leaveContent: "", //留言内容
      mainMessageList: {}, //主留言列表
      mainid: "", //回复的主留言id
      bemsgid: "", //回复的留言id
      messageinfo: "", //留言信息
      nowIndex: 0, //当前tab页索引
      //分页参数
      tolCount: 0, //总条数
      tolPage: 0, //总页数
      pageSize: 8, //每页条数
      pageNow: 1, //当前页
      jumpPage: 1, //记录输入框中的值
      //分享参数
      showtype: 0,
      isFirst: true, //判断是否为第一次加入团体,
      imgkey: "", //图文验证码的key
      //点击加入按钮效果
      isClick: true, //加入方式  true=可以加入，false=不可加入
      buineseid: "",
      errorImg: i1 // 默认队伍封面图片
    };
  },
  created() {
    window.Vues = this; //主体vue实例挂载
    this.getData();
    window.applyGroup = this.applyGroup;
  },
  mounted() {
    if (this.$store.getters.getArea.industrycode) this.$utilroutes.toHome(1);
    this.clickTabbarSpan();
  },
  methods: {
    // 分页
    pageEvent(e) {
      this.getList();
    },
    // 获取队伍详情
    getData() {
      this.userInfo = this.$store.getters.getUser;
      this.basicInfo = this.$store.getters.getBasic;
      let params = {
        areaid: this.areaid,
        id: this.groupid
      };
      if (this.userInfo) {
        // 已登录查询
        params.albe0133 = this.userInfo.albp0029;
      }
      console.log(params);
      this.utilscommit.requestapi(
        "getTeamInfoWeb",
        params,
        this.callback_groupinformation
      );
    },
    // 查询队伍发布项目和留言
    getList() {
      if (this.nowIndex == 1) {
        let params = {
          albx0021: this.groupInfo.albe0012,
          teamId: this.groupid,
          pageNum: this.pageNow,
          pageSize: this.pageSize
        };
        console.log(params);
        this.utilscommit.requestapi(
          "queryTeamProPageWeb",
          params,
          this.callback_groupinfoPro
        );
      } else if (this.nowIndex == 2) {
        var data = {
          ofid: this.groupid,
          type: "1",
          areaid: this.areaid,
          pageNow: this.pageNow,
          pageSize: this.pageSize
        };
        this.utilscommit.request(
          "nvsi_listMainMessage",
          data,
          this.mainMessageBack
        );
      }
    },
    // 查询留言回调
    mainMessageBack(result) {
      if (result && result.data) {
        this.mainMessageList = result.data;
        this.common.getTolData(this, result);
      } else {
        this.projectList = {};
        this.common.getTolData(this);
      }
    },
    // 判断当前用户和队伍的关系
    callback_groupinformation(result) {
      if (result && result.data) {
        let item = result.data;
        let provinceId = item.albe0012.slice(0, 2);
        if (provinceId == "98") {
          //新疆兵团
          item.defaultImg = require("../../assets/img/grodefault/65.png");
        } else {
          item.defaultImg = require("../../assets/img/grodefault/" +
            provinceId +
            ".png");
        }
        this.groupInfo = item;
        if (!this.userInfo || this.groupInfo.albe0134 == 4) {
          this.applyButton =
            '<a href="javascript:void(0);" class="button" id="intoOrg" style="background:#FF9400;padding-top: 0px;color: white;height:30px;line-height:30px;" onclick="applyGroup()">我要加入</a>';
        } else if (this.groupInfo.albe0134 == 1) {
          this.applyButton =
            '<a href="javascript:void(0);" class="button" style="background:#cc0000;padding-top: 0px;color: white;height:30px;line-height:30px;cursor:default;">已加入</a>';
        } else if (this.groupInfo.albe0134 == 2) {
          this.applyButton =
            '<a href="javascript:void(0);" class="button" style="background:#008D03;padding-top: 0px;color: white;height:30px;line-height:30px;cursor:default;">已申请</a>';
        } else if (this.groupInfo.albe0134 == 3) {
          this.applyButton =
            '<a href="javascript:void(0);" class="button" style="background:#e60012;padding-top: 0px;color: white;height:30px;line-height:30px;" onclick="applyGroup()">再次申请</a>';
          // this.applyButton =
          //   '<a href="javascript:void(0);" class="button" style="background:#e60012;padding-top: 0px;color: white;height:30px;line-height:30px;cursor:default;">已拒绝</a>';
        }
      }
    },
    // 查询队伍发布项目回调
    callback_groupinfoPro(data) {
      if (data && data.data) {
        this.projectList = data.data;
        this.common.getTolData(this, data);
      } else {
        this.projectList = [];
        this.common.getTolData(this);
      }
    },
    // 分享到微博
    toWB() {
      var e = encodeURIComponent(window.location.href);
      var t = encodeURIComponent(document.title);
      var s =
        "http://service.weibo.com/share/share.php?title=" +
        t +
        " &url=" +
        e +
        "l &source=bookmark &appkey=2992571369 &pic=0 &ralateUid=#_loginLayer_1520419214343";
      window.open(s);
    },
    // 显示地图
    showMapg() {
      var map = new BMap.Map("groupinfomap");
      var point = new BMap.Point(116.404, 39.915);
      if (
        this.groupInfo.albe0050 &&
        this.groupInfo.albe0051 &&
        this.groupInfo.albe0050 != 0 &&
        this.groupInfo.albe0051 != 0
      )
        point = new BMap.Point(
          this.groupInfo.albe0050,
          this.groupInfo.albe0051
        );
      map.centerAndZoom(point, 15); // 初始化地图,设置中心点坐标和地图级别
      map.addControl(new BMap.NavigationControl()); // 添加平移缩放控件
      map.addControl(new BMap.ScaleControl()); // 添加比例尺控件
      map.addControl(new BMap.OverviewMapControl()); //添加缩略地图控件
      map.enableScrollWheelZoom(); //启用滚轮放大缩小
      // 选择地图类型 (默认是地图,卫星,三维),这里只引用了地图和卫星两种
      map.addControl(
        new BMap.MapTypeControl({
          mapTypes: [BMAP_NORMAL_MAP, BMAP_SATELLITE_MAP]
        })
      );
      map.setCurrentCity("北京市"); // 设置地图显示的城市 此项是必须设置的
      var mkr = new BMap.Marker(point);
      map.addOverlay(mkr);
      $(".mask.mapgroupinfo").addClass("active");
    },
    // 加入队伍
    applyGroup() {
      // 用户是否登录
      if (this.userInfo && this.userInfo != "") {
        if (!this.isClick) {
          return;
        }
        //是否有效
        if (this.userInfo.isdelete == 0) {
          // 是否是志愿者，是否实名认证
          if (
            this.userInfo.albp0087 == "1" &&
            this.userInfo.albp0063 &&
            this.userInfo.albp0063 == "1" &&
            this.basicInfo
          ) {
            // 志愿者是否填写服务区域和居住区域
            if (this.basicInfo.albp0020 && this.basicInfo.albp0028) {
              var nowA = this.userInfo.albp0020.substring(0, 2);
              var oldA = this.areaid.substring(0, 2);
              if (nowA == oldA || this.areaid == '100000000000000000') {
                //区域是否匹配
                //判断申请方式
                var applyType = this.groupInfo.albe0028;
                if (applyType == 4) {
                  // 免审密码加入
                  $(".mask.password").addClass("active");
                } else {
                  let params = {
                    albp3302: this.userInfo.albp0003, // 志愿者姓名
                    albp3303: this.userInfo.albp0020, // 志愿者服务区域
                    albp3304: this.userInfo.albp0089, // 志愿者服务时长
                    albp3306: this.groupInfo.albe0019, // 队伍联系方式
                    albp3308: this.groupInfo.albe0002, // 队伍名称
                    albp3309: this.groupid, // 队伍id
                    albp3310: this.userInfo.albp0005, // 志愿者证件号
                    albp3311: this.groupInfo.albe0012, // 队伍服务区域
                    albe0133: this.userInfo.albp0029, // 志愿者编号
                    albp0010: this.userInfo.albp0010, // 志愿者手机号
                    albp0006: this.userInfo.albp0006 // 志愿者性别
                  };
                  console.log(params);
                  // 不允许再次点击
                  this.updateClickState(false);
                  this.utilscommit.requestapi(
                    "volApplyTeamWeb",
                    params,
                    res => {
                      if (res && res.code == 0) {
                        this.$router.go(0);
                      } else {
                        // 允许再次点击
                        this.updateClickState(true);
                        if (res.data) {
                          this.$swal(res.data, { buttons: "确定" });
                        } else {
                          this.$swal(res.message, { buttons: "确定" });
                        }
                      }
                    }
                  );
                }
              } else {
                this.$swal("您当前服务区域与队伍区域不匹配，无法加入！", {
                  buttons: "确定"
                });
              }
            } else {
              this.$swal("未完善基本信息不能报名，是否前去完善？", {
                buttons: ["取消", "确定"]
              }).then(value => {
                if (value) {
                  // this.back1(value);
                  this.$router.push({
                    name: "updatedata",
                    params: { define: Vue.$route.params.define }
                  });
                }
              });
            }
          } else {
            this.$swal("实名志愿者才可申请加入队伍！", { buttons: "确定" });
          }
        } else {
          this.$swal("无效用户！", { buttons: "确定" });
        }
      } else {
        this.$swal("未登录不能加入，是否前去登录？", {
          buttons: ["取消", "确定"]
        }).then(value => {
          if (value) {
            Vue.$utilroutes.toLogin();
          }
        });
      }
    },
    // 刷新页面
    back3(value) {
      this.$router.go(0);
    },
    // 设置按钮状态
    updateClickState(isClick) {
      this.isClick = isClick;
      if (isClick) {
        //还原，可以加入
        $("#intoOrg").css({
          background: "#e60012",
          cursor: "pointer",
          opacity: "0.8"
        }); //修改注册按钮状态
      } else {
        //置灰，不可点击
        $("#intoOrg").css({
          background: "gray",
          cursor: "default",
          opacity: "1"
        }); //修改注册按钮状态
      }
    },
    // 免审密码校验
    passwordCheck() {
      var tip = "";
      var flag = true;
      if (!this.password) {
        tip = "请输入密码！";
        flag = false;
      }
      this.formTip("password", tip);
      return flag;
    },
    // 免审密码加入
    submitPassword() {
      if (this.passwordCheck()) {
        let params = {
          albp3302: this.userInfo.albp0003, // 志愿者姓名
          albp3303: this.userInfo.albp0020, // 志愿者服务区域
          albp3304: this.userInfo.albp0089, // 志愿者服务时长
          albp3306: this.groupInfo.albe0019, // 队伍联系方式
          albp3308: this.groupInfo.albe0002, // 队伍名称
          albp3309: this.groupid, // 队伍id
          albp3310: this.userInfo.albp0005, // 志愿者证件号
          albp3311: this.groupInfo.albe0012, // 队伍服务区域
          albe0133: this.userInfo.albp0029, // 志愿者编号
          albp0010: this.userInfo.albp0010, // 志愿者手机号
          albp0006: this.userInfo.albp0006, // 志愿者性别
          albe0029: this.password // 免审密码
        };
        console.log(params);
        this.utilscommit.requestapi("volApplyTeamWeb", params, res => {
          if (res && res.code == 0) {
            this.$router.go(0);
            // console.log(res);
          } else {
            // 允许再次点击
            this.updateClickState(true);
            if (res.data == "免审密码错误") {
              this.$swal(res.data, { buttons: "确定" });
            } else {
              this.$swal(res.message, { buttons: "确定" });
            }
          }
        });
      }
    },
    // 发站内信
    sendMessage(acceptId, userid) {
      if (this.userInfo) {
        if (this.userInfo.albp0087 == "1") {
          this.common.addCookie("msg", 2, 0.2);
          this.$router.push({
            name: "message",
            params: {
              define: this.routeDefine,
              data1: acceptId,
              data2: userid
            }
          });
        } else {
          const path = this.common.getCookie("mgpath");
          if (path) {
            window.open(path);
          } else {
            Vueh.loginOut();
          }
        }
      } else {
        this.$router.push({
          name: "login",
          params: { define: this.routeDefine, type: 2 }
        });
      }
    },
    // 关闭地图
    closeMapg() {
      $(".mask.mapgroupinfo").removeClass("active");
    },
    // 关闭微信分享
    closeVX() {
      $("#qrcode").empty();
      $(".mask.vxg").removeClass("active");
    },
    // 关闭免审密码
    closePassword() {
      this.password = "";
      $("#passwordTips").html("");
      $("#password").val = "";
      $(".mask.password").removeClass("active");
    },
    // 打开投诉
    showComplain() {
      this.changeImgCode();
      $(".mask.complain").addClass("active");
    },
    // 关闭投诉
    closeComplain() {
      $(".mask.complain").removeClass("active");
      $(".form-error").html("");
      this.content = this.name = this.card = this.phone = this.imgcode = this.code =
        "";
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
    changeImgCode() {
      $("#inputImgCode").val("");
      this.utilscommit.request(
        "nvsi_getImageCode",
        null,
        this.changeImgCodeBack
      );
    },
    // 获取图片验证码回调
    changeImgCodeBack(data) {
      if (data && data.data) {
        $("#reg_image").attr("src", data.data.img);
        this.imgkey = data.data.imgkey;
      }
    },
    // 验证码校验
    imgCodeCheck() {
      var el = $("#inputImgCode");
      this.tip = "";
      this.type = 1;
      var code = el.val();
      var flag = true;
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
      return flag;
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
        var data = {
          albx3702: "2",
          albx3703: this.groupid, //被投诉对象
          albx3715: this.groupInfo.albe0002, //被投诉对象姓名
          albx3704: this.name, //投诉者姓名
          albx3705: this.card, //身份证
          albx3706: this.phone, //手机
          albx3710: this.content, //内容
          areaid: this.areaid,
          code: this.imgcode,
          imgkey: this.imgkey
        };
        this.utilscommit.request("nvsi_insertComplain", data, function(result) {
          if (result) {
            if (result.data) {
              Vues.closeComplain();
              Vues.$swal("投诉提交成功！", { buttons: "确定" });
            } else {
              Vues.$swal(result.message, { buttons: "确定" }).then(() => {
                Vues.changeImgCode();
              });
            }
          }
        });
      }
    },
    // tab点击事件
    clickTabbarSpan() {
      $(".tabbar span").each(function(idx, el) {
        if (Vues.nowIndex) {
          $(el).removeClass("active");
          if (idx == Vues.nowIndex) {
            $(el).addClass("active");
          }
          $(".tabbar-down")
            .eq(Vues.nowIndex)
            .show()
            .siblings(".tabbar-down")
            .hide();
        }
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
    // 图片错误事件
    imgError(el) {
      if (this.groupInfo.defaultImg) {
        el.target.src = this.groupInfo.defaultImg;
      } else {
        el.target.src = i1;
      }
    },
    // 图片错误事件
    imgError2(el) {
      el.target.src = avatar;
    },
    // 跳转详情
    toDetailInfo(volnum, albp0020, orgid, albe0012) {
      if (volnum) {
        this.$utilroutes.toUserInfo(volnum, albp0020);
      } else if (orgid) {
        this.$utilroutes.toGroupInfo(orgid, albe0012);
      }
    },
    //
    showReply(mainid, bemsgid, messageinfo) {
      if (this.userInfo) {
        if (
          bemsgid == this.userInfo.volnum ||
          bemsgid == this.userInfo.albp0055
        ) {
          this.$swal("对不起，您不能回复自己的留言！", { buttons: "确定" });
          return false;
        }
        this.mainid = mainid;
        this.bemsgid = bemsgid;
        this.messageinfo = messageinfo;
        $(".mask.reply").addClass("active");
      } else {
        this.$swal("未登录不能发布，是否前去登录？", {
          buttons: ["取消", "确定"]
        }).then(value => {
          if (value) {
            Vue.$utilroutes.toLogin();
          }
        });
      }
    },
    closeReply() {
      $(".mask.reply").removeClass("active");
      $(".form-error").html("");
      this.leaveContent = this.mainid = this.bemsgid = "";
    },
    publish(type) {
      //发布留言mainid：主留言id，bemsgid：被回复的用户id
      if (!this.leaveContent) {
        this.$swal("请填写留言内容！", { buttons: "确定" });
        return false;
      }
      if (this.userInfo) {
        //用户是否登录
        if (this.userInfo.albp0058 == 1) {
          //是否有效
          if (
            this.userInfo.albp0087 == "1" &&
            (!this.basicInfo.albp0020 || !this.basicInfo.albp0028)
          ) {
            //志愿者未完善信息
            this.$swal("未完善基本信息不能留言，是否前去完善？", {
              buttons: ["取消", "确定"]
            }).then(value => {
              if (value) {
                Vue.$router.push({
                  name: "updatedata",
                  params: { define: Vue.$route.params.define }
                });
              }
            });
          } else {
            let userid = this.userInfo.albp0055; //默认用户id
            let usertype = "2"; //默认团体
            let realname = this.userInfo.albp0064; //默认姓名
            if (this.userInfo.albp0087 == "1") {
              if (this.userInfo.volnum) userid = this.userInfo.volnum; //若为志愿者，则用志愿者编号
              usertype = "1";
              if (this.userInfo.albp0084) realname = this.userInfo.albp0084;
            }
            let brealname = ""; //被留言者昵称
            let bphoto = null; //被留言者头像
            let lastid = null; //上级id
            if (type == 1) {
              //当前是主留言
              this.bemsgid = ""; //当前被留言用户id为空
            } else {
              brealname = this.messageinfo.albx4014;
              bphoto = this.messageinfo.albx4015;
              lastid = this.messageinfo.id;
            }
            let data = {
              albx4002: this.mainid, //主留言id
              albx4003: this.leaveContent, //内容
              albx4004: userid, //留言用户id(团体id/志愿者编号)
              albx4005: usertype, //用户类型（团体/志愿者）
              albx4008: this.groupid, //所属团体id
              albx4009: 1, //留言类型（1团体留言/2项目讨论/3项目动态/4新闻评论/5在线课堂）
              albx4010: this.bemsgid, //被留言用户id(团体id/志愿者编号)
              albx4011: this.groupid, //留言来源id（动态id）
              albx4013: type, //是否主留言  1=是  0=否
              albx4018: this.groupInfo.albe0002, //title主体的标题（动态、项目、团体、新闻）
              albx4019: this.groupInfo.albe0025, //photo主体图片(只需要一张即可)
              albx4020: this.groupInfo.createtime, //time主体的创建时间，比如动态的创建时间
              albx4014: realname, //当前留言者昵称
              albx4015: this.userInfo.albp0027, //当前留言者头像
              albx4016: brealname, //被留言者昵称
              albx4017: bphoto, //被留言者头像
              albx4021: lastid //上级留言id
            };
            this.utilscommit.request(
              "nvsi_insertMassageInfo",
              data,
              this.insertMessageBack
            );
          }
        } else {
          this.$swal("无效用户！", { buttons: "确定" });
        }
      } else {
        this.$swal("未登录不能留言，是否前去登录？", {
          buttons: ["取消", "确定"]
        }).then(value => {
          if (value) {
            Vue.$utilroutes.toLogin();
          }
        });
      }
    },
    insertMessageBack(result) {
      if (result) {
        if (result.data) {
          this.leaveContent = "";
          this.$swal("发布成功", { buttons: "确定" }).then(() => {
            Vues.pageNow = 1;
            Vues.getList();
          });
          this.closeReply();
        } else {
          this.$swal(result.message, { buttons: "确定" });
        }
      }
    },
    formTip(el, tip) {
      $("#" + el + "Tips")
        .html(tip)
        .css("color", "red");
    }
  },
  watch: {
    nowIndex(newval, oldval) {
      //tab变化
      if (newval == 1 || newval == 2) {
        //刷新项目列表和留言
        this.pageNow = 1;
        this.getList();
      }
    }
  }
};
</script>

<style scoped>
.mask.complain.active .mask-info {
  transform: translateY(-50%) scale(1);
}
.activity-tit em {
  font-size: 16px;
  color: #2c5abd;
  font-weight: normal;
  margin: 0;
  padding-bottom: 15px;
}
.activity-tit span {
  margin: 0 15px 0 15px;
}
.line-message {
  border-top: 1px solid #f0f0f0;
}
.table-list th {
  text-align: left;
}
.table-list .pointer {
  cursor: pointer;
  color: #2c5abd;
}
.form input,
.form textarea,
.input,
.textarea {
  line-height: 20px;
  height: 33px;
}
.button-line {
  line-height: 33px;
}
.button {
  height: 33px;
  line-height: 33px;
}
.form .form_textarea {
  height: 70px;
  font-family: Arial;
}
.form .form_textarea::-webkit-input-placeholder {
  color: #bbb;
  font-family: microsoft yahei;
}
</style>
