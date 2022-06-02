<template>
  <li class="col v-t white">
      <div class="tabbar tabbar-tight mb-20 row w">
        <span class="col v-m">我的求证</span>
      </div>
      <table class="user-table">
        <colgroup>
          <col width="35%">
          <col width="35%">
          <col width="10%">
          <col width="20%">
        </colgroup>
        <tr>
          <th>求助信息</th>
          <th>求证内容</th>
          <th>状态</th>
          <th>求证时间</th>
        </tr>
        <tr v-if="!provingList.length"><td colspan="4" style="text-align: center;border-bottom: 1px #F6F3F7;"><img src="../../assets/img/js-wujilu.png"/></td></tr>
        <tr v-for="(el,index) in provingList" :key="index">
          <td class="left"><em class="pointer" :title="el.albx0372" @click="toHelpDetail(el.helpid,el.albx0374)">{{el.albx0372 | ellipsis(23)}}</em></td>
          <td class="left">{{el.albx0274}}</td>
          <td class="left"><i>{{(el.albx0273=='1' && '真实') || (el.albx0273=='0' && '虚假')}}</i></td>
          <td class="left" v-if="el.albx0275">{{el.albx0275 | ellipsisNos(10)}}</td>
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
    name: 'myproving',
    components : { paging},
    data(){
      return {
        routeDefine: this.$route.params.define,
        //userInfo:this.$store.getters.getUser,//账户信息
        //basicInfo:this.$store.getters.getBasic,//用户信息
        provingList:{},//求证列表
        tolCount:0,//总条数
        tolPage:0,//总页数
        pageSize:8,//每页条数
        pageNow:1,//当前页
        jumpPage:1
      };
    },
    created() {
      this.getProvingList();
    },
    methods:{
      pageEvent:function(e){//分页
        this.getProvingList();
      },
      getProvingList() {
        this.utilscommit.request('nvsi_listProvingInfo',{pageNow:this.pageNow,pageSize:this.pageSize},this.provingListBack)
      },
      provingListBack(result) {
        if(result) {
          this.provingList = result.result;
          this.tolCount = result.count;
          this.tolPage = Math.ceil(result.count / this.pageSize);
        } else {
          this.provingList = {};
          this.common.getTolData(this);
        }
      },
      toHelpDetail(helpid,areaid) {
        window.open(this.$router.resolve({ name:'helpInfo',params:{define:this.routeDefine,data1:helpid,data2:areaid}}).href);
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



