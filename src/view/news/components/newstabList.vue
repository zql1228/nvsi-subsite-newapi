<template>
  <!-- 带分页的列表组件（无子栏目） -->
  <li class="col v-t g-16">
    <div class="wrapper" style="height:858px">
      <!-- 栏目名称 -->
      <h2 class="subtitle" v-text="newstitle"></h2>
      <div class="wrapper-tab">
        <a
          href="javascript:void(0);"
          v-for="(el, index) in newsList"
          :key="index"
          v-text="el.showname"
          :class="{ active: id == el.resourcecode }"
          @click="toNowColumns(el)"
        ></a>
      </div>
      <!-- 新闻列表 -->
      <ul class="lister list-bold">
        <li class="row w" v-for="(item, key) in list" :key="key">
          <a
            href="javascript:void(0);"
            class="col v-m oneline"
            :title="item.title"
            @click="getNewsInfo(item)"
          >
            <span class="istops" v-if="item.istop == 1">置顶</span>
            {{ item.title | ellipsis(36) }}
          </a>
          <span class="col v-m t-r">
            {{ item.entrytime | ellipsisNos(10) }}
          </span>
        </li>
      </ul>
      <paging
        :pageCount="pageCount"
        :rangePage="pageSize"
        :initPage="pageNow"
        :totals="totalCount"
        :val="jumpPage"
        @pageEvent="pageEvent"
      >
      </paging>
    </div>
  </li>
</template>

<script>
const paging = () => import("@/components/page/paginationRed.vue"); //分页

export default {
  components: {
    paging //分页
  },
  props: {
    newsList: {
      type: Array,
      default: []
    },
    newstitle: {
      type: String,
      default: ""
    }
  },
  data: function() {
    return {
      routeDefine: this.$route.params.define,
      name: this.$route.params.name,
      list: [],
      id: "",
      enname: "",
      //分页参数
      totalCount: 0, //总条数
      pageCount: 0, //总页数
      pageSize: 15, //每页条数
      pageNow: 1, //当前页
      jumpPage: 1
    };
  },
  mounted() {
    this.list = this.newsList[0].newslist;
    this.id = this.newsList[0].resourcecode;
    this.enname = this.newsList[0].name;
    this.pageCount = this.newsList[0].pagecount;
    this.totalCount = this.newsList[0].totalcount;
  },
  methods: {
    pageEvent: function(e) {
      //分页
      this.getdata();
    },
    getdata: function() {
      this.utilscommit.requestapi(
        "listResourceContentNew",
        {
          sitename: this.routeDefine,
          columname: this.enname,
          pageNum: this.pageNow,
          pageSize: 15
        },
        this.newsBack
      );
    },
    newsBack(data) {
      if (data && data.code == 0) {
        this.list = data.data.newslist;
        this.pageCount = data.data.pagecount;
        this.totalCount = data.data.totalcount;
      } else {
        this.newsList = [];
        this.pageCount = 0;
        this.totalCount = 0;
      }
    },
    getNewsInfo(item) {
      window.open(
        Vue.$router.resolve({
          name: "sitenewsInfo",
          params: { define: this.routeDefine, id: item.id }
        }).href
      );
    },
    toNowColumns(el) {
      this.id = el.resourcecode;
      this.enname = el.name;
      this.pageNow = 1;
      this.getdata();
    }
  }
};
</script>
