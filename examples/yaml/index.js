
var mdc = require('mdc');
var yaml = require('js-yaml');

var dim = require('./files/dimensions.yaml').shift();
var src = require('./files/settings.yaml').shift();

var cfg = mdc.create();

cfg.setBundle(dim, src);

console.log(cfg.get());
console.log(cfg.get('', {env: 'dev'}));
console.log(cfg.get('', {site: 'news'}));
console.log(cfg.get('', {site: 'news', env: 'dev'}));