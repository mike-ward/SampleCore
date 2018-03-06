"use strict";
exports.__esModule = true;
// true if IE less than 9
if (!-[1,])
    alert('Internet Explorer 7 and 8 are not supported');
require("./node_modules/purecss/build/pure-min.css");
var m = require("mithril");
var home_1 = require("./pages/home");
var about_1 = require("./pages/about");
var page_header_1 = require("./components/page/page-header");
var page_footer_1 = require("./components/page/page-footer");
var dom_service_1 = require("./services/dom-service");
var pages = { home: home_1.home, about: about_1.about };
// language=CSS
var css = "\n  body{\n    color:#333;\n    background-color:#f9fafb;;\n    line-height:1.6;\n    margin:1em auto;\n    max-width:1200px;\n    min-width:320px;\n  }\n  view{\n    margin:1em auto;\n  }\n  .error-text{\n    color:darkred;\n  }\n  .current-user-login{\n    text-align:right;\n  }";
dom_service_1.loadStyles(css);
window.sampleApp = {
    loadHeader: function () { return m.mount(document.getElementById('header'), page_header_1.pageHeader); },
    loadPage: function (page) { return m.mount(document.getElementById('root'), pages[page]); },
    loadFooter: function () { return m.mount(document.getElementById('footer'), page_footer_1.pageFooter); }
};
