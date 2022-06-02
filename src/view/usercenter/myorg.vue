<template>
  <li class="col v-t white tab-container">
    <div class="tabbar tabbar-tight mb-20 row w">
      <span class="col v-m active">我的队伍</span>
      <span class="col v-m">待定队伍</span>
      <span class="col v-m">脱离记录</span>
      <div class="col v-m t-r">
        <a
          class="button button-normal"
          href="javascript:void(0);"
          @click="getOrg"
          >队伍同步</a
        >
        <router-link
          tag="a"
          v-show="this.$store.getters.getArea.cnname != '税收'"
          class="button button-normal"
          href="javascript:void(0);"
          :to="{ name: 'group', params: { define: routeDefine } }"
          >参加更多队伍</router-link
        >
      </div>
    </div>
    <!-- 已加入队伍 -->
    <div v-if="nowIndex == 1">
      <JoinedList></JoinedList>
    </div>
    <!-- 待定队伍 -->
    <div v-if="nowIndex == 2">
      <PendingList></PendingList>
    </div>
    <!-- 脱离队伍 -->
    <div v-if="nowIndex == 4">
      <QuitList></QuitList>
    </div>
  </li>
</template>

<script>
const JoinedList = () => import("@/components/MyGroup/JoinedList.vue"); // 已加入列表
const PendingList = () => import("@/components/MyGroup/PendingList.vue"); // 待定列表
const QuitList = () => import("@/components/MyGroup/QuitList.vue");

export default {
  components: { JoinedList, PendingList, QuitList },
  data() {
    return {
      routeDefine: this.$route.params.define,
      nowIndex: 1, //下标
    };
  },
  created() {
    window.Vues = this
  },
  mounted() {
    this.setData();
  },
  methods: {
    // tab点击事件
    setData() {
      $(".tabbar span").each((idx, el) => {
        if (this.nowIndex) {
          $(el).removeClass("active");
          var nowidx = 0;
          if (this.nowIndex == 4) nowidx = 1;
          if (idx == nowidx) {
            $(el).addClass("active");
          }
          $(".user-table").eq(nowidx).show().siblings(".user-table").hide();
        }
        $(el).click(function() {
          if (idx == 0) Vues.nowIndex = 1; // 已加入
          if (idx == 1) Vues.nowIndex = 2; // 待加入
          if (idx == 2) Vues.nowIndex = 4; // 已脱离
          $(this).addClass("active").siblings().removeClass("active");
          $(".user-table").eq(idx).show().siblings(".user-table").hide();
        });
      });
    },
    // 同步队伍
    getOrg() {
      if (this.basicInfo) {
        let id = this.basicInfo.id;
        this.utilscommit.request(
          "nvsi_findOldOrg",
          { albx0053: id },
          this.getOrgConfirmBack
        );
      }
    },
    // 同步队伍回调
    getOrgConfirmBack(res) {
      if (res.data) {
        this.$swal("同步成功", { buttons: "确定" });
      } else {
        this.$swal(res.message, { buttons: "确定" });
      }
    },
  },
  watch: {
    nowIndex(newval, oldval) {
      //监听tab页面
      this.pageNow = 1;
    },
  },
};
</script>

<style scoped>
.user-table th {
  text-align: left;
  padding: 10px;
}
</style>
