/* eslint-disable no-undef */
const jikanjs = require('../index');
const { assert } = require('chai');

beforeEach(function(done) {
    this.timeout(30000);

    setTimeout(function(){
        done();
    }, 3000);
});

describe('JikanJS', function(){
    this.timeout(30000);

    describe('Anime', function(){
        it('Loaded data', async function(){      
            const { data } = await jikanjs.loadAnime(31240);
            assert.equal(data.mal_id, 31240, 'id should be 31240');
            assert.equal(data.title, 'Re:Zero kara Hajimeru Isekai Seikatsu', 'title should be Re:Zero kara Hajimeru Isekai Seikatsu');
        });

        it('Extra request', async function(){
            const { data } = await jikanjs.loadAnime(31240, 'characters');
            assert.isNotEmpty(data);
            assert.equal(data[0].character.name, 'Emilia', 'first character name should be Emilia');      
        });
    });

    describe('Character', function(){
        it('Loaded data', async function(){
            const { data } = await jikanjs.loadCharacter(118737);
            assert.equal(data.mal_id, 118737, 'id should be 118737');
            assert.equal(data.name, 'Emilia', 'character name should be Emilia');
        });

        it('Extra request', async function(){
            const { data } = await jikanjs.loadCharacter(118737, 'voices');
            assert.isNotEmpty(data);
            assert.equal(data[3].person.name, 'Takahashi, Rie', 'person name should be Takahashi, Rie');
            assert.equal(data[3].language, 'Japanese', 'language should be Japanese');    
        });
    });

    describe('Club', function(){
        it('Loaded data', async function(){
            const { data } = await jikanjs.loadClub(379);
            assert.equal(data.mal_id, 379, 'id should be 379');
            assert.equal(data.name, 'Fantasy Anime League', 'name should be Fantasy Anime League');
        });

        it('Extra request', async function(){
            const { data } = await jikanjs.loadClub(379, 'members');
            assert.isNotEmpty(data);
            assert.isDefined(data[0].username);
        });
    });

    describe('Genres', function(){
        it('Loaded data', async function(){
            const { data } = await jikanjs.loadGenres('anime');
            assert.isNotEmpty(data);      
        });

        it('Filter', async function(){
            const { data } = await jikanjs.loadGenres('anime', 'explicit_genres');
            assert.isNotEmpty(data);
            assert.equal(data[0].name, 'Ecchi', 'name should be Ecchi');
        });
    });

    describe('Magazines', function(){
        it('Loaded data', async function(){
            const { data } = await jikanjs.loadMagazines();
            assert.isNotEmpty(data);
            assert.equal(data[0].mal_id, 1, 'id should be 1');
        });
    });

    describe('Manga', function(){
        it('Loaded data', async function(){
            const { data } = await jikanjs.loadManga(74697);
            assert.equal(data.mal_id, 74697, 'id should be 74697');
            assert.equal(data.title, 'Re:Zero kara Hajimeru Isekai Seikatsu', 'title should be Re:Zero kara Hajimeru Isekai Seikatsu');
        });

        it('Extra request', async function(){
            const { data } = await jikanjs.loadManga(74697, 'characters');
            assert.isNotEmpty(data);
            assert.equal(data[0].character.name, 'Emilia', 'first character name should be Emilia');
        });
    });

    describe('Person', function(){
        it('Loaded data', async function(){
            const { data } = await jikanjs.loadPerson(34785);
            assert.equal(data.mal_id, 34785, 'id should be 34785');
            assert.equal(data.name, 'Rie Takahashi', 'Person name should be Rie Takahashi');    
        });
    
        it('Extra request', async function(){
            const { data } = await jikanjs.loadPerson(34785, 'voices');
            assert.isNotEmpty(data);
        });
    });

    describe('Producers', function(){
        it('Loaded data', async function(){
            const { data } = await jikanjs.loadProducers();
            assert.isNotEmpty(data);
            assert.equal(data[0].mal_id, 1, 'id should be 1');
        });
    });

    describe('Random', function(){
        it('Anime', async function(){
            const { data } = await jikanjs.loadRandom('anime');
            assert.isDefined(data.mal_id);
        });

        it('Manga', async function(){
            const { data } = await jikanjs.loadRandom('manga');
            assert.isDefined(data.mal_id);
        });
    
        it('Character', async function(){
            const { data } = await jikanjs.loadRandom('characters');
            assert.isDefined(data.mal_id);    
        });

        it('People', async function(){
            const { data } = await jikanjs.loadRandom('people');
            assert.isDefined(data.mal_id);    
        });

        it('Users', async function(){
            const { data } = await jikanjs.loadRandom('users');
            assert.isDefined(data.username);    
        });
    });

    describe('Recommendations', function(){
        it('Loaded data', async function(){
            const { data } = await jikanjs.loadRecommendations('anime');
            assert.isNotEmpty(data);
            assert.isDefined(data[0].mal_id);
        });
    });

    describe('Reviews', function(){
        it('Loaded data', async function(){
            const { data } = await jikanjs.loadReviews('anime');
            assert.isNotEmpty(data);
            assert.isDefined(data[0].mal_id);
        });
    });

    describe('Schedule', function(){
        it('Loaded data', async function(){
            const { data } = await jikanjs.loadSchedule('monday');
            assert.isNotEmpty(data);
            assert.isDefined(data[0].mal_id);
        });
    });

    describe('User', function(){
        it('Loaded Data', async function(){
            const { data } = await jikanjs.loadUser('MatAranda');
            assert.equal(data.username, 'MatAranda', 'username should be MatAranda');
        });

        it('Extra request', async function(){
            const { data } = await jikanjs.loadUser('MatAranda', 'favorites');
            assert.isNotEmpty(data.anime);
            assert.equal(data.anime[0].mal_id, 31240, 'id should be 31240');
        });

        it('Anime list', async function(){
            const { data } = await jikanjs.loadAnimelist('MatAranda');
            assert.isNotEmpty(data);
            assert.isDefined(data[0].node.id);
            assert.isDefined(data[0].list_status.status);
        });

        it('Manga list', async function(){
            const { data } = await jikanjs.loadMangalist('MatAranda');
            assert.isNotEmpty(data);
            assert.isDefined(data[0].node.id);
            assert.isDefined(data[0].list_status.status);
        });
    });

    describe('Season', function(){
        it('x season', async function(){
            const { data } = await jikanjs.loadSeason(2012, 'fall');
            assert.isNotEmpty(data);
            assert.isDefined(data[0].mal_id);
        });

        it('Archive', async function(){
            const { data } = await jikanjs.loadSeasonArchive();
            assert.isNotEmpty(data);
            assert.isDefined(data[0].year);
        });
    
        it('Current', async function(){
            const { data } = await jikanjs.loadCurrentSeason();
            assert.isNotEmpty(data);
            assert.isDefined(data[0].mal_id);
        });

        it('Upcoming', async function(){
            const { data } = await jikanjs.loadUpcomingSeason();
            assert.isNotEmpty(data);
            assert.isDefined(data[0].mal_id);
        });
    });

    describe('Top', function(){
        describe('Anime', function(){
            it('Loaded data', async function(){
                const { data } = await jikanjs.loadTop('anime');
                assert.isNotEmpty(data);
                assert.equal(data[0].rank, 1, 'rank should be 1');
            });

            it('Subtype', async function(){
                const { data } = await jikanjs.loadTop('anime', 1, 'movie');
                assert.isNotEmpty(data);
                assert.equal(data[0].type, 'Movie', 'type should be Movie');
            });

            it('Filter', async function(){
                const { data } = await jikanjs.loadTop('anime', 1, 'tv', 'airing');
                assert.isNotEmpty(data);
                assert.equal(data[0].status, 'Currently Airing', 'status should be Currently Airing');
            });
        });

        describe('Manga', function(){
            it('Loaded data', async function(){
                const { data } = await jikanjs.loadTop('manga');
                assert.isNotEmpty(data);
                assert.equal(data[0].rank, 1, 'rank should be 1');
            });

            // Doesnt work due to API bug (subtype and filter dont have any effect on the result)
            // it('Subtype', async function(){
            //   const { data } = await jikanjs.loadTop('manga', 1, 'lightnovel');
            //   assert.isNotEmpty(data);
            //   assert.equal(data[0].type, 'Light Novel', 'type should be Light Novel');
            // });

            // it('Filter', async function(){
            //   const { data } = await jikanjs.loadTop('manga', 1, 'manga', 'publishing');
            //   assert.isNotEmpty(data);
            //   assert.equal(data[0].status, 'Publishing', 'status should be Publishing');
            // });
        });

        describe('People', function(){
            it('Loaded data', async function(){
                const { data } = await jikanjs.loadTop('people');
                assert.isNotEmpty(data);
                assert.isDefined(data[0].mal_id);
            });
        });

        describe('Characters', function(){
            it('Loaded data', async function(){
                const { data } = await jikanjs.loadTop('characters');
                assert.isNotEmpty(data);
                assert.isDefined(data[0].mal_id);
            });
        });

        describe('Reviews', function(){
            it('Loaded data', async function(){
                const { data } = await jikanjs.loadTop('reviews');
                assert.isNotEmpty(data);
                assert.isDefined(data[0].mal_id);
            });
        });
    });

    describe('Watch', function(){
        it('Loaded data', async function(){
            const { data } = await jikanjs.loadWatch('episodes', 1);
            assert.isNotEmpty(data);
        });
    });

    describe('Search', function(){
        it('Anime', async function(){
            const { data } = await jikanjs.search('anime', 're:zero', 1);
            assert.isNotEmpty(data);
            assert.equal(data[0].mal_id, 31240, 'id should be 31240');      
        });    
    });

    describe('Raw', function(){
        it('Loaded data', async function(){      
            const { data } = await await jikanjs.raw(['anime', 31240]);
            assert.equal(data.mal_id, 31240, 'id should be 31240');
            assert.equal(data.title, 'Re:Zero kara Hajimeru Isekai Seikatsu', 'title should be Re:Zero kara Hajimeru Isekai Seikatsu');
        });

        it('Extra request', async function(){
            const { data } = await jikanjs.raw(['anime', 31240, 'characters']);
            assert.isNotEmpty(data);
            assert.equal(data[0].character.name, 'Emilia', 'first character name should be Emilia');      
        });
    });
});