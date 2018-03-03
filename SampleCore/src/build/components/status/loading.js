import * as mithril from 'mithril';
var m = mithril;
function view(vnode) {
    return m('span', vnode.attrs, [
        m('img.loading-img', { src: 'images/loading-rectangle.gif' }),
        m.trust('&nbsp;Loading&hellip;')
    ]);
}
// language=css
var css = ".loading-img { height: 16px; width: 16px; vertical-align: middle}";
export var loading = {
    view: view,
    css: css
};
