<template>
  <li class="col v-t white tab-container">
    <div class="tabbar tabbar-tight mb-20 row w">
      <span class="active col v-m">我的兑换</span>
    </div>
    <table class="user-table">
      <colgroup>
        <col width="20%">
        <col width="50%">
        <col width="30%">
      </colgroup>
      <tr>
        <th>兑换时长</th>
        <th>兑换信息</th>
        <th>兑换时间</th>
      </tr>
      <tr v-show="!list.length"><td colspan="3" style="text-align: center;border-bottom: 1px #F6F3F7;"><img src="../../assets/img/js-wujilu.png"/></td></tr>
      <tr v-for="(el,index) in list" :key="index">
        <td class="left">{{el.albx5203 | addZero}}</td>
        <td class="left">{{el.albx5204}}</td>
        <td class="left">{{el.albx5205 | ellipsisNos(10)}}</td>
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
    components : { paging},
    data(){
      return {
        list:{},//兑换列表
        tolCount:0,//总条数
        tolPage:0,//总页数
        pageSize:8,//每页条数
        pageNow:1,//当前页
        jumpPage:1
      };
    },
    created() {
      this.getList();
    },
    methods:{
      pageEvent:function(e){//分页
        this.getList();
      },
      getList() {
        this.utilscommit.request('nvsi_listMyExchange',{pageNow:this.pageNow,pageSize:this.pageSize},this.listBack)
      },
      listBack(result) {
        if(result && result.data) {
          this.list = result.data;
          this.common.getTolData(this,result);
        } else {
          this.list = {};
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



