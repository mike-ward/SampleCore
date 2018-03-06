"use strict";
exports.__esModule = true;
var mithril = require("mithril");
var m = mithril;
var loading_1 = require("../components/status/loading");
var version = '';
var isLoading = false;
function getVersion() {
    return m.request({ url: 'api/sampleapi/version', data: { r: Date.now() } });
}
function oncreate() {
    isLoading = true;
    // next version of Mithril will have finally
    getVersion()
        .then(function (rs) { return version = rs; })["catch"](function (rj) { return version = rj; })
        .then(function () { return isLoading = false; })["catch"](function () { return isLoading = false; });
}
function view() {
    return m('div', [
        m('h1', "I'm an aboot page"),
        m(loading_1.loading, { style: { visibility: isLoading ? 'visible' : 'hidden' } }),
        m('p', "version: " + version)
    ]);
}
exports.about = {
    oncreate: oncreate,
    view: view
};
