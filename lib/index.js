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

// Source https://github.com/yahoo/mojito/blob/develop/source/lib/libs/ycb.js

"use strict";

/*
 * 
 */

var avro = require('avrojs');

/*
 * 
 */

var DEFAULT = '*',
    SEPARATOR = '/',
    SUBMATCH = /\$\$[a-zA-Z0-9.-_]*\$\$/,
    ConfigStore;

/*
 * Converts an object to a ConfigStore settings array.
 *
 * {key: "val", foo: "bar"}
 *
 * to;
 *
 * ["key:val", "foo:bar"]
 */

function contextToSettingsArray(context) {

    var key,
        settingsArray = [];

    for (key in context) {
        if (context.hasOwnProperty(key)) {
            settingsArray.push(key + ':' + context[key]);
        }
    }

    if (settingsArray.length === 0) {
        settingsArray.push('default');
    }

    settingsArray.sort();

    return settingsArray;
}

/*
 * Gets the matching settings group for the given context object or
 * adds a new group and returns it.
 */

function getSettingsGroupId(bundle, context) {

    var num,
        group,
        settingsArray = contextToSettingsArray(context);

    for (num in bundle) {
        if (bundle.hasOwnProperty(num)) {
            group = bundle[num];
            if (group.settings && JSON.stringify(group.settings) === JSON.stringify(settingsArray)) {
                return num;
            }
        }
    }

    return bundle.push({
        settings: settingsArray
    }) - 1;
}

/*
 * @private
 * @method extract
 */

function extract(bag, key, def) {

    if (!key) {
        return bag || {};
    }

    var keys = key.split('.'),
        cur = bag,
        i;

    for (i = 0; i < keys.length; i = i + 1) {
        if (cur[keys[i]]) {
            cur = cur[keys[i]];
        } else {
            return def;
        }
    }

    return cur;
}

/*
 * This is a first pass at hairball of a funciton.
 *
 * @private
 * @method applySubstitutions
 * @param {object} config
 * @param {object} base
 * @param {object} parent
 * @return void
 */

function applySubstitutions(config, base, parent) {

    var key,
        sub,
        find,
        item;

    if (!base) {
        base = config;
    }

    if (!parent) {
        parent = {
            ref: config,
            key: null
        };
    }

    for (key in config) {
        if (config.hasOwnProperty(key)) {
            // If the value is an "Object" or an "Array" drill into it
            if (config[key] && (config[key].constructor === Object || config[key].constructor === Array)) {
                // The whole {ref: config, key: key} is needed only when replacing "keys"
                applySubstitutions(config[key], base, {
                    ref: config,
                    key: key
                });
            } else {
                // Test if the key is a "substitution" key
                if (SUBMATCH.test(key)) {
                    // We have a matching so lets do some work
                    sub = SUBMATCH.exec(key);
                    // Is it the whole key or just something odd
                    if (sub[0] === key) {
                        // Pull out he key to "find"
                        find = extract(base, sub[0].slice(2, -2), null);

                        if (find.constructor === Object) {
                            // Remove the "substitution" key
                            delete config[key];
                            // Add the keys founds
                            // This should be inline at the point where the "substitution" key was.
                            // Currently they will be added out of order on the end of the map.
                            for (item in find) {
                                if (find.hasOwnProperty(item)) {
                                    if (!parent.ref[parent.key]) {
                                        parent.ref[item] = find[item];
                                    } else {
                                        parent.ref[parent.key][item] = find[item];
                                    }
                                }
                            }
                        } else {
                            config[key] = 'error';
                        }
                    }
                // Test if the value is a "substitution" value
                } else if (SUBMATCH.test(config[key])) {
                    // We have a match so lets use it
                    sub = SUBMATCH.exec(config[key]);
                    // Pull out he key to "find"
                    find = sub[0].slice(2, -2);
                    // First see if it is the whole value
                    if (sub[0] === config[key]) {
                        // Replace the whole value with the value found by the sub string
                        find = extract(base, find, null);
                        // If we have an array in an array do it "special like"
                        if (find.constructor === Array && config.constructor === Array) {
                            // This has to be done on the parent or the referance is lost
                            // The whole {ref: config, key: key} is needed only when replacing "keys"
                            parent.ref[parent.key] = config.slice(0, parseInt(key, 10))
                                .concat(find)
                                    .concat(config.slice(parseInt(key, 10) + 1));
                        } else {
                            config[key] = find;
                        }
                    } else { // If not it's just part of the whole value
                        config[key] = config[key].replace(sub[0], extract(base, find, null));
                    }
                }
            }
        }
    }
}

/*
 * @private
 * @method flattenDimension
 * @param {string} prefix
 * @param {object} dimension A structured object
 * @param {string} build
 * @result {object} k/v map
 */

function flattenDimension(prefix, dimension, build) {

    var key,
        newPrefix,
        nextDimension;

    if (!build) {
        build = {};
    }

    if (typeof dimension === 'object') {

        for (key in dimension) {
            if (dimension.hasOwnProperty(key)) {
                nextDimension = dimension[key];
                newPrefix = (prefix ? prefix + SEPARATOR + key : key);
                build[newPrefix] = key;

                if (typeof nextDimension === 'object') {
                    build = flattenDimension(newPrefix, nextDimension, build);
                }
            }
        }
    }

    return build;
}

