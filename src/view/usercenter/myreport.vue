<template>
  <li class="col v-t white tab-container">
    <div class="tabbar tabbar-tight mb-20 row w">
      <span class="col v-m active">我被投诉</span><!-- 别人投诉我的消息 -->
      <span class="col v-m">时长举报</span><!-- 我举报别人的消息 -->
    </div>
    <div class="tabbar-down">
    <table class="user-table">
      <colgroup>
        <col width="15%">
        <col width="25%">
        <col width="20%">
        <col width="25%">
        <col width="15%">
        <!--<col width="15%">-->
      </colgroup>
      <tr>
        <th>投诉时间</th>
        <th>投诉内容</th>
        <th>处理时间</th>
        <th>回复内容</th>
        <th>受理者</th>
        <!--<th>操作</th>-->
      </tr>
      <tr v-show="!reportList.length"><td colspan="5" style="text-align: center;border-bottom: 1px #F6F3F7;"><img src="../../assets/img/js-wujilu.png"/></td></tr>
      <tr v-for="(el,index) in reportList" :key="index">
        <td class="left">{{el.albx3709 | ellipsisNos(10)}}</td>
        <td class="left">{{el.albx3710}}</td>
        <td class="left">{{(el.albx3711 | ellipsisNos(10) )|| '--'}}</td>
        <td class="left">{{el.albx3712 || '--'}}</td>
        <td class="left">{{el.albx3715 }}</td>
        <!--<td><a href="javascript:void(0);" :on-click="@delete($event,el.id)"><em>删除</em></a></td>-->
      </tr>
    </table>
    <paging :pageCount="tolPage"
            :rangePage="pageSize"
            :initPage="pageNow"
            :totals="tolCount"
            :val="jumpPage"
            @pageEvent="pageEvent">
    </paging>
    </div>
    <div class="tabbar-down" style="display:none;">
    <table class="user-table">
      <colgroup>
        <col width="15%">
        <col width="25%">
        <col width="20%">
        <col width="25%">
        <col width="15%">
        <!--<col width="15%">-->
      </colgroup>
      <tr>
        <th>时长</th>
        <th>举报理由</th>
        <th>所属团体</th>
        <th>所属项目</th>
        <th>举报日期</th>
        <!--<th>操作</th>-->
      </tr>
      <tr v-show="!reportList.length"><td colspan="5" style="text-align: center;border-bottom: 1px #F6F3F7;"><img src="../../assets/img/js-wujilu.png"/></td></tr>
      <tr v-for="(el,index) in reportList" :key="index">
        <td class="left">{{el.albx0172 | addZero}}</td>
        <td class="left">{{el.albx0344}}</td>
        <td class="left"><em class="pointer" :title="el.albe0002" @click="$utilroutes.toGroupInfo(el.albx0339,el.albe0012)">{{el.albe0002 | ellipsis(18)}}</em></td>
        <td class="left"><em class="pointer" :title="el.albx0002" @click="$utilroutes.toProjectInfo(el.albx0348,el.albx0021)">{{el.albx0002 | ellipsis(18)}}</em></td>
        <td class="left" v-if="el.albx0349">{{el.albx0349 | ellipsisNos(10)}}</td>
        <!--<td><a href="javascript:void(0);" :on-click="@delete($event,el.id)"><em>删除</em></a></td>-->
      </tr>
    </table>
    <paging :pageCount="tolPage"
            :rangePage="pageSize"
            :initPage="pageNow"
            :totals="tolCount"
            :val="jumpPage"
            @pageEvent="pageEvent">
    </paging>
    </div>
  </li>
</template>

<script>
  const paging =()=>import('@/components/page/paginationRed.vue');//分页

  export default {
    components : { paging},
    data(){
      return {
        routeDefine: this.$route.params.define,
        nowIndex:0,//页面展示   0=我的投诉  1=时长举报
        //userInfo:this.$store.getters.getUser,//账号信息
        //basicInfo:this.$store.getters.getBasic,//志愿者信息
        reportList:[],//举报列表
        tolCount:0,//总条数
        tolPage:0,//总页数
        pageSize:8,//每页条数
        pageNow:1,//当前页
        jumpPage:1
      };
    },
    created() {
      window.Vues = this;//主体vue实例挂载
      this.getReportList();
    },
    mounted() {
      this.setData();

    },
    methods:{
      setData:function () {
        $('.tabbar span').each(function (idx, el) {
          $(el).click(function () {
            Vues.nowIndex = idx;
            $(this).addClass('active').siblings().removeClass('active');
            $('.tabbar-down').eq(idx).show().siblings('.tabbar-down').hide();
          })
        });
      },
      pageEvent:function(e){//分页
        this.getReportList();
      },
      getReportList() {
         if(this.nowIndex==0){//我的投诉
           this.utilscommit.request('nvsi_listMyComplaint',{pageNow:this.pageNow,pageSize:this.pageSize},this.reportListBack)
         }else if(this.nowIndex==1){//我的举报
            this.utilscommit.request('nvsi_listMyInform',{pageNow:this.pageNow,pageSize:this.pageSize},this.reportListBack)
         }
      },
      reportListBack(result) {
        if(result && result.data) {
          this.reportList = result.data;
          this.common.getTolData(this,result);
        } else {
          this.reportList = {};
          this.common.getTolData(this);
        }
      }
    },
    watch: {
      nowIndex: function(newval, oldval) { //监听tab页面
        //刷新列表
        this.common.getTolData(this);
        this.reportList=[];
        this.getReportList();
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



