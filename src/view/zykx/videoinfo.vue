<template>
  <div id="zykxinfo">
    <!--中间部分-->
    <div class="main bannerimg">
      <div class="mid">
        <ul class="row w">
          <li class="col">
            <div class="router">
              <span>当前位置：</span>
              <a href="javascript:void(0);"
                ><router-link
                  tag="a"
                  :to="{ name: 'home', params: { define: routeDefine } }"
                  >首页</router-link
                ></a
              >
              <a
                href="javascript:void(0);"
                v-show="firstmune"
                @click="$utilroutes.toNews(3, firstmune.id)"
                v-text="firstmune.albx6002"
              ></a>
              <a
                href="javascript:void(0);"
                v-if="secondmune"
                @click="$utilroutes.toNews(4, secondmune.id)"
                v-text="secondmune.albx6002"
              ></a>
            </div>
          </li>
        </ul>
        <ul class="row w">
          <li class="col v-t g-16">
            <div class="detail">
              <h3 v-text="videoinfo.title"></h3>
              <div class="detail-tips" style="text-align:inherit;">
                <span
                  >日期：<span v-show="videoinfo.entrytime">
                    {{ videoinfo.entrytime | ellipsisNos(10) }}</span
                  ></span
                >
                <span v-show="videoinfo.newsfrom"
                  >来源：<span v-text="videoinfo.newsfrom"></span
                ></span>
                <!-- <span>点击：<span v-text="videoinfo.albx6308"></span></span> -->
              </div>
              <div>
                <video
                  :src="videoinfo.videolink"
                  width="775"
                  height="416"
                  controls="controls"
                  autoplay="autoplay"
                >
                  您的浏览器不支持 video 标签。
                </video>
              </div>
              <div class="tabbar">
                <span class="active">课程介绍</span>
                <!--  <span>课程测试</span> -->
                <span>课程讨论</span>
              </div>
              <!-- 简介 -->
              <div class="tabbar-down">
                <p
                  v-show="videoinfo.newscontent"
                  style="padding: 18px;"
                  v-html="videoinfo.newscontent"
                ></p>
                <p
                  v-show="!videoinfo.newscontent"
                  style="width: 100%;text-align: center;"
                >
                  <img src="../../assets/img/js-wujilu.png" />
                </p>
              </div>
              <div class="tabbar-down" style="display:none;">
                <div class="load">
                  <textarea
                    class="textarea"
                    rows="4"
                    placeholder="在这里畅所欲言吧～"
                    v-model="leaveContent"
                    maxlength="200"
                    style="height: 146px;"
                  ></textarea>
                  <a
                    href="javascript:void(0);"
                    style="margin-top: 15px;"
                    class="button"
                    @click="publish(1)"
                    >发布评论</a
                  >
                  <h2 class="subtitle subtitle-margin subtitle-plain">
                    最新评论
                  </h2>
                  <p
                    v-show="!mainMessageList.length"
                    style="width: 100%;text-align: center;"
                  >
                    <img src="../../assets/img/js-wujilu.png" />
                  </p>
                  <ul class="activity">
                    <li
                      class="row w"
                      v-for="(el, index) in mainMessageList"
                      :key="index"
                    >
                      <div class="col v-t">
                        <img
                          :src="common.changeImgsrc(el.photo)"
                          alt=""
                          @error="imgError2($event)"
                        />
                      </div>
                      <div class="col v-t">
                        <h3
                          class="activity-tit"
                          style="font-size: 16px!important;font-weight: inherit!important;"
                        >
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
                            ><em v-text="el.showname"></em
                          ></a>
                          <span> {{ el.albx4006 | ellipsisNos(19) }}</span>
                          <a
                            href="javascript:void(0);"
                            @click="
                              showReply(el.id, el.albp0029 || el.orgid, el)
                            "
                            ><em>回复</em></a
                          >
                        </h3>
                        <div class="activity-info" v-text="el.albx4003"></div>
                        <div class="message-child">
                          <div
                            class="row w line-message"
                            v-for="(el2, key) in el.sublist"
                            :key="key"
                          >
                            <h3
                              class="activity-tit"
                              style="margin-top: 10px;font-size: 16px!important;font-weight: inherit!important;"
                            >
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
                                ><em v-text="el2.name1 || el2.name3"></em
                              ></a>
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
                                ><em v-text="el2.name2 || el2.name4"></em
                              ></a>
                              <span> {{ el2.albx4006 | ellipsisNos(19) }}</span>
                            </h3>
                            <div
                              class="activity-info"
                              v-text="el2.albx4003"
                            ></div>
                          </div>
                        </div>
                      </div>
                    </li>
                  </ul>
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
            </div>
          </li>
          <!--右侧-->
          <zykxinfo-right></zykxinfo-right>
        </ul>
      </div>
    </div>

    <!-- 讨论区 -->
    <div class="mask reply">
      <div
        class="mask-info"
        style="width:700px;max-height:705px;margin-left:-350px;"
      >
        <div class="mask-header row w">
          <div class="col v-m"><h2>回复</h2></div>
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
          style="height: 146px;"
        ></textarea>
        <a
          href="javascript:void(0);"
          style="margin-top: 15px;"
          class="button"
          @click="publish(0)"
          >发布评论</a
        >
      </div>
    </div>
  </div>
</template>

