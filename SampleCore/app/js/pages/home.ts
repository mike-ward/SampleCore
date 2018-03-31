import m from 'mithril';
import { loadStyles } from '../services/dom-service';
import { dateToLocaleString} from '../services/convert-service';

let news: undefined[] = [];

function view() {
  return m('div', [
    m('h2', 'News'),
    m('div', news.map(item => buildNewsNode(item)))
  ]);
}

function oncreate() {
  getNews()
    .then(r => news = r as any);
}

// language=css
const css = `
  .new-item { margin-bottom: 2em; }
  .home-date-time { margin: -1em 0 1em 0; font-weight: bold; }`;
loadStyles(css);

export var home = {
  view: view,
  oncreate: oncreate
}

function getNews() {
  return m.request({ url: 'api/markets/news', data: Date.now() });
}

function buildNewsNode(item: any) {
  const vn = m('.news-item', [
    m('h3', [m('a', { href: item.url, target: '_blank' } as any, item.headline)]),
    m('div.home-date-time', dateToLocaleString(item.datetime)),
    m('p', item.summary),
    m('p', m.trust(`source: <em>${item.source}<em>`))
  ]);
  return vn;
}