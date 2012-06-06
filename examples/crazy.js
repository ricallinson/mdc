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
 * Dimensions to work with
 */

var cfg = require('../').create([
    {
        "env": {
            "dev": null,
            "qa": null,
            "prod": null
        },
        "device": {
            "phone": {
                "iphone": {
                    "itouch": null
                },
                "nexus": null
            },
            "desktop": {
                "small": null,
                "large": null
            },
            "tablet": {
                "ipad": null,
                "galaxy": null
            }
        },
        "lang": {
            "en": {
                "en_US": {
                    "en_CA": null
                },
                "en_GB": null
            }
        }
    }
]);

/*
 * Default values
 */

cfg.set({
    title: "Crazy World!",
    more: "Show more",
    source: "http://world.news.com/",
    show: 10
});

/*
 * Title for en_CA
 */

cfg.set({
    title: "Crazy world, eh!"
}, {
    lang: "en_CA"
});

/*
 * Title for en_GB
 */

cfg.set({
    title: "It's a crazy world out there!"
}, {
    lang: "en_GB"
});

/*
 * Source for dev
 */

cfg.set({
    source: "http://localhost/test/news/"
}, {
    env: "dev"
});

/*
 * Source for qa
 */

cfg.set({
    source: "http://qa.my-company.com/news/fixtures/"
}, {
    env: "qa"
});

/*
 * Show for phone
 */

cfg.set({
    show: 5 // because it's smaller
}, {
    device: "phone"
});

/*
 * Title for en_GB & phone
 */

cfg.set({
    title: "It's crazy!" // because it's smaller
}, {
    device: "phone",
    lang: "en_GB"
});

console.log(cfg.get(''));
console.log(cfg.get('', {env: 'dev'}));
console.log(cfg.get('', {env: 'qa', lang: 'en_GB'}));
console.log(cfg.get('', {env: 'prod', lang: 'en_GB', device: 'itouch'}));
console.log(cfg.get('', {device: 'large', lang: 'en_CA'}));