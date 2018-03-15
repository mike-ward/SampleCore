/// <amd-dependency path="mitril-query" />
declare var require: (moduleId: string) => any;
var mq = require("mithril-query");
import { adminDashboard } from './dashboard';

test('admin dashbaord should contain components', () => {
  var out = mq(adminDashboard);
  out.should.have('.admin-dashboard');
  out.should.have('.grid');
})