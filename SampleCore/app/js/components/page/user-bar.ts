import m from 'mithril';
import { loadStyles } from '../../services/dom-service';

// language=CSS
const css = `  .user-bar { float: right; margin-right: 2em; }`;
loadStyles(css);

function view() {
  return m('.user-bar', [
    m('a[href="account/user/logout"]', 'Logout')
  ]);
}

export const userBar = {
   view: view
};