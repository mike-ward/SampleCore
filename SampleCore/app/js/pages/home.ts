import m from 'mithril';
import stream from 'mithril/stream';
import { loadStyles } from '../services/dom-service';
import { dateToLocaleString } from '../services/convert-service';

function view() {
  return m(
    'div',
    [
      m('h2', 'News'),
      m('p', model.time),
      m('div', model.news.map((item: any) => buildNewsNode(item)))
    ]);
}

function oncreate() {
  getNews().then(r => update({ news: r }));
  setInterval(() => update({ time: Date.now() }), 1000);
}

// language=css
loadStyles(`
  .new-item{margin-bottom:2em;}
  .home-date-time{font-weight:bold;margin:-1em 0 1em 0;}`);

export var home = {
  view: view,
  oncreate: oncreate
};

const model = {
  news: [],
  time: Date.now(),
};

const actions = (m: { [key: string]: any }, u: { [key: string]: any }) => {
  for (const k of Object.keys(u)) m[k] = u[k];
  return m;
};
const update = stream();
const models = stream.scan(actions, model, update);
models.map(() => m.redraw());

function getNews() {
  return m.request({ url: 'api/markets/news', data: Date.now() });
}

function buildNewsNode(item: any) {
  const vn = m(
    '.news-item',
    [
      m('h3', [m('a', { href: item.url, target: '_blank' } as any, item.headline)]),
      m('div.home-date-time', dateToLocaleString(item.datetime)),
      m('p', item.summary),
      m('p', m.trust(`source: <em>${item.source}<em>`))
    ]);
  return vn;
}