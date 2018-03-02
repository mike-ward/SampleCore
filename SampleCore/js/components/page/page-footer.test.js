require('../../app.setup.tests');

test('page-footer should contain footer class', () => {
  var out = mq(App.Components.pageFooter);
  out.should.have('.footer');
})