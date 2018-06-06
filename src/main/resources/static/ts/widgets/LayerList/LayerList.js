// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.23/esri/copyright.txt for details.
//>>built
require({cache: {"url:esri/dijit/LayerList/templates/LayerList.html": '\x3cdiv class\x3d"${theme}" role\x3d"presentation"\x3e\r\n  \x3cdiv role\x3d"menu" data-dojo-attach-point\x3d"_container" class\x3d"${css.container}"\x3e\r\n    \x3cul role\x3d"group" class\x3d"${css.list}" data-dojo-attach-point\x3d"_layersNode"\x3e\x3c/ul\x3e\r\n    \x3cdiv class\x3d"${css.noLayersText}" data-dojo-attach-point\x3d"_noLayersNode"\x3e\x3c/div\x3e\r\n  \x3c/div\x3e\r\n\x3c/div\x3e'}});
define("esri/dijit/LayerList", "dojo/_base/array dojo/_base/declare dojo/_base/lang dojo/_base/kernel ../kernel dojo/uacss dojo/Deferred dojo/on dojo/query dojo/dom-class dojo/dom-style dojo/dom-construct dojo/dom-attr dojo/i18n!../nls/jsapi dijit/a11yclick dijit/_WidgetBase dijit/_TemplatedMixin ../promiseList ../layerUtils dojo/text!./LayerList/templates/LayerList.html".split(" "),
    function (arrayUtils, declare, lang, baseKernel, L, uacss, C, on, query, domClass, domStyle, domConstruct, domAttr, jsapi, a11yclick, _WidgetBase, _TemplatedMixin, promiseList, layerUtils, R) {
    var S = arrayUtils.some(["ar", "he"], function (a) {
        return -1 !== baseKernel.locale.indexOf(a)
    });
    v = declare([_WidgetBase, _TemplatedMixin], {
        //模板
        templateString: R,
        //默认配置
        defaults: {
            theme: "esriLayerList",//主题
            map: null,//地图
            layers: null,//图层
            showSubLayers: !0,//是否显示子图层
            showOpacitySlider: !1,//是否显示透明度控制滑块
            showLegend: !1,//是否显示图例
            removeUnderscores: !0,//是否删除下划线
            visible: !0//可见
        },
        /**构造函数****
         * **/
        constructor: function (a) {
            //使用参数a、默认参数创建一个新的对象a
            a = lang.mixin({}, this.defaults, a);
            //设置实例属性
            this.set(a);
            //设置css属性
            this.css = {
                container: "esriContainer",//容器
                noLayers: "esriNoLayers",//无图层
                noLayersText: "esriNoLayersText",//无图层名
                slider: "esriSlider",//滑块
                sliderLabels: "esriSliderLabels",//滑块标注
                legend: "esriLegend",//图例
                tabContainer: "esriTabContainer",//tab容器
                tabs: "esriTabs",//tab
                tabMenu: "esriTabMenu",//菜单
                tabMenuItem: "esriTabMenuItem",//tab菜单项目
                tabMenuSelected: "esriTabMenuSelected",//tab已选
                tabMenuVisible: "esriTabMenuVisible",
                tab: "esriTab",
                tabSelected: "esriTabSelected",
                toggleButton: "esriToggleButton",
                iconCollapse: "esri-icon-down",
                iconExpand: S ? "esri-icon-left" : "esri-icon-right",
                list: "esriList",
                listExpand: "esriListExpand",
                subListExpand: "esriSubListExpand",
                listVisible: "esriListVisible",
                subList: "esriSubList",
                hasSubList: "esriHasSubList",
                hasButton: "esriHasButton",
                hasTabContent: "esriHasTabContent",
                subListLayer: "esriSubListLayer",
                layer: "esriLayer",
                layerScaleInvisible: "esriScaleInvisible",
                title: "esriTitle",
                titleContainer: "esriTitleContainer",
                checkbox: "esriCheckbox",
                label: "esriLabel",
                button: "esriButton",
                content: "esriContent",
                clearFix: "esriClearFix",
                clear: "esriClear"
            }
        },

        /**在呈现前修改界面**/
        postCreate: function () {
            this.inherited(arguments);//很重要
            var a = this;//将当前实例对象赋给a

            //为图层checkbox的change事件添加事件处理句柄
            this.own(on(this._layersNode, on.selector("." + this.css.checkbox, "change"), function () {
                var c, b;
                //获取data-layer-index属性值
                c = domAttr.get(this, "data-layer-index");
                //获取data-sublayer-index属性值
                b = domAttr.get(this, "data-sublayer-index");
                a._toggleLayer(c, b);
                a._toggleState(c, b)
            }));
            this.own(on(this._layersNode, on.selector("." + this.css.tabMenuItem, a11yclick.press), function () {
                var c =
                    domAttr.get(this, "data-layer-index"), b = domAttr.get(this, "data-tab-id");
                a._toggleTab(c, b)
            }));
            this.own(on(this._layersNode, on.selector("." + this.css.toggleButton, a11yclick.press), function () {
                var c = domAttr.get(this, "data-layer-index");
                a._toggleExpand(c)
            }))
        },
        startup: function () {
            this.inherited(arguments);
            this._mapLoaded(this.map).then(lang.hitch(this, this._init))
        },
        destroy: function () {
            this._removeEvents();
            this.inherited(arguments)
        },
        refresh: function () {
            var a = this.layers;
            this._nodes = [];
            var c = [];
            if (a && a.length) for (var b = 0; b < a.length; b++) c.push(this._layerLoaded(b));
            return promiseList(c).always(lang.hitch(this, function (a) {
                this._loadedLayers = a;
                this._removeEvents();
                this._createLayerNodes();
                this._setLayerEvents();
                this.emit("refresh")
            }))
        },
        _mapLoaded: function (a) {
            var c = new C;
            if (a) if (a.loaded) c.resolve(); else on.once(a, "load", lang.hitch(this, function () {
                c.resolve()
            })); else c.resolve();
            return c.promise
        },
        _toggleExpand: function (a) {
            a = parseInt(a, 10);
            if (a = this._nodes[a]) {
                var c = a.layer;
                domClass.toggle(c, this.css.listExpand);
                c = domClass.contains(c, this.css.listExpand);
                domAttr.set(a.toggle, "title", c ? jsapi.widgets.layerList.collapse :
                    jsapi.widgets.layerList.expand);
                domClass.toggle(a.toggle, this.css.iconCollapse, c);
                domClass.toggle(a.toggle, this.css.iconExpand, !c)
            }
        },
        _toggleTab: function (a, c) {
            a = parseInt(a, 10);
            var b = this._nodes[a];
            if (b) {
                var d = b.tabMenu, b = query("[data-tab-id]", b.tabs), d = query("[data-tab-id]", d), e;
                for (e = 0; e < b.length; e++) {
                    var f = domAttr.get(b[e], "data-tab-id");
                    domClass.toggle(b[e], this.css.tabSelected, c === f)
                }
                for (e = 0; e < d.length; e++) b = domAttr.get(d[e], "data-tab-id"), domClass.toggle(d[e], this.css.tabMenuSelected, c === b)
            }
        },
        _layerLoaded: function (a) {
            var c = this.layers[a], b = c.layer,
                d = {layer: b, layerInfo: c, layerIndex: a}, e = new C;
            if (b) if (b.loaded) e.resolve(d); else if (b.loadError) e.reject(b.loadError); else {
                var f, h;
                f = on.once(b, "load", lang.hitch(this, function () {
                    h.remove();
                    e.resolve(d)
                }));
                h = on.once(b, "error", lang.hitch(this, function (a) {
                    f.remove();
                    e.reject(a)
                }))
            } else e.resolve(d);
            return e.promise
        },
        _checkboxStatus: function (a) {
            return !!a.visibility
        },
        _WMSVisible: function (a, c) {
            var b = [];
            a && a.layer && (b = a.layer.visibleLayers);
            return -1 < arrayUtils.indexOf(b, c.name)
        },
        _subCheckboxStatus: function (a, c) {
            var b;
            switch (a.layer.declaredClass) {
                case "esri.layers.KMLLayer":
                    b =
                        c.visible;
                    break;
                case "esri.layers.WMSLayer":
                    b = this._WMSVisible(a, c);
                    break;
                default:
                    b = c.defaultVisibility
            }
            return !!b
        },
        _getLayerTitle: function (a) {
            var c = "", b = a.layer;
            (a = a.layerInfo) && a.title ? c = a.title : b && b.arcgisProps && b.arcgisProps.title ? c = b.arcgisProps.title : b && b.name ? c = b.name : a && a.id ? c = a.id : b && b.id && (c = b.id);
            return this.removeUnderscores ? c.replace(/_/g, " ") : c
        },
        _showSublayers: function (a) {
            return a.hasOwnProperty("showSubLayers") ? a.showSubLayers : this.showSubLayers
        },
        _opacityChange: function (a) {
            if (this.layer) this.layer.setOpacity(a);
            else if (this.layers) for (var c = 0; c < this.layers.length; c++) this.layers[c].layerObject && this.layers[c].layerObject.setOpacity(a)
        },
        _legend: function (a, c, b) {
            var d = domConstruct.create("div", {
                role: "tabpanel",
                "data-tab-id": "legend",
                className: this.css.tab + " " + this.css.legend
            }, a);
            require(["esri/dijit/Legend"], lang.hitch(this, function (a) {
                var e = [c];
                if (c && c.featureCollection && c.featureCollection.layers) for (var e = c.featureCollection.layers, h = 0; h < e.length; h++) e[h].layer = e[h].layerObject;
                a = new a({map: this.map, layerInfos: e}, domConstruct.create("div"));
                domConstruct.place(a.domNode, d);
                a.startup();
                this._nodes[b].legend = a
            }))
        },
        _slider: function (a, c, b, d) {
            a = domConstruct.create("div", {
                role: "tabpanel",
                "data-tab-id": "opacity",
                className: this.css.tab + " " + this.css.slider
            }, a);
            var e = domConstruct.create("div", {}, a), f = domConstruct.create("div", {}, a);
            require(["dijit/form/HorizontalSlider", "dijit/form/HorizontalRuleLabels"], lang.hitch(this, function (a, g) {
                var h = new a({
                    showButtons: !1,
                    minimum: .1,
                    maximum: 1,
                    layer: c,
                    layers: b,
                    discreteValues: .1,
                    intermediateChanges: !0,
                    value: d,
                    onChange: this._opacityChange
                }, e), k = new g({
                    container: "bottomDecoration",
                    count: 0, className: this.css.sliderLabels, labels: ["0", "50", "100"]
                }, f);
                h.startup();
                domConstruct.startup()
            }))
        },
        _createLayerNodes: function () {
            this._layersNode.innerHTML = "";
            this._noLayersNode.innerHTML = "";
            domClass.remove(this._container, this.css.noLayers);
            var a = this._loadedLayers;
            if (a && a.length) for (var c = 0; c < a.length; c++) {
                var b = a[c];
                if (b) {
                    var d = b.layer, e = b.layerIndex, f = b.layerInfo;
                    if (f) {
                        if (f.featureCollection && !f.hasOwnProperty("visibility")) {
                            var h = f.featureCollection.layers[0];
                            h && h.layerObject && (f.visibility = h.layerObject.visible)
                        }
                        d &&
                        !f.hasOwnProperty("visibility") && (f.visibility = f.layer.visible);
                        d && !f.hasOwnProperty("id") && (f.id = f.layer.id);
                        var t, h = domConstruct.create("li", {role: "menuitem", className: this.css.layer});
                        domConstruct.place(h, this._layersNode, "first");
                        t = domConstruct.create("div", {className: this.css.title}, h);
                        var m = domConstruct.create("div", {className: this.css.tabContainer}, h), n = domConstruct.create("ul", {
                            role: "tablist",
                            className: this.css.tabMenu + " " + this.css.clearFix
                        }, m), m = domConstruct.create("div", {className: this.css.tabs}, m), q = [], y;
                        d && (y = d.declaredClass);
                        var r = this._checkboxStatus(f),
                            u = domConstruct.create("div", {className: this.css.titleContainer}, t),
                            p = this.id + "_checkbox_" + e, z = domConstruct.create("input", {
                                type: "checkbox",
                                id: p,
                                "data-layer-index": e,
                                className: this.css.checkbox
                            }, u);
                        domAttr.set(z, "checked", r);
                        d && !d.visibleAtMapScale && (domClass.add(h, this.css.layerScaleInvisible), domAttr.set(h, "aria-disabled", "true"), domAttr.set(z, "disabled", "disabled"));
                        var w = domConstruct.create("div", {
                            tabindex: 0,
                            role: "button",
                            "data-layer-index": e,
                            title: jsapi.widgets.layerList.expand,
                            className: this.css.toggleButton + " " + this.css.iconExpand
                        }, u), v;
                        f.button && (v = f.button,
                            domClass.add(h, this.css.hasButton), domClass.add(v, this.css.button), domConstruct.place(v, u));
                        b = this._getLayerTitle(b);
                        b = domConstruct.create("label", {className: this.css.label, textContent: b}, u);
                        domAttr.set(b, "for", p);
                        var p = domConstruct.create("div", {className: this.css.clear}, u), G;
                        f.content && (G = f.content, domClass.add(G, this.css.content), domConstruct.place(G, t));
                        this._nodes[e] = {
                            checkbox: z,
                            title: t,
                            tabMenu: n,
                            tabs: m,
                            titleContainer: u,
                            label: b,
                            layer: h,
                            toggle: w,
                            clear: p,
                            button: v,
                            content: G,
                            subNodes: q
                        };
                        domClass.toggle(h, this.css.listVisible, r);
                        if (d && (t = d.layerInfos, "esri.layers.KMLLayer" ===
                        y && (t = d.folders), u = this._showSublayers(f), "esri.layers.ArcGISTiledMapServiceLayer" !== y && t && t.length)) if (u) {
                            domConstruct.create("li", {
                                tabindex: 0,
                                "data-tab-id": "sublayers",
                                "data-layer-index": e,
                                role: "tab",
                                className: this.css.tabMenuItem,
                                textContent: jsapi.widgets.layerList.sublayers
                            }, n);
                            domClass.add(h, this.css.hasSubList);
                            domClass.toggle(h, this.css.subListExpand, r);
                            for (var r = domConstruct.create("div", {
                                className: this.css.tab,
                                "data-tab-id": "sublayers",
                                role: "tabpanel"
                            }, m), u = domConstruct.create("ul", {
                                role: "group",
                                className: this.css.subList
                            }, r), C, z = [], r = 0; r <
                                 t.length; r++) {
                                var b = t[r], A, p = -1, w = null;
                                "esri.layers.ArcGISDynamicMapServiceLayer" === y ? (A = b.id, p = b.parentLayerId, b.subLayerIds || (b.defaultVisibility = d && d.visibleLayers && -1 !== d.visibleLayers.indexOf(b.id) ? !0 : !1)) : "esri.layers.KMLLayer" === y ? (A = b.id, p = b.parentFolderId) : "esri.layers.WMSLayer" === y && (A = b.name, p = -1);
                                if (-1 !== p) if (w = this._nodes[e].subNodes[p], z[p]) w = z[p]; else {
                                    var B = w.subLayer,
                                        w = domConstruct.create("ul", {role: "group", className: this.css.subList}, B);
                                    domClass.add(B, this.css.hasSubList);
                                    domClass.toggle(B, [this.css.listVisible,
                                        this.css.subListExpand], J);
                                    z[p] = w
                                }
                                var J = this._subCheckboxStatus(f, b);
                                J && !C && (C = !0);
                                var H = this.id + "_checkbox_sub_" + e + "_" + A,
                                    p = domConstruct.create("li", {role: "menuitem", className: this.css.subListLayer}, w || u),
                                    B = domConstruct.create("div", {className: this.css.title}, p),
                                    I = domConstruct.create("div", {className: this.css.titleContainer}, B),
                                    D = domConstruct.create("input", {
                                        type: "checkbox",
                                        id: H,
                                        "data-layer-index": e,
                                        "data-sublayer-index": A,
                                        className: this.css.checkbox
                                    }, I);
                                domAttr.set(D, "checked", J);
                                b = domConstruct.create("label", {
                                    className: this.css.label, textContent: b.title ||
                                    b.name || ""
                                }, I);
                                domAttr.set(b, "for", H);
                                H = domConstruct.create("div", {className: this.css.clear}, I);
                                q[A] = {
                                    subList: u,
                                    subSubList: w,
                                    subLayer: p,
                                    subTitle: B,
                                    subTitleContainer: I,
                                    subCheckbox: D,
                                    subLabel: b,
                                    subClear: H
                                }
                            }
                        } else for (r = 0; r < t.length; r++) b = t[r], p = -1, "esri.layers.ArcGISDynamicMapServiceLayer" === y && (p = b.parentLayerId, b.subLayerIds || (b.defaultVisibility = d && d.visibleLayers && -1 !== d.visibleLayers.indexOf(b.id) ? !0 : !1));
                        if (f.hasOwnProperty("showLegend") ? f.showLegend : this.showLegend) domConstruct.create("li", {
                            tabindex: 0, role: "tab", className: this.css.tabMenuItem,
                            "data-layer-index": e, "data-tab-id": "legend", textContent: jsapi.widgets.layerList.legend
                        }, n), this._legend(m, f, e);
                        if (f.hasOwnProperty("showOpacitySlider") ? f.showOpacitySlider : this.showOpacitySlider) {
                            var E;
                            !d && f.featureCollection ? (E = f.featureCollection.layers, f = f.featureCollection.layers[0].opacity) : f = d.opacity;
                            domConstruct.create("li", {
                                tabindex: 0,
                                "data-tab-id": "opacity",
                                role: "tab",
                                className: this.css.tabMenuItem,
                                "data-layer-index": e,
                                textContent: jsapi.widgets.layerList.opacity
                            }, n);
                            this._slider(m, d, E, f)
                        }
                        d = query("." + this.css.tab,
                            m);
                        if (e = d.length) domClass.add(h, [this.css.hasTabContent]), domClass.add(d[0], this.css.tabSelected);
                        1 < e && (domClass.add(h, this.css.tabMenuVisible), h = query("li", n), h.length && domClass.add(h[0], this.css.tabMenuSelected))
                    }
                }
            } else domClass.add(this._container, this.css.noLayers), domAttr.set(this._noLayersNode, "textContent", jsapi.widgets.layerList.noLayers)
        },
        _removeEvents: function () {
            if (this._layerEvents && this._layerEvents.length) for (var a = 0; a < this._layerEvents.length; a++) this._layerEvents[a].remove();
            this._layerEvents = []
        },
        _emitToggle: function (a, c, b) {
            this.emit("toggle",
                {layerIndex: a, subLayerIndex: c, visible: b})
        },
        _toggleVisible: function (a, c) {
            var b = this._nodes[a].checkbox;
            domClass.toggle(this._nodes[a].layer, this.css.listVisible, c);
            var d = domAttr.get(b, "checked");
            domClass.contains(this._nodes[a].layer, this.css.hasSubList) && domClass.toggle(this._nodes[a].layer, this.css.subListExpand, d);
            d !== c && (domAttr.set(b, "checked", c), this._emitToggle(a, null, c))
        },
        _layerVisChangeEvent: function (a, c, b) {
            b = c ? a.layerInfo.featureCollection.layers[b].layer : a.layer;
            var d = on(b, "visibility-change", lang.hitch(this, function (b) {
                var d =
                    this.layers && this.layers[a.layerIndex];
                d && (d.visibility = b.visible);
                c ? this._featureCollectionVisible(a.layerIndex, b.visible) : this._toggleVisible(a.layerIndex, b.visible)
            }));
            this._layerEvents.push(d);
            c || (d = on(b, "scale-visibility-change", lang.hitch(this, function (b) {
                b = b.target.visibleAtMapScale;
                var c = this._nodes[a.layerIndex].checkbox, d = this._nodes[a.layerIndex].layer;
                domClass.toggle(d, this.css.layerScaleInvisible, !b);
                b ? (domAttr.remove(d, "aria-disabled"), domAttr.remove(c, "disabled")) : (domAttr.set(d, "aria-disabled", "true"), domAttr.set(c,
                    "disabled", "disabled"))
            })), this._layerEvents.push(d), "esri.layers.ArcGISDynamicMapServiceLayer" === b.declaredClass && (b = on(this.map, "zoom-end", lang.hitch(this, function () {
                this._subLayerScale(a)
            })), this._layerEvents.push(b), this._subLayerScale(a)))
        },
        _subLayerScale: function (a) {
            var c = a.layer.createDynamicLayerInfosFromLayerInfos(), b = layerUtils._getLayersForScale(this.map.getScale(), c);
            arrayUtils.forEach(c, lang.hitch(this, function (c) {
                if (!c.subLayerIds) {
                    c = c.id;
                    var d = this._nodes[a.layerIndex].subNodes[c];
                    if (d) {
                        var f = d.subLayer, d =
                            d.subCheckbox, h = !1;
                        -1 === arrayUtils.indexOf(b, c) && (h = !0);
                        domClass.toggle(f, this.css.layerScaleInvisible, h);
                        h ? (domAttr.set(f, "aria-disabled", "true"), domAttr.set(d, "disabled", "disabled")) : (domAttr.remove(f, "aria-disabled"), domAttr.remove(d, "disabled"))
                    }
                }
            }))
        },
        _layerEvent: function (a) {
            var c = a.layerInfo;
            if (c.featureCollection && c.featureCollection.layers && c.featureCollection.layers.length) {
                if ((c = c.featureCollection.layers) && c.length) for (var b = 0; b < c.length; b++) this._layerVisChangeEvent(a, !0, b)
            } else this._layerVisChangeEvent(a)
        },
        _getVisibleLayers: function (a,
                                     c) {
            var b = a.layerInfos, d, e = [-1];
            "undefined" !== typeof c && (b[c].defaultVisibility = !b[c].defaultVisibility);
            for (d = 0; d < b.length; d++) {
                var f = b[d];
                f.defaultVisibility && (e.push(f.id), f = arrayUtils.lastIndexOf(e, -1), -1 !== f && e.splice(f, 1))
            }
            b = [];
            for (d = 0; d < e.length; d++) f = e[d], this._allIdsPresent(a, f, e) && b.push(f);
            d = [];
            for (e = 0; e < b.length; e++) (f = this._getLayerInfo(a, b[e])) && null === f.subLayerIds && d.push(b[e]);
            d.length || (d = [-1]);
            return d
        },
        _toggleState: function (a, c) {
            var b, d;
            a = parseInt(a, 10);
            d = this._nodes[a];
            d.legend && d.legend.refresh();
            null !== c ? (c = parseInt(c, 10), b = d.subNodes[c].subLayer, d = d.subNodes[c].subCheckbox) : (b = d.layer, d = d.checkbox);
            d = domAttr.get(d, "checked");
            domClass.contains(b, this.css.hasSubList) && domClass.toggle(b, this.css.subListExpand, d);
            domClass.toggle(b, this.css.listVisible, d)
        },

        /***切换图层**/
        _toggleLayer: function (a, c) {
            //如果图层数不为0或包含图层，则执行切换
            if (this.layers && this.layers.length) {
                var b;
                //将a(图层索引）转换成数字
                a = parseInt(a, 10);
                //
                var d = this.layers[a], e = d.layer, f = e && e.layerInfos, h;
                e && (h = e.declaredClass);
                var g = d.featureCollection;
                if (g) for (b = !d.visibility, d.visibility = b, d = 0; d < domClass.layers.length; d++) domClass.layers[d].layerObject.setVisibility(b);
                else if (e) if (null !== c) {
                    if ("esri.layers.ArcGISDynamicMapServiceLayer" === h)
                        c = parseInt(c, 10),
                            g = this._getVisibleLayers(e, c),
                            e.setVisibleLayers(g);
                    else if ("esri.layers.KMLLayer" === h)
                        for (c = parseInt(c, 10), g = e.folders, d = 0; d < domClass.length; d++) {
                        if (h = g[d], h.id === c) {
                            e.setFolderVisibility(h, !h.visible);
                            break
                        }
                    } else "esri.layers.WMSLayer" === h && (g = e.visibleLayers, d = arrayUtils.indexOf(g, c), -1 === d ? domClass.push(c) : domClass.splice(d, 1), e.setVisibleLayers(g));
                    f && (b = f[c].defaultVisibility)
                } else "esri.layers.ArcGISDynamicMapServiceLayer" === h && (g = this._getVisibleLayers(e),
                    e.setVisibleLayers(g)), b = !e.visible, d.visibility = b, e.setVisibility(b); else b = !d.visible, d.setVisibility(b);
                this._emitToggle(a, c, b)
            }
        },
        _featureCollectionVisible: function (a, c) {
            var b = this.layers[a], d = b.visibleLayers, e = b.featureCollection.layers;
            (d && d.length ? arrayUtils.every(d, function (a) {
                return e[a].layer.visible === c
            }) : arrayUtils.every(e, function (a) {
                return a.layer.visible === c
            })) && this._toggleVisible(a, c)
        },
        _setLayerEvents: function () {
            var a = this._loadedLayers;
            if (a && a.length) for (var c = 0; c < a.length; c++) {
                var b = a[c];
                b.layer &&
                this._layerEvent(b)
            }
        },
        _allIdsPresent: function (a, c, b) {
            a = this._walkUpLayerIds(a, c);
            return arrayUtils.every(a, function (a) {
                return -1 < arrayUtils.indexOf(b, a)
            })
        },
        _walkUpLayerIds: function (a, c) {
            var b = this._getLayerInfo(a, c), d = [];
            if (b) for (; -1 !== b.parentLayerId;) (b = this._getLayerInfo(a, b.parentLayerId)) && d.push(b.id);
            return d
        },
        _getLayerInfo: function (a, c) {
            for (var b, d = 0; d < a.layerInfos.length; d++) {
                var e = a.layerInfos[d];
                if (e.id === c) {
                    b = e;
                    break
                }
            }
            return b
        },
        _isSupportedLayerType: function (a) {
            return a && !a._basemapGalleryLayerType || a &&
                "basemap" !== a._basemapGalleryLayerType
        },
        _createLayerInfo: function (a) {
            return {layer: a}
        },
        _updateAllMapLayers: function () {
            if (this.map && (!this.layers || !this.layers.length)) {
                var a = [];
                arrayUtils.forEach(this.map.layerIds, function (c) {
                    c = this.map.getLayer(c);
                    this._isSupportedLayerType(c) && a.push(this._createLayerInfo(c))
                }, this);
                arrayUtils.forEach(this.map.graphicsLayerIds, function (c) {
                    c = this.map.getLayer(c);
                    this._isSupportedLayerType(c) && c._params && c._params.drawMode && a.push(this._createLayerInfo(c))
                }, this);
                this._set("layers",
                    a)
            }
        },
        _init: function () {
            this._visible();
            this._updateAllMapLayers();
            this.refresh().always(lang.hitch(this, function () {
                this.set("loaded", !0);
                this.emit("load")
            }))
        },
        _visible: function () {
            this.visible ? domStyle.set(this.domNode, "display", "block") : domStyle.set(this.domNode, "display", "none")
        },
        _setThemeAttr: function (a) {
            this.domNode && (domClass.remove(this.domNode, this.theme), domClass.add(this.domNode, a));
            this._set("theme", a)
        },
        _setMapAttr: function (a) {
            this._set("map", a);
            this._created && this._mapLoaded(this.map).then(lang.hitch(this, function () {
                this._updateAllMapLayers();
                this.refresh()
            }))
        },
        _setLayersAttr: function (a) {
            this._set("layers", a);
            this._created && this.refresh()
        },
        _setRemoveUnderscoresAttr: function (a) {
            this._set("removeUnderscores", a);
            this._created && this.refresh()
        },
        _setShowSubLayersAttr: function (a) {
            this._set("showSubLayers", a);
            this._created && this.refresh()
        },
        _setShowOpacitySliderAttr: function (a) {
            this._set("showOpacitySlider", a);
            this._created && this.refresh()
        },
        _setShowLegendAttr: function (a) {
            this._set("showLegend", a);
            this._created && this.refresh()
        },
        _setVisibleAttr: function (a) {
            this._set("visible",
                a);
            this._created && this._visible()
        }
    });
    uacss("extend-esri") && m.setObject("dijit.LayerList", v, L);
    return v
});