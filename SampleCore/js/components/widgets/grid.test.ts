/// <amd-dependency path="mitril-query" />
declare var require: (moduleId: string) => any;
var mq = require("mithril-query");
import { grid } from './grid';

test('grid tests', () => {
  const gridOptions  = { columns: [] as any[], data: [] as any[]};
  const out = mq(grid, { gridOptions: gridOptions });
  out.should.have('.grid');
  out.should.have('table.pure-table.pure-table-bordered');
  out.should.have('thead');
  out.should.have('tbody');
});