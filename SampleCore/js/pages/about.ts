module App.Pages.About {

  let version = '';
  let loading = false;

  function getVersion() {
    return m.request({ url: 'api/sample/version', data: { r: Date.now() } });
  }

  function oncreate() {
    loading = true;
    getVersion()
      .then((r: string) => {
        version = r;
        loading = false;
      })
      .catch((r: string) => {
        version = r;
        loading = false;
      });
  }

  function view() {
    return m('div', [
      m('h1', "I'm an aboot page"),
      m(Components.loading, { style: { visibility: loading ? 'visible' : 'hidden' } }),
      m('p', `version: ${version}`)
    ]);
  }

  export var page = {
    oncreate: oncreate,
    view: view
  }
}
