define(["require", "exports", "esri/dijit/BasemapLayer", "esri/dijit/Basemap", "esri/SpatialReference", "esri/geometry/Extent", "esri/layers/TileInfo", "esri/geometry/Point", "esri/dijit/BasemapGallery", "esri/map", "dojo/parser"], function (require, exports, BasemapLayer, Basemap, SpatialReference, Extent, TileInfo, EsriPoint, BasemapGallery, Map, parser) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    parser.parse();
    //天地图坐标系
    var GCS2000 = new SpatialReference(4490); //GCS_China_Geodetic_Coordinate_System_2000
    //临海地图范围
    exports.LH_Extent = new Extent(120.5965, 28.7452, 121.96, 29.3412, GCS2000);
    //临海地图范围
    exports.ZJ_Extent = new Extent(117.599014, 26.827559, 123.45579, 31.564402, GCS2000);
    //天地图原点
    var TDT_ORIGIN = new EsriPoint(-180, 90);
    //天地图范围
    var TDT_FULLEXTENT = new Extent(-180.0, -90.0, 180.0, 90.0, GCS2000);
    //天地图服务器
    var TDT_SUBDOMAINS = ["t0", "t1", "t2", "t3", "t4", "t5", "t6", "t7"];
    //天地图切片矩阵
    var TDT_LODS = [
        { level: 0, resolution: 1.40625, scale: 590995197.14166909755553014475, levelValue: '0' },
        { level: 1, resolution: 0.703125, scale: 295497598.57083454877776507238, levelValue: '1' },
        { level: 2, resolution: 0.3515625, scale: 147748799.28541727438888253619, levelValue: '2' },
        { level: 3, resolution: 0.17578125, scale: 73874399.642708637194441268094, levelValue: '3' },
        { level: 4, resolution: 0.087890625, scale: 36937199.821354318597220634047, levelValue: '4' },
        { level: 5, resolution: 0.0439453125, scale: 18468599.910677159298610317023, levelValue: '5' },
        { level: 6, resolution: 0.02197265625, scale: 9234299.955338579649305158512, levelValue: '6' },
        { level: 7, resolution: 0.010986328125, scale: 4617149.9776692898246525792559, levelValue: '7' },
        { level: 8, resolution: 0.0054931640625, scale: 2308574.9888346449123262896279, levelValue: '8' },
        { level: 9, resolution: 0.00274658203125, scale: 1154287.494417322456163144814, levelValue: '9' },
        { level: 10, resolution: 0.001373291015625, scale: 577143.74720866122808157240698, levelValue: '10' },
        { level: 11, resolution: 0.0006866455078125, scale: 288571.87360433061404078620349, levelValue: '11' },
        { level: 12, resolution: 0.00034332275390625, scale: 144285.93680216530702039310175, levelValue: '12' },
        { level: 13, resolution: 0.000171661376953125, scale: 72142.968401082653510196550873, levelValue: '13' },
        { level: 14, resolution: 8.58306884765625e-005, scale: 36071.484200541326755098275436, levelValue: '14' },
        { level: 15, resolution: 4.291534423828125e-005, scale: 18035.742100270663377549137718, levelValue: '15' },
        { level: 16, resolution: 2.1457672119140625e-005, scale: 9017.871050135331688774568859, levelValue: '16' },
        { level: 17, resolution: 1.0728836059570313e-005, scale: 4508.9355250676658443872844296, levelValue: '17' },
        { level: 18, resolution: 5.3644180297851563e-006, scale: 2254.4677625338329221936422148, levelValue: '18' },
        { level: 19, resolution: 0.000002682209014892578125, scale: 1127.2338812669164610968211074, levelValue: '19' },
        { level: 20, resolution: 0.0000013411045074462890625, scale: 563.61694063345823054841055369, levelValue: '20' }
    ];
    var TDT_LODS_LH = [
        { level: 0, resolution: 1.40625002623159, scale: 590995197.14166915, levelValue: '0' },
        { level: 1, resolution: 0.703125013115792, scale: 295497598.57083458, levelValue: '1' },
        { level: 2, resolution: 0.351562506557896, scale: 147748799.28541729, levelValue: '2' },
        { level: 3, resolution: 0.175781253278948, scale: 73874399.642708644, levelValue: '3' },
        { level: 4, resolution: 0.0878906266394741, scale: 36937199.821354322, levelValue: '4' },
        { level: 5, resolution: 0.0439453133197369, scale: 18468599.910677161, levelValue: '5' },
        { level: 6, resolution: 0.0219726566598685, scale: 9234299.9553385805, levelValue: '6' },
        { level: 7, resolution: 0.0109863283299343, scale: 4617149.9776692903, levelValue: '7' },
        { level: 8, resolution: 0.00549316416496712, scale: 2308574.9888346451, levelValue: '8' },
        { level: 9, resolution: 0.00274658208248356, scale: 1154287.4944173226, levelValue: '9' },
        { level: 10, resolution: 0.00137329104124178, scale: 577143.747208661228, levelValue: '10' },
        { level: 11, resolution: 0.00068664552062089, scale: 288571.87360433064, levelValue: '11' },
        { level: 12, resolution: 0.000343322760310445, scale: 144285.93680216532, levelValue: '12' },
        { level: 13, resolution: 0.000171661380155223, scale: 72142.96840108266, levelValue: '13' },
        { level: 14, resolution: 8.58306900776114E-05, scale: 36071.48420054133, levelValue: '14' },
        { level: 15, resolution: 4.29153450388056E-05, scale: 18035.742100270665, levelValue: '15' },
        { level: 16, resolution: 2.14576725194029E-05, scale: 9017.8710501353326, levelValue: '16' },
        { level: 17, resolution: 1.07288362597014E-05, scale: 4508.9355250676663, levelValue: '17' },
        { level: 18, resolution: 5.36441812985071E-06, scale: 2254.4677625338331, levelValue: '18' },
        { level: 19, resolution: 2.68220906492534E-06, scale: 1127.233881266917, levelValue: '19' },
        { level: 20, resolution: 1.34110453246268E-06, scale: 563.6169406334585, levelValue: '20' }
    ];
    //天地图切片信息
    var TDT_TILEINFO = new TileInfo({
        dpi: 96,
        compressionQuality: 0,
        rows: 256,
        cols: 256,
        lods: TDT_LODS,
        origin: TDT_ORIGIN,
        spatialReference: GCS2000
    });
    //天地图切片信息
    var TDT_TILEINFO_TEST = new TileInfo({
        dpi: 96,
        compressionQuality: 0,
        rows: 256,
        cols: 256,
        lods: TDT_LODS,
        origin: TDT_ORIGIN,
        spatialReference: GCS2000
    });
    /*var TDT_TILEINFO_LH: TileInfo = new TileInfo({
        dpi: 96,
        compressionQuality: 0,
        rows: 256,
        cols: 256,
        lods: TDT_LODS_LH,
        origin: TDT_ORIGIN,
        spatialReference: GCS2000
    });*/
    //天地图电子地图模板
    var TDT_URLPATTERN_VEC = "http://{subDomain}.tianditu.com/vec_c/wmts?SERVICE=WMTS&VERSION=1.0.0&REQUEST=GetTile&LAYER=vec&STYLE="
        + "default&FORMAT=&TILEMATRIXSET=c&TILEMATRIX={level}&TILEROW={row}&TILECOL={col}&format=tiles";
    //天地图卫星影像地图模块
    var TDT_URLPATTERN_IMG = "http://{subDomain}.tianditu.com/img_c/wmts?SERVICE=WMTS&VERSION=1.0.0&REQUEST=GetTile&LAYER=img&STYLE="
        + "default&FORMAT=&TILEMATRIXSET=c&TILEMATRIX=${level}&TILEROW=${row}&TILECOL=${col}&format=tiles";
    //天地图注记模块
    var TDT_URLPATTERN_CVA = "http://{subDomain}.tianditu.com/cva_c/wmts?SERVICE=WMTS&VERSION=1.0.0&REQUEST=GetTile&LAYER=cva&STYLE="
        + "default&FORMAT=&TILEMATRIXSET=c&TILEMATRIX=${level}&TILEROW=${row}&TILECOL=${col}&format=tiles";
    //浙江天地图电子地图模板
    var TDT_URLPATTERN_VEC_ZJ = "http://ditu.zj.cn/services/wmts/zjemap/WMTS/tile/1.0.0/ZJSZF_IMGZT/default/nativeTileMatrixSet/{level}/{row}/{col}";
    //浙江天地图卫星影像地图（政务版）模块
    var TDT_URLPATTERN_IMG_ZJ = "http://ditu.zj.cn/services/wmts/imgmap/WMTS/tile/1.0.0/ZWW_IMG/default/nativeTileMatrixSet/{level}/{row}/{col}";
    //浙江天地图卫星影像地图（普通版）模块
    var TDT_URLPATTERN_IMG_GNR_ZJ = "http://ditu.zj.cn/services/wmts/imgmap/WMTS/tile/1.0.0/ZJSZF_IMGZT/default/nativeTileMatrixSet/{level}/{row}/{col}";
    //浙江天地图注记模块
    var TDT_URLPATTERN_CVA_ZJ = "http://ditu.zj.cn/services/wmts/imgmap_lab/WMTS/tile/1.0.0/ZJSZF_IMGZT/default/nativeTileMatrixSet/{level}/{row}/{col}";
    //临海市天地图电子地图模板
    var TDT_URLPATTERN_VEC_ZJ_LH = "http://tmap.linhai.gov.cn/services/wmts/lhemap/lhemap/default/esritilematirx/{level}/{row}/{col}";
    //临海市天地图卫星影像地图（政务版）模块
    var TDT_URLPATTERN_IMG_ZJ_LH = "http://tmap.linhai.gov.cn/services/wmts/lhimgmap/lhimgmap/default/esritilematirx/{level}/{row}/{col}";
    //浙江天地图注记模块
    var TDT_URLPATTERN_CVA_ZJ_LH = "http://tmap.linhai.gov.cn/services/wmts/lhemapanno/lhemapanno/default/esritilematirx/{level}/{row}/{col}";
    //天地图电子地图图层组件初始化
    //全国BasemapLayer
    var BasemapLayer_TDT_VEC = new BasemapLayer({
        displayLevels: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18],
        fullExtent: TDT_FULLEXTENT,
        initialExtent: TDT_FULLEXTENT,
        isReference: false,
        subDomains: TDT_SUBDOMAINS,
        templateUrl: TDT_URLPATTERN_VEC,
        tileInfo: TDT_TILEINFO,
        type: "WebTiledLayer"
    });
    var BasemapLayer_TDT_IMG = new BasemapLayer({
        displayLevels: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18],
        fullExtent: TDT_FULLEXTENT,
        initialExtent: TDT_FULLEXTENT,
        isReference: false,
        subDomains: TDT_SUBDOMAINS,
        templateUrl: TDT_URLPATTERN_IMG,
        tileInfo: TDT_TILEINFO,
        type: "WebTiledLayer"
    });
    var BasemapLayer_TDT_CVA = new BasemapLayer({
        displayLevels: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18],
        fullExtent: TDT_FULLEXTENT,
        initialExtent: TDT_FULLEXTENT,
        isReference: false,
        subDomains: TDT_SUBDOMAINS,
        templateUrl: TDT_URLPATTERN_CVA,
        tileInfo: TDT_TILEINFO,
        type: "WebTiledLayer"
    });
    //浙江BasemapLayer
    var BasemapLayer_TDT_VEC_ZJ = new BasemapLayer({
        displayLevels: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18],
        fullExtent: exports.ZJ_Extent,
        initialExtent: exports.ZJ_Extent,
        isReference: false,
        templateUrl: TDT_URLPATTERN_VEC_ZJ,
        tileInfo: TDT_TILEINFO,
        type: "WebTiledLayer"
    });
    var BasemapLayer_TDT_IMG_ZJ = new BasemapLayer({
        displayLevels: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18],
        fullExtent: exports.ZJ_Extent,
        initialExtent: exports.ZJ_Extent,
        isReference: false,
        templateUrl: TDT_URLPATTERN_IMG_GNR_ZJ,
        tileInfo: TDT_TILEINFO_TEST,
        type: "WebTiledLayer"
    });
    var BasemapLayer_TDT_CVA_ZJ = new BasemapLayer({
        displayLevels: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18],
        fullExtent: exports.ZJ_Extent,
        initialExtent: exports.ZJ_Extent,
        isReference: false,
        templateUrl: TDT_URLPATTERN_CVA_ZJ,
        tileInfo: TDT_TILEINFO,
        type: "WebTiledLayer"
    });
    //临海BasemapLayer
    var BasemapLayer_TDT_VEC_ZJ_LH = new BasemapLayer({
        displayLevels: [18, 19, 20],
        fullExtent: exports.LH_Extent,
        initialExtent: exports.LH_Extent,
        isReference: false,
        templateUrl: TDT_URLPATTERN_VEC_ZJ_LH,
        tileInfo: TDT_TILEINFO,
        type: "WebTiledLayer"
    });
    var BasemapLayer_TDT_IMG_ZJ_LH = new BasemapLayer({
        displayLevels: [18, 19, 20],
        fullExtent: exports.LH_Extent,
        initialExtent: exports.LH_Extent,
        isReference: false,
        templateUrl: TDT_URLPATTERN_IMG_ZJ_LH,
        tileInfo: TDT_TILEINFO,
        type: "WebTiledLayer"
    });
    var BasemapLayer_TDT_CVA_ZJ_LH = new BasemapLayer({
        displayLevels: [18, 19, 20],
        fullExtent: exports.LH_Extent,
        initialExtent: exports.LH_Extent,
        isReference: false,
        templateUrl: TDT_URLPATTERN_CVA_ZJ_LH,
        tileInfo: TDT_TILEINFO,
        type: "WebTiledLayer"
    });
    //全国Basemap
    var Basemap_VEC_A = new Basemap({
        id: "basemap_vec_a",
        layers: [BasemapLayer_TDT_VEC, BasemapLayer_TDT_CVA],
        title: "全国天地图电子地图（带注记）",
        thumbnailUrl: "../../../static/images/icons/layer/vec.png"
    });
    var Basemap_IMG_A = new Basemap({
        id: "basemap_img_a",
        layers: [BasemapLayer_TDT_IMG, BasemapLayer_TDT_CVA],
        title: "全国天地图卫星影像（带注记）",
        thumbnailUrl: "../../../static/images/icons/layer/img.png"
    });
    var Basemap_VEC = new Basemap({
        id: "basemap_vec",
        layers: [BasemapLayer_TDT_VEC],
        title: "全国天地图电子地图",
        thumbnailUrl: "../../../static/images/icons/layer/vec.png"
    });
    var Basemap_IMG = new Basemap({
        id: "basemap_img",
        layers: [BasemapLayer_TDT_IMG],
        title: "全国天地图卫星影像",
        thumbnailUrl: "../../../static/images/icons/layer/img.png"
    });
    //浙江Basemap
    var Basemap_VEC_ZJ = new Basemap({
        id: "basemap_vec_zj",
        layers: [BasemapLayer_TDT_VEC_ZJ],
        title: "浙江省天地图电子地图",
        thumbnailUrl: "../../../static/images/icons/layer/vec.png"
    });
    var Basemap_IMG_ZJ = new Basemap({
        id: "basemap_img_zj",
        layers: [BasemapLayer_TDT_IMG_ZJ],
        title: "浙江省天地图卫星影像",
        thumbnailUrl: "../../../static/images/icons/layer/img.png"
    });
    var Basemap_IMG_A_ZJ = new Basemap({
        id: "basemap_img_a_zj",
        layers: [BasemapLayer_TDT_IMG_ZJ, BasemapLayer_TDT_CVA_ZJ],
        title: "浙江省天地图卫星影像（带注记）",
        thumbnailUrl: "../../../static/images/icons/layer/img.png"
    });
    //临海Basemap
    var Basemap_VEC_ZJ_LH = new Basemap({
        id: "basemap_vec_zj_lh",
        layers: [BasemapLayer_TDT_VEC_ZJ_LH],
        title: "临海市天地图电子地图",
        thumbnailUrl: "../../../static/images/icons/layer/vec.png"
    });
    var Basemap_IMG_ZJ_LH = new Basemap({
        id: "basemap_img_zj_lh",
        layers: [BasemapLayer_TDT_IMG_ZJ_LH],
        title: "临海市天地图卫星影像",
        thumbnailUrl: "../../../static/images/icons/layer/img.png"
    });
    var Basemap_IMG_A_ZJ_LH = new Basemap({
        id: "basemap_img_a_zj_lh",
        layers: [BasemapLayer_TDT_IMG_ZJ_LH, BasemapLayer_TDT_CVA_ZJ_LH],
        title: "临海市天地图卫星影像（带注记）",
        thumbnailUrl: "../../../static/images/icons/layer/img.png"
    });
    var map = new Map("map", {
        extent: exports.LH_Extent,
        logo: false
    });
    var basemapGallery = new BasemapGallery({
        map: map,
        basemaps: [Basemap_VEC, Basemap_IMG, Basemap_VEC_A, Basemap_IMG_A,
            Basemap_VEC_ZJ, Basemap_IMG_ZJ, Basemap_IMG_A_ZJ,
            Basemap_VEC_ZJ_LH, Basemap_IMG_ZJ_LH, Basemap_IMG_A_ZJ_LH
        ],
        showArcGISBasemaps: false,
    }, "basemapGallery");
    basemapGallery.startup();
    map.on("zoom-end", function (evt) {
        console.log("zoom level:" + map.getZoom());
    });
});
//# sourceMappingURL=Basemap_TDT.js.map