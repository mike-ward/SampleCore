/// <amd-dependency path="mitril-query" />
declare var require: (moduleId: string) => any;
var mq = require("mithril-query");
import { userBar } from './user-bar';

test('user-bar should contain .user-bar class', () => {
  var out = mq(userBar);
  out.should.have('.user-bar');
})