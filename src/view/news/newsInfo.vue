<template>
  <div id="zykxinfo">
    <!--中间部分-->
    <div class="main bannerimg">
      <div class="mid">
        <ul class="row w">
          <li class="col">
            <div class="router">
              <span>当前位置：</span>
              <a href="javascript:void(0);">
                <router-link tag="a" :to="{ name: 'home', params: { define: routeDefine } }">首页</router-link>
              </a>
              <a href="javascript:void(0);" v-for="(item, index) in mune" :key="index" @click="toUrl(item)" v-text="item.showname"></a>
            </div>
          </li>
        </ul>
        <ul class="row w">
          <li class="col v-t g-16">
            <div class="detail wrapper">
              <h2 style="text-align: center;">{{ newsinfo.title }}</h2>
              <div class="detail-tips" style="text-align: center;">
                <span v-if="newsinfo.entrytime">日期：
                  <span>{{ newsinfo.entrytime | ellipsisNos(10) }}</span>
                </span>
                <span v-if="newsinfo.newsfrom">来源： <span>{{ newsinfo.newsfrom }}</span></span>
              </div>
              <div class="detail-content" style="word-wrap: break-word;word-break: break-all;" v-html="newsinfo.newscontent"></div>
              <div v-if="newsinfo.attachments && newsinfo.files" class="attach">
                <h5>
                  附件
                  <a href="javascript:void(0);" @click="downloadFiles">全部下载</a>
                </h5>
                <ul>
                  <li v-for="(el, index) in newsinfo.files" :key="index" class="attach-li">
                    <span class="attach-title">
                      <i style="font-size: 16px;">{{ el.title + el.type }}</i>
                      <i style="display: block;color: #999;font-size: 14px;">{{
                        Math.ceil(el.size / 1024) + "k"
                      }}</i>
                    </span>
                    <span class="attach-button">
                      <a href="javascript:void(0);" @click="downloadFile(el.filepath)" class="attach-down">下载</a>
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </li>
          <!--右侧-->
          <zykxinfo-right :hotImgList="hotImgList" :hotNewsList="hotNewsList"></zykxinfo-right>
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
      newsinfo: {},
      mune: [], //面包屑导航
      hotImgList: [],
      hotNewsList: []
    };
  },
  beforeMount() {
    window.Vues = this; //主体vue实例挂载
    this.getdata();
    this.getRightNews();
  },
  methods: {
    getdata() {
      //初始化数据
      this.utilscommit.requestapi(
        "getNewDetails",
        { id: this.id },
        this.callback_newsinfo
      ); //新闻详情
    },
    callback_newsinfo(result) {
      //新闻详情返回结果
      if (result && result.data) {
        let news = result.data;
        if (news.newscontent)
          news.newscontent = news.newscontent.replace(
            /@serveruirl@LEAP/g,
            this.common.getUrl() + "/LEAP"
          );
        this.mune = news.codebean;
        this.newsinfo = news;
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
    },
    downloadFiles: function() {
      //全部下载
      var files = this.newsinfo.files;
      for (var i = 0; i < files.length; i++) {
        this.down(this.common.changeImgsrc(files[i].filepath, 2));
      }
    },
    downloadFile: function(path) {
      //下载
      this.down(this.common.changeImgsrc(path, 2));
    },
    down: function(path) {
      if (this.isIE()) {
        // IE
        window.open(path, "_blank");
      } else {
        var a = document.createElement("a");
        var e = document.createEvent("MouseEvents");
        e.initEvent("click", false, false);
        a.href = path;
        a.download = "";
        a.dispatchEvent(e);
      }
    },
    isIE: function() {
      return !!window.ActiveXObject || "ActiveXObject" in window;
    }
  }
};
</script>
<style>
.detail-content img,
.detail-content p img {
  max-width: 700px !important;
}
.detail-content span,
.detail-content i,
.detail-content b {
  display: inline;
}
</style>
