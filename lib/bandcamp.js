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
    
    /**
     * Versioning of each module in the Bandcamp API
     * Override by passing a versions object.
     */

    var defaultVers = {
        band: 3,
        album: 2,
        track: 1,
        url: 1
    }

    // Overwrite defaults if versions object was passed
    vers = vers ? merge(defaultVers, vers) : defaultVers;

    return {
        version: '0.0.4', // Library version
        band: require('./band')(key, vers.band),
        album: require('./album')(key, vers.album),
        track: require('./track')(key, vers.track),
        url: require('./url')(key, vers.url)
    }
    
    /**
     * Merge two objects, return target.
     */

    function merge(a, b){
        if (a && b) {
            var keys = Object.keys(b),
                len = keys.length,
                key;

            for (var i = 0; i < len; ++i) {
                key = keys[i];
                
                a[key] = b[key];
            }
        }
        return a;
    }

}