<script>
const ZykxinfoRight = () => import("@/view/zykx/zykxinfo_right.vue"); //右侧
const paging = () => import("@/components/page/paginationRed.vue"); //分页
import i1 from "../../assets/img/i1.png";

export default {
  name: "zykxinfo",
  components: {
    ZykxinfoRight, //右侧
    paging //分页
  },
  data: function() {
    return {
      routeDefine: this.$route.params.define,
      id: this.$route.params.id,
      areaid: "",
      videoinfo: {},
      mainMessageList: [],
      userInfo: this.$store.getters.getUser, //账户信息
      basicInfo: {}, //用户信息
      firstmune: "", //一级栏目
      secondmune: "", //二级栏目
      leaveContent: "", //留言内容
      //分页参数
      tolCount: 0, //总条数
      tolPage: 0, //总页数
      pageSize: 8, //每页条数
      pageNow: 1, //当前页
      jumpPage: 1
    };
  },
  beforeMount() {
    window.Vues = this; //主体vue实例挂载
    this.getdata();
  },
  mounted() {
    this.getModel();
  },
  methods: {
    pageEvent: function(e) {
      //分页
      this.getMessageList();
    },
    getdata() {
      this.areaid = this.$store.getters.getArea.areaid;
      this.utilscommit.request(
        "nvsi_getNewsDetails",
        { id: this.id, areaid: this.areaid },
        this.videoinfoBack
      ); //新闻详情
      this.utilscommit.request(
        "nvsi_getBasicInfo",
        this.userInfo,
        this.basicBack
      ); //获取用户基本信息
    },
    videoinfoBack(result) {
      //获取新闻详情
      if (result && result.data) {
        let news = result.data;
        this.videoinfo = news;
        this.firstmune = news.menulist[0];
        if (news.menulist[1]) this.secondmune = news.menulist[1];
      }
    },
    basicBack(result) {
      //返回志愿者信息
      if (result.code != 0) {
        Vueh.loginOut();
      }
      this.basicInfo = result.data;
    },
    getMessageList() {
      //获取留言信息
      var data = {
        ofid: this.id,
        type: "5",
        areaid: this.areaid,
        pageNow: this.pageNow,
        pageSize: this.pageSize
      };
      this.utilscommit.request(
        "nvsi_listMainMessage",
        data,
        this.mainMessageBack
      );
    },
    mainMessageBack: function(result) {
      if (result && result.data) {
        this.mainMessageList = result.data;
        this.common.getTolData(this, result);
      } else {
        this.mainMessageList = {};
        this.common.getTolData(this);
      }
    },
    publish: function(type) {
      //发布留言mainid：主留言id，bemsgid：被回复的用户id     type-->是否主留言  1=是  0=否
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
              if (value)
                Vue.$router.push({
                  name: "updatedata",
                  params: { define: Vue.$route.params.define }
                });
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
              albx4009: 5, //留言类型（1团体留言/2项目讨论/3项目动态/4新闻评论/5在线课堂）
              albx4010: this.bemsgid, //被留言用户id(团体id/志愿者编号)
              albx4011: this.id, //留言来源id
              albx4013: type, //是否主留言  1=是  0=否
              albx4018: this.videoinfo.albx6302, //title主体的标题（动态、项目、团体、新闻）
              albx4019: this.videoinfo.albx6304, //photo主体图片(只需要一张即可)
              albx4020: this.videoinfo.createtime, //time主体的创建时间，比如动态的创建时间
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
        this.$swal("未登录不能发布，是否前去登录？", {
          buttons: ["取消", "确定"]
        }).then(function(value) {
          if (value) Vue.$utilroutes.toLogin();
        });
      }
    },
    insertMessageBack: function(result) {
      if (result) {
        if (result.data) {
          this.leaveContent = "";
          this.$swal("发布成功", { buttons: "确定" }).then(function(value) {
            Vues.initPage = 1;
            Vues.getMessageList();
          });
          this.closeReply();
        } else {
          this.$swal(result.message, { buttons: "确定" });
        }
      }
    },
    imgError2(el) {
      el.target.src = i1;
    },
    showReply: function(mainid, bemsgid, messageinfo) {
      //打开回复框
      if (this.userInfo) {
        if (
          bemsgid == this.userInfo.volnum ||
          bemsgid == this.userInfo.albp0055
        ) {
          this.$swal("对不起，您不能回复自己的留言！", { buttons: "确定" });
          return false;
        } else {
          this.mainid = mainid;
          this.bemsgid = bemsgid;
          this.messageinfo = messageinfo;
          $(".mask.reply").addClass("active");
        }
      } else {
        this.$swal("未登录不能发布，是否前去登录？", {
          buttons: ["取消", "确定"]
        }).then(function(value) {
          if (value) Vue.$utilroutes.toLogin();
        });
      }
    },
    toDetailInfo: function(volnum, albp0020, orgid, albe0012) {
      if (volnum) {
        this.$utilroutes.toUserInfo(volnum, albp0020);
      } else if (orgid) {
        this.$utilroutes.toGroupInfo(orgid, albe0012);
      }
    },
    closeReply: function() {
      $(".mask.reply").removeClass("active");
      this.leaveContent = this.mainid = this.bemsgid = "";
    },
    getModel() {
      //跳转
      $(".tabbar span").each(function(idx, el) {
        $(el).click(function() {
          if (idx == 1) {
            Vues.getMessageList();
          }
          $(this)
            .addClass("active")
            .siblings("span")
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
