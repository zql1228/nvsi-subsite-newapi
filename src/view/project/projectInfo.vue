<template>
  <div id="newsbody">
    <!--中间部分-->
    <div class="main bannerimg">
      <div class="mid">
        <ul class="row w">
          <li class="col">
            <div class="router">
              <span>当前位置：</span>
              <a href="javascript:void(0);">
                <router-link
                  tag="a"
                  :to="{ name: 'home', params: { define: routeDefine } }"
                  >首页</router-link
                >
              </a>
              <a href="javascript:void(0);">
                <router-link
                  tag="a"
                  :to="{ name: 'project', params: { define: routeDefine } }"
                  >志愿项目</router-link
                >
              </a>
              <a href="javascript:void(0);">志愿项目详情</a>
            </div>
          </li>
        </ul>
        <div class="section">
          <div class="row w">
            <div class="col v-t" style="padding-right: 50px">
              <div class="row w">
                <div class="col v-t" style="width: 38%">
                  <img
                    :src="projectInfo.fileid"
                    @error="imgError"
                    style="width: 260px; height: 170px"
                    alt=""
                    v-if="projectInfo.fileid"
                  />
                  <img
                    :src="projectInfo.defaultImg"
                    style="width: 260px; height: 170px"
                    alt=""
                    v-else-if="projectInfo.defaultImg"
                  />
                  <img
                    src="../../assets/img/i3.png"
                    style="width: 260px; height: 170px"
                    alt=""
                    v-else
                  />
                </div>
                <div class="col v-t">
                  <h2 class="h2">
                    {{ projectInfo.albx0002 }}
                    <span
                      style="width: 88px; padding: 0"
                      v-text="
                        (projectInfo.albx0072 == 3 && '待启动') ||
                          (projectInfo.albx0072 == 4 && '运行中') ||
                          ((projectInfo.albx0072 == 5 ||
                            projectInfo.albx0072 == 6) &&
                            '已结项') ||
                          ''
                      "
                      v-bind:class="
                        (projectInfo.albx0072 == 2 &&
                          'button button-small warning round') ||
                          (projectInfo.albx0072 == 3 &&
                            'button button-small success round') ||
                          ((projectInfo.albx0072 == 5 ||
                            projectInfo.albx0072 == 4) &&
                            'button button-small round') ||
                          ((projectInfo.albx0072 == 7 ||
                            projectInfo.albx0072 == 6) &&
                            'button button-small info round')
                      "
                    ></span>
                  </h2>
                  <table class="table-info">
                    <colgroup>
                      <col width="21%" />
                      <col width="79%" />
                    </colgroup>
                    <tr>
                      <th>项目编号：</th>
                      <td>
                        <em v-text="projectInfo.albx0013"></em>
                      </td>
                    </tr>
                    <tr>
                      <th>服务类别：</th>
                      <td>
                        <span
                          v-for="item in projectInfo.albx0009l"
                          class="button outline"
                          :key="item.id"
                          >{{ item }}</span
                        >
                      </td>
                    </tr>
                    <tr>
                      <th>项目分享到：</th>
                      <td>
                        <a href="javascript:void(0);" @click="toWB">
                          <img src="../../assets/img/weibo-2.png" alt="" />
                        </a>
                        <a href="javascript:void(0);" @click="showtype = 1">
                          <img src="../../assets/img/weixin.png" alt="" />
                        </a>
                        <a href="javascript:void(0);" @click="showtype = 2">
                          <img src="../../assets/img/qq.png" alt="" />
                        </a>
                      </td>
                    </tr>
                  </table>
                </div>
              </div>
              <div class="arrow-box">
                <table class="table-info">
                  <colgroup>
                    <col width="13%" />
                    <col width="37%" />
                    <col width="15%" />
                    <col width="35%" />
                  </colgroup>
                  <tr>
                    <th>项目地点：</th>
                    <td>{{ projectInfo.albx0003 }}</td>
                    <th>发布日期：</th>
                    <td>{{ projectInfo.albx0031 | ellipsisNos(10) }}</td>
                  </tr>
                  <tr>
                    <th>项目日期：</th>
                    <td>
                      {{ projectInfo.albx0004 | ellipsisNos(10) }} 至
                      {{ projectInfo.albx0005 | ellipsisNos(10) }}
                    </td>
                    <!-- <th>招募日期：</th>
                    <td>
                      {{ projectInfo.albx0004 | ellipsisNos(10) }} 至
                      {{ projectInfo.albx0005 | ellipsisNos(10) }}
                    </td> -->
                    <th>服务对象：</th>
                    <td>{{ projectInfo.albx0014l }}</td>
                  </tr>
                  <tr>
                    <th>志愿者保障:</th>
                    <td>{{ projectInfo.albx0019l }}</td>
                  </tr>
                </table>

                <!-- <div style="font-weight: 400; color: #808080; padding-top: 3px">
                  服务时间描述:
                  <span style="color: #333; padding-left: 13px">{{
                    projectInfo.albx0010
                  }}</span>
                </div> -->
              </div>
              <table
                class="table-list grid"
                v-for="(item, index) in jobList"
                :key="index"
              >
                <thead>
                  <tr>
                    <th colspan="2" align="left">
                      <span class="item"
                        >岗位{{ index + 1 }}：<i :title="item.albx0072">{{
                          item.albx0072 | ellipsis(10)
                        }}</i></span
                      >
                      <span class="item"
                        >计划招募：<i>{{ item.albx0077 }}</i></span
                      >
                      <span class="item"
                        >已招募：<i>{{ item.albx0079 }}</i></span
                      >
                    </th>
                    <!-- 项目是否公开招募和招募中 -->
                    <th align="right">
                      <!-- 不在招募时间范围内 -->
                      <div v-if="!timeState">
                        <a
                          v-if="currentDate < new Date(projectInfo.albx0006)"
                          href="javascript:void(0);"
                          class="button"
                          style="background: #9e9b9b; cursor: default"
                          >招募未开始</a
                        >
                        <a
                          v-if="currentDate > new Date(projectInfo.albx0007)"
                          href="javascript:void(0);"
                          class="button"
                          style="background: #9e9b9b; cursor: default"
                          >招募已结束</a
                        >
                      </div>
                      <!-- 项目未开启招募 -->
                      <div v-else-if="!isStarted">
                        <a
                          href="javascript:void(0);"
                          class="button"
                          style="background: #9e9b9b; cursor: default"
                          >招募未启动</a
                        >
                      </div>
                      <!-- 可以正常申请加入项目 -->
                      <div v-else>
                        <!-- 当前项目中是否存在有关系的岗位 -->
                        <div v-if="jobRelation.gwid">
                          <div v-if="item.id == jobRelation.gwid">
                            <a
                              v-if="jobRelation.albx0085 == 1"
                              href="javascript:void(0);"
                              class="button"
                              style="cursor: default"
                              >申请中</a
                            >
                            <a
                              v-else-if="
                                jobRelation.albx0085 == 2 ||
                                  jobRelation.albx0085 == 3 ||
                                  jobRelation.albx0085 == 5 ||
                                  jobRelation.albx0085 == 6
                              "
                              href="javascript:void(0);"
                              class="button"
                              style="cursor: default"
                              >已加入</a
                            >
                            <a
                              v-else-if="jobRelation.albx0085 == 4"
                              href="javascript:void(0);"
                              class="button"
                              style="cursor: default"
                              >已被邀请</a
                            >
                            <a
                              v-else-if="jobRelation.albx0085 == 7"
                              href="javascript:void(0);"
                              class="button"
                              @click="applyProAgain(item.id)"
                              >再次申请</a
                            >
                          </div>
                          <div v-else>
                            <a
                              href="javascript:void(0);"
                              class="button"
                              style="background: #9e9b9b; cursor: default"
                              >我要报名</a
                            >
                          </div>
                        </div>
                        <!-- 没有加入过当前项目的岗位 -->
                        <div v-else>
                          <a
                            href="javascript:void(0);"
                            class="button"
                            :id="item.id"
                            style="background: #ff9400"
                            @click="
                              applyPro(
                                $event,
                                item.id,
                                item.albx0072,
                                index,
                                true
                              )
                            "
                            >我要报名</a
                          >
                        </div>
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th>岗位ID</th>
                    <th>岗位描述</th>
                    <th>岗位条件</th>
                  </tr>
                  <tr>
                    <td class="left" v-text="item.albx0073"></td>
                    <td class="left" v-text="item.albx0074"></td>
                    <td
                      class="left"
                      style="word-break: break-all; overflow: hidden"
                      v-text="item.albx0075"
                    ></td>
                  </tr>
                </tbody>
              </table>
              <div class="tabbar" style="margin: 20px 0 0 0">
                <span class="active">项目详情</span>
                <span>报名信息</span>
                <span>时长公示</span>
                <!-- <span>讨论区</span> -->
                <!-- <span>项目动态</span> -->
              </div>
              <!-- 项目信息 -->
              <div class="tabbar-down">
                <p
                  v-if="!projectInfo.albx0018"
                  style="width: 100%; text-align: center"
                >
                  <img src="../../assets/img/js-wujilu.png" />
                </p>
                <p
                  v-if="projectInfo.albx0018"
                  v-html="ecellipsiSpace(projectInfo.albx0018)"
                  style="padding: 18px; word-break: break-all"
                ></p>
              </div>
              <!-- 最新报名 -->
              <div class="tabbar-down" style="display: none">
                <table class="table-list">
                  <colgroup>
                    <col width="15%" />
                    <col width="30%" />
                    <col width="20%" />
                    <col width="20%" />
                    <!-- <col width="15%" /> -->
                  </colgroup>
                  <tbody>
                    <tr>
                      <th>姓名</th>
                      <th>岗位</th>
                      <th>服务时长</th>
                      <th>报名时间</th>
                      <!-- <th>操作</th> -->
                    </tr>
                    <tr v-if="!applyList.length">
                      <td
                        colspan="5"
                        style="text-align: center; border-bottom: 1px #f6f3f7"
                        v-show="queryStatus == 1"
                      >
                        <img src="../../assets/img/js-wujilu.png" />
                      </td>
                      <td
                        colspan="5"
                        style="text-align: center; border-bottom: 1px #f6f3f7"
                        v-show="queryStatus == 0"
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
                      </td>
                    </tr>
                    <tr v-for="el in applyList" :key="el.id">
                      <td class="left">
                        <i
                          class="c-danger pointer name_color"
                          :title="el.albp0003"
                          @click="
                            $utilroutes.toUserInfo(el.albp0005, el.albp0020)
                          "
                          >{{ el.albp0003 }}</i
                        >
                      </td>
                      <td class="left">{{ el.albx0072 }}</td>
                      <td class="left">{{ el.albx0083 | addZero }}小时</td>
                      <td class="left">{{ el.albx0056 | ellipsisNos(10) }}</td>
                      <!-- 投诉操作 -->
                      <!-- <td class="left">
                        <a
                          href="javascript:void(0);"
                          class="c-danger"
                          @click="
                            showComplain(el.albp0029, el.albp0003, el.albx0053)
                          "
                          >我要投诉</a
                        >
                      </td> -->
                    </tr>
                  </tbody>
                </table>
              </div>
              <!-- 时长公示 -->
              <div class="tabbar-down" style="display: none">
                <table class="table-list">
                  <colgroup>
                    <col width="15%" />
                    <col width="15%" />
                    <col width="65%" />
                    <!-- <col width="15%" /> -->
                  </colgroup>
                  <tbody>
                    <tr>
                      <th>姓名</th>
                      <th>服务时长</th>
                      <th>备注</th>
                      <!-- <th>操作</th> -->
                    </tr>
                    <tr v-if="!timePublicList.length">
                      <td
                        colspan="5"
                        style="text-align: center; border-bottom: 1px #f6f3f7"
                        v-show="queryStatus == 1"
                      >
                        <img src="../../assets/img/js-wujilu.png" />
                      </td>
                      <td
                        colspan="5"
                        style="text-align: center; border-bottom: 1px #f6f3f7"
                        v-show="queryStatus == 0"
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
                      </td>
                    </tr>
                    <tr v-for="el in timePublicList" :key="el.id">
                      <td class="left">
                        <i
                          class="pointer c-danger name_color"
                          :title="el.albp0003"
                          @click="
                            $utilroutes.toUserInfo(el.albp0005, el.albp0020)
                          "
                          >{{ el.albp0003 }}</i
                        >
                      </td>
                      <td class="left">{{ el.albx0172 | addZero }}小时</td>
                      <td
                        class="left"
                        style="
                          overflow: hidden;
                          white-space: nowrap;
                          text-overflow: ellipsis;
                        "
                        :title="el.albp0057"
                      >
                        {{ el.albp0057 }}
                      </td>
                      <!-- 举报操作 -->
                      <!-- <td class="left">
                        <a
                          href="javascript:void(0);"
                          class="c-danger"
                          @click="inform(el.id, el.albp0029, el.albx0172)"
                          >举报</a
                        >
                        (<span>{{ el.albx0171 || 0 }}</span
                        >)
                      </td> -->
                    </tr>
                  </tbody>
                </table>
                <!-- <TimeList
                  :projectInfo="projectInfo"
                  :groupInfo="groupInfo"
                ></TimeList> -->
              </div>
              <!-- 讨论区 -->
              <div class="tabbar-down" style="display: none">
                <div class="load">
                  <textarea
                    class="textarea"
                    rows="4"
                    placeholder="在这里畅所欲言吧～"
                    v-model="leaveContent"
                    maxlength="200"
                    style="height: 146px"
                  ></textarea>
                  <a
                    href="javascript:void(0);"
                    style="margin-top: 15px"
                    class="button"
                    @click="publish(1)"
                    >发布评论</a
                  >
                  <h2 class="subtitle subtitle-plain">最新评论</h2>
                  <p
                    v-if="!mainMessageList.length"
                    style="width: 100%; text-align: center"
                  >
                    <img src="../../assets/img/js-wujilu.png" />
                  </p>
                  <ul class="activity">
                    <li
                      class="row w"
                      v-for="el in mainMessageList"
                      :key="el.id"
                    >
                      <div class="col v-t">
                        <img
                          :src="common.changeImgsrc(el.photo)"
                          @error="imgError3"
                          alt=""
                        />
                      </div>
                      <div class="col v-t">
                        <h3 class="activity-tit">
                          <a
                            href="javascript:void(0);"
                            @click="
                              toDetailInfo(
                                el.albp0029,
                                el.albp0020,
                                el.orgid,
                                el.albe0012
                              )
                            "
                            ><em>{{ el.showname }}</em></a
                          >
                          <span>{{ el.albx4006 | ellipsisNos(19) }}</span>
                          <a
                            href="javascript:void(0);"
                            @click="
                              showReply(el.id, el.albp0029 || el.orgid, el)
                            "
                            ><em>回复</em></a
                          >
                        </h3>
                        <div class="activity-info">{{ el.albx4003 }}</div>
                        <div class="message-child">
                          <div
                            class="row w line-message"
                            v-for="el2 in el.sublist"
                            :key="el2.id"
                          >
                            <h3 class="activity-tit" style="margin-top: 10px">
                              <a
                                href="javascript:void(0);"
                                @click="
                                  toDetailInfo(
                                    el2.volnum1,
                                    el2.area1,
                                    el2.orgid1,
                                    el2.area3
                                  )
                                "
                                ><em>{{ el2.name1 || el2.name3 }}</em></a
                              >
                              <span>回复</span>
                              <a
                                href="javascript:void(0);"
                                @click="
                                  toDetailInfo(
                                    el2.volnum2,
                                    el2.area2,
                                    el2.orgid2,
                                    el2.area4
                                  )
                                "
                                ><em>{{ el2.name2 || el2.name4 }}</em></a
                              >
                              <span>{{ el2.albx4006 | ellipsisNos(19) }}</span>
                              <a
                                href="javascript:void(0);"
                                @click="
                                  showReply(
                                    el.id,
                                    el2.volnum1 || el2.orgid1,
                                    el2
                                  )
                                "
                                ><em>回复</em></a
                              >
                            </h3>
                            <div class="activity-info">{{ el2.albx4003 }}</div>
                          </div>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
              <!-- 项目动态 -->
              <div class="tabbar-down" style="display: none">
                <div class="load">
                  <textarea
                    class="textarea"
                    rows="4"
                    style="height: auto"
                    v-model="dynamicContent"
                    placeholder="项目参与人或项目发起人，快来发布项目动态吧～"
                  ></textarea>
                  <input
                    type="file"
                    ref="photofile"
                    @change="photoChanged"
                    accept="image/*"
                    hidden
                  />
                  <ul class="load-list" id="list">
                    <li
                      v-for="(el, index) in photoShowHtml.filter(obj => obj)"
                      :key="index"
                    >
                      <span class="load-wrap">
                        <img
                          :src="el.imgsrc"
                          width="80px"
                          height="80px"
                          alt=""
                        />
                      </span>
                      <a
                        href="javascript:void(0);"
                        class="load-del"
                        @click="delNowImg(el.id)"
                        ><img src="../../assets/img/del.png" alt=""
                      /></a>
                    </li>
                    <li class="load-add" id="picker" @click="photoClicked"></li>
                  </ul>
                  <a
                    href="javascript:void(0);"
                    style="margin-top: 15px"
                    class="button"
                    @click="submitDynamic"
                    >发布动态</a
                  >
                  <h2 class="subtitle subtitle-plain">最新动态</h2>
                  <p
                    v-if="!dynamicList.length"
                    style="width: 100%; text-align: center"
                  >
                    <img src="../../assets/img/js-wujilu.png" />
                  </p>
                  <ul class="activity" v-if="dynamicList.length > 0">
                    <li
                      class="row w"
                      v-for="(el, key) in dynamicList"
                      :key="key"
                    >
                      <div class="col v-t">
                        <img
                          v-if="!el.imgpath"
                          src="../../assets/img/avatar.png"
                          alt=""
                        />
                        <img
                          v-if="el.imgpath"
                          :src="common.changeImgsrc(el.imgpath)"
                          width="64px"
                          height="64px"
                          alt=""
                        />
                      </div>
                      <div class="col v-t">
                        <h3 class="activity-tit">
                          {{ el.albx0417
                          }}<span>{{ el.createtime | ellipsisNos(19) }}</span>
                        </h3>
                        <div class="activity-info" v-text="el.albx0404"></div>
                        <ul class="activity-img" v-if="el.photolist">
                          <li v-for="(els, keys) in el.photolist" :key="keys">
                            <img
                              v-if="els.imgpath"
                              :src="common.changeImgsrc(els.imgpath)"
                              width="80px"
                              height="80px"
                              alt=""
                              @click="openImg(els.imgpath)"
                            />
                          </li>
                        </ul>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
              <div
                v-if="
                  nowIndex == 1 ||
                    nowIndex == 2 ||
                    nowIndex == 3 ||
                    nowIndex == 4
                "
              >
                <paging
                  :pageCount="tolPage"
                  :rangePage="pageSize"
                  :initPage="pageNow"
                  :totals="tolCount"
                  :val="jumpPage"
                  @pageEvent="pageEvent"
                >
                </paging>
              </div>
            </div>
            <div class="col v-t" style="width: 30%">
              <h2 class="subtitle subtitle-noline" style="margin-top: -10px">
                项目发起人
              </h2>
              <div class="row w handup" style="margin: 20px 0 40px 0">
                <div class="col v-m">
                  <img
                    v-if="projectInfo.groupfileid"
                    :src="projectInfo.groupfileid"
                    @error="imgError2"
                    style="width: 93px; height: 93px"
                    alt=""
                  />
                  <img
                    v-else-if="projectInfo.grodefaultImg"
                    :src="projectInfo.grodefaultImg"
                    style="width: 93px; height: 93px"
                    alt=""
                  />
                  <img
                    v-else
                    src="../../assets/img/i1.png"
                    alt=""
                    style="width: 93px; height: 93px"
                  />
                </div>
                <div class="col v-m">
                  <h2>
                    <a
                      href="javascript:void(0);"
                      style="color: #2c5abd"
                      @click="
                        $utilroutes.toGroupInfo(
                          projectInfo.groupid,
                          projectInfo.albe0012
                        )
                      "
                      >{{ projectInfo.albe0002 }}</a
                    >
                  </h2>
                  <p v-if="projectInfo.albe0013">
                    地址：{{ projectInfo.albe0013 }}
                  </p>
                </div>
              </div>
              <h2 class="subtitle subtitle-noline subtitle-margin">
                项目联系人
              </h2>
              <div class="link-info">
                <h2 v-if="projectInfo.albx0025">{{ projectInfo.albx0025 }}</h2>
                <p v-if="projectInfo.albx0027 == 1 && projectInfo.albx0026">
                  手机：{{ projectInfo.albx0026 }}
                </p>
                <p v-if="projectInfo.albx0039 == 1 && projectInfo.albx0028">
                  电话：{{ projectInfo.albx0028 }}
                </p>
                <p v-if="projectInfo.albx0030 == 1">
                  邮箱：{{ projectInfo.albx0030 }}
                </p>
                <!-- <p class="row w">
                  <span class="col v-m" style="padding-right: 10px">
                    <a
                      href="javascript:void(0);"
                      class="button outline"
                      @click="sendMessage(groupInfo.id, groupInfo.albe0037)"
                      >给他发站内信</a
                    >
                  </span>
                  <span class="col v-m" style="padding-left: 10px">
                    <a
                      href="javascript:void(0);"
                      class="button outline"
                      @click="showComplain(projectid, projectInfo.albx0002)"
                      >我要投诉</a
                    >
                  </span>
                </p> -->
              </div>
              <h2 class="subtitle subtitle-noline subtitle-margin">项目地址</h2>
              <div class="link-info">
                <p :if="projectInfo.albx0003">{{ projectInfo.albx0003 }}</p>
                <p class="row w">
                  <span class="col v-m" style="padding-right: 10px">
                    <a
                      href="javascript:void(0);"
                      class="button outline"
                      @click="showMapp"
                      >查看地图</a
                    >
                  </span>
                  <span class="col v-m" style="padding-left: 10px"> </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!--地图-->
    <div class="mask map">
      <div class="mask-info" style="max-height: 600px">
        <div class="mask-header row w">
          <div class="col v-m">
            <h2>地图</h2>
          </div>
          <div class="col v-m t-r">
            <a href="javascript:void(0);" class="mask-close" @click="closeMapp"
              ><img src="../../assets/img/close.png" alt=""
            /></a>
          </div>
        </div>
        <div>
          <div id="map" style="height: 450px"></div>
        </div>
      </div>
    </div>

    <!-- 免审密码 -->
    <div class="mask password">
      <div
        class="mask-info"
        style="width: 700px; max-height: 705px; margin-left: -350px"
      >
        <div class="mask-header row w">
          <div class="col v-m">
            <h2>免审密码</h2>
          </div>
          <div class="col v-m t-r">
            <a
              href="javascript:void(0);"
              class="mask-close"
              @click="closePassword"
              ><img src="../../assets/img/close.png" alt=""
            /></a>
          </div>
        </div>
        <div style="padding: 20px 50px 0 50px">
          <div class="form">
            <p class="form-label"><em>*</em>请输入免审密码：</p>
            <input
              type="text"
              @blur="passwordCheck"
              v-model="password"
              maxlength="20"
              placeholder="请输入免审密码"
            />
          </div>
          <span
            class="form-error"
            style="padding-left: 20px"
            id="passwordTips"
          ></span>
        </div>
        <div class="form t-c">
          <a href="javascript:void(0);" class="button" @click="submitPassword"
            >提交</a
          >
        </div>
      </div>
    </div>

    <!-- 时长举报 -->
    <div class="mask inform">
      <div
        class="mask-info"
        style="width: 700px; max-height: 705px; margin-left: -350px"
      >
        <div class="mask-header row w">
          <div class="col v-m">
            <h2>服务时长举报</h2>
          </div>
          <div class="col v-m t-r">
            <a
              href="javascript:void(0);"
              class="mask-close"
              @click="closeInform"
              ><img src="../../assets/img/close.png" alt=""
            /></a>
          </div>
        </div>
        <div style="padding: 20px 50px 0 50px">
          <div class="form">
            <p class="form-label"><em>*</em>举报理由：</p>
            <textarea
              rows="2"
              v-model="reason"
              @blur="reasonCheck"
              maxlength="100"
              style="height: 70px"
            ></textarea>
          </div>
          <span
            class="form-error"
            style="padding-left: 20px"
            id="reasonTips"
          ></span>
        </div>
        <div class="form t-c">
          <a href="javascript:void(0);" class="button" @click="informSubmit"
            >确定</a
          >
        </div>
      </div>
    </div>

    <!-- 志愿者投诉 -->
    <div class="mask complain">
      <div
        class="mask-info"
        style="width: 700px; max-height: 705px; margin-left: -350px; top: 50%"
      >
        <div class="mask-header row w">
          <div class="col v-m">
            <h2>我要投诉</h2>
          </div>
          <div class="col v-m t-r">
            <a
              href="javascript:void(0);"
              @click="closeComplain"
              class="mask-close"
              ><img src="../../assets/img/close.png" alt=""
            /></a>
          </div>
        </div>
        <ul class="grid" style="margin-top: 10px">
          <li class="grid-item g-12">
            <div class="form">
              <p class="form-label"><em>*</em>被投诉对象：</p>
              <input
                :value="objname"
                readonly
                style="height: 42px !important;"
              />
            </div>
            <span
              class="form-error"
              style="padding: 5px 0 0 20px"
              id="objTips"
              placeholder="请输入被投诉对象"
            ></span>
          </li>
          <li class="grid-item g-12">
            <div class="form">
              <p class="form-label"><em>*</em>投诉人姓名：</p>
              <input
                type="text"
                v-model="name"
                @blur="nameCheck"
                maxlength="20"
                placeholder="请输入投诉人姓名"
              />
            </div>
            <span
              class="form-error"
              style="padding: 5px 0 0 20px; height: 17px; color: red"
              id="nameTips"
            ></span>
          </li>
          <li class="grid-item g-24">
            <div class="form">
              <p class="form-label"><em>*</em>投诉内容：</p>
              <textarea
                rows="2"
                v-model="content"
                @blur="contentCheck"
                maxlength="100"
                class="form_textarea"
                placeholder="请输入投诉内容"
              ></textarea>
            </div>
            <span
              class="form-error"
              style="padding: 5px 0 0 20px; height: 17px; color: red"
              id="contentTips"
            ></span>
          </li>
          <li class="grid-item g-12">
            <div class="form">
              <p class="form-label"><em>*</em>投诉人身份证号码：</p>
              <input
                type="text"
                v-model="card"
                @blur="cardCheck"
                maxlength="18"
                placeholder="请输入投诉人身份证号码"
              />
            </div>
            <span
              class="form-error"
              style="padding: 5px 0 0 20px; height: 17px; color: red"
              id="cardTips"
            ></span>
          </li>
          <li class="grid-item g-12">
            <div class="form">
              <p class="form-label"><em>*</em>投诉人手机号码：</p>
              <input
                type="text"
                v-model="phone"
                @blur="phoneCheck"
                maxlength="11"
                placeholder="请输入投诉人手机号码"
              />
            </div>
            <span
              class="form-error"
              style="padding: 5px 0 0 20px; height: 17px; color: red"
              id="phoneTips"
            ></span>
          </li>
          <li class="grid-item g-12">
            <div class="form">
              <p class="form-label"><em>*</em>图文验证码：</p>
              <div class="row w" style="display: inline-table">
                <div class="col v-m">
                  <input
                    type="text"
                    id="inputImgCode"
                    v-model="imgcode"
                    maxlength="4"
                    @blur="imgCodeCheck"
                    placeholder="请输入图文验证码"
                  />
                </div>
                <div
                  class="col v-m pl-10"
                  style="width: 130px"
                  @click="changeImgCode"
                >
                  <img
                    id="reg_image"
                    class="button button-line"
                    style="width: 100%; padding: 1px 1px 2px 5px"
                  />
                </div>
              </div>
            </div>
            <span
              class="form-error"
              style="padding: 5px 0 0 20px; height: 17px; color: red"
              id="imgCodeTips"
            ></span>
          </li>
        </ul>
        <div class="form t-c">
          <a
            href="javascript:void(0);"
            class="button"
            style="margin-top: 5px"
            @click="onSubmit"
            >提交</a
          >
        </div>
      </div>
    </div>

    <!--图片预览窗口-->
    <div class="mask showimg">
      <div class="mask-info">
        <div class="mask-header row w">
          <div class="col v-m">
            <h2>查看图片</h2>
          </div>
          <div class="col v-m t-r">
            <a href="javascript:void(0);" @click="closeImg" class="mask-close"
              ><img src="../../assets/img/close.png" alt=""
            /></a>
          </div>
        </div>
        <div style="text-align: center">
          <div id="filesrc"></div>
        </div>
      </div>
    </div>

    <!-- 讨论区 -->
    <div class="mask reply">
      <div
        class="mask-info"
        style="width: 700px; max-height: 705px; margin-left: -350px"
      >
        <div class="mask-header row w">
          <div class="col v-m">
            <h2>回复</h2>
          </div>
          <div class="col v-m t-r">
            <a href="javascript:void(0);" class="mask-close" @click="closeReply"
              ><img src="../../assets/img/close.png" alt=""
            /></a>
          </div>
        </div>
        <textarea
          class="textarea"
          rows="4"
          placeholder="在这里畅所欲言吧～"
          v-model="leaveContent"
          maxlength="200"
          style="height: 146px"
        ></textarea>
        <a
          href="javascript:void(0);"
          style="margin-top: 15px"
          class="button"
          @click="publish(0)"
          >发布评论</a
        >
      </div>
    </div>
    <!-- 微信分享 -->
    <share :showtype="showtype" type="pro"></share>
  </div>
