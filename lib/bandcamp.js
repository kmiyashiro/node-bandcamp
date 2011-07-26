/*!
 * Bandcamp Library
 * Copyright(c) 2011 Kelly Miyashiro <miyashiro.kelly@gmail.com>
 * MIT Licensed
 */

/**
 * Public methods configured with key
 * Each module can be included individually. You can even assign different keys
 * and versions to each module, not sure why you'd want to do that.
 *
 * @param {String} key Bandcamp API key, email <support@bandcamp.com> to request one.
 * @param {Object} [vers] An object to override the different versions of each module. You probably don't want to touch this.
 * @return {Object} Bandcamp API client. See test/test.js to see example usage.
 */

var exports = module.exports = function(key, vers) {
    if (!key || typeof key != 'string') {
        new Error('Bandcamp: Key is required, request one from support@bandcamp.com if you do not have one.');
        return;
    }
    
    var core = require('./core')(key, vers);

    return {
        version: '0.0.1', // Library version
        band: require('./band')(key),
        album: require('./album')(key),
        track: require('./track')(key),
        url: require('./url')(key)
    }

}