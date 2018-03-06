"use strict";
exports.__esModule = true;
/// <amd-dependency path="mitril-query" />
var mq = require("mithril-query");
var loading_1 = require("./loading");
test('loading indicator should contain image', function () {
    var out = mq(loading_1.loading);
    out.should.have('img');
    out.should.contain('&nbsp;Loading&hellip;');
});
