var fs = require('fs');
var m = require('mithril');
eval(fs.readFileSync('../typescript-output.js') + '');
