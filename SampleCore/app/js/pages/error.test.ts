/// <amd-dependency path="mitril-query" />
declare var require: (moduleId: string) => any;
var mq = require("mithril-query");
import { error } from './error';

test('home page has correct tags', () => {
  var out = mq(error);
  out.should.have('div');
  out.should.have('h2');
  out.should.contain("Oops!");
});