module App.Pages.Home {

  function view() {
    return m('div', [
      m('h1', 'Welcome')
    ]);
  }

  export var page = {
    view: view
  }
}