</template>

<script>
const paging = () => import("@/components/page/paginationRed.vue"); //分页
const share = () => import("@/components/share.vue"); //分享
const TimeList = () => import("@/components/ProjectInfo/TimeList.vue");
const MemberList = () => import("@/components/ProjectInfo/MemberList.vue");
import i3 from "../../assets/img/i3.png";
import i1 from "../../assets/img/i1.png";
import avatar from "../../assets/img/avatar.png";

export default {
  name: "newsbody",
  components: {
    paging,
    share,
    TimeList,
    MemberList
  },
  inject: ["reload"],
  data() {
    return {
      routeDefine: this.$route.params.define,
      areaid: this.$route.params.data2,
      projectid: this.$route.params.data1,
      projectInfo: {}, //项目信息
      userInfo: {}, //用户信息
      basicInfo: {}, //团体信息
      password: "", //免审密码
      applyButton2: false, //招募中，我要报名
      applyButton3: false, //招募中，已申请
      applyButton4: false, //招募中，已加入
      applyButton5: false, //招募中，已被邀请
      applyButton6: false, //招募中，已拒绝
      groupInfo: {}, //团体信息
      jobList: [], //岗位信息
      applyJobId: "", //岗位id
      applyJobName: "", //加入的岗位名称
      applyList: {}, //最新报名列表
      timePublicList: {}, //时长公示列表
      nowIndex: 0,
      // 举报时长
      reason: "", //举报理由
      timeId: "", //举报时长id
      albx0347: "", //被举报志愿者编号
      albx0340: "", //被举报的时长
      // 投诉
      objname: "", //被投诉对象名称
      obj: "", //被投诉对象id
      content: "", //投诉内容
      name: "", //投诉人姓名
      card: "", //投诉人身份证
      phone: "", //投诉人手机
      imgcode: "", //图文验证码
      code: "", //手机验证码
      codeButton: "获取验证码",
      countdown: 60,
      imgCodeFlag: false,
      //讨论区
      leaveContent: "", //评论内容
      mainMessageList: [], //主评论列表
      mainid: "", //回复的主评论id
      bemsgid: "", //回复的评论人id
      messageinfo: "", //被留言者信息
      //动态区
      dynamicContent: "", //动态内容
      photoNum: 0, //图片个数
      photoSumNum: 0, //图片个数
      photoShowHtml: [], //需要展示的图片
      dynamicPhoto: [], //动态图片(共九张)
      dynamicPhotoFile: [], //动态图片文件
      dynamicList: [], //动态列表
      //分页参数
      tolCount: 0, //总条数
      tolPage: 0, //总页数
      pageSize: 8, //每页条数
      pageNow: 1, //当前页
      jumpPage: 1,
      //分享参数
      showtype: 0,
      imgkey: "", //图文验证码的key
      //点击加入按钮效果
      isClick: true, //加入方式  true=可以加入，false=不可加入
      showButton: false, //按钮是否显示
      buttonIndex: "", //点击按钮在数组中的位置
      jobRelation: {}, // 用户和项目的关系
      reporterNum: "", // 被投诉志愿者编号(报名信息部分)
      currentDate: new Date(), // 当前时间
      timeState: false, // 当前时间是否在项目招募范围内
      isStarted: false, // 项目是否开启招募
      queryStatus: 0 // 查询状态，0->查询中，1->查询结束
    };
  },
  created() {
    window.Vues = this; //主体vue实例挂载
    this.getdata();
  },

  mounted() {
    this.setData();
    this.changeImgCode();
    window.applyPro = this.applyPro;
  },
  methods: {
    // 打开图片预览
    openImg(a) {
      $("#filesrc").html(
        `<img src=${this.common.changeImgsrc(a)} alt="" width="735px">`
      );
      $(".mask.showimg").addClass("active");
    },
    // 关闭图片预览
    closeImg() {
      $(".mask.showimg").removeClass("active");
      $(".mask.holdIdCard").removeClass("active");
    },
    // tab栏添加点击事件
    setData() {
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
    // 查询项目详情
    getdata() {
      this.utilscommit.requestapi(
        "getProjectInfoFortisWeb",
        { albx0021: this.areaid, proId: this.projectid },
        this.callback_projectinfo
      );
      // 获取用户基本信息
      this.callback_projectinfoUser();
    },
    // 获取用户基本信息
    callback_projectinfoUser() {
      // 判断当前用户是否登录
      if (this.$store.getters.getUser) {
        this.userInfo = this.$store.getters.getUser;

        // 获取用户基本信息
        this.utilscommit.requestapi(
          "getVolunteerInfoFortisWeb",
          { cardno: this.userInfo.albp0005 },
          this.callback_projectinfoBus
        );
      } else {
        this.userInfo = null;
      }
    },
    // 获取用户基本信息回调
    callback_projectinfoBus(result) {
      result.code != 0 ? "" : (this.basicInfo = result.data);
    },
    // 查询项目详情回调
    callback_projectinfo(result) {
      // 项目详情
      if (result && result.data) {
        let list = result.data;
        //项目的默认图片
        if (list.albx0009) {
          let type = list.albx0009.split(",")[0];
          //type 为项目的服务类别第一项,静态图片只有 0001~0019 以及 0099 即parseInt(type)小于20的即可
          //type.length==4  是为了防止后台数据出现问题的情况
          if (type && type.length == 4 && parseInt(type) < 20) {
            list.defaultImg = require("../../assets/img/prodefault/" +
              type +
              ".png");
          } else {
            list.defaultImg = require("../../assets/img/prodefault/0099.png");
          }
        } else {
          list.defaultImg = require("../../assets/img/prodefault/0099.png");
        }
        //该项目的队伍默认图片
        let provinceId = list.albx0021.slice(0, 2);
        if (provinceId == "98") {
          //新疆兵团
          list.grodefaultImg = require("../../assets/img/grodefault/65.png");
        } else {
          list.grodefaultImg = require("../../assets/img/grodefault/" +
            provinceId +
            ".png");
        }
        list.albx0009l = list.albx0009l && list.albx0009l.split(",");
        this.projectInfo = list;
        // 判断当前时间是否在招募时间内
        if (
          this.currentDate >= new Date(this.projectInfo.albx0006) &&
          this.currentDate <= new Date(this.projectInfo.albx0007)
        ) {
          this.timeState = true;
          // 判断项目是否开启招募
          if (this.projectInfo.albx0073 == 14) {
            this.isStarted = true;
          }
        }

        // 新api，查询项目下岗位信息
        this.utilscommit.requestapi(
          "ProjectPostFortisWeb",
          {
            albx0021: this.areaid,
            proId: this.projectid
          },
          this.callback_projectgw
        );

        // 判断当前登录用户是不是志愿者
        //         if (
        //           !this.$store.getters.getUser ||
        //           this.$store.getters.getUser.albp0087 != 1
        //         ) {
        //           return;
        //         }

        // 获取志愿者和项目关系
        let params = {
          proId: this.projectid,
          albx0021: this.projectInfo.albx0021,
          volNum: this.userInfo && this.userInfo.albp0029
        };
        this.utilscommit.requestapi(
          "volunteerAndPostRelationShipFortisWeb",
          params,
          res => {
            if (res && res.code == 0 && res.data) {
              this.jobRelation = res.data;
            }
          }
        );
      }
    },
    // 查询项目下岗位信息回调
    callback_projectgw(result) {
      if (result && result.data) {
        this.jobList = result.data;
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
    // 展示地图
    showMapp() {
      var map = new BMap.Map("map");
      var point = new BMap.Point(116.404, 39.915);
      if (
        this.projectInfo.albx0035 &&
        this.projectInfo.albx0036 &&
        this.projectInfo.albx0035 != 0 &&
        this.projectInfo.albx0036 != 0
      )
        point = new BMap.Point(
          this.projectInfo.albx0035,
          this.projectInfo.albx0036
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
      $(".mask.map").addClass("active");
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
    // 加入项目
    applyPro(event, id, applyJobName, index) {
      this.buttonIndex = index; //记录点击按的在数组中的位置
      this.applyJobId = id;
      this.applyJobName = applyJobName;
      if (this.userInfo) {
        if (!this.isClick) {
          return;
        }
        // 判断用户是否有效
        if (this.userInfo.isdelete == 0) {
          // 是否是志愿者，是否实名认证
          if (
            this.userInfo.albp0087 == "1" &&
            this.userInfo.albp0063 &&
            this.userInfo.albp0063 == "1" &&
            this.basicInfo
          ) {
            if (this.projectInfo.albx0073 == 15) {
              // 项目是否开启招募
              return this.$swal("当前项目不对外招募", { buttons: "确定" });
            }
            // 志愿者是否填写服务区域和居住区域
            if (this.basicInfo.albp0020 && this.basicInfo.albp0028) {
              // 判断志愿者服务时长是否符合项目要求
              if (
                this.projectInfo.albx0033 &&
                this.userInfo.albp0089 * 1 < this.projectInfo.albx0033 * 1
              ) {
                return this.$swal(
                  "您的总服务时长未达到加入此项目的要求，无法加入",
                  {
                    buttons: "确定"
                  }
                );
              }
              var nowA = this.userInfo.albp0020.substring(0, 2);
              var oldA = this.areaid.substring(0, 2);
              if (nowA == oldA || this.areaid == "100000000000000000") {
                this.updateClickState(false); //按钮置灰,不可点击
                // 加入项目请求参数
                let params = {
                  volunteerid: this.userInfo.albp0029, // 志愿者id
                  areaid: this.projectInfo.albx0021, // 项目区域
                  projectid: this.projectid, // 项目id
                  postid: this.applyJobId, // 岗位id
                  volAreaId: this.userInfo.albp0020, // 志愿者区域
                  voltime: this.userInfo.albp0089 // 志愿者服务时长
                };
                if (this.projectInfo.albx0017) {
                  // 免审加入
                  $(".mask.password").addClass("active");
                } else {
                  // 正常申请
                  console.log(params);
                  this.utilscommit.requestapi(
                    "getVolOperateProjectFortisWeb",
                    params,
                    res => {
                      if (res && res.code == 0) {
                        // 申请成功
                        this.$router.go(0);
                      } else {
                        // 申请失败
                        if (res.message == "岗位信息为空") {
                          this.$swal("岗位报名失败", {
                            buttons: "确定"
                          }).then(value => {
                            this.$router.go(0);
                          });
                        } else {
                          this.$swal(res.message, { buttons: "确定" }).then(
                            value => {
                              this.$router.go(0);
                            }
                          );
                        }
                      }
                    }
                  );
                }
              } else {
                this.$swal("您当前服务区域与项目区域不匹配，无法加入！", {
                  buttons: "确定"
                });
                return false;
              }
            } else {
              //志愿者未填写服务区域或居住区域
              this.$swal("未完善基本信息不能报名，是否前去完善？", {
                buttons: ["取消", "确定"]
              }).then(function(value) {
                if (value) {
                  Vue.$router.push({
                    name: "updatedata",
                    params: { define: Vue.$route.params.define }
                  });
                }
              });
            }
          } else {
            this.$swal("实名志愿者才可申请加入项目！", { buttons: "确定" });
          }
        } else {
          this.$swal("无效用户", { buttons: "确定" });
        }
      } else {
        this.$swal("未登录不能报名，是否前去登录？", {
          buttons: ["取消", "确定"]
        }).then(function(value) {
          if (value) {
            Vue.$utilroutes.toLogin();
          }
        });
      }
    },
    // 再次申请加入项目
    applyProAgain(id) {
      if (!this.userInfo) {
        return this.$swal("未登录不能报名，是否前去登录？", {
          buttons: ["取消", "确定"]
        }).then(function(value) {
          if (value) {
            Vue.$utilroutes.toLogin();
          }
        });
      }
      let params = {
        volunteerid: this.userInfo.albp0029, // 志愿者编号
        areaid: this.projectInfo.albx0021, // 服务区域
        projectId: this.projectid, // 项目id
        volAreaId: this.userInfo.albp0020, // 志愿者服务区划分
        postid: id, // 岗位id
        operatetype: 71,
        voltime: this.userInfo.albp0089 // 志愿者服务时长
      };
      this.utilscommit.requestapi(
        "getVolOperateProjectFortisWeb",
        params,
        res => {
          if (res && res.code == 0) {
            // 申请成功
            this.$router.go(0);
          } else {
            // 申请失败
            this.$swal(res.message, {
              buttons: "确定"
            });
          }
        }
      );
    },
    // 设置加入按钮状态
    updateClickState(isClick) {
      this.isClick = isClick;
      if (isClick) {
        // 还原，可以加入
        $("#" + this.applyJobId).css({
          background: "#e60012",
          cursor: "pointer",
          opacity: "0.8"
        }); // 修改注册按钮状态
      } else {
        // 置灰，不可点击
        $("#" + this.applyJobId).css({
          background: "gray",
          cursor: "default",
          opacity: "1"
        });
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
    // 免审加入项目
    submitPassword() {
      if (this.passwordCheck()) {
        // 验证信息加入
        let params = {
          volunteerid: this.userInfo.albp0029, // 志愿者id
          areaid: this.projectInfo.albx0021, // 项目区域
          projectid: this.projectid, // 项目id
          postid: this.applyJobId, // 岗位id
          volAreaId: this.userInfo.albp0020, // 志愿者区域
          password: this.password, // 免审密码
          voltime: this.userInfo.albp0089 // 志愿者服务时长
        };
        this.utilscommit.requestapi(
          "getVolOperateProjectFortisWeb",
          params,
          res => {
            if (res && res.code == 0) {
              // 申请成功
              this.$router.go(0);
            } else {
              // 申请失败
              this.$swal(res.message, {
                buttons: "确定"
              });
            }
          }
        );
      }
    },
    // 提示
    formTip(el, tip) {
      $("#" + el + "Tips")
        .html(tip)
        .css("color", "red");
    },
    // 分页
    pageEvent(e) {
      this.getList();
    },
    // 获取tab列表
    getList() {
      this.queryStatus = 0;
      if (this.nowIndex == 1) {
        this.applyList = [];
        // 查询项目报名信息
        let params = {
          areaid: this.projectInfo.albx0021,
          proId: this.projectid,
          albx0084: "B",
          pageNum: this.pageNow,
          pageSize: this.pageSize
        };
        this.utilscommit.requestapi(
          "volSignUpProjectListFortisWeb",
          params,
          this.applyListBack
        );
      } else if (this.nowIndex == 3) {
        var data = {
          ofid: this.projectid,
          type: "2",
          areaid: this.areaid,
          pageNow: this.pageNow,
          pageSize: this.pageSize
        };
        this.utilscommit.request(
          "nvsi_listMainMessage",
          data,
          this.mainMessageBack
        );
      } else if (this.nowIndex == 4) {
        this.utilscommit.request(
          "nvsi_dynamicList",
          {
            projectid: this.projectid,
            pageNow: this.pageNow,
            pageSize: this.pageSize
          },
          this.dynamicListBack
        );
      } else if (this.nowIndex == 2) {
        this.timePublicList = [];
        // 查询项目时长公示
        let params = {
          areaid: this.projectInfo.albx0021, // 项目区划
          albx0176: this.projectid, // 项目id
          pageNum: this.pageNow,
          pageSize: this.pageSize
        };
        console.log(params);
        this.utilscommit.requestapi(
          "timeFortisWeb",
          params,
          this.publicListBack
        );
      }
    },
    // 查询已加入项目成员列表回调
    applyListBack(result) {
      if (result && result.data) {
        this.applyList = result.data;
        this.common.getTolData(this, result);
      } else {
        this.applyList = {};
        this.common.getTolData(this);
      }
      this.queryStatus = 1;
    },
    // 查询留言信息回调
    mainMessageBack(result) {
      if (result && result.data) {
        this.mainMessageList = result.data;
        this.common.getTolData(this, result);
      } else {
        this.mainMessageList = {};
        this.common.getTolData(this);
      }
    },
    // 查询时长公示列表回调
    publicListBack(result) {
      if (result && result.data) {
        this.timePublicList = result.data;
        this.common.getTolData(this, result);
      } else {
        this.timePublicList = {};
        this.common.getTolData(this);
      }
      this.queryStatus = 1;
    },
    // 查询项目动态列表回调
    dynamicListBack(result) {
      //console.log("动态列表  ",result)
      if (result && result.data) {
        this.dynamicList = result.data;
        this.common.getTolData(this, result);
      } else {
        this.timePublicList = {};
        this.common.getTolData(this);
      }
    },
    // 显示时长举报弹窗
    inform(timeid, albx0347, albx0340) {
      if (this.userInfo) {
        if (this.userInfo.isdelete == 0) {
          //是否有效
          if (
            (this.basicInfo.albp0020 && this.basicInfo.albp0028) ||
            (this.userInfo.albp0087 >= 4 && this.userInfo.albp0087 <= 8)
          ) {
            //是否完善信息
            $(".mask.inform").addClass("active");
            this.timeId = timeid;
            this.albx0347 = albx0347;
            this.albx0340 = albx0340;
          } else {
            this.$swal("未完善基本信息不能举报，是否前去完善？", {
              buttons: ["取消", "确定"]
            }).then(function(value) {
              if (value) {
                Vue.$router.push({
                  name: "updatedata",
                  params: { define: Vue.$route.params.define }
                });
              }
            });
          }
        } else {
          this.$swal("无效用户！", { buttons: "确定" });
        }
      } else {
        this.$swal("未登录不能举报，是否前去登录？", {
          buttons: ["取消", "确定"]
        }).then(function(value) {
          if (value) {
            Vue.$utilroutes.toLogin();
          }
        });
      }
    },
    // 时长举报理由校验
    reasonCheck() {
      // 失去焦点
      var tip = "";
      var flag = true;
      if (!this.reason) {
        tip = "请输入举报理由！";
        flag = false;
      }
      this.formTip("reason", tip);
      return flag;
    },
    // 提交时长举报
    informSubmit() {
      if (this.reasonCheck()) {
        var data = {
          albx0338: this.areaid,
          albx0339: this.groupInfo.id,
          albx0342: this.timeId, //被投诉对象
          // "albx0343":this.userInfo.albp0087 == '1' ? '1' : '2',
          albx0344: this.reason,
          albx0346: "1",
          albx0347: this.albx0347,
          albx0348: this.projectid,
          albx0340: this.albx0340, //服务时长
          albx0353: this.projectInfo.albx0002 //项目名
        };
        // console.log(data);
        this.utilscommit.request("nvsi_insertReport", data, this.reportBack); //时长举报
      }
    },
    // 时长举报回调
    reportBack(result) {
      if (result) {
        if (result.code == 0) {
          this.$swal(result.message, { buttons: "确定" }).then(function(value) {
            window.location.reload();
          });
          this.closeInform();
        } else {
          this.$swal(result.message, { buttons: "确定" });
        }
      }
    },
    // 显示投诉弹窗
    showComplain(id, name, albx0053) {
      debugger;
      this.objname = name;
      this.obj = id;
      albx0053 ? (this.reporterNum = albx0053) : "";
      $(".mask.complain").addClass("active");
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
      this.utilscommit.requestapi(
        "getImageCodeFortisWeb",
        null,
        this.changeImgCodeBack
      );
    },
    // 图片验证码获取结果
    changeImgCodeBack(data) {
      if (data && data.data) {
        $("#reg_image").attr("src", data.data.img);
        this.imgkey = data.data.imgkey;
      }
    },
    // 图片验证码校验
    imgCodeCheck() {
      var el = $("#inputImgCode");
      this.tip = "";
      this.type = 1;
      var flag = true;
      var code = el.val();
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
        let params = {
          bname: this.objname, // 被举报者姓名
          name: this.name, // 举报者姓名
          content: this.content, // 举报内容
          cardno: this.card, // 身份证
          phone: this.phone, // 手机号
          type: 3, // 举报类型
          ttt: 3, // 操作者类型
          albx0347: this.reporterNum, // 志愿者编号
          areaid: this.areaid, // 区域id
          groupid: this.projectInfo.albx0011 // 当前项目所属队伍id
        };
        // this.utilscommit.request(
        //   "nvsi_insertComplain",
        //   data,
        //    (result) => {
        //     if (result) {
        //       if (result.data) {
        //         Vues.closeComplain();
        //         Vues.$swal("投诉提交成功", { buttons: "确定" });
        //       } else {
        //         Vues.$swal(result.message, { buttons: "确定" }).then(() => {
        //           Vues.changeImgCode();
        //         });
        //       }
        //     }
        //   }
        // );
      }
    },
    imgError(el) {
      if (this.projectInfo.defaultImg) {
        el.target.src = this.projectInfo.defaultImg;
      } else {
        el.target.src = i3;
      }
    },
    imgError2(el) {
      if (this.projectInfo.grodefaultImg) {
        el.target.src = this.projectInfo.grodefaultImg;
      } else {
        el.target.src = i1;
      }
    },
    imgError3(el) {
      el.target.src = avatar;
    },
    closeMapp() {
      //关闭地图
      $(".mask.map").removeClass("active");
    },
    closeVX() {
      //关闭微信
      $("#qrcode").empty();
      $(".mask.vxp").removeClass("active");
    },
    closePassword() {
      //关闭免审
      this.password = "";
      $("#passwordTips").html("");
      $(".mask.password").removeClass("active");
    },
    closeInform() {
      // 关闭举报
      this.reason = "";
      this.timeId = "";
      this.albx0347 = "";
      this.albx0340 = "";
      $(".form-error").html("");
      $(".mask.inform").removeClass("active");
    },
    closeComplain() {
      // 关闭投诉
      $(".mask.complain").removeClass("active");
      $(".form-error").html("");
      this.objname = this.obj = this.content = this.name = this.card = this.phone = this.imgcode = this.code =
        "";
    },
    // 跳转队伍/志愿者详情
    toDetailInfo(volnum, albp0020, orgid, albe0012) {
      if (volnum) {
        this.$utilroutes.toUserInfo(volnum, albp0020);
      } else if (orgid) {
        this.$utilroutes.toGroupInfo(orgid, albe0012);
      }
    },
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
        //console.log(messageinfo)
        $(".mask.reply").addClass("active");
      } else {
        this.$swal("未登录不能发布，是否前去登录？", {
          buttons: ["取消", "确定"]
        }).then(function(value) {
          if (value) {
            Vue.$utilroutes.toLogin();
          }
        });
      }
    },
    closeReply() {
      $(".mask.reply").removeClass("active");
      this.leaveContent = this.mainid = this.bemsgid = "";
    },
    publish(type) {
      // 发布留言mainid：主留言id，bemsgid：被回复的用户id     type-->是否主留言  1=是  0=否
      if (!this.leaveContent) {
        this.$swal("请填写留言内容", { buttons: "确定" });
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
            this.$swal("未完善基本信息不能发布，是否前去完善？", {
              buttons: ["取消", "确定"]
            }).then(function(value) {
              if (value) {
                Vue.$router.push({
                  name: "updatedata",
                  params: { define: Vue.$route.params.define }
                });
              }
            });
          } else {
            // console.log("当前用户信息  ",this.userInfo)
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
              albx4007: this.projectid, //所属项目id
              albx4008: this.projectInfo.albx0011, //所属团体id
              albx4009: 2, //留言类型（1团体留言/2项目讨论/3项目动态/4新闻评论/5在线课堂）
              albx4010: this.bemsgid, //被留言用户id(团体id/志愿者编号)
              albx4011: this.projectid, //留言来源id（动态id）
              albx4013: type, //是否主留言  1=是  0=否
              albx4018: this.projectInfo.albx0002, //title主体的标题（动态、项目、团体、新闻）
              albx4019: this.projectInfo.albx0020, //photo主体图片(只需要一张即可)
              albx4020: this.projectInfo.createtime, //time主体的创建时间，比如动态的创建时间
              albx4014: realname, //当前留言者昵称
              albx4015: this.userInfo.albp0027, //当前留言者头像
              albx4016: brealname, //被留言者昵称
              albx4017: bphoto, //被留言者头像
              albx4021: lastid //上级留言id
            };
            //console.log("留言信息  ",data)
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
        this.$swal("未登录不能发布，是否前去登录？", {
          buttons: ["取消", "确定"]
        }).then(function(value) {
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
          this.$swal("发布成功", { buttons: "确定" }).then(function(value) {
            Vues.pageNow = 1;
            Vues.getList();
          });
          this.closeReply();
        } else {
          this.$swal(result.message, { buttons: "确定" });
        }
      }
    },
    photoClicked() {
      //点击动态图片
      this.$refs.photofile.click();
      //console.log(this.$refs.photofile.files)
    },
    photoChanged(event) {
      //图片上传
      this.photoSumNum = this.photoSumNum + 1;
      if (this.photoNum >= 9)
        return this.$swal("图片不能超过九张！", { buttons: "确定" });
      let file = event.target.files[0];
      this.$refs.photofile.value = "";
      //校验图片
      let fileVal = this.common.checkFile(file, 2048);
      if (fileVal) return this.$swal(fileVal, { buttons: "确定" });
      let that = this;
      //获取浏览器图片
      let reader = new FileReader();
      // 调用reader.readAsDataURL()方法，把图片转成base64
      reader.readAsDataURL(file);
      //监听reader对象的onload事件，当图片加载完成时，把base64编码賦值给预览图片
      reader.onload = function() {
        file.src = this.result;
        //console.log("第"+that.photoNum+"张图片：");
        that.photoShowHtml.push({ imgsrc: file.src, id: that.photoSumNum });
        Vues.getList(); //渲染页面
      };
      this.dynamicPhotoFile.push(file);
      this.photoNum = this.photoNum + 1;
    },
    delNowImg(id) {
      //删除图片
      //console.log("删除第"+this.photoNum+"张图片");
      if (this.photoNum > 0) {
        for (var i = 0; i < this.photoShowHtml.length; i++) {
          if (this.photoShowHtml[i].id == id) {
            //console.log("删除图片："+this.photoShowHtml[i].imgsrc);
            this.photoShowHtml.splice(i, 1);
            this.dynamicPhotoFile.splice(i, 1);
            break;
          }
        }
      }
      this.photoNum = this.photoNum - 1;
      this.reload();
    },
    // 提交动态
    submitDynamic() {
      if (!this.dynamicContent)
        return this.$swal("请输入动态内容！", { buttons: "确定" });
      if (this.photoNum == 0)
        return this.$swal("请上传动态图片！", { buttons: "确定" });
      if (this.userInfo) {
        //用户是否登录
        if (this.userInfo.albp0058 == 1) {
          //是否有效
          if (
            this.userInfo.albp0087 == "1" &&
            (!this.basicInfo.albp0020 || !this.basicInfo.albp0028)
          ) {
            //志愿者未完善信息
            this.$swal("未完善基本信息不能发布，是否前去完善？", {
              buttons: ["取消", "确定"]
            }).then(function(value) {
              if (value) {
                Vue.$router.push({
                  name: "updatedata",
                  params: { define: Vue.$route.params.define }
                });
              }
            });
          } else {
            let param = new FormData(); //创建form对象
            for (let i = 0; i < this.dynamicPhotoFile.length; i++) {
              const photo = this.dynamicPhotoFile[i];
              //param.append('file'+i,new window.File([photo], photo.name, {type: photo.type}));
              param.append("file" + i, photo, photo.name);
            }
            this.utilscommit.uploadImgs(
              param,
              "dynamicphoto",
              this.uploadPhotoResult
            ); //上传多张图片
          }
        } else {
          this.$swal("无效用户！", { buttons: "确定" });
        }
      } else {
        this.$swal("未登录不能发布，是否前去登录？", {
          buttons: ["取消", "确定"]
        }).then(function(value) {
          if (value) {
            Vue.$utilroutes.toLogin();
          }
        });
      }
    },
    uploadPhotoResult(result) {
      let photos = [];
      for (let i = 0; i < this.dynamicPhotoFile.length; i++) {
        const filename = "file" + i;
        photos[i] = JSON.parse(result[filename]);
      }
      this.dynamicPhoto = photos; //动态图片
      let userid = this.userInfo.albp0055; //默认用户id
      let usertype = "2"; //默认团体
      let realname = this.userInfo.albp0064; //默认姓名
      if (this.userInfo.albp0087 == "1") {
        if (this.userInfo.volnum) userid = this.userInfo.volnum; //若为志愿者，则用志愿者编号
        usertype = "1";
        if (this.userInfo.albp0084) realname = this.userInfo.albp0084;
      }
      let data = {
        creator: this.userInfo.albp0052, //用户名
        albx0402: this.projectid, //项目id
        albx0404: this.dynamicContent, //内容
        albx0406: userid, //发布人id（志愿者编号/团体编号）
        albx0407: usertype, //操作者类型
        file: this.dynamicPhoto, //图片(多张图片路径)
        albx0409: this.areaid, //发布区域id(默认全国)
        albx0410: this.projectInfo.albx0012, //发布区域名
        albx0411: "", //经度
        albx0412: "", //维度
        albx0414: this.projectInfo.albx0011, //团体id
        albx0415: this.groupInfo.albe0025, //团体图片
        albx0416: this.groupInfo.albe0002, //团体名称
        albx0417: realname, //发布人昵称
        albx0418: this.userInfo.albp0027 //发布人头像
      };
      this.utilscommit.request("nvsi_saveDynamic", data, this.saveDynamicBack);
    },
    saveDynamicBack(data) {
      if (data) {
        if (data.code == 0) {
          this.photoShowHtml = [];
          this.dynamicPhotoFile = [];
          this.photoNum = 0;
          this.dynamicContent = "";
          this.$swal("发布成功", { buttons: "确定" });
        } else {
          this.$swal(data.message, { buttons: "确定" });
        }
        this.getList();
      }
    }
  },
  watch: {
    nowIndex(newval, oldval) {
      //tab变化
      if (newval == 1 || newval == 2 || newval == 3 || newval == 4) {
        //刷新最新报名、讨论区、时长公示
        this.pageNow = 1;
        this.getList();
      }
    }
  }
};
</script>

<style scoped>
@import "../../assets/css/base.css";
@import "../../assets/css/main.css";
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
#picker {
  background: url("../../assets/img/camera.png") no-repeat center center;
}
.hides {
  display: none;
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
