<template>
  <div id="registerOrg">
    <div id="preButton1" style="display: none;margin-top: 20px;">
      <a href="javascript:void(0);" class="button" @click="preSelect"
        >返回上一级</a
      >
    </div>
    <div class="location">
      <span class="v-m" v-text="preName"></span>
    </div>
    <div class="category__content" id="first1">
      <a
        href="javascript:void(0);"
        class="category__item"
        v-for="(el, index) in firstList"
        :key="index"
        @click="firstChoose"
        :id="el.areaid"
        :title="el.areaname"
      >
        <span v-text="el.areaname"></span>
      </a>
    </div>
    <div class="category__content" id="second1" style="display: none;">
      <a
        href="javascript:void(0);"
        class="category__item"
        v-for="(el, index) in secondList"
        :key="index"
        @click="secondChoose"
        :id="el.areaid"
        :title="el.areaname"
      >
        <span v-text="el.areaname"></span>
      </a>
    </div>
    <div class="form t-c">
      <a href="javascript:void(0);" class="button" @click="onSelect"
        >确认选择</a
      >
    </div>
  </div>
</template>

<script>
export default {
  name: "registerOrg",
  data: function() {
    return {
      area: "",
      initAreaName: "全国",
      preName: "", //点击的区域名
      preAreaId: "", //点击的区域id
      chooseArea: "",
      firstList: {},
      first: {},
      secondList: {},
      second: {},
      type: 0,
      areaid: ""
    };
  },
  methods: {
    listArea: function(areaid, type) {
      //查询对应的下级区域
      this.type = type;
      this.areaid = areaid;
      this.utilscommit.requestapi(
        "getNextAreaListFortisWeb",
        { areaid: areaid },
        this.nextAreaBack
      );
    },
    nextAreaBack: function(result) {
      if (result && result.data) {
        if (this.type == 0) {
          this.firstList = this.common.orderBy(result.data, "areaid", "asc");
          $("#first1").css("display", "");
          $(".category__item").removeClass("active");
          if (this.areaid) {
            if (this.areaid == "000000000000000000") {
              this.preName = "全国";
              this.initAreaName = "全国";
            } else {
              this.utilscommit.requestapi(
                "listWebDocsFortisWeb",
                { areaid: this.areaid },
                this.docsInfoBack
              );
            }
          }
        } else {
          if (this.type > 0) {
            $("#preButton1").css("display", "");
          }
          if (this.type == 1) {
            $(".category__content").css("display", "none");
            $("#second1").css("display", "");
            this.secondList = result.data;
          }
        }
      } else {
        $(".category__item").removeClass("active");
        if (this.type == 1) {
          $("#" + this.first.areaid).addClass("active");
        } else if (this.type == 2) {
          $("#" + this.second.areaid).addClass("active");
        }
      }
    },
    docsInfoBack: function(result) {
      if (result && result.data) {
        this.preName = result.data.name;
        this.initAreaName = result.data.name;
      }
    },
    firstChoose: function(a) {
      this.preName = a.currentTarget.innerText;
      this.preAreaId = a.currentTarget.id;
      this.first.name = a.currentTarget.innerText;
      this.first.areaid = a.currentTarget.id;
      this.listArea(a.currentTarget.id, 1);
    },
    secondChoose: function(a) {
      this.preName = a.currentTarget.innerText;
      this.preAreaId = a.currentTarget.id;
      this.second.name = a.currentTarget.innerText;
      this.second.areaid = a.currentTarget.id;
      this.listArea(a.currentTarget.id, 2);
    },
    preSelect: function() {
      //返回上一级
      $(".category__item").removeClass("active");
      this.type = this.type - 1;
      var type = this.type;
      if (type >= 1) {
        $("#preButton1").css("display", "");
      } else {
        $("#preButton1").css("display", "none");
      }
      $(".category__content").css("display", "none");
      if (type == 1) {
        $("#second1").css("display", "");
        this.preName = this.first.name;
        this.preAreaId = this.first.areaid;
        this.second = {};
      } else {
        $("#first1").css("display", "");
        this.preName = this.initAreaName;
        this.preAreaId = "";
        this.first = {};
      }
    },
    onSelect: function() {
      //确认选择
      this.$parent.registerOrg(this.preAreaId, this.preName);
      $(".mask.loginorg").removeClass("active");
      $("#first1").css("display", "");
      $(".category__item").removeClass("active");
      this.first = {};
      this.second = {};
    }
  }
};
</script>
