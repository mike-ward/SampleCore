"use strict";
exports.__esModule = true;
var mithril = require("mithril");
var m = mithril;
var dom_service_1 = require("../../services/dom-service");
function view(vnode) {
    return m('span', vnode.attrs, [
        m('img.loading-img', { src: 'images/loading-rectangle.gif' }),
        m.trust('&nbsp;Loading&hellip;')
    ]);
}
// language=css
var css = ".loading-img { height: 16px; width: 16px; vertical-align: middle}";
dom_service_1.loadStyles(css);
exports.loading = {
    view: view,
    css: css
};
