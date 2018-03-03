import * as mithril from 'mithril';
var m = mithril;
function view(vnode) {
    var options = vnode.attrs.options;
    return options
        ? m('.nav-bar', options.items.map(function (item) { return m('a', { href: item.link }, item.name); }))
        : null;
}
// language=css
var css = "\n      .nav-bar {\n        margin: .25em auto;\n      }\n      .nav-bar a {\n        margin: 0 1em;\n        white-space: nowrap;\n        text-decoration: none;\n      }\n      .nav-bar a:hover {\n        border-bottom: solid 1px;\n      }";
export var navBar = {
    view: view,
    css: css
};
