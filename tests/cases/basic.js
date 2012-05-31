//    (The MIT License)
//
//    Copyright (c) 2012 Richard S Allinson <rsa@mountainmansoftware.com>
//
//    Permission is hereby granted, free of charge, to any person obtaining
//    a copy of this software and associated documentation files (the
//    'Software'), to deal in the Software without restriction, including
//    without limitation the rights to use, copy, modify, merge, publish,
//    distribute, sublicense, and/or sell copies of the Software, and to
//    permit persons to whom the Software is furnished to do so, subject to
//    the following conditions:
//
//    The above copyright notice and this permission notice shall be
//    included in all copies or substantial portions of the Software.
//
//    THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
//    EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
//    MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
//    IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
//    CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
//    TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
//    SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

"use strict";

var Y = require('yui').use('test');

var mdc = require('../../lib/engine');
var dim = require('../fixtures/dimensions');
var cfg = require('../fixtures/configs');

var assert = Y.Test.Assert;

var testCase = new Y.Test.Case({

    name: "mdc basic",

    'test if we can use the module': function () {

        assert.isTrue(typeof mdc.version !== 'undefined');
    },

    'test if we can use a simple config': function () {

        var config = mdc.create();

        config.set(cfg.simple);

//        Y.log(JSON.stringify(cfg.test_a,null,4));

        assert.isTrue(config.get('title') === 'Test A');
        assert.isTrue(config.get('links.home') === 'http://www.sample.com');
        assert.isTrue(config.get('links.mail') === 'http://mail.sample.com');
    },

    'test if we can use a simple config with dimensions': function () {

        var config = mdc.create(dim);

        config.set(cfg.simple);

//        Y.log(JSON.stringify(cfg.test_a,null,4));

        assert.isTrue(config.get('title') === 'Test A');
        assert.isTrue(config.get('links.home') === 'http://www.sample.com');
        assert.isTrue(config.get('links.mail') === 'http://mail.sample.com');
    },

    'test if we can use a bundle config with dimensions last': function () {

        var config = mdc.create();

        config.setBundle(cfg.bundle.concat([{'dimensions': dim}]));

//        Y.log(JSON.stringify(config.getBundle(),null,4));

        assert.isTrue(config.get('title') === 'Test A');
        assert.isTrue(config.get('links.home') === 'http://www.sample.com');
        assert.isTrue(config.get('links.mail') === 'http://mail.sample.com');
    },

    'test if we can use a bundle config with dimensions first': function () {

        var config = mdc.create();

        config.setBundle([{'dimensions': dim}].concat(cfg.bundle));

//        Y.log(JSON.stringify(config.getBundle(),null,4));

        assert.isTrue(config.get('title') === 'Test A');
        assert.isTrue(config.get('links.home') === 'http://www.sample.com');
        assert.isTrue(config.get('links.mail') === 'http://mail.sample.com');
    },

    'test if we can use a simple config with dimensions and conext device:ipad': function () {

        var config = mdc.create(),
            context;

        config.setBundle([{'dimensions': dim}].concat(cfg.bundle));

        context = {
            'device': 'ipad'
        };

        //Y.log(JSON.stringify(ycb,null,4));

        assert.isTrue(config.get('title', context) === 'Test A', config.get('title', context));
        assert.isTrue(config.get('logo', context) === 'ipad.png', config.get('logo', context));
        assert.isTrue(config.get('links.home', context) === 'http://ipad.sample.com', config.get('links.home', context));
        assert.isTrue(config.get('links.mail', context) === 'http://ipad.mail.sample.com', config.get('links.mail', context));
    },

    'test if we can use a simple config with dimensions and conext device:iphone': function () {

        var config = mdc.create(),
            context;

        config.setBundle([{'dimensions': dim}].concat(cfg.bundle));

        context = {
            'device': 'iphone'
        };

        //Y.log(JSON.stringify(ycb,null,4));

        assert.isTrue(config.get('title', context) === 'Test A', config.get('title', context));
        assert.isTrue(config.get('logo', context) === 'iphone.png', config.get('logo', context));
        assert.isTrue(config.get('links.home', context) === 'http://iphone.sample.com', config.get('links.home', context));
        assert.isTrue(config.get('links.mail', context) === 'http://iphone.mail.sample.com', config.get('links.mail', context));
    },

    'test if we can use a simple config with dimensions and conext device:iphone&lang:fr_CA': function () {

        var config = mdc.create(),
            context;

        config.setBundle([{'dimensions': dim}].concat(cfg.bundle));

        context = {
            'device': 'iphone',
            'lang': 'fr_CA'
        };

        //Y.log(JSON.stringify(ycb,null,4));

        assert.isTrue(config.get('title', context) === 'Test A', config.get('title', context));
        assert.isTrue(config.get('logo', context) === 'fr_iphone.png', config.get('logo', context));
        assert.isTrue(config.get('links.home', context) === 'http://iphone.sample.com', config.get('links.home', context));
        assert.isTrue(config.get('links.mail', context) === 'http://iphone.mail.sample.com', config.get('links.mail', context));
    },

    'test if we can use a simple config with dimensions and conext device:iphone&lang:en_US': function () {

        var config = mdc.create(),
            context;

        config.setBundle([{'dimensions': dim}].concat(cfg.bundle));

        context = {
            'device': 'iphone',
            'lang': 'en_US'
        };

        //Y.log(JSON.stringify(ycb,null,4));

        assert.isTrue(config.get('title', context) === 'Test A', config.get('title', context));
        assert.isTrue(config.get('logo', context) === 'iphone.png', config.get('logo', context));
        assert.isTrue(config.get('links.home', context) === 'http://iphone.sample.com', config.get('links.home', context));
        assert.isTrue(config.get('links.mail', context) === 'http://iphone.mail.sample.com', config.get('links.mail', context));
    },

    'test if we can use a simple config with dimensions and conext lang:en_US': function () {

        var config = mdc.create(),
            context;

        config.setBundle([{'dimensions': dim}].concat(cfg.bundle));

        context = {
            'lang': 'en_US'
        };

        //Y.log(JSON.stringify(ycb,null,4));

        assert.isTrue(config.get('title', context) === 'Test A', config.get('title', context));
        assert.isTrue(config.get('logo', context) === 'en_US.png', config.get('logo', context));
        assert.isTrue(config.get('links.home', context) === 'http://www.sample.com', config.get('links.home', context));
        assert.isTrue(config.get('links.mail', context) === 'http://mail.sample.com', config.get('links.mail', context));
    },

    'test if we can use a simple config with dimensions and conext lang:fr': function () {

        var config = mdc.create(),
            context;

        config.setBundle([{'dimensions': dim}].concat(cfg.bundle));

        context = {
            'lang': 'fr'
        };

        //Y.log(JSON.stringify(ycb,null,4));

        assert.isTrue(config.get('title', context) === 'Test A', config.get('title', context));
        assert.isTrue(config.get('logo', context) === 'fr.png', config.get('logo', context));
        assert.isTrue(config.get('links.home', context) === 'http://www.sample.com', config.get('links.home', context));
        assert.isTrue(config.get('links.mail', context) === 'http://fr.mail.sample.com', config.get('links.mail', context));
    },

    'test if we can use a simple config with dimensions and conext lang:fr&device:desktop': function () {

        var config = mdc.create(),
            context;

        config.setBundle([{'dimensions': dim}].concat(cfg.bundle));

        context = {
            'lang': 'fr',
            'device': 'desktop'
        };

        //Y.log(JSON.stringify(ycb,null,4));

        assert.isTrue(config.get('title', context) === 'Test A', config.get('title', context));
        assert.isTrue(config.get('logo', context) === 'desktop.png', config.get('logo', context));
        assert.isTrue(config.get('links.home', context) === 'http://desktop.sample.com', config.get('links.home', context));
        assert.isTrue(config.get('links.mail', context) === 'http://desktop.mail.sample.com', config.get('links.mail', context));
    }
});

Y.log('Starting');

Y.Test.Runner.add(testCase);

//run all tests
Y.Test.Runner.run();