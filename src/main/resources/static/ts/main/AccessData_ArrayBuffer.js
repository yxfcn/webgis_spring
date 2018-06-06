define(["require", "exports", "dojo/dom", "dojo/on", "dojo/dom-class", "esri/config", "esri/request"], function (require, exports, dom, on, domClass, esriConfig, esriRequest) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var isImage;
    //esriConfig.defaults.io.alwaysUseProxy=false;
    //esriConfig.defaults.io.corsDetection=false;
    // Use CORS
    //esriConfig.defaults.io.corsEnabledServers.push("https://sampleserver6.arcgisonline.com"); // supports CORS
    esriConfig.defaults.io.corsEnabledServers.push("sampleserver6.arcgisonline.com");
    esriConfig.defaults.io.corsEnabledServers.push("http://tmap.linhai.gov.cn");
    esriConfig.defaults.io.corsEnabledServers.push("http://pic.qiantucdn.com/");
    on(dom.byId("rdoJson"), "change", change);
    on(dom.byId("rdoImage"), "change", change);
    on(dom.byId("submitRequest"), "click", getContent);
    function getContent() {
        var url = dom.byId("url").value;
        console.log("url.value:%s", url);
        console.log("url.innerHTML:%s", dom.byId("url").innerHTML);
        var contentDiv = dom.byId("content");
        contentDiv.innerHTML = "";
        domClass.remove(contentDiv, "failure");
        dom.byId("status").innerHTML = "下载中......";
        var params = {
            url: url,
            handleAs: "arraybuffer"
        };
        if (dom.byId("rdoJson").checked) {
            params.content = {
                f: "json"
            };
        }
        else {
            isImage = true;
        }
        var requestHandle = esriRequest(params);
        requestHandle.then(function (response) {
            dom.byId("status").innerHTML = "";
            var reader = new FileReader();
            reader.addEventListener("loadend", function () {
                if (isImage) {
                    dom.byId("content").innerHTML = "<img src=' " + reader.result + " ' />";
                }
                else {
                    dom.byId("content").innerHTML = "<div>" + reader.result + "</div>";
                }
            });
            if (isImage) {
                //if working with image data
                reader.readAsDataURL(new Blob([response], {
                    type: "image/png"
                }));
            }
            else {
                reader.readAsText(new Blob([response], {
                    type: "text/plain"
                }));
            }
        }, function (error) {
            domClass.add(dom.byId("content"), "failure");
            dom.byId("status").innerHTML = "";
            dom.byId("content").innerHTML = "<div>" + error + "</div>";
        });
    }
    function change(evt) {
        var url;
        if (evt.target.id === "rdoJson") {
            url = "https://sampleserver6.arcgisonline.com/arcgis/rest/services/";
        }
        else {
            url = "https://sampleserver6.arcgisonline.com/arcgis/rest/services/WorldTimeZones/MapServer/tile/1/0/0";
        }
        dom.byId("url").value = url;
    }
});
//# sourceMappingURL=AccessData_ArrayBuffer.js.map