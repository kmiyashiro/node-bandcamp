/**
 * Bandcamp Track Module
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
     * Retrieve Track info via ID
     *
     * @param {String} track_id Bandcamp Track ID.
     * @param {Function} callback The callback to handle response
     * @param [*args] arguments Any other arguments you wish to pass along
     *      with the callback for partial application
     * @param {Number} [verOverride] Version override, only use to override API ver.
     * @return {Object} An object with information about the track.
     */

    function info(track_id, callback, verOverride) {
        var version = verOverride || ver,
            params = {
                'track_id': track_id
            },
            curry = Array.prototype.slice.call(arguments, 3),
            args = ['track', 'info', params, callback, version].concat(curry);

        core.callApi.apply(this, args);
    }
};