
var mdc = require('mdc');

var dim = require('./files/dimensions.json');
var src = require('./files/settings.json');

var cfg = mdc.create();

cfg.setBundle(dim, src);

console.log(cfg.get());
console.log(cfg.get('', {env: 'dev'}));
console.log(cfg.get('', {site: 'news'}));
console.log(cfg.get('', {site: 'news', env: 'dev'}));