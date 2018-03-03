/// <amd-dependency path="mitril-query" />
var mq = require("mithril-query");
import { grid } from './grid';
test('grid tests', function () {
    var gridOptions = { columns: [], data: [] };
    var out = mq(grid, { gridOptions: gridOptions });
    out.should.have('.grid');
    out.should.have('table.pure-table.pure-table-bordered');
    out.should.have('thead');
    out.should.have('tbody');
});
