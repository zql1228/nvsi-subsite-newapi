<template>
  <li class="col v-t white tab-container">
    <div class="tabbar tabbar-tight mb-20 row w">
      <span class="active col v-m">我的表彰</span>
    </div>
    <table class="user-table">
      <colgroup>
        <col width="20%">
        <col width="20%">
        <col width="20%">
        <col width="20%">
        <col width="20%">
      </colgroup>
      <tr>
        <th>获奖日期</th>
        <th>表彰奖励名称</th>
        <th>颁发者</th>
        <th>奖励文书名称及文号</th>
        <th>奖励内容</th>
      </tr>
      <tr v-if="!commendList.length"><td colspan="5" style="text-align: center;border-bottom: 1px #F6F3F7;"><img src="../../assets/img/js-wujilu.png"/></td></tr>
      <tr v-for="(el,index) in commendList" :key="index">
        <td class="left" v-if="el.albx0353">{{el.albx0353 | ellipsisNos(10)}}</td>
        <td class="left">{{el.albx0352}}</td>
        <td class="left">{{el.albe0002}}</td>
        <td class="left">{{el.albx0355}}</td>
        <td class="left">{{el.albx0356}}</td>
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
        commendList:{},//求证列表
        tolCount:0,//总条数
        tolPage:0,//总页数
        pageSize:8,//每页条数
        pageNow:1,//当前页
        jumpPage:1
      };
    },
    created() {
      this.getCommendList();
    },
    methods:{
      pageEvent:function(e){//分页
        this.getCommendList();
      },
      getCommendList() {
        this.utilscommit.request('nvsi_listVolCommend',{pageNow:this.pageNow,pageSize:this.pageSize},this.commendListBack)
      },
      commendListBack(result) {
        if(result && result.data) {
          this.commendList = result.data;
          this.common.getTolData(this,result);
        } else {
          this.commendList = {};
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



