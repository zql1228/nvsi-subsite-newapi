<template>
  <!-- 新闻列表组件 -->
  <div>
    <div class="title">
      <img src="@/assets/img/icon_title.png" alt="" />
      <h2 class="label">
        <span class="active" v-text="ellipsis(newsItem.resourcename, 9)"></span>
      </h2>
      <a href="javascript:void(0);" class="more" @click="toNewsMore">更多</a>
    </div>
    <ul class="list" v-if="list">
      <li class="row w" v-for="(item, index) in list" :key="index">
        <div class="col v-m" style="display:none">
          <span class="num">{{ index + 1 }}</span>
        </div>
        <div class="col v-m" style="text-align: unset">
          <a
            href="javascript:void(0);"
            class="label"
            :title="item.title"
            @click="getNewsInfoMore(item)"
          >
            <span class="dot"></span
            ><!-- v-show="modularType != 1" -->
            <!-- <span class="istops" v-if="item.istop == 1">置顶</span> -->
            {{ item.title }}
          </a>
        </div>
        <div class="col v-m">
          <!--  v-show="modularType == 1" -->
          <span class="time">{{ item.entrytime | ellipsisNos(10) }}</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    newsItem: {
      type: Object,
      default: {}
    }
  },
  data() {
    return {
      routeDefine: this.$route.params.define,
      list: [],
      modeName: ""
    };
  },
  mounted() {
    this.getList();
  },
  methods: {
    getList() {
      this.utilscommit.requestapi(
        "listResourceContentNew",
        {
          sitename: this.routeDefine,
          columname: this.newsItem.name,
          pageNum: 1,
          pageSize: 5
        },
        this.newsBack
      );
    },
    newsBack(data) {
      if (data && data.code == 0) {
        this.list = data.data.newslist;
        this.modeName = data.data.name;
      }
    },
    toNewsMore: function() {
      this.$router.push({
        name: "sitenews",
        params: { define: this.routeDefine, name: this.modeName }
      });
    },
    getNewsInfoMore(item) {
      this.$router.push({
        name: "sitenewsInfo",
        params: { define: this.routeDefine, id: item.id }
      });
    }
  }
};
</script>
