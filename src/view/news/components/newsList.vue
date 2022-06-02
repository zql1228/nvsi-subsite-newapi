<template>
  <!-- 带分页的列表组件（无子栏目） -->
  <li class="col v-t g-16">
    <div class="wrapper" style="height:858px">
      <!-- 栏目名称 -->
      <h2 class="subtitle" v-text="newstitle"></h2>
      <!-- 新闻列表 -->
      <ul class="lister list-bold" v-if="pagetype == 1">
        <li class="row w" v-for="(item, key) in newsList" :key="key">
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
      <!-- 视频列表 -->
      <ul class="images images-large grid" v-if="pagetype == 2">
        <li class="grid-item g-8" v-for="(video, key) in newsList" :key="key">
          <a @click="toVideoInfo(video)" href="javascript:void(0);">
            <span
              class="img"
              :style="{
                backgroundImage:
                  'url(' + common.changeImgsrc(video.imgtitle) + ')'
              }"
            ></span>
            <i class="oneline" v-text="video.title"></i>
          </a>
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
    },
    pagetype: {
      type: String,
      default: "1"
    },
    totalCount: {
      type: Number,
      default: 0
    },
    pageCount: {
      type: Number,
      default: 0
    }
  },
  data: function() {
    return {
      routeDefine: this.$route.params.define,
      name: this.$route.params.name,
      //分页参数
      // tolCount: 0, //总条数
      // tolPage: 0, //总页数
      pageSize: 15, //每页条数
      pageNow: 1, //当前页
      jumpPage: 1
    };
  },
  methods: {
    pageEvent: function(e) {
      //分页
      this.$emit("getdata", this.pageNow);
    },
    getNewsInfo(item) {
      window.open(
        Vue.$router.resolve({
          name: "sitenewsInfo",
          params: { define: this.routeDefine, id: item.id }
        }).href
      );
    },
    toVideoInfo(item) {
      window.open(
        Vue.$router.resolve({
          name: "sitevideoInfo",
          params: { define: this.routeDefine, id: item.id }
        }).href
      );
    }
  },
  watch: {}
};
</script>
