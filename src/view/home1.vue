<template>
  <div id="homebody">
    <!--中间部分内容-->
    <div class="js-bg-img">
      <div class="mid-layout">
        <div class="grid">
          <!-- 循环生成多少行 -->
          <div class="my_grid" v-for="(item, index) in layoutList" :key="index">
            <!-- 循环生成多少列 -->
            <div
              class="grid-item my_grid_item"
              v-for="(el, index1) in item.cols"
              :key="index1"
              :style="{ width: el.width }"
            >
              <component
                :is="el.componentname"
                :newsItem="el.columnlist[0]"
              ></component>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import banner from "@/components/home/banner";
import functionButton from "@/components/home/function";
import loginButton from "@/components/home/loginButton";
import newsList from "@/components/home/newsList";
import special from "@/components/home/specialSwiper";
import swiper from "@/components/home/swiper";
export default {
  name: "homebody",
  components: {
    banner,
    newsList,
    functionButton,
    loginButton,
    special,
    swiper
  },
  data: function() {
    return {
      layoutList: [] //首页布局
    };
  },
  created() {
    this.getdate();
  },
  methods: {
    getdate() {
      let id = this.$store.getters.getLayoutid;
      this.utilscommit.requestapi(
        "getIndexLayout",
        { layoutid: id },
        this.dataBack
      );
    },
    dataBack(res) {
      if (res && res.code == 0) {
        let rows = res.data.left.rows;
        rows.forEach(element => {
          if (element.proportion) {
            //通过比例计算每列宽度
            let list = element.proportion.split(":");
            let sum = 0;
            for (let i = 0; i < list.length; i++) {
              sum = sum + parseInt(list[i]);
            }
            let proportionList = [];
            for (let j = 0; j < list.length; j++) {
              proportionList.push((list[j] / sum) * 100 + "%");
            }
            element.cols.forEach((el, index) => {
              el.width = proportionList[index]; //当前列的宽度
            });
          }
        });
        this.layoutList = rows;
      }
    }
  }
};
</script>

<style scoped>
.my_grid {
  width: 100%;
  margin: 0 -15px;
}
.my_grid_item {
  margin-top: 20px;
  padding: 0 15px;
}
</style>
