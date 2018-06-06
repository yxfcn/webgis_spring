define(["require", "exports", "dojo/dom", "dojo/parser", "dijit/registry", "esri/map", "../tdt/tdtlayer", "esri/layers/ArcGISDynamicMapServiceLayer", "dojo/on", "esri/geometry/Point", "esri/geometry/Circle", "esri/symbols/SimpleFillSymbol", "esri/symbols/SimpleMarkerSymbol", "esri/symbols/SimpleLineSymbol", "esri/layers/GraphicsLayer", "esri/SpatialReference", "esri/graphic", "esri/Color", "dojo/date/locale", "dojo/domReady", "esri/geometry/Extent", "../widgets/Draws/Draw_Point/Draw_Point", "esri/dijit/LayerList", "esri/tasks/query", "esri/layers/FeatureLayer"], function (require, exports, dom, parser, registry, Map, TDT, ArcGISDynamicMapServiceLayer, on, esriPoint, Circle, SimpleFillSymbol, SimpleMarkerSymbol, SimpleLineSymbol, GraphicsLayer, SpatialReference, Graphic, Color, localeFormat, domReady, Extent, Draw_Point, LayerList, Query, FeatureLayer) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    parser.parse();
    console.log("找到" + registry.toArray().length + "个dijit部件");
    var SR_2000 = new SpatialReference(4490);
    //定义地图对象
    var map, updateFeature;
    //定义天地图底图（电子底图）
    var tdtLayer = new TDT.TDTLayer("vec");
    var NJ_EXTENT = new Extent(118.425171, 31.889045, 119.232353, 32.256209, SR_2000);
    //定义临海市行政区划
    var ZJ_TZ_LH_ADDV_TOWN = new ArcGISDynamicMapServiceLayer("http://192.168.2.188:6080/arcgis/rest/services/ZJ_TZ_LH_ADDV_TOWN/MapServer");
    var lh_river = new ArcGISDynamicMapServiceLayer("http://60.191.132.130:6080/arcgis/rest/services/ZJ_TZ_LH_RIVER_TOWN/MapServer");
    var FL_XZQH = new FeatureLayer("http://192.168.2.188:6080/arcgis/rest/services/ZJ_TZ_LH_ADDV_TOWN/MapServer/0", {
        outFields: ["NAME", "X", "Y"]
    });
    var selectedSymbol = new SimpleFillSymbol(SimpleFillSymbol.STYLE_SOLID, new SimpleLineSymbol(SimpleLineSymbol.STYLE_DASH, new Color("#CA0013"), 2), new Color([0, 0, 255, 0.5]));
    var defaultSymbol = new SimpleFillSymbol();
    FL_XZQH.setSelectionSymbol(selectedSymbol);
    //定义当前是否在获取GPS
    var geolocation_state = 0;
    //定义连续获取坐标
    var watchId;
    var selectQuery = new Query();
    //定义定位点GraphicLayer
    var locationLayer = new GraphicsLayer({ id: "locationLayer" });
    //定义精度GraphicLayer
    var accuracyLayer = new GraphicsLayer({ id: "accuracyLayer", opacity: 0.5 });
    //定义GPS点
    var currentPoint = new esriPoint(0, 0, new SpatialReference(4490));
    //定义定位精度
    var currentAccuracy = 0;
    var toolbar;
    //定义并获取坐标输出文本框
    var infoNode = dom.byId("info");
    //定义并获取GPS定位按钮
    var locationNode = dom.byId("location");
    var domWidgets;
    var searchWidget;
    var test;
    var headerNode;
    //domReady(whenDomReady);
    console.log("变量定义后：找到" + registry.toArray().length + "个dijit部件");
    //初始化地图
    map = new Map("main_map", {
        extent: TDT.LH_Extent,
        logo: false
    });
    console.log("地图初始化后：找到" + registry.toArray().length + "个dijit部件");
    //添加事件监听
    on(map, "load", onMapLoad);
    //添加事件监听
    on(map, "zoom-end", function () {
        console.log("当前 地图缩放等级：" + map.getZoom());
    });
    on(locationNode, "click", locate);
    on(map, "layers-add-result", LayersAdded);
    on(map, "click", onMapClicked);
    map.infoWindow.on("hide", function () {
        FL_XZQH.clearSelection();
    });
    //添加图层
    map.addLayer(tdtLayer, 0);
    map.addLayer(ZJ_TZ_LH_ADDV_TOWN, 2);
    map.addLayer(lh_river, 1);
    map.addLayer(accuracyLayer);
    map.addLayer(locationLayer);
    var r_tdtLayer = {
        title: "天地图-电子地图",
        layer: tdtLayer,
        id: 1
    };
    var r_xzqh = {
        title: "临海行政区划",
        layer: ZJ_TZ_LH_ADDV_TOWN,
        id: 2
    };
    var r_river = {
        title: "临海河流",
        layer: lh_river,
        id: 3
    };
    var layerList = new LayerList({
        map: map,
        showLegend: true,
        showSubLayers: true,
        showOpacitySlider: true,
        layers: [r_tdtLayer, r_xzqh, r_river]
    }, "layerList");
    layerList.startup();
    console.log("图层加载后：找到" + registry.toArray().length + "个dijit部件");
    function onMapLoad() {
        console.log("地图加载完成");
        test = new Draw_Point("POLYGON", map);
        headerNode = dom.byId("header");
        test.placeAt(headerNode, "last");
        test.startup();
        //initialSearch();
    }
    /*---
    * 连续获取GPS信息*/
    function gpsLocate() {
        if (geolocation_state == 0) {
            geolocation_state = 1;
            console.log("begin");
            locationNode.innerHTML = "定位中";
            locate();
            watchId = navigator.geolocation.watchPosition(locate, onLocateError, {
                timeout: 50000,
                enableHighAccuracy: true,
                maximumAge: 50000
            });
        }
        else {
            geolocation_state = 0;
            navigator.geolocation.clearWatch(watchId);
            locationNode.innerHTML = "定位";
            console.log("stop");
        }
    }
    /*---
    * 获取GPS信息
    * 如果本次GPS与上次相同，则不再输出位置信息，仅定位到GPS点*/
    function locate() {
        console.log("come in locate");
        var currentZoom = map.getZoom();
        if (currentZoom < 15) {
            currentZoom = 15;
        }
        navigator.geolocation.getCurrentPosition(function (position) {
            if (position.coords.longitude != currentPoint.x || position.coords.latitude != currentPoint.y || position.coords.accuracy != currentAccuracy) {
                locationLayer.clear();
                accuracyLayer.clear();
                currentPoint = new esriPoint(position.coords.longitude, position.coords.latitude, new SpatialReference(4490));
                currentAccuracy = position.coords.accuracy;
                console.log('Latitude: ' + currentPoint.x + '\n' +
                    'Longitude: ' + currentPoint.y + '\n' + 'accuracy:' + currentAccuracy + '\n');
                var fillSymbol = new SimpleFillSymbol().setColor(new Color([100, 149, 237]));
                var markerSymbol = new SimpleMarkerSymbol().setColor(new Color([0, 0, 255]));
                markerSymbol.outline = new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new Color([255, 255, 255]), 2);
                fillSymbol.outline = null;
                var currentCircle = new Circle({
                    center: currentPoint,
                    radius: currentAccuracy
                });
                currentCircle.setSpatialReference(new SpatialReference(4490));
                accuracyLayer.add(new Graphic(currentCircle, fillSymbol));
                locationLayer.add(new Graphic(currentPoint, markerSymbol));
                map.centerAndZoom(currentPoint, currentZoom);
                var myDate = new Date();
                infoNode.value = infoNode.value + '获取时间：' + localeFormat.format(myDate, {
                    datePattern: "yyyy-MM-dd",
                    timePattern: "HH:mm:ss"
                }) + '\r\n经度: ' + currentPoint.x + '\r\n' +
                    '纬度: ' + currentPoint.y + '\r\n' + '误差半径:' + currentAccuracy + '\r\n';
            }
            else {
                map.centerAndZoom(currentPoint, currentZoom);
            }
        });
    }
    ;
    /*---
    * GPS信息获取失败时提示*/
    function onLocateError(error) {
        alert('code: ' + error.code + '\n' +
            'message: ' + error.message + '\n');
    }
    domReady(function () {
        console.log("dom加载完毕");
    });
    function LayersAdded(evt) {
        console.log("图层添加完成");
    }
    function onMapClicked(evt) {
        console.log("鼠标点击点坐标：" + evt.mapPoint.x + "," + evt.mapPoint.y);
    }
});
//# sourceMappingURL=main_tdt.js.map