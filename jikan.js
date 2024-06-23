const Request = require('./util/Request');
const Settings = require('./util/Settings');

class JikanAPI {

    /**
     *
     */
    constructor() {
        this.settings = Settings;
        this.request = new Request();
    }      

    /**
     *
     * @param {number} id - Anime ID
     * @param {string} [request] - full, characters, staff, episodes, news, forum, videos, videosepisodes, pictures, statistics, moreinfo, recommendations, userupdates, reviews, relations, themes, external, streaming
     * @param {{}} [parameters] - Query, check docs for more info
     * @see {@link https://docs.api.jikan.moe/#tag/anime}
     */
    loadAnime(id, request, parameters) {
        if(request === 'episodes' && typeof parameters === 'number'){
            return this.request.send(['anime', id, request, parameters]);
        }
        else if(request === 'videosepisodes'){
            return this.request.send(['anime', id, 'videos', 'episodes']);
        }
        return this.request.send(['anime', id, request], parameters);
    }

    /**
     *
     * @param {number} id - Character ID
     * @param {string} [request] - full, anime, manga, voices, pictures
     */
    loadCharacter(id, request) {
        return this.request.send(['characters', id, request]);
    }

    /**
     *
     * @param {number} id - Club ID
     * @param {string} [request] - members, staff, relations
     * @param {number} [page=1] - Page Number, available on members request
     */
    loadClub(id, request, page = 1){
        return this.request.send(['clubs', id, request], { page });
    }

    /**
     *
     * @param {string} type - anime or manga     
     * @param {string} [filter] - genres, explicit_genres, themes, demographics     
     */
    loadGenres(type, filter){
        return this.request.send(['genres', type], { filter });
    }

    /**
     *
     * @param {number} [page=1] - Page Number
     */
    loadMagazines(page = 1){
        return this.request.send(['magazines'], { page });
    }

    /**
     *
     * @param {number} id - Manga ID
     * @param {string} [request] - full, characters, news, forum, pictures, statistics, moreinfo, recommendations, userupdates, reviews, relations, external
     * @param {number} [page=1] - Page number, available on news, userupdates, reviews requests
     */
    loadManga(id, request, page = 1) {
        return this.request.send(['manga', id, request], { page });
    }

    /**
     *
     * @param {number} id - Person ID
     * @param {string} [request] - full, anime, voices, manga, pictures
     */
    loadPerson(id, request) {
        return this.request.send(['people', id, request]);
    }

    /**
     * @param {number} [id] - Producer ID
     * @param {string} [request] - full, external
     * @param {number} [page=1] - Page Number
     */
    loadProducers(id = null, request, page = 1){
        if(id) return this.request.send(['producers', id, request], { page });
        return this.request.send(['producers'], { page });
    }

    /**
     *
     * @param {string} type - anime, manga, characters, people, users
     */
    loadRandom(type){
        return this.request.send(['random', type]);
    }

    /**
     *
     * @param {string} type - anime or manga
     * @param {number} [page=1] - Page Number
     */
    loadRecommendations(type, page = 1){
        return this.request.send(['recommendations', type], { page });
    }

    /**
     *
     * @param {string} type - anime or manga
     * @param {number} [page] - Page Number
     * @param {boolean} [preliminary=false] - Receive reviews that are tagged as preliminary
     * @param {boolean} [spoiler=false] - Receive reviews that are tagged as a spoiler
     */
    loadReviews(type, page = 1, preliminary, spoiler){
        return this.request.send(['reviews', type], { page, preliminary, spoiler });
    }

    /**
     *
     * @param {string} day - monday, tuesday, wednesday, thursday, friday, saturday, sunday, other, unknown
     * @param {number} [page=1] - Page Number
     * @param {number} [limit] - Limit
     * @param {boolean} [kids=false] - Filter entries with the Kids Genre
     * @param {boolean} [sfw=false] - Filter entries with the Hentai Genre
     * @param {boolean} [unapproved=false] - Include entries which are unapproved
     */
    loadSchedule(day, page = 1, limit, kids=false, sfw=false, unapproved=false){
        return this.request.send(['schedules'], { filter: day, page, limit: limit, kids, sfw, unapproved});
    }

