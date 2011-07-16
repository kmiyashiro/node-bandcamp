// Include should
var key = 'yourbandcampAPIkey', // contact <support@bandcamp.com> to request one
    bandcamp = require('bandcamp')(key),
    should = require('should'),
    i = require('util').inspect;

module.exports = {
    /**
     * Band module
     */

    'Test .version': function() {
        bandcamp.version.should.match(/^\d+\.\d+\.\d+$/);
    },

    'Band: Search works': function() {
        bandcamp.band.search('baron von luxxury', function(err, result, status) {
            result = JSON.parse(result);

            should.not.exist(err);
            should.not.exist(result.error);
            status.should.equal(200);
        });
    },

    'Band: Discography works': function() {
        // Single
        bandcamp.band.discography('203035041', function(err, result, status) {
            result = JSON.parse(result);

            should.not.exist(err);
            should.exist(result);
            status.should.equal(200);
        });

        // Multiple
        bandcamp.band.discography('3463798201,203035041', function(err, result, status) {
            result = JSON.parse(result);

            should.not.exist(err);
            status.should.equal(200);

            result.should.have.keys('203035041', '3463798201');
        });
    },

    'Band: Info works': function() {
        // Single
        bandcamp.band.info('203035041', function(err, result, status) {
            result = JSON.parse(result);

            should.exist(result);
            status.should.equal(200);
        });

        // Multiple
        bandcamp.band.info('203035041,3463798201', function(err, result, status) {
            result = JSON.parse(result);

            status.should.equal(200);
            result.should.have.keys('203035041', '3463798201');
        });
    },

    /**
     * Album module
     */

    'Album: Info works': function() {
        bandcamp.album.info('2587417518', function(err, result, status) {
            result = JSON.parse(result);

            should.exist(result);
            status.should.equal(200);
            result.should.include.keys('tracks');
        });
    },

    /**
     * Track module
     */

    'Track: Info works': function() {
        bandcamp.track.info('1269403107', function(err, result, status) {
            result = JSON.parse(result);

            should.exist(result);
            status.should.equal(200);
        });
    },

    /**
     * URL module
     */

    'URL: Info works': function() {
        // Band
        bandcamp.url.info('cults.bandcamp.com', function(err, result, status) {
            result = JSON.parse(result);

            should.exist(result);
            status.should.equal(200);
            result.should.have.keys('band_id');
        });

        // Album
        bandcamp.url.info('http://music.sufjan.com/album/all-delighted-people-ep', function(err, result, status) {
            result = JSON.parse(result);

            should.exist(result);
            status.should.equal(200);
            result.should.have.keys('album_id', 'band_id');
        });

        // Track
        bandcamp.url.info('http://laurashigihara.bandcamp.com/track/zombies-on-your-lawn', function(err, result, status) {
            result = JSON.parse(result);

            should.exist(result);
            status.should.equal(200);
            result.should.have.keys('band_id', 'track_id');
        });
    }
}