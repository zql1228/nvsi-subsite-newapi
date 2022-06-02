<template>
  <!-- 轮播图组件 -->
  <div id="slideBox" class="slideBox">
    <div class="bd">
      <ul>
        <li v-for="item in lbtNewList" :key="item.id">
          <a
            href="javascript:void(0);"
            @click="getLbtNewsInfo(item)"
            :title="item.title"
          >
            <img
              v-lazy="common.changeImgsrc(item.imgtitle)"
              @error="imgError"
              alt
            />
            <span v-cloak>{{ item.title | ellipsis(25) }}</span>
          </a>
        </li>
      </ul>
    </div>
    <div class="hd">
      <ul></ul>
    </div>
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
      lbtNewList: [],
      imgmtbd:
        "https://download.yxybb.com/project/MZ/resource/2020/11/23/imgmtbd.png"
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
          columname: this.newsItem.name
        },
        this.newsBack
      );
    },
    newsBack(data) {
      if (data && data.code == 0) {
        this.lbtNewList = data.data.newslist;
        this.$nextTick(function() {
          $("#slideBox").slide({
            titCell: ".hd ul",
            mainCell: ".bd ul",
            autoPage: true,
            effect: "left",
            autoPlay: true,
            delayTime: 500, //切换速度500
            interTime: 3000, // 3000, //每次切换间隔时间
            pnLoop: true //前后循环按钮
          });
        });
      }
    },
    getLbtNewsInfo(el) {
      this.$router.push({
        name: "sitenewsInfo",
        params: { define: this.routeDefine, id: el.id }
      });
    },
    imgError(el) {
      el.target.src = this.imgmtbd;
    }
  }
};
</script>

<style></style>
