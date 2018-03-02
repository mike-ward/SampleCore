module App.Pages {

  let version = '';
  let loading = false;

  function getVersion() {
    return m.request({ url: 'api/sampleapi/version', data: { r: Date.now() } });
  }

  function oncreate() {
    loading = true;
    // next version of Mithril will have finally
    getVersion()
      .then((rs: string) => version = rs)
      .catch((rj: string) => version = rj)
      .then(() => loading = false)
      .catch(() => loading = false);
  }

  function view() {
    return m('div', [
      m('h1', "I'm an aboot page"),
      m(Components.loading, { style: { visibility: loading ? 'visible' : 'hidden' } }),
      m('p', `version: ${version}`)
    ]);
  }

  export var about = {
    oncreate: oncreate,
    view: view
  }
}
