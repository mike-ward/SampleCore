global.m = require('mithril');
m.stream = require('mithril/stream');
global.mq = require('mithril-query');

var fs = require('fs');
var app = fs.readFileSync('../wwwroot/app.js').toString();
eval.apply(global, [app]);
