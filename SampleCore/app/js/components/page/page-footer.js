"use strict";
exports.__esModule = true;
var m = require("mithril");
var dom_service_1 = require("../../services/dom-service");
function view() {
    return m('.footer', [
        m('hr'),
        m('.app-footer', 'footer stuff goes here')
    ]);
}
// language=CSS
var css = ".footer{margin-top:5rem;}";
dom_service_1.loadStyles(css);
exports.pageFooter = {
    view: view,
    css: css
};
