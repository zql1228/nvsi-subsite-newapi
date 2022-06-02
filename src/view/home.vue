<template>
  <div id="homebody">
    <!--中间部分-->
    <div :class="{ 'js-bg-img': modularshow == 1 }">
      <div class="mid-layout">
        <!-- 头条 -->
        <div class="large-title" v-show="hotTitle.albx6202 && modularshow == 1">
          <h2
            v-text="hotTitle.albx6202"
            @click="getSpecial(hotTitle)"
            style="cursor: pointer"
          ></h2>
          <div class="type">
            <h3>特别</h3>
            <p>通知</p>
          </div>
        </div>
        <div class="grid">
          <!-- 公告 （福建头部滚动--专题专栏）-->
          <div class="hb-tips" v-show="modularshow == 2">
            <div class="hb-tips_Box">
              <div class="bd">
                <ul>
                  <li
                    v-for="item in ztzlNewList"
                    :key="item.id"
                    @click="getNewsInfoMore(item)"
                  >
                    <p>{{ item.albx6202 | ellipsis(20) }}</p>
                    <span>{{ item.createtime | ellipsisNos(10) }}</span>
                  </li>
                </ul>
              </div>
              <div class="hd">
                <ul></ul>
              </div>
            </div>
          </div>
          <!-- 志愿者模块 （福建-功能模块注册、登录等）-->
          <ul class="hb-list" v-show="modularshow == 2">
            <li
              v-for="(itemInfo, index1) in itemInfos"
              :key="index1"
              @click="toUrl(itemInfo)"
            >
              <div class="hb-list-panel">
                <img :src="require('../assets/img/' + itemInfo.url)" alt />
                <div class="hb-list-info">
                  <h3>{{ itemInfo.name }}</h3>
                </div>
              </div>
            </li>
          </ul>
          <!-- （信息）动态 ---(福建和贵州动态分类)  -->
          <div
            class="title"
            style="margin-top: 40px"
            v-show="modularshow == 2 || modularshow == 3"
          >
            <img src="../assets/img/icon_title.png" alt />
            <h2 class="label">
              <span class="active" v-text="firstModular.showname"></span>
            </h2>
            <div class="hb-nav-tab">
              <a href="javascript:void(0);" class="active">全部</a>
              <a
                href="javascript:void(0);"
                v-for="item in firstModular.menulist"
                :key="item.name"
                @click="toNewsMore(item)"
                :title="item.showname"
                v-text="item.showname"
              ></a>
            </div>
            <a
              href="javascript:void(0);"
              class="more"
              @click="toNewsMore(firstModular)"
              >更多</a
            >
          </div>
          <!-- 轮播图 -->
          <div
            class="grid-item"
            style="width: 50%; padding-right: 25px; margin-top: 20px"
          >
            <div id="slideBox" class="slideBox">
              <div class="bd">
                <ul>
                  <li v-for="item in lbtNewList" :key="item.id">
                    <a
                      href="javascript:void(0);"
                      @click="getNewsInfoMore(item)"
                      :title="item.title"
                    >
                      <img
                        v-lazy="common.changeImgsrc(item.imgtitle)"
                        @error="imgError"
                        alt
                      />
                      <span v-cloak>{{ item.title | ellipsis(25) }}</span>
                    </a>
                  </li>
                </ul>
              </div>
              <div class="hd">
                <ul></ul>
              </div>
            </div>
          </div>
          <!-- <div
            class="grid-item"
            style="width: 50%; margin-top: 20px; height: 380px"
            v-show="!modularName.length"
          >
            <img style="width: 100%; height: 100%" v-lazy="imgmtbd" />
          </div> -->
          <!-- 志联动态 列表 （无个性化网站）-->
          <home-list
            style="width: 50%; margin-top: 20px"
            :modularList="modularName"
            titlelength="30"
            modularType="2"
            v-show="modularshow == 1"
          ></home-list>
          <!-- 首条显示详情 动态列表 (福建和贵州动态列表) -->
          <div
            class="grid-item"
            style="width: 50%; margin-top: 20px"
            v-show="modularshow == 2 || modularshow == 3"
          >
            <div
              v-for="el in modularName.filter(obj => obj.positionindex == 3)"
              :key="el.id"
            >
              <!-- 首条详情展示 -->
              <div
                class="hb-title"
                v-if="el.news.newslist && el.news.newslist[0]"
              >
                <div>
                  <span
                    :style="{ 'font-weight': modularshow == 3 ? 'bold' : '' }"
                    >{{ modularshow == 3 ? "头条" : "NEWS" }}</span
                  >
                  <h2
                    :title="el.news.newslist[0].title"
                    @click="getNewsInfoMore(el.news.newslist[0])"
                  >
                    {{ el.news.newslist[0].title | ellipsis(28) }}
                  </h2>
                </div>
                <p class="hb-title-info">
                  &emsp;&emsp;{{ el.news.newslist[0].content | ellipsis(64)
                  }}<span @click="getNewsInfoMore(el.news.newslist[0])"
                    >[详情]</span
                  >
                </p>
              </div>
              <!-- 列表 -->
              <ul class="list">
                <li
                  class="row w"
                  v-for="(dynamicInfo, infoindex) in el.news.newslist"
                  :key="infoindex"
                  v-show="infoindex > 0"
                >
                  <!--  -->
                  <div class="col v-m">
                    <span class="num">{{ infoindex }}</span>
                  </div>
                  <div class="col v-m" style="text-align: unset">
                    <a
                      href="javascript:void(0);"
                      class="label"
                      @click="getNewsInfoMore(dynamicInfo)"
                      >{{ dynamicInfo.title }}</a
                    >
                  </div>
                  <div class="col v-m">
                    <span class="time">{{
                      dynamicInfo.entrytime | ellipsisNos(10)
                    }}</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <!-- banner图跳转 -->
          <div
            class="grid-item"
            style="width: 100%; margin: 20px 0"
            v-if="hotImg && modularshow != 3"
          >
            <a
              href="javascript:void(0);"
              @click="getSpecial(hotImg)"
              class="pointer"
            >
              <img
                :src="common.changeImgsrc(hotImg.imgpath)"
                class="w"
                width="1200"
                height="115.7"
                alt
              />
            </a>
          </div>
          <!-- 通知公告 （无个性化网站） -->
          <home-list
            style="width: 30%; padding-right: 25px; margin-top: 20px"
            :modularList="modularName"
            :titlelength="titlelength"
            modularType="3"
            v-show="modularshow == 1"
          ></home-list>
          <!-- <div
            class="grid-item"
            style="
              width: 30%;
              padding-right: 25px;
              margin-top: 20px;
              height: 265px;
            "
            v-show="!tzggListId && modularshow == 1"
          >
            <img style="width: 100%; height: 100%" v-lazy="imgmtbd" />
          </div> -->
          <!-- 功能按钮模块 （无个性化网站） -->
          <div
            class="grid-item"
            style="width: 50%; margin-top: 20px"
            v-show="modularshow == 1"
          >
            <div class="center">
              <div class="row w">
                <div class="col v-m" style="width: 25%">
                  <p>欢迎进入</p>
                  <h2 v-show="!areaName">北京志愿</h2>
                  <h2 v-show="areaName" v-text="areaName + '志愿'"></h2>
                </div>
                <div class="col v-m">
                  <div class="row w">
                    <div
                      class="col v-m"
                      style="width: 25%; padding-right: 20px"
                    >
                      <h3 class="primary">求助者</h3>
                    </div>
                    <div class="col v-m" style="font-size: 0">
                      <a
                        href="javascript:void(0);"
                        @click="toOtherPage('volreg')"
                        style="width: 100%; background: #2bbad9"
                        >注册成为志愿者</a
                      >
                      <a
                        href="javascript:void(0);"
                        @click="toOtherPage('orgreg', 1)"
                        style="width: 100%; background: #8061cb"
                        >注册成为志愿服务队伍</a
                      >
                    </div>
                  </div>
                  <div class="row w">
                    <div
                      class="col v-m"
                      style="width: 25%; padding-right: 20px"
                    >
                      <h3 class="danger">志愿者</h3>
                    </div>
                    <div class="col v-m" style="font-size: 0">
                      <a
                        href="javascript:void(0);"
                        @click="toOtherPage('volreg')"
                        style="
                          width: 19%;
                          background: #4c75d1;
                          margin-right: 1%;
                        "
                        >实名注册</a
                      >
                      <a
                        href="javascript:void(0);"
                        @click="toOther('myproject', '记录时长')"
                        style="width: 30%; background: #44ac45"
                        >记录时长</a
                      >
                      <a
                        href="javascript:void(0);"
                        @click="toOther('usercard', '下载志愿服务证书')"
                        style="width: 49%; background: #e29133; margin-left: 1%"
                        >下载志愿服务记录证明</a
                      >
                      <a
                        href="javascript:void(0);"
                        @click="toOtherPage('infosearch')"
                        style="
                          width: 48%;
                          background: #2bbad9;
                          margin-right: 1%;
                        "
                        >志愿者、记录证明查询</a
                      >
                      <a
                        href="javascript:void(0);"
                        @click="toOtherPage('project')"
                        style="width: 25%; background: #328ddb"
                        >志愿项目</a
                      >
                      <a
                        href="javascript:void(0);"
                        @click="toOtherPage('group', 1)"
                        style="width: 25%; background: #a2ba34; margin-left: 1%"
                        >志愿队伍</a
                      >
                    </div>
                  </div>
                  <div class="row w">
                    <div
                      class="col v-m"
                      style="width: 25%; padding-right: 20px"
                    >
                      <h3 class="info">志愿队伍</h3>
                    </div>
                    <div class="col v-m" style="font-size: 0">
                      <a
                        href="javascript:void(0);"
                        @click="toOtherPage('orgreg', 1)"
                        style="
                          width: 19%;
                          background: #a2ba34;
                          margin-right: 1%;
                        "
                        >队伍注册</a
                      >
                      <a
                        href="javascript:void(0);"
                        @click="toOther(null, '评价志愿者')"
                        style="width: 45%; background: #8061cb"
                        >评价志愿者</a
                      >
                      <a
                        href="javascript:void(0);"
                        @click="toOther(null, '招募志愿者')"
                        style="width: 34%; background: #13a9a0; margin-left: 1%"
                        >招募志愿者</a
                      >
                      <a
                        href="javascript:void(0);"
                        @click="toOther(null, '发布志愿项目')"
                        style="width: 100%; background: #e29133"
                        >发布志愿服务项目</a
                      >
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- 登录功能模块 （无个性化网站） -->
          <div
            class="grid-item"
            style="width: 20%; padding-left: 25px; margin-top: 20px"
            v-show="modularshow == 1"
          >
            <div
              class="box row w"
              style="height: 80px"
              v-for="loginItem in itemInfoLogin"
              :key="loginItem.loginType"
              @click="toLogin(loginItem.loginType)"
            >
              <div class="col v-m">
                <img
                  :src="require('../assets/img/' + loginItem.url)"
                  alt
                  style="width: 60px; margin: 0 5px"
                />
              </div>
              <div class="col v-m">
                <h2 v-text="loginItem.name"></h2>
                <p v-text="loginItem.info"></p>
              </div>
            </div>
          </div>
          <!-- 专题专栏-轮播图 （无个性化网站） -->
          <div
            class="grid-item"
            style="width: 100%; margin-top: 20px"
            v-if="ztzlNewList.length && modularshow == 1"
          >
            <ul class="row w">
              <li class="col v-m">
                <h2 class="block-title">专题专栏</h2>
                <div class="picScroll-left">
                  <div class="hd">
                    <a class="next"></a>
                    <ul></ul>
                    <a class="prev"></a>
                    <span class="pageState"></span>
                  </div>
                  <div class="bd">
                    <ul class="picList" @click="getLbtSpecial">
                      <li
                        v-for="(item, index) in ztzlNewList"
                        :key="index"
                        style="width: 253px !important"
                        :data-index="index"
                      >
                        <div class="pic">
                          <a href="javascript:void(0);">
                            <img
                              :src="common.changeImgsrc(item.imgpath)"
                              @error="imgError"
                              style="height: 126px; width: 100%"
                            />
                          </a>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <!-- (贵州) 功能模块(登录)-->
          <div class="gz-grid-item" span="24" v-if="modularshow == 3">
            <div class="gz-grid-content">
              <div class="gz-shop">
                <div
                  class="gz-shop-item"
                  v-for="(itemInfo, index) in itemInfoLogin"
                  :key="index"
                  @click="toLogin(itemInfo.loginType)"
                >
                  <div class="gz-shop-content">
                    <img :src="require('../assets/img/' + itemInfo.url)" alt />
                    <div class="flex-v">
                      <span>{{ itemInfo.name }}</span>
                      <p>{{ itemInfo.info }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- 贵州站 - （学习培训）图+文 -->
          <div
            class="grid-item"
            style="
              padding-right: 20px;
              margin-right: 19px;
              width: 32.3%;
              margin-top: 20px;
            "
            v-show="modularshow == 3"
          >
            <div
              v-for="el in modularName.filter(obj => obj.positionindex == 4)"
              :key="el.id"
            >
              <div class="title">
                <img src="../assets/img/icon_title.png" alt />
                <h2 class="label">
                  <span
                    class="active"
                    v-text="ellipsis(el.resourcename, 9)"
                  ></span>
                </h2>
                <a
                  href="javascript:void(0);"
                  class="more"
                  @click="toNewsMore(el)"
                  >更多</a
                >
              </div>
              <ul class="hb-team-list">
                <li
                  v-for="(item, index3) in el.news.newslist"
                  :key="index3"
                  v-show="index3 < 2"
                >
                  <img
                    v-if="item.imgtitle"
                    v-lazy="common.changeImgsrc(item.imgtitle)"
                    @error="imgError"
                    @click="getNewsInfoMore(item)"
                    style="width: 91.5px; height: 91.5px"
                  />
                  <img
                    v-else
                    src="https://download.yxybb.com/project/MZ/resource/2020/11/23/imgmtbd.png"
                    @click="getNewsInfoMore(item)"
                    style="width: 91.5px; height: 91.5px"
                  />
                  <div class="hb-team-list-info">
                    <h3 v-text="item.title" @click="getNewsInfoMore(item)"></h3>
                    <p v-cloak>
                      {{ item.content | ellipsis(49) }}
                      <a
                        href="javascript:void(0);"
                        @click="getNewsInfoMore(item)"
                        >[详情]</a
                      >
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <!-- （贵州）文件公告 -->
          <home-list
            style="
              padding-right: 20px;
              margin-right: 8px;
              width: 32.3%;
              margin-top: 20px;
            "
            :modularList="modularName"
            :titlelength="titlelength"
            modularType="5"
            v-show="modularshow == 3"
          ></home-list>
          <!-- （贵州）统计分析 -->
          <div
            class="gz-grid-item"
            style="width: 32.3%; padding-left: 20px"
            v-show="modularshow == 3 && staticmoder"
          >
            <div class="gz-grid-content">
              <div class="gz-grid-header">
                <div class="gz-title">
                  <img src="../assets/img/icon_title.png" alt="" />
                  <p>统计分析</p>
                  <a
                    href="javascript:;"
                    class="more"
                    style="right: 0"
                    @click="toStaticmoderList"
                    >更多</a
                  >
                </div>
                <!-- <a href="javascript:;" class="gz-more-btn" @click="toStaticmoderList">更多</a> -->
              </div>
              <div class="gz-grid-main">
                <div class="gz-card">
                  <div class="gz-card-content">
                    <img src="../assets/images/icon4.png" alt="" />
                    <div class="flex-v">
                      <p>实名志愿者总数（人）</p>
                      <span v-text="staticmoder.gzvolnum || 0"></span>
                    </div>
                  </div>
                  <div class="gz-card-content">
                    <img src="../assets/images/icon6.png" alt="" />
                    <div class="flex-v">
                      <p>志愿者队伍（个）</p>
                      <span v-text="staticmoder.gzgroupnum || 0"></span>
                    </div>
                  </div>
                  <div class="gz-card-content">
                    <img src="../assets/images/icon7.png" alt="" />
                    <div class="flex-v">
                      <p>志愿服务时长（小时）</p>
                      <span v-text="staticmoder.gztimesum || 0"></span>
                    </div>
                  </div>
                  <div class="gz-card-content">
                    <img src="../assets/images/icon8.png" alt="" />
                    <div class="flex-v">
                      <p>志愿服务项目（个）</p>
                      <span v-text="staticmoder.gzprojectnum || 0"></span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- 探索 一张图片+新闻标题(福建)   （贵州站） 西部计划、研究生支教团-->
          <div
            class="grid-item"
            style="
              padding-right: 20px;
              margin-right: 19px;
              width: 32.3%;
              margin-top: 20px;
            "
            v-show="modularshow == 2 || modularshow == 3"
          >
            <div
              v-for="el in modularName.filter(
                obj => obj.positionindex == (modularshow == 2 ? 4 : 6)
              )"
              :key="el.id"
            >
              <div class="title">
                <img src="../assets/img/icon_title.png" />
                <h2 class="label">
                  <span
                    class="active"
                    v-text="ellipsis(el.resourcename, 9)"
                  ></span>
                </h2>
                <a
                  href="javascript:void(0);"
                  class="more"
                  @click="toNewsMore(el)"
                  >更多</a
                >
              </div>
              <ul class="list small">
                <img
                  class="img-w"
                  v-if="
                    el.news.newslist &&
                      el.news.newslist[0] &&
                      el.news.newslist[0].imgtitle
                  "
                  v-lazy="common.changeImgsrc(el.news.newslist[0].imgtitle)"
                  @error="imgError"
                  @click="getNewsInfoMore(el.news.newslist[0])"
                  style="margin-bottom: 10px; height: 130px"
                />
                <img
                  class="img-w"
                  v-else
                  v-lazy="imgmtbd"
                  @click="getNewsInfoMore(el.news.newslist[0])"
                  style="margin-bottom: 10px; height: 130px"
                />
                <li
                  class="row w"
                  v-for="(item, index5) in el.news.newslist"
                  :key="index5"
                  @click="getNewsInfoMore(item)"
                  v-show="index5 > 0"
                >
                  <div class="col v-m" style="text-align: unset">
                    <a href="javascript:void(0);" class="label" v-cloak>
                      <span class="dot"></span>
                      {{ item.title }}
                    </a>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <!-- 三个新闻列表（无个性化网站）    -->
          <home-list
            style="
              padding-right: 20px;
              margin-right: 8px;
              width: 32.3%;
              margin-top: 20px;
            "
            :modularList="modularName"
            :titlelength="titlelength"
            :modularType="modularshow == 1 ? 4 : modularshow == 2 ? 5 : 7"
          ></home-list>
          <home-list
            style="margin-right: 8px; width: 32.3%; margin-top: 20px"
            :style="{
              'padding-right': modularshow != 3 ? '20px' : '',
              'padding-left': modularshow != 3 ? '' : '20px'
            }"
            :modularList="modularName"
            :titlelength="titlelength"
            :modularType="modularshow == 1 ? 5 : modularshow == 2 ? 6 : 8"
          ></home-list>
          <home-list
            class="grid-item"
            style="padding-right: 12px; width: 32.3%; margin-top: 20px"
            :modular-list="modularName"
            modularType="6"
            v-show="modularshow == 1"
          ></home-list>
          <!-- 队伍 两行图文 (福建)-->
          <div
            class="grid-item"
            style="
              padding-right: 20px;
              margin-right: 19px;
              width: 32.3%;
              margin-top: 20px;
            "
            v-show="modularshow == 2"
          >
            <div
              v-for="el in modularName.filter(obj => obj.positionindex == 7)"
              :key="el.id"
            >
              <div class="title">
                <img src="../assets/img/icon_title.png" alt />
                <h2 class="label">
                  <span
                    class="active"
                    v-text="ellipsis(el.resourcename, 9)"
                  ></span>
                </h2>
                <a
                  href="javascript:void(0);"
                  class="more"
                  @click="toNewsMore(el)"
                  >更多</a
                >
              </div>
              <ul class="hb-team-list">
                <li
                  v-for="(item, index3) in el.news.newslist"
                  :key="index3"
                  v-show="index3 < 2"
                >
                  <img
                    v-lazy="common.changeImgsrc(item.imgtitle)"
                    @error="imgError"
                    @click="getNewsInfoMore(item)"
                    style="width: 91.5px; height: 91.5px"
                  />
                  <div class="hb-team-list-info">
                    <h3 v-text="item.title" @click="getNewsInfoMore(item)"></h3>
                    <p v-cloak>
                      {{ item.content | ellipsis(47) }}
                      <a
                        href="javascript:void(0);"
                        @click="getNewsInfoMore(item)"
                        >[详情]</a
                      >
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <!-- (贵州) 志愿排行 -->
          <div
            class="gz-grid-item"
            style="padding-right: 20px; margin-right: 19px; width: 32.3%"
            v-show="modularshow == 3"
          >
            <div class="gz-grid-content">
              <div class="gz-grid-header">
                <div class="gz-title">
                  <img src="../assets/img/icon_title.png" alt="" />
                  <p>服务时长</p>
                </div>
                <ul class="gz-tabs" size="small" style="padding-bottom: 8px">
                  <li
                    class="gz-tabs-item"
                    :class="{ 'gz-tabs-active': showActive == 1 }"
                    @click="tabsActive(1)"
                  >
                    志愿者
                  </li>
                  <li class="gz-tabs-line"></li>
                  <li
                    class="gz-tabs-item"
                    :class="{ 'gz-tabs-active': showActive == 2 }"
                    @click="tabsActive(2)"
                  >
                    志愿队伍
                  </li>
                </ul>
              </div>
              <div class="gz-grid-main">
                <div class="gz-list-panel">
                  <ul class="gz-list" gap="small" type="order">
                    <li
                      class="gz-list-item"
                      v-for="(rankItem, rankindex) in rankList"
                      :key="rankindex"
                    >
                      <div
                        class="gz-list-item-prefix"
                        v-text="rankindex + 1"
                      ></div>
                      <a
                        href="javascript:void(0);"
                        class="gz-list-item-core"
                        @click="toDetail(rankItem)"
                        v-text="
                          showActive == 1
                            ? rankItem.albp0003
                            : rankItem.albe0002
                        "
                      ></a>
                      <div
                        class="gz-list-item-suffix"
                        v-text="
                          showActive == 1
                            ? rankItem.albp0089
                            : rankItem.albe0069
                        "
                      ></div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <!-- 图说 八张图片  (福建)-->
          <div
            class="grid-item"
            style="width: 66.1%; padding-right: 20px; margin-top: 20px"
            v-show="modularshow == 2"
          >
            <div
              v-for="el in modularName.filter(obj => obj.positionindex == 8)"
              :key="el.id"
            >
              <div class="title">
                <img src="../assets/img/icon_title.png" alt />
                <h2 class="label">
                  <span
                    class="active"
                    v-text="ellipsis(el.resourcename, 9)"
                  ></span>
                </h2>
                <a
                  href="javascript:void(0);"
                  class="more"
                  @click="toNewsMore(el)"
                  >更多</a
                >
              </div>
              <ul class="hb-description-list">
                <li
                  v-for="item in el.news.newslist"
                  :key="item.id"
                  @click="getNewsInfoMore(item)"
                >
                  <div class="hb-description-panel">
                    <img
                      v-lazy="common.changeImgsrc(item.imgtitle)"
                      :key="item.imgtitle"
                      @error="imgError"
                      height="138.83px"
                    />
                    <p v-show="item.title">{{ item.title }}</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <!-- 贵州 志愿风采 -->
          <div
            class="gz-grid-item"
            style="width: 66.1%"
            v-show="modularshow == 3"
          >
            <div
              class="gz-grid-content"
              v-for="el in modularName.filter(obj => obj.positionindex == 9)"
              :key="el.id"
            >
              <div class="gz-grid-header">
                <div class="gz-title">
                  <img src="../assets/img/icon_title.png" alt="" />
                  <p v-text="ellipsis(el.resourcename, 9)"></p>
                  <a
                    href="javascript:void(0);"
                    class="more"
                    @click="toNewsMore(el)"
                    >更多</a
                  >
                </div>
              </div>
              <div class="gz-grid-main">
                <div class="gz-pictures">
                  <div
                    class="gz-pictures-item"
                    v-for="item in el.news.newslist"
                    :key="item.id"
                    @click="getNewsInfoMore(item)"
                  >
                    <div class="gz-pictures-main">
                      <img
                        v-if="item.imgtitle"
                        v-lazy="common.changeImgsrc(item.imgtitle)"
                        :key="item.imgtitle"
                        @error="imgError"
                        alt=""
                      />
                      <img v-else :src="imgmtbd" alt="" />
                      <p v-show="item.title">{{ item.title }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 其中14个试运行站点固定窗口 -->
    <div class="pop-notice" v-if="!isshow && routeDefine != 'jiangsu'">
      <p class="close" @click="toCloseTips"></p>
      <h2>全国志愿服务信息系统（2.0版）全面上线试运行</h2>
      <p>
        为更好服务全国志愿服务工作，由民政部升级开发建设的全国志愿服务信息系统（中国志愿服务网）2.0版（<em
          style="color: yellow; font-weight: bold"
          >https://chinavolunteer.mca.gov.cn</em
        >）已全面上线试运行。欢迎广大志愿者、志愿服务队伍登录使用民政部官方志愿服务信息系统（中国志愿服务网），并提出宝贵意见建议。我们将持续优化系统功能、提升用户体验，为您提供更加优质便捷服务。
      </p>
      <div style="text-align: center; margin-top: 30px">
        <a href="javascript:void(0);" v-if="isshow_times > 0"
          >{{ isshow_times }}秒</a
        >
        <a
          href="javascript:void(0);"
          v-if="isshow_times == 0"
          @click="toCloseTips"
          >关闭</a
        >
      </div>
    </div>

    <div
      id="js_tips"
      class="js_tipspop"
      v-if="adShow && routeDefine == 'jiangsu'"
    >
      <p class="close" @click="adShow = false"></p>
      <p>
        目前，原“志愿江苏”平台的历史数据已经全部迁移到江苏志愿服务网（<em
          style="color: yellow; font-weight: bold"
          >http://js.chinavolunteer.cn</em
        >）。原志愿服务队伍按照原用户名和密码进行登录，如果登录时提示用户名或者密码错误，可以点击“忘记密码”按钮输入注册时填写的邮箱地址进行密码找回；如果忘记注册的邮箱可以联系你的上级队伍或者民政部门帮你补充和修改联系人邮箱。原志愿者按照原用户名和密码进行登录，如果登录时提示用户名或者密码错误，可以点击“忘记密码”按钮输入注册时填写的邮箱地址进行密码找回；如果忘记注册的邮箱可以点击“账户申诉”按钮进行申诉找回用户名和密码。欢迎广大用户登录使用志愿服务信息系统，并提出宝贵意见和建议。我们将持续优化系统功能、提升用户体验，为您提供更加优质的便捷服务。问题咨询请拨打客服电话：4006818148转8
      </p>
    </div>
  </div>
</template>

<script>
import "@/assets/js/jquery1.42.min.js";
import "@/assets/js/jquery.SuperSlide.2.1.3.js";
import AdMove from "@/assets/js/move.js";
// const HomeList = () => import("@/components/home_list.vue"); //列表组件
const HomeList = () => import("@/components/homeList.vue"); //列表组件
const share = () => import("@/components/share.vue"); //分享

export default {
  name: "homebody",
  components: { HomeList, share },
  data: function() {
    return {
      // 新增
      itemInfos: [
        //福建模板
        {
          url: "icon21.png",
          name: "志愿者注册",
          englishName: "Volunteer registration",
          router: "volreg"
        },
        {
          url: "icon22.png",
          name: "志愿队伍注册",
          englishName: "Volunteer registration",
          router: "orgreg"
        },
        {
          url: "icon24.png",
          name: "志愿者证书查询",
          englishName: "Volunteers certificate inquiry",
          router: "infosearch",
          isopen: "0"
        },
        {
          url: "icon26.png",
          name: "管理部门登录",
          englishName: "Management login",
          router: "login"
        }
      ],
      itemInfoLogin: [
        //江苏、贵州模板
        {
          url: "icon21.png",
          name: "志愿者登录",
          info: "什么是志愿者 有哪些权利和义务",
          loginType: 2
        },
        {
          url: "icon22.png",
          name: "志愿队伍登录",
          info: "志愿队伍注册、审核 招募志愿者、管理项目",
          loginType: 3
        },
        {
          url: "icon26.png",
          name: "管理部门登录",
          info: "管理部门登录",
          loginType: 1
        }
      ],
      areaid: "",
      areaName: "",
      titlelength: 19, //默认长度
      routeDefine: this.$route.params.define,
      lbtNewList: [], //轮播图
      zeromodel: [], //模块一中模块名称
      modularName: [], //模块名称
      firstModular: {}, //模块一
      zldtListId: "",
      tzggListId: "",
      ztzlNewList: [], //专题专栏
      //headerNewList:[],//头条
      hotImg: "", //图片置顶
      hotTitle: {}, //标题置顶
      adShow: true, //江苏弹框展示
      isshow: this.common.getCookie("isshow"),
      isshow_times: 16, //倒计时
      // sixmodel:[],//模块六
      //用户信息
      userInfo: "",
      imgmtbd:
        "https://download.yxybb.com/project/MZ/resource/2020/11/23/imgmtbd.png",
      modularshow: 1, //展示模块，1=江苏（jiangsu）模板,2=福建（fujian）模板，3=贵州（guizhou）模板
      // showtype: 0, //分享状态
      showActive: 1, //贵州首页-志愿排行tab切换   1-志愿者  2-志愿队伍
      staticmoder: {}, //贵州站统计
      gzdetailstatistics: [], //贵州站统计列表详情
      gzgrorank: [], //贵州站-排行(队伍)
      gzvolrank: [], //贵州站-排行(志愿者)
      rankList: [] //页面显示的排行列表
    };
  },
  created() {
    window.Vues = this;
    this.getAreaInfo();
    //用户信息
    this.userInfo = this.$store.getters.getUser;
    // this.utilscommit.request("nvsi_getUserInfo", null, this.userInfoBack);
    if (!this.common.getCookie("isshow")) this.isshow_setTimes();
  },
  mounted() {
    if (this.adShow && this.routeDefine == "jiangsu") {
      var tips = document.getElementById("js_tips");
      var tip = new AdMove(tips);
      tip.Run();
    }
  },
  watch: {
    "$route.params.define": function(to, from) {
      if (to != from) {
        this.modularshow = 1;
        if (to == "fujian") this.modularshow = 2;
        if (to == "guizhou") this.modularshow = 3;
      }
    }
  },
  methods: {
    getAreaInfo: function() {
      var areaInfo = this.$store.getters.getArea;
      if (this.routeDefine == "fujian") this.modularshow = 2; //判断展示类型
      if (this.routeDefine == "guizhou") this.modularshow = 3; //判断展示类型
      if (areaInfo && areaInfo.enname && areaInfo.enname == this.routeDefine) {
        this.areaid = areaInfo.areaid;
        this.areaName = areaInfo.cnname;
        // this.getdate();
        this.getIndexdata(areaInfo.enname); //新闻
        this.getimgNews("1"); //banner
        this.getimgNews("3"); //专题专栏
      }
    },
    /* getdate() {
      let params = { areaid: this.areaid };
      if (this.$store.getters.getArea.industrycode)
        params.areaid = parseInt(this.$store.getters.getArea.industrycode);
      //查询新闻
      this.utilscommit.request(
        "nvsi_getIndexsNewsList",
        params,
        this.homeindexBack
      );
    }, */
    getIndexdata(enName) {
      //新版获取首页新闻
      let params = { sitename: enName };
      this.utilscommit.requestapi("getSiteIndexLayout", params, this.newsBack);
    },
    newsBack(data) {
      if (data.code == 0 && data.data && data.data.data) {
        let list = data.data.data;
        list.forEach(item => {
          if (item.componentname == "swiper") {
            //轮播图
            this.lbtNewList = item.news.newslist; //轮播图
            if (this.lbtNewList.length > 0)
              this.$nextTick(function() {
                $("#slideBox").slide({
                  titCell: ".hd ul",
                  mainCell: ".bd ul",
                  autoPage: true,
                  effect: "left",
                  autoPlay: true,
                  delayTime: 500, //切换速度500
                  interTime: 3000, // 3000, //每次切换间隔时间
                  pnLoop: true //前后循环按钮
                });
              });
          }
        });
        this.modularName = list;
        if (this.modularshow != 1) {
          //福建贵州站点
          this.firstModular = list[0].news;
        }
      }
    },
    getimgNews(type) {
      //专题专栏+banner
      let _this = this;
      this.utilscommit.requestapi(
        "listSpecialColumn",
        {
          type: type,
          albx6209: this.areaid
        },
        function(data) {
          if (data && data.code == 0) {
            if (type == 1) _this.hotImg = data.data[0];
            if (type == 3) {
              _this.ztzlNewList = data.data;
              if (_this.modularshow == 1) {
                _this.$nextTick(function() {
                  $(".picScroll-left").slide({
                    titCell: ".hd ul",
                    mainCell: ".bd ul",
                    autoPage: true,
                    effect: "left", //"leftLoop",
                    autoPlay: true,
                    delayTime: 500, //切换速度500
                    interTime: 3000, //3000, //每次切换间隔时间
                    vis: 4,
                    trigger: "click",
                    pnLoop: true //前后循环按钮
                  });
                });
              } else if (_this.modularshow == 2) {
                //福建
                _this.$nextTick(function() {
                  $(".hb-tips_Box").slide({
                    titCell: ".hd ul",
                    mainCell: ".bd ul",
                    autoPage: true,
                    effect: "topMarquee",
                    autoPlay: true,
                    delayTime: 500, //切换速度500
                    interTime: 300, // 3000, //每次切换间隔时间
                    pnLoop: true //前后循环按钮
                  });
                });
              }
            }
          }
        }
      );
    },
    /* homeindexBack(data) {
      if (data && data.data) {
        //获取页面模块所有新闻
        let newslist = data.data;
        if (newslist.zeromodel && newslist.zeromodel.childlist)
          this.zeromodel = newslist.zeromodel.childlist; //模块一的子栏目
        if (newslist.hottitle && newslist.hottitle[0])
          this.hotTitle = newslist.hottitle[0]; //标题置顶
        if (newslist.lbtnewlist) {
          this.lbtNewList = newslist.lbtnewlist; //轮播图
          if (this.lbtNewList.length > 0)
            this.$nextTick(function() {
              $("#slideBox").slide({
                titCell: ".hd ul",
                mainCell: ".bd ul",
                autoPage: true,
                effect: "left",
                autoPlay: true,
                delayTime: 500, //切换速度500
                interTime: 3000, // 3000, //每次切换间隔时间
                pnLoop: true //前后循环按钮
              });
            });
        }
        // if(newslist.sixmodel)this.sixmodel=newslist.sixmodel;//模块六
        if (newslist.hotimg && newslist.hotimg[0])
          this.hotImg = newslist.hotimg[0]; //图片置顶
        if (newslist.ztzlnewlist) {
          this.ztzlNewList = newslist.ztzlnewlist; //普通专题
          if (this.ztzlNewList.length > 0) {
            if (this.modularshow == 1) {
              this.$nextTick(function() {
                $(".picScroll-left").slide({
                  titCell: ".hd ul",
                  mainCell: ".bd ul",
                  autoPage: true,
                  effect: "left", //"leftLoop",
                  autoPlay: true,
                  delayTime: 500, //切换速度500
                  interTime: 3000, //3000, //每次切换间隔时间
                  vis: 4,
                  trigger: "click",
                  pnLoop: true //前后循环按钮
                });
              });
            } else if (this.modularshow == 2) {
              this.$nextTick(function() {
                $(".hb-tips_Box").slide({
                  titCell: ".hd ul",
                  mainCell: ".bd ul",
                  autoPage: true,
                  effect: "topMarquee",
                  autoPlay: true,
                  delayTime: 500, //切换速度500
                  interTime: 300, // 3000, //每次切换间隔时间
                  pnLoop: true //前后循环按钮
                });
              });
            }
          }
        }
        if (newslist.modularlist && newslist.modularlist.length > 0) {
          //模块新闻
          let modularName = newslist.modularlist;
          let modulars = [];
          modularName.forEach(element => {
            if (element.albx6016 == 1) {
              this.firstModular = element;
              this.zldtListId = 1; //模块一
            }
            if (element.albx6016 == 2) this.tzggListId = 1; //模块二
            if (element.albx6016 == 5 && element.zyfclist) {
              //特殊栏目，取总站模块五中第一个子栏目
              element = element.zyfclist[0];
              element.albx6016 = 5;
            }
            modulars.push(element);
          });
          this.modularName = modulars;
        }
        //贵州站统计模块
        if (newslist.staticmoder) {
          this.staticmoder = newslist.staticmoder;
        }
        if (newslist.gzdetailstatistics) {
          this.gzdetailstatistics = newslist.gzdetailstatistics;
        }
        if (newslist.gzgrorank) {
          this.gzgrorank = newslist.gzgrorank;
        }
        if (newslist.gzvolrank) {
          this.gzvolrank = newslist.gzvolrank;
          this.rankList = newslist.gzvolrank;
        }
      }
    }, */
    toUrl(names) {
      if (names.isopen == 0) {
        this.$swal("暂未开放", { buttons: "确定" });
      } else {
        names = names.router;
        let params = { define: this.routeDefine };
        if (names == "login") params.type = 1; //管理部门登录
        window.open(
          this.$router.resolve({ name: names, params: params }).href,
          "_blank"
        );
      }
    },
    // userInfoBack(result) {//返回用户信息
    //   if(result.data)this.userInfo = result.data;
    // },
    getNewsInfoMore(el) {
      window.open(
        Vue.$router.resolve({
          name: "sitenewsInfo",
          params: { define: this.routeDefine, id: el.id }
        }).href
      );
    },
    toNewsMore: function(el) {
      window.open(
        this.$router.resolve({
          name: "sitenews",
          params: {
            define: this.$route.params.define,
            name: el.name
          }
        }).href
      );
    },
    getLbtSpecial(e) {
      //专题专栏轮播图-事件委托
      let el = e.target;
      let index = el.parentNode.parentNode.parentNode.getAttribute(
        "data-index"
      );
      if (el.localName != "img") index = el.getAttribute("data-index");
      this.getSpecial(this.ztzlNewList[index]);
    },
    getSpecial: function(el) {
      //专题专栏详情页
      window.open(el.albx6206);
    },
    toLogin: function(type) {
      if (
        this.routeDefine == "beijing" &&
        window.location.host != "wuhan.yxybb.com"
      ) {
        this.common.toBjSite();
      } else {
        //志愿者说明--跳转到使用指南   1=管理部门登录 ，2=志愿者，3=队伍
        window.open(
          this.$router.resolve({
            name: "login",
            params: { define: this.routeDefine, type: type }
          }).href,
          "_blank"
        );
      }
    },
    toOtherPage(name, type) {
      //页面跳转  name-跳转的路由名称   type-有值时税收站点无法跳转
      if (
        this.routeDefine == "beijing" &&
        window.location.host != "wuhan.yxybb.com"
      ) {
        this.common.toBjSite();
      } else if (type == 1 && this.$store.getters.getArea.industrycode) {
        //特殊站点
        this.$swal("暂未开放", { buttons: "确定" });
      } else {
        window.open(
          this.$router.resolve({
            name: name,
            params: { define: this.routeDefine }
          }).href,
          "_blank"
        );
      }
    },
    toOther(name, value) {
      //页面跳转  name-跳转的路由名称
      if (
        this.routeDefine == "beijing" &&
        window.location.host != "wuhan.yxybb.com"
      ) {
        this.common.toBjSite();
      } else if (!this.userInfo || (this.userInfo && !this.userInfo.id)) {
        this.$swal("未登录不能" + value + "，是否前去登录？", {
          buttons: ["取消", "确定"]
        }).then(function(value) {
          if (value) {
            Vue.$router.push({
              name: "login",
              params: { define: Vue.$route.params.define, type: 2 }
            });
          }
        });
      } else if (name) {
        if (this.userInfo.albp0087 == "1") {
          //志愿者
          window.open(
            this.$router.resolve({
              name: name,
              params: { define: this.routeDefine }
            }).href
          );
        } else {
          this.$swal("您不是志愿者，无法" + value, { buttons: "确定" });
        }
      } else {
        //进入团体工作台
        if (this.userInfo.albp0087 == "1") {
          //志愿者或管理人员
          this.$swal("您不是团体用户，无法" + value, { buttons: "确定" });
        } else {
          const path = this.common.getCookie("mgpath");
          if (path) window.open(path);
        }
      }
    },
    imgError(el) {
      el.target.src = this.imgmtbd;
    },
    toCloseTips() {
      //关闭页面试运行弹出层
      this.common.addCookie("isshow", "true", 1000);
      this.isshow = "true";
    },
    isshow_setTimes: function() {
      //设置超时
      if (this.isshow_times > 0) {
        this.isshow_times--;
        let _this = this;
        setTimeout(function() {
          _this.isshow_setTimes();
        }, 1000);
      }
    },
    tabsActive(tab) {
      this.showActive = tab;
      if (tab == 1) {
        this.rankList = this.gzvolrank;
      } else if (tab == 2) {
        this.rankList = this.gzgrorank;
      }
    },
    toStaticmoderList() {
      //贵州站统计模块列表跳转
      sessionStorage.setItem(
        "rankList",
        JSON.stringify(this.gzdetailstatistics)
      );
      window.open(
        Vue.$router.resolve({
          name: "rankList",
          params: { define: Vue.routeDefine }
        }).href
      );
    },
    toDetail(item) {
      //贵州站志愿排行跳转
      if (this.showActive == 1) {
        //志愿者
        this.$utilroutes.toUserInfo(item.albp0029, item.albp0020);
      } else if (this.showActive == 2) {
        //志愿队伍
        this.$utilroutes.toGroupInfo(item.id, item.albe0012);
      }
    }
  }
};
</script>

<style scoped>
.btn-1 {
  cursor: pointer;
}
.btn-1 img {
  height: 55px;
}
.hidden {
  display: none;
}
.picScroll-left .hd {
  margin-top: 0;
  top: 30%;
}
.bd .tempWrap {
  height: 126px !important;
}
.swiper-container1 {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.swiper_slide {
  margin-left: 0;
}
.swiper_slide .swiper-slide {
  width: 253px !important;
}

.js-right-fixed {
  position: fixed;
  right: 0;
  top: 50%;
  margin-top: -184px;
  z-index: 100;
  width: 150px;
  text-align: center;
  height: 368px;
}
.js-right-fixed_bottom {
  margin-top: 65px;
  border-top-left-radius: 99px;
  border-bottom-left-radius: 99px;
  background: #ed3c3c
    url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAiCAYAAABIiGl0AAAABHNCSVQICAgIfAhkiAAAAeZJREFUWIW9l9t1wjAMhiUmyAhsULpBOkHZoHSCsgEZgU5ANqAbNBuQDegG0Am+Plg+uG5uBlOdw0N80WfLv2QjkmDAHNgBRy52AN6AIsVXCnTDsJ2ARW7ocgQawvPtPArtmK1zAP2ZptgJeLkFujEn19qRlDMHCmB/AzC21VTwZ0boNDiwvQMUOlJNA+hcRI6TzyTdWlV99B+zoKO6I1REZAGU/kNF/mW33hpVfRK57Hj5D1ARkRKrbB5cDgwWEfkWkddc8BD8MDK4UtU6E/yi7pFUaMJZuAvjfENqVVPALR23Da6GN1eCmzFwJzRaQAl8XAXG1ebY6jFozyIqXCSGjuLgJ8RlcpsCHFjIkv7jqIS/V1/WCgasusI9k6Be38MsDd/j9pmI1FHbPV6L8+i79uIKldl0Tr3BcE/gbg3hcnMLnDJDvXjXuMuod+CZTO9jE1YLtHHfH2EBtYiIqk57K/VDd4H/L1UdzhYLOYNhGZ7/YrtcAQuL4DTB4irQoW+COdzjHobPBttZwahMsIX5SIucKX3fBed3tWtNOIugv7BFxak6GV7bqsuovTDYOl4YrmYfroYGjtZ2TjsLa1/4ny1CZyDPU8p2WFlYwf09+bSfLw5eUJOElFynzXGc562qnlP8/AAgOjUazRtRMgAAAABJRU5ErkJggg==)
    no-repeat 24px center;
  padding: 11px 16px 11px 70px;
}
.js-right-fixed_bottom span {
  display: inline-block;
  width: 56px;
  font-size: 14px;
  color: #fff;
}
/* 固定版本 */
.pop-notice {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: url(../assets/img/showtip_bg.png) no-repeat center center;
  width: 730px;
  /* height: 520px; */
  background-size: 100% 100%;
  font-size: 16px;
  color: #fff;
  outline: 1000px solid rgba(0, 0, 0, 0.5);
  padding: 30px 50px;
  box-sizing: border-box;
  z-index: 1000;
}
.pop-notice h2 {
  text-align: center;
  margin: 0 0 20px 0;
  padding-bottom: 20px;
  border-bottom: 1px solid #fff;
}
.pop-notice p {
  line-height: 1.6;
  text-indent: 2em;
  margin: 0 0 20px 0;
}
.pop-notice a {
  display: inline-block;
  height: 40px;
  line-height: 40px;
  background: rgba(255, 255, 255, 0.85);
  min-width: 120px;
  text-align: center;
  padding: 0 20px;
  box-sizing: border-box;
  border-radius: 20px;
  text-decoration: none;
  font-size: 16px;
  color: #e64845;
  cursor: pointer;
}
.pop-notice .close {
  margin: 0;
  position: absolute;
  top: 20px;
  right: 20px;
  width: 20px;
  height: 20px;
  background: url(../assets/img/showtip_close.png) no-repeat center center;
  cursor: pointer;
}

/* 福建站点样式 */
.hb-tips {
  margin-top: 40px;
  height: 40px;
  padding: 0 16px 0 72px;
  box-sizing: border-box;
  background: url(../assets/img/bg1.png) no-repeat left top/100% 100%;
  position: relative;
  overflow: hidden;
}

.hb-tips p {
  font-size: 14px;
  color: #333;
  margin: 0;
  line-height: 40px;
  cursor: pointer;
}

.hb-tips span {
  font-size: 16px;
  color: #999;
  /* position: absolute; */
  right: 16px;
  /* top: 50%; */
  float: right;
  margin-top: -20px;
  transform: translateY(-50%);
}

.hb-list {
  margin: 30px -13.5px 0;
  padding: 0;
  list-style: none;
  font-size: 0;
}

.hb-list li {
  width: 25%;
  padding: 0 13.5px;
  box-sizing: border-box;
  display: inline-block;
}

.hb-list-panel {
  margin: 0;
  width: 100%;
  padding: 22px 0;
  border: 1px solid #dcdcdc;
  background: #fff;
  cursor: pointer;
  text-align: center;
  font-size: 0;
  transition: 0.3s;
}

.hb-list-panel:hover {
  border: 1px solid #ff0002;
}

.hb-list li img {
  width: 58px;
  display: inline-block;
  vertical-align: middle;
}

.hb-list-info {
  margin-left: 12px;
  display: inline-block;
  vertical-align: middle;
  text-align: left;
}

.hb-list-info h3 {
  margin: 0;
  font-size: 20px;
  color: #333;
}

.hb-list-info p {
  margin: 0;
  font-size: 12px;
  color: #999;
  margin-top: 5px;
}

.hb-nav-tab {
  font-size: 0;
  position: relative;
  display: inline-block;
  vertical-align: middle;
  margin-left: 46px;
  width: 85%;
}

.hb-nav-tab::after {
  display: inline-block;
  content: "";
  width: 100%;
  height: 1px;
  border-bottom: 1px dashed rgba(160, 160, 160, 0.5);
  box-sizing: border-box;
  position: absolute;
  left: 0;
  bottom: 0;
}

.hb-nav-tab a {
  text-decoration: none;
  font-size: 14px;
  color: #999;
  display: inline-block;
  padding: 13px 0 7px;
  margin-right: 25px;
  transition: 0.3s;
  position: relative;
}

.hb-nav-tab a.active {
  color: #e60012;
}

.hb-nav-tab a.active::after {
  display: inline-block;
  content: "";
  width: 100%;
  height: 2px;
  background: #e60012;
  position: absolute;
  left: 0;
  bottom: 0;
}

.hb-team-list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.hb-team-list li {
  font-size: 0;
  padding: 20px 0;
  margin: 0;
  position: relative;
  box-sizing: border-box;
}

.hb-team-list li:first-child {
  padding-top: 0;
}

.hb-team-list li:last-child {
  padding-bottom: 0;
}

.hb-team-list li::after {
  display: inline-block;
  content: "";
  width: 100%;
  height: 1px;
  box-sizing: border-box;
  border-bottom: 1px dashed #a0a0a0;
  position: absolute;
  left: 0;
  bottom: 0;
}

.hb-team-list li:last-child::after {
  display: none;
}

.hb-team-list li img {
  display: inline-block;
  width: 25%;
  vertical-align: top;
  border: none;
}

.hb-team-list li .hb-team-list-info {
  width: 75%;
  display: inline-block;
  vertical-align: top;
  padding-left: 12px;
  box-sizing: border-box;
}

.hb-team-list li .hb-team-list-info h3 {
  font-size: 16px;
  color: #333;
  font-weight: bold;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin: 0;
}

.hb-team-list li .hb-team-list-info p {
  font-size: 14px;
  color: #999;
  line-height: 24px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
  text-indent: 2em;
  margin-top: 6px;
}

.hb-team-list li .hb-team-list-info p a {
  text-decoration: none;
  color: #cb0000;
}

.hb-team-list li:nth-child(2) {
  padding-bottom: 0;
}
.hb-team-list li:nth-child(2)::after {
  border-bottom: none;
}

.hb-description-list {
  list-style: none;
  margin: -4px;
  padding: 0;
  font-size: 0;
}

.hb-description-list li {
  display: inline-block;
  width: 25%;
  padding: 4px;
  box-sizing: border-box;
}

.hb-description-panel {
  position: relative;
}

.hb-description-panel img {
  width: 100%;
  /* height: auto; */
  height: 138.83px;
  vertical-align: top;
}

.hb-description-panel p {
  background: rgba(0, 0, 0, 0.6);
  width: 100%;
  height: 24px;
  margin: 0;
  font-size: 12px;
  color: #fff;
  line-height: 24px;
  padding: 0 10px;
  box-sizing: border-box;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  position: absolute;
  left: 0;
  bottom: 0;
}
.img-w {
  width: 100%;
}
.hb-title {
  font-size: 0;
  margin-bottom: 5px;
}

.hb-title > div span {
  display: inline-block;
  vertical-align: middle;
  width: 38px;
  height: 18px;
  background: rgba(225, 41, 41, 1);
  font-size: 12px;
  color: #fff;
  line-height: 18px;
  text-align: center;
}

.hb-title > div h2 {
  font-size: 20px;
  color: rgba(225, 41, 41, 1);
  margin: 0;
  margin-left: 10px;
  display: inline-block;
  vertical-align: middle;
}

.hb-title .hb-title-info {
  margin: 0;
  margin-top: 6px;
  padding: 15px 13px;
  background: #fafafa;
  font-size: 16px;
  color: #333;
  line-height: 28px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.hb-title .hb-title-info span {
  color: #cb0000;
  cursor: pointer;
}
.pop_codeimg {
  position: relative;
}
.pop_codeimg img {
  position: absolute;
  top: -60px;
  left: 375px;
  width: 150px;
}
.js_tipspop {
  position: fixed;
  left: 0px;
  top: 0px;
  cursor: pointer;
  background: url(../assets/img/showtip_bg.png) no-repeat center center;
  font-size: 16px;
  color: #fff;
  padding: 25px 30px;
  box-sizing: border-box;
  z-index: 9999;
  width: 545px;
  text-align: justify;
  opacity: 0.9;
  line-height: 1.5;
}
.js_tipspop .close {
  margin: 0;
  position: absolute;
  top: 5px;
  right: 10px;
  width: 20px;
  height: 20px;
  background: url(../assets/img/showtip_close.png) no-repeat center center;
  cursor: pointer;
}
</style>
