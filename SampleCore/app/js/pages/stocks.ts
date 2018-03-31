import m from 'mithril';
import { grid } from '../components/widgets/grid';
import { IGridOptions, IGridColumn } from '../components/widgets/grid-options';
import { camelIdentifierToTitle } from '../services/convert-service';
import { loading } from '../components/status/loading';

let stockOptions = {} as IGridOptions;
let isLoading = false;
const fields = ['symbol', 'name', 'date', 'type'];

function view() { 
  const vn = m('div', [
    m('h2', `Stocks ${stockOptions.data ? ` (${stockOptions.data.length.toLocaleString()})` : ''}`),
    m(loading, { style: { visibility: (isLoading ? 'visible' : 'hidden') } } as any),
    m(grid, { gridOptions: stockOptions, style: {'font-size': 's  maller' } } as any)
  ]);
  return vn;
}

function oncreate() {
  getStocks()
    .then(r => { stockOptions = buildGridOptions(fields, r) })
    .then(_ => { isLoading = false })
    .catch(_ => { isLoading = false });
}

export const stocks = {
  view: view,
  oncreate: oncreate
}

function getStocks() {
  isLoading = true;
  return m.request({ url: 'api/markets/stocks', data: Date.now() });
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
