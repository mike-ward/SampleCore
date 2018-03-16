import * as m from 'mithril';
import { formVerificationToken } from '../../../components/page/asp-net-verification-token';

let errorMessage = '';

function view() {
  return m('div',
    [
      m('h2', 'Add User'),
      m('h2.error-text', errorMessage),
      m('form.pure-form.pure-form-stacked[method="POST"])',
        [
          m('div.pure-control-group',
            [
              m('label[for="name"]', 'Email'),
              m('input[autofocus="autofocus"][id="name"][name="email"][type="email"][required]')
            ]),
          m('div.pure-control-group',
            [
              m('label[for="password"]', 'Password'),
              m('input[id="password"][name="password"][type="password"][required]')
            ]),
          m('div.pure-control-group', { 'style': { 'margin-top': '1em' } },
            [
              m('button.pure-button.pure-button-primary[id="submit"][type="submit"]', 'Add')
            ]),
          m(formVerificationToken)
        ])
    ]);
}

export const adminAddUser = {
  view: view
}