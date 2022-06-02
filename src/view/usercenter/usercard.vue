<template>
  <div>
    <li class="col v-t white tab-container">
      <div class="tabbar tabbar-tight">
        <span>志愿者证正面：</span>
      </div>
      <div class="card t-c">
        <div id="front">
          <img src="../../assets/img/volunteerphoto.png" alt="" style="width: 500px" />
        </div>
        <div>
          <!-- <a href="javascript:void(0);" class="button card_a" v-print="'#front'"
            >打印</a
          > -->
          <a href="javascript:void(0);" :class="isClick ? 'button card_a' : 'disabled-button card_a'" @click="downFront">下载</a>
          <a href="javascript:void(0);" :class="isClick ? 'button card_a' : 'disabled-button card_a'" @click="updateUserInfo">更新</a>
        </div>
      </div>
      <div class="tabbar tabbar-tight">
        <span>志愿者证背面：</span>
      </div>
      <div class="card t-c">
        <div id="reverse">
          <img src="../../assets/img/card2.png" alt="" style="width: 500px" />
        </div>
        <div>
          <!-- <a
            href="javascript:void(0);"
            class="button card_a"
            v-print="'#reverse'"
            >打印</a
          > -->
          <a href="javascript:void(0);" :class="isClick ? 'button card_a' : 'disabled-button card_a'" @click="downReverse">下载</a>
        </div>
      </div>
    </li>
    <li class="col v-t g-8 pl-40 white tab-container pt-36">
      <h2 class="subtitle subtitle-noline subtitle-small">志愿者证证件照片</h2>
      <up-card :photo="photo"></up-card>
      <div style="margin-top: -30px; font-size: 13px; text-align: center">
        只支持格式为jpg、png、jpeg，大小不超过2M
      </div>
      <h2 class="subtitle subtitle-noline subtitle-margin subtitle-small" v-if="$store.getters.getArea.cnname == '江苏'">
        志愿者二维码
      </h2>
      <div class="avatar-upload" v-if="$store.getters.getArea.cnname == '江苏'">
        <img class="pt-20" style="width: 119px; height: 115px" src="@/assets/img/js_erwei.png" alt="" />
        <p><b>扫码安装“江苏政务服务”APP</b></p>
      </div>
    </li>
    <a href="" ref="download" download></a>
  </div>
</template>
<script>
const UpCard = () => import("@/view/home/upvolcard.vue"); //上传头像
import avatar from "../../assets/img/mruser.png";