/*
 * @private
 * @method flattenDimensions
 * @param {object} dimensions A structured object
 * @result {object} k/v map
 */

function flattenDimensions(dimensions) {

    var dimensionPaths = {},
        pos,
        name;

    for (pos = 0; pos < dimensions.length; pos = pos + 1) {
        for (name in dimensions[pos]) {
            if (dimensions[pos].hasOwnProperty(name)) {
                dimensionPaths[name] = flattenDimension('', dimensions[pos][name]);
            }
        }
    }//console.log(JSON.stringify(dimensionPaths,null,4));

    return dimensionPaths;
}

/*
 * @private
 * @method reverseList
 */

function reverseList(from) {

    var to = [],
        pos = from.length;

    while (pos) {
        pos = pos - 1;
        to.push(from[pos]);
    }

    return to;
}

/*
 * @private
 * @method makeOrderedLookupList
 * @param {object} dimensions A structured object
 * @param {object} context Key/Value list
 * @result {object} list of lists
 */

function makeOrderedLookupList(dimensions, context) {

    var dimensionPaths = flattenDimensions(dimensions),
        pos,
        name,
        path,
        chains = {};

    for (pos = 0; pos < dimensions.length; pos = pos + 1) {
        for (name in dimensions[pos]) {
            if (dimensions[pos].hasOwnProperty(name)) {
                for (path in dimensionPaths[name]) {
                    if (dimensionPaths[name].hasOwnProperty(path) && dimensionPaths[name][path] === context[name]) {
                        chains[name] = path;
                    }
                }

                if (chains[name]) {
                    // Convert to an ordered list
                    chains[name] = reverseList(chains[name].split(SEPARATOR)).concat(DEFAULT);
                } else {
                    // If there was no match set to default
                    chains[name] = [DEFAULT];
                }
            }
        }
    }

    return chains;
}

/*
 * @private
 * @method getLookupPath
 * @param {object} dimensions A structured object
 * @param {object} context Key/Value list
 * @result {string}
 */

function getLookupPath(dimensions, context) {

    var lookupList = makeOrderedLookupList(dimensions, context),
        name,
        list,
        lookup = {},
        item,
        path = [];

    for (name in lookupList) {
        if (lookupList.hasOwnProperty(name)) {
            if (context[name]) {
                for (list = 0; list < lookupList[name].length; list = list + 1) {
                    if (lookupList[name][list] === context[name]) {
                        lookup[name] = lookupList[name][list];
                    }
                }
            }

            // If there was no match set to default
            if (!lookup[name]) {
                lookup[name] = DEFAULT;
            }
        }
    }

    for (item in lookup) {
        if (lookup.hasOwnProperty(item)) {
            path.push(lookup[item]);
        }
    }

    return path.join(SEPARATOR);
}

/*
 * @private
 * @method processRawBundle
 * @param {object} bundle
 * @return {object}
 */

function processRawBundle(bundle) {

    var pos,
        settings = {},
        dimensions = {},
        schema = {},
        part,
        kv,
        context,
        key;

    /*
     * Before we can process the bundle we need the dimensions first.
     * As we are here we'll grab the schema if one is there
     */
    for (pos = 0; pos < bundle.length; pos = pos + 1) {
        if (bundle[pos].dimensions) {
            dimensions = bundle[pos].dimensions;
        } else if (bundle[pos].schema) {
            schema = bundle[pos].schema;
        }
    }

    /*
     * Now we can go back over the bundle and grab all the settings
     */
    for (pos = 0; pos < bundle.length; pos = pos + 1) {
        if (bundle[pos].settings) {
            context = {};

            for (part = 0; part < bundle[pos].settings.length; part = part + 1) {
                kv = bundle[pos].settings[part].split(':');
                context[kv[0]] = kv[1];
            }

            // Remove the settings key now we are done with it
            delete bundle[pos].settings;

            // Build the full context path
            key = getLookupPath(dimensions, context);

            // Add the section to the settings list with it's full key
            if (!settings[key]) {
                settings[key] = bundle[pos];
            } else {
                throw new Error("The settings group '" + JSON.stringify(context) + "' has already been added.");
            }
        }
    }

    return {
        dimensions: dimensions,
        settings: settings,
        schema: schema
    };
}

/*
 * @private
 * @method objectToList
 */

function objectToList(from) {

    var to = [],
        pos = 0,
        key = '';

    for (key in from) {
        if (from.hasOwnProperty(key)) {
            to[pos] = from[key];
            pos = pos + 1;
        }
    }

    return to;
}

/*
 * @private
 * @method getLookupPaths
 * @param {object} dimensions A structured object
 * @param {object} context Key/Value list
 * @result {string}
 */

