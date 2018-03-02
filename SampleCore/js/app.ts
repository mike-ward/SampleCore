﻿/*! Copyright INDS Inc, All rights reserved */

// true if IE less than 9
if (!-[1,]) alert('Internet Explorer 7 and 8 are not supported');

// Mithril declarations
declare var m: any;
const mountPage = (view: any) => m.mount(document.getElementById('root'), view);

module App {
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
  }
}