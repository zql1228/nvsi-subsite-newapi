<template>
  <div id="cpaginate">
    <div class="pages" v-if="totals">
      <a
        href="javascript:void(0);"
        class="pages-btn"
        @click="pageEvent(1)"
        :class="{ disabled: initPage == 1 }"
        >首页</a
      >
      <a
        href="javascript:void(0);"
        class="pages-btn"
        @click="pageEvent(initPage - 1)"
        :class="{ disabled: initPage == 1 }"
        >上一页</a
      >
      <a
        href="javascript:void(0);"
        v-for="(showpage, key) in snewPages"
        @click="pageEvent(showpage)"
        :key="key"
        :class="{ active: showpage == initPage }"
        >{{ showpage }}</a
      >
      <a
        href="javascript:void(0);"
        class="pages-btn"
        @click="pageEvent(initPage + 1)"
        :class="{ disabled: initPage >= pageCount }"
        >下一页</a
      >
      <a
        href="javascript:void(0);"
        class="pages-btn"
        @click="pageEvent(pageCount)"
        :class="{ disabled: initPage == pageCount }"
        >尾页</a
      >
      <span>第</span>
      <input type="text" v-model.number="values" />
      <span>页</span>
      <a href="javascript:void(0);" class="pages-btn" @click="pageEvent(values)"
        >跳转</a
      >
      <span>{{ initPage }}/{{ pageCount }}页 共{{ totals }}条</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "cpaginate",
  data() {
    return {
      values: this.val,
    };
  },
  props: {
    pageCount: { type: Number }, //总页数
    rangePage: { type: Number }, //每页条数
    initPage: { type: Number }, //当前页
    totals: { type: Number }, //总条数
    val: { default: 0 }, //当前值
  },
  computed: {
    snewPages: function () {
      //展示7个分页栏
      var left = 1;
      var right = this.pageCount;
      var ar = [];
      if (this.pageCount >= 7) {
        if (this.initPage > 4 && this.initPage < this.pageCount - 3) {
          left = this.initPage - 3;
          right = this.initPage + 3;
        } else {
          if (this.initPage <= 4) {
            left = 1;
            right = 7;
          } else {
            right = this.pageCount;
            left = this.pageCount - 6;
          }
        }
      }
      while (left <= right) {
        ar.push(left);
        left++;
      }
      return ar;
    },
    //分页
    indexs: function () {
      //展示5个分页栏
      var left = 1;
      var right = this.pageCount;
      var ar = [];
      if (this.pageCount >= 5) {
        if (this.initPage > 3 && this.initPage < this.pageCount - 2) {
          left = this.initPage - 2;
          right = this.initPage + 2;
        } else {
          if (this.initPage <= 3) {
            left = 1;
            right = 5;
          } else {
            right = this.pageCount;
            left = this.pageCount - 4;
          }
        }
      }
      while (left <= right) {
        ar.push(left);
        left++;
      }
      return ar;
    },
  },
  methods: {
    pageEvent: function (e) {
      if (e > this.pageCount) {
        this.$parent.pageNow = this.pageCount;
      } else if (e < 1) {
        this.$parent.pageNow = 1;
      } else {
        this.$parent.pageNow = e;
      }
      console.log(e);
      this.$emit("pageEvent", e); //将值放在自定义的事件函数中作为参数
    },
  },
  watch: {
    initPage: function (val, oldVal) {
      //监听路由是否变化
      if (val != oldVal) {
        this.values = val;
      }
    },
  },
};
</script>

<style scoped>
.disabled {
  display: none !important;
}
</style>
