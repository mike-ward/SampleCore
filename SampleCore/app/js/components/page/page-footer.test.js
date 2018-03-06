"use strict";
exports.__esModule = true;
/// <amd-dependency path="mitril-query" />
var mq = require("mithril-query");
var page_footer_1 = require("./page-footer");
test('page-footer should contain footer class', function () {
    var out = mq(page_footer_1.pageFooter);
    out.should.have('.footer');
});
