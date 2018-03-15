/// <amd-dependency path="mitril-query" />
declare var require: (moduleId: string) => any;
var mq = require("mithril-query");
import { home } from './home';

test('home page has correct tags', () => {
  var out = mq(home);
  out.should.have('div');
  out.should.have('h2');
  out.should.contain("Welcome");
});