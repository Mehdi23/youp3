cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "file": "plugins/fr.smile.cordova.fileopener/www/FileOpener.js",
        "id": "fr.smile.cordova.fileopener.FileOpener",
        "clobbers": [
            "cordova.plugins.FileOpener"
        ]
    },
    {
        "file": "plugins/org.apache.cordova.inappbrowser/www/inappbrowser.js",
        "id": "org.apache.cordova.inappbrowser.inappbrowser",
        "clobbers": [
            "window.open"
        ]
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "fr.smile.cordova.fileopener": "1.0.0",
    "org.apache.cordova.inappbrowser": "0.5.0"
}
// BOTTOM OF METADATA
});