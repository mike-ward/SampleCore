module App.Pages {

  function view() {
    return m('div', [
      m('h1', 'Welcome')
    ]);
  }

  export var home = {
    view: view
  }
}