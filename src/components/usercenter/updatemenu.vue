<template>
 <div class="tabbar tabbar-tight mb-30" id="updatemenu">
      <router-link :class="{active:routeName=='updatedata'}" tag="a" :to="{name:'updatedata',params:{define:routeDefine}}">基本信息</router-link>
      <router-link :class="{active:routeName=='updateiden'}" tag="a"  :to="{name:'updateiden',params:{define:routeDefine}}">身份信息</router-link>
      <router-link :class="{active:routeName=='updateother'}" tag="a" :to="{name:'updateother',params:{define:routeDefine}}">其他信息</router-link>
      <router-link :class="{active:routeName=='updatetamasha'}" tag="a" :to="{name:'updatetamasha',params:{define:routeDefine}}">赛会志愿者</router-link>
      <router-link :class="{active:routeName=='updatepassword'}" tag="a" :to="{name:'updatepassword',params:{define:routeDefine}}">修改密码</router-link>
      <router-link :class="{active:routeName=='updatestar'}" tag="a" :to="{name:'updatestar',params:{define:routeDefine}}">兑换星级</router-link>
  </div>
</template>

<script>
  export default {
    name:'updatemenu',
    data:function(){
      return{
        routeDefine: this.$route.params.define,
        routeName: this.$route.name
      }
    },
    watch:{
      '$route.name': function(to, from) { //监听路由是否变化
        this.routeName=to;
      }
    }

  }
</script>
