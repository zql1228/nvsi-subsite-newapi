//获取当前路径+上下文
const getUrl = function() {
  // var location = window.location;
  // var pathname = location.pathname;
  // var context = pathname.substring(0, pathname.substr(1).indexOf("/") + 1);
  // let url = location.protocol + "//" + location.host + context;
  // return url;
  let url = window.location.origin + "/NVSIDF";
  // let url = "https://chinavolunteer.mca.gov.cn/NVSILQ";
  return url;
  //return "/nvsidfapis/NVSI";
  // return 'http://192.168.6.157:8003/NVSI';
  // return 'https://chinavolunteer.mca.gov.cn/NVSI';
  // return 'https://wuhan.yxybb.com/NVSI';
};

//跳转老版总站时获取当前路径+上下文+/
const getUrls = function() {
  let context;
  if (window.location.host != "wuhan.yxybb.com") {
    context = "https://chinavolunteer.mca.gov.cn/NVSI";
  } else {
    context = "https://wuhan.yxybb.com/NVSI";
  }
  return context;
};

//获取当前路径
const getContent = function() {
  let url = "https://chinavolunteer.mca.gov.cn";
  if (window.location.host == "wuhan.yxybb.com") {
    //测试环境
    url = window.location.origin;
  }
  return url;
};

//获取当前区域信息
const areaInfo = function(routeDefine) {
  //routeDefine   动态路由  --->站点简称
  return JSON.parse(window.localStorage.getItem("subsite_areaInfo"));
  /* if(!window.localStorage.getItem("areaInfo")){
    return getareaInfo(routeDefine);
  }else if(window.localStorage.getItem("areaInfo") && window.localStorage.getItem("areaInfo").indexOf("}")==-1){
      return getareaInfo(routeDefine);
  }else{
    var areaInfo=JSON.parse(window.localStorage.getItem("areaInfo"));
    if(!areaInfo || areaInfo.enname!=routeDefine){
      return getareaInfo(routeDefine);
    }else{
      return areaInfo;
    }
  } */
};

//请求数据库中的区域信息
function getareaInfo(routeDefine) {
  Vue.utilscommit.requestapi(
    "getSiteInfoFrontWeb",
    { enname: routeDefine },
    /*  Vue.utilscommit.request(
    "nvsi_listWebDocsInfo",
    { enname: routeDefine }, */
    function(data) {
      //头部信息
      if (data && data.data) {
        window.localStorage.setItem(
          "subsite_areaInfo",
          JSON.stringify(data.data)
        );
        return data.data;
      } else {
        return null;
      }
    }
  );
}

// 验证身份证号码
const checkCardNo = function(cardno) {
  // var regIdCard = /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/;
  var regIdCard = /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}X)$)$/;
  if (regIdCard.test(cardno)) {
    if (cardno.length == 18) {
      var idCardWi = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
      var idCardY = [1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2];
      var idCardWiSum = 0;
      for (var i = 0; i < 17; i++) {
        idCardWiSum += cardno.substring(i, i + 1) * idCardWi[i];
      }
      var idCardMod = idCardWiSum % 11;
      var idCardLast = cardno.substring(17);
      if (idCardMod == 2) {
        // return idCardLast == "X" || idCardLast == "x";
        return idCardLast == "X";
      } else {
        // 用计算出的验证码与最后一位身份证号码匹配，如果一致，说明通过，否则是无效的身份证号码
        return idCardLast == idCardY[idCardMod];
      }
    } else {
      return true;
    }
  } else {
    return false;
  }
};

// 验证手机号
const checkPhoneno = function(phoneno) {
  var phonenoExp = /^(13[0-9]|14[0-9]|15[0-9]|16[0-9]|17[0-9]|18[0-9]|19[0-9])\d{8}$/;
  return phonenoExp.test(phoneno);
};

