<template>
  <div id="home_list" class="grid-item">
    <div
      v-for="el in modularList.filter(obj => obj.positionindex == modularType)"
      :key="el.id"
    >
      <div class="title">
        <img src="../assets/img/icon_title.png" alt="" />
        <h2 class="label">
          <span class="active" v-text="ellipsis(el.resourcename, 9)"></span>
        </h2>
        <a href="javascript:void(0);" class="more" @click="toNewsMore(el)"
          >更多</a
        >
      </div>
      <ul
        class="list"
        :class="{ small: modularType != 2 }"
        v-if="el.news.newslist"
      >
        <li
          class="row w"
          v-for="(item, index) in el.news.newslist"
          :key="item.id"
        >
          <div class="col v-m" v-show="modularType == 2">
            <span class="num">{{ index + 1 }}</span>
          </div>
          <div class="col v-m" style="text-align: unset">
            <a
              href="javascript:void(0);"
              class="label"
              :title="item.title"
              @click="getNewsInfoMore(item)"
            >
              <span class="dot" v-show="modularType != 2"></span>
              <span class="istops" v-if="item.istop == 1">置顶</span>
              {{ item.title | ellipsis(titlelength) }}
            </a>
          </div>
          <div class="col v-m" v-show="modularType == 2">
            <span class="time">{{ item.entrytime | ellipsisNos(10) }}</span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "home_list",
  props: ["modularList", "modularType", "titlelength"],
  methods: {
    toNewsMore: function(el) {
      this.$router.push({
        name: "sitenews",
        params: {
          define: this.$route.params.define,
          name: el.name
        }
      });
    },
    getNewsInfoMore(item) {
      this.$router.push({
        name: "sitenewsInfo",
        params: { define: this.$route.params.define, id: item.id }
      });
    }
  }
};
</script>
