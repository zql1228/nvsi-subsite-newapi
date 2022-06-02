<template>
  <div id="footers">
    <div class="footer">
      <div class="mid-layout row">
        <div class="col v-m" style="vertical-align: top; width: 840px">
          <div class="link-list">
            <span>友情链接：</span>
            <a
              v-for="item in yqljNewList"
              :key="item.id"
              :href="item.linkurl"
              :title="item.name"
              target="_blank"
              >{{ item.name }}</a
            >
          </div>
          <ul class="row w">
            <li
              class="col v-m t-l g-16"
              :class="{ 'g-18': $store.getters.getArea.cnname != '江苏' }"
            >
              <!--<p>ICP备案编号：京ICP备13012430号-7</p>-->
              <p>
                客服电话：4006818148转8<b style="margin-left: 35px"
                  >技术支持：深圳市永兴元科技股份有限公司</b
                >
              </p>
              <p>
                客服QQ群：922238617<b style="margin-left: 35px"
                  >推荐浏览器：<span
                    style="cursor: pointer; color: #fff"
                    title="点击下载谷歌浏览器稳定版"
                    @click="
                      toOpenUrl(
                        'https://baoku.360.cn/sinfo/104384025_4000914.html'
                      )
                    "
                    >谷歌浏览器（点击安装）</span
                  ></b
                >
              </p>
              <p>
                版权所有：中华人民共和国民政部<b style="margin-left: 35px"
                  >ICP备案编号：京ICP备13012430号
                </b>
              </p>
            </li>
            <li class="col v-m">
              <h2>浏览网站人数统计</h2>
              <div class="count">
                <span v-for="item in numList" :key="item.id"> {{ item }}</span>
              </div>
            </li>
          </ul>
        </div>
        <!-- <div class="col v-m t-c" style="width:17%;" v-if="$store.getters.getArea.cnname=='江苏'">
            <img style="width: 119px;height: 115px;" src="@/assets/img/js_erwei.png" alt="">
            <h2>扫码安装<br>“江苏政务服务”APP</h2>
          </div>
          <div class="col v-m t-c" style="width:17%;" v-if="$store.getters.getArea.cnname=='江苏'">
            <img style="width: 119px;height: 115px;" src="@/assets/img/zhiyuanzhe.jpg" alt="">
            <h2>扫码关注<br>“中国志愿服务网”微信公众号</h2>
          </div>  -->

        <!-- <div class="col v-m t-c" style="width:17%;" v-else>
            <img style="width: 119px;height: 115px;" src="@/assets/img/zhiyuanzhe.jpg" alt="">
            <h2>扫码关注<br>“中国志愿服务网”微信公众号</h2>
          </div>  -->
        <div style="width: 390px">
          <img
            style="margin-left: 38px"
            src="../assets/img/qrcode2.png"
            alt=""
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "footers",
  data: function() {
    return {
      yqljNewList: [],
      numList: ["0", "0", "0", "0", "0", "0", "0", "0"] //人数
    };
  },
  beforeCreate() {
    window.Vuef = this;
  },
  created() {
    this.getdatafooter();
  },
  methods: {
    getdatafooter() {
      // 获取友情链接
      this.utilscommit.requestapi(
        "listLinksFortisWeb",
        { areaid: this.$store.getters.getArea.areaid },
        this.callbackfooter1
      );

      let name = this.$route.params.define
        ? this.$route.params.define
        : this.$store.getters.getArea.enname;

      // 获取浏览量
      this.utilscommit.requestapi(
        "insertWebPageViewFortisWeb",
        { name: name },
        this.callbackfooter2
      );
    },
    callbackfooter1(data) {
      if (data && data.data) {
        this.yqljNewList = data.data;
      }
    },
    toOpenUrl(url) {
      //打开相关链接
      window.open(url);
    },
    callbackfooter2(data) {
      if (data && data.data) {
        this.pageViewCount(data.data.sum);
      }
    },
    pageViewCount(result, list) {
      //计算人数

      var re = result;
      if (re > 2147483648) {
        re = 2147483648; //int 长度限制没有改
      }
      var lists = list ? list : new Array();
      var num = parseInt(re / 10);
      lists.push(re % 10);
      if (num != 0) {
        this.pageViewCount(num, lists);
      } else {
        for (var m = 0; m < 8; m++) {
          if (m < lists.length && lists[m]) {
            this.$set(this.numList, 7 - m, lists[m]);
          }
        }
      }
    }
  }
};
</script>
