<template>
   <li class="col v-t white tab-container">
    <div class="tabbar tabbar-tight mb-20 row w">
      <span class="col v-m" :class="{active:showTab==true}" @click="changeTab('pro')">项目动态</span>
      <span class="col v-m" :class="{active:showTab==false}" @click="changeTab('my')">我的评论</span>
    </div>
    <!-- 项目动态 -->
    <table class="user-table" :class="{hide:showTab==false}">
      <colgroup>
        <col width="30%">
        <col width="45%">
        <col width="15%">
        <col width="10%">
      </colgroup>
      <tr>
        <th>项目名称</th>
        <th>项目动态</th>
        <th>发布时间</th>
        <th>操作</th>
      </tr>
      <tr v-show="!proList.length"><td colspan="5" style="text-align: center;border-bottom: 1px #F6F3F7;"><img src="../../assets/img/js-wujilu.png"/></td></tr>
      <tr v-for="(el,index) in proList" :key="index">
        <td class="left"><em class="pointer" :title="el.albx0002" @click="toDetail(el.orgid,el.albe0012,el.projectid,el.areaid)">{{(el.albx0002) | ellipsis(19)}}</em></td>
        <td class="left" :title="el.albx0404">{{el.albx0404 | ellipsis(30)}}</td>
        <td class="left">{{el.albx0405 | ellipsisNos(10)}}</td>
        <td class="left"><em class="pointer" @click="deleteProDynamics(el.id)">删除</em></td>
      </tr>
    </table>
    <!-- 我的评论 -->
    <table class="user-table" :class="{hide:showTab==true}">
      <colgroup>
        <col width="30%">
        <col width="30%">
        <col width="12%">
        <col width="18%">
        <col width="10%">
      </colgroup>
      <tr>
        <th>评论主题</th>
        <th>评论内容</th>
        <th>类型</th>
        <th>评论时间</th>
        <th>操作</th>
      </tr>
      <tr v-show="!commentList.length"><td colspan="5" style="text-align: center;border-bottom: 1px #F6F3F7;"><img src="../../assets/img/js-wujilu.png"/></td></tr>
      <tr v-for="(el,index) in commentList" :key="index">
        <td class="left"><em class="pointer" :title="el.albx4018" @click="toDetail(el.orgid,el.albe0012,el.projectid,el.albx0021)">{{(el.albx4018) | ellipsis(20)}}</em></td>
        <td class="left" :title="el.albx4003">{{el.albx4003 | ellipsis(20)}}</td>
        <td class="left">
          <i v-if="el.albx4009==1">队伍留言</i>
          <span v-if="el.albx4009==2">项目讨论</span>
          <span style="color: cornflowerblue" v-if="el.albx4009==3">动态留言</span>
          <span style="color: #cc0000;" v-if="el.albx4009==4">新闻讨论</span></td>
          <span style="color: #coral;" v-if="el.albx4009==5">在线课堂</span>
        <td class="left">{{el.albx4006 | ellipsisNos(19)}}</td>
        <td class="left">
          <em class="pointer" @click="delState(el.id)">删除</em>
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
        userInfo:this.$store.getters.getUser,//账号信息
        //basicInfo:this.$store.getters.getBasic,//志愿者信息
        commentList:{},//评论列表
        tolCount:0,//总条数
        tolPage:0,//总页数
        pageSize:8,//每页条数
        pageNow:1,//当前页
        jumpPage:1,
        showTab:true,//控制tab切换
        proList:[],//项目动态列表
        tab:'',//当前显示的tab
      };
    },
    created() {
      this.getProDynamicsList();
    },
    methods:{
      pageEvent:function(e){//分页
        if(this.tab=='pro'){
            this.getProDynamicsList();
        }else if(this.tab=='my'){
            this.getCommentList();
        }
      },
      getCommentList() {
        this.utilscommit.request('nvsi_listCommentInfo',{pageNow:this.pageNow,pageSize:this.pageSize},this.commentListBack)
      },
      commentListBack(result) {
        if(result && result.data) {
          this.commentList = result.data;
          this.common.getTolData(this,result);
        } else {
          this.commentList = {};
          this.common.getTolData(this);
        }
      },
      toDetail(orgid,albe0012,projectid,albx0021) {
        if (orgid) {
          this.$utilroutes.toGroupInfo(orgid,albe0012);
        } else if (projectid) {
          this.$utilroutes.toProjectInfo(projectid,albx0021);
        }
      },
      delState(id){//删除评论
        this.utilscommit.request('nvsi_delInformation',{id:id,volnum:this.userInfo.volnum},this.delBack);
      },
      delBack(data){//删除评论返回结果
        if(data){
          this.$swal(data.message,{buttons:'确定'});
          if(data.code==0)this.getCommentList();
        }
      },
      changeTab(tab){//tab切换
          this.tab=tab;
          this.commentList = [];
          this.proList = [];
          this.common.getTolData(this);
        if(tab=='pro'){
          this.showTab=true;
          this.getProDynamicsList();
        }else if(tab=="my"){
          this.showTab=false;
          this.getCommentList();
        }
      },
      getProDynamicsList(){//获取项目动态列表
         this.common.getTolData(this);
         this.utilscommit.request('nvsi_getProjectDynam',{pageNow:this.pageNow,pageSize:this.pageSize},this.ProDynamicsListBack)
      },
      ProDynamicsListBack(result){//返回项目动态列表结果
          if(result && result.data) {
            this.proList= result.data;
            this.common.getTolData(this,result);
          } else {
            this.proList = {};
            this.common.getTolData(this);
          }
      },
      deleteProDynamics(id){//删除项目动态
          this.utilscommit.request('nvsi_deleteProjectDynam',{'id':id},this.deleteProDynamicsBack)
      },
      deleteProDynamicsBack(result){//删除动态返回结果
          if(result && result.code=="0"){
            this.getProDynamicsList()
          }else{
            this.$swal('删除失败')
          }
      },
    },
  }

</script>

<style scoped>
  .user-table th{
    text-align: left;
    padding: 10px;
  }
  .hide{
    display:none;
  }
</style>



