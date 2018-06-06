define(["dojo/_base/declare",
    "dijit/_WidgetBase",
    "dijit/_TemplatedMixin",
    "dijit/_OnDijitClickMixin",
    "esri/graphic",
    "dojo/text!./templates/Draw_Point.html",

], function (declare,   _WidgetBase, _TemplateMixin, _OnDijitClickMixin,

             Graphic,
             dijitTemplate) {
    return declare("Draw_Line",[_WidgetBase, _TemplateMixin, _OnDijitClickMixin], {
        //baseClass: "yxf.widget.draw",
        //declaredClass: "yxf.widget.draw.point",
        toolbar:"",
        label:"",
        toolbar:null,
        //html模板
        templateString: dijitTemplate,

        //构造函数
        constructor: function (/*string*/label) {
            console.log("开始构造Draw_Point");
            this.set("label",label);
            //this.set("theMap",a);

        },


        //获取和设置属性值

        //获取和设置属性值
        _getLabelAttr:function(){

            return this.label;
        },
        _setLabelAttr:function(/*string*/label){
            console.log("使用自定义的_setLabelAttr设置label");
            this._set("label",label);
        }
    });

});