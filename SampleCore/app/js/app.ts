declare var module: any;
module.hot && module.hot.accept();

// true if IE less than 9
if (!-[1,]) alert('Internet Explorer 7 and 8 are not supported');

import 'purecss/build/pure-min.css';
import m from 'mithril';
import { home } from './pages/home';
import { markets } from './pages/markets';
import { stocks } from './pages/stocks';
import { about } from './pages/about';
import { error } from './pages/error';
import { login } from './pages/account/user/login';
import { adminDashboard} from './pages/account/admin/dashboard';
import { adminAddUser} from './pages/account/admin/add-user';
import { pageHeader } from './components/page/page-header';
import { pageFooter } from './components/page/page-footer';
import { loadStyles } from './services/dom-service';

const pages = { home, markets, stocks, about, error, login, adminDashboard, adminAddUser };

// language=CSS
const css = `
  body{
    color:#333;
    background-color:#f9fafb;;
    line-height:1.6;
    margin:1em auto;
    max-width:1200px;
    min-width:320px;
  }
  view{
    margin:1em auto;
  }
  .error-text{
    color:darkred;
  }
  .current-user-login{
    text-align:right;
  }`;

loadStyles(css);

(window as any).sampleApp = {
  loadHeader: () => m.mount(document.getElementById('header') as Element, pageHeader),
  loadFooter: () => m.mount(document.getElementById('footer') as Element, pageFooter),
  loadPage: (page: string) => m.mount(document.getElementById('root') as Element, (pages as any)[page] || pages.error),
};
