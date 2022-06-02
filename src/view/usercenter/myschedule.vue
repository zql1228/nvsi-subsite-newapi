<template>
  <li class="col v-t white tab-container">
    <div class="tabbar tabbar-tight mb-20 row w">
      <span class="col v-m">我的排班</span>
    </div>
    <table class="user-table">
      <colgroup>
        <col width="10%">
        <col width="10%">
        <col width="10%">
        <col width="20%">
        <col width="30%">
        <col width="20%">
      </colgroup>
      <tr>
        <th>状态</th>
        <th>开始日期</th>
        <th>结束日期</th>
        <th>排班内容</th>
        <th>项目名称</th>
        <th>联系方式</th>
      </tr>
      <tr v-show="!scheduleList.length"><td colspan="6" style="text-align: center;border-bottom: 1px #F6F3F7;"><img src="../../assets/img/js-wujilu.png"/></td></tr>
      <tr v-for="(el,index) in scheduleList" :key="index">
        <td class="left"><em>{{el.state}}</em></td>
        <td class="left">{{el.albx0257 | ellipsisNos(10)}}</td>
        <td class="left">{{el.albx0258 | ellipsisNos(10)}}</td>
        <td class="left">{{el.albx0252}}</td>
        <td class="left">
          <em class="pointer" :title="el.albx0002" @click="$utilroutes.toProjectInfo(el.projectid,el.albx0021)">{{el.albx0002 | ellipsis(18)}}</em><br>
          <p class="pointer" :title="el.albe0002" @click="$utilroutes.toGroupInfo(el.groupid,el.albe0012)">{{el.albe0002 | ellipsis(18)}}</p>
        </td>
        <td class="left">
          <p>
            <span>{{el.albx0025}}</span>
            <span style="margin: 0 6px">{{(el.albx0027 == '1' && (el.albx0026)) || (el.albx0029 == '1' && (el.albx0028)) || ''}}</span>
          </p>
          <p>{{el.albx0030}}</p>
        </td>
      </tr>
    </table>
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
    components : {paging},
    data(){
      return {
        routeDefine: this.$route.params.define,
        scheduleList:{},//排班列表
        tolCount:0,//总条数
        tolPage:0,//总页数
        pageSize:8,//每页条数
        pageNow:1,//当前页
        jumpPage:1
      };
    },
    created() {
      this.getScheduleList();
    },
    methods:{
      pageEvent:function(e){//分页
        this.getScheduleList();
      },
      getScheduleList() {
        this.utilscommit.request('nvsi_listVolSchedule',{pageNow:this.pageNow,pageSize:this.pageSize},this.scheduleListBack)
      },
      scheduleListBack(result) {
        if(result && result.data) {
          this.scheduleList = result.data;
         this.common.getTolData(this,result);
        } else {
          this.scheduleList = {};
          this.common.getTolData(this);
        }
      }
    }
  }

</script>

<style scoped>
  .user-table th{
    text-align: left;
    padding: 10px;
  }
</style>



