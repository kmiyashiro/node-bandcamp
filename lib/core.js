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
    };
})(qs.escape);

module.exports = function(key, vers) {

    /**
     * Expose public
     */
    return {
        get: get,
        callApi: callApi,
        vers: vers
    };

    /**
     * Standard get
     *
     * @param {String} url API URL for the endpoint you are calling + params
     * @param {Function} callback Callback, called with args (error, result, resultcode)
     */

    function get(url, callback) {
        callback = callback || function() {};

        var parsedUrl = urlParser.parse(url, true),
            request,
            result = "",
            // Use any other arguments for currying/partial application
            curry = Array.prototype.slice.call(arguments, 2);

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
                    result = JSON.parse(result);
                    
                    // curry
                    var args = [null, result, res.statusCode].concat(curry);
                    
                    callback.apply(this, args);
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
     * @param {Integer} [ver] Version of the module you want to call. This is
     *   an override of defaults (latest).
     * @return {Object} Bandcamp response
     */

    function callApi(module, method, params, callback, ver) {
        if (!module || !method) {
            new Error('bandcamp.callAPI: Module and Method are required.');
            return;
        }

        var baseUrl = 'http://api.bandcamp.com',
            parsedParams = qs.stringify(params),
            curry = Array.prototype.slice.call(arguments, 5),
            fullUrl = baseUrl +
                path.join('/api', module, ver.toString(), method) +
                '?' + parsedParams + '&key=' + key,
            args = [fullUrl, callback].concat(curry);
                
        get.apply(this, args);
    }
};