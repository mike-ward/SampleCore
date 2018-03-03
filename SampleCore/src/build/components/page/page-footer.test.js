/// <amd-dependency path="mitril-query" />
var mq = require("mithril-query");
import { pageFooter } from './page-footer';
test('page-footer should contain footer class', function () {
    var out = mq(pageFooter);
    out.should.have('.footer');
});
