require('../app.setup.tests');

test('loadCss should return append css to document', () => {
  expect(document.getElementsByTagName('head')[0].textContent).toBeFalsy();
  App.Services.dom.loadCss(App);
  expect(document.getElementsByTagName('head')[0].textContent).toBeTruthy();
});