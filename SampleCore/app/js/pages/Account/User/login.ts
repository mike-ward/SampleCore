import * as m from 'mithril';

function view() {
  return m('view', [
    m('div', [
      m('h2', 'Login'),
      m('h2.error-text', ''),

      m(`form.pure-form.pure-form-stacked[method="post"])`, [
        m('div.pure-control-group', [
          m('label[for="email"]', 'Email'),
          m('input[autofocus="autofocus"][id="email"][name="email"][required=""][type="email"]')
        ]),

        m('div.pure-control-group', [
          m('label[for="password"]', 'Password'),
          m('input[id="password"][name="password"][required=""][type="password"]')
        ]),

        m('div.pure-control-group[style=margin-top:1em]', [
          m('button.pure-button.pure-button-primary[id="submit"][type="submit"]', 'Log In')
        ]),

        m(`input[name="__RequestVerificationToken"][type="hidden"][value="${(window as any).antiforgeryToken}"]`)
      ])
    ])
  ]);
}

export var login = {
  view: view
}