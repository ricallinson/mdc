
exports.simple = {
    "title": "Test A",
    "data": "http://service.sample.com",
    "logo": "sample.png",
    "links": {
        "home": "http://www.sample.com",
        "mail": "http://mail.sample.com"
    }
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