"use strict";
exports.__esModule = true;
/// <amd-dependency path="mitril-query" />
var mq = require("mithril-query");
var nav_bar_1 = require("./nav-bar");
test('nav-bar should contain menu', function () {
    var navbarOptions = {
        items: [
            { name: 'Home', link: 'home' },
            { name: 'Item1', link: 'item1' },
            { name: 'Item2', link: 'item2' },
            { name: 'About', link: 'about' }
        ]
    };
    var out = mq({ navBar: nav_bar_1.navBar }.navBar, { options: navbarOptions });
    out.should.have('.nav-bar');
    out.should.have(4, 'a');
});
