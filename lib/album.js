/**
 * Bandcamp Album Module
 */

var exports = module.exports = function(key, ver) {

    /**
     * Module dependencies
     */

    var core = require('./core')(key);

    return {
        version: ver || core.vers['album'],
        info: info
    }

    /**
     * Retrieve Album info via ID
     *
     * @param {String} album_id Bandcamp Album ID.
     * @return {Object} An object with an array called {Array} tracks full of tracks for the album.
     */
    function info(album_id, callback, verOverride) {
        var version = verOverride || null,
            params = {
                'album_id': album_id
            };

        core.callApi('album', 'info', params, callback, version);
    }
}