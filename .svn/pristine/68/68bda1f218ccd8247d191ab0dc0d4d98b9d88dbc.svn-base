<template>
  <ul class="navbar" id="usermenu" style="background: #ffffff">
    <li>
      <em>用户中心<i>></i></em>
      <div>
        <router-link href="javascript:void(0);" :class="{active:routename=='usercenter' || routename=='userinfo'}" tag="a" :to="{name:'usercenter',params:{define:routeDefine}}">我的首页</router-link>
        <router-link href="javascript:void(0);" :class="{active:routename=='updatedata'}" tag="a" :to="{name:'updatedata',params:{define:routeDefine}}">修改资料</router-link>
        <router-link href="javascript:void(0);" :class="{active:routename=='mycredit'}" tag="a" :to="{name:'mycredit',params:{define:routeDefine}}">我的信用</router-link>
        <router-link href="javascript:void(0);" :class="{active:routename=='message'}" tag="a" :to="{name:'message',params:{define:routeDefine}}">站内信</router-link>
        <router-link href="javascript:void(0);" :class="{active:routename=='myfriends'}" tag="a" :to="{name:'myfriends',params:{define:routeDefine}}">我的好友</router-link>
        <!-- <router-link href="javascript:void(0);" :class="{active:routename=='myproving'}" tag="a" :to="{name:'myproving',params:{define:routeDefine}}">我的求证</router-link> -->
        <router-link href="javascript:void(0);" :class="{active:routename=='mycomment'}" tag="a" :to="{name:'mycomment',params:{define:routeDefine}}">动态评论</router-link>
        <router-link href="javascript:void(0);" :class="{active:routename=='myevaluate'}" tag="a" :to="{name:'myevaluate',params:{define:routeDefine}}">我的评价</router-link>
        <router-link href="javascript:void(0);" :class="{active:routename=='myreport'}" tag="a" :to="{name:'myreport',params:{define:routeDefine}}">投诉举报</router-link>
        <router-link href="javascript:void(0);" :class="{active:routename=='mystudy'}" tag="a" :to="{name:'mystudy',params:{define:routeDefine}}">我的学习</router-link>
        <router-link href="javascript:void(0);" :class="{active:routename=='mycommend'}" tag="a" :to="{name:'mycommend',params:{define:routeDefine}}">我的表彰</router-link>
        <router-link href="javascript:void(0);" :class="{active:routename=='myexchange'}" tag="a" :to="{name:'myexchange',params:{define:routeDefine}}">我的兑换</router-link>
        <router-link href="javascript:void(0);" :class="{active:routename=='servicelog'}" tag="a" :to="{name:'servicelog',params:{define:routeDefine}}">下载证明</router-link>
        <router-link href="javascript:void(0);" :class="{active:routename=='mytransfer'}" tag="a" :to="{name:'mytransfer',params:{define:routeDefine}}">记录转移</router-link>
       <!--  <router-link href="javascript:void(0);" :class="{active:routename=='starapply'}" tag="a" :to="{name:'starapply',params:{define:routeDefine}}">星级申请</router-link> -->
      </div>
    </li>
    <li>
      <em>志愿项目<i>></i></em>
      <div>
        <router-link href="javascript:void(0);" :class="{active:routename=='myproject'}" tag="a" :to="{name:'myproject',params:{define:routeDefine}}">我的项目</router-link>
        <router-link href="javascript:void(0);" :class="{active:routename=='myschedule'}" tag="a" :to="{name:'myschedule',params:{define:routeDefine}}">我的排班</router-link>
        <router-link href="javascript:void(0);" :class="{active:routename=='myservicetime'}" tag="a" :to="{name:'myservicetime',params:{define:routeDefine}}">服务时长</router-link>
      </div>
    </li>
    <li>
      <em>志愿队伍<i>></i></em>
      <div>
        <router-link href="javascript:void(0);" :class="{active:routename=='myorg'}" tag="a" :to="{name:'myorg',params:{define:routeDefine}}">我的队伍</router-link>
        <!-- <a id="myhistoryorg" href="myhistoryorg.html">历史队伍</a> -->
      </div>
    </li>
    <li>
      <em>志愿家庭<i>></i></em>
      <div>
        <router-link href="javascript:void(0);" :class="{active:routename=='myfamily'}" tag="a" :to="{name:'myfamily',params:{define:routeDefine}}">我的家庭</router-link>
      </div>
    </li>
  </ul>
</template>

<script>
  export default {
    name: "usermenu",
    data:function(){
      return{
        routeDefine: this.$route.params.define,
        routename: this.$route.name
      }
    },
    mounted() {
      this.emClick();
    },
    methods:{
      emClick:function () {
        $(".navbar li em").click(function () {
          $(this).parent().toggleClass('active').siblings().removeClass('active');
        });
        $('.navbar div a.active').parent().parent().toggleClass('active').siblings().removeClass('active');
      }
    },
    watch:{
      '$route.name': function(to, from) { //监听路由是否变化
        this.routename=to;
      }
    }

  }
</script>
