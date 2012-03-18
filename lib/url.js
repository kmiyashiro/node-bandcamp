/**
 * Bandcamp URL Module
 */

var exports = module.exports = function(key, ver) {

    /**
     * Module dependencies
     */

    var core = require('./core')(key);

    return {
        version: ver,
        info: info
    };

    /**
     * Retrieve Band/Album/Track ID from a Bandcamp URL
     *
     * @param {String} url Bandcamp Band/Album/Track URL, http:// is optional.
     * @param {Function} callback The callback to handle response
     * @return {Object} An object with a single value for the band/album/track id. Album and Track URLs will return band_id too.
     */

    function info(url, callback, verOverride) {
        var version = verOverride || ver,
            params = {
                'url': url
            },
            curry = Array.prototype.slice.call(arguments, 3),
            args = ['url', 'info', params, callback, version].concat(curry);

        core.callApi.apply(this, args);
    }
};