function getLookupPaths(dimensions, context) {

    var lookupList = objectToList(makeOrderedLookupList(dimensions, context)),
        path = [],
        paths = [],
        pos,
        current = lookupList.length - 1,
        combination = [];

    // This is our combination that we will tubmle over
    for (pos = 0; pos < lookupList.length; pos = pos + 1) {
        combination.push({
            current: 0,
            total: lookupList[pos].length - 1
        });
    }

    function tumble(combination, location) {

        // If the location is not found return
        if (!combination[location]) {
            return false;
        }

        // Move along to the next item
        combination[location].current = combination[location].current + 1;

        // If the next item is not found move to the prev location
        if (combination[location].current > combination[location].total) {

            combination[location].current = 0;

            return tumble(combination, location - 1);
        }

        return true;
    }

    do {
        path = [];

        for (pos = 0; pos < lookupList.length; pos = pos + 1) {
            path.push(lookupList[pos][combination[pos].current]);
        }

        paths.push(path.join(SEPARATOR));
    } while (tumble(combination, current));

    return paths.reverse();
}

/*
 * @private
 * @method scalarCopy
 * @param {object} obj
 * @return {object}
 */

function scalarCopy(obj) {
    return JSON.parse(JSON.stringify(obj));
}

/*
 * @private
 * @method objectMerge
 * @return {object}
 */

function objectMerge(from, to) {
    var key;
    for (key in from) {
        if (from.hasOwnProperty(key)) {
            try {
                // Property in destination object set; update its value.
                if (from[key].constructor === Object) {
                    to[key] = objectMerge(from[key], to[key]);
                } else {
                    to[key] = from[key];
                }
            } catch (err) {
                // Property in destination object not set; create it and set its value.
                to[key] = from[key];
            }
        }
    }
    return to;
}

/*
 * Processes an Object representing a ConfigStore bundle.
 *
 * @method parseBundleObject
 * @param {object} bundle
 * @param {object} context
 * @param {boolean} validate
 * @param {boolean} debug
 * @return {object}
 */

function parseBundleObject(bundle, context, validate, debug) {

    var rawConfig,
        lookupPaths,
        path,
        config = {};

    if (!context) {
        context = {};
    }

    /*
     * Important: Here we make a copy of the bundle so no to alter the source
     */
    rawConfig = processRawBundle(scalarCopy(bundle));
    lookupPaths = getLookupPaths(rawConfig.dimensions, context);

    if (debug) {
        console.log(JSON.stringify(context, null, 4));
        console.log(JSON.stringify(rawConfig, null, 4));
        console.log(JSON.stringify(lookupPaths, null, 4));
    }

    // Now we simply merge each macting settings section we find into the config
    for (path = 0; path < lookupPaths.length; path = path + 1) {
        if (rawConfig.settings[lookupPaths[path]]) {
            if (debug) {
                console.log('LOOKUP PATH: "' + lookupPaths[path] + '"');
                console.log('VALUES FOUND: ' + JSON.stringify(rawConfig.settings[lookupPaths[path]], null, 4));
            }
            config = objectMerge(rawConfig.settings[lookupPaths[path]], config);
        }
    }

    applySubstitutions(config);

    if (validate) {

        if (!avro.validate(rawConfig.schema, config)) {
            throw new Error('The config object could not be validated by the provided schema.');
        }

//        console.log();
//
//        console.log('The ConfigStore option "validate" is not implemented yet.');
    }

    return config;
}

/*
 * The object returned to any callers of the engine.
 *
 * @public
 * @param {array} dimensions
 */

ConfigStore = function (dimensions) {

    var bundle,
        cache = {};

    if (!dimensions) {
        dimensions = [];
    }

    /*
     * Create the main bundle using the given "dimensions"
     */

    bundle = [{
        dimensions: dimensions
    }];

    /*
     * @public
     * @method get
     * @param {string} key
     * @param {object} context
     * @return {object}
     */

    this.get = function (key, context) {

        var cacheKey;

        if (!context) {
            context = {};
        }

        cacheKey = JSON.stringify(context);

        if (!cache[cacheKey]) {
            cache[cacheKey] = parseBundleObject(bundle, context, true);
        }

        return extract(cache[cacheKey], key);
    };

    /*
     * @public
     * @method set
     * @param {object} object
     * @param {object} context
     * @param {object} schema
     */

    this.set = function (object, context, schema) {

        var groupId;

        if (!context) {
            context = {};
        }

        groupId = getSettingsGroupId(bundle, context);

        bundle[groupId] = objectMerge(object, bundle[groupId]);

        cache = {};
    };

    /*
     * @public
     * @method getBundle
     * @return {object}
     */

    this.getBundle = function () {
        return bundle;
    };

    /*
     * This method will set the bundle to the value of "bundleObj" replacing
     * any data already in the instance.
     *
     * @public
     * @method setBundle
     * @param {object} bundleObj
     * @return {object}
     */

    this.setBundle = function (bundleObj) {
        bundle = bundleObj;
    };
};

/*
 * The version of the engine
 */

exports.version = '0.0.1';

/*
 * The only exposed function of this module.
 *
 * @public
 * @method create
 * @param {array} dimensions
 * @return ConfigStore
 */

exports.create = function (dimensions) {
    return new ConfigStore(dimensions);
};