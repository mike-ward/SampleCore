require('../../app.setup.tests');

test('grid tests', () => {
  const gridOptions = { columns: [], data: [] };
  const out = mq(App.Components.grid, { gridOptions: gridOptions });
  out.should.have('.grid');
  out.should.have('table.pure-table.pure-table-bordered');
  out.should.have('thead');
  out.should.have('tbody');
});