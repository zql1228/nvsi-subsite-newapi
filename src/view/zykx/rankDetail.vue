<template>
  <div>
    <div class="main bannerimg">
      <div class="mid">
        <ul class="row w">
          <li class="col">
            <div class="router">
              <span>当前位置：</span>
              <a href="javascript:void(0);"
                ><router-link tag="span" :to="{ name: 'home' }"
                  >首页</router-link
                ></a
              >
              <span>统计分析</span>
            </div>
          </li>
        </ul>

        <h2 class="font">贵州省志愿服务数据(每日更新)</h2>
        <table class="table">
          <colgroup>
            <col width="30%" />
            <col width="20%" />
            <col width="10%" />
            <col width="20%" />
            <col width="20%" />
          </colgroup>
          <tr>
            <th>地市</th>
            <th>志愿者</th>
            <th>时长总数</th>
            <th>志愿队伍</th>
            <th>志愿项目</th>
          </tr>
          <tr v-for="(item, index) in list" :key="index">
            <td v-text="item.cityname || 0"></td>
            <td v-text="item.volnum || 0"></td>
            <td v-text="item.timenum || 0"></td>
            <td v-text="item.groupnum || 0"></td>
            <td v-text="item.projectnum || 0"></td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: []
    };
  },
  mounted() {
    if (sessionStorage.getItem("rankList")) {
      this.list = JSON.parse(sessionStorage.getItem("rankList"));
    }
  },
  beforeDestroy() {
    sessionStorage.removeItem("rankList");
  }
};
</script>

<style scoped>
.font {
  text-align: center;
}
.table th,
.table td {
  border: 1px solid #ddd;
}
</style>
