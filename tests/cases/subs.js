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

    'test key value replace': function () {

        var config = mdc.create();

        config.set(cfg.subs);

//        Y.log(JSON.stringify(config.get(),null,4));

        assert.isTrue(config.get('key0.key3') === 'value1', config.get('key0.key3'));
    },

    'test instring value replace': function () {

        var config = mdc.create();

        config.set(cfg.subs);

//        Y.log(JSON.stringify(config.get(),null,4));

        assert.isTrue(config.get('key0.key4') === 'The value of key0.key2 is value2', config.get('key0.key4'));
    },

    'test key object value replace': function () {

        var config = mdc.create();

        config.set(cfg.subs);

//        Y.log(JSON.stringify(config.get(),null,4));

        assert.isTrue(config.get('key5.key3') === 'value1', config.get('key5.key3'));
        assert.isTrue(config.get('key5.key4') === 'The value of key0.key2 is value2', config.get('key5.key4'));
    },

    'test nested key object value replace': function () {

        var config = mdc.create();

        config.set(cfg.subs);

//        Y.log(JSON.stringify(config.get(),null,4));

        assert.isTrue(config.get('key6.key7.key8.key3') === 'value1', config.get('key6.key7.key8.key3'));
        assert.isTrue(config.get('key6.key7.key8.key4') === 'The value of key0.key2 is value2', config.get('key6.key7.key8.key4'));
    },

    'test array value insert': function () {

        var config = mdc.create();

        config.set(cfg.subs);

//        Y.log(JSON.stringify(config.get(),null,4));

        assert.isTrue(config.get('key6.key9.2') === 'The value of key0.key2 is value2', config.get('key6.key9.2'));
    },

    'test object insert fails': function () {

        var config = mdc.create();

        config.set(cfg.subs);

//        Y.log(JSON.stringify(config.get(),null,4));

        assert.isFalse(config.get('value1') === null, config.get('value1'));
    },

    'test object insert': function () {

        var config = mdc.create();

        config.set(cfg.subs);

//        Y.log(JSON.stringify(config.get(),null,4));

        assert.isTrue(config.get('key8.key1') === 'value1', config.get('key8.key1'));
        assert.isTrue(config.get('key8.key4') === 'The value of key0.key2 is value2', config.get('key8.key4'));
    },

    'test complex nested key object value replace': function () {

        var config = mdc.create();

        config.set(cfg.subs);

//        Y.log(JSON.stringify(config.get(),null,4));

        assert.isTrue(config.get('key10.key11.key1') === 'value1', config.get('key10.key11.key1'));
        assert.isTrue(config.get('key10.key11.key4') === 'The value of key0.key2 is value2', config.get('key10.key11.key4'));
    },

    'test array, array value insert': function () {

        var config = mdc.create();

        config.set(cfg.subs);

//        Y.log(JSON.stringify(config.get(),null,4));

        assert.isTrue(config.get('key11.4') === 'The value of key0.key2 is value2', config.get('key11.4'));
    }
});

Y.log('Starting');

Y.Test.Runner.add(testCase);

//run all tests
Y.Test.Runner.run();