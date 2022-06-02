<template>
  <!-- banner组件 -->
  <a href="javascript:void(0);" @click="getSpecial(hotImg)" class="pointer">
    <img
      :src="common.changeImgsrc(hotImg.imgpath)"
      class="w"
      width="1200"
      height="115.7"
      alt
    />
  </a>
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
      hotImg: []
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
          type: "1",
          albx6209: areaInfo.areaid
        },
        this.newsBack
      );
    },
    newsBack(data) {
      if (data && data.code == 0) {
        this.hotImg = data.data[0];
      }
    },
    getSpecial(el) {
      window.open(el.albx6206);
    }
  }
};
</script>

<style></style>
