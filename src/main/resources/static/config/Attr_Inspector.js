console.log('well, here is the Attr_Inspector file')
var siteOrigin = location.origin;
var prjRelatePath = "/static/ts"
var rootPath = siteOrigin + prjRelatePath;
console.log(rootPath);
window.dojoConfig = {
    deps: ["ts/main/Attr_Inspector"],
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