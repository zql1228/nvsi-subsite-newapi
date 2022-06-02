<template>
  <li class="col v-t white  tab-container">
    <div class="tabbar tabbar-tight mb-20">
      <span class="active">我的评价</span>
    </div>
    <div class="tabbar-down">
      <table class="user-table">
        <colgroup>
          <col width="20%">
          <col width="10%">
          <col width="10%">
          <col width="10%">
          <col width="20%">
          <col width="20%">
          <col width="10%">
        </colgroup>
        <tr>
          <th>团体名称</th>
          <th>守时程度</th>
          <th>服务态度</th>
          <th>专业水平</th>
          <th>评价内容</th>
          <th>项目名称</th>
          <th>评价时间</th>
        </tr>
        <tr v-show="tolCount==0"><td colspan="7" style="text-align: center;border-bottom: 1px #F6F3F7;"><img src="../../assets/img/js-wujilu.png"/></td></tr>
        <tr v-for="(el,index) in evaluateList" :key="index">
          <td class="left "><em class="pointer" @click="$utilroutes.toGroupInfo(el.groupid,el.albe0012)" v-text="el.albe0002"></em></td>
          <td class="left">
            <span>{{el.albx0463}}</span>
          </td>
          <td class="left">{{el.albx0464}}</td>
          <td class="left">{{el.albx0465}}</td>
          <td class="left">{{el.albx0468| ellipsis(23)}}</td>
          <td class="left" ><em class="pointer" @click="$utilroutes.toProjectInfo(el.projectid,el.albx0021)" v-text="el.albx0002"></em></td>
          <td class="left">{{el.albx0466| ellipsisNos(10)}}</td>
        </tr>
      </table>
    </div>
    <paging :pageCount="tolPage"
            :rangePage="pageSize"
            :initPage="pageNow"
            :totals="tolCount"
            :val="jumpPage"
            @pageEvent="pageEvent">
    </paging>
  </li>
</template>

<script>
  const paging =()=>import('@/components/page/paginationRed.vue');//分页

  export default {
    components : { paging},
    data(){
      return {
        routeDefine: this.$route.params.define,
        evaluateList:{},//评价列表
        tolCount:0,//总条数
        tolPage:0,//总页数
        pageSize:8,//每页条数
        pageNow:1,//当前页
        jumpPage:1
      };
    },
    created() {
      //window.Vues = this;//主体vue实例挂载
      this.getList();
    },
    /* mounted() {
      this.setData();
    }, */
    methods:{
     /*  setData:function () {
        $('.tabbar span').each(function (idx, el) {
          if(Vues.type) {
            $(el).removeClass('active');
            if(idx == Vues.type){
              $(el).addClass('active');
            }
            $('.tabbar-down').eq(Vues.type).show().siblings('.tabbar-down').hide();
          }
          $(el).click(function () {
            Vues.type = idx;
            if (idx == 1 || idx == 2){//刷新最新报名和时长公示
              Vues.pageNow = 1;
              Vues.getList();
            }
            $(this).addClass('active').siblings().removeClass('active');
            $('.tabbar-down').eq(idx).show().siblings('.tabbar-down').hide();
          })
        })
      }, */
      pageEvent:function(e){//分页
        this.getList();
      },
      getList:function () {//我的评价列表
        this.utilscommit.request('nvsi_getVolEvaluate',{pageNow:this.pageNow,pageSize:this.pageSize},this.evaluateListBack);
      },
      evaluateListBack(result) {
        if(result && result.data && result.data.evaluatelist) {
          this.evaluateList = result.data.evaluatelist.data;
         /*  this.tolCount = result.data.evaluatelist.count;
          this.tolPage = Math.ceil(result.data.evaluatelist.count / this.pageSize); */
          // this.tolCount = result.data.evaluatelist.datacount;
          // this.tolPage = result.data.evaluatelist.pagecount;
          this.common.getTolData(this,result.data.evaluatelist);
        } else {
          this.evaluateList = {};
          this.common.getTolData(this);
        }
      },
    }
  }

</script>

<style scoped>
  .user-table th{
    text-align: left;
    padding: 10px;
  }
</style>



