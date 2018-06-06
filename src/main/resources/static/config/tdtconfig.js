console.log('well, here is the config file')
var siteOrigin = location.origin;
var prjRelatePath = "/static/ts"
var rootPath = siteOrigin + prjRelatePath;
console.log(rootPath);
window.dojoConfig = {
    //deps:["src/basemapGallary"],
    deps: ["ts/main/main_tdt"],
    packages: [
        {
            name: "ts",
            location: rootPath
        }, {
            name: "myWidgets",
            location: rootPath + "/widgets"
        }
    ],
    has: {
        "esri-featurelayer-webgl": 1
    },
    async: true

}