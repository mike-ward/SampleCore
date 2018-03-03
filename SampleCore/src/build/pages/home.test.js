/// <amd-dependency path="mitril-query" />
var mq = require("mithril-query");
import { home } from './home';
test('home page has correct tags', function () {
    var out = mq(home);
    out.should.have('div');
    out.should.have('h1');
    out.should.contain("Welcome");
});
