"use strict";
exports.__esModule = true;
/// <amd-dependency path="mitril-query" />
var mq = require("mithril-query");
var about_1 = require("./about");
test('about page has correct tags', function () {
    var out = mq(about_1.about);
    out.should.have('div');
    out.should.have('h1');
    out.should.contain("I'm an aboot page");
});
