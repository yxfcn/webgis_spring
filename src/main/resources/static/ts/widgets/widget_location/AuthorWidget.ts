///<reference path="../../../../node_modules/typings.d.ts"/>
import declare=require("dojo/_base/declare");
import _WidgetBase=require("dijit/_WidgetBase");
import _TemplatedMixin=require("dijit/_TemplatedMixin");
import baseFx=require("dojo/_base/fx");
import lang=require("dojo/_base/lang");
import domStyle=require("dojo/dom-style");
import dojoMouse=require("dojo/mouse");
import on=require("dojo/on");
import myTemplate=require("dojo/text!./templates/AuthorWidget.html");



var  AuthorWidget=declare("AuthorWidget",[_WidgetBase,_TemplatedMixin],{
    // 类的默认值，一般用户将值传递给构造函数
    // These typically map to whatever you're passing to the constructor
    //name: "No Name",
    // Using require.toUrl, we can get a path to our AuthorWidget's space
    //使用require.toUrl，获取类的路径
    // and we want to have a default avatar, just in case
    //avatar: require.toUrl("./images/defaultAvatar.png"),
    //bio: "",

    // Our template - important!
    templateString: myTemplate


});

export = AuthorWidget;

