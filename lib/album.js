/**
 * Bandcamp Album Module
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
     * Retrieve Album info via ID
     *
     * @param {String} album_id Bandcamp Album ID.
     * @param {Function} callback The callback to handle response
     * @param [*args] arguments Any other arguments you wish to pass along
     *      with the callback for partial application
     * @return {Object} An object with an array called {Array} tracks full of
     *      tracks for the album.
     */
    function info(album_id, callback, verOverride) {
        var version = verOverride || ver,
            params = {
                'album_id': album_id
            },
            curry = Array.prototype.slice.call(arguments, 3),
            args = ['album', 'info', params, callback, version].concat(curry);
            
        core.callApi.apply(this, args);
    }
};