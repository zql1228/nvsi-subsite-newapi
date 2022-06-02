<template>
  <!-- 不带分页的列表组件（有子栏目） -->
  <li class="col v-t g-16">
    <div
      class="wrapper"
      :style="{ height: newsList.length > 3 ? '1334px' : '858px' }"
    >
      <div v-for="(el, index) in newsList" :key="index">
        <!-- 栏目名称 -->
        <h2 class="subtitle">
          {{ el.showname }}
          <a href="javascript:void(0);" @click="toNews(el.name)">更多</a>
        </h2>
        <!-- 新闻列表 -->
        <ul class="lister list-bold" v-if="pagetype == 1">
          <li class="row w" v-for="news in el.newslist" :key="news.id">
            <a
              href="javascript:void(0);"
              class="col v-m oneline"
              :title="news.title"
              @click="getNewsInfo(news)"
            >
              <span class="istops" v-if="news.istop == 1">置顶</span>
              {{ news.title | ellipsis(36) }}
            </a>
            <span class="col v-m t-r">
              {{ news.entrytime | ellipsisNos(10) }}
            </span>
          </li>
        </ul>
        <!-- 视频列表 -->
        <ul class="images images-large grid" v-if="pagetype == 2">
          <li class="grid-item g-8" v-for="(elc, keyc) in newsList" :key="keyc">
            <a @click="toVideoInfo(elc)" href="javascript:void(0);">
              <span
                class="img"
                :style="{
                  backgroundImage:
                    'url(' + common.changeImgsrc(elc.imgtitle) + ')'
                }"
              ></span>
              <i class="oneline" v-text="elc.title"></i>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </li>
</template>

<script>
export default {
  data: function() {
    return {
      routeDefine: this.$route.params.define
    };
  },
  props: {
    newsList: {
      type: Array,
      default: []
    },
    pagetype: {
      type: String,
      default: "1"
    }
  },
  methods: {
    toNews(name) {
      this.$router.push({
        name: "sitenews",
        params: { define: this.routeDefine, name: name }
      });
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
  }
};
</script>
