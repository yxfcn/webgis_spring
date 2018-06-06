var siteOrigin = location.origin;
var prjRelatePath = "/static/ts"
var rootPath = siteOrigin + prjRelatePath;
console.log(rootPath);
window.dojoConfig = {
    deps: ["ts/main/Basemap_TDT"],
    packages: [
        {
            name: "ts",
            location: rootPath
        }
    ],
    has: {
        "esri-featurelayer-webgl": 1
    },
    async: true

}