export default {
  name: "usercard",
  components: { UpCard },
  data() {
    return {
      routeDefine: this.$route.params.define,
      areaid: this.$store.getters.getArea.areaid,
      userInfo: this.$store.getters.getUser, //账户信息
      basicInfo: this.$store.getters.getBasic, //用户信息
      imgFile: "",
      frontCard: "", //证正面
      photo: avatar,
      timer: "", // 定时器id
      isClick: false, // 图片加载完成之前不允许点击
    };
  },
  created() {
    window.imgError = this.imgError;
  },
  beforeDestroy() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  },
  mounted() {
    if(this.basicInfo.volphoto){
      this.photo=this.basicInfo.volphoto
    }
    if(this.basicInfo.volcard){
       this.isClick = true;
       this.frontCard = this.basicInfo.volcard;
          let imgEle = `<img style="width: 500px;" alt="" class="w" src="${this.basicInfo.volcard}">`;
          $("#front").html(imgEle);
    }else{
      this.basicInfos();
    }
    
  },
  methods: {
    createdTimer() {
      clearInterval(this.timer);
      this.timer = setInterval(() => {
        this.basicInfos();
      }, 1000 * 480);
    },
    basicInfos() {
      this.isClick = false;
      // 获取志愿者服务省份
      let regarea = this.common.areaList.filter(
        (item) => item.areaid == this.basicInfo.albp0020.substr(0, 2)
      )[0].name;
      
      var params = { 
        volid: this.basicInfo.id,
        name: this.basicInfo.albp0003,// 志愿者姓名
        volnum: this.basicInfo.albp0029,// 志愿者编号
        areaid: this.basicInfo.albp0020,// 服务区域
        regdate: this.userInfo.albp0034,//注册日期
        sex: this.basicInfo.albp0006, //性别
        src:true,
        photo: this.basicInfo.albp0083,//头像
        cardno:this.userInfo.albp0005.replace(/\+/g,"%2B"),//身份证
      };
        console.log(params)
        debugger
      this.utilscommit.requestapi(
        "refreshVolunteerCardHandleFortisWeb",
        params,
        this.urlBack
      );
    },
    urlBack(res) {
      if (res.code == 0 && res.data) {
        // 设置证件照头像
        res.data.cardurl ? (this.photo = res.data.cardurl) : "";
        // 设置志愿者证
        if (res.data.src) {
          this.frontCard = res.data.src;
          let imgEle = `<img style="width: 500px;" alt="" class="w" src="${res.data.src}">`;
          $("#front").html(imgEle);
        }
        res.data.cardurl || res.data.src ? this.createdTimer() : "";
        this.basicInfo.volcard=res.data.src
        this.$store.commit("saveBasic", this.basicInfo)
      } else {
        this.$swal("志愿者证生成失败", { buttons: "确定" });
      }
      this.isClick = true;
    },
    updateUserInfo() {
      if (!this.isClick) {
        return this.$swal("志愿者证书生成中", { buttons: "确定" });
      }
      // 更新志愿者信息
      this.utilscommit.requestapi(
        "getVolunteerInfoFortisWeb",
        { cardno: this.userInfo.albp0005 },
        this.basicInfoCheck
      );
    },
    cardBack(result) {
      if (result) {
        this.utilscommit.request(
          "getVolunteerInfoFortisWeb",
          { cardno: this.userinfo.albp0005 },
          this.basicInfoCheck
        ); //获取志愿者数据
      } else {
        this.$swal("志愿者证生成失败", { buttons: "确定" });
      }
    },
    basicInfoCheck(data) {
      if (data && data.code == 0) {
        this.basicInfo = data.data;
        this.$store.commit("saveBasic", this.basicInfo);
        this.basicInfos();
      } else {
        this.$swal("志愿者证生成失败", { buttons: "确定" });
      }
    },
    imgError(el) {
      el.src = avatar;
    },
    // 下载背面
    downReverse() {
      if (!this.isClick) {
        return this.$swal("志愿者证书生成中", { buttons: "确定" });
      }
      this.$refs.download.href = `${this.common.getUrl()}/LEAP/NVSIModule/NVSIResource/images/volunteerphotoother.png`;
      this.$refs.download.click();
    },
    // 下载正面
    downFront() {
      if (!this.isClick) {
        return this.$swal("志愿者证书生成中", { buttons: "确定" });
      }
      this.$refs.download.href = this.frontCard;
      this.$refs.download.click();
    },
  },
  watch: {
    async imgFile(newval, oldval) {
      if (newval != oldval) {
        if (!this.isClick) {
          return this.$swal("志愿者证书生成中", { buttons: "确定" });
        }
        let { data: res } = await this.utilscommit.asyncUpload(this.imgFile);
        if (res.code == 0 && res.data) {
          let albp0083 = JSON.stringify(res.data);
          this.utilscommit.requestapi(
            "updateVolunInforOnWeb",
            { albp0083: albp0083, albp0005: this.userInfo.albp0005 },
            (res) => {
              if (res.code == 0) {
                this.utilscommit.requestapi(
                  "getVolunteerInfoFortisWeb",
                  { cardno: this.userInfo.albp0005 },
                  (res) => {
                    if (res.code == 0 && res.data) {
                      this.basicInfo = res.data;
                      if(this.basicInfo.volphoto){
                         this.photo=this.basicInfo.volphoto
                      }
                      this.basicInfos();
                      this.$store.commit("saveBasic", res.data);
                    }
                  }
                );
              }
            }
          );
        } else {
          this.$swal("证件照上传失败，请稍后再试", { buttons: "确定" });
        }
      }
    },
  },
};
</script>

<style scoped>
.card_a {
  margin: 20px;
}

.disabled-button {
  display: inline-block;
  font-size: 14px;
  color: #fff;
  background: #9e9b9b;
  height: 40px;
  line-height: 40px;
  border-radius: 4px;
  text-align: center;
  padding: 0 30px;
  box-sizing: border-box;
  transition: 0.3s;
  white-space: nowrap;
  outline: none;
  cursor: default;
}
</style>
