# Multi Dimensional Configuration

Simple stuff here.

    var cfg = require('mdc').create();

    cfg.set({
        title: 'Github',
        host: 'http://github.com'
    });

    cfg.get('title'); // Github

Words will be writen here.

    var cfg = require('mdc').create([
        {
            "env": {
                "dev": null,
                "prod": null
            }
        }
    ]);

    cfg.set({port: 8080}); // default
    cfg.set({port: 3000}, {env: 'dev'});
    cfg.set({port: 80}, {env: 'prod'});

    cfg.get('port'); // 8080
    cfg.get('port', {env: 'dev'}); // 3000
    cfg.get('port', {env: 'prod'}); // 80

More words will be writen here too.