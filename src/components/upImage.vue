<template>
  <div>
    <div class="avatar-upload avatar-upload-small">
      <div
        class="avatar-upload-wrap idcardPhoto"
        :id="'photo' + photo"
        @click="uploader"
        style="margin: 0; width: 100%"
      >
        <img
          :src="imgSrc"
          alt=""
          class="w"
          style="width: 316px; height: 206px; cursor: pointer"
        />
      </div>
      <div :id="'overlay' + photo"></div>
      <div class="lightbox cropperBox" :id="'cropperBox' + photo">
        <div class="cropperInner">
          <img :id="'img' + photo" />
        </div>
        <div>
          <div
            style="
              position: absolute;
              left: 22px;
              top: 556px;
              font-size: 13px;
              color: #999;
            "
          >
            <input
              type="radio"
              :name="photo"
              v-model="picked"
              value="1"
              @click="changeShape(1)"
            /><span>横屏</span>
            <input
              type="radio"
              :name="photo"
              v-model="picked"
              value="2"
              @click="changeShape(2)"
            /><span>竖屏</span>
          </div>
          <button type="button" class="btnCropper" :id="'btnCropper' + photo">
            确 定
          </button>
          <button type="button" class="btnCancel" :id="'btnCancel' + photo">
            取 消
          </button>
          <span class="introjs-tips">鼠标滚轮可缩放图片尺寸</span>
        </div>
        <div class="jcrop-preview">
          <div class="preview" :id="'preview' + photo"></div>
        </div>
      </div>
      <input
        :id="'file' + photo"
        type="file"
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
  props: ["photo", "imgSrc"],
  data() {
    return {
      cropper: "",
      picked: "1"
    };
  },
  mounted() {
    this.preview();
    this.initUploader();
  },
  methods: {
    changeShape(a) {
      this.picked = a;
      $("#cropperBox" + this.photo).removeClass("show");
      $("#cropperBox" + this.photo + " .cropper-container.cropper-bg").remove();
      $("#overlay" + this.photo).hide();
      $("#file" + this.photo).val("");
      this.preview();
      this.initUploader();
      this.uploader();
    },
    uploader() {
      $("#file" + this.photo).val("");
      $("#file" + this.photo).click();
    },
    preview() {
      $("#preview" + this.photo).css({ width: "315", height: "206" });
      $("#btnCancel" + this.photo).click(() => {
        $("#cropperBox" + this.photo).removeClass("show");
        $("#overlay" + this.photo).hide();
        $("#file" + this.photo).val("");
        return false;
      });
    },
    initUploader() {
      var img = document.getElementById("img" + this.photo);
      if (this.picked == 2) {
        this.cropper = new Cropper(img, {
          aspectRatio: 0.7,
          preview: "#preview" + this.photo,
          dragMode: "move",
          minCropBoxWidth: 100
        });
      } else {
        this.cropper = new Cropper(img, {
          aspectRatio: 1.53,
          preview: "#preview" + this.photo,
          dragMode: "move",
          minCropBoxWidth: 100
        });
      }
    },
    changeImg(e) {
      var file = e.target.files[0];
      var fileName = e.target.value;
      let fileVal = this.common.checkFile(file, 2048, 1);
      if (fileVal) return this.$swal(fileVal, { buttons: "确定" });
      var bole = URL.createObjectURL(file);
      $("#img" + this.photo).attr("src", bole);
      $("#overlay" + this.photo).show();
      $("#cropperBox" + this.photo).css({ display: "block" });
      if (this.cropper) {
        this.cropper.replace(bole);
      }
      $("#cropperBox" + this.photo).addClass("show");
      $("#btnCropper" + this.photo).on("click", this.getImgFile);
    },
    getImgFile() {
      var file = document.getElementById("file" + this.photo);
      var fi = file.files[0];
      var name = fi.name;
      var fn = file.value.split(".");
      var ext = fn[fn.length - 1];
      var type = ext.toLowerCase() == "png" ? "image/png" : "image/jpeg";
      $("#cropperBox" + this.photo).removeClass("show");
      $("#overlay" + this.photo).hide();
      var src = this.cropper
        .getCroppedCanvas({ width: 315, height: 206 })
        .toDataURL(type, 1);
      //生成预览图
      $("#photo" + this.photo).html(
        '<img alt=""  id="nowImg' + this.photo + '">'
      );
      $("#nowImg" + this.photo).attr("src", src);
      //将图片转为blob
      var imgFile = this.dataURLToFile(src, name);
      imgFile.src = src;
      if (this.photo) {
        if (this.photo == 1) {
          console.log(imgFile);
          this.$parent.imgFile1 = imgFile;
        } else if (this.photo == 2) {
          this.$parent.imgFile2 = imgFile;
        } else if (this.photo == 3) {
          this.$parent.imgFile3 = imgFile;
        }
      } else {
        this.$parent.imgFile = imgFile;
      }
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
    }
  }
};
</script>
