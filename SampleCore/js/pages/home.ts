module App.Pages.Home {

  function view() {
    return m('home', [
      m('h1', 'Welcome')
    ]);
  }

  export var page = {
    view: view
  }
}