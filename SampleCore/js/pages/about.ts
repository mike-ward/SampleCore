import * as mithril from 'mithril';
const m = mithril as any;

import { loading } from '../components/status/loading';

  let version = '';
  let isLoading = false;

  function getVersion() {
    return m.request({ url: 'api/sampleapi/version', data: { r: Date.now() } });
  }

  function oncreate() {
    isLoading = true;
    // next version of Mithril will have finally
    getVersion()
      .then((rs: string) => version = rs)
      .catch((rj: string) => version = rj)
      .then(() => isLoading = false)
      .catch(() => isLoading = false);
  }

  function view() {
    return m('div', [
      m('h1', "I'm an aboot page"),
      m(loading, { style: { visibility: isLoading ? 'visible' : 'hidden' } }),
      m('p', `version: ${version}`)
    ]);
  }

  export var about = {
    oncreate: oncreate,
    view: view
  }
