<template>
  <div id="paginate">
    <div class="pages" v-if="total">
        <a href="javascript:void(0);" class="pages-btn" @click="pageEvents(initPages-1)" :class="{'disabled':initPages==1}">上一页</a>
        <a href="javascript:void(0);" v-for="(item,index) in showPages" @click="pageEvents(item)" :key="index"
           :class="{'active':item==initPages}">{{item}}</a>
        <a href="javascript:void(0);" class="pages-btn" @click="pageEvents(initPages+1)" :class="{'disabled':initPages>=pageCounts}">下一页</a>
        <span>{{initPages}}/{{pageCounts}}页   共{{total}}条</span>
        <span>到</span>
        <input type="text" v-model.number="value">
        <span>页</span>
        <a href="javascript:void(0);" class="pages-btn" @click="pageEvents(value)">确定</a>
    </div>
  </div>
</template>

<script>
  export default {
    name:'paginate',
    data(){
      return {
        value:this.vals
      }
    },
    props:{
      pageCounts:{type:Number},//总页数
      rangePages:{type:Number},//每页条数
      initPages:{type:Number},//当前页
      total:{type:Number},//总条数
      vals:{type:Number}//当前值
    },
    computed:{
      showPages: function(){//展示7个分页栏
        var left=1;
        var right=this.pageCounts;
        var ar=[];
        if(this.pageCounts>=7){
          if(this.initPages>4 && this.initPages<this.pageCounts-3){
            left=this.initPages-3;
            right=this.initPages+3;
          }else{
            if(this.initPages<=4){
              left=1;
              right=7;
            }else{
              right=this.pageCounts;
              left=this.pageCounts-6;
            }
          }
        }
        while (left<=right){
          ar.push(left);
          left++;
        }
        return ar;
      },
      //分页
      indexss: function(){//展示5个分页栏
        var left = 1;
        var right = this.pageCounts;
        var ar = [];
        if(this.pageCounts>= 5){
          if(this.initPages > 3 && this.initPages < this.pageCounts-2){
            left = this.initPages - 2
            right = this.initPages + 2
          }else{
            if(this.initPages<=3){
              left = 1
              right = 5
            }else{
              right = this.pageCounts
              left = this.pageCounts -4
            }
          }
        }
        while (left <= right){
          ar.push(left);
          left ++;
        }
        return ar
      }
    },
    methods: {
      pageEvents: function(e) {
        //location.reload();
        // console.log("子类当前页"+e);
        if(e>this.pageCounts){
          this.$parent.pageNow=this.pageCounts;
        }else if(e<1){
          this.$parent.pageNow=1;
        }else{
          this.$parent.pageNow=e;
        } 
        this.$emit("pageEvents", e); //将值放在自定义的事件函数中作为参数
      }
    },
    watch: {
      initPage: function(val, oldVal) { //监听路由是否变化
        if(val!=oldVal){
          this.value=val;
        }
      }
    }
  };
</script>

<style scoped>
  .disabled{
    display: none;
  }
</style>
