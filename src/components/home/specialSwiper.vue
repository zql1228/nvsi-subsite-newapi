<template>
  <!-- 专题专栏轮播图组件 -->
  <ul class="row w">
    <li class="col v-m">
      <h2 class="block-title">专题专栏</h2>
      <div class="picScroll-left">
        <div class="hd">
          <a class="next"></a>
          <ul></ul>
          <a class="prev"></a>
          <span class="pageState"></span>
        </div>
        <div class="bd">
          <ul class="picList" @click="getLbtSpecial">
            <li
              v-for="(item, index) in ztzlNewList"
              :key="index"
              style="width:245px !important;"
              :data-index="index"
            >
              <div class="pic">
                <a href="javascript:void(0);">
                  <img
                    :src="common.changeImgsrc(item.imgpath)"
                    @error="imgError"
                    style="height:126px;width:100%"
                  />
                </a>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </li>
  </ul>
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
      ztzlNewList: [],
      imgmtbd:
        "https://download.yxybb.com/project/MZ/resource/2020/11/23/imgmtbd.png"
    };
  },
  mounted() {
    this.getList();
  },
  methods: {
    getList() {
      var areaInfo = this.$store.getters.getArea;
      this.utilscommit.requestapi(
        "listSpecialColumn",
        {
          type: "3",
          albx6209: areaInfo.areaid
        },
        this.newsBack
      );
    },
    newsBack(data) {
      if (data && data.code == 0) {
        this.ztzlNewList = data.data;
        this.$nextTick(function() {
          $(".picScroll-left").slide({
            titCell: ".hd ul",
            mainCell: ".bd ul",
            autoPage: true,
            effect: "left", //"leftLoop",
            autoPlay: false,
            delayTime: 500, //切换速度500
            interTime: 3000, //每次切换间隔时间
            vis: 4,
            trigger: "click",
            pnLoop: true //前后循环按钮
          });
        });
      }
    },
    getLbtSpecial(e) {
      //专题专栏轮播图-事件委托
      let el = e.target;
      let index = el.parentNode.parentNode.parentNode.getAttribute(
        "data-index"
      );
      if (el.localName != "img") index = el.getAttribute("data-index");
      this.getSpecial(this.ztzlNewList[index]);
    },
    getSpecial: function(el) {
      //专题专栏详情页
      window.open(el.albx6206);
    },
    imgError(el) {
      el.target.src = this.imgmtbd;
    }
  }
};
</script>
