import * as mithril from 'mithril';
var m = mithril;
import { loading } from '../components/status/loading';
var version = '';
var isLoading = false;
function getVersion() {
    return m.request({ url: 'api/sampleapi/version', data: { r: Date.now() } });
}
function oncreate() {
    isLoading = true;
    // next version of Mithril will have finally
    getVersion()
        .then(function (rs) { return version = rs; })
        .catch(function (rj) { return version = rj; })
        .then(function () { return isLoading = false; })
        .catch(function () { return isLoading = false; });
}
function view() {
    return m('div', [
        m('h1', "I'm an aboot page"),
        m(loading, { style: { visibility: isLoading ? 'visible' : 'hidden' } }),
        m('p', "version: " + version)
    ]);
}
export var about = {
    oncreate: oncreate,
    view: view
};
