"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Map = require("esri/map");
var SimpleLineSymbol = require("esri/symbols/SimpleLineSymbol");
var SimpleFillSymbol = require("esri/symbols/SimpleFillSymbol");
var Color = require("esri/Color");
var Query = require("esri/tasks/query");
var domReady = require("dojo/domReady");
var FeatureLayer = require("esri/layers/FeatureLayer");
var TDT = require("../tdt/TDT_ZJ");
var TDT_China = require("../tdt/tdtlayer");
var SpatialReference = require("esri/SpatialReference");
var QueryTask = require("esri/tasks/QueryTask");
var InfoTemplate = require("esri/InfoTemplate");
var esriLang = require("esri/lang");
/****----start:定义全局变量------***/
var map; //地图对象
var SR_2000 = new SpatialReference(4490);
//天地图电子地图
var tdt_vec = new TDT.TDT_ZJ_Layer("img");
var tdt_cva = new TDT.TDT_ZJ_Layer("cva");
var tdt_china = new TDT_China.TDTLayer("vec");
tdt_vec.id = "basemap_tdt_vec";
//临海镇级行政区划 FeatureService
var FL_XZQH_URL = "http://60.191.132.130:6080/arcgis/rest/services/ZJ_TZ_LH_ADDV_TOWN/FeatureServer/0";
//var tc_gd=new ArcGISDynamicMapServiceLayer("http://192.168.2.188:6080/arcgis/rest/services/TC_PRJSC/MapServer");
//查询语句
var selectQuery = new Query();
selectQuery.returnGeometry = true;
selectQuery.where = "1=1";
selectQuery.outFields = ["OBJECTID", "NAME", "X", "Y"];
var queryTask_XZQH = new QueryTask(FL_XZQH_URL);
var selectionSymbol = new SimpleFillSymbol(SimpleFillSymbol.STYLE_SOLID, new SimpleLineSymbol("solid", new Color([255, 0, 0, 0.5]), 4), new Color("#ED3939"));
var defaultSymbol = new SimpleFillSymbol();
var FL_XZQH;
var xzqh_infoTemplate = new InfoTemplate();
xzqh_infoTemplate.setTitle("临海市${NAME}");
xzqh_infoTemplate.setContent("名称：${NAME}</br>中心点经度：${X}</br>中心点纬度：${Y}</br>");
beginQuery();
/****----end:定义全局变量------***/
console.log("map的值是否为空:" + esriLang.isDefined(map));
map = new Map("mapDiv", {
    extent: TDT.LH_Extent,
    logo: false
});
console.log("map的值是否为空:" + esriLang.isDefined(map));
console.log("xzqh_infoTemplate的值是否为空:" + esriLang.isDefined(xzqh_infoTemplate));
map.addLayers([tdt_china, tdt_vec]);
/****----start:全局方法------***/
function beginQuery() {
    console.log("开始查询行政区划图层");
    queryTask_XZQH.execute(selectQuery);
}
function onQueryTask_XZQHComplete(evt) {
    console.log("查询完成");
    console.log(evt.featureSet.geometryType);
    //console.log(evt.featureSet);
    FL_XZQH = new FeatureLayer({
        featureSet: evt.featureSet,
        layerDefinition: {
            geometryType: "esriGeometryPolygon",
            objectIdField: "OBJECTID",
            fields: [
                {
                    name: "OBJECTID",
                    type: "esriFieldTypeOID",
                    alias: "OBJECTID"
                },
                {
                    name: "Name",
                    type: "esriFieldTypeString",
                    length: 50,
                    alias: "行政区划名称"
                },
                {
                    name: "X",
                    type: "esriFieldTypeDouble",
                    alias: "经度"
                },
                {
                    name: "Y",
                    type: "esriFieldTypeDouble",
                    alias: "纬度"
                }
            ]
        }
    }, {
        displayOnPan: true,
        id: "FL_XZQH",
        opacity: 0.7,
        infoTemplate: xzqh_infoTemplate
    });
    map.addLayer(FL_XZQH);
    console.log("图层添加");
    FL_XZQH.on("click", function (evt) {
        console.log("点击了行政区划");
        console.log(evt.graphic.attributes);
        //console.dir(evt.graphic);
        //map.setExtent(GraphicsUtils.graphicsExtent([evt.graphic]));
    });
}
function onQueryTask_XZQHError(evt) {
    console.log("查询出错：" + evt.error);
}
function onMapLoad() {
    console.log("the layer has been add to map");
    console.log("最大Zoom:%s", map.getMaxZoom());
    queryTask_XZQH.on("complete", onQueryTask_XZQHComplete);
    queryTask_XZQH.on("error", onQueryTask_XZQHError);
}
function onLayersAddResult(evt) {
    console.log("The layers has been added!");
}
/****----end:全局方法------***/
/****----start:事件监听------***/
map.on("layers-add-result", onLayersAddResult);
map.on("zoom-end", function (evt) {
    console.log("当前缩放等级：" + map.getZoom());
});
map.on("load", onMapLoad);
domReady(function () {
    console.log("dom has been ready");
    onMapLoad();
});
/*map.on("click",function(evt:object){
    map.infoWindow.setTitle("当前坐标");
    map.infoWindow.resize(300,200);
    map.infoWindow.setContent("经度，纬度："+evt.mapPoint.x+","+evt.mapPoint.y);
    map.infoWindow.show(evt.screenPoint,map.getInfoWindowAnchor(evt.screenPoint));
    console.log("坐标："+evt.mapPoint.x+","+evt.mapPoint.y);
});*/
/****----end:事件监听------***/
