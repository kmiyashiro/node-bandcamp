/**
 * Core API functionality for all modules
 */

/**
 * Module dependencies
 */

var http = require('http'),
    urlParser = require('url'),
    path = require('path'),
    qs = require('querystring'),
    i = require('util').inspect;

/**
 * Override qs.escape to allow commas, which Bandcamp uses for batch requests
 */

qs.escape = (function(orig) {
    return function(s) {
        if (typeof s == 'string') {
            return s.split(",").map(orig).join(",");
        } else {
            return s;
        }
    }
})(qs.escape);

module.exports = function(key, vers) {

    /**
     * Versioning of each module in the Bandcamp API
     * Override by passing a versions object.
     */

    var defaultVers = {
        band: 3,
        album: 2,
        track: 1,
        url: 1
    }

    // Overwrite defaults if versions object was passed
    var vers = vers ? union(defaultVers, vers) : defaultVers;

    /**
     * Expose public
     */
    return {
        get: get,
        callApi: callApi,
        vers: vers,
        union: union
    }

    /**
     * Union utility
     * Thanks TJ!
     */

    function union(a, b){
        if (a && b) {
            var keys = Object.keys(b),
                len = keys.length,
                key;

            for (var i = 0; i < len; ++i) {
                key = keys[i];
                if (!a.hasOwnProperty(key)) {
                    a[key] = b[key];
                }
            }
        }
        return a;
    }

    /**
     * Standard get
     */

    function get(url, callback) {
        callback = callback || function() {};

        var parsedUrl = urlParser.parse(url, true),
            request,
            result = "";

        if (parsedUrl.query === undefined) {
            parsedUrl.query = {};
        }

        var path = parsedUrl.pathname + "?" + qs.stringify(parsedUrl.query);

        request = http.request({
                "host" : parsedUrl.hostname,
                "port" : parsedUrl.port,
                "path" : path,
                "method" : "GET",
                "headers" : {
                    "Content-Length": 0
                }
            },
            function(res) {
                res.on("data", function(chunk) {
                    result += chunk;
                });

                res.on("end", function() {
                    callback(null, result, res.statusCode);
                });
            });

        request.on("error", function(err) {
            callback(err);
        });

        request.end();
    }

    /**
     * Call Bandcamp API
     *
     * @param {String} module The Bandcamp API module
     * @param {String} method Module method
     * @param {Object} parameters Parameters to pass to the method
     * @param {Function} callback Callback to handle Bandcamp response
     * @see http://bandcamp.com/developer
     * @param {Integer} [ver] Version of the module you want to call. This is an override of defaults (latest).
     * @return {Object} Bandcamp response
     */

    function callApi(module, method, params, callback, ver) {
        if (!module || !method) {
            new Error('bandcamp.callAPI: Module and Method are required.');
            return;
        }

        var version = ver ? ver : vers[module],
            baseUrl = 'http://api.bandcamp.com',
            parsedParams = qs.stringify(params).replace(/\%2c/ig, ','),
            fullUrl = baseUrl + path.join('/api', module, version.toString(), method) + '?' + parsedParams + '&key=' + key;

        get(fullUrl, callback);
    }
}