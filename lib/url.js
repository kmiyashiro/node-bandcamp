/**
 * Bandcamp URL Module
 */

var exports = module.exports = function(key, ver) {

    /**
     * Module dependencies
     */

    var core = require('./core')(key);

    return {
        version: ver || core.vers['url'],
        info: info
    }

    /**
     * Retrieve Band/Album/Track ID from a Bandcamp URL
     *
     * @param {String} url Bandcamp Band/Album/Track URL, http:// is optional.
     * @return {Object} An object with a single value for the band/album/track id. Album and Track URLs will return band_id too.
     */
    function info(url, callback, verOverride) {
        var version = verOverride || null,
            params = {
                'url': url
            };

        core.callApi('url', 'info', params, callback, version);
    }
}