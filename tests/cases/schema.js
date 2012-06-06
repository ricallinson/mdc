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

var mdc = require('../../');
var dim = require('../fixtures/dimensions');
var cfg = require('../fixtures/configs');

var assert = Y.Test.Assert;

var testCase = new Y.Test.Case({

    name: "mdc subs",

    _should: {
        error: {
            'test simple schema fail': true
        }
    },
    
    'test simple schema success': function () {

        var config = mdc.create();

        config.setBundle([{'dimensions': dim}]
              .concat([{'schema': cfg.simple_schema_good}])
              .concat(cfg.bundle));

//        Y.log(JSON.stringify(config.get(),null,4));

        assert.isTrue(config.get('logo') === 'sample.png', config.get('logo'));
    },

    'test simple schema fail': function () {

        var config = mdc.create();

        config.setBundle([{'dimensions': dim}]
              .concat([{'schema': cfg.simple_schema_bad}])
              .concat(cfg.bundle));

//        Y.log(JSON.stringify(config.get(),null,4));

        assert.isTrue(config.get('logo') === 'sample.png', config.get('logo'));
    }
});

Y.log('Starting');

Y.Test.Runner.add(testCase);

//run all tests
Y.Test.Runner.run();