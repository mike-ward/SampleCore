"use strict";
exports.__esModule = true;
/// <amd-dependency path="mitril-query" />
var mq = require("mithril-query");
var home_1 = require("./home");
test('home page has correct tags', function () {
    var out = mq(home_1.home);
    out.should.have('div');
    out.should.have('h1');
    out.should.contain("Welcome");
});
