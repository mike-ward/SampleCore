import * as m from 'mithril';
function view() {
    return m('.footer', [
        m('hr'),
        m('.app-footer', 'footer stuff goes here')
    ]);
}
// language=CSS
var css = ".footer{margin-top:5rem;}";
export var pageFooter = {
    view: view,
    css: css
};