    /**
     *
     * @param {string} username - User's username
     * @param {string} [request] - full, statistics, favorites, userupdates, about, history, friends, reviews, recommendations, clubs, external
     * @param {number} [page=1] - Page number, available on friends, reviews, recommendations, clubs requests
     */
    loadUser(username, request, page = 1){
        return this.request.send(['users', username, request], { page });
    }

    /**
     * 
     * @param {string} username - User's username
     * @param {number} [limit=1000] - Amount of elements to receive
     * @param {number} [offset=0] - Offset     
     */
    loadAnimelist(username, limit = 1000, offset = 0){
        return this.request.send(['users', username, 'animelist'], { fields: 'list_status', limit, offset }, true);
    }

    /**
     * 
     * @param {string} username - User's username
     * @param {number} [limit=1000] - Amount of elements to receive
     * @param {number} [offset=0] - Offset     
     */
    loadMangalist(username, limit = 1000, offset = 0){
        return this.request.send(['users', username, 'mangalist'], { fields: 'list_status', limit, offset }, true);
    }

    /**
     *
     * @param {number} year - Year (1970-Now)
     * @param {string} season - winter, spring, summer, fall
     * @param {number} [page=1] - Page Number
     */
    loadSeason(year, season, page = 1){
        return this.request.send(['seasons', year, season], { page });
    }

    /**
     *
     */
    loadSeasonArchive(){
        return this.request.send(['seasons']);
    }

    /**
     *
     * @param {number} [page=1] - Page Number
     */
    loadCurrentSeason(page = 1){
        return this.request.send(['seasons', 'now'], { page });
    }

    /**
     *
     * @param {number} [page=1] - Page Number
     */
    loadUpcomingSeason(page = 1){
        return this.request.send(['seasons', 'upcoming'], { page });
    }

    /**
     * 
     * @param {string} type - anime, manga, people, characters, reviews
     * @param {number} [page=1] - Page Number (25 items per page)
     * @param {string} [subtype] - Check docs for more info
     * @param {string} [filter] - Check docs for more info
     * @see {@link https://docs.api.jikan.moe/#tag/top}
     */
    loadTop(type, page = 1, subtype, filter){
        return this.request.send(
            ['top', type], { type: subtype, filter, page }
        );
    }    

    /**
     *
     * @param {string} type - episodes or promos
     * @param {number} [page=1] - Page Number
     * @param {number} [limit] - Limit (episodes only)
     * @param {boolean} [popular] - popular items?
     */
    loadWatch(type, page = 1, limit, popular){
        return this.request.send(['watch', type, popular ? 'popular' : undefined], { page, limit: limit });
    }

    /**
     *
     * @param {string} type - anime, manga, people, characters, clubs
     * @param {string} query - Search term
     * @param {number} [limit] - Result limit
     * @param {{}} [parameters] - extra query parameters, see docs for more info on this
     */
    search(type, query, limit, parameters = {}){
        if(!parameters.q && query) parameters.q = query;
        if(!parameters.limit && limit) parameters.limit = limit;

        return this.request.send([type], parameters);
    }

    /**
     * can be used for stuff not yet covered with the current Jikanjs wrapper version
     * @param {Array} urlParts - e.g. [anime, 1] to load the anime with the id of 1
     * @param {Object} [queryParameters] - query Parameters. Needs to be a key value pair like {type: 'tv', status: 'airing'}
     * @param {boolean} [mal=false] - request to official MAL API?
     */
    raw(urlParts, queryParameters, mal = false) {
        if(!Array.isArray(urlParts)) return Promise.reject(new Error(`The given parameter should be an array like [anime, 1] but given was ${urlParts}`));
        return this.request.send(urlParts, queryParameters, mal);
    }
}

module.exports = new JikanAPI();
