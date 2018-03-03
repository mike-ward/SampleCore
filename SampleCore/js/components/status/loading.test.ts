/// <amd-dependency path="mitril-query" />
declare var require: (moduleId: string) => any;
var mq = require("mithril-query");
import { loading } from './loading';

test('loading indicator should contain image', () => {
  var out = mq(loading);
  out.should.have('img');
  out.should.contain('&nbsp;Loading&hellip;');
})