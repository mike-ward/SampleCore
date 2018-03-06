"use strict";
exports.__esModule = true;
/// <amd-dependency path="mitril-query" />
var mq = require("mithril-query");
var page_header_1 = require("./page-header");
test('page-header should contain menu', function () {
    var navbarOptions = {
        items: [
            { name: 'Home', link: 'home' },
            { name: 'Item1', link: 'item1' },
            { name: 'Item2', link: 'item2' },
            { name: 'About', link: 'about' }
        ]
    };
    var out = mq(page_header_1.pageHeader, { options: navbarOptions });
    out.should.have('.header');
    out.should.have('.nav-bar');
    out.should.have(4, 'a');
});
