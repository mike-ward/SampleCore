﻿/// <amd-dependency path="mitril-query" />
declare var require: (moduleId: string) => any;
var mq = require("mithril-query");
import { navBar } from './nav-bar';

test('nav-bar should contain menu', () => {
  const navbarOptions = {
    items: [
      { name: 'Home', link: 'home' },
      { name: 'Item1', link: 'item1' },
      { name: 'Item2', link: 'item2' },
      { name: 'About', link: 'about' }
    ]
  }

  var out = mq({navBar}.navBar, {options: navbarOptions});
  out.should.have('.nav-bar');
  out.should.have(4, 'a');
})