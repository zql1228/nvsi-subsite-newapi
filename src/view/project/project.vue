<template>
  <div id="project">
    <!--中间部分-->
    <div class="main bannerimg">
      <div class="mid">
        <ul class="row w">
          <li class="col">
            <div class="router">
              <span>当前位置：</span>
              <router-link
                tag="a"
                :to="{ name: 'home', params: { define: routeDefine } }"
                v-if="!$store.getters.getArea.industrycode"
                >首页</router-link
              >
              <router-link
                tag="a"
                style="color: #8d8d8d"
                :to="{ name: 'project', params: { define: routeDefine } }"
                >志愿项目</router-link
              >
              <!--  <a href="javascript:void(0);" class="recommend" style="display:none;">推荐项目</a> -->
            </div>
          </li>
        </ul>
        <div class="section">
          <div class="category">
            <h2 class="category__title">项目区域</h2>
            <div class="category__content">
              <a
                href="javascript:void(0);"
                class="category__item active"
                @click="areaChoose($event)"
                >全部</a
              >
              <a
                href="javascript:void(0);"
                class="category__item"
                @click="areaChoose($event, '100000000000000000')"
                >全国</a
              >
              <a
                href="javascript:void(0);"
                class="category__item"
                v-for="item in firstAreaList"
                :key="item.id"
                @click="areaChoose($event, item.areaid, 1)"
                >{{ item.areaname }}</a
              >
            </div>
            <div class="category__wrap" v-show="firstArea">
              <div class="category__content">
                <a
                  href="javascript:void(0);"
                  class="category__item active"
                  @click="areaChoose($event, firstArea, 2)"
                  >全部</a
                >
                <a
                  href="javascript:void(0);"
                  class="category__item"
                  v-for="item in secondAreaList"
                  :key="item.id"
                  @click="areaChoose($event, item.areaid, 2)"
                  >{{ item.areaname }}</a
                >
              </div>
            </div>
          </div>
          <div class="category" v-if="!$store.getters.getArea.industrycode">
            <h2 class="category__title">服务类别</h2>
            <div class="category__content">
              <a
                href="javascript:void(0);"
                class="category__item active"
                @click="toListByChoose($event, '', 1)"
                >全部</a
              >
              <a
                href="javascript:void(0);"
                class="category__item"
                v-for="item in typeList"
                :key="item.id"
                @click="toListByChoose($event, item.codeid, 1)"
                >{{ item.codevalue }}</a
              >
            </div>
          </div>
          <div class="category" v-if="$store.getters.getArea.industrycode">
            <h2 class="category__title">项目类别</h2>
            <div class="category__content">
              <a
                href="javascript:void(0);"
                class="category__item active"
                @click="getProjectSevice($event)"
                >全部</a
              >
              <a
                href="javascript:void(0);"
                class="category__item"
                v-for="item in projectServiceList1"
                :key="item.id"
                @click="getProjectSevice($event, item.albx6702, 2)"
                v-text="item.albx6703"
              ></a>
            </div>
            <div
              class="category__wrap projectService2"
              v-show="projectService2"
            >
              <div class="category__content">
                <a
                  href="javascript:void(0);"
                  class="category__item active"
                  @click="getProjectSevice($event, projectService2, 2)"
                  >全部</a
                >
                <a
                  href="javascript:void(0);"
                  class="category__item"
                  v-for="item in projectServiceList2"
                  :key="item.id"
                  @click="getProjectSevice($event, item.albx6702, 3)"
                  v-text="item.albx6703"
                ></a>
              </div>
            </div>
            <div
              class="category__wrap projectService3"
              v-show="projectService3"
            >
              <div class="category__content">
                <a
                  href="javascript:void(0);"
                  class="category__item active"
                  @click="getProjectSevice($event, projectService3, 3)"
                  >全部</a
                >
                <a
                  href="javascript:void(0);"
                  class="category__item"
                  v-for="item in projectServiceList3"
                  :key="item.id"
                  v-text="item.albx6703"
                  @click="getProjectSevice($event, item.albx6702, 4)"
                ></a>
              </div>
            </div>
          </div>
          <div class="category" v-if="$store.getters.getArea.industrycode">
            <h2 class="category__title">项目标签</h2>
            <div class="category__content">
              <a
                href="javascript:void(0);"
                class="category__item active"
                @click="toListByChoose($event, '', 5)"
                >全部</a
              >
              <a
                href="javascript:void(0);"
                class="category__item"
                v-for="item in labelList"
                :key="item.codeid"
                @click="toListByChoose($event, item.codeid, 5)"
                >{{ item.codevalue }}</a
              >
            </div>
          </div>
          <div class="category">
            <h2 class="category__title">项目状态</h2>
            <div class="category__content">
              <a
                href="javascript:void(0);"
                class="category__item"
                @click="toListByChoose($event, '', 2)"
                >全部</a
              >
              <a
                href="javascript:void(0);"
                class="category__item"
                @click="toListByChoose($event, '3', 2)"
                >待启动</a
              >
              <a
                href="javascript:void(0);"
                class="category__item active"
                @click="toListByChoose($event, '4', 2)"
                >运行中</a
              >
              <!-- <a
                href="javascript:void(0);"
                class="category__item"
                @click="toListByChoose($event, '45', 2)"
                >招募已结束</a
              > -->
              <a
                href="javascript:void(0);"
                class="category__item"
                @click="toListByChoose($event, '5', 2)"
                >已结项</a
              >
            </div>
          </div>
          <div class="category project-hide">
            <h2 class="category__title">报名范围</h2>
            <div class="category__content">
              <a
                href="javascript:void(0);"
                class="category__item active"
                @click="toListByChoose($event, '', 3)"
                >全部</a
              >
              <a
                href="javascript:void(0);"
                class="category__item"
                v-for="item in scopeList"
                :key="item.id"
                @click="toListByChoose($event, item.codeid, 3)"
                >{{ item.codevalue }}</a
              >
            </div>
          </div>
          <div
            class="category project-hide"
            v-if="!$store.getters.getArea.industrycode"
          >
            <h2 class="category__title">服务对象</h2>
            <div class="category__content">
              <a
                href="javascript:void(0);"
                class="category__item active"
                @click="toListByChoose($event, '', 4)"
                >全部</a
              >
              <a
                href="javascript:void(0);"
                class="category__item"
                v-for="item in objectList"
                :key="item.id"
                @click="toListByChoose($event, item.codeid, 4)"
                >{{ item.codevalue }}</a
              >
            </div>
          </div>
          <div class="category project-hide">
            <h2 class="category__title">项目人数</h2>
            <div class="category__content">
              <a
                href="javascript:void(0);"
                class="category__item active"
                @click="numChoose($event)"
                >全部</a
              >
              <a
                href="javascript:void(0);"
                class="category__item"
                @click="numChoose($event, '0')"
                >0</a
              >
              <a
                href="javascript:void(0);"
                class="category__item"
                @click="numChoose($event, '1-100')"
                >1-100</a
              >
              <a
                href="javascript:void(0);"
                class="category__item"
                @click="numChoose($event, '101-200')"
                >101-200</a
              >
              <a
                href="javascript:void(0);"
                class="category__item"
                @click="numChoose($event, '201-500')"
                >201-500</a
              >
              <a
                href="javascript:void(0);"
                class="category__item"
                @click="numChoose($event, '501-1000')"
                >501-1000</a
              >
              <a
                href="javascript:void(0);"
                class="category__item"
                @click="numChoose($event, '1001')"
                >1000以上</a
              >
            </div>
          </div>
          <div class="category-handle">
            <span @click="getMoreHide($event)">收起</span>
            <span class="hidden" @click="getMoreShow($event)">更多条件</span>
          </div>
          <ul class="row w">
            <li class="col v-m" style="width: 90%">
              <span class="label">项目起止日期</span>
              <date-picker
                :lang="lang"
                v-model="startTime"
                style="width: 120px"
                valueType="format"
              ></date-picker>
              <span class="label">至</span>
              <date-picker
                :lang="lang"
                v-model="endTime"
                style="width: 120px"
                valueType="format"
              ></date-picker>
              <span class="label">项目编号</span>
              <input
                type="text"
                class="input"
                style="width: 180px; height: 34px"
                v-model="projectId"
                maxlength="18"
              />
              <span class="label">项目名称</span>
              <input
                type="text"
                class="input"
                style="width: 180px; height: 34px"
                v-model="projectName"
                maxlength="30"
              />
              <a
                href="javascript:void(0);"
                class="button button-small"
                @click="getProjectList"
                style="height: 34px; line-height: 34px"
                >搜索</a
              >
              <a
                href="javascript:void(0);"
                class="button button-small"
                style="
                  margin-left: 6px;
                  background-color: #ccc;
                  height: 34px;
                  line-height: 34px;
                "
                @click="restSearch($event)"
                >重置</a
              >
            </li>
            <!-- <li class="col v-m t-r">
              <div class="text-tab" style="margin-right: -10px">
                <a
                  href="javascript:void(0);"
                  id="list"
                  class="active"
                  @click="getList($event, 0)"
                >
                  列表</a
                >
                <a
                  href="javascript:void(0);"
                  id="map"
                  @click="getList($event, 1)"
                  >地图</a
                >
              </div>
            </li> -->
          </ul>
          <div id="getList">
            <ul class="panel-list">
              <li
                class="panel-list__item"
                v-if="!querystatus && tolPage == 0"
                style="width: 100%; text-align: center"
              >
                <img src="@/assets/img/js-wujilu.png" />
              </li>
              <li
                class="panel-list__item"
                v-if="querystatus == 1 && tolPage == 0"
                style="width: 100%; text-align: center"
              >
                <img
                  src="@/assets/img/loader.png"
                  style="margin-right: 5px"
                /><span
                  style="
                    font-size: 16px;
                    color: #666666;
                    vertical-align: middle;
                  "
                  >加载中...</span
                >
              </li>
              <li
                class="panel-list__item"
                style="width: 25%"
                v-for="item in projectList"
                :key="item.id"
              >
                <div
                  class="panel-card"
                  @click="toProjectInfo(item.id, item.albx0021)"
                >
                  <img
                    :src="common.changeImgsrc(item.fileid)"
                    style="width: 260px; height: 170px"
                    alt=""
                    v-if="item.fileid"
                  />
                  <img
                    :src="item.defaultImg"
                    style="width: 260px; height: 170px"
                    alt=""
                    v-else-if="item.defaultImg"
                  />
                  <img
                    src="../../assets/img/i3.png"
                    style="width: 260px; height: 170px"
                    alt=""
                    v-else
                  />
                  <p class="t-c">
                    <a
                      href="javascript:void(0);"
                      class="button button-small warning round"
                      v-if="item.albx0072 == 3"
                      >待启动</a
                    >
                    <a
                      href="javascript:void(0);"
                      class="button button-small success round"
                      v-if="item.albx0072 == 4"
                      >运行中</a
                    >
                    <a
                      href="javascript:void(0);"
                      class="button button-small button-small round"
                      v-if="item.albx0072 == 5 || item.albx0072 == 6"
                      >已结项</a
                    >
                  </p>
                  <h2 class="panel-card__name">
                    <a href="javascript:void(0);" :title="item.albx0002">{{
                      item.albx0002
                    }}</a>
                  </h2>
                  <ul class="row w panel-card__info">
                    <li class="col v-m">
                      <h2>岗位</h2>
                      <!-- <p>{{item.albx0043 || '0'}}个</p> -->
                      <p
                        v-text="
                          item.albx0043 && item.albx0043 != 'null'
                            ? item.albx0043 + '个'
                            : '0个'
                        "
                      ></p>
                    </li>
                    <li class="col v-m">
                      <h2>目标</h2>
                      <!-- <p>{{item.albx0044 || '0'}}人</p> -->
                      <p
                        v-text="
                          item.albx0044 && item.albx0044 != 'null'
                            ? item.albx0044 + '个'
                            : '0个'
                        "
                      ></p>
                    </li>
                    <li class="col v-m">
                      <h2>报名</h2>
                      <!-- <p>{{item.albx0016 || '0'}}人</p> -->
                      <p
                        v-text="
                          item.albx0016 && item.albx0016 != 'null'
                            ? item.albx0016 + '个'
                            : '0个'
                        "
                      ></p>
                    </li>
                  </ul>
                  <div class="progress" style="text-align: left">
                    <span class="bar" :style="'width:' + item.progress"></span>
                  </div>
                  <p class="row w">
                    <span class="col v-m"
                      >项目进度：<b>{{ item.progress }}</b></span
                    >
                    <span class="col v-m t-r"
                      ><em
                        class="danger"
                        v-text="
                          (item.albx0072 == 3 && '离招募开始：') ||
                            (item.albx0072 == 4 && '离招募结束：') ||
                            ((item.albx0072 == 5 || item.albx0072 == 6) &&
                              '项目已结束：')
                        "
                      ></em
                      ><b>{{ item.days }}天</b></span
                    >
                  </p>
                </div>
              </li>
            </ul>
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
          <div id="getMap" style="display: none">
            <div
              class="map"
              style="height: 680px; margin-top: 30px"
              id="projectMap"
            ></div>
          </div>
        </div>
      </div>
      <div
        class="tj-bj"
        v-lazy:background-image="tjBj"
        v-if="projectTjList.length"
        style="height: 440px"
      >
        <div class="mid">
          <div class="tabbar" style="margin-top: 40px; background: none">
            <span
              class="active"
              style="
                display: block;
                position: relative;
                text-align: center;
                font-size: 18px;
                border-bottom: none;
                margin-left: 0;
              "
              >推荐项目</span
            >
          </div>
          <!-- <span @click="moreRecommend">更多</span> -->
          <ul class="panel-list" style="margin-top: 0">
            <li
              class="panel-list__item"
              style="width: 25%"
              v-for="item in projectTjList"
              :key="item.id"
            >
              <div
                class="panel-card"
                @click="toProjectInfo(item.id, item.albx0021)"
              >
                <img
                  :src="common.changeImgsrc(item.fileid)"
                  @error="imgError($event, item.defaultImg)"
                  style="width: 260px; height: 170px"
                  alt=""
                  v-if="item.fileid"
                />
                <!-- <img
                  :src="item.defaultImg"
                  style="width: 260px; height: 170px"
                  alt=""
                  v-else-if="item.defaultImg"
                />
                <img
                  src="../../assets/img/i3.png"
                  style="width: 260px; height: 170px"
                  alt=""
                  v-else
                /> -->
                <p class="t-c">
                  <a
                    href="javascript:void(0);"
                    class="button button-small warning round"
                    v-if="item.albx0072 == 2"
                    >招募待启动</a
                  >
                  <a
                    href="javascript:void(0);"
                    class="button button-small success round"
                    v-if="item.albx0072 == 3"
                    >招募中</a
                  >
                  <a
                    href="javascript:void(0);"
                    class="button button-small button-small round"
                    v-if="item.albx0072 == 4 || item.albx0072 == 5"
                    >招募已结束</a
                  >
                  <a
                    href="javascript:void(0);"
                    class="button button-small button-small info round"
                    v-if="item.albx0072 == 6 || item.albx0072 == 7"
                    >已结项</a
                  >
                </p>
                <h2 class="panel-card__name">
                  <a href="javascript:void(0);" :title="item.albx0002">{{
                    item.albx0002 | ellipsis(12)
                  }}</a>
                </h2>
                <ul class="row w panel-card__info">
                  <li class="col v-m">
                    <h2>岗位</h2>
                    <!-- <p>{{item.albx0043 || '0'}}个</p> -->
                    <p
                      v-text="
                        item.albx0043 && item.albx0043 != 'null'
                          ? item.albx0043 + '个'
                          : '0个'
                      "
                    ></p>
                  </li>
                  <li class="col v-m">
                    <h2>目标</h2>
                    <!-- <p>{{item.albx0044 || '0'}}人</p> -->
                    <p
                      v-text="
                        item.albx0044 && item.albx0044 != 'null'
                          ? item.albx0044 + '个'
                          : '0个'
                      "
                    ></p>
                  </li>
                  <li class="col v-m">
                    <h2>报名</h2>
                    <!-- <p>{{item.albx0016 || '0'}}人</p> -->
                    <p
                      v-text="
                        item.albx0016 && item.albx0016 != 'null'
                          ? item.albx0016 + '个'
                          : '0个'
                      "
                    ></p>
                  </li>
                </ul>
                <div class="progress" style="text-align: left">
                  <span class="bar" :style="'width:' + item.progress"></span>
                </div>
                <p class="row w">
                  <span class="col v-m"
                    >项目进度：<b>{{ item.progress }}</b></span
                  >
                  <span class="col v-m t-r"
                    ><em
                      class="danger"
                      v-text="
                        (item.albx0072 == 3 && '离招募开始：') ||
                          (item.albx0072 == 4 && '离招募结束：') ||
                          ((item.albx0072 == 5 || item.albx0072 == 6) &&
                            '项目已结束：')
                      "
                    ></em
                    ><b>{{ item.days }}天</b></span
                  >
                </p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
