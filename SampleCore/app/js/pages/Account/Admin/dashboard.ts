import m from 'mithril';
import { grid } from '../../../components/widgets/grid';
import { IGridOptions, IGridColumn } from '../../../components/widgets/grid-options';
import { loading } from '../../../components/status/loading';
import { formVerificationToken } from '../../../components/page/asp-net-verification-token';
import { loadStyles } from '../../../services/dom-service';
import { alert, confirm } from '../../../services/dialog-service';
import { camelIdentifierToTitle, dateToLocaleString } from '../../../services/convert-service';

let isLoading = false;
let errorMessage = '';
let gridOptions = { columns: [] as any[], data: [] as any[] } as IGridOptions;

function getAllUsers() {
  return m.request({ url: 'account/admin/users/all-users', data: { r: Date.now() } });
}

function showLoadingIndicator() {
  isLoading = true;
  m.redraw();
}

function hideLoadingIndicator() {
  isLoading = false;
  m.redraw();
}

function createGridOptions(allUsers: any[]) {
  const gridOptions = {} as IGridOptions;
  if (allUsers.length <= 0) return gridOptions;

  const hideColumns = ['id', 'password', 'resetToken'];
  const dateColumns = ['created', 'modified', 'passwordChanged', 'loggedIn'];
  const keys = Object.keys(allUsers[0]);

  const editColumns: IGridColumn[] = [
    {
      id: '✗',
      title: '✗',
      tooltip: 'Delete User',
      contentIfNull: '✗',
      cellClick: v => confirm(`Delete ${v}?`)
    },
    {
      id: '✎',
      title: '✎',
      tooltip: 'Edit User',
      contentIfNull: '✎',
      cellClick: v => alert(v)
    }
  ];

  const dataColumns: IGridColumn[] = keys
    .map(key => ({
      id: key,
      title: camelIdentifierToTitle(key),
      allowSort: true,
      hide: hideColumns.some(hc => hc === key),
      renderer: dateColumns.some(dc => dc === key)
        ? dateToLocaleString
        : undefined
    }));

  gridOptions.columns = editColumns.concat(dataColumns);
  gridOptions.data = allUsers;
  return gridOptions;
}

function loadGrid() {
  showLoadingIndicator();
  getAllUsers()
    .then((users: any) => {
      hideLoadingIndicator();
      gridOptions = createGridOptions(users);
    })
    .catch((error: any) => {
      hideLoadingIndicator();
      errorMessage = error.message;
    });
}

function oncreate() {
  loadGrid();
}

function view() {
  return m('view', [
    m('.admin-dashboard', [
      m('h2', 'Administrator Dashboard'),
      m('h3.error-text', errorMessage),
      m('.admin-dashboard-buttons', [
        m('a.pure-button', { href: 'account/admin/addUser' }, 'Add User'),
        m('a.pure-button', { href: 'account/admin/system-information' }, 'System Information'),
        m(loading, { style: { visibility: (isLoading ? 'visible' : 'hidden') } } as any)
      ]),
      m(grid, { gridOptions: gridOptions }),
      m(formVerificationToken)
    ])
  ]);
}

// language=css
const css = `
  .admin-dashboard .grid { font-size: smaller; }
  .admin-dashboard-buttons { margin-bottom: 1em }
  .admin-dashboard-buttons a { margin-right: 1em; }
`;

loadStyles(css);

export const adminDashboard = {
  view: view,
  oncreate: oncreate
}