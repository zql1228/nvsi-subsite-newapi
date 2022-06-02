<template>
  <div id="volstar" style="display: inline-block;">
    <img v-for="(star,index) in stars" :key="index" :src="star.src" style="margin: 0 2px;" alt="星星图片"/>
  </div>
</template>

<script>
  export default {
    name:"volstar",
    props:['score','starOn','starOff'],
    computed:{
      stars() {
        var starArr = [];
        let onstar = parseInt(this.score);
        for (var i = 0; i < onstar; i++) {
          starArr.push({
            src: this.starOn
          })
        }
        while (starArr.length < 5) {
          starArr.push({
            src: this.starOff
          })
        }
        return starArr;
      }
    }
  }
</script>