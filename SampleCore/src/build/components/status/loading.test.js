/// <amd-dependency path="mitril-query" />
var mq = require("mithril-query");
import { loading } from './loading';
test('loading indicator should contain image', function () {
    var out = mq(loading);
    out.should.have('img');
    out.should.contain('&nbsp;Loading&hellip;');
});
