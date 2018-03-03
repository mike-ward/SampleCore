import * as mithril from 'mithril';
var m = mithril;
import { navBar } from './nav-bar';
// language=CSS
var css = ".header{clear:both;text-align:center;}";
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
        m(navBar, { options: navbarOptions }),
        m('hr')
    ]);
}
export var pageHeader = {
    view: view,
    css: css
};
