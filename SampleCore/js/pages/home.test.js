require('../app.setup.tests');

test('home page has correct tags', () => {
  var out = mq(App.Pages.home);
  out.should.have('div');
  out.should.have('h1');
  out.should.contain("Welcome");
});