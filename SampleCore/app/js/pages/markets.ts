import m from 'mithril';
import { grid } from '../components/widgets/grid';
import { IGridOptions, IGridColumn } from '../components/widgets/grid-options';
import { camelIdentifierToTitle, dateToLocaleString } from '../services/convert-service';
import { loadStyles } from '../services/dom-service';

let mostActive = {} as IGridOptions;
let gainers = {} as IGridOptions;
let losers = {} as IGridOptions;

const fields = ['symbol', 'companyName', 'primaryExchange', 'sector', 'latestPrice', 'open', 'close', 'high', 'low', 'week52High', 'week52Low'];

function view() {
  return m('div', [
    m('h2', 'Markets'),
    m('p[style="font-weight:bold"]', 'Most Active Stocks'),
    m(grid, { 'class': 'markets-grid', gridOptions: mostActive }),
    m('p[style="font-weight:bold"]', 'Gainers'),
    m(grid, { 'class': 'markets-grid', gridOptions: gainers }),
    m('p[style="font-weight:bold"]', 'Losers'),
    m(grid, { 'class': 'markets-grid', gridOptions: losers })
  ]);
}

function oncreate() {
  getMostActive()
    .then(r => { mostActive = buildGridOptions(fields, r) });

  getGainers()
    .then(r => { gainers = buildGridOptions(fields, r) });

  getLosers()
    .then(r => { losers = buildGridOptions(fields, r) });
}

function getMostActive() {
  return m.request({ url: 'api/markets/mostactive', data: Date.now() });
}

function getGainers() {
  return m.request({ url: 'api/markets/gainers', data: Date.now() });
}

function getLosers() {
  return m.request({ url: 'api/markets/losers', data: Date.now() });
}

function buildGridOptions(fields: string[], data: any) {
  const columns: IGridColumn[] = fields
    .map(field => ({
      id: field,
      title: camelIdentifierToTitle(field),
      allowSort: true,
    }));

  return { columns: columns, data: data };
}

// language=css
const css = `.markets-grid { font-size: smaller; }`;
loadStyles(css);

export var markets = {
  view: view,
  oncreate: oncreate
}