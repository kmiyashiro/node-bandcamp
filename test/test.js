/**
 * Replace key with your own API key.
 */
var key = 'your_BC_API_key', // contact <support@bandcamp.com> to request one
    bandcamp = require('../lib/bandcamp')(key),
    expect = require('chai').expect,
    i = require('util').inspect;

/**
 * Shared helpers
 */
 
var validResponse = function(err, res, status) {
    expect(err).to.not.exist;
    expect(res.error).to.not.exist;
    expect(status).to.equal(200);
};

/**
 * Band module
 */

describe('Band', function() {
    it('should show lib version', function() {
        expect(bandcamp.version).to.match(/^\d+\.\d+\.\d+$/);
    });
    
    it('should accept module versions', function() {
        var band2 = require('../lib/bandcamp')(key, { band: 2 }).band;
        
        expect(band2.version).to.equal(2);
        
        band2 = undefined;
    });
    
    it('should search bands', function(done) {
        bandcamp.band.search('baron von luxxury', 
            function(err, result, status) {
                validResponse(err, result, status);

                expect(typeof result).to.equal('object');
                done();
            }
        );
    });
    
    describe('#discography', function() {
        it('should return by ID (string)', function(done) {
            bandcamp.band.discography('203035041',
                function(err, result, status) {
                    validResponse(err, result, status);

                    expect(typeof result).to.equal('object');
                    done();
                }
            );
        });
        
        it('should return by ID (number)', function(done) {
            bandcamp.band.discography(203035041,
                function(err, result, status) {
                    validResponse(err, result, status);

                    expect(typeof result).to.equal('object');
                    done();
                }
            );
        });
        
        it('should accept multiple', function(done) {
            bandcamp.band.discography('3463798201,203035041', function(err, result, status) {
                validResponse(err, result, status);

                expect(typeof result).to.equal('object');
                expect(result).to.have.keys('203035041', '3463798201');
                done();
            });
        });
    });
    
    describe('#info', function() {
        it('should accept a single ID', function(done) {
            bandcamp.band.info('203035041', function(err, result, status) {
                validResponse(err, result, status);

                expect(typeof result).to.equal('object');
                done();
            });
        });
        
        it('should accept multiple IDs', function() {
            bandcamp.band.info('203035041,3463798201',
                function(err, result, status) {
                    validResponse(err, result, status);

                    expect(typeof result).to.equal('object');
                    expect(result).to.have.keys('203035041', '3463798201');
                }
            );
        });
    });
});

describe('Album', function() {
    describe('#info', function() {
        it('should retrieve album info', function(done) {
            bandcamp.album.info('2587417518', function(err, result, status) {
                validResponse(err, result, status);

                expect(typeof result).to.equal('object');
                expect(result).to.contain.keys('tracks');
                done();
            });
        });
    });
});

describe('Track', function() {
    describe('#info', function() {
        it('should return track info', function(done) {
            bandcamp.track.info('1269403107', function(err, result, status) {
                validResponse(err, result, status);

                expect(typeof result).to.equal('object');
                done();
            });
        });
    });
});

describe('URL', function() {
    describe('#info', function() {
        it('should return band ID', function(done) {
            bandcamp.url.info('cults.bandcamp.com', 
                function(err, result, status) {
                    validResponse(err, result, status);
                
                    expect(result).to.have.keys('band_id');
                    done();
                }
            );
        });
        
        it('should return album ID', function(done) {
            bandcamp.url.info(
                'http://music.sufjan.com/album/all-delighted-people-ep',
                function(err, result, status) {
                    validResponse(err, result, status);
                
                    expect(result).to.contain.keys('album_id', 'band_id');
                    done();
                }
            );
        });
        
        it('should return track ID', function(done) {
            bandcamp.url.info(
                'http://laurashigihara.bandcamp.com/track/zombies-on-your-lawn',
                function(err, result, status) {
                    validResponse(err, result, status);
                    
                    expect(result).to.contain.keys('band_id', 'track_id');
                    done();
                }
            );
        });
    });
});

describe('Partial application', function() {
    it('should partially apply arguments to callbacks', function() {
        bandcamp.track.info('1269403107',
            function(err, result, status, test1, test2) {
                validResponse(err, result, status);

                // Partial application
                expect(test1).to.equal('Passed Arg');
                expect(test2).to.equal(['array', 'arg']);
                done();
            },
            null, // Version, use default if null
            'Passed Arg', // Passed for callback
            ['array', 'arg'] // Passed for callback
        );
    });
});