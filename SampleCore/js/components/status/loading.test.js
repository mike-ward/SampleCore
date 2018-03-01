'use strict';
require('../../app.setup.tests');

test('loading indicator should contain image', () => {
  var out = mq(App.Components.loading);
  out.should.have('img');
  out.should.contain('&nbsp;Loading&hellip;');
})