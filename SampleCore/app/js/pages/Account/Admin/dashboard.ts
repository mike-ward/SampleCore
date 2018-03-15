import * as m from 'mithril';
import { grid } from '../../../components/widgets/grid';
import { IGridOptions, IGridColumn } from '../../../components/widgets/grid-options';
import { loading } from '../../../components/status/loading';
import { formVerificationToken } from '../../../components/page/asp-net-verification-token';

let isLoading = false;
let errorMessage = '';
let gridOptions = { columns: [] as any[], data: [] as any[] } as IGridOptions;

function view() {
  return m('view', [
    m('.admin-dashboard', [
      m('h2', 'Administrator Dashboard'),
      m('h3.error-text', errorMessage),
      m('div.admin-dashboard-buttons', [
        m('a.pure-button', { href: 'account/admin/addUser' }, 'Add User'),
        m('a.pure-button', { href: 'account/admin/system-information' }, 'System Information'),
        m(loading, { style: { visibility: (isLoading ? 'visible' : 'hidden') } } as any)
      ]),
      m(grid, { gridOptions: gridOptions }),
      m(formVerificationToken)
    ])
  ]);
}

export const adminDashboard = {
  view: view
}