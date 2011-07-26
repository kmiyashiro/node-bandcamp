/**
 * Bandcamp Track Module
 */

var exports = module.exports = function(key, ver) {

    /**
     * Module dependencies
     */

    var core = require('./core')(key);

    return {
        version: ver || core.vers['track'],
        info: info
    }

    /**
     * Retrieve Track info via ID
     *
     * @param {String} track_id Bandcamp Track ID.
     * @param {Function} callback The callback to handle response
     * @param {Number} [verOverride] Version override, only use to override API ver.
     * @return {Object} An object with information about the track.
     */

    function info(track_id, callback, verOverride) {
        var version = verOverride || null,
            params = {
                'track_id': track_id
            };

        core.callApi('track', 'info', params, callback, version);
    }
}