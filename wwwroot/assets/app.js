/*! Copyright INDS Inc, All rights reserved */
// true if IE less than 9
if (!-[1,])
    alert('Internet Explorer 7 and 8 are not supported');
var mountPage = function (view) { return m.mount(document.getElementById('root'), view); };
var App;
(function (App) {
    App.app = {
        // language=CSS
        css: "\n      body{\n        color:#333;\n        background-color:#f9fafb;;\n        line-height:1.6;\n        margin:1em auto;\n        max-width:1200px;\n        min-width:320px;\n      }\n      view{\n        margin:1em auto;\n      }\n      .error-text{\n        color:darkred;\n      }\n      .current-user-login{\n        text-align:right;\n      }"
    };
})(App || (App = {}));
var App;
(function (App) {
    var Services;
    (function (Services) {
        function loadCss(obj) {
            var css = findAllCss(obj, []);
            addCssToHead(css.join('\n'));
        }
        function findAllCss(obj, css) {
            var keys = Object.keys(obj);
            keys.forEach(function (key) {
                var value = obj[key];
                if (value && typeof value === 'object') {
                    if (value.css)
                        css.push(value.css);
                    findAllCss(value, css);
                }
            });
            return css;
        }
        function addCssToHead(css) {
            var style = document.createElement('style');
            style.type = 'text/css';
            style.innerHTML = css;
            document.getElementsByTagName('head')[0].appendChild(style);
        }
        Services.dom = {
            loadCss: loadCss
        };
    })(Services = App.Services || (App.Services = {}));
})(App || (App = {}));
var App;
(function (App) {
    var Pages;
    (function (Pages) {
        var About;
        (function (About) {
            var version = '';
            var loading = false;
            function getVersion() {
                return m.request({ url: 'api/sample/version', data: { r: Date.now() } });
            }
            function oncreate() {
                loading = true;
                getVersion()
                    .then(function (r) { return version = r; })["catch"](function (r) { return version = r; })["finally"](function () { return loading = false; });
            }
            function view() {
                return m('div', [
                    m('h1', "I'm an aboot page"),
                    m(App.Components.loading, { style: { visibility: loading ? 'visible' : 'hidden' } }),
                    m('p', "version: " + version)
                ]);
            }
            About.page = {
                oncreate: oncreate,
                view: view
            };
        })(About = Pages.About || (Pages.About = {}));
    })(Pages = App.Pages || (App.Pages = {}));
})(App || (App = {}));
var App;
(function (App) {
    var Pages;
    (function (Pages) {
        var Home;
        (function (Home) {
            function view() {
                return m('div', [
                    m('h1', 'Welcome')
                ]);
            }
            Home.page = {
                view: view
            };
        })(Home = Pages.Home || (Pages.Home = {}));
    })(Pages = App.Pages || (App.Pages = {}));
})(App || (App = {}));
var App;
(function (App) {
    var Components;
    (function (Components) {
        function view(vnode) {
            return m('span', vnode.attrs, [
                m('img.loading-img', { src: 'assets/images/loading-rectangle.gif' }),
                m.trust('&nbsp;Loading&hellip;')
            ]);
        }
        // language=css
        var css = ".loading-img { height: 16px; width: 16px; vertical-align: middle}";
        Components.loading = {
            view: view,
            css: css
        };
    })(Components = App.Components || (App.Components = {}));
})(App || (App = {}));
var App;
(function (App) {
    var Components;
    (function (Components) {
        function view(vnode) {
            var options = vnode.attrs.options;
            return options
                ? m('.nav-bar', options.items.map(function (item) { return m('a', { href: item.link }, item.name); }))
                : null;
        }
        // language=css
        var css = "\n      .nav-bar {\n        margin: .25em auto;\n      }\n      .nav-bar a {\n        margin: 0 1em;\n        white-space: nowrap;\n        text-decoration: none;\n      }\n      .nav-bar a:hover {\n        border-bottom: solid 1px;\n      }";
        Components.navBar = {
            view: view,
            css: css
        };
    })(Components = App.Components || (App.Components = {}));
})(App || (App = {}));
var App;
(function (App) {
    var Components;
    (function (Components) {
        function view() {
            return m('.footer', [
                m('hr'),
                m('.app-footer', 'footer stuff goes here')
            ]);
        }
        // language=CSS
        var css = ".footer{margin-top:5rem;}";
        Components.pageFooter = {
            view: view,
            css: css
        };
    })(Components = App.Components || (App.Components = {}));
})(App || (App = {}));
var App;
(function (App) {
    var Components;
    (function (Components) {
        // language=CSS
        var css = ".header{clear:both;text-align:center;}";
        var navbarOptions = {
            items: [
                { name: 'Home', link: 'home' },
                { name: 'Item1', link: 'item1' },
                { name: 'Item2', link: 'item2' },
                { name: 'About', link: 'about' }
            ]
        };
        function view() {
            return m('.header', [
                m('h1', 'My Application Title'),
                m(Components.navBar, { options: navbarOptions }),
                m('hr')
            ]);
        }
        Components.pageHeader = {
            view: view,
            css: css
        };
    })(Components = App.Components || (App.Components = {}));
})(App || (App = {}));
//# sourceMappingURL=app.js.map