//import cpaginate from '@/components/page/paginationRed.vue';//分页
const cpaginate = () => import("@/components/page/paginationRed.vue"); //分页
import i3 from "../../assets/img/i3.png";
import map_pro from "../../assets/img/map_pro.png";
import { getCodeList } from "../../assets/js/getCodevalueList";

export default {
  name: "project",
  components: {
    cpaginate //分页
  },
  data() {
    return {
      routeDefine: this.$route.params.define,
      areaid: "",
      firstAreaList: [], //项目区域（一级区域）
      firstArea: "", //一级所选区域
      secondAreaList: [], //项目区域（二级区域）
      projectAreaId: "", //项目区域
      typeList: [], //服务类别
      projectServiceList1: [], //一级项目类别
      projectService2: "",
      projectServiceList2: [], //二级项目类别
      projectService3: "",
      projectServiceList3: [], //三级项目类别
      projectServiceId: "", //项目类别
      labelList: [], //项目标签
      labelId: "",
      serviceTypeId: "", //服务类型
      projectStateId: "04", //项目状态
      scopeList: [], //报名范围
      applyScope: "", //报名范围
      objectList: [], //服务对象
      serviceObj: "", //服务对象
      minCount: "", //最小人数
      maxCount: "", //最大人数
      recommend: "", //是否为推荐
      startTime: "",
      endTime: "",
      projectId: "", //项目id
      projectName: "", //项目名称
      projectList: [], //项目集合
      projectTjList: [], //推荐项目
      area_pos: [],
      markerArr: [],
      type: 0, //列表or地图
      lang: {
        //配置日期语音环境
        formatLocale: {
          firstDayOfWeek: 1
        },
        monthBeforeYear: false
      },
      querystatus: 0, //查询状态
      //分页参数
      tolCount: 0, //总条数
      tolPage: 0, //总页数
      pageSize: 12, //每页条数
      pageNow: 1, //当前页
      jumpPage: 1, //记录输入框中的值
      tjBj: require("@/assets/img/tj-bg-img.png")
    };
  },
  created() {
    window.Vues = this;
    // 全局搜索
    if (window.Vueh && Vueh.searchtype == 2) this.projectName = Vueh.searchtext;
    this.getAreaInfo();
    // 报名范围
    this.getProjectFwfw();
    // this.utilscommit.requestapi(
    //   "codeValueQueryFortisWeb",
    //   { tablename: "nvsi_albx0024" },
    //   this.callback_projectFwfw
    // );
    window.toProjectInfo = this.toProjectInfo;
  },
  mounted() {
    let type = this.common.getCookie("maptype");
    if (type) {
      this.type = type;
      $("#map")
        .addClass("active")
        .siblings()
        .removeClass("active");
      this.common.deleteCookie("maptype");
    }
    this.getList(null, this.type);
  },
  methods: {
    // 获取服务区域
    getAreaInfo() {
      var areaInfo = this.$store.getters.getArea;
      if (areaInfo && areaInfo.enname && areaInfo.enname == Vue.routeDefine) {
        // 和当前区域一致
        this.areaid = areaInfo.areaid;
        this.getdate();
      }
    },
    // 分页
    pageEvent(e) {
      this.getProjectList();
    },
    // 初始化查询条件
    getdate() {
      // 是否特殊站点
      let params = this.$store.getters.getArea.industrycode
        ? { areaid: "" }
        : { areaid: this.areaid };
      this.getfirstArea(params);
      // 一级区域
      // this.utilscommit.requestapi(
      //   "getNextAreaListFortisWeb",
      //   params,
      //   this.callback_projectInit,
      //   1
      // );

      // 推荐项目
      // this.utilscommit.request(
      //   "nvsi_listRecommendProject",
      //   {
      //     areaid: this.areaid,
      //     pageNow: 1,
      //     pageSize: 4,
      //     industrycode: this.$store.getters.getArea.industrycode,
      //   },
      //   this.callback_projectInit,
      //   6
      // );
      // 普通站点展示
      if (!this.$store.getters.getArea.industrycode) {
        // 服务类别
        // this.utilscommit.requestapi(
        //   "getAllCodeWeb",
        //   { codeTypeName: "lbe05", areaId: this.areaid },
        //   this.callback_projectInit,
        //   3
        // );
        this.getServiceType();
        // 服务对象
        // this.utilscommit.requestapi(
        //   "codeValueQueryFortisWeb",
        //   { tablename: "nvsi_albx0014" },
        //   this.callback_projectInit,
        //   4
        // );
        this.getServiceObj();
      }
      if (this.$store.getters.getArea.industrycode) {
        // 项目类别
        this.getProjectSevice();
        // 项目标签
        // this.utilscommit.requestapi(
        //   "codeValueQueryFortisWeb",
        //   { tablename: "nvsi_albx0065" },
        //   this.callback_projectInit,
        //   5
        // );
        this.getProjectTag();
      } else {
        this.getProjectList();
      }
    },
    // 数据初始化回调
    // callback_projectInit(data, type) {
    //   // 初始化返回数据结果 type类型为1=一级区域，3=服务类别，4=服务对象，5=项目标签，6=推荐项目
    //   if (data && data.data) {
    //     if (type == 1) {
    //       //一级区域
    //       this.firstAreaList = this.common.orderBy(data.data, "areaid", "asc");
    //     } else if (type == 3) {
    //       //服务类别
    //       this.typeList = data.data;
    //     } else if (type == 4) {
    //       //服务对象
    //       this.objectList = data.data;
    //     } else if (type == 5) {
    //       //项目标签
    //       this.labelList = data.data;
    //     } else if (type == 6) {
    //       // 推荐项目

    //       let list = data.data;
    //       list.forEach(element => {
    //         if (element.albx0009) {
    //           let type = element.albx0009.split(",")[0];
    //           //0020-税收 1101-志愿服务 1102-文明劝行 1301-海防 6101-十四运
    //           if (
    //             type &&
    //             type != "3201" &&
    //             type != "3202" &&
    //             type != "3203" &&
    //             type != "3204"
    //           ) {
    //             element.defaultImg = require("../../assets/img/prodefault/" +
    //               type +
    //               ".png");
    //           } else {
    //             element.defaultImg = require("../../assets/img/prodefault/0099.png");
    //           }
    //         } else {
    //           element.defaultImg = require("../../assets/img/prodefault/0099.png");
    //         }
    //       });
    //       this.projectTjList = list;
    //     }
    //   }
    // },
    //一级区域
    getfirstArea(param) {
      getCodeList("getNextAreaListFortisWeb", "firstArea", param).then(res => {
        this.firstAreaList = this.common.orderBy(res, "areaid", "asc");
      });
    },
    // 服务类别
    getServiceType() {
      getCodeList("getAllCodeWeb", "lbe05", {
        codeTypeName: "lbe05",
        areaId: this.areaid
      }).then(res => {
        this.typeList = res;
      });
    },
    //服务对象
    getServiceObj() {
      getCodeList("codeValueQueryFortisWeb", "nvsi_albx0014", {
        tablename: "nvsi_albx0014"
      }).then(res => {
        this.objectList = res;
      });
    },
    //标签
    getProjectTag() {
      getCodeList("codeValueQueryFortisWeb", "nvsi_albx0065", {
        tablename: "nvsi_albx0065"
      }).then(res => {
        this.labelList = res;
      });
    },

    // 二级区域
    callback_projectSjqy(result) {
      if (result && result.data) {
        this.secondAreaList = this.common.orderBy(result.data, "areaid", "asc");
        if (this.projectAreaId)
          $(".category__wrap")
            .find(".category__item")
            .first()
            .addClass("active")
            .siblings()
            .removeClass("active");
      } else {
        this.secondAreaList = [];
      }
    },
    // 报名范围
    getProjectFwfw() {
      getCodeList("codeValueQueryFortisWeb", "nvsi_albx0024", {
        tablename: "nvsi_albx0024"
      }).then(res => {
        if (res.length) {
          let data = res;
          for (var i = 0; i < data.length; i++) {
            if (data[i].codeid == "4" || data[i].codeid == "5") {
              data.splice(i, 1);
            }
          }
          // 报名范围
          this.scopeList = data;
        }
      });
    },
    // callback_projectFwfw(data) {
    //   if (data && data.data) {
    //     var ret = data.data;
    //     for (var i = 0; i < ret.length; i++) {
    //       if (ret[i].codeid == "4" || ret[i].codeid == "5") {
    //         ret.splice(i, 1);
    //       }
    //     }
    //     // 报名范围
    //     this.scopeList = ret;
    //   }
    // },
    // 项目类别
    getProjectSevice(e, id, type) {
      if (e)
        $(e.target)
          .addClass("active")
          .siblings()
          .removeClass("active");
      let projectServiceId = id ? id : this.$store.getters.getArea.industrycode;
      if (!type || type < 4)
        this.utilscommit.request(
          "nvsi_getNextItemCategoryListByCode",
          { itemcategorycode: projectServiceId },
          data => {
            if (data) {
              if (type == 2) {
                if (this.projectService2 != id)
                  $(".projectService2")
                    .find(".category__item")
                    .first()
                    .addClass("active")
                    .siblings()
                    .removeClass("active");
                this.projectService2 = data.data ? id : "";
                this.projectService3 = "";
                this.projectServiceList2 = data.data;
              } else if (type == 3) {
                if (this.projectService3 != id)
                  $(".projectService3")
                    .find(".category__item")
                    .first()
                    .addClass("active")
                    .siblings()
                    .removeClass("active");
                this.projectService3 = data.data ? id : "";
                this.projectServiceList3 = data.data;
              } else {
                this.projectService2 = "";
                this.projectService3 = "";
                this.projectServiceList1 = data.data;
              }
            }
          }
        );
      if (id) this.projectServiceId = id;
      this.pageNow = 1;
      this.getProjectList();
    },
    // 区域选择
    areaChoose(e, areaid, layerNumber) {
      this.projectAreaId = areaid;
      $(e.target)
        .addClass("active")
        .siblings()
        .removeClass("active");
      this.getProjectList();
      if (1 == layerNumber) {
        this.firstArea = areaid;
        this.utilscommit.requestapi(
          "getNextAreaListFortisWeb",
          { areaid: areaid },
          this.callback_projectSjqy
        ); //二级区域
      }
    },
    toListByChoose(e, id, type) {
      //type  1=服务类型,2=项目状态,3=报名范围,4=服务对象,5=项目标签,6=项目类别
      $(e.target)
        .addClass("active")
        .siblings()
        .removeClass("active");
      this.pageNow = 1;
      if (type == 1) {
        //服务类型
        this.serviceTypeId = id;
      } else if (type == 2) {
        //项目状态
        this.projectStateId = id;
      } else if (type == 3) {
        //报名范围
        this.applyScope = id;
      } else if (type == 4) {
        //服务对象
        this.serviceObj = id;
      } else if (type == 5) {
        //项目标签
        this.labelId = id;
      } else if (type == 6) {
        //项目类别
        this.projectServiceId = id;
      }
      this.getProjectList();
    },
    numChoose(e, num) {
      // 项目人数
      if (num) {
        if (num == "0") {
          this.minCount = "0";
          this.maxCount = "0";
        } else if (num == "1001") {
          this.minCount = "1001";
          this.maxCount = null;
        } else {
          this.minCount = num.substring(0, num.indexOf("-"));
          this.maxCount = num.substring(num.indexOf("-") + 1, num.length);
        }
      } else {
        this.minCount = null;
        this.maxCount = null;
      }
      $(e.target)
        .addClass("active")
        .siblings()
        .removeClass("active");
      this.pageNow = 1;
      this.getProjectList();
    },
    restSearch() {
      // 重置
      this.startTime = "";
      this.endTime = "";
      this.projectId = "";
      this.projectName = "";
    },
    getProjectList() {
      // 变更查询状态
      this.querystatus = 1;
      // 加载项目数据
      if (this.projectName) Vueh.searchtext = this.projectName; //全局搜索
      if (this.type == 0) {
        // 列表
        this.pageSize = 12;
        // 新api参数
        let params = {
          pageNum: this.pageNow,
          pageSize: this.pageSize,
          itemtag: this.labelId, // 项目标签
          itemcategory: this.projectServiceId, // 项目类别
          min: this.minCount, // 项目人数（报名人数）起
          max: this.maxCount, // 项目人数（报名人数）止
          albx0072: this.projectStateId || 3, // 项目状态
          albx0072A: this.projectStateId ? null : 6, // 项目状态，查全部
          albx0024: this.applyScope, // 报名范围
          albx0004: this.startTime, // 项目日期起
          albx0005: this.endTime, // 项目日期止
          albx0013: this.projectId, // 项目编号
          albx0021: this.projectAreaId || this.areaid, // 区域ID
          albx0014: this.serviceObj, // 服务对象
          albx0002: this.projectName, // 项目名称
          albx0009: this.serviceTypeId, // 服务类型
          code: "4" // 控制不显示不公开招募和结项的项目
        };
        // 在已结项中类别中才查询已结项和补录两种状态
        if (this.projectStateId == "5") {
          params.albx0073 = 18;
          params.albx0073A = 20;
          params.albx0072 = null;
          params.albx0072A = null;
        }
        if (params.albx0021.substr(2, 2) * 1 == 0) {
          params.axaa0001 = params.albx0021.substr(0, 2);
        } else {
          params.axaa0001 = params.albx0021.substr(0, 2);
          params.axaa0002 = params.albx0021.substr(0, 4);
          if (params.albx0021.substr(4, 2) * 1 != 0) {
            params.axaa0003 = params.albx0021.substr(0, 6);
          }
        }

        this.projectList = [];
        this.common.getTolData(this);

        // 新api，获取项目列表
        this.utilscommit.requestapi(
          "listProjectsFortisWeb",
          params,
          this.callback_project
        );
      } else if (this.type == 1) {
        //地图
        this.pageSize = 100;
        var data = {
          albx0021: this.projectAreaId, //项目区域
          albx0009: this.serviceTypeId, //服务类型
          albx0015: this.projectStateId, //项目状态
          albx0024: this.applyScope, //报名范围
          albx0014: this.serviceObj, //服务对象
          min: this.minCount, //最小人数
          max: this.maxCount, //最大人数
          albx0004: this.startTime, //项目日期起
          albx0005: this.endTime, //项目日期止
          albx0013: this.projectId, //项目ID
          albx0002: this.projectName, //项目名称
          areaid: this.areaid,
          pageNow: this.pageNow,
          pageSize: this.pageSize,
          itemcategory: this.projectServiceId, //项目类别
          itemtag: this.labelId, //项目标签
          industrycode: this.$store.getters.getArea.industrycode
        };
        this.utilscommit.request(
          "nvsi_listProjectOnMap",
          data,
          this.callback_project
        ); // 网站项目
      }
    },
    callback_project(data) {
      //获取项目数据
      if (data && data.data) {
        let list = data.data;
        //设置项目的默认图片-列表
        if (this.type == 0) {
          list.forEach(element => {
            // element.defaultImg = require("../../assets/img/prodefault/0099.png");
            if (element.albx0009) {
              let type = element.albx0009.split(",")[0];
              //0020-税收 1101-志愿服务 1102-文明劝行 1301-海防 6101-十四运
              if (
                type &&
                type != "3201" &&
                type != "3202" &&
                type != "3203" &&
                type != "3204"
              ) {
                element.defaultImg = require("../../assets/img/prodefault/" +
                  type +
                  ".png");
              } else {
                element.defaultImg = require("../../assets/img/prodefault/0099.png");
              }
            } else {
              element.defaultImg = require("../../assets/img/prodefault/0099.png");
            }
          });
        }
        this.projectList = list;
        this.common.getTolData(this, data);
      } else {
        this.projectList = [];
        this.common.getTolData(this);
      }
      if (this.type == 1) {
        this.getMapData();
      } else {
        $("html, body").animate({ scrollTop: $("#header").offset().top }, 20); //以20毫秒的速度向header标签滚动
      }
      this.querystatus = 0;
    },
    getMoreHide(e) {
      $(".project-hide").hide();
      $(e.target)
        .addClass("hidden")
        .siblings()
        .removeClass("hidden");
    },
    getMoreShow(e) {
      $(".project-hide").show();
      $(e.target)
        .addClass("hidden")
        .siblings()
        .removeClass("hidden");
    },
    getList(e, type) {
      this.type = type;
      if (this.$store.getters.getArea.enname == Vue.routeDefine)
        this.getProjectList();
      if (e) {
        $(e.target)
          .addClass("active")
          .siblings()
          .removeClass("active");
      }
      if (type == 0) {
        $("#getList").show();
        $("#getMap").hide();
      } else {
        $("#getList").hide();
        $("#getMap").show();
      }
    },
    getMapData() {
      this.area_pos = [];
      this.markerArr = [];
      if (this.projectList) {
        for (var a = 0; a < this.projectList.length; a++) {
          var gaddress = this.projectList[a].albx0012;
          if (!gaddress) gaddress = "";
          this.area_pos.push({
            title: this.projectList[a].albx0002,
            content:
              "联系人：" +
              this.projectList[a].albx0025 +
              "<br>地区：" +
              gaddress +
              "<br><br>" +
              "<a href='javascript:void(0);' onclick='toProjectInfo(\"" +
              this.projectList[a].id +
              '","' +
              this.projectList[a].albx0021 +
              "\")'>查看详情</a>",
            point:
              this.projectList[a].albx0035 + "," + this.projectList[a].albx0036
          });
        }
        for (var i = 0; i < this.area_pos.length; i++) {
          this.markerArr.push({
            title: this.area_pos[i].title,
            content: this.area_pos[i].content,
            point: this.area_pos[i].point,
            isOpen: 0,
            icon: { w: 21, h: 25, l: 46, t: 21, x: 6, lb: 15 }
          });
        }
      }
      this.getMaps.initMap(
        this.markerArr,
        "projectMap",
        this.common.areaInfo().cnname,
        map_pro,
        this.projectList[0]
      ); //创建和初始化地图
    },
    toProjectInfo(id, areaid) {
      this.$utilroutes.toProjectInfo(id, areaid);
    },
    imgError(el, defaultImg) {
      if (defaultImg) {
        el.target.src = defaultImg;
      } else {
        el.target.src = i3;
      }
    },
    moreRecommend() {
      this.recommend = "1";
      this.getProjectList();
      $(".tj-bj").hide();
      $(".recommend").show();
    }
  },
  beforeRouteUpdate(to, from, next) {
    this.$router.go(0); //刷新页面
    // 在渲染该组件的对应路由被 confirm 前调用
    // 不！能！获取组件实例 `this`
    // 因为当守卫执行前，组件实例还没被创建
  },
  watch: {
    $route(to, from) {
      //监听路由是否变化
      this.$router.go(0); //刷新页面
    }
  }
};
</script>

<style scoped>
.hidden {
  display: none;
}
.tabbar span:before {
  content: "";
  position: absolute;
  top: 62%;
  height: 2px;
  width: 46%;
  left: 0;
}
.tabbar span:after {
  content: "";
  position: absolute;
  top: 62%;
  height: 2px;
  width: 46%;
  right: 0;
}
.tabbar span.active:before {
  background: -webkit-linear-gradient(to right, #fff, #cc0000);
  background: linear-gradient(to right, #fff, #cc0000);
}
.tabbar span.active:after {
  background: -webkit-linear-gradient(to right, #cc0000, #fff);
  background: linear-gradient(to right, #cc0000, #fff);
}
</style>
