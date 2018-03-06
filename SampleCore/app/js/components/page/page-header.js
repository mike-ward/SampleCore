"use strict";
exports.__esModule = true;
var mithril = require("mithril");
var m = mithril;
var dom_service_1 = require("../../services/dom-service");
var nav_bar_1 = require("./nav-bar");
// language=CSS
var css = ".header{clear:both;text-align:center;}";
dom_service_1.loadStyles(css);
var navbarOptions = {
    items: [
        { name: 'Home', link: 'home' },
        { name: 'Item1', link: 'item1' },
        { name: 'Item2', link: 'item2' },
        { name: 'About', link: 'about' }
    ]
};
function view() {
    return m('.header', [
        m('h1', 'My Application Title'),
        m(nav_bar_1.navBar, { options: navbarOptions }),
        m('hr')
    ]);
}
exports.pageHeader = {
    view: view,
    css: css
};
