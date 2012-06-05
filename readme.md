# Multi Dimensional Configuration

Words will be writen here.

    var config = require('mdc').create([
        {
            "env": {
                "dev": null,
                "prod": null
            }
        }
    ]);

    config.set({port: 8080}); // default
    config.set({port: 3000}, {env: 'dev'});
    config.set({port: 80}, {env: 'prod'});

    console.log(config.get('port')); // default
    console.log(config.get('port', {env: 'dev'}));
    console.log(config.get('port', {env: 'prod'}));

More words will be writen here too.