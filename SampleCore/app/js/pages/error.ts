import * as m from 'mithril';

function view() {
  return m('div', [
    m('h2', 'Oops!, I goof')
  ]);
}

export var error = {
  view: view
}