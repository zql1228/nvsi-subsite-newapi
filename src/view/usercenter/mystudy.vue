<template>
   <li class="col v-t white tab-container">
    <div class="tabbar tabbar-tight mb-20">
      <span class="active">我的培训</span>
      <!--<span>在线考试</span>
      <span>在线课程</span>-->
    </div>
    <div class="tabbar-down">
      <table class="user-table">
        <colgroup>
          <col width="40%">
          <col width="30%">
          <col width="15%">
          <col width="15%">
        </colgroup>
        <tr>
          <th>培训主题</th>
          <th>培训日期</th>
          <th>培训学时</th>
          <th>培训人数</th>
        </tr>
        <tr v-show="!trainList.length"><td colspan="4" style="text-align: left;border-bottom: 1px #F6F3F7;"><img src="../../assets/img/js-wujilu.png"/></td></tr>
        <tr v-for="(el,index) in trainList" :key="index">
          <td class="left" :title="el.albx0282">{{el.albx0282 | ellipsis(23)}}</td>
          <td class="left">
            <span>{{el.albx0284 | ellipsisNos(10)}}</span>/<span>{{el.albx0285 | ellipsisNos(10)}}</span>
          </td>
          <td class="left">{{el.albx0288 | addZero}}</td>
          <td class="left">{{el.count}}</td>
        </tr>
      </table>
    </div>
    <!--<div class="tabbar-down" style="display:none;">
      &lt;!&ndash; 在线考试 &ndash;&gt;
      <table class="user-table">
        <colgroup>
          <col width="30%">
          <col width="20%">
          <col width="15%">
          <col width="20%">
          <col width="15%">
        </colgroup>
        <tr>
          <th>考试名次</th>
          <th>限定时长</th>
          <th>考试得分</th>
          <th>考试日期</th>
          <th>操作</th>
        </tr>
        <tr>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
      </table>
    </div>
    <div class="tabbar-down" style="display:none;">
      &lt;!&ndash; 在线课程 &ndash;&gt;
      <table class="user-table">
        <colgroup>
          <col width="40%">
          <col width="30%">
          <col width="15%">
          <col width="15%">
          <col width="15%">
          <col width="15%">
        </colgroup>
        <tr>
          <th>课程名称</th>
          <th>学习时长</th>
          <th>测试得分</th>
          <th>测试日期</th>
          <th>学习日期</th>
          <th>操作</th>
        </tr>
        <tr>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
      </table>
    </div>-->
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
        trainList:{},//培训列表
        examList:{},//考试列表
        lessonList:{},//课程列表
        type:0,
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
      getList:function () {
        if (this.type == 0) {//培训
          this.utilscommit.request('nvsi_listVolMyTraining',{pageNow:this.pageNow,pageSize:this.pageSize},this.trainListBack)
        } else if (this.type == 1) {//考试
          this.utilscommit.request('nvsi_listVolExam',{pageNow:this.pageNow,pageSize:this.pageSize},this.examListBack)
        } else if (this.type == 2) {//课程
          this.utilscommit.request('nvsi_listVolLesson',{pageNow:this.pageNow,pageSize:this.pageSize},this.lessonListBack)
        }
      },
      trainListBack(result) {
        if(result && result.data) {
          this.trainList = result.data;
          this.common.getTolData(this,result);
        } else {
          this.trainList = {};
          this.common.getTolData(this);
        }
      },
      examListBack:function (result) {
        if(result && result.data) {
          this.examList = result.data;
          this.common.getTolData(this,result);
        } else {
          this.examList = {};
          this.common.getTolData(this);
        }
      },
      lessonListBack:function (result) {
        if(result && result.data) {
          this.lessonList = result.data;
          this.common.getTolData(this,result);
        } else {
          this.lessonList = {};
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



