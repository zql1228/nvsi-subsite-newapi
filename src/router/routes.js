//跳转项目详情
const toProjectInfo = function (projectid, areaid) {//$utilroutes.toProjectInfo
  window.open(Vue.$router.resolve({ name: 'projectInfo', params: { define: Vue.routeDefine, data1: projectid, data2: areaid } }).href)
}

//跳转团体详情
const toGroupInfo = function (orgid, areaid) {//$utilroutes.toGroupInfo
  window.open(Vue.$router.resolve({ name: 'groupInfo', params: { define: Vue.routeDefine, data1: orgid, data2: areaid } }).href);
}

//跳转志愿者个人
const toUserInfo = function (id, areaid) {//$utilroutes.toUserInfo
  window.open(Vue.$router.resolve({ name: 'volinfo', params: { define: Vue.routeDefine, data1: id, data2: areaid } }).href);
}

//跳转登录

const toLogin = function (type) {//$utilroutes.toLogin  默认跳转到志愿者  1=管理部门登录 ，2=志愿者，3=队伍
  if (type) {
    Vue.$router.push({ name: "login", params: { define: Vue.routeDefine, type: type } });
  } else {
    Vue.$router.push({ name: "login", params: { define: Vue.routeDefine, type: 2 } });
  }
}

//跳转新闻详情
const toNewsInfo = function (type, id, opentype) {//$utilroutes.toNewsInfo
  if (opentype) {
    Vue.$router.push({ name: "newsInfo", params: { define: Vue.routeDefine, type: type, id: id } });
  } else {
    window.open(Vue.$router.resolve({ name: "newsInfo", params: { define: Vue.routeDefine, type: type, id: id } }).href);
  }
}

//跳转新闻页面
const toNews = function (type, id, opentype) {//$utilroutes.toNews
  if (opentype) {
    Vue.$router.push({ name: "news", params: { define: Vue.routeDefine, type: type, id: id } });
  } else {
    window.open(Vue.$router.resolve({ name: "news", params: { define: Vue.routeDefine, type: type, id: id } }).href);
  }
}

//跳转首页
const toHome = function (opentype) {//$utilroutes.toHome
  if (opentype) {
    Vue.$router.push({ name: "home", params: { define: Vue.routeDefine } });
  } else {
    window.open(Vue.$router.resolve({ name: "home", params: { define: Vue.routeDefine } }).href);
  }
}
export default {
  toProjectInfo,//跳转项目详情
  toGroupInfo, ///跳转团体详情
  toUserInfo,//跳转志愿者个人
  toLogin,//跳转登录
  toNewsInfo,//新闻详情
  toNews,//新闻页面
  toHome,//跳转首页
}