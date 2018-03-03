/// <amd-dependency path="mitril-query" />
var mq = require("mithril-query");
import { about } from './about';
test('about page has correct tags', function () {
    var out = mq(about);
    out.should.have('div');
    out.should.have('h1');
    out.should.contain("I'm an aboot page");
});
