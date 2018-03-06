"use strict";
exports.__esModule = true;
function loadStyles(css) {
    var style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    document.head.appendChild(style);
}
exports.loadStyles = loadStyles;
