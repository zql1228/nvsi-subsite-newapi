<template>
  <div id="upimage">
    <div class="avatar-upload avatar-upload-small" style="margin-bottom: 0">
      <div
        class="avatar-upload-wrap"
        style="width: 110px; heiht: 150px"
        id="photo"
      >
        <img
          src="../../assets/img/mruser.png"
          alt=""
          class="w"
          style="width: 100%; height: 100%"
        />
      </div>
      <div class="upload">
        <a
          href="javascript:void(0);"
          @click="upimg"
          class="button button-line"
          id="picker"
          v-text="imgtitle"
        ></a>
      </div>
      <div id="overlay"></div>
      <div class="lightbox cropperBox">
        <div class="cropperInner">
          <img id="img" />
        </div>
        <div>
          <button type="button" class="btnCropper">确 定</button>
          <button type="button" class="btnCancel">取 消</button>
          <span class="introjs-tips">鼠标滚轮可缩放图片尺寸</span>
        </div>
        <div class="jcrop-preview" style="top: 100px">
          <div class="preview"></div>
        </div>
      </div>
      <input
        id="file"
        type="file"
        ref="file"
        @change="changeImg"
        accept="image/*"
        hidden
        style="visibility: hidden"
      />
      <!--<input class="file" name="file" type="file" ref="file" accept="image/png,image/gif,image/jpeg"/>-->
    </div>
  </div>
</template>

<script>
export default {
  name: "upimage",
  data() {
    return {
      cropper: "",
      imgFile: "",
      imgtitle: "选择上传头像"
    };
  },
  mounted() {
    this.aaa();
    this.initUploader();
  },
  methods: {
    initUploader() {
      var img = document.getElementById("img");
      this.cropper = new Cropper(img, {
        aspectRatio: 11 / 15,
        preview: ".preview",
        dragMode: "move",
        minCropBoxWidth: 100
      });
    },
    upimg() {
      $("#file").val("");
      $("#file").click();
    },
    changeImg(e) {
      var file = e.target.files[0];
      var fileName = e.target.value;
      /* var fn = fileName.split('.');
        var ext = fn[fn.length - 1];
        if(!/gif|png|jpg|jpeg/i.test(ext)){
          this.$swal({
            title:'不支持的文件类型!',
            confirmButtonText:'确认',
          });
          return;
        } */
      let fileVal = this.common.checkFile(file, 2048);
      if (fileVal) return this.$swal(fileVal, { buttons: "确定" });
      var bole = URL.createObjectURL(file);
      $("#img").attr("src", bole);
      $("#overlay").show();
      $(".cropperBox").css({ display: "block" });
      if (this.cropper) {
        this.cropper.replace(bole);
      }
      $(".cropperBox").addClass("show");
      $(".btnCropper").on("click", this.getImgFile);
    },
    aaa() {
      $(".preview").css({ width: "110px", height: "110px" });
      $("#overlay, .btnCancel").click(function() {
        $(".cropperBox").removeClass("show");
        $("#overlay").hide();
        $("#file").val("");
        return false;
      });
    },
    getImgFile() {
      var file = document.getElementById("file");
      var fi = file.files[0];
      var name = fi.name;
      var fn = file.value.split(".");
      var ext = fn[fn.length - 1];
      var type = ext.toLowerCase() == "png" ? "image/png" : "image/jpeg";
      $(".cropperBox").removeClass("show");
      $("#overlay").hide();
      var src = this.cropper
        .getCroppedCanvas({ width: 320, height: 180 })
        .toDataURL(type, 1);
      //生成预览图
      $("#photo").html('<img alt="" class="w" id="nowImg">');
      $("#nowImg").attr("src", src);
      //将图片转为blob
      // var imgFile = this.dataURLToBlob(src);
      // imgFile.name = name;
      // 将图片转为File
      var imgFile = this.dataURLToFile(src, name);
      imgFile.src = src;
      this.$parent.imgFile = imgFile;
    },
    dataURLToBlob(dataurl) {
      let arr = dataurl.split(","),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      return new Blob([u8arr], { type: mime });
    },
    dataURLToFile(dataurl, filename) {
      var arr = dataurl.split(","),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      return new File([u8arr], filename, { type: mime });
    },
    getImgTitle(imgtitle) {
      //图片点击的标题赋值
      this.imgtitle = imgtitle;
    }
  }
};
</script>

<style>
/* @import "../../assets/css/base.css";
  @import "../../assets/css/main.css";
  @import "../../assets/css/cropper.min.css"; */
</style>
