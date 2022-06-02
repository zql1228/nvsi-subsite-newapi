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
                v-for="(item, index) in mune"
                :key="index"
                @click="toUrl(item)"
                v-text="item.showname"
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
            </div>
          </li>
          <!--右侧-->
          <zykxinfo-right
            :hotImgList="hotImgList"
            :hotNewsList="hotNewsList"
          ></zykxinfo-right>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
const ZykxinfoRight = () => import("@/view/news/components/zykxinfo_right.vue"); //右侧

export default {
  name: "zykxinfo",
  components: {
    ZykxinfoRight //右侧
  },
  data: function() {
    return {
      routeDefine: this.$route.params.define,
      id: this.$route.params.id,
      videoinfo: {},
      mune: [], //一级栏目
      hotImgList: [],
      hotNewsList: []
    };
  },
  mounted() {
    this.getdata();
    this.getRightNews();
  },
  methods: {
    getdata() {
      this.utilscommit.requestapi(
        "getNewDetails",
        { id: this.id },
        this.videoinfoBack
      ); //新闻详情
    },
    videoinfoBack(result) {
      //获取新闻详情
      if (result && result.data) {
        let news = result.data;
        this.videoinfo = news;
        this.mune = news.codebean;
      }
    },
    getRightNews() {
      this.utilscommit.requestapi(
        "listHotNewsQuery",
        { sitename: this.routeDefine },
        this.hotBack
      ); //热点新闻
    },
    hotBack(data) {
      if (data && data.data) {
        let news = data.data;
        if (news.hotimagesnews) this.hotImgList = news.hotimagesnews;
        if (news.hotnews) this.hotNewsList = news.hotnews;
      }
    },
    toUrl(item) {
      this.$router.push({
        name: "sitenews",
        params: { define: this.routeDefine, name: item.name }
      });
    }
  }
};
</script>
