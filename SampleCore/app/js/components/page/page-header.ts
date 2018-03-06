import * as m from 'mithril';
import { loadStyles } from '../../services/dom-service';

import { navBar } from './nav-bar';

// language=CSS
const css = `.header{clear:both;text-align:center;}`;
loadStyles(css);

const navbarOptions = {
  items: [
    { name: 'Home', link: 'home' },
    { name: 'Item1', link: 'item1' },
    { name: 'Item2', link: 'item2' },
    { name: 'About', link: 'about' }
  ]
}

function view() {
  return m(
    '.header', [
      m('h1', 'My Application Title'),
      m(navBar, { options: navbarOptions }),
      m('hr')
    ]);
}

export const pageHeader = {
  view: view,
  css: css
}
