import * as m from 'mithril';
import { home } from './pages/home';
import { about } from './pages/about';
import { pageHeader } from './components/page/page-header';
import { pageFooter } from './components/page/page-footer';
var pages = { home: home, about: about };
// true if IE less than 9
if (!-[1,])
    alert('Internet Explorer 7 and 8 are not supported');
export var app = {
    // language=CSS
    css: "\n      body{\n        color:#333;\n        background-color:#f9fafb;;\n        line-height:1.6;\n        margin:1em auto;\n        max-width:1200px;\n        min-width:320px;\n      }\n      view{\n        margin:1em auto;\n      }\n      .error-text{\n        color:darkred;\n      }\n      .current-user-login{\n        text-align:right;\n      }"
};
window.sampleApp = {
    pages: pages,
    loadHeader: function () { return m.mount(document.getElementById('header'), pageHeader); },
    loadPage: function (page) { return m.mount(document.getElementById('root'), pages[page]); },
    loadFooter: function () { return m.mount(document.getElementById('footer'), pageFooter); }
};
