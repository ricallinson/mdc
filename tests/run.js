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

/*
 * Module dependencies.
 */

var fs = require('fs'),
    basename = require('path').basename,
    Y = require('yui').use('test');

/*
 * All the test cases
 */

var cases = [];

/*
 * Make sure we fail when we fail.
 */

process.on("exit", function(){
    var results = Y.Test.Runner.getResults();
    if (results && results.failed){
        process.exit(1);
    }
});

/**
 * Auto-load all the cases.
 */

fs.readdirSync(__dirname + '/cases').forEach(function (filename) {

    if (!/\.js$/.test(filename)) {
        return;
    }

    var name = basename(filename, '.js');

    /*
     * We store the name of the test-case so it can be filtered later.
     */
    cases.push({
        name: name,
        test: require('./cases/' + name)
    });

});

/*
 * Attach all the tests we want to run to the runner.
 */

cases.forEach(function (testCase) {
    Y.Test.Runner.add(testCase.test);
});

/*
 * run all tests
 */

Y.Test.Runner.run();
