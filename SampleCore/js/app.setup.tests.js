'use strict';

var m = require('mithril');
var mq = require('mithril-query');
m.stream = require('mithril/stream');

var fs = require('fs');
var app = fs.readFileSync('../wwwroot/app.js').toString();
eval.apply(global, [app]);

global.m = m;
global.mq = mq;