//获取验证码
const changeCode = function(node) {
  var selectChar = new Array(
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z"
  ); //所有候选组成验证码的字符，当然也可以用中文的
  var elementChar = new Array("font", "i", "b");
  var code = "";
  var codeLength = 4; //验证码的长度
  var html = "";
  for (var i = 0; i < codeLength; i++) {
    var charIndex = Math.floor(Math.random() * 33);
    code += selectChar[charIndex];
    var r = parseInt(Math.random() * 155);
    var g = parseInt(Math.random() * 155);
    var b = parseInt(Math.random() * 155);
    var e = parseInt(Math.random() * 3);
    var s = parseInt(Math.random() * 10) + 18;
    var color = "rgb(" + r + "," + g + "," + b + ")";
    /* html += "<"+elementChar[e]+" style='font-size:"+ s +"px;color: "+color+"'>"+selectChar[charIndex]+"</"+elementChar[e]+">&nbsp;";*/
    html +=
      "<" +
      elementChar[e] +
      " style='font-size:20px;margin-left:1px;color: " +
      color +
      "'>" +
      selectChar[charIndex] +
      "</" +
      elementChar[e] +
      ">&nbsp;";
  }
  $("#" + node).html(html);
  return code;
};

const getCookie = function(name) {
  var strCookie = document.cookie;
  var arrCookie = strCookie.split("; ");
  for (var i = 0; i < arrCookie.length; i++) {
    var arr = arrCookie[i].split("=");
    if (arr[0] == name) return decodeURIComponent(arr[1]);
  }
  return "";
};

const addCookie = function(name, value, expiresHours, type) {
  //name->key,expiresHours->时长，deadTime，截止时间
  if (expiresHours > 0) {
    var path = "/";
    var name = encodeURI(name);
    var value = encodeURIComponent(value);
    var expires = new Date();
    if (type == 1) {
      //截止当天23:59:59
      expires.setTime(
        new Date(new Date().toLocaleDateString()).getTime() +
          24 * 60 * 60 * 1000
      );
    } else if (expiresHours) {
      expires.setTime(expires.getTime() + expiresHours * 60 * 60 * 1000);
    }
    path = path == "" ? "" : ";path=" + path;
    const _expires =
      typeof hours == "string" ? "" : ";expires=" + expires.toUTCString();
    document.cookie = name + "=" + value + _expires + path;
  }
};

const deleteCookie = function(name) {
  var date = new Date();
  date.setTime(date.getTime() - 10000);
  document.cookie = name + "=v; expires=" + date.toGMTString() + ";path=/";
};

// 用户名验证
const checkUsername = function(username) {
  if (username.slice(0, 3) == "mz_" || username.slice(0, 3) == "wm_") {
    return false;
  }
  var usernameExp = /^[A-z][A-z_0-9]{5,19}$/;
  return usernameExp.test(username);
};

// 密码验证
const checkPW = function(pw) {
  //var pwExp = /^(?=.*[0-9])(?=.*[a-zA-Z])(.{8,20})$/;
  var pwExp = /^(?=.*[0-9].*)(?=.*[A-Z].*)(?=.*[a-z].*).{8,20}$/; //8-20个字符，且必须同时包含数字、大写字母和小写字母
  // console.log("密码强度   ",pwExp.test(pw))
  return pwExp.test(pw);
};

//去掉字符串中所有空格
const trimAll = function(str) {
  if (str) {
    str = str.replace(/\s/g, "");
    if (str != "") {
      return str;
    } else {
      return null;
    }
  } else {
    return null;
  }
};

// 验证姓名（包含生僻字）
const checkName = function(arg) {
  var reg = /^[A-z]+$|^[a-zA-Z]+(\s*[a-zA-Z]+)+$|^((?![\u3000-\u303F])[\u2E80-\uFE4F]|\·)*(?![\u3000-\u303F])[\u2E80-\uFE4F](\·)*$/;
  return reg.test(arg);
};

// 允许英文中间有空格
// const checkNamekg = function(arg) {
//   var reg = /^[a-zA-Z]+(\s*[a-zA-Z]+)*$/;
//   return reg.test(arg);
// }

// 邮箱验证
const checkEmail = function(email) {
  //var emailExp = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
  var emailExp = /^(\w-*\.*)+@(\w-?)+(\.[a-zA-Z]{2,})+$/; //域名只能为英文
  return emailExp.test(email);
};

// 验证固定电话
const checkTelPhoneno = function(data) {
  var dataExp = /^((0\d{2,3})-)(\d{7,8})(-(\d{3,4}))?$/;
  return dataExp.test(data);
};

// 验证QQ号
const checkqqphoneno = function(qq) {
  var qqExp = /^[1-9]\d{4,10}$/; ///^\d{5,11}$/;
  return qqExp.test(qq);
};

// 验证是否为英文
const checkEnglishOnly = function(arg) {
  var qqExp = /^[A-Za-z]+$/;
  return qqExp.test(arg);
};

