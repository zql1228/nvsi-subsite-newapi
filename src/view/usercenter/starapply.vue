<template>
  <li class="col v-t white">
    <div class="tabbar tabbar-tight mb-20">
      <span class="active">我的申请</span>
      <span>星级申请</span>
    </div>
    <div class="tabbar-down">
      <!-- 申请列表 -->
      <table class="user-table">
        <colgroup>
          <col width="40%">
          <col width="20%">
          <col width="20%">
          <col width="20%">
        </colgroup>
        <tr>
          <th>审批团体</th>
          <th>状态</th>
          <th>申请星级</th>
          <th>申请时间</th>
        </tr>
        <tr v-show="!applyList.length"><td colspan="4" style="text-align: center;border-bottom: 1px #F6F3F7;"><img src="../../assets/img/js-wujilu.png"/></td></tr>
        <tr v-for="(el,index) in applyList" :key="index">
          <td class="left"><em @click="$utilroutes.toGroupInfo(el.orgid,el.albe0012)" class="pointer">{{el.albe0002}}</em></td>
          <td class="left">{{el.status}}</td>
          <td class="left">{{el.applystar}}</td>
          <td class="left">{{el.albp1605 | ellipsisNos(10)}}</td>
        </tr>
      </table>
    </div>
    <div v-if="nowIndex == 0">
      <paging :pageCount="tolPage"
              :rangePage="pageSize"
              :initPage="pageNow"
              :totals="tolCount"
              :val="jumpPage"
              @pageEvent="pageEvent">
      </paging>
    </div>
    <div class="tabbar-down" style="display:none;">
      <div class="tabbar-tips">
        <p><em>暂定标准：</em>
          一星级志愿者：服务时长100 - 300 小时
          二星级志愿者：服务时长300 - 600 小时
          三星级志愿者：服务时长600 - 1000 小时
          四星级志愿者：服务时长1000 - 1500 小时
          五星级志愿者：服务时长1500以上
        </p>
      </div>
      <div class="grid g-14 auto">
        <div class="form">
          <p class="form-label">服务时长：</p>
          <input type="text" id="servicetime" v-model="countInfo" readonly>
        </div>
        <span class="form-error" style="height: 17px;margin-left:20px;padding: 5px 0 0 20px;" id="servicetimeTips"></span>
        <div class="form">
          <p class="form-label"><em>*</em>申请星级：</p>
          <div class="select" id="project_div">
            <select id="starSelect" v-model="star">
              <option value="">请选择</option>
              <option v-for="(el,index) in starList" :key="index" :value="el.codeid">{{el.codevalue}}</option>
            </select>
          </div>
        </div>
        <span class="form-error" style="height: 17px;margin-left:20px;padding: 5px 0 0 20px;" id="starTips"></span>
        <div class="form">
          <p class="form-label"><em>*</em>审批团体：</p>
          <div class="select" id="org_div">
            <select id="orgSelect" v-model="orgSelect">
              <option value="">请选择</option>
              <option v-for="(el,index) in orgList" :key="index" :value="el.albx0177">{{el.albe0002}}</option>
            </select>
          </div>
        </div>
        <span class="form-error" style="height: 17px;margin-left:20px;padding: 5px 0 0 20px;" id="orgTips"></span>
        <div class="pt-30 pb-40 t-c"><a href="javascript:void(0);" class="button" style="width:200px;" @click="submitApply">提交申请</a></div>
      </div>
    </div>
  </li>
</template>

