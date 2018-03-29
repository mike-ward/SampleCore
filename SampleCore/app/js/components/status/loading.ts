import m from 'mithril';
import { loadStyles } from '../../services/dom-service';

function view(vnode: any) {
  return m('span', vnode.attrs, [
    m('img.loading-img', { src: 'images/loading-rectangle.gif' }),
    m.trust('&nbsp;Loading&hellip;')
  ]);
}

// language=css
const css = `.loading-img { height: 16px; width: 16px; vertical-align: middle}`;
loadStyles(css);

export const loading = {
  view: view
}
