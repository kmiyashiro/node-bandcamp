// Include should
var key = 'yourbandcampAPIkey', // contact <support@bandcamp.com> to request one
    bandcamp = require('bandcamp')(key),
    should = require('should'),
    i = require('util').inspect;

module.exports = {
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
            should.exist(result);
            status.should.equal(200);

            Object.keys(result).should.have.length(2);
        });
    },
        
    'Band: Info works': function() {
        // Single
        bandcamp.band.info('203035041', function(err, result, status) {
            // console.log(i(JSON.parse(result)), i(status));
            should.exist(result);
            status.should.equal(200);
        });
        
        bandcamp.band.info('203035041, 3463798201'), function(err, result, status) {
            should.exist(result);
            status.should.equal(200);
            
            Object.keys(result).should.have.length(2);
        }
    }
}