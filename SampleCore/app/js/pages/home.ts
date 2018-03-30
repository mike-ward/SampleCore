import m from 'mithril';
import { grid } from '../components/widgets/grid';
import { IGridOptions, IGridColumn } from '../components/widgets/grid-options';
import { camelIdentifierToTitle, dateToLocaleString } from '../services/convert-service';
import { loadStyles } from '../services/dom-service';

let gridOptions = { columns: [] as any[], data: [] as any[] } as IGridOptions;

function view() {
  return m('div', [
    m('h2', 'Welcome'),
    m('p[style="font-weight:bold"]', 'Most Active Stocks'),
    m(grid, { 'class': 'home-markets-grid', gridOptions: gridOptions })
  ]);
}

function oncreate() {
  getMostActive()
    .then(r => {gridOptions = loadGrid(r)})
    .catch(r => r);
}

function getMostActive() {
  return m.request({ url: 'api/markets/mostactive', data: Date.now() });
}

function loadGrid(data: any) {
  const fields = ['symbol', 'companyName', 'primaryExchange', 'sector', 'latestPrice', 'open', 'close', 'high', 'low', 'week52High', 'week52Low'];

  const columns: IGridColumn[] = fields
    .map(field => ({
      id: field,
      title: camelIdentifierToTitle(field),
      allowSort: true,
    }));

  return { columns: columns, data: data };
}

// language=css
const css = `.home-markets-grid { font-size: smaller; }`;
loadStyles(css);

export var home = {
  view: view,
  oncreate: oncreate
}