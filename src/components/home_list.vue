<template> 
  <div id="home_list" class="grid-item" >
    <div v-for="el in modularList.filter((obj)=>obj.albx6016==modularType)" :key="el.id">
      <div class="title">
        <img src="../assets/img/icon_title.png" alt="">
        <h2 class="label" >
          <span class="active" v-text="ellipsis(el.albx6002,9)"></span>
        </h2>
        <a href="javascript:void(0);" class="more" @click="toNewsMore(el)">更多</a>
      </div>
      <ul class="list" :class="{small:modularType!=1}" v-if="el.newslist">
        <li class="row w" v-for="(item,index) in el.newslist" :key="item.id">
          <div class="col v-m" v-show="modularType==1">
            <span class="num">{{index+1}}</span>
          </div>
          <div class="col v-m" style="text-align: unset">
            <a href="javascript:void(0);" class="label" :title="item.title" @click="getNewsInfoMore(item.id,el.albx6006)">
              <span class="dot" v-show="modularType!=1"></span>
              <span class="istops" v-if="item.istop==1">置顶</span>
              {{item.title | ellipsis(titlelength)}}
            </a>
          </div>
          <div class="col v-m" v-show="modularType==1">
            <span class="time">{{item.entrytime | ellipsisNos(10)}}</span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    name:"home_list",
    props:['modularList','modularType','titlelength'],
    methods:{
      toNewsMore (el) {//跳转二级栏目
        this.common.toNews(el,1);
      },
      getNewsInfoMore(newsid,type){//跳转子站的详情页面    type 栏目标识
        this.common.getNewsInfo(newsid,type);
      },
    }
  }
</script>