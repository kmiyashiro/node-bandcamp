/**
 * Replace key with your own API key.
 * Requires Expresso to run this test, npm install expresso -g; cd ..; expresso -I lib
 */
var key = 'yourBandcampKey', // contact <support@bandcamp.com> to request one
    bandcamp = require('../lib/bandcamp')(key),
    band2 = require('../lib/bandcamp')(key, { band: 2 }).band,
    should = require('should'),
    i = require('util').inspect;

module.exports = {
    /**
     * Band module
     */

    'Test .version': function() {
        bandcamp.version.should.match(/^\d+\.\d+\.\d+$/);
    },

    'Versioned modules': function() {
        band2.version.should.equal(2);
    },

    'Band: Search works': function() {
        bandcamp.band.search('baron von luxxury', function(err, result, status) {
            should.not.exist(err);
            should.not.exist(result.error);
            status.should.equal(200);

            (typeof result).should.equal('object');
        });
    },

    'Band: Discography works': function() {
        // Single
        bandcamp.band.discography('203035041', function(err, result, status) {
            should.not.exist(err);
            should.exist(result);
            status.should.equal(200);

            (typeof result).should.equal('object');
        });

        // Number
        bandcamp.band.discography(203035041, function(err, result, status) {
            should.not.exist(err);
            should.exist(result);
            status.should.equal(200);

            (typeof result).should.equal('object');
        });

        // Multiple
        bandcamp.band.discography('3463798201,203035041', function(err, result, status) {
            should.not.exist(err);
            status.should.equal(200);

            (typeof result).should.equal('object');
            result.should.have.keys('203035041', '3463798201');
        });
    },

    'Band: Info works': function() {
        // Single
        bandcamp.band.info('203035041', function(err, result, status) {
            should.exist(result);
            status.should.equal(200);

            (typeof result).should.equal('object');
        });

        // Multiple
        bandcamp.band.info('203035041,3463798201', function(err, result, status) {
            status.should.equal(200);

            (typeof result).should.equal('object');
            result.should.have.keys('203035041', '3463798201');
        });
    },

    /**
     * Album module
     */

    'Album: Info works': function() {
        bandcamp.album.info('2587417518', function(err, result, status) {
            should.exist(result);
            status.should.equal(200);

            (typeof result).should.equal('object');
            result.should.include.keys('tracks');
        });
    },

    /**
     * Track module
     */

    'Track: Info works': function() {
        bandcamp.track.info('1269403107', function(err, result, status) {
            should.exist(result);
            status.should.equal(200);

            (typeof result).should.equal('object');
        });
    },

    /**
     * URL module
     */

    'URL: Info works': function() {
        // Band
        bandcamp.url.info('cults.bandcamp.com', function(err, result, status) {
            should.exist(result);
            status.should.equal(200);

            (typeof result).should.equal('object');
            result.should.have.keys('band_id');
        });

        // Album
        bandcamp.url.info('http://music.sufjan.com/album/all-delighted-people-ep', function(err, result, status) {
            should.exist(result);
            status.should.equal(200);

            (typeof result).should.equal('object');
            result.should.have.keys('album_id', 'band_id');
        }),

        // Track
        bandcamp.url.info('http://laurashigihara.bandcamp.com/track/zombies-on-your-lawn', function(err, result, status) {
            should.exist(result);
            status.should.equal(200);

            (typeof result).should.equal('object');
            result.should.have.keys('band_id', 'track_id');
        });
    },
    
    /**
     * Partial Application/Curry
     */
     
    'Partial Application works': function() {
        bandcamp.track.info('1269403107',
            function(err, result, status, test1, test2) {
                should.exist(result);
                status.should.equal(200);
            
                (typeof result).should.equal('object');
                
                // Partial application
                test1.should.equal('Passed Arg');
                (typeof test2).should.equal('object');
            },
            null, // Version, use default if null
            'Passed Arg', // Passed for callback
            ['array', 'arg'] // Passed for callback
        );
    }
};