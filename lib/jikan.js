//@ts-check
const Request               = require('./util/Request');
const Settings              = require('./util/Settings');

/**
 * Response Types:
 *
 * 200: OK
 * 400: Bad Request             -> invalid endpoint
 * 404: Not Found               -> id doesn't exist
 * 405: Method Not Allowed      -> wrong request method
 * 429: Too Many Requests       -> request limit is hit.
 *
 * Source: https://jikan.docs.apiary.io/
 */

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
     * @param {number} id Anime ID
     * @param {string} [request] e.g. characters, staff, episodes, news, forum, videos, pictures, statistics, moreinfo, recommendations, userupdates, reviews, relations, themes, external
     * @param {{}} [parameters] query parameters (chekc the docs)
     */
    loadAnime(id, request, parameters) {
        if(request === 'episodes' && typeof parameters === 'number'){
          return this.request.send(['anime', id, request, parameters]);
        }
        return this.request.send(['anime', id, request], parameters);
    }

    /**
     *
     * @param {number} id Character ID
     * @param {string} [request] e.g. anime, manga, voices, pictures
     */
    loadCharacter(id, request) {
        return this.request.send(['characters', id, request]);
    }

    /**
     *
     * @param {number} id Club ID
     * @param {string} [request] e.g. members, staff, relations
     * @param {number} [page] Page Number, available on members
     */
    loadClub(id, request, page = 1){
      return this.request.send(['clubs', id, request], { page: page });
    }

    /**
     *
     * @param {string} type one of [anime, manga]
     * @param {number} [page] Page Number
     * @param {string} [filter] one of [genres, explicit_genres, themes, demographics]
     * @param {number} [limit] Result limit
     */
    loadGenres(type, page = 1, filter, limit){
      let parameters = {};
      parameters.page = page;
      if(filter) parameters.filter = filter;
      if(limit) parameters.limit = limit;
      
      return this.request.send(['genres', type], parameters);
    }

    /**
     *
     * @param {number} [page] Page Number
     */
    loadMagazines(page = 1){
      return this.request.send(['magazines'], { page: page });
    }

    /**
     *
     * @param {number} id Manga ID
     * @param {string} [request] e.g. characters, news, forum, pictures, statistics, moreinfo, recommendations, userupdates, reviews, relations, external
     * @param {number} [page] Page number, available on [news, userupdates, reviews]
     */
    loadManga(id, request, page = 1) {
        return this.request.send(['manga', id, request], { page: page });
    }

    /**
     *
     * @param {number} id Person ID
     * @param {string} [request] e.g. anime, voices, manga, pictures
     */
    loadPerson(id, request) {
        return this.request.send(['people', id, request]);
    }

    /**
     *
     * @param {number} [page] Page Number
     */
    loadProducers(page = 1){
      return this.request.send(['producers'], { page: page });
    }

    /**
     *
     * @param {string} type one of [anime, manga, characters, people, users]
     */
    loadRandom(type){
      return this.request.send(['random', type]);
    }

    /**
     *
     * @param {string} type one of [anime, manga]
     * @param {number} [page] Page Number
     */
    loadRecommendations(type, page = 1){
      return this.request.send(['recommendations', type], { page: page });
    }

    /**
     *
     * @param {string} type one of [anime, manga]
     * @param {number} [page] Page Number
     */
    loadReviews(type, page = 1 ){
      return this.request.send(['reviews', type], { page: page });
    }

    /**
     *
     * @param {string} day one of [monday, tuesday, wednesday, thursday, friday, saturday, sunday, other, unknown]
     * @param {number} [page] Page Number
     */
    loadSchedule(day, page = 1){
      return this.request.send(['schedules'], { filter: day, page: page });
    }

    /**
     *
     * @param {number} username User's username
     * @param {string} [request] e.g. statistics, favorites, userupdates, about, history, friends, reviews, recommendations, clubs
     * @param {number} [page] Page number, available on [friends, reviews, recommendations, clubs]
     */
    loadUser(username, request, page = 1){
      return this.request.send(['users', username, request], { page: page });
    }

    /**
     *
     * @param {number} year Year (1970-Now)
     * @param {string} season one of ['winter', 'spring', 'summer', 'fall']
     * @param {number} [page] Page Number
     */
    loadSeason(year, season, page = 1){
      return this.request.send(['seasons', year, season], { page: page });
    }

    /**
     *
     */
    loadSeasonArchive(){
      return this.request.send(['seasons']);
    }

    /**
     *
     * @param {number} [page] Page Number
     */
    loadCurrentSeason(page = 1){
      return this.request.send(['seasons', 'now'], { page: page });
    }

    /**
     *
     * @param {number} [page] Page Number
     */
    loadUpcomingSeason(page = 1){
      return this.request.send(['seasons', 'upcoming'], { page: page });
    }

    /**
     *
     * @param {string} type one of [anime, manga, people, characters, review]
     * @param {number} [page] Page Number (25 items per page)
     */
    loadTop(type, page = 1){
      return this.request.send(['top', type], { page: page });
    }

    /**
     *
     * @param {string} type one of [episodes, promos]
     * @param {number} [page] Page Number
     * @param {string} [popular] "popular" for popular items
     */
    loadWatch(type, page = 1, popular){
      return this.request.send(['watch', type, popular ? 'popular' : undefined], { page: page });
    }

    /**
     *
     * @param {string} type one of [anime, manga, people, characters, clubs]
     * @param {string} query search term
     * @param {number} [limit] result limit
     * @param {{}} [parameters] extra query parameters, see docs for more info on this
     */
    search(type, query, limit, parameters = {}){
      if(!parameters.q) parameters.q = query;
      if(!parameters.limit && limit) parameters.limit = limit;

      return this.request.send([type], parameters);
    }

    /**
     * can be used for stuff not yet covered with the current Jikanjs wrapper version
     * @param {Array} urlParts          e.g. [anime, 1] to load the anime with the id of 1
     * @param {Object} [queryParameters] query Parameters. Needs to be a key value pair like {type: 'tv', status: 'airing'}
     */
    raw(urlParts, queryParameters) {
        if(!Array.isArray(urlParts)) return Promise.reject(new Error(`The given parameter should be an array like [anime, 1] but given was ${urlParts}`));
        return this.request.send(urlParts, queryParameters);
    }
}

module.exports = new JikanAPI();
