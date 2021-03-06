
//创建和初始化地图函数：
const initMap=function(markerArr,mapId,name,pic,List){
  createMap(mapId,name,List);//创建地图
  setMapEvent();//设置地图事件
  addMapControl();//向地图添加控件
  addMarker(markerArr,pic);//向地图中添加marker
}

//创建地图函数：
function createMap(mapId,name,List){
  var map = new BMap.Map(mapId);//在百度地图容器中创建一个地图,mapId为属性id的名称
  // var point = new BMap.Point(116.41338369712,39.9109245473);//定义一个中心点坐标
  //map.centerAndZoom(point,13);//设定地图的中心点
  if(name=='税收'){
    if(List && List.albx0035 && List.albx0036){//有经纬度
      var point = new BMap.Point(List.albx0035,List.albx0036);//定义一个中心点坐标
    }else{
      var point = new BMap.Point(116.41338369712,39.9109245473);//定义一个中心点坐标
    }
    map.centerAndZoom(point,13);//设定地图的中心点
  }else{
    map.centerAndZoom(name,13);//设定地图中心区域名
  }
  window.map = map;//将map变量存储在全局
}

//地图事件设置函数：
function setMapEvent(){
  map.enableDragging();//启用地图拖拽事件，默认启用(可不写)
  map.enableScrollWheelZoom();//启用地图滚轮放大缩小
  map.enableDoubleClickZoom();//启用鼠标双击放大，默认启用(可不写)
  map.enableKeyboard();//启用键盘上下左右键移动地图
}

//地图控件添加函数：
function addMapControl(){
  //向地图中添加缩放控件
  var ctrl_nav = new BMap.NavigationControl({anchor:BMAP_ANCHOR_TOP_LEFT,type:BMAP_NAVIGATION_CONTROL_SMALL});
  map.addControl(ctrl_nav);
  //向地图中添加比例尺控件
  var ctrl_sca = new BMap.ScaleControl({anchor:BMAP_ANCHOR_TOP_LEFT});
  map.addControl(ctrl_sca);
}

//创建marker
function addMarker(markerArr,pic){
	var markers = [];//点聚合展示数据
  for(var i=0;i<markerArr.length;i++){
    var json = markerArr[i];
    var p0 = json.point.split(",")[0];
    var p1 = json.point.split(",")[1];
    var point = new BMap.Point(p0,p1);
    var iconImg = createIcon(json.icon,pic);
    var marker = new BMap.Marker(point,{icon:iconImg});
    var iw = createInfoWindow(markerArr,i);
    var label = new BMap.Label('',{"offset":new BMap.Size(json.icon.lb-json.icon.x+10,-20)});
    marker.setLabel(label);
    //map.addOverlay(marker);
    label.setStyle({
      borderColor:"#808080",
      color:"#333",
      cursor:"pointer"
    });

    (function(){
      var index = i;
      var _iw = createInfoWindow(markerArr,i);
      //var _marker = marker;
      marker.addEventListener("click",function(){
        this.openInfoWindow(_iw);
      });
      _iw.addEventListener("open",function(){
        marker.getLabel().hide();
      });
      _iw.addEventListener("close",function(){
        marker.getLabel().show();
      });
      label.addEventListener("click",function(){
        marker.openInfoWindow(_iw);
      });
      if(!!json.isOpen){
        label.hide();
        marker.openInfoWindow(_iw);
      }
    })()
    markers.push(marker);//存放数组
  }
  new BMapLib.MarkerClusterer(map, {markers:markers});//展示点聚合
}

//创建InfoWindow
function createInfoWindow(markerArr,i){
  var json = markerArr[i];
  var iw = new BMap.InfoWindow("<i class='c-danger' style='font-size: 16px;' title='" + json.title + "'>" + json.title + "</i><div style='font-size: 14px'>"+json.content+"</div>");
  return iw;
}
//创建一个Icon
function createIcon(json,pic){
  return new BMap.Icon(pic, new BMap.Size(21, 25));
}


export default {
  initMap
};
