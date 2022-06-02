import Vue from "vue";
import Router from "vue-router"; //路由
import home from "@/view/home"; //首页（不含布局）
// import home1 from "@/view/home1"; //首页（含布局）
import common from "@/assets/js/common.js"; //基础包

Vue.use(Router);

const routes = [
  {
    path: "/loginwx",
    name: "loginwx",
    component: () => import("@/view/login/loginwx"),
    meta: { title: "wx登录" }
  },
  {
    path: "/home",
    name: "home",
    component: home,
    meta: { title: "首页" }
  },
  /* {
    path: "/index",
    name: "index",
    component: home1,
    meta: { title: "首页" }
  }, */
  {
    path: "/project",
    name: "project",
    component: () => import("@/view/project/project"),
    meta: { title: "志愿项目" }
  },
  {
    path: "/projectInfo/:data1/:data2",
    name: "projectInfo",
    component: () => import("@/view/project/projectInfo"),
    meta: { title: "志愿项目详情" }
  },
  {
    path: "/group",
    name: "group",
    component: () => import("@/view/group/group"),
    meta: { title: "志愿队伍" }
  },
  {
    path: "/groupInfo/:data1/:data2",
    name: "groupInfo",
    component: () => import("@/view/group/groupInfo"),
    meta: { title: "志愿队伍详情" }
  },
  /*  {
    path: '/zykx/:type/:id',
    name: 'zykx',
    component:() => import('@/view/zykx/zykx'),
    meta: {title: '志愿快讯'}
  }, */
  {
    path: "/news/:type/:id",
    name: "news",
    component: () => import("@/view/zykx/news"),
    meta: { title: "志愿快讯" }
  },
  {
    path: "/newsInfo/:type/:id",
    name: "newsInfo",
    component: () => import("@/view/zykx/newsInfo"),
    meta: { title: "志愿快讯" }
  },
  {
    path: "/themeInfo/:id",
    name: "themeInfo",
    component: () => import("@/view/theme/themeInfo"),
    meta: { title: "专题专栏" }
  },
  /* 新版新闻路由 ---  开始 */
  {
    path: "/sitenews/:name",
    name: "sitenews",
    component: () => import("@/view/news/news"),
    meta: { title: "新闻" }
  },
  {
    path: "/sitenewsInfo/:id",
    name: "sitenewsInfo",
    component: () => import("@/view/news/newsInfo"),
    meta: { title: "文字新闻详情" }
  },
  {
    path: "/sitevideoInfo/:id",
    name: "sitevideoInfo",
    component: () => import("@/view/news/videoInfo"),
    meta: { title: "视频新闻详情" }
  },
  /* 新版新闻路由 ---  结束 */
  {
    path: "/login/:type",
    name: "login",
    component: () => import("@/view/login/login"),
    meta: { title: "登录" }
  },
  {
    path: "/volreg",
    name: "volreg",
    component: () => import("@/view/login/volreg"),
    meta: { title: "志愿者注册" }
  },
  {
    path: "/orgreg",
    name: "orgreg",
    component: () => import("@/view/login/orgreg"),
    meta: { title: "志愿队伍注册" }
  },
  {
    path: "/usercenter",
    name: "usercenter",
    component: () => import("@/view/usercenter/usercenter"),
    meta: { titlename: "用户中心" },
    redirect: "/:define/userinfo", //{name: 'userinfo'},
    children: [
      {
        path: "/userinfo",
        name: "userinfo",
        component: () => import("@/view/usercenter/userinfo"),
        meta: { titlename: "我的首页" }
      },
      {
        path: "/usercard",
        name: "usercard",
        component: () => import("@/view/usercenter/usercard"),
        meta: { titlename: "志愿者证" }
      },
      {
        path: "/myproving",
        name: "myproving",
        component: () => import("@/view/usercenter/myproving"),
        meta: { titlename: "我的求证" }
      },
      {
        path: "/mycomment",
        name: "mycomment",
        component: () => import("@/view/usercenter/mycomment"),
        meta: { titlename: "我的评论" }
      },
      {
        path: "/updatedata",
        name: "updatedata",
        component: () => import("@/view/usercenter/updatedata"),
        meta: { titlename: "修改资料" }
      },
      {
        path: "/updateiden",
        name: "updateiden",
        component: () => import("@/view/usercenter/updateiden"),
        meta: { titlename: "修改资料" }
      },
      {
        path: "/updateother",
        name: "updateother",
        component: () => import("@/view/usercenter/updateother"),
        meta: { titlename: "修改资料" }
      },
      {
        path: "/updatetamasha",
        name: "updatetamasha",
        component: () => import("@/view/usercenter/updatetamasha"),
        meta: { titlename: "修改资料" }
      },
      {
        path: "/updatepassword",
        name: "updatepassword",
        component: () => import("@/view/usercenter/updatepassword"),
        meta: { titlename: "修改密码" }
      },
      {
        path: "/updatestar",
        name: "updatestar",
        component: () => import("@/view/usercenter/updatestar"),
        meta: { titlename: "兑换星级" }
      },
      {
        path: "/message",
        name: "message",
        component: () => import("@/view/usercenter/message"),
        meta: { titlename: "站内信" }
      },
      {
        path: "/myfriends",
        name: "myfriends",
        component: () => import("@/view/usercenter/myfriends"),
        meta: { titlename: "我的好友" }
      },
      {
        path: "/mystudy",
        name: "mystudy",
        component: () => import("@/view/usercenter/mystudy"),
        meta: { titlename: "我的学习" }
      },
      {
        path: "/myreport",
        name: "myreport",
        component: () => import("@/view/usercenter/myreport"),
        meta: { titlename: "我的举报" }
      },
      {
        path: "/mycommend",
        name: "mycommend",
        component: () => import("@/view/usercenter/mycommend"),
        meta: { titlename: "我的表彰" }
      },
      {
        path: "/myorg",
        name: "myorg",
        component: () => import("@/view/usercenter/myorg"),
        meta: { titlename: "我的队伍" }
      },
      {
        path: "/myproject",
        name: "myproject",
        component: () => import("@/view/usercenter/myproject"),
        meta: { titlename: "我的项目" }
      },
      {
        path: "/myschedule",
        name: "myschedule",
        component: () => import("@/view/usercenter/myschedule"),
        meta: { titlename: "我的排班" }
      },
      {
        path: "/myservicetime",
        name: "myservicetime",
        component: () => import("@/view/usercenter/myservicetime"),
        meta: { titlename: "我的时长" }
      },
      {
        path: "/myevaluate",
        name: "myevaluate",
        component: () => import("@/view/usercenter/myevaluate"),
        meta: { titlename: "我的评价" }
      },
      {
        path: "/mytransfer",
        name: "mytransfer",
        component: () => import("@/view/usercenter/mytransfer"),
        meta: { titlename: "记录转移" }
      },
      {
        path: "/servicelog",
        name: "servicelog",
        component: () => import("@/view/usercenter/servicelog"),
        meta: { titlename: "下载证明" }
      },
      {
        path: "/starapply",
        name: "starapply",
        component: () => import("@/view/usercenter/starapply"),
        meta: { titlename: "星级申请" }
      },
      {
        path: "/myexchange",
        name: "myexchange",
        component: () => import("@/view/usercenter/myexchange"),
        meta: { titlename: "我的兑换" }
      },
      {
        path: "/myfamily",
        name: "myfamily",
        component: () => import("@/view/usercenter/myfamily"),
        meta: { titlename: "我的家庭" }
      },
      {
        path: "/mycredit",
        name: "mycredit",
        component: () => import("@/view/usercenter/mycredit"),
        meta: { titlename: "我的信用" }
      }
    ]
  },
  /*  {
    path: '/video/:type/:id',
    name: 'video',
    component:() => import('@/view/zykx/video'),
    meta: {titlename: '网站视频'}
  }, */
  {
    path: "/videoinfo/:id",
    name: "videoinfo",
    component: () => import("@/view/zykx/videoinfo"),
    meta: { titlename: "视频详情" }
  },
  {
    path: "/attestation/:id",
    name: "attestation",
    component: () => import("@/view/login/attestation"),
    meta: { titlename: "实名认证" }
  },
  {
    path: "/volinfo/:data1/:data2",
    name: "volinfo",
    component: () => import("@/view/usercenter/volinfo"),
    meta: { titlename: "志愿者" }
  },
  {
    path: "/infosearch",
    name: "infosearch",
    component: () => import("@/view/search/infosearch"),
    meta: { titlename: "志愿信息查询" }
  },
  {
    path: "/proShare/:data1/:data2",
    name: "proShare",
    component: () => import("@/view/project/projectShare"),
    meta: { titlename: "志愿项目分享" }
  },
  {
    path: "/groupShare/:data1/:data2",
    name: "groupShare",
    component: () => import("@/view/group/groupShare"),
    meta: { titlename: "志愿队伍分享" }
  },
  {
    path: "/rankList",
    name: "rankList",
    component: () => import("@/view/zykx/rankDetail"),
    meta: { titlename: "统计分析" }
  },
  // 新版总站暂时没上 把账户申述和忘记密码先迁到子站这
  {
    path: "/forgetpwd1/:type",
    name: "forgetpwd1",
    component: () => import("@/view/forgetpwd/forgetpwd1"), //找回密码第一步（验证用户名）
    meta: { title: "找回密码", type: 1 }
  },
  {
    path: "/forgetpwd_check/:id/:type",
    name: "forgetpwd_check",
    component: () => import("@/view/forgetpwd/forgetpwd_check"), //找回密码第一步(选择用户信息验证)
    meta: { title: "找回密码", type: 1 }
  },
  {
    path: "/forgetpwd_checkout/:id/:type",
    name: "forgetpwd_checkout",
    component: () => import("@/view/forgetpwd/forgetpwd_checkout"), //找回密码第一步（验证用户账户信息）
    meta: { title: "找回密码", type: 1 }
  },
  {
    path: "/forgetpwd2/:tabtype",
    name: "forgetpwd2",
    component: () => import("@/view/forgetpwd/forgetpwd2"), //找回密码第二步（验证身份）
    meta: { title: "找回密码", type: 1 }
  },
  {
    path: "/forgetpwd3",
    name: "forgetpwd3",
    component: () => import("@/view/forgetpwd/forgetpwd3"), //找回密码第三步（修改密码）
    meta: { title: "找回密码", type: 1 }
  },
  {
    path: "/forgetpwd4",
    name: "forgetpwd4",
    component: () => import("@/view/forgetpwd/forgetpwd4"), //找回密码第四步（结束）
    meta: { title: "找回密码", type: 1 }
  },
  {
    path: "/findpwd",
    name: "findpwd",
    component: () => import("@/view/forgetpwd/findpwd"), //申诉
    meta: { title: "账号申诉", type: 1 }
  },
  {
    path: "/appeal",
    name: "appeal",
    component: () => import("@/view/forgetpwd/appeal"), //申诉进度
    meta: { title: "账号申诉进度", type: 1 }
  },
  //
  {
    path: "/redirect",
    name: "redirect",
    component: () => import("@/view/redirect"),
    meta: { titlename: "" }
  },
  {
    path: "*",
    name: "error",
    component: () => import("@/view/error"),
    meta: { titlename: "404" }
  }
];

