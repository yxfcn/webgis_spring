define(["dojo/_base/declare",
    "dojo/_base/array",
    "dojo/_base/lang",
    "dojo/dom",
    "dojo/dom-style",
    "dijit/_WidgetBase",
    "dijit/_TemplatedMixin",
    "dijit/_OnDijitClickMixin",
    "esri/symbols/SimpleMarkerSymbol",
    "esri/symbols/SimpleLineSymbol",
    "esri/symbols/SimpleFillSymbol",
    "esri/graphic",
    "dijit/registry",
    "dojo/on",
    "esri/toolbars/draw",

    "dojo/text!./templates/Draw_Point.html",

], function (declare, arrayUtils, lang, dom, domStyle, _WidgetBase, _TemplateMixin, _OnDijitClickMixin,
             SimpleMarkerSymbol, SimpleLineSymbol, SimpleFillSymbol,
             Graphic, registry, on,Draw,
             dijitTemplate) {
    return declare("Draw_Point",[_WidgetBase, _TemplateMixin, _OnDijitClickMixin], {
        //baseClass: "yxf.widget.draw",
        //declaredClass: "yxf.widget.draw.point",
        theMap: "",
        toolbar:"",
        label:"",
        toolbar:"",
        tool:"",
        //html模板
        templateString: dijitTemplate,

        //构造函数
        constructor: function (/*string*/label,/*Map*/a) {
            console.log("开始构造Draw_Point");
            this.set("label",label);
            this.set("theMap",a);
            this._createToolBar();

        },

        postCreate:function(){
            this.inherited(arguments);
            console.log("这里是postCreate");
            this.own(
                on(this.domNode,"click",lang.hitch(this,"_activateTool"))
            );

        },
        startup:function(){
            if(this.started){
                return;
            }

        },

        //激活工具
        _activateTool:function(){
            console.log("激活工具");
            this._createToolBar();
            this.tool = this.label.toUpperCase().replace(/ /g, "_");
            //console.log(this.label);
            this.toolbar.activate(Draw[ this.tool],{
                drawTime:25,
                showTooltips:true,
                tolerance:8,
                tooltipOffset:10
            });
            this.theMap.hideZoomSlider();
        },

        //创建工具条
        _createToolBar: function () {
            console.log("开始创建工具条：_createToolBar（）");
            this.toolbar = new Draw(this.theMap,{
                drawTime:0,
                showTooltips:false
            });
            this.toolbar.on("draw-complete", lang.hitch(this,"_addToMap"));
        },

        //将绘制完成后的图形加载到地图的graphic layer中
        _addToMap:function (evt){
            console.log("将绘制的图元加载到地图上");
            var symbol;
            console.log(this.label);
            //禁用工具
            this.toolbar.deactivate();
            //显示缩放按钮
            this.theMap.showZoomSlider();

            //根据几何体类型设置符号
            switch (evt.geometry.type) {
                case "point":
                case "multipoint":
                    symbol = new SimpleMarkerSymbol();
                    break;
                case "polyline":
                    symbol = new SimpleLineSymbol();
                    break;
                default:
                    symbol = new SimpleFillSymbol();
                    break;
            }
            var graphic = new Graphic(evt.geometry, symbol);
            this.theMap.graphics.add(graphic);
        },

        //获取和设置属性值
        _getTheMapAttr:function(){
            return this.theMap;
        },
        _setTheMapAttr:function(/*Map*/a){
            console.log("使用自定义的_setTheMapAttr设置theMap");
            this._set("theMap",a);

        },
        //获取和设置属性值
        _getLabelAttr:function(){

            return this.label;
        },
        _setLabelAttr:function(/*string*/label){
            console.log("使用自定义的_setLabelAttr设置label");
            this._set("label",label);
        },

        _getToolAttr:function(){

            return this.tool;
        },
        _setToolAttr:function(/*string*/t){
            console.log("使用自定义的_setLabelAttr设置label");
            this._set("tool",t);
        }

    });

});