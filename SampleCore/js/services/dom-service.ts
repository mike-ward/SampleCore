﻿
function loadCss(obj: any): void {
  const css = findAllCss(obj, []);
  addCssToHead(css.join('\n'));
}

function findAllCss(obj: any, css: string[]) {
  const keys = Object.keys(obj);

  keys.forEach(key => {
    const value = obj[key];
    if (value && typeof value === 'object') {
      if ((value as any).css) css.push((value as any).css);
      findAllCss(value, css);
    }
  });

  return css;
}

function addCssToHead(css: string) {
  const style = document.createElement('style');
  style.type = 'text/css';
  style.innerHTML = css;
  document.getElementsByTagName('head')[0].appendChild(style);
}

export var domService = {
  loadCss: loadCss
}