<script>
  const paging =()=>import('@/components/page/paginationRed.vue');//分页

  export default {
    components : {paging},
    data(){
      return {
        routeDefine: this.$route.params.define,
        areaid:this.common.areaInfo().areaid,
        //userInfo:this.$store.getters.getUser,//账户信息
        basicInfo:this.$store.getters.getBasic,//用户信息
        applyList:{},//申请列表
        countInfo:'',//服务时长
        star:'',
        starList:{},//星级
        orgList:{},//服务团体列表
        orgSelect:'',
        nowIndex:'0',
        tolCount:0,//总条数
        tolPage:0,//总页数
        pageSize:8,//每页条数
        pageNow:1,//当前页
        jumpPage:1
      };
    },
    created() {
      window.Vues = this;//主体vue实例挂载
      this.utilscommit.requestapi('codeValueQueryFortisWeb',{tablename:'nvsi_albp0026'},this.starListBack);
      this.listServiceOrg();
      this.getList();
    },
    mounted() {
      this.setData();
    },
    methods:{
      starListBack:function (result) {
        this.starList = this.common.orderBy(result,'codeid','asc');
      },
      listServiceOrg:function () {
        this.utilscommit.request('nvsi_listServiceGroup',null,this.listOrgBack)
      },
      listOrgBack:function (result) {
        if (result && result.data) {
          this.orgList = result.data;
        } else {
          this.orgList = {};
        }
      },
      setData:function () {
        $('.tabbar span').each(function (idx, el) {
          $(el).click(function () {
            Vues.nowIndex = idx;
            if (idx == 0){
              Vues.pageNow = 1;
              Vues.getList();
            } else if(idx == 1){
              Vue.utilscommit.request('nvsi_countServiceTime',null,Vues.countBack);
              Vues.star = '';
              Vues.orgSelect = '';
            }
            $(this).addClass('active').siblings().removeClass('active');
            $('.tabbar-down').eq(idx).show().siblings('.tabbar-down').hide();
          })
        });
      },
      pageEvent:function(e){//分页
        this.getList();
      },
      getList() {
        this.utilscommit.request('nvsi_listStarApply',{pageNow:this.pageNow,pageSize:this.pageSize},this.listBack)
      },
      listBack(result) {
        if(result && result.data) {
          this.applyList = result.data;
          this.common.getTolData(this,result);
        } else {
          this.applyList = {};
          this.common.getTolData(this);
        }
      },
      countBack:function (result) {
        if (result) {
          if (result.data) {
            this.countInfo = result.data;
          } else {
            /* this.$swal({result.message,{buttons:'确定'}); */
            this.countInfo = '0.00';
          }
        }
      },
      submitApply:function () {
        if (this.starCheck() && this.orgCheck() ) {
          var data = {
            "albp1603":this.orgSelect,
            "albp1604":this.star
          };
          this.utilscommit.request('nvsi_insertStarApply',data, this.submitBack);
        }
      },
      submitBack:function (result) {
        if (result) {
          if (result.data) {
            this.$swal('申请成功',{buttons:'确定'}).then(function (value) {
              window.location.reload();
            });
          } else {
            this.$swal(result.message,{buttons:'确定'});
          }
        }
      },
      starCheck:function () {
        var tip='';
        var flag = true;
        if(!this.star) {
          tip='请选择申请星级';
          flag = false;
        } else {
          if (this.basicInfo.albp0026 && this.basicInfo.albp0026 == 5) {
            tip = '您当前为最高级五星级志愿者，无需再重复申请';
            flag = false;
          } else if (this.star == 1) {
            if (this.countInfo >= 300) {
              tip = '请申请更高星级';
              flag = false;
            } else if (this.countInfo < 100) {
              tip = '服务时长未达到最低申请标准';
              flag = false;
            } else if (this.basicInfo.albp0026 && this.star <= this.basicInfo.albp0026) {
              tip = '您当前志愿星级已等于或高于该星级，请申请更高的星级';
              flag = false;
            }
          } else if (this.star == 2) {
            if (this.countInfo >= 600) {
              tip = '请申请更高星级';
              flag = false;
            } else if (this.countInfo < 300) {
              tip = '服务时长未达到最低申请标准';
              flag = false;
            } else if (this.basicInfo.albp0026 && this.star <= this.basicInfo.albp0026) {
              tip = '您当前志愿星级已等于或高于该星级，请申请更高的星级';
              flag = false;
            }
          } else if (this.star == 3) {
            if (this.countInfo >= 1000) {
              tip = '请申请更高星级';
              flag = false;
            } else if (this.countInfo < 600) {
              tip = '服务时长未达到最低申请标准';
              flag = false;
            } else if (this.basicInfo.albp0026 && this.star <= this.basicInfo.albp0026) {
              tip = '您当前志愿星级已等于或高于该星级，请申请更高的星级';
              flag = false;
            }
          } else if (this.star == 4) {
            if (this.countInfo >= 1500) {
              tip = '请申请更高星级';
              flag = false;
            } else if (this.countInfo < 1000) {
              tip = '服务时长未达到最低申请标准';
              flag = false;
            } else if (this.basicInfo.albp0026 && this.star <= this.basicInfo.albp0026) {
              tip = '您当前志愿星级已等于或高于该星级，请申请更高的星级';
              flag = false;
            }
          } else if (this.star == 5) {
            if (this.countInfo < 1500) {
              tip = '服务时长未达到最低申请标准';
              flag = false;
            }
          }
        }
        this.formTip("star",tip);
        return flag;
      },
      orgCheck:function () {
        var tip = '';
        var flag = true;
        if (!this.orgSelect) {
          tip = '请选择申请团体';
          flag = false;
        }
        this.formTip('org',tip);
        return flag;
      },
      formTip:function (el,tip) {
        $('#' + el + 'Tips').html(tip).css("color", "red");
      },
    },
    watch : {
      star:function (newval,oldval) {
        this.starCheck();
      },
      orgSelect : function (newval,oldval) {
        this.orgCheck();
      }
    }
  }

</script>

<style scoped>
  .form{
    margin: 10px 0 0 20px;
  }
  .form .form-error{
    padding-top: 5px;
  }
  span{
    font-size: 14px;
  }
  .user-table th{
    text-align: left;
    padding: 10px;
  }
</style>