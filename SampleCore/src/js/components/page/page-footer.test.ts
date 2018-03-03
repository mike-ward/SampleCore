/// <amd-dependency path="mitril-query" />
declare var require: (moduleId: string) => any;
var mq = require("mithril-query");
import { pageFooter } from './page-footer';

test('page-footer should contain footer class', () => {
  var out = mq(pageFooter);
  out.should.have('.footer');
})