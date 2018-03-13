/// <amd-dependency path="mitril-query" />
declare var require: (moduleId: string) => any;
var mq = require("mithril-query");
import { pageHeader } from './page-header';

test('page-header should contain menu', () => {
  const navbarOptions = {
    items: [
      { name: 'Home', link: 'home' },
      { name: 'Item1', link: 'item1' },
      { name: 'Item2', link: 'item2' },
      { name: 'About', link: 'about' }
    ]
  }

  var out = mq(pageHeader, { options: navbarOptions });
  out.should.have('.header');
  out.should.have('.nav-bar');
  out.should.have(5, 'a');
})