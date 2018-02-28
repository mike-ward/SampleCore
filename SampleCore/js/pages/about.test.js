var fs = require('fs');
eval(fs.readFileSync('../setup-tests.js') + '');

test('positive result', () => {
  var vnode = App.Pages.About.page.view();
  expect(vnode.tag).toBe('div');
  expect(vnode.children[0].tag).toBe('h1');
});