// 验证是否为整数或小数，小数最多一位小数
const checkNumber = function(arg) {
  var qqExp = /^(([1-9]\d*)|(0))(\.\d?)?$/;
  return qqExp.test(arg);
};

const orderBy = function(source, order, type) {
  if (source instanceof Array && order.length > 0) {
    return groupOrder(source, order, type);
  } else {
    return source;
  }
};

function groupOrder(source, order, type) {
  return source.sort(function(a, b) {
    var ca = a[order];
    var cb = b[order];
    if (typeof ca == "string" && typeof cb == "string") {
      if (type.toUpperCase() == "ASC") {
        return ca.localeCompare(cb);
      } else {
        return cb.localeCompare(ca);
      }
    } else {
      if (type.toUpperCase() == "ASC") {
        return ca - cb;
      } else {
        return cb - ca;
      }
    }
  });
}

//验证小数点后两位
const checkApplyTime = function(arg) {
  //var reg = /^([0-9]+\.[5])|10|[1-9]$/;
  //var reg = /^\d*(\.(5|0)?$/; // 验证申请时长0.5-10，最多一位小数，小数只能为0或5\d+(\.[05])?
  var reg = /^\d*(\.[0-9]{2})?$/;
  return reg.test(arg);
};

//验证普通图片
const checkFile = function(file, units) {
  //文件file   ，units 单位：多少k
  if (!file.size) {
    return "不能为空！";
  } else {
    //文件后缀
    var ext = file.name.substring(
      file.name.lastIndexOf(".") + 1,
      file.name.length
    );
    if (units > 1024) {
      //普通图片
      if (!/gif|png|jpg|jpeg/i.test(ext))
        return "只支持格式为jpg、png、jpeg、gif的图片！";
    } else {
      if (!/png|jpg|jpeg/i.test(ext))
        return "只支持格式为jpg、png、jpeg的图片！";
    }
    //文件大小
    var filesize = (file.size / 1024).toFixed(2);
    var activeUnits = "200k";
    if (units > 1024) activeUnits = "2M";
    if (filesize > units) return "图片大小不能超过" + activeUnits + "！";
  }
  return;
};

//首页跳转多栏目新闻
const toNews = function(el, type) {
  //对象
  if (el && el.albx6006 == 6) {
    //引用总站的多栏目新闻详情
    window.open(this.getContent() + "/site/news/2/" + el.albx6017);
  } else if (el) {
    if (!type && el.albx6003 == 2) {
      type = 1;
    } else if (!type) {
      type = 2;
    }
    Vue.$utilroutes.toNews(type, el.id);
  }
};

//跳转新闻详情
const getNewsInfo = function(newsid, type) {
  //对象
  if (type && type == 6) {
    //引用
    window.open(this.getContent() + `/site/newsinfo/${1}/${newsid}`);
  } else {
    Vue.$utilroutes.toNewsInfo(1, newsid);
  }
};

// 判断展示数据
const getComShowtype = function(albp0087, basicInfo, albp0063, albp0010) {
  var area = Vue.$store.getters.getArea;
  var nowareaid = area.areaid;
  if (
    albp0087 == "1" &&
    (!basicInfo.albp0020 || !basicInfo.albp0028 || !albp0010)
  ) {
    //志愿者未填写服务区域或居住区域或者
    return 1;
  } else if (!albp0063 || albp0063 == "0") {
    //实名认证失败
    return 3;
  } else if (
    basicInfo.albp0020 &&
    nowareaid &&
    basicInfo.albp0020.substring(0, 2) != nowareaid.substring(0, 2)
  ) {
    //非本站志愿者
    return 2;
  } else if (
    (basicInfo.albp0020 && basicInfo.albp0020.substring(4, 6) == "00") ||
    (basicInfo.albp0028 && basicInfo.albp0028.substring(4, 6) == "00")
  ) {
    //服务区域和居住区域未选择到区县级(区划id第五六位不等于0)
    return 4;
  }
  return 0;
};

//获取总站地址
const getASite = function() {
  let txt = this.getContent();
  return txt + "/site/home";
};

//获取总站地址
const getASitel = function() {
  let a = "https://chinavolunteer.mca.gov.cn";
  if (window.location.host == "wuhan.yxybb.com") {
    //测试
    a = "https://wuhan.yxybb.com/NVSI/LEAP/site/index.html#/home";
  }
  return a;
};