//解决路由设置报错
const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err);
};

//不需要显示站点信息去掉该部分
//添加统一路由参数（站点信息）
for (var i = 0; i < routes.length - 1; i++) {
  //使用通配符的路径除外
  var path = routes[i].path;
  if (path != null) {
    routes[i].path = "/:define" + path;
  }
  if (routes[i].name == "usercenter") {
    //个人中心中的路由
    let children_user = routes[i].children;
    for (let j = 0; j < children_user.length; j++) {
      var children_path = children_user[j].path;
      if (children_path != null)
        children_user[j].path = "/:define" + children_path;
    }
  }
}

//设置初始地址重定向
routes.push({
  path: "",
  redirect: to => {
    let define = "hubei"; //默认动态域名是北京
    // if(window.location.host=="js.chinavolunteer.cn")define="jiangsu";//江苏
    let siteList = common.siteList();
    siteList.forEach(element => {
      if (window.location.host == element.path) {
        define = element.name;
      }
    });
    var path = {
      name: "home", //别名
      params: {
        define: define //一级路径名称
      }
    };
    return path;
  }
});
/* const getBasePath = () => {
  var url = process.env.BASE_API;
  var base = "/";
  if ( url != null) {
    var url = url.replace("http://", "").replace("https://", "");
    var arr = url.split("/");
    if ( arr.length > 1 && arr[1] != "") {
      base = "/" + arr[1] + "/";
    }
  }
  return base;
}  */
const router = new Router({
  mode: "history", //如果删掉这一行，那就是hash模式，hash模式会给地址栏加一个#
  //设置基路径
  base: "/subsite/",
  routes: routes
});

