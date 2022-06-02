<template>
  <div id="zykx">
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
                >首页</router-link
              >
              <a
                href="javascript:void(0);"
                v-for="(item, index) in mune"
                :key="index"
                @click="toNews(item)"
                v-text="item.showname"
              ></a>
            </div>
          </li>
        </ul>
        <ul class="row w">
          <!--主体-->
          <component
            :is="showtype"
            :newstitle="newstitle"
            :newsList="newsList"
            :pagetype="pagetype"
            :pageCount="pageCount"
            :totalCount="totalCount"
            @getdata="getdata"
          ></component>
          <!--右侧-->
          <zykxinfo-right
            v-if="rightShow"
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
const newsList = () => import("@/view/news/components/newsList.vue"); //左侧列表-无子栏目（分页）
const newsTab = () => import("@/view/news/components/newsTab.vue"); //左侧列表-有子栏目
const tabList = () => import("@/view/news/components/newstabList.vue"); //左侧列表-有子栏目(分页)

export default {
  components: {
    ZykxinfoRight, //右侧
    newsList,
    newsTab,
    tabList
  },
  data: function() {
    return {
      routeDefine: this.$route.params.define,
      name: this.$route.params.name,
      showtype: "", //新闻展示类型
      newsList: [], //新闻列表
      rightShow: true, //是否展示右侧区域
      pagetype: "1", //页面新闻类型   1-新闻   2-视频
      totalCount: 0, //总条数
      pageCount: 0, //总页数
      mune: [], //面包屑导航
      newstitle: "",
      rightItem: {},
      hotImgList: [],
      hotNewsList: [],
      sliceNum: 2
    };
  },
  created() {
    this.getdata();
    this.getRightNews();
  },
  methods: {
    getdata: function(pageNum) {
      let num = pageNum ? pageNum : 1;
      this.utilscommit.requestapi(
        "listResourceContentNew",
        {
          sitename: this.routeDefine,
          columname: this.name,
          pageNum: num,
          pageSize: 17
        },
        this.newsBack
      );
    },
    newsBack(data) {
      if (data && data.code == 0) {
        //区分栏目有无子栏目，渲染不同的组件
        if (data.data && data.data.ishavechild == 0) {
          //无子栏目
          this.showtype = "newsList";
          this.newsList = data.data.newslist;
          this.pageCount = data.data.pagecount;
          this.totalCount = data.data.totalcount;
          this.sliceNum = 2;
        } else {
          if (data.data.pagetype == 3) {
            this.showtype = "tabList";
          } else {
            this.showtype = "newsTab";
          }
          this.newsList = data.data.menulist;
          if (data.data.menulist.length > 3) {
            this.sliceNum = 4;
          } else {
            this.sliceNum = 2;
          }
        }
        this.pagetype = data.data.pagetype;
        this.mune = data.data.codebean;
        this.newstitle = data.data.showname;
      } else {
        this.newsList = [];
        this.pageCount = 0;
        this.totalCount = 0;
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
        this.rightItem = news;
        if (news.hotimagesnews)
          this.hotImgList = news.hotimagesnews.slice(0, this.sliceNum);
        if (news.hotnews) this.hotNewsList = news.hotnews;
      }
    },
    toNews(item) {
      this.$router.push({
        name: "sitenews",
        params: { define: this.routeDefine, name: item.name }
      });
    }
  },
  watch: {
    "$route.params.name": function(nval, oval) {
      this.name = nval;
      this.getdata();
    },
    sliceNum: function(nval, oval) {
      if (this.rightItem.hotimagesnews)
        this.hotImgList = this.rightItem.hotimagesnews.slice(0, nval);
    }
  }
};
</script>