//设置分页data中的数据
const getTolData = function(that, result) {
  if (result) {
    that.tolCount = result.totalCount;
    that.tolPage = result.pageCount;
  } else {
    that.tolCount = 0;
    that.tolPage = 0;
  }
};

//设置分站点数据
const siteList = function(that, result) {
  var list = [
    { path: "js.chinavolunteer.cn", name: "jiangsu", sname: "江苏" }, //江苏
    { path: "hebei.chinavolunteer.mca.gov.cn", name: "hebei", sname: "河北" }, //河北
    { path: "shanxi.chinavolunteer.mca.gov.cn", name: "shanxi", sname: "山西" }, //山西
    /* {path:'fj.chinavolunteer.cn',name:'fujian',sname:'福建'},//福建 */
    { path: "fjvs.org", name: "fujian", sname: "福建" }, //福建
    { path: "tax.chinavolunteer.cn", name: "shuishou", sname: "税收" }, //福建
    {
      path: "nmg.chinavolunteer.mca.gov.cn",
      name: "neimonggol",
      sname: "内蒙古"
    }, // 内蒙古
    {
      path: "hlj.chinavolunteer.mca.gov.cn",
      name: "heilongjiang",
      sname: "黑龙江"
    }, //黑龙江
    { path: "zj.chinavolunteer.mca.gov.cn", name: "zhejiang", sname: "浙江" }, //浙江
    { path: "jx.chinavolunteer.mca.gov.cn", name: "jiangxi", sname: "江西" }, //江西
    { path: "sd.chinavolunteer.mca.gov.cn", name: "shandong", sname: "山东" }, //山东
    { path: "gd.chinavolunteer.mca.gov.cn", name: "guangdong", sname: "广东" }, //广东
    { path: "gx.chinavolunteer.mca.gov.cn", name: "guangxi", sname: "广西" }, //广西
    { path: "sc.chinavolunteer.mca.gov.cn", name: "sichuan", sname: "四川" }, //四川
    {
      path: "shaanxi.chinavolunteer.mca.gov.cn",
      name: "shaanxi",
      sname: "陕西"
    }, // 陕西
    { path: "gs.chinavolunteer.mca.gov.cn", name: "gansu", sname: "甘肃" }, //甘肃
    {
      path: "xjbt.chinavolunteer.mca.gov.cn",
      name: "bingtuan",
      sname: "新疆建设生产兵团"
    }, //新疆兵团
    { path: "bj.chinavolunteer.mca.gov.cn", name: "beijing", sname: "北京" }, //北京
    { path: "cq.chinavolunteer.mca.gov.cn", name: "chongqing", sname: "重庆" }, //重庆
    { path: "ah.chinavolunteer.mca.gov.cn", name: "anhui", sname: "安徽" }, //安徽
    { path: "nx.chinavolunteer.mca.gov.cn", name: "ningxia", sname: "宁夏" }, //宁夏
    { path: "hubei.chinavolunteer.mca.gov.cn", name: "hubei", sname: "湖北" }, //湖北
    { path: "ln.chinavolunteer.mca.gov.cn", name: "liaoning", sname: "辽宁" }, //辽宁
    { path: "tj.chinavolunteer.mca.gov.cn", name: "tianjin", sname: "天津" }, //天津
    { path: "henan.chinavolunteer.mca.gov.cn", name: "henan", sname: "河南" }, //河南
    { path: "hainan.chinavolunteer.mca.gov.cn", name: "hainan", sname: "海南" }, //海南
    { path: "xj.chinavolunteer.mca.gov.cn", name: "xinjiang", sname: "新疆" }, //新疆
    { path: "yn.chinavolunteer.mca.gov.cn", name: "yunnan", sname: "云南" }, //云南
    { path: "jl.chinavolunteer.mca.gov.cn", name: "jilin", sname: "吉林" }, //吉林
    { path: "qh.chinavolunteer.mca.gov.cn", name: "qinghai", sname: "青海" }, //青海
    { path: "hunan.chinavolunteer.mca.gov.cn", name: "hunan", sname: "湖南" }, //湖南
    { path: "xz.chinavolunteer.mca.gov.cn", name: "xizang", sname: "西藏" }, //西藏
    { path: "gz.chinavolunteer.mca.gov.cn", name: "guizhou", sname: "贵州" } //贵州
  ];
  return list;
};

