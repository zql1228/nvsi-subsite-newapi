import Vue from "vue";
import App from "./App"; //入口
import router from "./router"; //路由
import store from "./store";
import VueAxios from "vue-axios"; //请求
axios.defaults.withCredentials = true; //允许axios请求携带cookie等凭证
// axios.defaults.timeout = 60 * 1000; // 配置请求超时
import qs from "qs"; //qs库
import utilscommit from "./assets/js/utils.js"; //请求路径
import common from "./assets/js/common.js"; //基础包
import getMaps from "./assets/js/getMap.js"; //获取地图信息
import leaplogin from "./assets/js/login.js"; //leap登录
import utilroutes from "./router/routes.js"; //基础包
import Print from "vue-print-nb"; //打印
import DatePicker from "vue2-datepicker"; //日期
import "vue2-datepicker/locale/zh-cn"; //中文-时间插件
require("!vue-style-loader!css-loader!../node_modules/vue2-datepicker/index.css");
require("!vue-style-loader!css-loader!./assets/css/base.css");
require("!vue-style-loader!css-loader!./assets/css/main.css");
require("!vue-style-loader!css-loader!./assets/fonts/UniveConBol.css");
require("!vue-style-loader!css-loader!./assets/css/cropper.min.css");

//去除部分警告
Vue.config.productionTip = false;
//工具类
Vue.prototype.utilscommit = utilscommit;
Vue.prototype.common = common;
Vue.prototype.$utilroutes = utilroutes;
Vue.prototype.getMaps = getMaps;
Vue.prototype.$qs = qs;
Vue.prototype.leaplogin = leaplogin;
Vue.prototype.$cryptoJS = CryptoJS; //加密

Vue.use(VueAxios, axios); //全局使用
Vue.prototype.$swal = swal;
Vue.use(Print); //打印
Vue.use(DatePicker); //时间弹出层
Vue.use(VueLazyload); //懒加载
Vue.use(VueLazyload, {
  error:
    "https://download.yxybb.com/project/MZ/resource/2020/11/23/imgmtbd.png",
  loading:
    "https://download.yxybb.com/project/MZ/resource/2020/11/23/imgmtbd.png",
  attempt: 1 //加载错误后最大尝试次数
}); //懒加载
Vue.config.productionTip = false;

Vue.filter("ellipsis", function(value, num) {
  //文本过滤，多余部分加省略号
  if (!value) return "";
  if (value.length > num) {
    return value.slice(0, num) + "...";
  }
  return value;
});

//文本过滤，多余部分加省略号
Vue.prototype.ellipsis = function(value, num) {
  if (!value) return "";
  if (value.length > num) {
    return value.slice(0, num) + "...";
  }
  return value;
};

Vue.filter("ellipsisNos", function(value, num, text) {
  //文本过滤
  if (!value && !text) return "";
  if (!value && text) return text;
  if (value.length > num) {
    return value.slice(0, num);
  }
  return value;
});

Vue.filter("ellipsisNosx", function(value, value1, num, text) {
  //文本过滤
  if (!value && !text) return "";
  if (!value && text) return text;
  if (value.length > num) {
    return value.slice(11, num) + "-" + value1.slice(11, num);
  }
  return value + "-" + value1;
});

Vue.filter("truncate", function(value, num, text) {
  //文本过滤
  if (!value) return "";
  if (value.length > num) {
    return value.slice(0, num) + text;
  }
  return value;
});

Vue.filter("addZero", (value = "") => {
  //数字补两个零
  if (!value) return "0.00";
  if (
    !["[object Number]", "[object String]"].includes(
      Object.prototype.toString.call(value)
    )
  ) {
    return value;
  }
  let num = value.toString().replace(/^(\d+)(\.\d+)?$/g, (big, ...args) => {
    let [a, b] = args;
    if (!b) b = ".";
    while (b.length <= 2) {
      b += "0";
    }
    return a + b;
  });
  return num;
});
// 数字补两个零
Vue.prototype.addZero = function(value) {
  if (!value) return "0.00";
  if (
    !["[object Number]", "[object String]"].includes(
      Object.prototype.toString.call(value)
    )
  ) {
    return value;
  }
  let num = value.toString().replace(/^(\d+)(\.\d+)?$/g, (big, ...args) => {
    let [a, b] = args;
    if (!b) b = ".";
    while (b.length <= 2) {
      b += "0";
    }
    return a + b;
  });
  return num;
};
Vue.prototype.truncate = function(value, num, text) {
  //处理字符串
  if (!value) return "";
  if (value.length > num) {
    return value.slice(0, num) + text;
  }
  return value;
};

// 过滤文本空字符、空格
Vue.prototype.ecellipsiSpace = function(text, num) {
  if (text) {
    var reg = /<[^<>]+>/g;
    text = text.replace(reg, "");
    text = text.replace(/&lt;[^&lt;&gt;]+&gt;/g, "");
    text = text.replace(/&nbsp;/gi, "");
    if (num && num > 0 && text.length > num) {
      text = text.substring(0, num) + "...";
    }
  }
  return text;
};

/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  store,
  components: { App },
  template: "<App/>"
});
