/// <amd-dependency path="mitril-query" />
var mq = require("mithril-query");
import { pageHeader } from './page-header';
test('page-header should contain menu', function () {
    var navbarOptions = {
        items: [
            { name: 'Home', link: 'home' },
            { name: 'Item1', link: 'item1' },
            { name: 'Item2', link: 'item2' },
            { name: 'About', link: 'about' }
        ]
    };
    var out = mq(pageHeader, { options: navbarOptions });
    out.should.have('.header');
    out.should.have('.nav-bar');
    out.should.have(4, 'a');
});