//验证网址前7位
const checkWebsite = function(arg) {
  var reg = /^((http|https):\/\/)?(([A-Za-z0-9]+-[A-Za-z0-9]+|[A-Za-z0-9]+)\.)+([A-Za-z]+)[/\?\:]?.*$/;
  return reg.test(arg);
};

const notAfterToday = function(date) {
  //截止今天
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return date > new Date();
};

//北京站点跳转
const toBjSite = function() {
  window.open("https://www.bv2008.cn/");
};

const changeImgsrc = function(imgsrc, type) {
  if (imgsrc && imgsrc.indexOf("LEAP") > 0) {
    return this.getUrl() + imgsrc;
  } else if (imgsrc) {
    return imgsrc;
  } else {
    if (type && type == 1) {
      //队伍默认图
      return require("../../assets/img/i1.png");
    } else if (type && type == 2) {
      //附件下载
      return null;
    } else {
      return "https://download.yxybb.com/project/MZ/resource/2020/11/23/imgmtbd.png";
    }
  }
};

// 判断志愿者是否完善资料
const infoIsComplete = info => {
  return info.albp0020 && info.albp0028;
};

// 全国区划列表
const areaList = [
  {
    areaid: 11,
    name: "北京市",
    sname: "beijing",
    path: "http://bj.chinavolunteer.mca.gov.cn/subsite/beijing/home"
  },
  {
    areaid: 12,
    name: "天津市",
    sname: "tianjin",
    path: "http://tj.chinavolunteer.mca.gov.cn/subsite/tianjin/home"
  },
  {
    areaid: 13,
    name: "河北省",
    sname: "hebei",
    path: "http://hebei.chinavolunteer.mca.gov.cn/subsite/hebei/home"
  },
  {
    areaid: 14,
    name: "山西省",
    sname: "shanxi",
    path: "http://shanxi.chinavolunteer.mca.gov.cn/subsite/shanxi/home"
  },
  {
    areaid: 15,
    name: "内蒙古自治区",
    sname: "neimonggol",
    path: "http://nmg.chinavolunteer.mca.gov.cn/subsite/neimonggol/home"
  },
  {
    areaid: 21,
    name: "辽宁省",
    sname: "liaoning",
    path: "http://ln.chinavolunteer.mca.gov.cn/subsite/liaoning/home"
  },
  {
    areaid: 22,
    name: "吉林省",
    sname: "jilin",
    path: "http://jl.chinavolunteer.mca.gov.cn/subsite/jilin/home"
  },
  {
    areaid: 23,
    name: "黑龙江省",
    sname: "heilongjiang",
    path: "http://hlj.chinavolunteer.mca.gov.cn/subsite/heilongjiang/home"
  },
  {
    areaid: 31,
    name: "上海市",
    sname: "shanghai",
    path: "http://www.shcvs.cn/gysh_cm.portal/index.html"
  },
  {
    areaid: 32,
    name: "江苏省",
    sname: "jiangsu",
    path: "http://js.chinavolunteer.cn/jszy/home"
  },
  {
    areaid: 33,
    name: "浙江省",
    sname: "zhejiang",
    path: "http://zj.chinavolunteer.mca.gov.cn/subsite/zhejiang/home"
  },
  {
    areaid: 34,
    name: "安徽省",
    sname: "anhui",
    path: "http://ah.chinavolunteer.mca.gov.cn/subsite/anhui/home"
  },
  {
    areaid: 35,
    name: "福建省",
    sname: "fujian",
    path: "https://www.fjvs.org/subsite/fujian/home"
  },
  {
    areaid: 36,
    name: "江西省",
    sname: "jiangxi",
    path: "http://jx.chinavolunteer.mca.gov.cn/subsite/jiangxi/home"
  },
  {
    areaid: 37,
    name: "山东省",
    sname: "shandong",
    path: "http://sd.chinavolunteer.mca.gov.cn/subsite/shandong/home"
  },
  {
    areaid: 41,
    name: "河南省",
    sname: "henan",
    path: "http://henan.chinavolunteer.mca.gov.cn/subsite/henan/home"
  },
  {
    areaid: 42,
    name: "湖北省",
    sname: "hubei",
    path: "http://hubei.chinavolunteer.mca.gov.cn/subsite/hubei/home"
  },
  {
    areaid: 43,
    name: "湖南省",
    sname: "hunan",
    path: "http://hunan.chinavolunteer.mca.gov.cn/subsite/hunan/home"
  },
  {
    areaid: 44,
    name: "广东省",
    sname: "guangdong",
    path: "http://gd.chinavolunteer.mca.gov.cn/subsite/guangdong/home"
  },
  {
    areaid: 45,
    name: "广西壮族自治区",
    sname: "guangxi",
    path: "http://gx.chinavolunteer.mca.gov.cn/subsite/guangxi/home"
  },
  {
    areaid: 46,
    name: "海南省",
    sname: "hainan",
    path: "http://hainan.chinavolunteer.mca.gov.cn/subsite/hainan/home"
  },
  {
    areaid: 50,
    name: "重庆市",
    sname: "chongqing",
    path: "http://cq.chinavolunteer.mca.gov.cn/subsite/chongqing/home"
  },
  {
    areaid: 51,
    name: "四川省",
    sname: "sichuan",
    paht: "http://sc.chinavolunteer.mca.gov.cn/subsite/sichuan/home"
  },
  {
    areaid: 52,
    name: "贵州省",
    sname: "guizhou",
    path: "http://gz.chinavolunteer.mca.gov.cn/subsite/guizhou/home"
  },
  {
    areaid: 53,
    name: "云南省",
    sname: "yunnan",
    path: "http://yn.chinavolunteer.mca.gov.cn/subsite/yunnan/home"
  },
  {
    areaid: 54,
    name: "西藏自治区",
    sname: "xizang",
    path: "http://xz.chinavolunteer.mca.gov.cn/subsite/xizang/home"
  },
  {
    areaid: 61,
    name: "陕西省",
    sname: "shaanxi",
    path: "http://shaanxi.chinavolunteer.mca.gov.cn/subsite/shaanxi/home"
  },
  {
    areaid: 62,
    name: "甘肃省",
    sname: "gansu",
    path: "http://gs.chinavolunteer.mca.gov.cn/subsite/gansu/home"
  },
  {
    areaid: 63,
    name: "青海省",
    sname: "qinghai",
    path: "http://qh.chinavolunteer.mca.gov.cn/subsite/qinghai/home"
  },
  {
    areaid: 64,
    name: "宁夏回族自治区",
    sname: "ningxia",
    path: "http://nx.chinavolunteer.mca.gov.cn/subsite/ningxia/home"
  },
  {
    areaid: 65,
    name: "新疆维吾尔自治区",
    sname: "xinjiang",
    path: "http://xj.chinavolunteer.mca.gov.cn/subsite/xinjiang/home"
  },
  { areaid: 71, name: "台湾省" },
  { areaid: 81, name: "香港" },
  { areaid: 82, name: "澳门" }
];

