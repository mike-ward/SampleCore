/// <amd-dependency path="mitril-query" />
declare var require: (moduleId: string) => any;
var mq = require("mithril-query");
import { login } from './login';

test('home page has correct tags', () => {
  var out = mq(login);
  out.should.have('div');
  out.should.have('h2');
  out.should.have('form[method="POST"]');
  out.should.have('input#email');
  out.should.have('input#password');
  out.should.have('button#submit');
});