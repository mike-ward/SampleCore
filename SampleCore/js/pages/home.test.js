var fs = require('fs');
var m = require('mithril');
var mq = require('mithril-query');
eval(fs.readFileSync('../wwwroot/app.js').toString());

test('home page has correct tags', () => {
  var out = mq(App.Pages.Home.page);
  out.should.have('div');
  out.should.have('h1');
  out.should.contain("Welcome");
});