router.beforeEach((to, from, next) => {
  //前置守卫
  if (to.params.define) {
    let siteList = common.siteList();
    siteList.forEach(element => {
      if (to.params.define == element.name) {
        document.title = element.sname + "志愿服务网";
      }
    });
  }
  if (to.name == "home") {
    //若是首页
    if (
      router.app.$options.store.getters.getArea &&
      router.app.$options.store.getters.getArea.industrycode
    ) {
      //特殊站点默认首页为项目列表页面
      router.push({ name: "project", params: { define: to.params.define } });
    } else {
      next();
    }
  } else {
    next();
  }
  //同步加载平台Net.js(非开发模式才会加载)
  /*if (  from.fullPath == '/' && typeof leapclient != 'object') {//process.env.ENV_CONFIG != 'dev' &&
    loadNetJs(next);
    return;
  }*/
  /* if(to.name=="login"){
    window.location.href="http://chinavolunteer.cn/NVSI/LEAP/dist/index.html#/jiangsu/login/"+to.params.type;
  }else{
    next();
  } */
});

//加载Net.js文件
/*function loadNetJs(_callback) {
  var script = document.createElement('script');
  var head = document.getElementsByTagName('head')[0];
  script.type = 'text/javascript';
  script.charset = 'UTF-8';
  script.src = process.env.BASE_API + "/LEAP/Resource/JavaScript/Base/Net.js";
  if (script.addEventListener) {
    script.addEventListener('load', function () {
      _callback();
    }, false);
  } else if (script.attachEvent) {
    script.attachEvent('onreadystatechange', function () {
      var target = window.event.srcElement;
      if (target.readyState == 'loaded') {
        _callback();
      }
    });
  }
  head.appendChild(script);
}*/

export default router;
