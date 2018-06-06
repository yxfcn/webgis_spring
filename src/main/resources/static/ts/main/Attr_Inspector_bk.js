"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
///<reference path="../../../node_modules/typings.d.ts"/>
var AttributeInspector = require("esri/dijit/AttributeInspector");
var Map = require("esri/map");
var SimpleLineSymbol = require("esri/symbols/SimpleLineSymbol");
var SimpleFillSymbol = require("esri/symbols/SimpleFillSymbol");
var domConstruct = require("dojo/dom-construct");
var Color = require("esri/Color");
var Query = require("esri/tasks/query");
var domReady = require("dojo/domReady");
var FeatureLayer = require("esri/layers/FeatureLayer");
var ArcGISDynamicMapServiceLayer = require("esri/layers/ArcGISDynamicMapServiceLayer");
var TDT = require("../tdt/tdtlayer");
var SpatialReference = require("esri/SpatialReference");
var Button = require("dijit/form/Button");
var on = require("dojo/on");
/****----start:定义全局变量------***/
var map; //地图对象
var SR_2000 = new SpatialReference(4490);
//天地图电子地图
var tdt_vec = new TDT.TDTLayer("vec");
var tdt_cva = new TDT.TDTLayer("cva");
tdt_vec.id = "basemap_tdt_vec";
//临海镇级行政区划
var ZJ_TZ_LH_ADDV_TOWN = new ArcGISDynamicMapServiceLayer("http://60.191.132.130:6080/arcgis/rest/services/ZJ_TZ_LH_ADDV_TOWN/MapServer");
//临海镇级行政区划 FeatureService
var FL_XZQH = new FeatureLayer("http://60.191.132.130:6080/arcgis/rest/services/ZJ_TZ_LH_ADDV_TOWN/FeatureServer/0", {
    id: "FL_XZQH",
    outFields: ["NAME", "X", "Y"],
    opacity: 0.5
});
//行政区划图层信息
var layerInfo_xzqh = {
    featureLayer: FL_XZQH,
    showAttachments: false,
    isEditable: true,
    showDeleteButton: false,
    //字段组信息
    fieldInfos: [
        {
            fieldName: "NAME ",
            isEditable: true,
            label: "行政区划名称",
            tooltip: "行政区划名称"
        },
        {
            fieldName: "X",
            isEditable: false,
            label: "行政区划中心点经度",
            tooltip: "行政区划中心点经度",
            stringFieldOption: AttributeInspector.STRING_FIELD_OPTION_TEXTBOX
        },
        {
            fieldName: "Y",
            isEditable: false,
            label: "行政区划中心点纬度",
            tooltip: "行政区划中心点纬度"
        }
    ]
};
//查询语句
var selectQuery = new Query();
;
//属性识别部件
var attInspector = new AttributeInspector({
    layerInfos: [layerInfo_xzqh]
}, domConstruct.create("div", {
    id: "query_result"
}));
var saveButton = new Button({
    label: "保存",
    class: "saveButton"
}, domConstruct.create("div", {
    id: "btn_save"
}));
var selectionSymbol = new SimpleFillSymbol(SimpleFillSymbol.STYLE_SOLID, new SimpleLineSymbol("solid", new Color([255, 0, 0, 0.5]), 4), new Color("#ED3939"));
var defaultSymbol = new SimpleFillSymbol();
var updateFeature;
FL_XZQH.setSelectionSymbol(selectionSymbol);
/****----end:定义全局变量------***/
map = new Map("mapDiv", {
    extent: TDT.LH_Extent,
    logo: false
});
map.addLayers([tdt_vec, tdt_cva, FL_XZQH]);
/****----start:全局方法------***/
function onMapLoad(evt) {
    console.log("the layer has been add to map");
}
function onMapClick(evt) {
    selectQuery.geometry = evt.mapPoint;
    selectQuery.distance = 50;
    selectQuery.units = "meters";
    selectQuery.returnGeometry = true;
    //selectQuery.where="NAME  like '%大洋%'";
    //console.log(selectQuery.where);
    for (var i = 0; i < map.graphicsLayerIds.length; i++) {
        if (map.graphicsLayerIds[i] == "FL_XZQH") {
            //console.log("evt.layers[" + i + "]是要查询的目标图层,id为：" + map.graphicsLayerIds[i]);
            map.getLayer("FL_XZQH").selectFeatures(selectQuery, FeatureLayer.SELECTION_NEW, function (features) {
                //如果查询结果不为空则显示Infowindow，否则不显示
                if (features.length > 0) {
                    //存储当前查询到的features
                    updateFeature = features[0];
                    map.infoWindow.setTitle(updateFeature.getLayer().name);
                    map.infoWindow.show(evt.screenPoint, map.getInfoWindowAnchor(evt.screenPoint));
                }
                else {
                    map.infoWindow.hide();
                }
            });
        }
        else {
            //console.log("evt.layers[" + i + "]不是要查询的目标图层,id为：" + map.graphicsLayerIds[i]);
        }
    }
}
function onLayersAddResult(evt) {
    console.log("The layers has been added!");
    /*console.log("layer count:" + map.layerIds.length);
    console.log("layer ids:" + map.layerIds);
    console.log("graphic layer的数量：" + map.graphicsLayerIds.length);
    console.log("graphic layer的id：" + map.graphicsLayerIds);
    console.log("dom 节点容器：" + map.root.id);
    console.log("map.id :" + map.id);*/
    initSelectToolbar(evt);
    attInspector.on("attribute-change", function (evt) {
        console.log("attribute-change");
        updateFeature.attributes[evt.fieldName] = evt.fieldValue;
    });
    attInspector.on("next", function (evt) {
        updateFeature = evt.feature;
        console.log("Next " + updateFeature.attributes.OBJECTID);
    });
    attInspector.on("delete", function (evt) {
        evt.feature.getLayer().applyEdits(null, null, [evt.feature]);
        map.infoWindow.hide();
    });
}
function OnExtentChange(evt) {
    console.log("delta.x:" + evt.delta.x + ",delta.y:" + evt.delta.y);
    console.log("The extent:" + evt.extent.xmax);
    console.log("The map extent:" + map.extent.xmax);
}
function onLayerAdd(evt) {
    console.log("Layer id:" + evt.layer.id);
}
function initSelectToolbar(evt) {
    //var xzqhfl = evt.layers[1].layer;
    //console.log("xzqhf1:"+xzqhfl.id);
    map.on("click", onMapClick);
    /*map.on("click", function (evt) {
        selectQuery.geometry = evt.mapPoint;
        selectQuery.distance = 50;
        selectQuery.units = "meter";
        selectQuery.returnGeometry = true;
        xzqhfl.selectFeatures(selectQuery, FeatureLayer.SELECTION_NEW);

        xzqhfl.on("selection-complete",function(evt:any){
            let features=evt.features;
            if (features.length > 0) {
                updateFeature = features[0];
                map.infoWindow.setTitle(features[0].getLayer().name);
                map.infoWindow.show(evt.screenPoint, map.getInfoWindowAnchor(evt.screenPoint));
            } else {
                map.infoWindow.hide();
            }
        })
    });*/
}
/****----end:全局方法------***/
/****----start:事件监听------***/
on(map, "layers-add-result", onLayersAddResult);
//on(map, "extent-change", OnExtentChange);
//on(map, "layer-add", onLayerAdd);
saveButton.on("click", function (evt) {
    updateFeature.getLayer().applyEdits(null, [updateFeature], null);
});
//隐藏infowindow时清空查询结果集
map.infoWindow.on("hide", function () {
    FL_XZQH.clearSelection();
});
map.on("zoom-end", function (evt) {
    console.log("当前缩放等级：" + map.getZoom());
});
map.on("load", onMapLoad);
domReady(function () {
    console.log("dom has been ready");
    domConstruct.place(saveButton.domNode, attInspector.deleteBtn.domNode, "after");
    map.infoWindow.setContent(attInspector.domNode);
    map.infoWindow.resize(350, 240);
});
/****----end:事件监听------***/
