import m from 'mithril';

import { loading } from '../components/status/loading';

let version = '';
let isLoading = false;

function getVersion() {
  return m.request({ url: 'api/sampleapi/version', data: Date.now() });
}

function oncreate() {
  isLoading = true;
  // next version of Mithril will have finally
  getVersion()
    .then(rs => version = rs as string)
    .catch(rj => version = rj as string)
    .then(() => isLoading = false)
    .catch(() => isLoading = false);
}

function view() {
  return m('div', [
    m('h2', "I'm an aboot page"), [
      m('span', `version: ${version}`),
      m(loading, { style: { visibility: (isLoading ? 'visible' : 'hidden') } } as any)
    ]
  ]);
}

export var about = {
  oncreate: oncreate,
  view: view
}
