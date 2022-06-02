<template>
  <div id="upvolcard">
    <div class="avatar-upload avatar-upload-small">
      <div class="avatar-upload-wrap" style="width: 110px; height: 150px">
        <img style="width: 100%; height: 100%" :src="photo" alt="" class="w" />
      </div>
      <div class="upload">
        <a
          href="javascript:void(0);"
          @click="upimg"
          class="button button-line"
          id="picker"
          >选择上传证件照</a
        >
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
        <div class="jcrop-preview">
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
    </div>
  </div>
</template>

<script>
export default {
  name: "upvolcard",
  props: ["photo"],
  data() {
    return {
      cropper: "",
      imgFile: "",
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
        minCropBoxWidth: 100,
      });
    },
    upimg() {
      $("#file").val("");
      $("#file").click();
    },
    changeImg(e) {
      var file = e.target.files[0];
      var fileName = e.target.value;
      var fn = fileName.split(".");
      var ext = fn[fn.length - 1];
      if (!/jpg|png|jpeg/i.test(ext)) {
        this.$swal({
          title: "不支持的文件类型!",
          confirmButtonText: "确认",
        });
        return;
      }
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
      $(".preview").css({ width: "110px", height: "150px" });
      $("#overlay, .btnCancel").click(function () {
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
      let photo = this.cropper
        .getCroppedCanvas({ width: 320, height: 180 })
        .toDataURL(type, 1);
      //生成预览图
      /*  $('#photo').html('<img alt="" class="w" id="nowImg">');
        $('#nowImg').attr( 'src', src ); */
      //将图片转为File
      var imgFile = this.dataURLToFile(photo, name);
      imgFile.src = photo;
      this.$parent.imgFile = imgFile;
      this.$parent.photo = photo;
    },
    dataURLToBlob(dataurl) {
      //base64转blob
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
  },
};
</script>

<style>
/*   @import "../../assets/css/base.css";
  @import "../../assets/css/main.css";
  @import "../../assets/css/cropper.min.css"; */
</style>
