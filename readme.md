Jikanjs
=======
this is a v4 version of [zuritor's jikanjs](https://github.com/zuritor/jikanjs)

## Installation

`npm install @mateoaranda/jikanjs --save`

## wrapped jikan Features

* [Anime](https://docs.api.jikan.moe/#tag/anime)
* [Character](https://docs.api.jikan.moe/#tag/characters)
* [Clubs](https://docs.api.jikan.moe/#tag/clubs)
* [Genres](https://docs.api.jikan.moe/#tag/genres)
* [Magazines](https://docs.api.jikan.moe/#tag/magazines)
* [Manga](https://docs.api.jikan.moe/#tag/manga)
* [People](https://docs.api.jikan.moe/#tag/people)
* [Producers](https://docs.api.jikan.moe/#tag/producers)
* [Random](https://docs.api.jikan.moe/#tag/random)
* [Recommendations](https://docs.api.jikan.moe/#tag/recommendations)
* [Reviews](https://docs.api.jikan.moe/#tag/reviews)
* [Anime Schedule](https://docs.api.jikan.moe/#tag/schedules)
* [Users](https://docs.api.jikan.moe/#tag/users)
* [Top](https://docs.api.jikan.moe/#tag/top)

## Usage

```javascript
const jikanjs = require('@mateoaranda/jikanjs');
```

## Modify API URL
It is possible to change the API Base URL

```javascript
jikanjs.settings.setBaseURL('apiurl'); // sets the API Base URL
```

## API Methods
* All API functions are promised Based
* Information of all possible parameters are located at the [documentation](https://docs.api.jikan.moe/)

```javascript
jikanjs.loadAnime(id [, request [, parameters]])
jikanjs.loadCharacter(id [, request])
jikanjs.loadClub(id [, request [, page]])
jikanjs.loadGenres(type [, page [, limit [, filter]]])
jikanjs.loadMagazines([page])
jikanjs.loadManga(id [, request [, page]])
jikanjs.loadPerson(id [, request])
jikanjs.loadProducers([page])
jikanjs.loadRandom(type)
jikanjs.loadRecommendations(type [, page])
jikanjs.loadReviews(type [, page])
jikanjs.loadSchedule(day [, page])
jikanjs.loadUser(username [, request [, page]])
jikanjs.loadSeason(year, season [, page])
jikanjs.loadSeasonArchive()
jikanjs.loadCurrentSeason([page])
jikanjs.loadUpcomingSeason([page])
jikanjs.loadTop(type [, page])
jikanjs.search(type, query [, limit [, parameters]])
jikanjs.raw(urlParts [, queryParameter])
```
## Examples

### loadAnime(id [, request [, parameters]])
`id`: Anime ID  
`request`: characters, staff, episodes, news, forum, videos, pictures, statistics, moreinfo, recommendations, userupdates, reviews, relations, themes, external  
`parameters`: query parameters, check the docs for more info

```javascript
await jikanjs.loadAnime(31240); // Anime Information
await jikanjs.loadAnime(31240, 'episodes'); // All Episodes
await jikanjs.loadAnime(31240, 'episodes', 15); // Episode 15
await jikanjs.loadAnime(31240, 'forum', { filter: 'episode' });

```

### loadCharacter(id [, request])
`id`: Character ID  
`request`: anime, manga, voices, pictures

```javascript
await jikanjs.loadCharacter(118737); // Character information
await jikanjs.loadCharacter(118737, 'pictures'); // Character pictures
```

### loadClub(id [, request [, page]])
`id`: Club ID  
`request`: members, staff, relations  
`page`: Page number, available on `members` request, default: 1

```javascript
await jikanjs.loadClub(73113); // Club information
await jikanjs.loadClub(73113, 'members', 10); // 10th Page of this club members
```

### loadGenres(type [, page [, filter [, limit]]])
`type`: either `anime` or `manga`  
`page`: Page number, default: 1  
`filter`: genres, explicit_genres, themes, demographics  
`limit`: Results limit

```javascript
await jikanjs.loadGenres('anime'); // All anime genres
await jikanjs.loadGenres('manga', 1, 'explicit_genres', 5); // First 5 manga explicit genres
```

### loadMagazines([page])
`page`: Page Number, default: 1

```javascript
await jikanjs.loadMagazines(); // Magazines collection
```

### loadManga(id [, request [, page]])
`id`: Manga ID  
`request`: characters, news, forum, pictures, statistics, moreinfo, recommendations, userupdates, reviews, relations, external  
`page`: Page Number, available on `news` `userupdates` `reviews` requests

```javascript
await jikanjs.loadManga(74697); // Manga information
await jikanjs.loadManga(74697, 'reviews', 1); // First page of reviews
```

### loadPerson(id [, request])
`id`: Person ID  
`request`: anime, voices, manga, pictures

```javascript
await jikanjs.loadPerson(34785); // Person information
await jikanjs.loadPerson(34785, 'voices'); // All Person's Voice Acting Roles
```

### loadProducers([page])
`page`: Page Number, default: 1  

```javascript
await jikanjs.loadProducers(); // Producers collection
```

### loadRandom(type)
`type`: anime, manga, characters, people, users

```javascript
await jikanjs.loadRandom('anime'); // Some random anime
```

### loadRecommendations(type [, page])
`type`: either `anime` or `manga`  
`page`: Page Number, default: 1  

```javascript
await jikanjs.loadRecommendations('anime'); // First page of recent anime recommendations
```

### loadReviews(type [, page])
`type`: either `anime` or `manga`  
`page`: Page Number, default: 1

```javascript
await jikanjs.loadReviews('manga'); // First page of recent manga reviews
```

### loadSchedule(day [, page])
`day`: monday, tuesday, wednesday, thursday, friday, saturday, sunday, other, unknown  
`page`: Page Number, default: 1

```javascript
await jikanjs.loadSchedule('monday'); // Monday's anime schedule
```

### loadUser(username [, request [, page]])
`username`: User's username  
`request`: statistics, favorites, userupdates, about, history, friends, reviews, recommendations, clubs  
`page`: Page number, available on `friends` `reviews` `recommendations` `clubs` requests

```javascript
await jikanjs.loadUser('pepito'); // Profile information
await jikanjs.loadUser('pepito', 'friends', 6); // 6th page of pepito's friends
```

### loadSeason(year, season [, page])
`year`: Season Year (1970-Now)  
`season`: winter, spring, summer, fall  
`page`: Page Number, default: 1  

```javascript
await jikanjs.loadSeason(2021, 'fall'); // First page of Fall 2021 animes
```

### loadSeasonArchive()
```javascript
await jikanjs.loadSeasonArchive(); // Seasons collection
```

### loadCurrentSeason([page])
`page`: Page Number, default: 1  

```javascript
await jikanjs.loadCurrentSeason(); // First page of the current season's animes
```


### loadUpcomingSeason([page])
`page`: Page Number, default: 1  

```javascript
await jikanjs.loadUpcomingSeason(3); // Third page of next season's animes
```

### loadTop(type [, page])
`type`: anime, manga, people, characters, review  
`page`: Page Number, default: 1 (25 items per page)

```javascript
await jikanjs.loadTop('anime'); // Top 25 animes
```

### search(type, query [, limit [, parameters]])
`type`: anime, manga, people, characters, clubs
`query`: search term
`limit`: results limit number
`parameters`: extra query parameters, see docs for more info on this

```javascript
await jikanjs.search('characters', 'Emilia', 1); // Search for a character named "Emilia"
``` 

### (EXTRA) raw(urlParts [, queryParameters])
`urlParts`: Array with api endpoint path, e.g. [anime, 1] to load the anime with the id of 1  
`queryParameters`: query parameters, needs to be a key value pair like { page: 1 }  

```javascript
await jikanjs.raw(['anime', 1]); // Same as loadAnime(1);
```