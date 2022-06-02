<template>
  <div id="areaDialog">
    <div id="preButton" style="display: none;margin-top: 20px;">
      <a href="javascript:void(0);" class="button" @click="preSelect"
        >返回上一级</a
      >
    </div>
    <div class="location">
      <span class="v-m" v-text="preName"></span>
    </div>
    <div class="category__content" id="first">
      <a
        href="javascript:void(0);"
        class="category__item"
        v-for="(el, index) in firstList"
        @click="firstChoose"
        :id="el.areaid"
        :title="el.areaname"
        :key="index"
      >
        <span v-text="el.areaname"></span>
      </a>
    </div>
    <div class="category__content" id="second" style="display: none;">
      <a
        href="javascript:void(0);"
        class="category__item"
        v-for="(el, index) in secondList"
        @click="secondChoose"
        v-bind:id="el.areaid"
        v-bind:title="el.areaname"
        :key="index"
      >
        <span v-text="el.areaname"></span>
      </a>
    </div>
    <div class="category__content" id="third" style="display: none;">
      <a
        href="javascript:void(0);"
        class="category__item"
        v-for="(el, index) in thirdList"
        @click="thirdChoose"
        v-bind:id="el.areaid"
        v-bind:title="el.areaname"
        :key="index"
      >
        <span v-text="el.areaname"></span>
      </a>
    </div>
    <div class="category__content" id="fourth" style="display: none;">
      <a
        href="javascript:void(0);"
        class="category__item"
        v-for="(el, index) in fourthList"
        @click="fourthChoose"
        v-bind:id="el.areaid"
        v-bind:title="el.areaname"
        :key="index"
      >
        <span v-text="el.areaname"></span>
      </a>
    </div>
    <div class="category__content" id="fifth" style="display: none;">
      <a
        href="javascript:void(0);"
        class="category__item"
        v-for="(el, index) in fifthList"
        @click="fifthChoose"
        v-bind:id="el.areaid"
        v-bind:title="el.areaname"
        :key="index"
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
  name: "areaDialog",
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
      thirdList: {},
      third: {},
      fourthList: {},
      fourth: {},
      fifthList: {},
      fifth: {},
      type: 0,
      areaid: "",
      isRestriction: 2, //限制级别，1-省级 2-市级 3-区县级 4街道级 5村居级
      areaCityList: "50,31,12,11" //直辖市区域编号前两位 （重庆市、上海市、天津市、北京市） 
    };
  },
  created() {},
  methods: {
    listArea: function(areaid, type, isRestriction) {
      //查询对应的下级区域
      this.type = type;
      this.areaid = areaid;
      if (isRestriction) this.isRestriction = isRestriction;
      //console.log(areaid,type)
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
          $("#first").css("display", "");
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
            $("#preButton").css("display", "");
          }
          if (this.type == 1) {
            $(".category__content").css("display", "none");
            $("#second").css("display", "");
            this.secondList = result.data;
          } else if (this.type == 2) {
            $(".category__content").css("display", "none");
            $("#third").css("display", "");
            this.thirdList = result.data;  
          } else if (this.type == 3) {
            this.fourthList = result.data;
            $(".category__content").css("display", "none");
            $("#fourth").css("display", "");
          } else if (this.type == 4) {
            this.fifthList = result.data;
            $(".category__content").css("display", "none");
            $("#fifth").css("display", "");
          }
        }
      } else {
        $(".category__item").removeClass("active");
        if (this.type == 1) {
          $("#" + this.first.areaid).addClass("active");
        } else if (this.type == 2) {
          $("#" + this.second.areaid).addClass("active");
        } else if (this.type == 3) {
          $("#" + this.third.areaid).addClass("active");
        } else if (this.type == 4) {
          $("#" + this.fourth.areaid).addClass("active");
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

      if (
        this.isRestriction == 1 ||
        a.currentTarget.id == "100000000000000000"
      ) {
        $(".category__item").removeClass("active");
        $("#" + this.first.areaid).addClass("active");
      } else {
        this.listArea(a.currentTarget.id, 1);
      }
    },
    secondChoose: function(a) {
      this.preName = a.currentTarget.innerText;
      this.preAreaId = a.currentTarget.id;
      this.second.name = a.currentTarget.innerText;
      this.second.areaid = a.currentTarget.id;
      let isRestriction = this.isRestriction;
      if (this.areaCityList.indexOf(this.preAreaId.substring(0, 2)) > 0)
        isRestriction = this.isRestriction - 1; //为直辖市
      if (isRestriction == 2) {
        $(".category__item").removeClass("active");
        $("#" + this.second.areaid).addClass("active");
      } else {
        this.listArea(a.currentTarget.id, 2);
      }
    },
    thirdChoose: function(a) {
      this.preName = a.currentTarget.innerText;
      this.preAreaId = a.currentTarget.id;
      this.third.name = a.currentTarget.innerText;
      this.third.areaid = a.currentTarget.id;
      let isRestriction = this.isRestriction;
      if (this.areaCityList.indexOf(this.preAreaId.substring(0, 2)) > 0)
        isRestriction = this.isRestriction - 1; //为直辖市
      if (isRestriction == 3) {
        $(".category__item").removeClass("active");
        $("#" + this.third.areaid).addClass("active");
      } else {
        this.listArea(a.currentTarget.id, 3);
      }
    },
    fourthChoose: function(a) {
      this.preName = a.currentTarget.innerText;
      this.preAreaId = a.currentTarget.id;
      this.fourth.name = a.currentTarget.innerText;
      this.fourth.areaid = a.currentTarget.id;
      if (this.isRestriction == 4) {
        $(".category__item").removeClass("active");
        $("#" + this.fourth.areaid).addClass("active");
      } else {
        this.listArea(a.currentTarget.id, 4);
      }
    },
    fifthChoose: function(a) {
      this.preName = a.currentTarget.innerText;
      this.preAreaId = a.currentTarget.id;
      this.fifth.name = a.currentTarget.innerText;
      this.fifth.areaid = a.currentTarget.id;
      $(".category__item").removeClass("active");
      $("#" + this.fifth.areaid).addClass("active");
    },
    preSelect: function() {
      //返回上一级
      $(".category__item").removeClass("active");
      this.type = this.type - 1;
      var type = this.type;
      if (type >= 1) {
        $("#preButton").css("display", "");
      } else {
        $("#preButton").css("display", "none");
      }
      $(".category__content").css("display", "none");
      if (type == 4) {
        $("#fifth").css("display", "");
        this.preName = this.fourth.name;
        this.preAreaId = this.fourth.areaid;
        this.fifth = {};
      } else if (type == 3) {
        $("#fourth").css("display", "");
        this.preName = this.third.name;
        this.preAreaId = this.third.areaid;
        this.fourth = {};
      } else if (type == 2) {
        $("#third").css("display", "");
        this.preName = this.second.name;
        this.preAreaId = this.second.areaid;
        this.third = {};
      } else if (type == 1) {
        $("#second").css("display", "");
        this.preName = this.first.name;
        this.preAreaId = this.first.areaid;
        this.second = {};
      } else {
        $("#first").css("display", "");
        this.preName = this.initAreaName;
        this.preAreaId = "";
        this.first = {};
      }
    },
    onSelect: function() {
      //确认选择
      this.$parent.confirmArea(this.preAreaId);
      $(".mask").removeClass("active");
      $("#first").css("display", "");
      $(".category__item").removeClass("active");
      this.first = {};
      this.second = {};
      this.third = {};
      this.fourth = {};
      this.fifth = {};
    }
  }
};
</script>
