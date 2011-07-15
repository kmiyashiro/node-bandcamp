/**
 * Bandcamp Band Module
 */

var exports = module.exports = function(key, ver) {

    /**
     * Module dependencies
     */

    var core = require('./core')(key);

    return {
        version: ver || core.vers['band'],
        search: search,
        discography: discography
    }

    /**
     * Conducts a search for the Band module.
     *
     * @param {String} name Name of the band, case-insensitive. Multiples, comma delimited, max 12.
     * @return {Object} An obect with an array called {Array} results full of bands, or an error:true with a message.
     */
    function search(name, callback, verOverride) {
        var version = verOverride || null,
            params = {
                'name': name
            };

        core.callApi('band', 'search', params, callback, version);
    }

    /**
     * Returns the discography of a band(s)
     *
     * @param {String} band_id The ID of the band. Multiples can be passed, comma delimited.
     */
    function discography(band_id, callback, verOverride) {
        var version = verOverride || null,
            params = {
                'band_id': band_id
            };

        core.callApi('band', 'discography', params, callback, version);
    }
}