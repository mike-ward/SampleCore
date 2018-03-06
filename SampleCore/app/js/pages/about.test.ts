/// <amd-dependency path="mitril-query" />
declare var require: (moduleId: string) => any;
var mq = require("mithril-query");
import { about } from './about';

test('about page has correct tags', () => {
  var out = mq(about);
  out.should.have('div');
  out.should.have('h2');
  out.should.contain("I'm an aboot page");
});