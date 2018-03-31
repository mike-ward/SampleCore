import m from 'mithril';
import { loadStyles } from '../../services/dom-service';
import { userBar } from './user-bar';
import { navBar } from './nav-bar';

// language=CSS
const css = `.header{clear:both;text-align:center;}`;
loadStyles(css);

const navbarOptions = {
  items: [
    { name: 'Home', link: 'home' },
    { name: 'Markets', link: 'markets' },
    { name: 'Stocks', link: 'stocks' },
    { name: 'About', link: 'about' }
  ]
}

function view() {
  return m(
    '.header', [
      m(userBar),
      m('h1[style=clear:both]', 'My Application Title'),
      m(navBar, { 'options': navbarOptions }),
      m('hr')
    ]);
}

export const pageHeader = {
  view: view,
  css: css
}