// 证件号脱敏，只显示前后两位
const noDes = no => {
  if (no.length <= 4) {
    return no;
  }
  // let start = no.substring(0, 2)
  let end = no.substring(no.length - 4, no.length);
  let stars = "";
  for (let i = 0; i < no.length - 4; i++) {
    stars += "*";
  }
  return stars + end;
};

// 手机号脱敏，隐藏手机号中间4位
const phoneDes = no => {
  let regex = "$1****$2";
  let reg = /^(\d{3})\d{4}(\d{4})/;
  return no.replace(reg, regex);
};

const checkChinese = function(name) {
  //生僻字
  var reg = /[\u4E00-\u9FA5]/; //常见字
  // var reg = /^((?![ \u3000-\u303F])[\u2E80-\uFE4F]|\·)*(?![\u3000-\u303F])[\u2E8e-\uFE4F](\·)*$/;//包含生僻字
  return reg.test(name);
};

export default {
  getUrl,
  getContent,
  areaInfo,
  checkCardNo,
  checkPhoneno,
  changeCode,
  getCookie,
  addCookie,
  deleteCookie,
  checkUsername,
  checkPW,
  trimAll,
  checkName,
  checkEmail,
  checkTelPhoneno,
  checkqqphoneno,
  checkEnglishOnly,
  checkNumber,
  orderBy,
  checkApplyTime,
  checkFile,
  toNews,
  getNewsInfo,
  getComShowtype,
  /*  ecryptPhone, */
  getTolData,
  getASite, //总站地址
  siteList,
  checkWebsite, //验证网址前7位
  notAfterToday, //截止今天
  // checkNamekg
  toBjSite,
  changeImgsrc,
  infoIsComplete,
  areaList,
  noDes, // 证件号脱敏
  phoneDes,
  checkChinese,
  getUrls,
  getASitel
};
