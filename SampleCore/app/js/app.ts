﻿declare var module: any;
if (module.hot) module.hot.accept();

// true if IE less than 9
if (!-[1,]) alert('Internet Explorer 7 and 8 are not supported');

import './node_modules/purecss/build/pure-min.css';
import * as m from 'mithril';
import { home } from './pages/home';
import { about } from './pages/about';
import { pageHeader } from './components/page/page-header';
import { pageFooter } from './components/page/page-footer';
import { loadStyles } from './services/dom-service';

const pages = { home, about };

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
  loadPage: (page: string) => m.mount(document.getElementById('root') as Element, (pages as any)[page]),
  loadFooter: () => m.mount(document.getElementById('footer') as Element, pageFooter)
};
