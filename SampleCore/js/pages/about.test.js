'use strict';
require('../app.setup.tests');

test('about page has correct tags', () => {
  var out = mq(App.Pages.About.page);
  out.should.have('div');
  out.should.have('h1');
  out.should.contain("I'm an aboot page");
});