define(["require", "exports", "dojo/_base/declare", "dijit/_WidgetBase", "dijit/_TemplatedMixin", "dojo/text!./templates/AuthorWidget.html"], function (require, exports, declare, _WidgetBase, _TemplatedMixin, myTemplate) {
    "use strict";
    var AuthorWidget = declare("AuthorWidget", [_WidgetBase, _TemplatedMixin], {
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
    return AuthorWidget;
});
//# sourceMappingURL=AuthorWidget.js.map