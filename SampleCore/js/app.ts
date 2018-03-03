﻿import * as m from 'mithril';
import { home } from './pages/home';
import { about } from './pages/about';
import { pageHeader } from './components/page/page-header';
import { pageFooter } from './components/page/page-footer';

var pages = { home, about }

// true if IE less than 9
if (!-[1,]) alert('Internet Explorer 7 and 8 are not supported');

export var app = {
  // language=CSS
  css: `
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
      }`
};

(window as any).sampleApp = {
  pages: pages,
  loadHeader: () => m.mount(document.getElementById('header'), pageHeader),
  loadPage: (page: string) => m.mount(document.getElementById('root'), (pages as any)[page]),
  loadFooter: () => m.mount(document.getElementById('footer'), pageFooter)
};

