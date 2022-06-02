<template>
  <div id="star" style="display: inline-block;">
    <img v-for="(star,index) in stars" :src="star.src" :key="index" @click="rating(index)" style="margin: 0 2px;" alt="星星图片" />
  </div>
</template>
<script>
  export default{
    name:'star',
    props:['row','starOn','starOff'],
    data() {
      return {
        stars: [{
          src: this.starOff,
          active: false
        }, {
          src: this.starOff,
          active: false
        }, {
          src: this.starOff,
          active: false
        }, {
          src: this.starOff,
          active: false
        }, {
          src: this.starOff,
          active: false
        }],
        starNum: 0,
      }
    },
    methods:{
      rating:function (index) {//给星星赋值
        var total = this.stars.length; //星星总数
        var idx = index + 1; //这代表选的第idx颗星-也代表应该显示的星星数量
        if(this.starNum == 0) {//初始点击
          this.starNum = idx;
          for(var i = 0; i < idx; i++) {
            this.stars[i].src = this.starOn;
            this.stars[i].active = true;
          }
        } else {//再次点击
          if (idx == this.starNum) {
            for (var i = index; i < total; i++) {
              this.stars[i].src = this.starOff;
              this.stars[i].active = false;
            }
          }
          //如果小于当前最高星级，则直接保留当前星级
          if (idx < this.starNum) {
            for (var i = idx; i < this.starNum; i++) {
              this.stars[i].src = this.starOff;
              this.stars[i].active = false;
            }
          }
          //如果大于当前星级，则直接选到该星级
          if (idx > this.starNum) {
            for (var i = 0; i < idx; i++) {
              this.stars[i].src = this.starOn;
              this.stars[i].active = true;
            }
          }
        }
        var count = 0; //计数器-统计当前有几颗星
        for(var i = 0; i < total; i++) {
          if(this.stars[i].active) {
            count++;
          }
        }
        this.starNum = count;
        //给父组件赋值
        if (this.row == 1) {
          this.$parent.row1 = this.starNum;
        } else if (this.row == 2) {
          this.$parent.row2 = this.starNum;
        } else if (this.row == 3) {
          this.$parent.row3 = this.starNum;
        }
      },
      getShowRating(showNum){//获取展示的星星
        if(showNum){
          for(var i = 0; i < showNum; i++) {
              this.stars[i].src = this.starOn;
              this.stars[i].active = true;
            }
        }
      },
    }
  }
</script>