/**
 * Bandcamp Band Module
 */

var exports = module.exports = function(key, ver) {

    /**
     * Module dependencies
     */

    var core = require('./core')(key);

    return {
        version: ver,
        search: search,
        discography: discography,
        info: info
    };

    /**
     * Conducts a search for the Band module.
     *
     * @param {String} name Name of the band, case-insensitive. Multiples, comma delimited, max 12.
     * @param {Function} callback The callback to handle response
     * @param [*args] arguments Any other arguments you wish to pass along
     *      with the callback for partial application
     * @return {Object} An object with an array called {Array} results full of bands, or an error:true with a message. If you pass multiple names comma delimited, it will return a hash with band info organized by name.
     */

    function search(name, callback, verOverride) {
        var version = verOverride || ver,
            params = {
                'name': name
            },
            curry = Array.prototype.slice.call(arguments, 3),
            args = ['band', 'search', params, callback,
                version].concat(curry);

        core.callApi.apply(this, args);
    }

    /**
     * Returns the discography of a band(s)
     *
     * @param {String} band_id The ID of the band. Multiples can be passed, comma delimited, max 12.
     * @param {Function} callback The callback to handle response
     * @param [*args] arguments Any other arguments you wish to pass along
     *      with the callback for partial application
     * @return {Object} An object with an array called {Array} results full of albums or tracks, or an error:true with a message. If you pass multiple band_id's comma delimited, it will return a hash with discography info organized by band_id.
     */

    function discography(band_id, callback, verOverride) {
        var version = verOverride || ver,
            params = {
                'band_id': band_id
            },
            curry = Array.prototype.slice.call(arguments, 3),
            args = ['band', 'discography', params, callback,
                version].concat(curry);

        core.callApi.apply(this, args);
    }

    /**
     * Returns info on a band(s)
     *
     * @param {String} band_id The ID of the band. Multiples can be passed, comma delimited, max 12.
     * @param {Function} callback The callback to handle response
     * @param [*args] arguments Any other arguments you wish to pass along
     *      with the callback for partial application
     * @return {Object} An object with an array called {Array} results full of albums or tracks, or an error:true with a message. If you pass multiple band_id's comma delimited, it will return a hash with discography info organized by band_id.
     */

    function info(band_id, callback, verOverride) {
        var version = verOverride || ver,
            params = {
                'band_id': band_id
            },
            curry = Array.prototype.slice.call(arguments, 3),
            args = ['band', 'info', params, callback, version].concat(curry);

        core.callApi.apply(this, args);
    }
};