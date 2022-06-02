<template>
  <div id="zykxinfoRight">
    <li class="col v-t g-8 pl-40">
      <div class="wrapper" style="margin-bottom:22px">
        <h2 class="subtitle subtitle-noline">热点新闻</h2>
        <ul class="lister list-mini">
          <li class="row w" v-for="(item, index) in hotNewsList" :key="index">
            <a
              href="javascript:void(0);"
              class="col v-m oneline full"
              :title="item.title"
              @click="getNewsInfo(item)"
            >
              <span class="istops" v-if="item.istop == 1">置顶</span>
              {{ item.title | ellipsis(29) }}
            </a>
          </li>
        </ul>
      </div>
      <div class="wrapper">
        <h2 class="subtitle subtitle-noline">热点图片</h2>
        <ul class="images images-v">
          <li v-for="(item, index) in hotImgList" :key="index">
            <a href="javascript:void(0);" @click="getNewsInfo(item)">
              <span
                class="img"
                :style="{
                  backgroundImage:
                    'url(' + common.changeImgsrc(item.imgtitle) + ')'
                }"
              ></span>
              <i class="oneline" :title="item.title">
                {{ item.title | ellipsis(29) }}
              </i>
            </a>
          </li>
        </ul>
      </div>
    </li>
  </div>
</template>

<script>
export default {
  name: "zykxinfoRight",
  props: ["hotImgList", "hotNewsList"],
  data: function() {
    return {};
  },
  methods: {
    getNewsInfo(item) {
      window.open(
        Vue.$router.resolve({
          name: "sitenewsInfo",
          params: { define: this.routeDefine, id: item.id }
        }).href
      );
    }
  }
};
</script>
