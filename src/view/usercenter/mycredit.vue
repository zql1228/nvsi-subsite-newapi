<template>
   <li class="col v-t white tab-container">
      <div class="tabbar tabbar-tight mb-20 ">
        <span class="col v-m">我的信用</span>
      </div>
      <table class="user-table">
        <colgroup>
          <col width="15%">
          <col width="10%">
          <col width="15%">
          <col width="25%">
          <col width="15%">
          <col width="10%">
          <col width="10%">
        </colgroup>
        <tr>
          <th>所属项目</th>
          <th>信用类型</th>
          <th>失信时间</th>
          <th>失信内容</th>
          <th>所属团体</th>
          <th>修复状态</th>
          <th>操作</th>
        </tr>
        <tr v-show="!creditList.length"><td colspan="7" style="text-align: center;border-bottom: 1px #F6F3F7;"><img src="../../assets/img/js-wujilu.png"/></td></tr>
        <tr v-for="(el,index) in creditList" :key="index">
          <td class="left" ><em  @click="$utilroutes.toProjectInfo(el.projectid,el.albx0021)" v-text="el.albx0002" class="pointer"></em></td>
          <td class="left" v-text="el.state"></td>
          <td class="left">{{el.albp2304 | ellipsisNos(10)}}</td>
          <td class="left" v-text="el.albp2305"></td>
          <td class="left"><em  class="pointer" @click="$utilroutes.toGroupInfo(el.groupid,el.albe0012)">{{el.albe0002 | ellipsis(18)}} </em></td>
          <td class="left" v-text="el.xfstate"></td>
          <td class="left"> <em class="pointer"  @click="isCredit(el)">修复</em></td>
          <!-- <td class="left">{{el.albx0252}}</td>
          <td class="left">
            <em class="pointer" :title="el.albx0002" @click="toProjectDetail(el.projectid,el.albx0021)">{{el.albx0002 | ellipsis(18)}}</em><br>
            <p :title="el.albe0002">{{el.albe0002 | ellipsis(18)}}</p>
          </td>
          <td class="left">
            <p>
              <span>{{el.albx0025}}</span>
              <span style="margin: 0 6px">{{(el.albx0027 == '1' && (el.albx0026)) || (el.albx0029 == '1' && (el.albx0028)) || ''}}</span>
            </p>
            <p>{{el.albx0030}}</p>
          </td> -->
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
        creditList:{},//排班列表
        tolCount:0,//总条数
        tolPage:0,//总页数
        pageSize:8,//每页条数
        pageNow:1,//当前页
        jumpPage:1,
        nowCredit:{},//当前修复的数据
      };
    },
    mounted() {
      window.Vues = this;//主体vue实例挂载
      this.getcreditList();//信用列表
    },
    methods:{
      pageEvent:function(e){//分页
        this.getcreditList();
      },
      getcreditList() {//信用列表
        this.utilscommit.request('nvsi_listVolCredit',{pageNow:this.pageNow,pageSize:this.pageSize,volnum:this.userInfo.volnum},this.creditListBack);
      },
      creditListBack(result) {
        if(result && result.data) {
          this.creditList = result.data;
          this.common.getTolData(this,result);
        } else {
          this.creditList = {};
          this.common.getTolData(this);
        }
      },
      isCredit(el) {//修复
        this.nowCredit=el;
        if(el.albp2307=="1"){//已修复
          this.nowCredit='';
          this.$swal('您已修复该信用，无需重复修复',{buttons:'确定'});
        }else{//查询是否可满足10小时=
          this.$swal('是否支取10个小时修复此失信记录',{buttons:["取消","确定"]}).then((value)=>{
              if (value) {
                Vues.utilscommit.request('nvsi_exchangeHours',{volnum:Vues.userInfo.volnum},Vues.creditBack);
              }
          });
         //this.utilscommit.request('nvsi_exchangeHours',{volnum:this.userInfo.volnum},this.creditBack);//查询可兑换的时长
        }
      },
      creditBack(result) {//查询可兑换的时长结果
        if(result) {
          if(result.data && result.data>=10){
              this.utilscommit.request('nvsi_repairVolCredit',{id:this.nowCredit.id,projectid:this.nowCredit.projectid,projectname:this.nowCredit.albx0002,volnum:this.userInfo.volnum},this.repairVolCreditBack);//兑换时长
          }else{
            this.nowCredit='';
            this.$swal('您的时长不足10小时，无法修复',{buttons:'确定'});
            return;
          }
        }
      },
      repairVolCreditBack(result){//修复结果
        if(result){
          this.nowCredit='';
          if(result.data)this.getcreditList();
          this.$swal(result.message,{buttons:'确定'});
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



