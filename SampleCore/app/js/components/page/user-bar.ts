import m from 'mithril';
import { loadStyles } from '../../services/dom-service';

// language=CSS
const css = `.user-bar { float: right; margin-right: 2em; }`;
loadStyles(css);

function view() {
  const pageData = (window as any).pageData;
  const isAdmin = pageData && pageData.isAdmin;

  const vn = m('.user-bar', [
    isAdmin ? m('a[href="account/admin/dashboard"]', 'Admin') : '',
    isAdmin ? ' | ' : '',
    m('a[href="account/user/logout"]', 'Logout')
  ]);

  return vn;
}

export const userBar = {
   view: view
};