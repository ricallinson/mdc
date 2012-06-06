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

exports.simple = {
    "title": "Test A",
    "data": "http://service.sample.com",
    "logo": "sample.png",
    "links": {
        "home": "http://www.sample.com",
        "mail": "http://mail.sample.com"
    }
};

exports.simple_schema_good = {
    "type": "record",
    "fields": [
        { "name": "title", "type": "string" },
        { "name": "data", "type": "string" },
        { "name": "logo", "type": "string" },
        {
            "name": "links",
            "type": {
                "type": "record",
                "fields": [
                    { "name": "home", "type": "string" },
                    { "name": "mail", "type": "string" }
                ]
            }
        }
    ]
};

exports.simple_schema_bad = {
    "type": "record",
    "fields": [
        { "name": "title", "type": "string" },
        { "name": "data", "type": "string" },
        { "name": "logo", "type": "string" },
        {
            "name": "links",
            "type": {
                "type": "record",
                "fields": [
                    { "name": "homs", "type": "string" }, // <- the error is here
                    { "name": "mail", "type": "string" }
                ]
            }
        }
    ]
};

exports.bundle = [
    {
        "settings": ["default"],

        "title": "Test A",
        "data": "http://service.sample.com",
        "logo": "sample.png",
        "links": {
            "home": "http://www.sample.com",
            "mail": "http://mail.sample.com"
        }
    },
    {
        "settings": ["device:iphone"],

        "logo": "iphone.png",
        "links": {
            "home": "http://iphone.sample.com",
            "mail": "http://iphone.mail.sample.com"
        }
    },
    {
        "settings": ["device:ipad"],

        "logo": "ipad.png",
        "links": {
            "home": "http://ipad.sample.com",
            "mail": "http://ipad.mail.sample.com"
        }
    },
    {
        "settings": ["lang:fr"],

        "logo": "fr.png",
        "links": {
            "mail": "http://fr.mail.sample.com"
        }
    },
    {
        "settings": ["device:desktop"],

        "logo": "desktop.png",
        "links": {
            "home": "http://desktop.sample.com",
            "mail": "http://desktop.mail.sample.com"
        }
    },
    {
        "settings": ["lang:en_US"],

        "logo": "en_US.png"
    },
    {
        "settings": ["lang:en", "device:ipad"],

        "logo": "en_ipad.png"
    },
    {
        "settings": ["lang:fr", "device:iphone"],

        "logo": "fr_iphone.png"
    },
    {
        "settings": ["lang:fr_CA", "device:desktop"],

        "logo": "fr_CA_desktop.png"
    }
];

exports.subs = {
    "key0": {
        "key1": "value1",
        "key2": "value2",
        "key3": "$$key0.key1$$",
        "key4": "The value of key0.key2 is $$key0.key2$$"
    },
    "key5": "$$key0$$",
    "key6": {
        "key7": {
            "key8": "$$key5$$"
        },
        "key9": [
            1,
            2,
            "$$key0.key4$$",
            3,
            4
        ]
    },
    "$$key0.key1$$": null,
    "$$key6.key7$$": null,
    "key10": {
        "key11": {
            "$$key5$$": null
        }
    },
    "key11": [
        "a",
        "b",
        "$$key6.key9$$",
        "c",
        "d"
    ]
};